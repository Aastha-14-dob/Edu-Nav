import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, BarChart3, Users, TrendingUp, Calendar, Filter } from 'lucide-react';

export default function AdminUserAnalyticsReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportParams, setReportParams] = useState<any>(null);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [timeframe, setTimeframe] = useState('30');

  // Mock data for demonstration
  const userStats = {
    totalUsers: 15420,
    newUsers: 1234,
    activeUsers: 8934,
    returningUsers: 4567,
    userGrowth: 12.5,
    retentionRate: 68.3,
    avgSessionDuration: '4m 32s',
    bounceRate: 23.7
  };

  const userRegistrationData = [
    { date: '2025-01-01', registrations: 45, students: 32, parents: 13 },
    { date: '2025-01-02', registrations: 52, students: 38, parents: 14 },
    { date: '2025-01-03', registrations: 38, students: 28, parents: 10 },
    { date: '2025-01-04', registrations: 61, students: 44, parents: 17 },
    { date: '2025-01-05', registrations: 47, students: 33, parents: 14 },
    { date: '2025-01-06', registrations: 29, students: 21, parents: 8 },
    { date: '2025-01-07', registrations: 33, students: 24, parents: 9 },
    { date: '2025-01-08', registrations: 55, students: 39, parents: 16 },
    { date: '2025-01-09', registrations: 42, students: 30, parents: 12 },
    { date: '2025-01-10', registrations: 48, students: 34, parents: 14 }
  ];

  const topSources = [
    { source: 'Google Search', users: 4521, percentage: 29.3 },
    { source: 'Social Media', users: 3124, percentage: 20.3 },
    { source: 'Direct', users: 2890, percentage: 18.7 },
    { source: 'Referral', users: 2156, percentage: 14.0 },
    { source: 'Email Campaign', users: 1890, percentage: 12.3 },
    { source: 'Other', users: 839, percentage: 5.4 }
  ];

  const userSegments = [
    { segment: 'Students (18-25)', count: 8934, percentage: 58.0, growth: '+15%' },
    { segment: 'Parents (35-55)', count: 4567, percentage: 29.6, growth: '+8%' },
    { segment: 'Career Changers (25-40)', count: 1234, percentage: 8.0, growth: '+22%' },
    { segment: 'Professionals (25-50)', count: 685, percentage: 4.4, growth: '+5%' }
  ];

  const activityMetrics = [
    { metric: 'Page Views', value: '456,789', change: '+18%', trend: 'up' },
    { metric: 'Sessions', value: '89,234', change: '+12%', trend: 'up' },
    { metric: 'Bounce Rate', value: '23.7%', change: '-3%', trend: 'down' },
    { metric: 'Avg. Session Duration', value: '4m 32s', change: '+8%', trend: 'up' },
    { metric: 'Pages per Session', value: '3.2', change: '+5%', trend: 'up' },
    { metric: 'Return Visitor Rate', value: '68.3%', change: '+2%', trend: 'up' }
  ];

  useEffect(() => {
    if (location.state) {
      setReportParams(location.state);
    }
  }, [location.state]);

  const handleExport = (format: string) => {
    console.log(`Exporting user analytics report in ${format} format`);
    alert(`Report exported as ${format.toUpperCase()}`);
  };

  const handleBack = () => {
    navigate('/admin/view-reports');
  };

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
            <h1 className="text-3xl font-bold text-foreground">User Analytics Report</h1>
            <p className="text-muted-foreground">Comprehensive user behavior and engagement metrics</p>
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

      {/* Filters */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <span>Report Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Metric Type</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="registration">Registration Trends</SelectItem>
                  <SelectItem value="engagement">User Engagement</SelectItem>
                  <SelectItem value="segments">User Segments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timeframe</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{userStats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+{userStats.userGrowth}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Users</p>
                <p className="text-2xl font-bold">{userStats.newUsers.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">This month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{userStats.activeUsers.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+8% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Retention Rate</p>
                <p className="text-2xl font-bold">{userStats.retentionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+2.3%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registration Trends */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Registration Trends</CardTitle>
          <CardDescription>Daily user registration patterns over the last 10 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Total Registrations</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Parents</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRegistrationData.map((day, index) => {
                const prevDay = index > 0 ? userRegistrationData[index - 1] : null;
                const growth = prevDay ? ((day.registrations - prevDay.registrations) / prevDay.registrations * 100) : 0;
                
                return (
                  <TableRow key={day.date}>
                    <TableCell className="font-medium">{day.date}</TableCell>
                    <TableCell>{day.registrations}</TableCell>
                    <TableCell>{day.students}</TableCell>
                    <TableCell>{day.parents}</TableCell>
                    <TableCell>
                      <Badge variant={growth >= 0 ? "default" : "destructive"}>
                        {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Segments */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>User Segments</CardTitle>
          <CardDescription>Breakdown of users by demographic segments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userSegments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{segment.segment}</h3>
                  <p className="text-sm text-muted-foreground">{segment.count.toLocaleString()} users ({segment.percentage}%)</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-green-600">
                    {segment.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Where users are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSources.map((source, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{source.source}</TableCell>
                  <TableCell>{source.users.toLocaleString()}</TableCell>
                  <TableCell>{source.percentage}%</TableCell>
                  <TableCell>
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Activity Metrics */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Activity Metrics</CardTitle>
          <CardDescription>User engagement and behavior metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activityMetrics.map((metric, index) => (
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
    </div>
  );
}
