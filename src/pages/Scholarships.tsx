import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckCircle2,
  Clock,
  GraduationCap,
  Award
} from 'lucide-react';

const scholarships = [
  {
    id: 1,
    title: 'National Merit Scholarship',
    provider: 'Government of India',
    amount: '₹50,000/year',
    eligibility: 'Class 12 with 85%+ marks',
    deadline: '2024-12-15',
    category: 'Merit-based',
    applicants: '10,000+',
    status: 'open',
    description: 'Awarded to meritorious students for undergraduate studies in any field.'
  },
  {
    id: 2,
    title: 'Inspire Scholarship for Higher Education',
    provider: 'Department of Science & Technology',
    amount: '₹80,000/year',
    eligibility: 'Science stream, Top 1% in boards',
    deadline: '2024-11-30',
    category: 'Science & Technology',
    applicants: '5,000+',
    status: 'open',
    description: 'For students pursuing science, technology, engineering and mathematics courses.'
  },
  {
    id: 3,
    title: 'Minority Community Scholarship',
    provider: 'Ministry of Minority Affairs',
    amount: '₹30,000/year',
    eligibility: 'Minority community background',
    deadline: '2024-10-31',
    category: 'Need-based',
    applicants: '15,000+',
    status: 'closing-soon',
    description: 'Financial assistance for students from minority communities for all courses.'
  },
  {
    id: 4,
    title: 'Kishore Vaigyanik Protsahan Yojana',
    provider: 'Indian Institute of Science',
    amount: '₹1,00,000/year',
    eligibility: 'Research aptitude, Science background',
    deadline: '2024-09-30',
    category: 'Research',
    applicants: '2,000+',
    status: 'closed',
    description: 'For students interested in research careers in basic sciences.'
  },
  {
    id: 5,
    title: 'Prime Minister Special Scholarship',
    provider: 'All India Council for Technical Education',
    amount: '₹2,00,000/year',
    eligibility: 'Technical courses, Family income < 6 LPA',
    deadline: '2025-01-15',
    category: 'Technical Education',
    applicants: '8,000+',
    status: 'open',
    description: 'For economically weaker sections pursuing technical education.'
  },
  {
    id: 6,
    title: 'Girl Child Education Scholarship',
    provider: 'State Government',
    amount: '₹25,000/year',
    eligibility: 'Female students, Class 12 with 75%+',
    deadline: '2024-12-31',
    category: 'Women Empowerment',
    applicants: '12,000+',
    status: 'open',
    description: 'Encouraging higher education among girl children across all streams.'
  }
];

export default function Scholarships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           scholarship.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'success';
      case 'closing-soon': return 'warning';
      case 'closed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
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
                  placeholder="Search scholarships by title or provider..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={selectedCategory === 'merit' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('merit')}
                  size="sm"
                >
                  Merit-based
                </Button>
                <Button
                  variant={selectedCategory === 'need' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('need')}
                  size="sm"
                >
                  Need-based
                </Button>
                <Button
                  variant={selectedCategory === 'research' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('research')}
                  size="sm"
                >
                  Research
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">₹2.5Cr+</div>
              <div className="text-sm text-muted-foreground">Total Scholarships</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">5,200+</div>
              <div className="text-sm text-muted-foreground">Students Benefited</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">180+</div>
              <div className="text-sm text-muted-foreground">Active Scholarships</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">85%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{scholarship.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{scholarship.provider}</p>
                  </div>
                  <Badge variant={scholarship.status === 'open' ? 'default' : scholarship.status === 'closing-soon' ? 'secondary' : 'secondary'}>
                    {getStatusText(scholarship.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{scholarship.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium">{scholarship.amount}</div>
                        <div className="text-xs text-muted-foreground">Scholarship Amount</div>
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

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm">Eligibility: {scholarship.eligibility}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-warning" />
                      <span className="text-sm">Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>

                  <Badge variant="outline" className="text-xs">
                    {scholarship.category}
                  </Badge>

                  <div className="flex space-x-3 pt-4">
                    <Button asChild className="flex-1" disabled={scholarship.status === 'closed'}>
                      <Link to={`/scholarships/${scholarship.id}`}>
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