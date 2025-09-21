import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  GitCompare, 
  GraduationCap, 
  TrendingUp,
  IndianRupee,
  BarChart3,
  Target,
  Users,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ParentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'parent') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const parentFeatures = [
    {
      title: 'ROI Calculator',
      description: 'Calculate return on investment for different educational paths',
      icon: Calculator,
      href: '/roi-calculator',
      gradient: true,
    },
    {
      title: 'Career Comparison',
      description: 'Compare different careers side-by-side to make informed decisions',
      icon: GitCompare,
      href: '/compare-careers',
    },
    {
      title: 'Scholarship Finder',
      description: 'Find scholarships and financial aid options for your child',
      icon: GraduationCap,
      href: '/scholarships',
    },
    {
      title: 'College Insights',
      description: 'Detailed information about colleges, fees, and placement records',
      icon: BarChart3,
      href: '/college-insights',
    },
    {
      title: 'Career Trends',
      description: 'Stay updated with latest industry trends and job market insights',
      icon: TrendingUp,
      href: '/career-trends',
    },
    {
      title: 'Investment Planning',
      description: 'Plan education expenses and explore funding options',
      icon: IndianRupee,
      href: '/investment-planning',
    },
  ];

  const insights = [
    {
      title: 'Average Education Cost',
      value: '₹15-25 Lakhs',
      change: '+12%',
      trend: 'up',
      description: 'For 4-year engineering degree'
    },
    {
      title: 'Job Market Growth',
      value: '18%',
      change: '+3%',
      trend: 'up',
      description: 'Tech sector opportunities'
    },
    {
      title: 'Scholarship Success Rate',
      value: '67%',
      change: '+5%',
      trend: 'up',
      description: 'For merit-based applications'
    },
  ];

  const childProgress = [
    { task: 'Complete Aptitude Assessment', status: 'completed', date: '2 days ago' },
    { task: 'Explore Career Options', status: 'in-progress', date: 'In progress' },
    { task: 'Apply for Scholarships', status: 'pending', date: 'Due in 5 days' },
    { task: 'Submit College Applications', status: 'pending', date: 'Due in 2 weeks' },
  ];

  const recommendations = [
    {
      title: 'Start Scholarship Applications',
      description: 'Many scholarships are opening for next academic year',
      priority: 'high',
      icon: AlertCircle,
    },
    {
      title: 'Plan College Visits',
      description: 'Schedule visits to top 3 colleges before admission deadlines',
      priority: 'medium',
      icon: Clock,
    },
    {
      title: 'Consider Education Loan',
      description: 'Explore pre-approved education loan options for better interest rates',
      priority: 'low',
      icon: IndianRupee,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome, {user.name}! 👨‍👩‍👧‍👦
          </h1>
          <p className="text-xl text-muted-foreground">
            Support your child's educational journey with data-driven insights and planning tools.
          </p>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {insights.map((insight, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{insight.value}</div>
                    <div className="text-xs text-muted-foreground">{insight.description}</div>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    insight.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    <span>{insight.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Parent Tools Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Parent Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parentFeatures.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                href={feature.href}
                gradient={feature.gradient}
              />
            ))}
          </div>
        </div>

        {/* Child Progress and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Child's Progress */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Child's Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {childProgress.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-success text-success-foreground' :
                      item.status === 'in-progress' ? 'bg-warning text-warning-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {item.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : item.status === 'in-progress' ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.task}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-warning" />
                <span>Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    recommendation.priority === 'high' ? 'border-destructive bg-destructive/5' :
                    recommendation.priority === 'medium' ? 'border-warning bg-warning/5' :
                    'border-primary bg-primary/5'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <recommendation.icon className={`h-5 w-5 mt-0.5 ${
                        recommendation.priority === 'high' ? 'text-destructive' :
                        recommendation.priority === 'medium' ? 'text-warning' :
                        'text-primary'
                      }`} />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground mb-1">
                          {recommendation.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {recommendation.description}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        recommendation.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                        recommendation.priority === 'medium' ? 'bg-warning/10 text-warning' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {recommendation.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}