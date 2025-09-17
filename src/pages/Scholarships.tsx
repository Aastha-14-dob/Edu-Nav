import { useState, useMemo } from 'react';
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

  const apiBase = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5000';

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

      const res = await fetch(`${apiBase}/api/scholarships`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to fetch scholarships');
      const data = await res.json();
      let scholarships: ScholarshipItem[] = Array.isArray(data.scholarships) ? data.scholarships : [];

      if (category !== 'all') {
        scholarships = scholarships.filter(s => s.type.toLowerCase().includes(category.toLowerCase()));
      }

      if (term) {
        const q = term.toLowerCase();
        scholarships = scholarships.filter(s => s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q));
      }

      setResults(scholarships);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
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
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
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
                <Button onClick={() => handleSearch()}>
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