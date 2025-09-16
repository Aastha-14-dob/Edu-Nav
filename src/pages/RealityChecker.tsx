import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Calendar,
  MapPin,
  Briefcase
} from 'lucide-react';

const careerData = {
  'software-engineer': {
    title: 'Software Engineer',
    marketDemand: 'Very High',
    averageSalary: '₹12 LPA',
    jobGrowth: '+15%',
    saturationLevel: 'Low',
    automationRisk: 'Low',
    workLifeBalance: 'Good',
    jobSecurity: 'High',
    entryBarrier: 'Medium',
    salaryTrend: [6, 8, 10, 12, 15, 18, 22],
    jobOpenings: [15000, 18000, 22000, 25000, 28000, 32000],
    skillDemand: {
      'React/Angular': 85,
      'Python': 90,
      'Cloud Computing': 88,
      'AI/ML': 92,
      'DevOps': 78
    },
    industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce', 'Startups'],
    locations: ['Bangalore', 'Pune', 'Hyderabad', 'Gurgaon', 'Mumbai'],
    pros: [
      'High demand across industries',
      'Excellent salary growth potential',
      'Remote work opportunities',
      'Continuous learning and innovation',
      'Global career opportunities'
    ],
    cons: [
      'High competition for top roles',
      'Requires constant skill updates',
      'Can be stressful with tight deadlines',
      'Long hours during project deliveries'
    ]
  },
  'data-scientist': {
    title: 'Data Scientist',
    marketDemand: 'Very High',
    averageSalary: '₹15 LPA',
    jobGrowth: '+20%',
    saturationLevel: 'Low',
    automationRisk: 'Medium',
    workLifeBalance: 'Good',
    jobSecurity: 'High',
    entryBarrier: 'High',
    salaryTrend: [8, 10, 12, 15, 18, 22, 28],
    jobOpenings: [8000, 12000, 15000, 18000, 22000, 25000],
    skillDemand: {
      'Python': 95,
      'Machine Learning': 92,
      'Statistics': 88,
      'SQL': 85,
      'Deep Learning': 90
    },
    industries: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Consulting'],
    locations: ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Chennai'],
    pros: [
      'Highest salary potential',
      'High impact on business decisions',
      'Intellectually challenging work',
      'Growing field with opportunities',
      'Can work across multiple industries'
    ],
    cons: [
      'Requires advanced math and statistics',
      'High competition for entry-level roles',
      'Need continuous learning',
      'Can involve repetitive data cleaning'
    ]
  },
  'digital-marketing': {
    title: 'Digital Marketing Manager',
    marketDemand: 'High',
    averageSalary: '₹8 LPA',
    jobGrowth: '+12%',
    saturationLevel: 'Medium',
    automationRisk: 'Medium',
    workLifeBalance: 'Good',
    jobSecurity: 'Medium',
    entryBarrier: 'Low',
    salaryTrend: [3, 4, 5, 8, 10, 12, 15],
    jobOpenings: [25000, 28000, 32000, 35000, 38000, 42000],
    skillDemand: {
      'SEO/SEM': 88,
      'Social Media': 85,
      'Content Marketing': 82,
      'Analytics': 90,
      'PPC Advertising': 78
    },
    industries: ['E-commerce', 'FMCG', 'Technology', 'Media', 'Agencies'],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai'],
    pros: [
      'Creative and dynamic work',
      'Multiple career paths',
      'Lower entry barriers',
      'Can work remotely',
      'Direct impact on business growth'
    ],
    cons: [
      'Constantly changing platforms',
      'Performance pressure',
      'Can be unpredictable',
      'Weekend work sometimes required'
    ]
  }
};

export default function RealityChecker() {
  const [selectedCareer, setSelectedCareer] = useState<string>('software-engineer');
  
  const career = careerData[selectedCareer as keyof typeof careerData];

  const getIndicatorColor = (value: string) => {
    switch (value) {
      case 'Very High':
      case 'High':
      case 'Good':
      case 'Low': 
        return 'text-success';
      case 'Medium':
        return 'text-warning';
      default:
        return 'text-destructive';
    }
  };

  const getIndicatorIcon = (value: string) => {
    switch (value) {
      case 'Very High':
      case 'High':
      case 'Good':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Medium':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <TrendingDown className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Career Reality Checker
          </h1>
          <p className="text-xl text-muted-foreground">
            Get realistic insights about career prospects, market trends, and what to expect in your chosen field.
          </p>
        </div>

        {/* Career Selector */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <label htmlFor="career-select" className="text-lg font-medium">
                Select a Career to Analyze:
              </label>
              <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                <SelectTrigger className="w-full md:w-80">
                  <SelectValue placeholder="Choose a career" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software-engineer">Software Engineer</SelectItem>
                  <SelectItem value="data-scientist">Data Scientist</SelectItem>
                  <SelectItem value="digital-marketing">Digital Marketing Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Career Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Key Metrics */}
          <div className="lg:col-span-2">
            <Card className="shadow-card mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">{career.title} - Reality Check</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Market Demand', value: career.marketDemand, icon: TrendingUp },
                    { label: 'Avg Salary', value: career.averageSalary, icon: DollarSign },
                    { label: 'Job Growth', value: career.jobGrowth, icon: BarChart3 },
                    { label: 'Job Security', value: career.jobSecurity, icon: CheckCircle2 },
                    { label: 'Saturation', value: career.saturationLevel, icon: Users },
                    { label: 'Automation Risk', value: career.automationRisk, icon: AlertTriangle },
                    { label: 'Work-Life Balance', value: career.workLifeBalance, icon: Clock },
                    { label: 'Entry Barrier', value: career.entryBarrier, icon: Briefcase }
                  ].map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${getIndicatorColor(metric.value)} bg-current bg-opacity-10`}>
                        <metric.icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                      <div className={`font-semibold ${getIndicatorColor(metric.value)}`}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Salary Trend Chart */}
            <Card className="shadow-card mb-6">
              <CardHeader>
                <CardTitle>Salary Growth Trajectory (Years of Experience)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {career.salaryTrend.map((salary, year) => (
                    <div key={year} className="flex items-center space-x-4">
                      <div className="w-16 text-sm text-muted-foreground">
                        {year === 0 ? 'Entry' : `${year}+ yrs`}
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-6 relative">
                        <div 
                          className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${(salary / 28) * 100}%` }}
                        >
                          <span className="text-xs text-primary-foreground font-medium">
                            ₹{salary}L
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills in Demand */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Skills in High Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(career.skillDemand).map(([skill, demand]) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${demand}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-10">{demand}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Information */}
          <div className="space-y-6">
            {/* Industries */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Top Industries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {career.industries.map((industry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="text-sm">{industry}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Locations */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Job Hotspots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {career.locations.map((location, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-success" />
                      <span className="text-sm">{location}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Action */}
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Interested in this career?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get personalized guidance and roadmap
                </p>
                <Button className="w-full" asChild>
                  <Link to={`/reality-checker/${selectedCareer}`}>
                    View Detailed Analysis
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-success">Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {career.pros.map((pro, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-warning">Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {career.cons.map((con, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}