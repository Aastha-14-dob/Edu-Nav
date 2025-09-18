import { useState, useEffect } from 'react';
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
  IndianRupee, 
  Calendar,
  GraduationCap,
  Filter,
  ExternalLink
} from 'lucide-react';

interface College {
  name: string;
  location: string;
  established: number;
  rating: number;
  type: string;
  fees: string;
  courses: string[];
  cutoff: string;
}

export default function Colleges() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5000';

  // Auto-fetch colleges on component mount
  useEffect(() => {
    fetchColleges();
  }, []);

  // Add refresh functionality
  const handleRefresh = () => {
    fetchColleges();
  };

  const fetchColleges = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get quiz data if available
      const quizScore = localStorage.getItem('quizScore');
      const quizAnswers = localStorage.getItem('quizAnswers');
      
      let payload = {
        profile: { name: 'Student', class: '12', location: '' },
        quizResult: { strengths: ['General'], interests: ['Education'], rawAnswers: {} },
        preferences: { goal: 'Higher Studies' }
      };

      if (quizScore && quizAnswers) {
        const parsedScore = JSON.parse(quizScore);
        const parsedAnswers = JSON.parse(quizAnswers);
        
        // Derive strengths and interests from quiz
        const categoriesSorted = Object.entries(parsedScore.categories).sort((a, b) => (b[1] as number) - (a[1] as number)).map(([name]) => name);
        const strengths = categoriesSorted.slice(0, 3);
        const interests = parsedScore.recommendations.slice(0, 3);
        
        payload = {
          profile: { name: 'Student', class: '12', location: '' },
          quizResult: { strengths, interests, rawAnswers: parsedAnswers },
          preferences: { goal: 'Higher Studies' }
        };
      }

      const res = await fetch(`${apiBase}/api/career-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to fetch colleges');
      const data = await res.json();
      setColleges(Array.isArray(data.institutes) ? data.institutes : []);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

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
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  size="sm"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span>Loading college recommendations...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="col-span-full text-center text-destructive py-8">
              <div className="bg-destructive/10 p-4 rounded-lg">
                <p className="font-medium">Failed to load colleges</p>
                <p className="text-sm mt-2">{error}</p>
                <Button onClick={handleRefresh} className="mt-4" variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          )}
          {!loading && !error && filteredColleges.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              <p>No colleges found matching your criteria.</p>
              <Button onClick={handleRefresh} className="mt-4" variant="outline">
                Refresh
              </Button>
            </div>
          )}
          {!loading && !error && filteredColleges.map((college, idx) => (
            <Card key={`${college.name}-${idx}`} className="shadow-card hover:shadow-hover transition-all duration-300">
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
                      <IndianRupee className="h-4 w-4" />
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
                      <Link to={`/colleges/${idx}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={`/colleges/${idx}/courses`}>
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