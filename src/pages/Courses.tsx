import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  IndianRupee, 
  Clock,
  GraduationCap,
  Code,
  Stethoscope,
  Calculator,
  Palette,
  Briefcase,
  Wrench
} from 'lucide-react';

const streams = [
  {
    id: 1,
    name: 'Science(Maths)',
    icon: Calculator,
    description: 'Mathematics, Physics, Chemistry - Foundation for engineering and technology careers',
    totalCourses: 120,
    avgSalary: '₹8-25 LPA',
    jobGrowth: '+15%',
    color: 'primary',
    courses: [
      { name: 'Computer Science Engineering', duration: '4 years', demand: 'Very High' },
      { name: 'Mechanical Engineering', duration: '4 years', demand: 'High' },
      { name: 'Electrical Engineering', duration: '4 years', demand: 'High' },
      { name: 'Aerospace Engineering', duration: '4 years', demand: 'High' }
    ]
  },
  {
    id: 2,
    name: 'Science(Biology)',
    icon: Stethoscope,
    description: 'Biology, Chemistry, Physics - Foundation for medical and life science careers',
    totalCourses: 80,
    avgSalary: '₹6-30 LPA',
    jobGrowth: '+12%',
    color: 'success',
    courses: [
      { name: 'MBBS', duration: '5.5 years', demand: 'Very High' },
      { name: 'BDS (Dental)', duration: '5 years', demand: 'High' },
      { name: 'BAMS (Ayurveda)', duration: '5.5 years', demand: 'Moderate' },
      { name: 'BUMS (Unani)', duration: '5.5 years', demand: 'Moderate' }
    ]
  },
  {
    id: 3,
    name: 'Commerce',
    icon: Briefcase,
    description: 'Business, Economics, Accounting - Gateway to finance and management careers',
    totalCourses: 120,
    avgSalary: '₹6-20 LPA',
    jobGrowth: '+12%',
    color: 'warning',
    courses: [
      { name: 'Chartered Accountancy', duration: '4-5 years', demand: 'Very High' },
      { name: 'MBA', duration: '2 years', demand: 'High' },
      { name: 'Economics Honors', duration: '3 years', demand: 'Moderate' },
      { name: 'Company Secretary', duration: '3 years', demand: 'High' }
    ]
  },
  {
    id: 4,
    name: 'Arts/Humanities',
    icon: Palette,
    description: 'Literature, History, Psychology, Sociology - Creative and social science fields',
    totalCourses: 200,
    avgSalary: '₹4-15 LPA',
    jobGrowth: '+8%',
    color: 'accent',
    courses: [
      { name: 'Psychology', duration: '3 years', demand: 'High' },
      { name: 'Mass Communication', duration: '3 years', demand: 'Moderate' },
      { name: 'Political Science', duration: '3 years', demand: 'Moderate' },
      { name: 'Fine Arts', duration: '4 years', demand: 'Moderate' }
    ]
  }
];

const featuredCourses = [
  {
    id: 1,
    title: 'Computer Science & Engineering',
    stream: 'Science',
    duration: '4 years',
    fees: '₹8-15 LPA',
    placement: '95%',
    avgSalary: '₹12 LPA',
    skills: ['Programming', 'Problem Solving', 'Data Structures', 'AI/ML'],
    careers: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Tech Lead']
  },
  {
    id: 2,
    title: 'Chartered Accountancy',
    stream: 'Commerce',
    duration: '4-5 years',
    fees: '₹2-5 LPA',
    placement: '90%',
    avgSalary: '₹8 LPA',
    skills: ['Financial Analysis', 'Taxation', 'Auditing', 'Business Law'],
    careers: ['CA', 'Financial Analyst', 'Tax Consultant', 'CFO']
  },
  {
    id: 3,
    title: 'Psychology',
    stream: 'Arts',
    duration: '3-5 years',
    fees: '₹3-8 LPA',
    placement: '80%',
    avgSalary: '₹6 LPA',
    skills: ['Counseling', 'Research', 'Assessment', 'Therapy'],
    careers: ['Clinical Psychologist', 'Counselor', 'HR Specialist', 'Researcher']
  }
];

