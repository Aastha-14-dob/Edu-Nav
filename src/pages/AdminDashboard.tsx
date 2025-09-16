import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, Award, BarChart3, BookOpen, TrendingUp } from 'lucide-react';
import { mockStats } from '@/data/adminMockData';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Students',
      value: mockStats.totalStudents.toLocaleString(),
      icon: Users,
      description: 'Registered students',
      trend: '+12% from last month'
    },
    {
      title: 'Total Parents',
      value: mockStats.totalParents.toLocaleString(),
      icon: Users,
      description: 'Registered parents',
      trend: '+8% from last month'
    },
    {
      title: 'Active Users',
      value: mockStats.activeUsers.toLocaleString(),
      icon: TrendingUp,
      description: 'Users active this month',
      trend: '+15% from last month'
    },
    {
      title: 'Colleges in Database',
      value: mockStats.totalColleges.toLocaleString(),
      icon: GraduationCap,
      description: 'Total colleges listed',
      trend: '+5 new colleges'
    },
    {
      title: 'Scholarships Available',
      value: mockStats.totalScholarships.toLocaleString(),
      icon: Award,
      description: 'Active scholarships',
      trend: '+10 new scholarships'
    },
    {
      title: 'Career Tests Taken',
      value: mockStats.quizzesTaken.toLocaleString(),
      icon: BarChart3,
      description: 'Total quiz attempts',
      trend: '+25% from last month'
    },
  ];

  const recentActivity = [
    { action: 'New student registered', user: 'Arjun Kumar', time: '2 minutes ago' },
    { action: 'College profile updated', user: 'Admin', time: '15 minutes ago' },
    { action: 'Scholarship application submitted', user: 'Priya Sharma', time: '1 hour ago' },
    { action: 'Career test completed', user: 'Rahul Singh', time: '2 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with EduNav.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {stat.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users Chart Placeholder */}
        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Active users over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">Chart visualization would go here</p>
                <p className="text-xs text-muted-foreground mt-2">Peak activity: 1,200 users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Users className="h-6 w-6 mb-2 text-primary" />
              <p className="text-sm font-medium">Add Student</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <GraduationCap className="h-6 w-6 mb-2 text-primary" />
              <p className="text-sm font-medium">Add College</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Award className="h-6 w-6 mb-2 text-primary" />
              <p className="text-sm font-medium">Add Scholarship</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <BookOpen className="h-6 w-6 mb-2 text-primary" />
              <p className="text-sm font-medium">View Reports</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}