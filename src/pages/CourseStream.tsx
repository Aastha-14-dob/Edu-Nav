import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Award,
  ArrowLeft,
  Star
} from 'lucide-react';

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
        rating: 4.8,
        difficulty: 'High',
        demand: 'Very High'
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
        rating: 4.5,
        difficulty: 'High',
        demand: 'High'
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
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'Medium'
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
        rating: 4.2,
        difficulty: 'Medium',
        demand: 'High'
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
        rating: 4.4,
        difficulty: 'Medium',
        demand: 'High'
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
        rating: 4.7,
        difficulty: 'Very High',
        demand: 'Very High'
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
        rating: 4.1,
        difficulty: 'Medium',
        demand: 'Medium'
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
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'High'
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
        rating: 4.4,
        difficulty: 'Medium',
        demand: 'Medium'
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
        rating: 4.5,
        difficulty: 'Low',
        demand: 'Very High'
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
        rating: 4.6,
        difficulty: 'Medium',
        demand: 'Very High'
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
        rating: 4.2,
        difficulty: 'Medium',
        demand: 'High'
      }
    ]
  }
};

export default function CourseStream() {
  const { stream } = useParams<{ stream: string }>();
  
  if (!stream || !streamData[stream as keyof typeof streamData]) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Stream Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested course stream does not exist.</p>
          <Button asChild variant="outline">
            <Link to="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const data = streamData[stream as keyof typeof streamData];

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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {data.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {data.description}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{data.courses.length}</div>
              <div className="text-sm text-muted-foreground">Available Courses</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {Math.round(data.courses.reduce((sum, course) => sum + course.rating, 0) / data.courses.length * 10) / 10}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">
                {data.courses.filter(course => course.demand === 'Very High' || course.demand === 'High').length}
              </div>
              <div className="text-sm text-muted-foreground">High Demand Courses</div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.courses.map((course) => (
            <Card key={course.id} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline">{course.type}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-warning fill-warning" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{course.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium">{course.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-success" />
                      <div>
                        <div className="text-sm font-medium">{course.expectedPackage}</div>
                        <div className="text-xs text-muted-foreground">Expected Package</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Difficulty:</span>
                      <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Market Demand:</span>
                      <Badge variant="outline" className={getDemandColor(course.demand)}>
                        {course.demand}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Job Roles:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {course.jobRoles.map((role, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button asChild className="flex-1">
                      <Link to={`/courses/${stream}/${course.slug}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/colleges">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Find Colleges
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}