export default function Courses() {
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  // Map display names to route slugs used by CourseStream's streamData keys
  const getStreamSlug = (displayName: string): string => {
    const name = displayName.toLowerCase();
    if (name.includes('science') && name.includes('math')) return 'science(maths)';
    if (name.includes('science') && name.includes('biology')) return 'science(biology)';
    if (name.includes('commerce')) return 'commerce';
    if (name.includes('arts')) return 'arts';
    return name.replace(/\s+/g, '-');
  };

  // Special handling for featured courses where stream label may be generic
  const getFeaturedStreamSlug = (streamLabel: string, title: string): string => {
    const label = streamLabel.toLowerCase();
    const t = title.toLowerCase();
    if (t.includes('computer') && t.includes('engineering')) return 'science(maths)';
    if (label.includes('commerce') || t.includes('chartered')) return 'commerce';
    if (label.includes('arts') || label.includes('humanities') || t.includes('psychology')) return 'arts';
    return getStreamSlug(streamLabel);
  };

  // Map known course titles to the slugs used in CourseStream/CourseDetails
  const courseSlugMap: Record<string, string> = {
    'computer science & engineering': 'computer-science---engineering',
    'computer science engineering': 'computer-science---engineering',
    'chartered accountancy': 'chartered-accountancy-(ca)',
    psychology: 'psychology',
    'mechanical engineering': 'mechanical-engineering',
    physics: 'physics',
    mathematics: 'mathematics',
    statistics: 'statistics',
    'electronics & communication': 'electronics---communication',
    'mass communication & journalism': 'mass-communication---journalism',
  };

  const toCourseSlug = (title: string): string => {
    const key = title.trim().toLowerCase();
    if (courseSlugMap[key]) return courseSlugMap[key];
    return key.replace(/\s+/g, '-');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Courses & Streams
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover various educational streams and courses to find your perfect career path.
          </p>
        </div>

        {/* Stream Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {streams.map((stream) => (
            <Card 
              key={stream.id} 
              className={`shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer ${
                selectedStream === stream.name ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedStream(selectedStream === stream.name ? null : stream.name)}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-${stream.color}/10 mb-4`}>
                  <stream.icon className={`h-8 w-8 text-${stream.color}`} />
                </div>
                <CardTitle className="text-lg">{stream.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{stream.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Courses:</span>
                    <span className="font-medium">{stream.totalCourses}+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Salary:</span>
                    <span className="font-medium">{stream.avgSalary}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Growth:</span>
                    <span className="font-medium text-success">{stream.jobGrowth}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  asChild
                >
                  <Link to={`/courses/${getStreamSlug(stream.name)}`}>
                    Explore {stream.name}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Stream Courses */}
        {selectedStream && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Popular {selectedStream} Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {streams.find(s => s.name === selectedStream)?.courses.map((course, index) => (
                <Card key={index} className="shadow-card hover:shadow-hover transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">{course.name}</h3>
                      <Badge 
                        variant={course.demand === 'Very High' ? 'default' : 
                                course.demand === 'High' ? 'default' : 'secondary'}
                      >
                        {course.demand} Demand
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      asChild
                    >
                      <Link to={`/courses/${getStreamSlug(selectedStream)}/${toCourseSlug(course.name)}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Featured Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="outline">{course.stream}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium">{course.duration}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fees:</span>
                        <div className="font-medium">{course.fees}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Placement:</span>
                        <div className="font-medium text-success">{course.placement}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Salary:</span>
                        <div className="font-medium text-primary">{course.avgSalary}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Career Options:</h4>
                      <div className="text-xs text-muted-foreground">
                        {course.careers.join(', ')}
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to={`/courses/${getFeaturedStreamSlug(course.stream, course.title)}/${toCourseSlug(course.title)}`}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-card shadow-hover">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Still Confused About Your Career Path?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Take our comprehensive aptitude test to get personalized course recommendations 
              based on your interests, skills, and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/quiz">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Take Aptitude Test
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/chatbot">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Ask AI Assistant
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}