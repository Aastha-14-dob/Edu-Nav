// Mock data for EduNav application

export interface College {
  id: string;
  name: string;
  location: string;
  fees: string;
  cutoff: string;
  ranking: number;
  courses: string[];
  image: string;
  description: string;
  type: 'Engineering' | 'Medical' | 'Arts' | 'Commerce' | 'Science';
}

export interface Scholarship {
  id: string;
  title: string;
  amount: string;
  eligibility: string;
  deadline: string;
  provider: string;
  type: 'Merit' | 'Need-based' | 'Sports' | 'Minority';
  description: string;
  detailedEligibility?: {
    academicRequirement: string;
    incomeLimit?: string;
    categoryRequirement?: string;
    ageLimit?: string;
    courseType?: string;
    additionalRequirements?: string[];
  };
  applicationProcess?: {
    steps: string[];
    documentsRequired: string[];
    applicationFee?: string;
  };
  renewalCriteria?: string;
  benefits?: string[];
}

export interface Course {
  id: string;
  name: string;
  stream: 'Science' | 'Arts' | 'Commerce' | 'Vocational';
  duration: string;
  careerOptions: string[];
  averageSalary: string;
  description: string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  skills: string[];
  education: string[];
  workEnvironment: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'Aptitude' | 'Interest' | 'Personality';
}

export const mockColleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, India',
    fees: '₹2,50,000/year',
    cutoff: 'JEE Advanced Rank 1-500',
    ranking: 1,
    courses: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering'],
    image: '/api/placeholder/400/300',
    description: 'Premier engineering institute with world-class faculty and infrastructure.',
    type: 'Engineering'
  },
  {
    id: '2',
    name: 'All India Institute of Medical Sciences',
    location: 'New Delhi, India',
    fees: '₹5,856/year',
    cutoff: 'NEET Rank 1-100',
    ranking: 1,
    courses: ['MBBS', 'BDS', 'B.Sc Nursing'],
    image: '/api/placeholder/400/300',
    description: 'Leading medical college with excellent research facilities.',
    type: 'Medical'
  },
  {
    id: '3',
    name: 'Lady Shri Ram College',
    location: 'New Delhi, India',
    fees: '₹45,000/year',
    cutoff: '98% in Class 12',
    ranking: 2,
    courses: ['Economics', 'Psychology', 'English Literature'],
    image: '/api/placeholder/400/300',
    description: 'Premier women\'s college known for liberal arts education.',
    type: 'Arts'
  },
  {
    id: '4',
    name: 'Shri Ram College of Commerce',
    location: 'New Delhi, India',
    fees: '₹50,000/year',
    cutoff: '97% in Class 12',
    ranking: 1,
    courses: ['B.Com Hons', 'Economics Hons', 'BBA'],
    image: '/api/placeholder/400/300',
    description: 'Top commerce college with excellent placement records.',
    type: 'Commerce'
  }
];

