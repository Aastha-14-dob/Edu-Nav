import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  DollarSign, 
  Users, 
  BookOpen,
  ArrowLeft,
  Star,
  TrendingUp,
  Award,
  Target,
  CheckCircle
} from 'lucide-react';

// Import the same data structure from CourseStream
const streamData = {
  science: {
    title: 'Science Stream Courses',
    description: 'Explore scientific and technical fields that shape our future',
    courses: [
      {
        id: 1,
        title: 'Computer Science & Engineering',
        slug: 'computer-science---engineering',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹8-25 LPA',
        jobRoles: ['Software Engineer', 'Data Scientist', 'DevOps Engineer'],
        description: 'Learn programming, algorithms, and software development to build the digital future.',
        detailedDescription: 'Computer Science & Engineering is a comprehensive program that combines theoretical foundations with practical applications. Students learn programming languages, data structures, algorithms, software engineering, database management, and emerging technologies like AI and machine learning.',
        rating: 4.8,
        difficulty: 'High',
        demand: 'Very High',
        subjects: ['Programming', 'Data Structures', 'Algorithms', 'Database Management', 'Software Engineering', 'Computer Networks', 'Operating Systems', 'Machine Learning'],
        skills: ['Problem Solving', 'Logical Thinking', 'Programming', 'Mathematics', 'System Design'],
        eligibility: 'Class 12 with PCM (Physics, Chemistry, Mathematics) with minimum 75% marks'
      },
      {
        id: 2,
        title: 'Electronics & Communication',
        slug: 'electronics---communication',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹6-18 LPA',
        jobRoles: ['Electronics Engineer', 'Network Engineer', 'Hardware Designer'],
        description: 'Master electronic systems, communication technologies, and circuit design.',
        detailedDescription: 'Electronics & Communication Engineering focuses on electronic devices, circuits, communication equipment, and systems. The program covers analog and digital electronics, microprocessors, signal processing, and telecommunications.',
        rating: 4.5,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Electronic Circuits', 'Digital Electronics', 'Microprocessors', 'Signal Processing', 'Communication Systems', 'VLSI Design', 'Embedded Systems'],
        skills: ['Circuit Analysis', 'Problem Solving', 'Mathematics', 'Laboratory Skills'],
        eligibility: 'Class 12 with PCM with minimum 70% marks'
      },
      {
        id: 3,
        title: 'Biotechnology',
        slug: 'biotechnology',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹5-15 LPA',
        jobRoles: ['Biotechnologist', 'Research Scientist', 'Quality Analyst'],
        description: 'Combine biology with technology to solve real-world problems.',
        detailedDescription: 'Biotechnology integrates biological sciences with engineering principles to develop solutions for healthcare, agriculture, environment, and industry. Students study molecular biology, genetics, bioprocessing, and biotechnological applications.',
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['Molecular Biology', 'Genetics', 'Biochemistry', 'Bioprocessing', 'Microbiology', 'Cell Biology', 'Bioinformatics'],
        skills: ['Laboratory Techniques', 'Research Skills', 'Analytical Thinking', 'Biology Knowledge'],
        eligibility: 'Class 12 with PCB (Physics, Chemistry, Biology) with minimum 65% marks'
      }
    ]
  },
  commerce: {
    title: 'Commerce Stream Courses',
    description: 'Build expertise in business, finance, and entrepreneurship',
    courses: [
      {
        id: 1,
        title: 'Bachelor of Commerce (B.Com)',
        slug: 'bachelor-of-commerce-(b.com)',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-12 LPA',
        jobRoles: ['Accountant', 'Financial Analyst', 'Tax Consultant'],
        description: 'Comprehensive business education covering accounting, finance, and economics.',
        detailedDescription: 'Bachelor of Commerce provides foundational knowledge in business, accounting, finance, and economics. Students learn financial reporting, taxation, business law, and management principles preparing them for various business roles.',
        rating: 4.2,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['Accounting', 'Business Economics', 'Business Law', 'Taxation', 'Financial Management', 'Marketing', 'Statistics'],
        skills: ['Numerical Ability', 'Analytical Skills', 'Communication', 'Business Acumen'],
        eligibility: 'Class 12 in any stream with minimum 50% marks'
      },
      {
        id: 2,
        title: 'Bachelor of Business Administration (BBA)',
        slug: 'bachelor-of-business-administration-(bba)',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹5-15 LPA',
        jobRoles: ['Business Manager', 'Marketing Executive', 'HR Specialist'],
        description: 'Develop leadership and management skills for the corporate world.',
        detailedDescription: 'BBA focuses on developing managerial and leadership skills. The program covers all aspects of business management including human resources, marketing, finance, operations, and strategic management.',
        rating: 4.4,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['Management Principles', 'Marketing', 'Human Resource Management', 'Finance', 'Operations Management', 'Business Ethics', 'Organizational Behavior'],
        skills: ['Leadership', 'Communication', 'Strategic Thinking', 'Team Management'],
        eligibility: 'Class 12 in any stream with minimum 50% marks'
      },
      {
        id: 3,
        title: 'Chartered Accountancy (CA)',
        slug: 'chartered-accountancy-(ca)',
        duration: '3-5 years',
        type: 'Professional',
        expectedPackage: '₹8-25 LPA',
        jobRoles: ['Chartered Accountant', 'Financial Advisor', 'Audit Manager'],
        description: 'Prestigious professional course in accounting, taxation, and auditing.',
        detailedDescription: 'Chartered Accountancy is a professional qualification in accounting and finance. The course covers advanced accounting, auditing, taxation, financial management, and business advisory services.',
        rating: 4.7,
        difficulty: 'Very High',
        demand: 'Very High',
        subjects: ['Advanced Accounting', 'Auditing', 'Taxation', 'Financial Management', 'Corporate Law', 'Cost Accounting', 'Management Accounting'],
        skills: ['Analytical Skills', 'Attention to Detail', 'Mathematical Ability', 'Ethics'],
        eligibility: 'Class 12 with minimum 55% marks (50% for reserved categories)'
      }
    ]
  },
  arts: {
    title: 'Arts & Humanities Courses',
    description: 'Explore creativity, culture, and human expression',
    courses: [
      {
        id: 1,
        title: 'Bachelor of Arts (English)',
        slug: 'bachelor-of-arts-(english)',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹3-10 LPA',
        jobRoles: ['Content Writer', 'Journalist', 'English Teacher'],
        description: 'Develop strong communication and analytical skills through literature study.',
        detailedDescription: 'BA English focuses on English literature, language, and communication skills. Students study various literary works, develop critical thinking, and enhance their writing and speaking abilities.',
        rating: 4.1,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['English Literature', 'Grammar & Composition', 'Literary Criticism', 'Creative Writing', 'Linguistics', 'Poetry', 'Drama'],
        skills: ['Communication', 'Critical Thinking', 'Writing', 'Reading Comprehension'],
        eligibility: 'Class 12 in any stream with minimum 45% marks'
      },
      {
        id: 2,
        title: 'Mass Communication & Journalism',
        slug: 'mass-communication---journalism',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-15 LPA',
        jobRoles: ['Journalist', 'PR Executive', 'Media Producer'],
        description: 'Learn media production, journalism, and communication strategies.',
        detailedDescription: 'Mass Communication & Journalism covers various aspects of media including print, electronic, and digital media. Students learn news reporting, media production, public relations, and communication theory.',
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['Journalism', 'Mass Media', 'Public Relations', 'Advertising', 'Film Studies', 'Digital Media', 'Communication Theory'],
        skills: ['Communication', 'Research', 'Writing', 'Technology Skills'],
        eligibility: 'Class 12 in any stream with minimum 50% marks'
      },
      {
        id: 3,
        title: 'Psychology',
        slug: 'psychology',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-12 LPA',
        jobRoles: ['Counselor', 'HR Specialist', 'Clinical Psychologist'],
        description: 'Understand human behavior and mental processes.',
        detailedDescription: 'Psychology is the scientific study of mind and behavior. Students learn about cognitive processes, personality, abnormal psychology, social psychology, and research methods in psychology.',
        rating: 4.4,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['General Psychology', 'Cognitive Psychology', 'Social Psychology', 'Abnormal Psychology', 'Research Methods', 'Statistics', 'Counseling Psychology'],
        skills: ['Empathy', 'Observation', 'Research Skills', 'Communication'],
        eligibility: 'Class 12 in any stream with minimum 50% marks'
      }
    ]
  },
  vocational: {
    title: 'Vocational & Skill-Based Courses',
    description: 'Practical skills training for immediate career entry',
    courses: [
      {
        id: 1,
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        duration: '6 months - 1 year',
        type: 'Certificate',
        expectedPackage: '₹3-12 LPA',
        jobRoles: ['Digital Marketer', 'SEO Specialist', 'Social Media Manager'],
        description: 'Master online marketing strategies and digital tools.',
        detailedDescription: 'Digital Marketing covers various online marketing strategies including SEO, social media marketing, content marketing, email marketing, and paid advertising. Students learn to use digital tools and analytics.',
        rating: 4.5,
        difficulty: 'Low',
        demand: 'Very High',
        subjects: ['SEO/SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Google Analytics', 'PPC Advertising', 'Digital Strategy'],
        skills: ['Creativity', 'Analytical Thinking', 'Technology Skills', 'Communication'],
        eligibility: 'Class 12 in any stream'
      },
      {
        id: 2,
        title: 'Web Development',
        slug: 'web-development',
        duration: '6 months - 2 years',
        type: 'Certificate/Diploma',
        expectedPackage: '₹4-15 LPA',
        jobRoles: ['Web Developer', 'Frontend Developer', 'Full Stack Developer'],
        description: 'Build websites and web applications using modern technologies.',
        detailedDescription: 'Web Development teaches students to create websites and web applications using various programming languages and frameworks. Students learn both frontend and backend development.',
        rating: 4.6,
        difficulty: 'Medium',
        demand: 'Very High',
        subjects: ['HTML/CSS', 'JavaScript', 'React/Angular', 'Node.js', 'Database Management', 'API Development', 'Version Control'],
        skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Creativity'],
        eligibility: 'Class 12 in any stream'
      },
      {
        id: 3,
        title: 'Graphic Design',
        slug: 'graphic-design',
        duration: '6 months - 1 year',
        type: 'Certificate',
        expectedPackage: '₹3-10 LPA',
        jobRoles: ['Graphic Designer', 'UI Designer', 'Brand Designer'],
        description: 'Create visual content for print and digital media.',
        detailedDescription: 'Graphic Design teaches visual communication through typography, color theory, layout design, and digital tools. Students learn to create designs for various media and purposes.',
        rating: 4.2,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['Design Principles', 'Typography', 'Color Theory', 'Adobe Creative Suite', 'Branding', 'Digital Illustration', 'UI/UX Design'],
        skills: ['Creativity', 'Attention to Detail', 'Software Skills', 'Visual Thinking'],
        eligibility: 'Class 12 in any stream'
      }
    ]
  }
};

