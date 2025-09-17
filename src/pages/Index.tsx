import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FeatureCard from '@/components/FeatureCard';
import Navbar from '@/components/Navbar';
import { testimonials } from '@/data/mockData';
import { mockStats, mockStudents, mockColleges, mockScholarships, mockQuizResults } from '@/data/adminMockData';
import { useAuth } from '@/lib/auth';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { 
  Brain, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  MessageCircle,
  Star,
  TrendingUp,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Award,
  BarChart3,
  Settings,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';

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

  const collegeTypeData = [
    { name: 'Government', value: mockColleges.filter(c => c.type === 'Government').length, fill: 'hsl(var(--primary))' },
    { name: 'Private', value: mockColleges.filter(c => c.type === 'Private').length, fill: 'hsl(var(--success))' },
    { name: 'Deemed', value: mockColleges.filter(c => c.type === 'Deemed').length, fill: 'hsl(var(--warning))' },
  ];

  const quizPerformanceData = mockQuizResults.map(result => ({
    student: result.studentName.split(' ')[0],
    score: result.score,
    timeTaken: parseInt(result.timeTaken.split(' ')[0]) || 25,
  }));

  const scholarshipData = [
    { range: '0-50K', count: mockScholarships.filter(s => {
      const amount = parseInt(s.amount.replace(/[₹,]/g, ''));
      return amount <= 50000;
    }).length },
    { range: '50K-1L', count: mockScholarships.filter(s => {
      const amount = parseInt(s.amount.replace(/[₹,]/g, ''));
      return amount > 50000 && amount <= 100000;
    }).length },
    { range: '1L-5L', count: mockScholarships.filter(s => {
      const amount = parseInt(s.amount.replace(/[₹,]/g, ''));
      return amount > 100000 && amount <= 500000;
    }).length },
    { range: '5L+', count: mockScholarships.filter(s => {
      const amount = parseInt(s.amount.replace(/[₹,]/g, ''));
      return amount > 500000;
    }).length },
  ];

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

  const stats = user?.role === 'admin' ? [
    { number: mockStats.totalStudents.toLocaleString(), label: 'Total Students' },
    { number: mockStats.totalParents.toLocaleString(), label: 'Total Parents' },
    { number: mockStats.totalColleges.toLocaleString(), label: 'Listed Colleges' },
    { number: mockStats.activeUsers.toLocaleString(), label: 'Active Users' },
  ] : [
    { number: '50K+', label: 'Students Guided' },
    { number: '500+', label: 'Listed Colleges' },
    { number: '1000+', label: 'Scholarships Listed' },
    { number: '95%', label: 'Success Rate' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
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
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            )}

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Admin Analytics Dashboard */}
      {user?.role === 'admin' && (
        <section className="py-12 bg-muted/30">
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

              {/* College Types Distribution */}
              <Card className="shadow-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
                    College Types Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={collegeTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {collegeTypeData.map((entry, index) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quiz Performance */}
              <Card className="shadow-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                    Recent Quiz Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={quizPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="student" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Scholarship Distribution */}
              <Card className="shadow-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Scholarship Amount Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scholarshipData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
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

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why Choose EduNav?
                </h2>
                <p className="text-lg text-muted-foreground">
                  We combine cutting-edge technology with educational expertise to provide 
                  personalized guidance for every student's unique journey.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: TrendingUp, title: 'Data-Driven Insights', description: 'Make informed decisions with real-time career and education data' },
                  { icon: Shield, title: 'Trusted by Thousands', description: 'Join 50,000+ students who have found their perfect career path' },
                  { icon: Users, title: 'Expert Guidance', description: 'Get advice from education counselors and industry professionals' },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-hover">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <CheckCircle className="h-8 w-8 text-success" />
                    <h3 className="text-xl font-semibold">Personalized Recommendations</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Our AI analyzes your interests, skills, and goals to provide tailored career and education recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-hover">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-semibold">Complete College Database</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Access information on 500+ colleges with detailed courses, fees, cutoffs, and admission requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from students and parents who have transformed their educational journey with EduNav.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-muted"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
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
            <p>&copy; 2024 EduNav – Career GPS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
