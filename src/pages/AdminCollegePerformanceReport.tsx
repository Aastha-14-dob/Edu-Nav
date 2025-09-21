import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Download, GraduationCap, TrendingUp, Search, Eye, Users, Star } from 'lucide-react';

export default function AdminCollegePerformanceReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportParams, setReportParams] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('views');

  // Mock data for demonstration
  const collegeStats = {
    totalColleges: 1247,
    activeColleges: 1189,
    newColleges: 23,
    totalViews: 456789,
    totalApplications: 12345,
    avgRating: 4.2,
    topPerforming: 156
  };

  const collegePerformanceData = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      type: 'Engineering',
      location: 'Delhi',
      views: 15420,
      applications: 892,
      conversionRate: 5.8,
      avgRating: 4.8,
      searchRank: 1,
      lastUpdated: '2025-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Indian Institute of Management Ahmedabad',
      type: 'Management',
      location: 'Ahmedabad',
      views: 12340,
      applications: 756,
      conversionRate: 6.1,
      avgRating: 4.7,
      searchRank: 2,
      lastUpdated: '2025-01-14',
      status: 'Active'
    },
    {
      id: 3,
      name: 'All India Institute of Medical Sciences',
      type: 'Medical',
      location: 'New Delhi',
      views: 9876,
      applications: 623,
      conversionRate: 6.3,
      avgRating: 4.9,
      searchRank: 3,
      lastUpdated: '2025-01-13',
      status: 'Active'
    },
    {
      id: 4,
      name: 'National Institute of Technology Trichy',
      type: 'Engineering',
      location: 'Tiruchirappalli',
      views: 8765,
      applications: 445,
      conversionRate: 5.1,
      avgRating: 4.3,
      searchRank: 4,
      lastUpdated: '2025-01-12',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Delhi University',
      type: 'Arts & Science',
      location: 'Delhi',
      views: 7654,
      applications: 389,
      conversionRate: 5.1,
      avgRating: 4.1,
      searchRank: 5,
      lastUpdated: '2025-01-11',
      status: 'Active'
    }
  ];

  const performanceMetrics = [
    { metric: 'Total Page Views', value: '456,789', change: '+18%', trend: 'up' },
    { metric: 'Unique Visitors', value: '89,234', change: '+12%', trend: 'up' },
    { metric: 'Application Rate', value: '2.7%', change: '+0.3%', trend: 'up' },
    { metric: 'Avg. Time on Page', value: '3m 45s', change: '+15%', trend: 'up' },
    { metric: 'Bounce Rate', value: '34.2%', change: '-5%', trend: 'down' },
    { metric: 'Search Visibility', value: '78.5%', change: '+8%', trend: 'up' }
  ];

  const topPerformingColleges = [
    { name: 'IIT Delhi', views: 15420, applications: 892, growth: '+25%' },
    { name: 'IIM Ahmedabad', views: 12340, applications: 756, growth: '+18%' },
    { name: 'AIIMS Delhi', views: 9876, applications: 623, growth: '+22%' },
    { name: 'NIT Trichy', views: 8765, applications: 445, growth: '+15%' },
    { name: 'Delhi University', views: 7654, applications: 389, growth: '+12%' }
  ];

  const collegeTypes = [
    { type: 'Engineering', count: 456, percentage: 36.6, growth: '+8%' },
    { type: 'Medical', count: 234, percentage: 18.8, growth: '+12%' },
    { type: 'Management', count: 189, percentage: 15.2, growth: '+15%' },
    { type: 'Arts & Science', count: 156, percentage: 12.5, growth: '+5%' },
    { type: 'Law', count: 89, percentage: 7.1, growth: '+18%' },
    { type: 'Other', count: 123, percentage: 9.8, growth: '+3%' }
  ];

  useEffect(() => {
    if (location.state) {
      setReportParams(location.state);
    }
  }, [location.state]);

  const handleExport = (format: string) => {
    console.log(`Exporting college performance report in ${format} format`);
    alert(`Report exported as ${format.toUpperCase()}`);
  };

  const handleBack = () => {
    navigate('/admin/view-reports');
  };

  const filteredColleges = collegePerformanceData.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views - a.views;
      case 'applications':
        return b.applications - a.applications;
      case 'conversionRate':
        return b.conversionRate - a.conversionRate;
      case 'rating':
        return b.avgRating - a.avgRating;
      default:
        return 0;
    }
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">College Performance Report</h1>
            <p className="text-muted-foreground">Comprehensive college analytics and performance metrics</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => handleExport('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button onClick={() => handleExport('excel')} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Colleges</p>
                <p className="text-2xl font-bold">{collegeStats.totalColleges.toLocaleString()}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+{collegeStats.newColleges} new</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{collegeStats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+18% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold">{collegeStats.totalApplications.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+12% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">{collegeStats.avgRating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+0.2 this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators for college listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.metric}</p>
                    <p className="text-xl font-bold">{metric.value}</p>
                  </div>
                  <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>College Performance Data</CardTitle>
          <CardDescription>Detailed performance metrics for all colleges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="views">Views</SelectItem>
                <SelectItem value="applications">Applications</SelectItem>
                <SelectItem value="conversionRate">Conversion Rate</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>College Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedColleges.map((college) => (
                <TableRow key={college.id}>
                  <TableCell className="font-medium max-w-48">
                    <div className="truncate">{college.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{college.type}</Badge>
                  </TableCell>
                  <TableCell>{college.location}</TableCell>
                  <TableCell>{college.views.toLocaleString()}</TableCell>
                  <TableCell>{college.applications.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={college.conversionRate >= 6 ? "default" : "secondary"}>
                      {college.conversionRate}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{college.avgRating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={college.status === 'Active' ? 'default' : 'secondary'}>
                      {college.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* College Types Distribution */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>College Types Distribution</CardTitle>
          <CardDescription>Breakdown of colleges by type and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collegeTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{type.type}</h3>
                  <p className="text-sm text-muted-foreground">{type.count} colleges ({type.percentage}%)</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-green-600">
                    {type.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Colleges */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Top Performing Colleges</CardTitle>
          <CardDescription>Colleges with highest engagement and conversion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>College Name</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPerformingColleges.map((college, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge variant={index < 3 ? "default" : "secondary"}>
                      #{index + 1}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{college.name}</TableCell>
                  <TableCell>{college.views.toLocaleString()}</TableCell>
                  <TableCell>{college.applications.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600">
                      {college.growth}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
