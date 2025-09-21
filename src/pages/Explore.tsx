import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Trophy,
  Users,
  Target,
  Compass,
  TrendingUp
} from 'lucide-react';

const exploreCategories = [
  {
    title: 'Colleges & Universities',
    description: 'Discover top colleges, universities, and educational institutions',
    icon: GraduationCap,
    href: '/colleges',
    color: 'text-primary',
    items: '2,500+ Institutions'
  },
  {
    title: 'Career Opportunities',
    description: 'Explore job opportunities and career paths in various fields',
    icon: Briefcase,
    href: '/careers',
    color: 'text-success',
    items: '5,000+ Jobs'
  },
  {
    title: 'Courses & Programs',
    description: 'Find the perfect course or academic program for your goals',
    icon: BookOpen,
    href: '/courses',
    color: 'text-accent',
    items: '1,200+ Courses'
  },
  {
    title: 'Scholarships & Aid',
    description: 'Financial assistance and scholarship opportunities',
    icon: Trophy,
    href: '/scholarships',
    color: 'text-warning',
    items: '800+ Scholarships'
  },
  {
    title: 'Career Guidance',
    description: 'Get personalized recommendations and career counseling',
    icon: Compass,
    href: '/recommendations',
    color: 'text-purple',
    items: 'Expert Guidance'
  }
];

const stats = [
  { label: 'Students Helped', value: '50,000+', icon: Users },
  { label: 'Career Paths', value: '200+', icon: Briefcase },
  { label: 'Success Rate', value: '95%', icon: TrendingUp },
  { label: 'Partner Institutions', value: '1,000+', icon: GraduationCap }
];

export default function Explore() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Your Future
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover endless possibilities for your career and education. From colleges to career paths, 
            we have everything you need to make informed decisions about your future.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Explore Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreCategories.map((category, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                    <category.icon className={`h-6 w-6 ${category.color} group-hover:text-primary transition-colors`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.items}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {category.description}
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link to={category.href}>
                    Explore {category.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-16">
          <Card className="bg-gradient-primary text-white shadow-glow">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Take our comprehensive career assessment quiz to get personalized recommendations 
                tailored to your interests, skills, and goals.
              </p>
              <div className="space-x-4">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/contact">
                    Get Guidance
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}