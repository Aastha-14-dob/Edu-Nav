/* eslint-disable no-console */
// Production-ready Express server for Career Counselling backend
// - Loads env vars from .env
// - Connects to MongoDB via mongoose
// - Uses CORS and body-parser
// - Integrates Gemini API client
// - Exposes health, career suggestions, and scholarships routes

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Ensure we load .env from the backend directory by default
const backendEnvPath = path.resolve(__dirname, '.env');
const cwdEnvPath = path.resolve(process.cwd(), '.env');

let usedEnvPath = '';
if (fs.existsSync(backendEnvPath)) {
	dotenv.config({ path: backendEnvPath, override: true });
	usedEnvPath = backendEnvPath;
} else if (fs.existsSync(cwdEnvPath)) {
	dotenv.config({ path: cwdEnvPath, override: true });
	usedEnvPath = cwdEnvPath;
} else {
	dotenv.config({ override: true });
}
if (usedEnvPath) {
	console.log(`[OK] Loaded environment variables from ${usedEnvPath}`);
}
console.log("DEBUG: Loaded GEMINI_API_KEY =", process.env.GEMINI_API_KEY ? "Found" : "Missing");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// ----- Config -----
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

if (!GEMINI_API_KEY) {
	console.warn('[WARN] GEMINI_API_KEY is not set. AI-powered routes will fail until this is configured.');
}

// ----- Middleware -----
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Basic request logging (minimal)
app.use((req, _res, next) => {
	console.log(`${req.method} ${req.originalUrl}`);
	next();
});

// ----- Database Connection -----
async function connectToDatabase() {
	if (!MONGO_URI) {
		console.warn('[WARN] MONGO_URI is not set. Proceeding without a database connection.');
		return;
	}
	try {
		await mongoose.connect(MONGO_URI, {
			// Add connection options here if needed
		});
		console.log('[OK] Connected to MongoDB');
	} catch (error) {
		console.error('[ERROR] MongoDB connection failed:', error.message);
	}
}

// ----- Gemini AI Client -----
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Helper: call Gemini with JSON-structured response enforcement
async function generateJsonWithGemini({ model, systemPrompt, userPrompt }) {
    try {
        const modelInstance = genAI.getGenerativeModel({ model });
        const prompt = `${systemPrompt}\n\n${userPrompt}\n\nPlease respond with valid JSON only.`;
        const result = await modelInstance.generateContent(prompt);
        const response = await result.response;
        const content = response.text() || '{}';

        // Try to extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : content;

        return JSON.parse(jsonString);
    } catch (error) {
        console.error('[ERROR] Gemini request failed:', error.message);
        throw new Error('Gemini request failed');
    }
}

