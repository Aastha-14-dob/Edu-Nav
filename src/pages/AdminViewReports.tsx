import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, BarChart3, Download, Filter, Calendar, Users, GraduationCap, Award, TrendingUp } from 'lucide-react';

export default function AdminViewReports() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState('30');
  const [reportFormat, setReportFormat] = useState('pdf');

  const reportTypes = [
    {
      id: 'user-analytics',
      title: 'User Analytics',
      description: 'User registration, activity, and engagement metrics',
      icon: Users,
      href: '/admin/reports/user-analytics',
      color: 'text-blue-600'
    },
    {
      id: 'college-performance',
      title: 'College Performance',
      description: 'College search, view, and application statistics',
      icon: GraduationCap,
      href: '/admin/reports/college-performance',
      color: 'text-green-600'
    },
    {
      id: 'scholarship-analytics',
      title: 'Scholarship Analytics',
      description: 'Scholarship views, applications, and success rates',
      icon: Award,
      href: '/admin/reports/scholarship-analytics',
      color: 'text-purple-600'
    },
    {
      id: 'quiz-performance',
      title: 'Quiz Performance',
      description: 'Career assessment results and completion rates',
      icon: BarChart3,
      href: '/admin/reports/quiz-performance',
      color: 'text-orange-600'
    },
    {
      id: 'financial-reports',
      title: 'Financial Reports',
      description: 'Revenue, expenses, and financial metrics',
      icon: TrendingUp,
      href: '/admin/reports/financial-reports',
      color: 'text-emerald-600'
    },
    {
      id: 'system-reports',
      title: 'System Reports',
      description: 'Platform performance and technical metrics',
      icon: BarChart3,
      href: '/admin/reports/system-reports',
      color: 'text-red-600'
    }
  ];

  const quickStats = [
    { title: 'Total Users', value: '15,420', change: '+12%', trend: 'up' },
    { title: 'Active Sessions', value: '2,340', change: '+8%', trend: 'up' },
    { title: 'Page Views', value: '45,670', change: '+15%', trend: 'up' },
    { title: 'Conversion Rate', value: '3.2%', change: '-2%', trend: 'down' }
  ];

  const recentReports = [
    { name: 'Monthly User Analytics', date: '2025-01-15', type: 'PDF', size: '2.3 MB' },
    { name: 'College Performance Q4', date: '2025-01-10', type: 'Excel', size: '1.8 MB' },
    { name: 'Scholarship Analytics', date: '2025-01-08', type: 'PDF', size: '3.1 MB' },
    { name: 'System Performance', date: '2025-01-05', type: 'CSV', size: '0.9 MB' }
  ];

  const handleGenerateReport = () => {
    if (selectedReport) {
      const report = reportTypes.find(r => r.id === selectedReport);
      if (report) {
        navigate(report.href, { 
          state: { 
            dateRange, 
            format: reportFormat,
            reportType: selectedReport
          } 
        });
      }
    }
  };

  const handleQuickReport = (reportId: string) => {
    const report = reportTypes.find(r => r.id === reportId);
    if (report) {
      navigate(report.href, { 
        state: { 
          dateRange: '30', 
          format: 'pdf',
          reportType: reportId
        } 
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and view comprehensive reports</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="shadow-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Generation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom Report Generator */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Generate Custom Report</span>
              </CardTitle>
              <CardDescription>
                Create detailed reports with custom parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((report) => (
                        <SelectItem key={report.id} value={report.id}>
                          {report.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateRange">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="365">Last year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filters">Additional Filters</Label>
                  <Input placeholder="Enter filter criteria..." />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleGenerateReport} disabled={!selectedReport}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Types Grid */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Click on any report to generate it quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleQuickReport(report.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <report.icon className={`h-6 w-6 ${report.color} mt-1`} />
                      <div className="flex-1">
                        <h3 className="font-semibold">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Reports */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Recent Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{report.type}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Export All Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Real-time Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Report Statistics */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Report Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reports Generated:</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month:</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Downloads:</span>
                  <span className="font-medium">3,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. Generation Time:</span>
                  <span className="font-medium">2.3s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}