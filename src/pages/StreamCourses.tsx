import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen,
  GraduationCap,
  Clock,
  Users,
  MapPin,
  IndianRupee,
  Star,
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

const streamData: { [key: string]: any } = {
  'science-maths': {
    title: 'Science (Mathematics)',
    description: 'Explore the fascinating world of mathematics, physics, chemistry, and their applications in technology and engineering.',
    icon: Brain,
    match: 95,
    overview: 'Science with Mathematics stream focuses on logical reasoning, analytical thinking, and problem-solving skills. It opens doors to engineering, technology, research, and various analytical careers.',
    subjects: [
      { name: 'Mathematics', description: 'Advanced calculus, algebra, geometry, statistics', importance: 'Critical' },
      { name: 'Physics', description: 'Mechanics, thermodynamics, electromagnetism, modern physics', importance: 'Critical' },
      { name: 'Chemistry', description: 'Organic, inorganic, physical chemistry, laboratory work', importance: 'High' },
      { name: 'Computer Science', description: 'Programming, algorithms, data structures', importance: 'High' }
    ],
    careerPaths: [
      { title: 'Engineering', description: 'Various engineering disciplines', salary: '₹8-25 LPA', demand: 'Very High' },
      { title: 'Data Science', description: 'Analytics and machine learning', salary: '₹10-30 LPA', demand: 'Very High' },
      { title: 'Research & Development', description: 'Scientific research and innovation', salary: '₹6-20 LPA', demand: 'High' },
      { title: 'Finance & Banking', description: 'Quantitative analysis and risk management', salary: '₹8-25 LPA', demand: 'High' },
      { title: 'Software Development', description: 'Programming and software engineering', salary: '₹8-25 LPA', demand: 'Very High' },
      { title: 'Consulting', description: 'Management and technical consulting', salary: '₹12-35 LPA', demand: 'High' }
    ],
    topCourses: [
      {
        name: 'B.Tech Computer Science',
        duration: '4 years',
        description: 'Comprehensive computer science education with programming, algorithms, and software development',
        subjects: ['Programming', 'Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering'],
        colleges: ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIIT Hyderabad', 'BITS Pilani'],
        salary: '₹8-25 LPA',
        demand: 'Very High'
      },
      {
        name: 'B.Tech Electronics & Communication',
        duration: '4 years',
        description: 'Focus on electronics, communication systems, and embedded technologies',
        subjects: ['Digital Electronics', 'Communication Systems', 'Signal Processing', 'VLSI Design'],
        colleges: ['IIT Delhi', 'IIT Bombay', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore'],
        salary: '₹7-20 LPA',
        demand: 'High'
      },
      {
        name: 'B.Tech Mechanical Engineering',
        duration: '4 years',
        description: 'Design, manufacturing, and maintenance of mechanical systems',
        subjects: ['Thermodynamics', 'Machine Design', 'Manufacturing', 'CAD/CAM'],
        colleges: ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'NIT Trichy', 'BITS Pilani'],
        salary: '₹6-18 LPA',
        demand: 'High'
      },
      {
        name: 'B.Sc Mathematics',
        duration: '3 years',
        description: 'Pure and applied mathematics with focus on theoretical foundations',
        subjects: ['Calculus', 'Algebra', 'Statistics', 'Mathematical Analysis'],
        colleges: ['DU Delhi', 'CU Bangalore', 'JNU Delhi', 'IISc Bangalore', 'ISI Kolkata'],
        salary: '₹4-12 LPA',
        demand: 'Medium'
      },
      {
        name: 'B.Sc Physics',
        duration: '3 years',
        description: 'Fundamental physics principles and experimental techniques',
        subjects: ['Classical Mechanics', 'Quantum Physics', 'Thermodynamics', 'Electromagnetism'],
        colleges: ['IISc Bangalore', 'DU Delhi', 'IIT Delhi', 'TIFR Mumbai', 'HRI Allahabad'],
        salary: '₹4-15 LPA',
        demand: 'Medium'
      },
      {
        name: 'B.Sc Chemistry',
        duration: '3 years',
        description: 'Chemical principles, laboratory techniques, and applications',
        subjects: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
        colleges: ['IISc Bangalore', 'DU Delhi', 'IIT Delhi', 'NCL Pune', 'CSIR Labs'],
        salary: '₹4-12 LPA',
        demand: 'Medium'
      }
    ],
    entranceExams: [
      { name: 'JEE Main', description: 'For NITs and IIITs', difficulty: 'Very High', preparation: '2-3 years' },
      { name: 'JEE Advanced', description: 'For IITs', difficulty: 'Extremely High', preparation: '3-4 years' },
      { name: 'BITSAT', description: 'For BITS Pilani', difficulty: 'High', preparation: '2 years' },
      { name: 'VITEEE', description: 'For VIT universities', difficulty: 'Medium', preparation: '1-2 years' },
      { name: 'SRMJEE', description: 'For SRM universities', difficulty: 'Medium', preparation: '1-2 years' }
    ],
    skills: [
      { skill: 'Mathematical Reasoning', level: 95, description: 'Ability to solve complex mathematical problems' },
      { skill: 'Logical Thinking', level: 90, description: 'Structured approach to problem-solving' },
      { skill: 'Analytical Skills', level: 88, description: 'Breaking down complex problems into components' },
      { skill: 'Programming', level: 85, description: 'Writing code and understanding algorithms' },
      { skill: 'Scientific Method', level: 82, description: 'Systematic approach to experimentation and analysis' }
    ]
  },
  'science-bio': {
    title: 'Science (Biology)',
    description: 'Dive into the living world with biology, chemistry, and mathematics, preparing for medical, biotech, and research careers.',
    icon: Brain,
    match: 88,
    overview: 'Science with Biology stream combines life sciences with chemistry and mathematics, preparing students for medical, biotechnology, research, and healthcare careers.',
    subjects: [
      { name: 'Biology', description: 'Cell biology, genetics, ecology, human physiology', importance: 'Critical' },
      { name: 'Chemistry', description: 'Organic, inorganic, physical chemistry, biochemistry', importance: 'Critical' },
      { name: 'Mathematics', description: 'Calculus, statistics, applied mathematics', importance: 'High' },
      { name: 'Physics', description: 'Mechanics, thermodynamics, optics', importance: 'Medium' }
    ],
    careerPaths: [
      { title: 'Medicine (MBBS)', description: 'Medical practice and healthcare', salary: '₹8-50 LPA', demand: 'Very High' },
      { title: 'Biotechnology', description: 'Research and development in biotech', salary: '₹6-20 LPA', demand: 'High' },
      { title: 'Pharmacy', description: 'Drug development and pharmaceutical industry', salary: '₹5-18 LPA', demand: 'High' },
      { title: 'Research', description: 'Scientific research and academia', salary: '₹6-25 LPA', demand: 'Medium' },
      { title: 'Environmental Science', description: 'Environmental conservation and sustainability', salary: '₹4-15 LPA', demand: 'Growing' },
      { title: 'Agriculture', description: 'Agricultural research and farming technology', salary: '₹4-12 LPA', demand: 'Medium' }
    ],
    topCourses: [
      {
        name: 'MBBS (Bachelor of Medicine)',
        duration: '5.5 years',
        description: 'Comprehensive medical education and clinical training',
        subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Medicine', 'Surgery'],
        colleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER Puducherry', 'KGMU Lucknow', 'MAMC Delhi'],
        salary: '₹8-50 LPA',
        demand: 'Very High'
      },
      {
        name: 'B.Tech Biotechnology',
        duration: '4 years',
        description: 'Application of biological processes in technology and industry',
        subjects: ['Molecular Biology', 'Genetics', 'Biochemistry', 'Bioprocess Engineering'],
        colleges: ['IIT Delhi', 'IIT Bombay', 'VIT Vellore', 'Amity University', 'Manipal University'],
        salary: '₹6-18 LPA',
        demand: 'High'
      },
      {
        name: 'B.Pharmacy',
        duration: '4 years',
        description: 'Drug development, manufacturing, and pharmaceutical sciences',
        subjects: ['Pharmaceutical Chemistry', 'Pharmacology', 'Pharmaceutics', 'Pharmacognosy'],
        colleges: ['NIPER', 'BHU Varanasi', 'Jamia Hamdard', 'Manipal University', 'Amity University'],
        salary: '₹5-15 LPA',
        demand: 'High'
      },
      {
        name: 'B.Sc Microbiology',
        duration: '3 years',
        description: 'Study of microorganisms and their applications',
        subjects: ['General Microbiology', 'Medical Microbiology', 'Industrial Microbiology', 'Immunology'],
        colleges: ['DU Delhi', 'Mumbai University', 'Pune University', 'Calcutta University'],
        salary: '₹4-12 LPA',
        demand: 'Medium'
      },
      {
        name: 'B.Sc Biochemistry',
        duration: '3 years',
        description: 'Chemical processes in living organisms',
        subjects: ['Protein Chemistry', 'Enzyme Kinetics', 'Metabolism', 'Molecular Biology'],
        colleges: ['IISc Bangalore', 'DU Delhi', 'JNU Delhi', 'IIT Delhi', 'TIFR Mumbai'],
        salary: '₹4-15 LPA',
        demand: 'Medium'
      },
      {
        name: 'B.Sc Environmental Science',
        duration: '3 years',
        description: 'Environmental conservation and sustainable development',
        subjects: ['Ecology', 'Environmental Chemistry', 'Conservation Biology', 'Climate Science'],
        colleges: ['DU Delhi', 'JNU Delhi', 'Pune University', 'Calcutta University'],
        salary: '₹4-10 LPA',
        demand: 'Growing'
      }
    ],
    entranceExams: [
      { name: 'NEET', description: 'For medical and dental courses', difficulty: 'Very High', preparation: '2-3 years' },
      { name: 'AIIMS Entrance', description: 'For AIIMS medical colleges', difficulty: 'Extremely High', preparation: '3-4 years' },
      { name: 'JIPMER Entrance', description: 'For JIPMER medical college', difficulty: 'Very High', preparation: '2-3 years' },
      { name: 'BITSAT', description: 'For BITS biotechnology programs', difficulty: 'High', preparation: '2 years' },
      { name: 'VITEEE', description: 'For VIT biotechnology programs', difficulty: 'Medium', preparation: '1-2 years' }
    ],
    skills: [
      { skill: 'Biological Understanding', level: 95, description: 'Deep knowledge of living systems and processes' },
      { skill: 'Laboratory Skills', level: 90, description: 'Hands-on experience with scientific instruments' },
      { skill: 'Analytical Thinking', level: 88, description: 'Scientific method and data analysis' },
      { skill: 'Research Skills', level: 85, description: 'Designing and conducting experiments' },
      { skill: 'Problem Solving', level: 82, description: 'Addressing biological and medical challenges' }
    ]
  },
  'commerce': {
    title: 'Commerce',
    description: 'Master the world of business, finance, and economics with comprehensive commerce education.',
    icon: TrendingUp,
    match: 82,
    overview: 'Commerce stream focuses on business, finance, economics, and accounting. It prepares students for careers in banking, finance, business management, and entrepreneurship.',
    subjects: [
      { name: 'Accountancy', description: 'Financial accounting, cost accounting, auditing', importance: 'Critical' },
      { name: 'Business Studies', description: 'Business management, marketing, human resources', importance: 'Critical' },
      { name: 'Economics', description: 'Microeconomics, macroeconomics, Indian economy', importance: 'High' },
      { name: 'Mathematics', description: 'Business mathematics, statistics, calculus', importance: 'High' }
    ],
    careerPaths: [
      { title: 'Chartered Accountancy', description: 'Financial auditing and taxation', salary: '₹8-30 LPA', demand: 'Very High' },
      { title: 'Business Management', description: 'Corporate leadership and strategy', salary: '₹10-40 LPA', demand: 'Very High' },
      { title: 'Banking & Finance', description: 'Financial services and investment', salary: '₹6-25 LPA', demand: 'Very High' },
      { title: 'Marketing', description: 'Brand management and digital marketing', salary: '₹5-20 LPA', demand: 'High' },
      { title: 'Investment Banking', description: 'Financial advisory and capital markets', salary: '₹15-50 LPA', demand: 'High' },
      { title: 'Entrepreneurship', description: 'Starting and managing businesses', salary: 'Variable', demand: 'Growing' }
    ],
    topCourses: [
      {
        name: 'B.Com (Hons)',
        duration: '3 years',
        description: 'Comprehensive commerce education with specialization options',
        subjects: ['Financial Accounting', 'Business Law', 'Economics', 'Business Mathematics', 'Marketing'],
        colleges: ['SRCC Delhi', 'Loyola Chennai', 'St. Xavier\'s Mumbai', 'Christ University', 'Symbiosis Pune'],
        salary: '₹4-12 LPA',
        demand: 'High'
      },
      {
        name: 'BBA (Bachelor of Business Administration)',
        duration: '3 years',
        description: 'Business management and administration fundamentals',
        subjects: ['Management Principles', 'Marketing Management', 'Financial Management', 'Human Resources'],
        colleges: ['IIM Indore', 'NMIMS Mumbai', 'Symbiosis Pune', 'Christ University', 'Amity University'],
        salary: '₹5-15 LPA',
        demand: 'Very High'
      },
      {
        name: 'CA (Chartered Accountancy)',
        duration: '4-5 years',
        description: 'Professional accounting and financial expertise',
        subjects: ['Financial Reporting', 'Strategic Financial Management', 'Auditing', 'Taxation'],
        colleges: ['ICAI', 'Various coaching institutes across India'],
        salary: '₹8-30 LPA',
        demand: 'Very High'
      },
      {
        name: 'CS (Company Secretary)',
        duration: '3-4 years',
        description: 'Corporate governance and compliance',
        subjects: ['Company Law', 'Corporate Governance', 'Securities Law', 'Business Communication'],
        colleges: ['ICSI', 'Various coaching institutes'],
        salary: '₹6-20 LPA',
        demand: 'High'
      },
      {
        name: 'B.Sc Economics',
        duration: '3 years',
        description: 'Economic theory, policy, and analysis',
        subjects: ['Microeconomics', 'Macroeconomics', 'Econometrics', 'Development Economics'],
        colleges: ['DU Delhi', 'JNU Delhi', 'ISI Kolkata', 'IIT Delhi', 'Mumbai University'],
        salary: '₹5-18 LPA',
        demand: 'High'
      },
      {
        name: 'BBA in Finance',
        duration: '3 years',
        description: 'Specialized finance and investment education',
        subjects: ['Corporate Finance', 'Investment Analysis', 'Risk Management', 'Financial Markets'],
        colleges: ['IIM Indore', 'NMIMS Mumbai', 'Symbiosis Pune', 'Christ University'],
        salary: '₹6-20 LPA',
        demand: 'High'
      }
    ],
    entranceExams: [
      { name: 'IPMAT', description: 'For IIM 5-year integrated programs', difficulty: 'Very High', preparation: '1-2 years' },
      { name: 'NPAT', description: 'For NMIMS programs', difficulty: 'High', preparation: '1-2 years' },
      { name: 'SET', description: 'For Symbiosis programs', difficulty: 'Medium', preparation: '6 months-1 year' },
      { name: 'Christ University Entrance', description: 'For Christ University programs', difficulty: 'Medium', preparation: '6 months-1 year' },
      { name: 'DU Entrance', description: 'For Delhi University commerce programs', difficulty: 'High', preparation: '1 year' }
    ],
    skills: [
      { skill: 'Financial Analysis', level: 95, description: 'Understanding financial statements and analysis' },
      { skill: 'Business Acumen', level: 90, description: 'Understanding business operations and strategy' },
      { skill: 'Communication', level: 88, description: 'Effective business communication and presentation' },
      { skill: 'Problem Solving', level: 85, description: 'Business problem identification and solutions' },
      { skill: 'Leadership', level: 82, description: 'Team management and leadership skills' }
    ]
  },
  'arts': {
    title: 'Arts/Humanities',
    description: 'Explore human culture, society, languages, and creative expression through diverse arts and humanities subjects.',
    icon: BookOpen,
    match: 78,
    overview: 'Arts and Humanities stream focuses on human culture, society, languages, history, and creative expression. It prepares students for careers in education, media, government, and creative industries.',
    subjects: [
      { name: 'History', description: 'World history, Indian history, historical analysis', importance: 'High' },
      { name: 'Political Science', description: 'Political systems, governance, international relations', importance: 'High' },
      { name: 'Geography', description: 'Physical and human geography, environmental studies', importance: 'Medium' },
      { name: 'Literature', description: 'English literature, regional literature, creative writing', importance: 'High' },
      { name: 'Psychology', description: 'Human behavior, mental processes, counseling', importance: 'High' },
      { name: 'Sociology', description: 'Society, culture, social institutions', importance: 'Medium' }
    ],
    careerPaths: [
      { title: 'Civil Services', description: 'Government administration and public service', salary: '₹8-25 LPA', demand: 'High' },
      { title: 'Teaching & Education', description: 'Academic teaching and educational administration', salary: '₹4-15 LPA', demand: 'Very High' },
      { title: 'Media & Journalism', description: 'News reporting, content creation, broadcasting', salary: '₹3-12 LPA', demand: 'High' },
      { title: 'Law', description: 'Legal practice, corporate law, judiciary', salary: '₹6-30 LPA', demand: 'High' },
      { title: 'Social Work', description: 'Community development and social welfare', salary: '₹3-10 LPA', demand: 'Growing' },
      { title: 'Creative Arts', description: 'Writing, design, performing arts', salary: 'Variable', demand: 'Medium' }
    ],
    topCourses: [
      {
        name: 'BA (Hons) English Literature',
        duration: '3 years',
        description: 'Comprehensive study of English literature and language',
        subjects: ['British Literature', 'American Literature', 'Indian Writing in English', 'Linguistics'],
        colleges: ['DU Delhi', 'JNU Delhi', 'Mumbai University', 'Calcutta University', 'Pune University'],
        salary: '₹4-12 LPA',
        demand: 'Medium'
      },
      {
        name: 'BA (Hons) History',
        duration: '3 years',
        description: 'Study of historical events, civilizations, and historical analysis',
        subjects: ['Ancient History', 'Medieval History', 'Modern History', 'World History'],
        colleges: ['DU Delhi', 'JNU Delhi', 'Mumbai University', 'Calcutta University'],
        salary: '₹4-10 LPA',
        demand: 'Medium'
      },
      {
        name: 'BA (Hons) Political Science',
        duration: '3 years',
        description: 'Political systems, governance, and international relations',
        subjects: ['Political Theory', 'Indian Politics', 'International Relations', 'Public Administration'],
        colleges: ['DU Delhi', 'JNU Delhi', 'Mumbai University', 'Calcutta University'],
        salary: '₹5-15 LPA',
        demand: 'High'
      },
      {
        name: 'BA (Hons) Psychology',
        duration: '3 years',
        description: 'Study of human behavior and mental processes',
        subjects: ['General Psychology', 'Developmental Psychology', 'Social Psychology', 'Abnormal Psychology'],
        colleges: ['DU Delhi', 'JNU Delhi', 'Mumbai University', 'Calcutta University'],
        salary: '₹4-12 LPA',
        demand: 'Growing'
      },
      {
        name: 'LLB (Bachelor of Laws)',
        duration: '3 years (after graduation)',
        description: 'Legal education and training for legal practice',
        subjects: ['Constitutional Law', 'Criminal Law', 'Contract Law', 'Corporate Law'],
        colleges: ['NLU Delhi', 'NLU Bangalore', 'NLU Mumbai', 'Faculty of Law DU', 'ILS Pune'],
        salary: '₹6-30 LPA',
        demand: 'High'
      },
      {
        name: 'BA Journalism & Mass Communication',
        duration: '3 years',
        description: 'Media studies, journalism, and communication skills',
        subjects: ['News Reporting', 'Media Ethics', 'Digital Media', 'Broadcast Journalism'],
        colleges: ['IIMC Delhi', 'Symbiosis Pune', 'Manipal University', 'Amity University'],
        salary: '₹3-12 LPA',
        demand: 'High'
      }
    ],
    entranceExams: [
      { name: 'CLAT', description: 'For National Law Universities', difficulty: 'Very High', preparation: '1-2 years' },
      { name: 'DUET', description: 'For Delhi University programs', difficulty: 'High', preparation: '6 months-1 year' },
      { name: 'JNU Entrance', description: 'For JNU programs', difficulty: 'High', preparation: '1 year' },
      { name: 'SET', description: 'For Symbiosis programs', difficulty: 'Medium', preparation: '6 months-1 year' },
      { name: 'CUET', description: 'For central universities', difficulty: 'High', preparation: '1 year' }
    ],
    skills: [
      { skill: 'Critical Thinking', level: 95, description: 'Analyzing complex issues and forming reasoned judgments' },
      { skill: 'Communication', level: 90, description: 'Written and verbal communication skills' },
      { skill: 'Research', level: 88, description: 'Information gathering and analysis' },
      { skill: 'Cultural Awareness', level: 85, description: 'Understanding diverse cultures and perspectives' },
      { skill: 'Creative Expression', level: 82, description: 'Artistic and creative abilities' }
    ]
  }
};