// Local deterministic generator as a robust fallback when Gemini is unavailable
function buildInstitutesFromPayload({ profile = {}, quizResult = {}, preferences = {}, filters = {} }) {
    const strengths = Array.isArray(quizResult?.strengths) ? quizResult.strengths.map(String) : [];
    const interests = Array.isArray(quizResult?.interests) ? quizResult.interests.map(String) : [];
    const goal = String(preferences?.goal || 'Higher Studies');

    // Base catalog
    const catalog = [
        {
            name: 'Indian Institute of Technology Delhi',
            location: 'New Delhi',
            established: 1961,
            rating: 4.8,
            type: 'Government',
            fees: '₹2,50,000/year',
            courses: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'],
            cutoff: 'JEE Advanced 95+ percentile',
            tags: ['Engineering & Technology', 'Computer Science', 'Science & Mathematics']
        },
        {
            name: 'National Institute of Technology Trichy',
            location: 'Tiruchirappalli',
            established: 1964,
            rating: 4.6,
            type: 'Government',
            fees: '₹1,50,000/year',
            courses: ['Computer Science', 'Electronics', 'Mechanical Engineering', 'Chemical Engineering'],
            cutoff: 'JEE Main 90+ percentile',
            tags: ['Engineering & Technology', 'Electronics', 'Science & Mathematics']
        },
        {
            name: 'Delhi Technological University',
            location: 'New Delhi',
            established: 1941,
            rating: 4.4,
            type: 'Government',
            fees: '₹1,20,000/year',
            courses: ['Computer Science', 'Information Technology', 'Mechanical Engineering', 'Civil Engineering'],
            cutoff: 'JEE Main 85+ percentile',
            tags: ['Engineering & Technology', 'Computer Science']
        },
        {
            name: 'Vellore Institute of Technology',
            location: 'Vellore',
            established: 1984,
            rating: 4.5,
            type: 'Private',
            fees: '₹3,50,000/year',
            courses: ['Computer Science', 'Electronics', 'Mechanical Engineering', 'Biotechnology'],
            cutoff: 'VITEEE 80+ percentile',
            tags: ['Engineering & Technology', 'Biotechnology']
        },
        {
            name: 'University of Delhi',
            location: 'New Delhi',
            established: 1922,
            rating: 4.5,
            type: 'Government',
            fees: '₹50,000/year',
            courses: ['Economics', 'English', 'Psychology', 'Commerce'],
            cutoff: 'CUET Top ranks',
            tags: ['Liberal Arts & Humanities', 'Commerce', 'Psychology']
        },
        {
            name: 'Shri Ram College of Commerce',
            location: 'New Delhi',
            established: 1926,
            rating: 4.7,
            type: 'Government',
            fees: '₹60,000/year',
            courses: ['B.Com', 'Economics', 'Business Administration'],
            cutoff: 'CUET 95+ percentile',
            tags: ['Commerce']
        }
    ];

    // Score items by overlap with strengths/interests and goal
    const rank = (inst) => {
        let score = 0;
        for (const tag of inst.tags) {
            if (strengths.some(s => tag.toLowerCase().includes(s.toLowerCase()))) score += 2;
            if (interests.some(i => tag.toLowerCase().includes(i.toLowerCase()))) score += 3;
        }
        if (goal.toLowerCase().includes('higher')) score += 1;
        return score + inst.rating;
    };

    let items = catalog
        .map(inst => ({ ...inst, _rank: rank(inst) }))
        .sort((a, b) => b._rank - a._rank)
        .map(({ _rank, ...rest }) => rest);

    // Apply filters (search term and type)
    const term = String(filters?.term || '').trim().toLowerCase();
    const type = String(filters?.type || '').trim().toLowerCase();
    const knownCities = ['pune', 'mumbai', 'bengaluru', 'bangalore', 'delhi', 'hyderabad', 'chennai', 'kolkata'];
    const cityAlias = term.replace('bangalore', 'bengaluru');
    if (term) {
        items = items.filter(inst =>
            inst.name.toLowerCase().includes(term) ||
            inst.location.toLowerCase().includes(term) ||
            inst.courses.some(c => c.toLowerCase().includes(term))
        );
    }
    if (type && (type === 'government' || type === 'private')) {
        items = items.filter(inst => inst.type.toLowerCase() === type);
    }

    // If searching for a known city and no results, synthesize relevant city colleges
    const cityQuery = knownCities.find(c => cityAlias.includes(c));
    if (term && (!items || items.length === 0)) {
        const city = cityQuery ? (cityQuery === 'bengaluru' ? 'Bengaluru' : cityQuery.charAt(0).toUpperCase() + cityQuery.slice(1)) : term;
        const cityTemplates = [
            {
                name: `College of Engineering ${city}`,
                location: city,
                established: 1960,
                rating: 4.2,
                type: 'Government',
                fees: '₹1,20,000/year',
                courses: ['Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Electronics'],
                cutoff: 'State CET Top ranks'
            },
            {
                name: `${city} Institute of Technology`,
                location: city,
                established: 1990,
                rating: 4.1,
                type: 'Private',
                fees: '₹2,00,000/year',
                courses: ['Information Technology', 'Computer Science', 'AIML', 'Electronics'],
                cutoff: 'Entrance 80+ percentile'
            },
            {
                name: `${city} University`,
                location: city,
                established: 1950,
                rating: 4.3,
                type: 'Government',
                fees: '₹90,000/year',
                courses: ['Economics', 'Commerce', 'Psychology', 'Computer Science'],
                cutoff: 'CUET Good ranks'
            }
        ];
        items = cityTemplates;
    }

    // Ensure we always return at least 6 by repeating high rankers if needed
    while (items.length < 6) {
        items = items.concat(catalog.slice(0, Math.min(6 - items.length, catalog.length)));
    }
    return items.slice(0, 6);
}

