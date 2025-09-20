// Mock data for admin dashboard

export const mockStudents = [
  {
    id: '1',
    name: 'Arjun Kumar',
    email: 'arjun@example.com',
    course: 'Computer Science',
    quizScore: 85,
    careerRecommendation: 'Software Developer',
    scholarshipsApplied: 3,
    progress: 75,
    joinDate: '2025-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    course: 'Medicine',
    quizScore: 92,
    careerRecommendation: 'Doctor',
    scholarshipsApplied: 5,
    progress: 88,
    joinDate: '2025-02-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Rahul Singh',
    email: 'rahul@example.com',
    course: 'Engineering',
    quizScore: 78,
    careerRecommendation: 'Mechanical Engineer',
    scholarshipsApplied: 2,
    progress: 60,
    joinDate: '2025-03-10',
    status: 'blocked'
  },
];

export const mockParents = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    linkedStudents: ['Arjun Kumar'],
    roiCalculations: 2,
    joinDate: '2025-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sunita Sharma',
    email: 'sunita@example.com',
    linkedStudents: ['Priya Sharma'],
    roiCalculations: 5,
    joinDate: '2025-02-20',
    status: 'active'
  },
];

export const mockColleges = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'Delhi, India',
    cutoff: 98.5,
    website: 'https://www.iitd.ac.in',
    type: 'Engineering',
    fees: '₹2,50,000'
  },
  {
    id: '2',
    name: 'All India Institute of Medical Sciences',
    location: 'New Delhi, India',
    cutoff: 99.2,
    website: 'https://www.aiims.edu',
    type: 'Medical',
    fees: '₹1,00,000'
  },
  {
    id: '3',
    name: 'Delhi University',
    location: 'Delhi, India',
    cutoff: 85.0,
    website: 'https://www.du.ac.in',
    type: 'General',
    fees: '₹50,000'
  },
];

export const mockScholarships = [
  {
    id: '1',
    title: 'Merit Scholarship for Engineering',
    eligibility: 'Min 90% in 12th grade',
    amount: '₹50,000',
    deadline: '2025-12-31',
    applyLink: 'https://example.com/apply1',
    provider: 'Tech Foundation'
  },
  {
    id: '2',
    title: 'Medical Student Support Grant',
    eligibility: 'NEET qualified students',
    amount: '₹75,000',
    deadline: '2025-11-30',
    applyLink: 'https://example.com/apply2',
    provider: 'Healthcare Trust'
  },
  {
    id: '3',
    title: 'General Excellence Award',
    eligibility: 'Min 85% in any stream',
    amount: '₹25,000',
    deadline: '2025-01-15',
    applyLink: 'https://example.com/apply3',
    provider: 'Education Board'
  },
];

export const mockQuizResults = [
  {
    id: '1',
    studentName: 'Arjun Kumar',
    quizType: 'Career Assessment',
    score: 85,
    completedDate: '2025-03-15',
    timeTaken: '25 minutes',
    recommendation: 'Software Developer'
  },
  {
    id: '2',
    studentName: 'Priya Sharma',
    quizType: 'Aptitude Test',
    score: 92,
    completedDate: '2025-03-14',
    timeTaken: '30 minutes',
    recommendation: 'Doctor'
  },
];

export const mockTestimonials = [
  {
    id: '1',
    studentName: 'Arjun Kumar',
    rating: 5,
    comment: 'EduNav helped me find the perfect college and scholarship!',
    date: '2025-03-10',
    status: 'pending'
  },
  {
    id: '2',
    studentName: 'Priya Sharma',
    rating: 4,
    comment: 'Great platform for career guidance and college selection.',
    date: '2025-03-08',
    status: 'approved'
  },
];

export const mockStats = {
  totalStudents: 1250,
  totalParents: 890,
  totalColleges: 450,
  totalScholarships: 125,
  activeUsers: 980,
  quizzesTaken: 2340,
  successfulPlacements: 340
};