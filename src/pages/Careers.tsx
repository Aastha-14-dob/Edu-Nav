import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Search, 
  TrendingUp, 
  Users, 
  DollarSign, 
  MapPin,
  Building2,
  Clock,
  Star
} from 'lucide-react';
import { useState } from 'react';

const careerData = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Solutions Ltd.',
    location: 'Bangalore, India',
    experience: '2-4 years',
    salary: '₹8-15 LPA',
    skills: ['React', 'Node.js', 'MongoDB'],
    category: 'Technology',
    type: 'Full-time',
    rating: 4.5,
    applicants: 245
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Mumbai, India',
    experience: '3-5 years',
    salary: '₹12-20 LPA',
    skills: ['Python', 'Machine Learning', 'SQL'],
    category: 'Data Science',
    type: 'Full-time',
    rating: 4.7,
    applicants: 180
  },
  {
    id: 3,
    title: 'Digital Marketing Manager',
    company: 'Creative Agency',
    location: 'Delhi, India',
    experience: '2-3 years',
    salary: '₹6-10 LPA',
    skills: ['SEO', 'Google Ads', 'Analytics'],
    category: 'Marketing',
    type: 'Full-time',
    rating: 4.2,
    applicants: 320
  },
  {
    id: 4,
    title: 'Financial Analyst',
    company: 'Investment Bank',
    location: 'Pune, India',
    experience: '1-3 years',
    salary: '₹5-9 LPA',
    skills: ['Excel', 'Financial Modeling', 'SQL'],
    category: 'Finance',
    type: 'Full-time',
    rating: 4.3,
    applicants: 156
  }
];

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCareers = careerData.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           career.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'technology', 'data science', 'marketing', 'finance'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Career Opportunities
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover your dream job and take the next step in your career journey.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">2,500+</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">850+</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">15,000+</div>
              <div className="text-sm text-muted-foreground">Job Seekers</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCareers.map((career) => (
            <Card key={career.id} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{career.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                      <Building2 className="h-4 w-4" />
                      <span>{career.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-sm font-medium">{career.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{career.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-success" />
                      <span className="text-sm">{career.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">{career.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-warning" />
                      <span className="text-sm">{career.applicants} applicants</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{career.category}</Badge>
                    <Badge variant="outline">{career.type}</Badge>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button asChild className="flex-1">
                      <Link to={`/careers/${career.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/careers/apply">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Apply Now
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