// ----- Routes -----
// Health Check
app.get('/', (_req, res) => {
	return res.status(200).json({ status: 'ok', message: 'Service is running' });
});

// Career Suggestions
app.post('/api/career-suggestions', async (req, res, next) => {
	try {
        const { profile, quizResult, preferences, filters } = req.body || {};

		const systemPrompt = 'You are a career guidance assistant that returns STRICT JSON for frontend cards. Always provide helpful, current, and realistic Indian institute options.';

		const userPrompt = JSON.stringify({
			instruction: 'Generate an array named institutes with 6 recommended institutes matching the student profile and preferences. Return only a JSON object with an institutes array, nothing else.',
			requirements: {
				instituteCount: 6,
				fields: [
					'name',
					'location',
					'established',
					'rating',
					'type',
					'fees',
					'courses',
					'cutoff',
				],
				details: {
					rating: 'Number between 0.0 and 5.0',
					type: 'Government or Private',
					fees: '₹X/year format',
					courses: '3-4 strings',
					cutoff: 'Concise phrase like exam and percentile/rank',
				},
			},
			context: { profile, quizResult, preferences },
		});

        let data = null;
        if (GEMINI_API_KEY) {
            try {
                data = await generateJsonWithGemini({
                    model: 'gemini-1.5-pro',
                    systemPrompt,
                    userPrompt,
                });
            } catch (e) {
                // ignore and fallback to local generator
            }
        }

        // If Gemini failed or missing, build via deterministic generator
        if (!data || !Array.isArray(data.institutes)) {
            const institutes = buildInstitutesFromPayload({ profile, quizResult, preferences, filters });
            return res.status(200).json({ institutes });
        }

		// Normalize fields where possible
		let institutes = data.institutes.slice(0, 6).map((inst) => ({
			name: String(inst.name || ''),
			location: String(inst.location || ''),
			established: Number(inst.established || 0),
			rating: typeof inst.rating === 'number' ? inst.rating : Number(inst.rating || 0),
			type: String(inst.type || ''),
			fees: String(inst.fees || ''),
			courses: Array.isArray(inst.courses) ? inst.courses.slice(0, 4).map(String) : [],
			cutoff: String(inst.cutoff || ''),
		}));

		// Ensure we always return at least 6 institutes
		if (institutes.length < 6) {
			const fallbackInstitutes = [
				{
					name: 'Indian Institute of Technology Delhi',
					location: 'New Delhi',
					established: 1961,
					rating: 4.8,
					type: 'Government',
					fees: '₹2,50,000/year',
					courses: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'],
					cutoff: 'JEE Advanced 95+ percentile'
				},
				{
					name: 'National Institute of Technology Trichy',
					location: 'Tiruchirappalli',
					established: 1964,
					rating: 4.6,
					type: 'Government',
					fees: '₹1,50,000/year',
					courses: ['Computer Science', 'Electronics', 'Mechanical Engineering', 'Chemical Engineering'],
					cutoff: 'JEE Main 90+ percentile'
				},
				{
					name: 'Delhi Technological University',
					location: 'New Delhi',
					established: 1941,
					rating: 4.4,
					type: 'Government',
					fees: '₹1,20,000/year',
					courses: ['Computer Science', 'Information Technology', 'Mechanical Engineering', 'Civil Engineering'],
					cutoff: 'JEE Main 85+ percentile'
				},
				{
					name: 'Vellore Institute of Technology',
					location: 'Vellore',
					established: 1984,
					rating: 4.5,
					type: 'Private',
					fees: '₹3,50,000/year',
					courses: ['Computer Science', 'Electronics', 'Mechanical Engineering', 'Biotechnology'],
					cutoff: 'VITEEE 80+ percentile'
				},
				{
					name: 'Birla Institute of Technology and Science',
					location: 'Pilani',
					established: 1964,
					rating: 4.7,
					type: 'Private',
					fees: '₹4,00,000/year',
					courses: ['Computer Science', 'Electronics', 'Mechanical Engineering', 'Chemical Engineering'],
					cutoff: 'BITSAT 85+ percentile'
				},
				{
					name: 'Manipal Institute of Technology',
					location: 'Manipal',
					established: 1957,
					rating: 4.3,
					type: 'Private',
					fees: '₹3,00,000/year',
					courses: ['Computer Science', 'Electronics', 'Mechanical Engineering', 'Aerospace Engineering'],
					cutoff: 'MET 75+ percentile'
				}
			];
			
			// Add fallback institutes to reach minimum of 6
			const needed = 6 - institutes.length;
			institutes = [...institutes, ...fallbackInstitutes.slice(0, needed)];
		}

        // Optional server-side filtering as well
        let filtered = institutes;
        const term = String(filters?.term || '').trim().toLowerCase();
        const type = String(filters?.type || '').trim().toLowerCase();
        if (term) {
            filtered = filtered.filter(inst =>
                inst.name.toLowerCase().includes(term) ||
                inst.location.toLowerCase().includes(term) ||
                inst.courses.some(c => String(c).toLowerCase().includes(term))
            );
        }
        if (type && (type === 'government' || type === 'private')) {
            filtered = filtered.filter(inst => inst.type.toLowerCase() === type);
        }

        // Ensure at least 6
        while (filtered.length < 6) filtered.push(...institutes.slice(0, Math.min(6 - filtered.length, institutes.length)));

        return res.status(200).json({ institutes: filtered.slice(0, 6) });
	} catch (error) {
		return next(error);
	}
});

