import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Search, 
  Star, 
  Users, 
  DollarSign, 
  Calendar,
  GraduationCap,
  Filter,
  ExternalLink
} from 'lucide-react';

const colleges = [
  {
    id: 1,
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi',
    rating: 4.8,
    fees: '₹2.5 Lakhs/year',
    type: 'Government',
    established: 1961,
    courses: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering'],
    cutoff: '99.5 JEE Main Percentile',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Manipal Institute of Technology',
    location: 'Manipal, Karnataka',
    rating: 4.6,
    fees: '₹17 Lakhs/year',
    type: 'Private',
    established: 1957,
    courses: ['Information Technology', 'Electronics', 'Biotechnology'],
    cutoff: '95+ JEE Main Percentile',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    rating: 4.7,
    fees: '₹19 Lakhs/year',
    type: 'Private',
    established: 1964,
    courses: ['Computer Science', 'Chemical Engineering', 'Physics'],
    cutoff: 'BITSAT 350+',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Delhi University',
    location: 'New Delhi',
    rating: 4.5,
    fees: '₹50,000/year',
    type: 'Government',
    established: 1922,
    courses: ['Economics', 'Political Science', 'English Literature'],
    cutoff: '95%+ in Class 12',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Indian Institute of Science',
    location: 'Bangalore, Karnataka',
    rating: 4.9,
    fees: '₹2 Lakhs/year',
    type: 'Government',
    established: 1909,
    courses: ['Research Programs', 'Aerospace Engineering', 'Materials Engineering'],
    cutoff: 'JEE Advanced Rank < 1000',
    image: '/placeholder.svg'
  }
];

export default function Colleges() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || college.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect College
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover top colleges and universities with detailed information about courses, fees, and admissions.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search colleges by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={selectedType === 'government' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('government')}
                  size="sm"
                >
                  Government
                </Button>
                <Button
                  variant={selectedType === 'private' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('private')}
                  size="sm"
                >
                  Private
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{college.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Est. {college.established}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>
                    {college.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm font-medium">{college.rating}/5.0</span>
                    </div>
                    <div className="flex items-center space-x-2 text-primary font-semibold">
                      <DollarSign className="h-4 w-4" />
                      <span>{college.fees}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Popular Courses:</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.courses.slice(0, 3).map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Cutoff: {college.cutoff}</span>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button asChild className="flex-1">
                      <Link to={`/colleges/${college.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={`/colleges/${college.id}/courses`}>
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Courses
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