export const mockScholarships: Scholarship[] = [
  {
    id: '1',
    title: 'National Merit Scholarship',
    amount: '₹50,000/year',
    eligibility: 'Class 12 - 90% and above',
    deadline: '2025-05-15',
    provider: 'Government of India',
    type: 'Merit',
    description: 'Scholarship for academically excellent students pursuing higher education.'
  },
  {
    id: '2',
    title: 'Minority Community Scholarship',
    amount: '₹30,000/year',
    eligibility: 'Minority community students',
    deadline: '2025-06-30',
    provider: 'Ministry of Minority Affairs',
    type: 'Minority',
    description: 'Financial assistance for students from minority communities.'
  },
  {
    id: '3',
    title: 'Sports Excellence Award',
    amount: '₹75,000/year',
    eligibility: 'State/National level sports achievement',
    deadline: '2025-04-20',
    provider: 'Sports Authority of India',
    type: 'Sports',
    description: 'Scholarship for students with outstanding sports achievements.'
  },
  {
    id: '4',
    title: 'INSPIRE Scholarship for Higher Education',
    amount: '₹80,000/year',
    eligibility: 'Top 1% in Class 12 Science stream',
    deadline: '2025-12-31',
    provider: 'Department of Science & Technology',
    type: 'Merit',
    description: 'For students pursuing science, technology, engineering and mathematics courses at undergraduate and postgraduate levels.'
  },
  {
    id: '5',
    title: 'Kishore Vaigyanik Protsahan Yojana (KVPY)',
    amount: '₹1,00,000/year + contingency',
    eligibility: 'Science aptitude, Class 11/12/1st year UG',
    deadline: '2025-10-15',
    provider: 'Indian Institute of Science',
    type: 'Merit',
    description: 'Fellowship program for students interested in research careers in basic sciences.'
  },
  {
    id: '6',
    title: 'Prime Minister Special Scholarship',
    amount: '₹2,00,000/year',
    eligibility: 'Technical courses, Family income < ₹6 LPA',
    deadline: '2025-01-15',
    provider: 'All India Council for Technical Education',
    type: 'Need-based',
    description: 'For economically weaker sections pursuing quality technical education in premier institutions.'
  },
  {
    id: '7',
    title: 'Post Matric Scholarship for SC Students',
    amount: '₹1,20,000/year',
    eligibility: 'SC category, Family income < ₹2.5 LPA',
    deadline: '2025-11-30',
    provider: 'Ministry of Social Justice & Empowerment',
    type: 'Minority',
    description: 'Financial assistance for SC students pursuing post-matric education.'
  },
  {
    id: '8',
    title: 'Girl Child Education Scholarship',
    amount: '₹25,000/year',
    eligibility: 'Female students, 75% in Class 12',
    deadline: '2025-12-31',
    provider: 'State Government',
    type: 'Merit',
    description: 'Encouraging higher education among girl children across all academic streams.'
  },
  {
    id: '9',
    title: 'Pragati Scholarship for Girls',
    amount: '₹50,000/year',
    eligibility: 'Girls in technical degree courses, Family income < ₹8 LPA',
    deadline: '2025-09-30',
    provider: 'All India Council for Technical Education',
    type: 'Need-based',
    description: 'Scholarship scheme for girl students pursuing technical education.'
  },
  {
    id: '10',
    title: 'Central Sector Scholarship Scheme',
    amount: '₹20,000/year',
    eligibility: 'Top 20,000 students in Class 12, Family income < ₹4.5 LPA',
    deadline: '2025-08-31',
    provider: 'Ministry of Education',
    type: 'Merit',
    description: 'Merit-cum-means scholarship for students from economically weaker sections.'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Computer Science Engineering',
    stream: 'Science',
    duration: '4 years',
    careerOptions: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Cybersecurity Analyst'],
    averageSalary: '₹8-12 LPA',
    description: 'Study of algorithms, programming, and computer systems.'
  },
  {
    id: '2',
    name: 'Psychology',
    stream: 'Arts',
    duration: '3 years',
    careerOptions: ['Clinical Psychologist', 'Counselor', 'HR Specialist', 'Researcher'],
    averageSalary: '₹4-8 LPA',
    description: 'Scientific study of human behavior and mental processes.'
  },
  {
    id: '3',
    name: 'Commerce with Accounting',
    stream: 'Commerce',
    duration: '3 years',
    careerOptions: ['Chartered Accountant', 'Financial Analyst', 'Investment Banker', 'Auditor'],
    averageSalary: '₹5-10 LPA',
    description: 'Study of business, finance, and accounting principles.'
  }
];