// Stream Recommendations (based on quiz results)
app.post('/api/stream-recommendations', async (req, res, next) => {
    try {
        const { quizResult } = req.body || {};
        const strengths = Array.isArray(quizResult?.strengths) ? quizResult.strengths.map(String) : [];
        const interests = Array.isArray(quizResult?.interests) ? quizResult.interests.map(String) : [];

        // Simple deterministic mapping
        const all = [
            {
                stream: 'Science (Maths)',
                key: 'science(maths)',
                description: 'Mathematics, Physics, Chemistry - foundation for engineering/tech careers.',
                topCourses: ['Computer Science & Engineering', 'Electronics & Communication', 'Mechanical Engineering']
            },
            {
                stream: 'Science (Biology)',
                key: 'science(biology)',
                description: 'Biology, Chemistry - foundation for medical and life sciences.',
                topCourses: ['MBBS', 'BDS', 'B.Sc Biotechnology']
            },
            {
                stream: 'Commerce',
                key: 'commerce',
                description: 'Business, accounting, finance, and management tracks.',
                topCourses: ['B.Com', 'BBA', 'Chartered Accountancy (CA)']
            },
            {
                stream: 'Arts / Humanities',
                key: 'arts',
                description: 'Creative and social sciences including psychology, media, literature.',
                topCourses: ['Psychology', 'Mass Communication & Journalism', 'BFA']
            }
        ];

        const prefer = (label) => {
            const l = label.toLowerCase();
            return strengths.concat(interests).some(s => l.includes(s.toLowerCase()));
        };

        const scored = all.map(item => {
            let score = 50; // base match
            if (prefer('engineering') || prefer('technology') || prefer('computer') || prefer('mathematics')) score += 25;
            if (prefer('medicine') || prefer('biology') || prefer('healthcare')) score += 25;
            if (prefer('business') || prefer('finance') || prefer('commerce') || prefer('account')) score += 25;
            if (prefer('arts') || prefer('creative') || prefer('media') || prefer('psychology')) score += 25;

            // Light nudge by keywords per stream
            const k = item.key;
            if (k === 'science(maths)' && (prefer('math') || prefer('engineering') || prefer('computer'))) score += 10;
            if (k === 'science(biology)' && (prefer('bio') || prefer('health'))) score += 10;
            if (k === 'commerce' && (prefer('finance') || prefer('account'))) score += 10;
            if (k === 'arts' && (prefer('creative') || prefer('media') || prefer('psychology'))) score += 10;

            return { ...item, match: Math.max(55, Math.min(98, score)) };
        }).sort((a, b) => b.match - a.match).slice(0, 4);

        return res.status(200).json({ streams: scored });
    } catch (error) {
        return next(error);
    }
});

