import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Award, BarChart3, BookOpen, TrendingUp, ArrowLeft } from 'lucide-react';
import { mockStats } from '@/data/adminMockData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Generate demo data for student registrations over the last 30 days
  const generateStudentRegistrationData = () => {
    const data = [];
    const today = new Date();
    
    // Demo student registration data with realistic patterns
    const demoData = [
      { day: 1, registrations: 12 }, { day: 2, registrations: 8 }, { day: 3, registrations: 15 },
      { day: 4, registrations: 22 }, { day: 5, registrations: 18 }, { day: 6, registrations: 6 },
      { day: 7, registrations: 4 }, { day: 8, registrations: 19 }, { day: 9, registrations: 25 },
      { day: 10, registrations: 31 }, { day: 11, registrations: 28 }, { day: 12, registrations: 14 },
      { day: 13, registrations: 9 }, { day: 14, registrations: 7 }, { day: 15, registrations: 33 },
      { day: 16, registrations: 41 }, { day: 17, registrations: 36 }, { day: 18, registrations: 29 },
      { day: 19, registrations: 17 }, { day: 20, registrations: 11 }, { day: 21, registrations: 8 },
      { day: 22, registrations: 5 }, { day: 23, registrations: 24 }, { day: 24, registrations: 38 },
      { day: 25, registrations: 45 }, { day: 26, registrations: 42 }, { day: 27, registrations: 19 },
      { day: 28, registrations: 13 }, { day: 29, registrations: 9 }, { day: 30, registrations: 16 }
    ];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayNumber = 30 - i;
      const registrationData = demoData.find(d => d.day === dayNumber) || { day: dayNumber, registrations: 0 };
      
      data.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        registrations: registrationData.registrations
      });
    }
    
    return data;
  };

  const [studentRegistrationData] = useState(generateStudentRegistrationData());
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

  // Custom Bar Chart Component for Student Registrations
  const StudentRegistrationChart = ({ data }: { data: typeof studentRegistrationData }) => {
    const maxRegistrations = Math.max(...data.map(d => d.registrations));
    
    return (
      <div className="h-64 w-full">
        <div className="flex items-end justify-between h-full px-2">
          {data.map((item, index) => {
            const height = maxRegistrations > 0 ? (item.registrations / maxRegistrations) * 100 : 0;
            const isToday = index === data.length - 1;
            const isWeekend = new Date(item.date).getDay() === 0 || new Date(item.date).getDay() === 6;
            
            return (
              <div key={item.date} className="flex flex-col items-center flex-1 mx-0.5">
                <div className="flex flex-col items-center mb-2">
                  <div 
                    className={`rounded-t-sm transition-all duration-300 hover:opacity-80 min-h-[4px] w-full ${
                      isWeekend ? 'bg-muted-foreground/60' : 'bg-primary'
                    }`}
                    style={{ height: `${Math.max(height, 4)}%` }}
                    title={`${item.day} ${item.month}: ${item.registrations} new students`}
                  />
                </div>
                <div className={`text-xs mt-1 ${isWeekend ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {item.day}
                </div>
                {isToday && (
                  <div className="text-xs font-medium text-primary mt-1">
                    Today
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-2">
          Peak: {maxRegistrations} registrations • Total: {data.reduce((sum, d) => sum + d.registrations, 0)} students • Average: {Math.round(data.reduce((sum, d) => sum + d.registrations, 0) / data.length)}/day
        </div>
        <div className="flex justify-center items-center mt-2 space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span>Weekdays</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-muted-foreground/60 rounded-sm"></div>
            <span>Weekends</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with EduNav.</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
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
        {/* Student Registration Chart */}
        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle>Student Registrations</CardTitle>
            <CardDescription>New student registrations over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentRegistrationChart data={studentRegistrationData} />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => navigate('/admin/add-college')}
            >
              <GraduationCap className="h-6 w-6 mb-2 text-primary" />
              <p className="text-sm font-medium">Add College</p>
            </div>
            <div 
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => navigate('/admin/add-scholarship')}
            >
              <Award className="h-6 w-6 mb-2 text-primary" />
              <p className="text-sm font-medium">Add Scholarship</p>
            </div>
            <div 
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => navigate('/admin/view-reports')}
            >
              <BookOpen className="h-6 w-6 mb-2 text-primary" />
              <p className="text-sm font-medium">View Reports</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}