import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  GraduationCap,
  Star,
  Building,
  Award,
  IndianRupee
} from 'lucide-react';

export default function CollegeDetails() {
  const { id } = useParams();

  // Mock data - in real app, fetch based on ID
  const college = {
    id: parseInt(id || '1'),
    name: 'Indian Institute of Technology Delhi',
    type: 'Public',
    location: 'New Delhi, India',
    rating: 4.8,
    established: 1961,
    phone: '+91-11-2659-1111',
    email: 'info@iitd.ac.in',
    website: 'https://home.iitd.ac.in',
    description: 'IIT Delhi is one of the premier engineering institutes in India, known for its cutting-edge research and excellent academic programs.',
    facilities: ['Central Library', 'Research Labs', 'Sports Complex', 'Hostels', 'Cafeteria', 'Medical Center'],
    courses: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'],
    fees: '₹2,00,000/year',
    placements: '₹15-50 LPA',
    cutoff: 'JEE Advanced Rank: 1-500'
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/colleges">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Colleges
          </Link>
        </Button>

        {/* Header */}
        <Card className="mb-8 shadow-hover">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <CardTitle className="text-2xl md:text-3xl">{college.name}</CardTitle>
                  <Badge variant="outline">{college.type}</Badge>
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="font-medium">{college.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Building className="h-4 w-4" />
                    <span>Est. {college.established}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg">{college.description}</p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <IndianRupee className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{college.fees}</div>
              <div className="text-sm text-muted-foreground">Annual Fees</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{college.placements}</div>
              <div className="text-sm text-muted-foreground">Placement Range</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <GraduationCap className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{college.courses.length}+</div>
              <div className="text-sm text-muted-foreground">Courses Offered</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-warning mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{college.rating}</div>
              <div className="text-sm text-muted-foreground">Student Rating</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Courses Offered */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Courses Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {college.courses.map((course, index) => (
                    <Badge key={index} variant="outline" className="justify-center p-2">
                      {course}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Campus Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {college.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/30">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Admission Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Admission Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Cutoff Details</h4>
                    <p className="text-muted-foreground">{college.cutoff}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Application Process</h4>
                    <p className="text-muted-foreground">
                      Applications are accepted through JEE Advanced counseling process. 
                      Students must clear JEE Main and JEE Advanced examinations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">{college.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">{college.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-primary" />
                  <a href={college.website} target="_blank" rel="noopener noreferrer" 
                     className="text-sm text-primary hover:underline">
                    Visit Website
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/admissions">View Admission Process</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/scholarships">Find Scholarships</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  Download Brochure
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}