export default function StreamCourses() {
  const { stream } = useParams<{ stream: string }>();
  const streamInfo = streamData[stream || ''];
  const IconComponent = streamInfo?.icon || BookOpen;

  if (!streamInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Stream Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The stream you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/recommendations">
              <ArrowRight className="mr-2 h-4 w-4" />
              Back to Recommendations
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <IconComponent className="h-12 w-12 text-primary" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {streamInfo.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                Complete Course Guide
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-4xl">
            {streamInfo.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Stream Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {streamInfo.overview}
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mb-1">
                      {streamInfo.match}%
                    </div>
                    <div className="text-sm text-muted-foreground">Your Match</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {streamInfo.topCourses.length}+
                    </div>
                    <div className="text-sm text-muted-foreground">Courses Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning mb-1">
                      {streamInfo.careerPaths.length}+
                    </div>
                    <div className="text-sm text-muted-foreground">Career Paths</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Core Subjects */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Core Subjects</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {streamInfo.subjects.map((subject: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{subject.name}</h4>
                        <Badge variant={subject.importance === 'Critical' ? 'default' : 'outline'}>
                          {subject.importance}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{subject.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Courses */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Top Courses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {streamInfo.topCourses.map((course: any, index: number) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{course.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <Badge variant="secondary">{index + 1}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{course.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-success mb-1">{course.salary}</div>
                          <Badge variant={course.demand === 'Very High' ? 'default' : 'outline'}>
                            {course.demand} Demand
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Key Subjects:</h5>
                          <div className="flex flex-wrap gap-2">
                            {course.subjects.map((subject: string, subjectIndex: number) => (
                              <Badge key={subjectIndex} variant="outline" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Top Colleges:</h5>
                          <p className="text-sm text-muted-foreground">
                            {course.colleges.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Career Paths */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span>Career Paths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {streamInfo.careerPaths.map((career: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{career.title}</h5>
                        <Badge variant={career.demand === 'Very High' ? 'default' : 'outline'}>
                          {career.demand}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                      <p className="text-sm font-medium text-success">{career.salary}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Entrance Exams */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Entrance Exams</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {streamInfo.entranceExams.map((exam: any, index: number) => (
                    <div key={index} className="flex justify-between items-center border rounded-lg p-4">
                      <div>
                        <h5 className="font-medium">{exam.name}</h5>
                        <p className="text-sm text-muted-foreground">{exam.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Preparation time: {exam.preparation}
                        </p>
                      </div>
                      <Badge variant={exam.difficulty === 'Very High' || exam.difficulty === 'Extremely High' ? 'destructive' : 'outline'}>
                        {exam.difficulty}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Skills Assessment */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Required Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {streamInfo.skills.map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <span className="text-sm font-bold text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to="/colleges">
                      <MapPin className="mr-2 h-4 w-4" />
                      Find Colleges
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/scholarships">
                      <Award className="mr-2 h-4 w-4" />
                      Apply for Scholarships
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/admissions">
                      <Calendar className="mr-2 h-4 w-4" />
                      Check Deadlines
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/recommendations">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Back to Recommendations
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stream Match */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Stream Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-success mb-2">
                    {streamInfo.match}%
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Compatibility Score
                  </div>
                  <Progress value={streamInfo.match} className="mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Based on your aptitude test results, this stream aligns well with your interests and skills.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Related Streams */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Related Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.keys(streamData)
                    .filter(key => key !== stream)
                    .slice(0, 3)
                    .map((key) => {
                      const relatedStream = streamData[key];
                      const RelatedIcon = relatedStream.icon;
                      return (
                        <Link 
                          key={key}
                          to={`/courses/${key}`}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <RelatedIcon className="h-8 w-8 text-primary" />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{relatedStream.title}</h5>
                            <p className="text-xs text-muted-foreground">{relatedStream.match}% match</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