export const mockCareers: Career[] = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems.',
    averageSalary: '₹6-15 LPA',
    growthRate: '22% (Much faster than average)',
    skills: ['Programming', 'Problem Solving', 'System Design', 'Communication'],
    education: ['B.Tech Computer Science', 'BCA', 'MCA', 'B.Sc IT'],
    workEnvironment: 'Office-based with remote work options'
  },
  {
    id: '2',
    title: 'Clinical Psychologist',
    description: 'Assess, diagnose, and treat mental health disorders.',
    averageSalary: '₹4-8 LPA',
    growthRate: '8% (Faster than average)',
    skills: ['Empathy', 'Communication', 'Analytical Thinking', 'Research'],
    education: ['M.A. Psychology', 'M.Phil Clinical Psychology', 'Ph.D Psychology'],
    workEnvironment: 'Hospitals, clinics, private practice'
  },
  {
    id: '3',
    title: 'Chartered Accountant',
    description: 'Handle financial auditing, taxation, and business advisory services.',
    averageSalary: '₹7-20 LPA',
    growthRate: '6% (As fast as average)',
    skills: ['Financial Analysis', 'Attention to Detail', 'Ethics', 'Communication'],
    education: ['CA Foundation', 'CA Intermediate', 'CA Final'],
    workEnvironment: 'Accounting firms, corporate offices'
  }
];

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What energizes you most? Rank your top preference:',
    options: ['Building/fixing things', 'Analyzing/logic problems', 'Creating/design work', 'Helping/caring for others', 'Selling/leading people', 'Organizing/detailed work'],
    correctAnswer: 0,
    category: 'Aptitude'
  },
  {
    id: '2',
    question: 'Which skills feel most natural to you today?',
    options: ['Math/logic reasoning', 'Writing/speaking communication', 'Spatial/visual thinking', 'Mechanical/tools work', 'Artistic expression', 'Hands-on service'],
    correctAnswer: 0,
    category: 'Aptitude'
  },
  {
    id: '3',
    question: 'What work trade-offs do you prefer? Choose your preference:',
    options: ['Autonomy over structure', 'Stability over high upside', 'People impact over technical depth', 'Physical activity over desk work'],
    correctAnswer: 0,
    category: 'Interest'
  },
  {
    id: '4',
    question: 'What are your real constraints for the next 2-4 years?',
    options: ['Limited education/training time', 'Budget constraints', 'Location limitations', 'Need for remote work', 'Schedule limitations (nights/weekends)'],
    correctAnswer: 0,
    category: 'Interest'
  },
  {
    id: '5',
    question: 'What would be an absolute deal-breaker for you?',
    options: ['Hazardous work conditions', 'Heavy sales requirements', 'Prolonged study periods', 'Customer-facing roles', 'Low starting pay', 'Shift work schedules'],
    correctAnswer: 0,
    category: 'Personality'
  },
  {
    id: '6',
    question: 'How much risk are you willing to take in your career?',
    options: ['Very low risk - I prefer stability', 'Low risk - Some uncertainty is okay', 'Moderate risk - Balanced approach', 'High risk - I embrace uncertainty', 'Very high risk - High reward potential'],
    correctAnswer: 2,
    category: 'Personality'
  },
  {
    id: '7',
    question: 'When visualizing your career path, what matters most to you?',
    options: ['Building valuable skills and credentials', 'Achieving a specific role/position', 'Reaching target salary goals', 'Maintaining work-life balance', 'Having multiple exit options'],
    correctAnswer: 0,
    category: 'Interest'
  },
  {
    id: '8',
    question: 'What experiment would you most likely do to test career fit?',
    options: ['Job shadowing in the field', 'Informational interviews with professionals', 'Taking a relevant online course', 'Starting a hands-on project', 'Volunteer/part-time trial', 'Attending career fairs'],
    correctAnswer: 0,
    category: 'Aptitude'
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Rahul Gupta',
    role: 'Engineering Student',
    content: 'EduNav helped me discover my passion for computer science and guided me to the best colleges!',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: '2',
    name: 'Priya Patel',
    role: 'Medical Student',
    content: 'The scholarship matching feature saved me thousands of rupees in education costs.',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: '3',
    name: 'Amit Sharma',
    role: 'Parent',
    content: 'As a parent, the ROI calculator helped me make informed decisions about my child\'s education.',
    rating: 5,
    image: '/api/placeholder/80/80'
  }
];