export default function CourseDetails() {
  const { stream, courseId } = useParams<{ stream: string; courseId: string }>();
  
  if (!stream || !courseId || !streamData[stream as keyof typeof streamData]) {
    return <Navigate to="/courses" replace />;
  }

  const data = streamData[stream as keyof typeof streamData];
  const course = data.courses.find(c => c.slug === courseId);
  
  if (!course) {
    return <Navigate to={`/courses/${stream}`} replace />;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Very High': return 'text-destructive';
      case 'High': return 'text-warning';
      case 'Medium': return 'text-primary';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-success';
      case 'High': return 'text-primary';
      case 'Medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link to={`/courses/${stream}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {data.title}
            </Link>
          </Button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="outline" className="text-sm">{course.type}</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-warning fill-warning" />
                  <span className="text-lg font-medium">{course.rating}</span>
                </div>
              </div>
              <p className="text-xl text-muted-foreground mb-6">
                {course.detailedDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{course.duration}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{course.expectedPackage}</div>
              <div className="text-sm text-muted-foreground">Expected Package</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className={`text-lg font-bold ${getDifficultyColor(course.difficulty)}`}>{course.difficulty}</div>
              <div className="text-sm text-muted-foreground">Difficulty</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className={`text-lg font-bold ${getDemandColor(course.demand)}`}>{course.demand}</div>
              <div className="text-sm text-muted-foreground">Market Demand</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subjects */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Subjects Covered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">{subject}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Skills You'll Develop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Career Opportunities */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Career Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.jobRoles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{role}</span>
                      <Badge variant="outline">In Demand</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Eligibility */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{course.eligibility}</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-card">
              <CardContent className="p-6 space-y-4">
                <Button asChild className="w-full" size="lg">
                  <Link to="/colleges">
                    Find Colleges Offering This Course
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/scholarships">
                    View Scholarships
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/quiz">
                    Take Career Assessment
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}