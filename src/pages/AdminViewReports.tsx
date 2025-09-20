import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Download, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Award, 
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  FileText,
  Activity
} from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  type: string;
  category: string;
  generatedDate: string;
  period: string;
  status: string;
  data: any;
}

export default function AdminViewReports() {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('last-30-days');
  const [reportType, setReportType] = useState<string>('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data for reports
  const mockReports: ReportData[] = [
    {
      id: '1',
      title: 'User Registration Analytics',
      type: 'analytics',
      category: 'users',
      generatedDate: '2025-01-15',
      period: 'Last 30 days',
      status: 'completed',
      data: {
        totalUsers: 1250,
        newRegistrations: 89,
        activeUsers: 856,
        userGrowth: 12.5
      }
    },
    {
      id: '2',
      title: 'Scholarship Application Report',
      type: 'applications',
      category: 'scholarships',
      generatedDate: '2025-01-14',
      period: 'Last 7 days',
      status: 'completed',
      data: {
        totalApplications: 234,
        approvedApplications: 156,
        pendingApplications: 45,
        rejectedApplications: 33
      }
    },
    {
      id: '3',
      title: 'College Performance Metrics',
      type: 'performance',
      category: 'colleges',
      generatedDate: '2025-01-13',
      period: 'Last 90 days',
      status: 'completed',
      data: {
        totalColleges: 45,
        activeColleges: 42,
        newColleges: 3,
        averageRating: 4.2
      }
    }
  ];

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Report Generated',
      description: 'Your report has been generated successfully!',
    });
    
    setIsGenerating(false);
  };

  const downloadReport = (reportId: string) => {
    toast({
      title: 'Download Started',
      description: 'Report download has been initiated.',
    });
  };

  const renderOverviewDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Colleges</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+3 new colleges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scholarships</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8 new scholarships</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">+15% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Registration Trends</CardTitle>
            <CardDescription>Monthly user registration data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">Chart visualization would go here</p>
                <p className="text-xs text-muted-foreground mt-2">Peak: 89 registrations in January</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Status Distribution</CardTitle>
            <CardDescription>Current scholarship application status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">Pie chart visualization would go here</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Approved: 156</span>
                    <Badge variant="secondary">67%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Pending: 45</span>
                    <Badge variant="secondary">19%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Rejected: 33</span>
                    <Badge variant="secondary">14%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New student registered', user: 'Arjun Kumar', time: '2 minutes ago', type: 'user' },
              { action: 'Scholarship application submitted', user: 'Priya Sharma', time: '15 minutes ago', type: 'application' },
              { action: 'College profile updated', user: 'Admin', time: '1 hour ago', type: 'college' },
              { action: 'New scholarship added', user: 'Admin', time: '2 hours ago', type: 'scholarship' },
              { action: 'Career test completed', user: 'Rahul Singh', time: '3 hours ago', type: 'quiz' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.user} • {activity.time}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUserAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Demographics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Students</span>
              <span className="font-medium">856 (68%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Parents</span>
              <span className="font-medium">312 (25%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Admins</span>
              <span className="font-medium">82 (7%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Delhi</span>
              <span className="font-medium">245</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Mumbai</span>
              <span className="font-medium">189</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Bangalore</span>
              <span className="font-medium">167</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Others</span>
              <span className="font-medium">649</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Highly Active</span>
              <span className="font-medium">234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Moderately Active</span>
              <span className="font-medium">456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Low Activity</span>
              <span className="font-medium">560</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Registration Timeline</CardTitle>
          <CardDescription>Daily registration trends over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">Line chart visualization would go here</p>
              <p className="text-xs text-muted-foreground mt-2">Average: 3.2 registrations per day</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderScholarshipReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <p className="text-sm text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">67%</div>
            <p className="text-sm text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹45K</div>
            <p className="text-sm text-muted-foreground">Per scholarship</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7 days</div>
            <p className="text-sm text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Scholarship Categories</CardTitle>
            <CardDescription>Most popular scholarship types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Merit-Based', applications: 456, percentage: 37 },
                { category: 'Need-Based', applications: 312, percentage: 25 },
                { category: 'Sports', applications: 189, percentage: 15 },
                { category: 'Minority', applications: 156, percentage: 13 },
                { category: 'Research', applications: 121, percentage: 10 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span>{item.applications} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Status Trends</CardTitle>
            <CardDescription>Status changes over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">Status trend chart would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCollegeAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">College Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Government</span>
              <span className="font-medium">18 (40%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Private</span>
              <span className="font-medium">15 (33%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Deemed</span>
              <span className="font-medium">8 (18%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Autonomous</span>
              <span className="font-medium">4 (9%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Ratings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Overall</span>
              <span className="font-medium">4.2/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Infrastructure</span>
              <span className="font-medium">4.1/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Faculty</span>
              <span className="font-medium">4.3/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Placements</span>
              <span className="font-medium">4.0/5</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top States</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Delhi</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Maharashtra</span>
              <span className="font-medium">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Karnataka</span>
              <span className="font-medium">6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Tamil Nadu</span>
              <span className="font-medium">5</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>College Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators for colleges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">Performance metrics chart would go here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and data visualization</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button onClick={generateReport} disabled={isGenerating}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <Label>Filters:</Label>
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="users">User Analytics</SelectItem>
                <SelectItem value="scholarships">Scholarship Reports</SelectItem>
                <SelectItem value="colleges">College Analytics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarship Reports</TabsTrigger>
          <TabsTrigger value="colleges">College Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverviewDashboard()}
        </TabsContent>

        <TabsContent value="users">
          {renderUserAnalytics()}
        </TabsContent>

        <TabsContent value="scholarships">
          {renderScholarshipReports()}
        </TabsContent>

        <TabsContent value="colleges">
          {renderCollegeAnalytics()}
        </TabsContent>
      </Tabs>

      {/* Recent Reports */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Recently generated reports and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Generated on {report.generatedDate} • {report.period}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => downloadReport(report.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
