import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FeatureCard from '@/components/FeatureCard';
import Navbar from '@/components/Navbar';
import { mockStats } from '@/data/adminMockData';
import { useAuth } from '@/lib/auth';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Brain, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  MessageCircle,
  Users,
  ArrowRight,
  Award,
  BarChart3,
  Settings
} from 'lucide-react';
import { PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const Index = () => {
  const { user } = useAuth();

  // Prepare chart data for admin dashboard
  const userGrowthData = [
    { month: 'Jan', students: 850, parents: 420, activeUsers: 900 },
    { month: 'Feb', students: 920, parents: 460, activeUsers: 1050 },
    { month: 'Mar', students: 1200, parents: 580, activeUsers: 1300 },
    { month: 'Apr', students: 1450, parents: 710, activeUsers: 1600 },
    { month: 'May', students: 1680, parents: 840, activeUsers: 1850 },
    { month: 'Jun', students: mockStats.totalStudents, parents: mockStats.totalParents, activeUsers: mockStats.activeUsers },
  ];

  const streamDistribution = [
    { name: 'Science (Maths)', value: 34, fill: '#6B46C1' }, // purple
    { name: 'Science (Bio)', value: 28, fill: '#14B8A6' },   // teal
    { name: 'Commerce', value: 22, fill: '#F59E0B' },        // amber
    { name: 'Arts', value: 16, fill: '#3B82F6' },            // blue
  ];

  // Removed quizPerformanceData and scholarshipData as per new admin requirements

  const chartConfig = {
    students: { label: 'Students', color: 'hsl(var(--primary))' },
    parents: { label: 'Parents', color: 'hsl(var(--success))' },
    activeUsers: { label: 'Active Users', color: 'hsl(var(--warning))' },
    score: { label: 'Score', color: 'hsl(var(--primary))' },
    count: { label: 'Count', color: 'hsl(var(--primary))' },
  };

  const features = [
    {
      title: 'Aptitude Test',
      description: 'Discover your strengths and career preferences with our comprehensive assessment',
      icon: Brain,
      href: '/quiz',
    },
    {
      title: 'Nearby Colleges',
      description: 'Find the best educational institutions in your area with detailed information',
      icon: MapPin,
      href: '/colleges',
    },
    {
      title: 'Scholarship Matcher',
      description: 'Automatically match with scholarships based on your profile and achievements',
      icon: GraduationCap,
      href: '/scholarships',
    },
    {
      title: 'Admission Deadlines',
      description: 'Never miss important dates with our comprehensive admission timeline',
      icon: Calendar,
      href: '/admissions',
    },
    {
      title: 'Explore Courses',
      description: 'Browse through various streams and courses to find your perfect match',
      icon: BookOpen,
      href: '/courses',
    },
    {
      title: 'FAQs',
      description: 'Get instant answers to your career and education questions 24/7',
      icon: MessageCircle,
      href: '/chatbot',
    },
  ];

  const adminFeatures = [
    {
      title: 'Manage Students',
      description: 'View and manage all registered students, their progress and applications',
      icon: Users,
      href: '/admin/students',
    },
    {
      title: 'Manage Parents',
      description: 'Oversee parent accounts and their linked student relationships',
      icon: Users,
      href: '/admin/parents',
    },
    {
      title: 'Manage Colleges',
      description: 'Add, update and maintain the college database',
      icon: GraduationCap,
      href: '/admin/colleges',
    },
    {
      title: 'Manage Scholarships',
      description: 'Control scholarship listings and eligibility criteria',
      icon: Award,
      href: '/admin/scholarships',
    },
    {
      title: 'Quiz Management',
      description: 'Monitor career test results and quiz performance analytics',
      icon: BarChart3,
      href: '/admin/quizzes',
    },
    {
      title: 'Testimonials',
      description: 'Review and manage student testimonials and feedback',
      icon: MessageCircle,
      href: '/admin/testimonials',
    },
  ];

  // Generate random numbers within 10% of base values
  const generateRandomValue = (baseValue: number) => {
    const variation = baseValue * 0.1; // 10% variation
    const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
    return Math.round(baseValue + (randomFactor * variation));
  };

  const isAdmin = user?.role === 'admin';
  const stats = isAdmin ? [
    { value: generateRandomValue(mockStats.totalStudents), label: 'Total Students', suffix: '' },
    { value: generateRandomValue(mockStats.totalParents), label: 'Total Parents', suffix: '' },
    { value: generateRandomValue(mockStats.totalColleges), label: 'Listed Colleges', suffix: '' },
    { value: generateRandomValue(mockStats.activeUsers), label: 'Active Users', suffix: '' },
  ] : [
    { value: generateRandomValue(200), label: 'Career Paths Explored', suffix: '+' },
    { value: generateRandomValue(500), label: 'Listed Colleges', suffix: '+' },
    { value: generateRandomValue(1000), label: 'Scholarships Listed', suffix: '+' },
    { value: generateRandomValue(15000), label: 'Career Assessments Taken', suffix: '+' },
  ];

  function AnimatedNumber({ value, duration = 3000, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
      let startTimestamp: number | null = null;
      let rafId: number;
      const step = (timestamp: number) => {
        if (startTimestamp === null) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * value);
        setDisplayValue(current);
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(rafId);
    }, [value, duration]);
    return <span>{displayValue.toLocaleString()}{suffix}</span>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden" data-animate>
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              {user?.role === 'admin' ? (
                <>
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                    Analytics
                    <span className="bg-gradient-primary bg-clip-text text-transparent"> Dashboard</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Real-time insights and analytics for your EduNav platform performance and user engagement.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                    Navigate Your
                    <span className="bg-gradient-primary bg-clip-text text-transparent"> Educational Journey</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Discover your perfect career path with AI-powered guidance, personalized recommendations, 
                    and comprehensive resources for students and parents.
                  </p>
                </>
              )}
            </div>
            
            {user?.role !== 'admin' && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            )}

            {/* Quick stats */
            }
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-animate style={{ ['--delay' as any]: `${index * 80}ms` }}>
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {isAdmin ? (
                      <span>{stat.value.toLocaleString()} {stat.suffix}</span>
                    ) : (
                      <AnimatedNumber value={stat.value} duration={3000} suffix={stat.suffix as string} />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Admin Analytics Dashboard */}
      {user?.role === 'admin' && (
        <section className="py-12 bg-muted/30" data-animate>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Platform Analytics & Insights
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Monitor user growth, performance metrics, and platform usage patterns.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* User Growth Chart */}
              <Card className="shadow-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChartIcon className="mr-2 h-5 w-5 text-primary" />
                    User Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="students" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="parents" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Stream wise distribution (replaces College Types Distribution) */}
              <Card className="shadow-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
                    Stream wise distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={streamDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={20}
                          outerRadius={100}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {streamDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            {/* Removed Recent Quiz Performance and Scholarship Amount Distribution */}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-muted/30" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {user?.role === 'admin' ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Administrative Controls
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Manage all aspects of your EduNav platform from students to scholarships.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Everything You Need for Educational Success
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive tools and resources to guide your educational journey from career discovery to college admission.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(user?.role === 'admin' ? adminFeatures : features).map((feature, index) => (
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
      </section>

      

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-hero rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discover Your Future?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who have found their perfect career path with EduNav's personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/signup">Start Your Journey</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/quiz">Take Free Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">EduNav</span>
              </div>
              <p className="text-muted-foreground">
                Your trusted partner in educational and career guidance.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/quiz" className="hover:text-primary">Aptitude Test</Link></li>
                <li><Link to="/colleges" className="hover:text-primary">College Search</Link></li>
                <li><Link to="/scholarships" className="hover:text-primary">Scholarships</Link></li>
                <li><Link to="/courses" className="hover:text-primary">Course Explorer</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Facebook</a></li>
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2025 EduNav – Career GPS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
