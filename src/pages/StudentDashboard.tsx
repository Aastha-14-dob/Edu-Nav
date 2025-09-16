import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Target, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  MessageCircle,
  TrendingUp,
  Award,
  CheckCircle2
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const dashboardFeatures = [
    {
      title: 'Take Aptitude Test',
      description: 'Discover your strengths and get personalized career recommendations',
      icon: Brain,
      href: '/quiz',
    },
    {
      title: 'View Results',
      description: 'Check your test results and career compatibility scores',
      icon: Target,
      href: '/quiz/results',
    },
    {
      title: 'Career Recommendations',
      description: 'Explore careers matched to your interests and skills',
      icon: TrendingUp,
      href: '/recommendations',
    },
    {
      title: 'Find Colleges',
      description: 'Discover colleges and universities perfect for your goals',
      icon: MapPin,
      href: '/colleges',
    },
    {
      title: 'Scholarships',
      description: 'Find scholarships you\'re eligible for and apply instantly',
      icon: GraduationCap,
      href: '/scholarships',
    },
    {
      title: 'Admission Deadlines',
      description: 'Track important admission dates and requirements',
      icon: Calendar,
      href: '/admissions',
    },
    {
      title: 'Explore Courses',
      description: 'Browse courses across different streams and specializations',
      icon: BookOpen,
      href: '/courses',
    },
    {
      title: 'Reality Checker',
      description: 'Get realistic insights about career prospects and market trends',
      icon: CheckCircle2,
      href: '/reality-checker',
    },
    {
      title: 'AI Assistant',
      description: 'Chat with our AI for instant guidance and answers',
      icon: MessageCircle,
      href: '/chatbot',
    },
  ];

  const progressData = [
    { label: 'Profile Completion', value: 85, color: 'bg-primary' },
    { label: 'Assessments Taken', value: 60, color: 'bg-success' },
    { label: 'Applications Started', value: 40, color: 'bg-warning' },
  ];

  const recentActivities = [
    { icon: Brain, text: 'Completed Aptitude Test', time: '2 hours ago', status: 'completed' },
    { icon: MapPin, text: 'Viewed IIT Delhi details', time: '1 day ago', status: 'viewed' },
    { icon: GraduationCap, text: 'Applied for Merit Scholarship', time: '3 days ago', status: 'applied' },
    { icon: BookOpen, text: 'Explored Computer Science courses', time: '1 week ago', status: 'explored' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Continue your educational journey and discover new opportunities.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {progressData.map((item, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Progress value={item.value} className="h-2" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{item.value}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardFeatures.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                href={feature.href}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <activity.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.text}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-success' :
                      activity.status === 'applied' ? 'bg-warning' :
                      'bg-muted-foreground'
                    }`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-warning" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-success/10">
                  <div className="flex-shrink-0 w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">First Assessment Completed</p>
                    <p className="text-xs text-muted-foreground">Great start on your journey!</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-primary/10">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Profile 85% Complete</p>
                    <p className="text-xs text-muted-foreground">Almost there! Complete your profile for better recommendations.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-lg bg-warning/10">
                  <div className="flex-shrink-0 w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">First Scholarship Applied</p>
                    <p className="text-xs text-muted-foreground">Taking action towards your goals!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}