// Scholarships
app.post('/api/scholarships', async (req, res, next) => {
	try {
		const { chosenCourse, location, academicScore } = req.body || {};

		const systemPrompt = 'You are a scholarship assistant that returns STRICT JSON for frontend cards. Focus on India-specific and relevant opportunities.';

		const userPrompt = JSON.stringify({
			instruction: 'Generate an array named scholarships with at least 6 best-match scholarships. Return only a JSON object with a scholarships array, nothing else.',
			requirements: {
				scholarshipCount: 6,
				fields: [
					'name',
					'provider',
					'amount',
					'eligibility',
					'deadline',
					'applicants',
					'type',
					'status',
				],
				details: {
					amount: '₹X/year format',
					eligibility: 'Concise criteria summary',
					deadline: 'DD/MM/YYYY',
					appliants: 'Include + where applicable',
					type: 'Merit-based / Need-based / Research',
					status: 'Open or Closed',
				},
			},
			context: { chosenCourse, location, academicScore },
		});

		const data = await generateJsonWithGemini({
			model: 'gemini-1.5-flash',
			systemPrompt,
			userPrompt,
		});

		if (!data || !Array.isArray(data.scholarships)) {
			return res.status(200).json({ scholarships: [] });
		}

		let scholarships = data.scholarships.map((s) => ({
			name: String(s.name || ''),
			provider: String(s.provider || ''),
			amount: String(s.amount || ''),
			eligibility: String(s.eligibility || ''),
			deadline: String(s.deadline || ''),
			applicants: String(s.applicants || ''),
			type: String(s.type || ''),
			status: String(s.status || ''),
		}));

		// Ensure we always return at least 6 scholarships
		if (scholarships.length < 6) {
			const fallbackScholarships = [
				{
					name: 'Merit Scholarship for Engineering',
					provider: 'Government of India',
					amount: '₹50,000/year',
					eligibility: 'Class 12 with 80%+ marks in PCM',
					deadline: '31/03/2025',
					applicants: '500+',
					type: 'Merit-based',
					status: 'Open'
				},
				{
					name: 'Need-based Financial Aid',
					provider: 'Educational Trust',
					amount: '₹25,000/year',
					eligibility: 'Family income below ₹5 LPA',
					deadline: '15/04/2025',
					applicants: '200+',
					type: 'Need-based',
					status: 'Open'
				},
				{
					name: 'Research Excellence Scholarship',
					provider: 'University Grants Commission',
					amount: '₹75,000/year',
					eligibility: 'Research proposal and academic excellence',
					deadline: '30/04/2025',
					applicants: '100+',
					type: 'Research',
					status: 'Open'
				},
				{
					name: 'Women in STEM Scholarship',
					provider: 'Ministry of Education',
					amount: '₹40,000/year',
					eligibility: 'Female students in STEM fields',
					deadline: '20/05/2025',
					applicants: '300+',
					type: 'Merit-based',
					status: 'Open'
				},
				{
					name: 'Rural Development Scholarship',
					provider: 'Rural Development Ministry',
					amount: '₹30,000/year',
					eligibility: 'Students from rural areas',
					deadline: '10/06/2025',
					applicants: '400+',
					type: 'Need-based',
					status: 'Open'
				},
				{
					name: 'Innovation and Entrepreneurship Grant',
					provider: 'Startup India',
					amount: '₹1,00,000/year',
					eligibility: 'Innovative project proposal',
					deadline: '25/06/2025',
					applicants: '150+',
					type: 'Research',
					status: 'Open'
				}
			];
			
			// Add fallback scholarships to reach minimum of 6
			const needed = 6 - scholarships.length;
			scholarships = [...scholarships, ...fallbackScholarships.slice(0, needed)];
		}

		return res.status(200).json({ scholarships });
	} catch (error) {
		return next(error);
	}
});

// ----- Error Handling -----
// 404 handler
app.use((req, res, next) => {
	if (res.headersSent) return next();
	return res.status(404).json({ error: 'Not Found' });
});

// 500 handler
app.use((err, _req, res, _next) => {
	console.error('[ERROR]', err);
	if (res.headersSent) return;
	return res.status(500).json({ error: 'Internal server error' });
});

// ----- Server Startup -----
(async function start() {
	await connectToDatabase();
	app.listen(PORT, () => {
		console.log(`[OK] Server listening on port ${PORT}`);
	});
})();
