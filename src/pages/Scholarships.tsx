import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Calendar, 
  IndianRupee, 
  Users, 
  CheckCircle2,
  Clock,
  GraduationCap,
  Award
} from 'lucide-react';

interface ScholarshipItem {
  name: string;
  provider: string;
  amount: string;
  eligibility: string;
  deadline: string;
  applicants: string;
  type: string;
  status: string;
}

export default function Scholarships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState<ScholarshipItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const apiBase = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5000';

  // Auto-load scholarships on component mount with a default search
  useEffect(() => {
    handleSearch({ term: 'Engineering', category: 'all' });
  }, []);

  const handleSearch = async (overrides?: { category?: string; term?: string }) => {
    const term = overrides?.term ?? searchTerm;
    const category = overrides?.category ?? selectedCategory;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        chosenCourse: term || 'Computer Science',
        location: '',
        academicScore: Number(localStorage.getItem('quizScore') ? JSON.parse(localStorage.getItem('quizScore') as string).percentage : 85)
      };

      let scholarships: ScholarshipItem[] = [];

      try {
        console.log('Searching for scholarships with payload:', payload);
        const res = await fetch(`${apiBase}/api/scholarships`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          console.log('API response:', data);
          scholarships = Array.isArray(data.scholarships) ? data.scholarships : [];
          console.log('Parsed scholarships:', scholarships);
          setUsingFallback(false);
        } else {
          console.error('API request failed with status:', res.status);
          throw new Error('API request failed');
        }
      } catch (apiError) {
        // Use fallback data if API fails - make it dynamic based on search term
        console.warn('API failed, using fallback data:', apiError);
        setUsingFallback(true);
        const searchTermLower = term.toLowerCase();
        
        // Generate dynamic fallback data based on search term
        const baseScholarships = [
          {
            name: `Merit Scholarship for ${term || 'Engineering'}`,
            provider: 'Government of India',
            amount: '₹50,000/year',
            eligibility: `Class 12 with 80%+ marks in ${term || 'PCM'}`,
            deadline: '31/03/2025',
            applicants: '500+',
            type: 'Merit-based',
            status: 'Open'
          },
          {
            name: 'Need-based Financial Aid',
            provider: 'Educational Trust',
            amount: '₹25,000/year',
            eligibility: 'Family income below ₹5 LPA',
            deadline: '15/04/2025',
            applicants: '200+',
            type: 'Need-based',
            status: 'Open'
          },
          {
            name: `Research Excellence Scholarship - ${term || 'STEM'}`,
            provider: 'University Grants Commission',
            amount: '₹75,000/year',
            eligibility: `Research proposal in ${term || 'STEM fields'} and academic excellence`,
            deadline: '30/04/2025',
            applicants: '100+',
            type: 'Research',
            status: 'Open'
          },
          {
            name: 'Women in STEM Scholarship',
            provider: 'Ministry of Education',
            amount: '₹40,000/year',
            eligibility: 'Female students in STEM fields',
            deadline: '20/05/2025',
            applicants: '300+',
            type: 'Merit-based',
            status: 'Open'
          },
          {
            name: 'Rural Development Scholarship',
            provider: 'Rural Development Ministry',
            amount: '₹30,000/year',
            eligibility: 'Students from rural areas',
            deadline: '10/06/2025',
            applicants: '400+',
            type: 'Need-based',
            status: 'Open'
          },
          {
            name: `Innovation Grant for ${term || 'Technology'}`,
            provider: 'Startup India',
            amount: '₹1,00,000/year',
            eligibility: `Innovative project in ${term || 'technology'}`,
            deadline: '25/06/2025',
            applicants: '150+',
            type: 'Research',
            status: 'Open'
          }
        ];
        
        scholarships = baseScholarships;
      }

      // Apply filters but ensure we maintain at least 6 results
      let filteredScholarships = scholarships;
      
      if (category !== 'all') {
        filteredScholarships = scholarships.filter(s => s.type.toLowerCase().includes(category.toLowerCase()));
        // If filtering reduces results below 6, keep some from all categories
        if (filteredScholarships.length < 6) {
          const remaining = scholarships.filter(s => !s.type.toLowerCase().includes(category.toLowerCase()));
          filteredScholarships = [...filteredScholarships, ...remaining.slice(0, 6 - filteredScholarships.length)];
        }
      }

      if (term) {
        const q = term.toLowerCase();
        const termFiltered = filteredScholarships.filter(s => s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q));
        // If term filtering reduces results below 6, keep some unfiltered results
        if (termFiltered.length < 6) {
          const remaining = filteredScholarships.filter(s => !s.name.toLowerCase().includes(q) && !s.provider.toLowerCase().includes(q));
          filteredScholarships = [...termFiltered, ...remaining.slice(0, 6 - termFiltered.length)];
        } else {
          filteredScholarships = termFiltered;
        }
      }
      
      scholarships = filteredScholarships;

      setResults(scholarships);
      setError(null); // Clear any previous errors
    } catch (err: any) {
      console.error('Search error:', err);
      setError('Unable to load scholarships. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'success';
      case 'closing-soon': return 'warning';
      case 'closed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'Open';
      case 'closing-soon': return 'Closing Soon';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Scholarship Opportunities
          </h1>
          <p className="text-xl text-muted-foreground">
            Find scholarships and financial aid opportunities that match your profile and goals.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search scholarships by course or provider..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch({ term: searchTerm, category: selectedCategory }); }}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => { setSelectedCategory('all'); handleSearch({ category: 'all' }); }}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={selectedCategory === 'merit' ? 'default' : 'outline'}
                  onClick={() => { setSelectedCategory('merit'); handleSearch({ category: 'merit' }); }}
                  size="sm"
                >
                  Merit-based
                </Button>
                <Button
                  variant={selectedCategory === 'need' ? 'default' : 'outline'}
                  onClick={() => { setSelectedCategory('need'); handleSearch({ category: 'need' }); }}
                  size="sm"
                >
                  Need-based
                </Button>
                <Button
                  variant={selectedCategory === 'research' ? 'default' : 'outline'}
                  onClick={() => { setSelectedCategory('research'); handleSearch({ category: 'research' }); }}
                  size="sm"
                >
                  Research
                </Button>
                <Button onClick={() => handleSearch({ term: searchTerm, category: selectedCategory })}>
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{results.length}</div>
              <div className="text-sm text-muted-foreground">Results</div>
            </CardContent>
          </Card>
          {usingFallback && (
            <Card className="shadow-card border-warning">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-warning font-medium">Using Sample Data</div>
                <div className="text-xs text-muted-foreground">API unavailable</div>
              </CardContent>
            </Card>
          )}
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">—</div>
              <div className="text-sm text-muted-foreground">Students Benefited</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">—</div>
              <div className="text-sm text-muted-foreground">Active Scholarships</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">—</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading && (
            <div className="text-muted-foreground">Loading scholarships…</div>
          )}
          {error && (
            <div className="text-destructive text-sm">{error}</div>
          )}
          {!loading && !error && results.map((scholarship, idx) => (
            <Card key={`${scholarship.name}-${idx}`} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{scholarship.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{scholarship.provider}</p>
                  </div>
                  <Badge variant={getStatusColor(scholarship.status) as any}>
                    {getStatusText(scholarship.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Eligibility: {scholarship.eligibility}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium">{scholarship.amount}</div>
                        <div className="text-xs text-muted-foreground">Amount / year</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-success" />
                      <div>
                        <div className="text-sm font-medium">{scholarship.applicants}</div>
                        <div className="text-xs text-muted-foreground">Applicants</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-warning" />
                    <span className="text-sm">Deadline: {scholarship.deadline}</span>
                  </div>

                  <Badge variant="outline" className="text-xs">
                    {scholarship.type}
                  </Badge>

                  <div className="flex space-x-3 pt-4">
                    <Button asChild className="flex-1" disabled={scholarship.status.toLowerCase() === 'closed'}>
                      <Link to={`/scholarships/${idx}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/scholarships/history">
                        <Award className="mr-2 h-4 w-4" />
                        History
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