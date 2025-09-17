import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  IndianRupee,
  GraduationCap,
  Award,
  TrendingUp
} from 'lucide-react';

// Mock data - in real app, this would come from API
const collegeCoursesData = {
  1: {
    collegeName: 'IIT Delhi',
    location: 'Delhi',
    courses: [
      {
        id: 1,
        name: 'Computer Science Engineering',
        degree: 'B.Tech',
        duration: '4 years',
        fees: '₹2.5 L/year',
        seats: 120,
        cutoff: 'JEE Adv Rank 500',
        rating: 4.8,
        description: 'Premier computer science program with focus on AI, ML, and software development.',
        subjects: ['Programming', 'Data Structures', 'Algorithms', 'Machine Learning', 'Database Systems'],
        placements: {
          averagePackage: '₹25 LPA',
          highestPackage: '₹1.2 Cr',
          placementRate: '100%'
        }
      },
      {
        id: 2,
        name: 'Electrical Engineering',
        degree: 'B.Tech',
        duration: '4 years',
        fees: '₹2.5 L/year',
        seats: 100,
        cutoff: 'JEE Adv Rank 800',
        rating: 4.7,
        description: 'Comprehensive electrical engineering program covering power systems and electronics.',
        subjects: ['Circuit Analysis', 'Control Systems', 'Power Electronics', 'Signal Processing'],
        placements: {
          averagePackage: '₹22 LPA',
          highestPackage: '₹85 LPA',
          placementRate: '98%'
        }
      },
      {
        id: 3,
        name: 'Mechanical Engineering',
        degree: 'B.Tech',
        duration: '4 years',
        fees: '₹2.5 L/year',
        seats: 110,
        cutoff: 'JEE Adv Rank 1200',
        rating: 4.6,
        description: 'Traditional mechanical engineering with modern manufacturing and robotics focus.',
        subjects: ['Thermodynamics', 'Fluid Mechanics', 'Manufacturing', 'Robotics'],
        placements: {
          averagePackage: '₹20 LPA',
          highestPackage: '₹75 LPA',
          placementRate: '95%'
        }
      }
    ]
  },
  2: {
    collegeName: 'AIIMS Delhi',
    location: 'Delhi',
    courses: [
      {
        id: 1,
        name: 'Bachelor of Medicine & Surgery',
        degree: 'MBBS',
        duration: '5.5 years',
        fees: '₹5,856/year',
        seats: 125,
        cutoff: 'NEET Rank 50',
        rating: 4.9,
        description: 'Premier medical program with world-class faculty and clinical exposure.',
        subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Clinical Medicine'],
        placements: {
          averagePackage: '₹15 LPA',
          highestPackage: '₹50 LPA',
          placementRate: '100%'
        }
      },
      {
        id: 2,
        name: 'Bachelor of Dental Surgery',
        degree: 'BDS',
        duration: '5 years',
        fees: '₹12,000/year',
        seats: 40,
        cutoff: 'NEET Rank 2000',
        rating: 4.5,
        description: 'Comprehensive dental program with modern facilities and clinical training.',
        subjects: ['Oral Anatomy', 'Dental Materials', 'Oral Surgery', 'Orthodontics'],
        placements: {
          averagePackage: '₹8 LPA',
          highestPackage: '₹25 LPA',
          placementRate: '85%'
        }
      }
    ]
  }
};

export default function CollegeCourses() {
  const { id } = useParams();
  const collegeData = collegeCoursesData[id as '1' | '2'];

  if (!collegeData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">College Not Found</h1>
            <Button asChild>
              <Link to="/colleges">Back to Colleges</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/colleges">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Colleges
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Courses at {collegeData.collegeName}
          </h1>
          <p className="text-xl text-muted-foreground">
            {collegeData.location} • {collegeData.courses.length} Programs Available
          </p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{collegeData.courses.length}</div>
              <div className="text-sm text-muted-foreground">Total Programs</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {collegeData.courses.reduce((acc, course) => acc + course.seats, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Seats</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {Math.max(...collegeData.courses.map(course => parseFloat(course.placements.averagePackage.replace(/[₹LPA]/g, ''))))}L
              </div>
              <div className="text-sm text-muted-foreground">Highest Avg Package</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">
                {Math.round(collegeData.courses.reduce((acc, course) => acc + course.rating, 0) / collegeData.courses.length * 10) / 10}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {collegeData.courses.map((course) => (
            <Card key={course.id} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      {course.name}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline">{course.degree}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        {course.seats} seats
                      </div>
                      <div className="flex items-center text-sm">
                        <Award className="mr-1 h-4 w-4 text-warning" />
                        {course.rating}/5
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{course.fees}</div>
                    <div className="text-sm text-muted-foreground">Annual Fees</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Course Details */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Course Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cutoff:</span>
                        <span className="font-medium">{course.cutoff}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Seats:</span>
                        <span className="font-medium">{course.seats}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Subjects */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Key Subjects</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.subjects.slice(0, 4).map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {course.subjects.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{course.subjects.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Placements */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Placements</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Average:</span>
                        <span className="font-medium text-success">{course.placements.averagePackage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Highest:</span>
                        <span className="font-medium text-warning">{course.placements.highestPackage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rate:</span>
                        <span className="font-medium text-accent">{course.placements.placementRate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-6">
                  <Button asChild className="flex-1">
                    <Link to={`/courses/${course.name.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '-')}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Course Details
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/admissions">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Apply Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}