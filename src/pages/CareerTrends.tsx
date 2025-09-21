import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  Users,
  ArrowLeft,
  Globe,
  Calendar,
  Target,
  Zap,
  AlertCircle,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Minus,
  Building,
  GraduationCap,
  Briefcase,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';

interface CareerTrend {
  id: string;
  title: string;
  category: string;
  currentGrowth: number;
  projectedGrowth: number;
  averageSalary: string;
  jobOpenings: number;
  demand: 'High' | 'Medium' | 'Low';
  future: 'Growing' | 'Stable' | 'Declining';
  skills: string[];
  industries: string[];
  description: string;
  timeline: {
    year: number;
    growth: number;
    salary: number;
    jobs: number;
  }[];
}

interface IndustryTrend {
  id: string;
  name: string;
  growth: number;
  marketSize: string;
  keyTrends: string[];
  topCareers: string[];
  futureOutlook: string;
  challenges: string[];
  opportunities: string[];
}

interface SkillTrend {
  skill: string;
  demand: number;
  growth: number;
  category: string;
  careers: string[];
}

const careerTrends: CareerTrend[] = [
  {
    id: '1',
    title: 'Artificial Intelligence Engineer',
    category: 'Technology',
    currentGrowth: 35,
    projectedGrowth: 45,
    averageSalary: '₹15-30 LPA',
    jobOpenings: 50000,
    demand: 'High',
    future: 'Growing',
    skills: ['Machine Learning', 'Python', 'Deep Learning', 'Neural Networks'],
    industries: ['Technology', 'Healthcare', 'Finance', 'Automotive'],
    description: 'AI engineers develop and implement artificial intelligence solutions across various industries.',
    timeline: [
      { year: 2020, growth: 15, salary: 800000, jobs: 15000 },
      { year: 2021, growth: 25, salary: 1000000, jobs: 25000 },
      { year: 2022, growth: 30, salary: 1200000, jobs: 35000 },
      { year: 2023, growth: 35, salary: 1500000, jobs: 45000 },
      { year: 2024, growth: 40, salary: 1800000, jobs: 50000 },
      { year: 2025, growth: 45, salary: 2200000, jobs: 65000 }
    ]
  },
  {
    id: '2',
    title: 'Data Scientist',
    category: 'Technology',
    currentGrowth: 28,
    projectedGrowth: 35,
    averageSalary: '₹12-25 LPA',
    jobOpenings: 75000,
    demand: 'High',
    future: 'Growing',
    skills: ['Python', 'R', 'SQL', 'Statistics', 'Machine Learning'],
    industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce'],
    description: 'Data scientists analyze complex data to help organizations make informed decisions.',
    timeline: [
      { year: 2020, growth: 20, salary: 700000, jobs: 25000 },
      { year: 2021, growth: 22, salary: 850000, jobs: 35000 },
      { year: 2022, growth: 25, salary: 1000000, jobs: 50000 },
      { year: 2023, growth: 28, salary: 1200000, jobs: 65000 },
      { year: 2024, growth: 32, salary: 1400000, jobs: 75000 },
      { year: 2025, growth: 35, salary: 1600000, jobs: 90000 }
    ]
  },
  {
    id: '3',
    title: 'Cybersecurity Analyst',
    category: 'Technology',
    currentGrowth: 32,
    projectedGrowth: 40,
    averageSalary: '₹8-18 LPA',
    jobOpenings: 60000,
    demand: 'High',
    future: 'Growing',
    skills: ['Security Analysis', 'Network Security', 'Ethical Hacking', 'Risk Assessment'],
    industries: ['Technology', 'Finance', 'Government', 'Healthcare'],
    description: 'Cybersecurity analysts protect organizations from digital threats and security breaches.',
    timeline: [
      { year: 2020, growth: 18, salary: 600000, jobs: 20000 },
      { year: 2021, growth: 22, salary: 750000, jobs: 30000 },
      { year: 2022, growth: 28, salary: 900000, jobs: 40000 },
      { year: 2023, growth: 32, salary: 1100000, jobs: 50000 },
      { year: 2024, growth: 36, salary: 1300000, jobs: 60000 },
      { year: 2025, growth: 40, salary: 1500000, jobs: 75000 }
    ]
  },
  {
    id: '4',
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    currentGrowth: 22,
    projectedGrowth: 28,
    averageSalary: '₹5-12 LPA',
    jobOpenings: 120000,
    demand: 'High',
    future: 'Growing',
    skills: ['SEO/SEM', 'Social Media', 'Analytics', 'Content Marketing'],
    industries: ['E-commerce', 'Technology', 'Retail', 'Media'],
    description: 'Digital marketing specialists create and execute online marketing campaigns.',
    timeline: [
      { year: 2020, growth: 15, salary: 400000, jobs: 60000 },
      { year: 2021, growth: 18, salary: 500000, jobs: 75000 },
      { year: 2022, growth: 20, salary: 600000, jobs: 90000 },
      { year: 2023, growth: 22, salary: 700000, jobs: 105000 },
      { year: 2024, growth: 25, salary: 800000, jobs: 120000 },
      { year: 2025, growth: 28, salary: 900000, jobs: 140000 }
    ]
  },
  {
    id: '5',
    title: 'Healthcare Data Analyst',
    category: 'Healthcare',
    currentGrowth: 25,
    projectedGrowth: 30,
    averageSalary: '₹6-15 LPA',
    jobOpenings: 35000,
    demand: 'High',
    future: 'Growing',
    skills: ['Healthcare Analytics', 'SQL', 'Python', 'Medical Knowledge'],
    industries: ['Healthcare', 'Pharmaceuticals', 'Insurance', 'Government'],
    description: 'Healthcare data analysts improve patient outcomes through data-driven insights.',
    timeline: [
      { year: 2020, growth: 12, salary: 450000, jobs: 15000 },
      { year: 2021, growth: 18, salary: 550000, jobs: 20000 },
      { year: 2022, growth: 22, salary: 650000, jobs: 25000 },
      { year: 2023, growth: 25, salary: 750000, jobs: 30000 },
      { year: 2024, growth: 28, salary: 850000, jobs: 35000 },
      { year: 2025, growth: 30, salary: 1000000, jobs: 40000 }
    ]
  },
  {
    id: '6',
    title: 'Sustainable Energy Engineer',
    category: 'Engineering',
    currentGrowth: 30,
    projectedGrowth: 38,
    averageSalary: '₹10-20 LPA',
    jobOpenings: 25000,
    demand: 'High',
    future: 'Growing',
    skills: ['Renewable Energy', 'Environmental Science', 'Project Management', 'CAD'],
    industries: ['Energy', 'Government', 'Manufacturing', 'Consulting'],
    description: 'Sustainable energy engineers design and implement renewable energy solutions.',
    timeline: [
      { year: 2020, growth: 15, salary: 600000, jobs: 8000 },
      { year: 2021, growth: 20, salary: 750000, jobs: 12000 },
      { year: 2022, growth: 25, salary: 900000, jobs: 16000 },
      { year: 2023, growth: 30, salary: 1100000, jobs: 20000 },
      { year: 2024, growth: 34, salary: 1300000, jobs: 25000 },
      { year: 2025, growth: 38, salary: 1500000, jobs: 30000 }
    ]
  }
];

const industryTrends: IndustryTrend[] = [
  {
    id: '1',
    name: 'Technology & Software',
    growth: 25,
    marketSize: '₹15 Trillion',
    keyTrends: ['AI Integration', 'Cloud Computing', 'Remote Work', 'Cybersecurity'],
    topCareers: ['Software Engineer', 'Data Scientist', 'AI Engineer', 'DevOps Engineer'],
    futureOutlook: 'Excellent - Continued growth expected',
    challenges: ['Talent shortage', 'Rapid technology changes', 'Competition'],
    opportunities: ['Emerging technologies', 'Digital transformation', 'Global markets']
  },
  {
    id: '2',
    name: 'Healthcare & Biotechnology',
    growth: 18,
    marketSize: '₹8 Trillion',
    keyTrends: ['Telemedicine', 'AI in Healthcare', 'Personalized Medicine', 'Digital Health'],
    topCareers: ['Doctor', 'Healthcare Data Analyst', 'Biotech Researcher', 'Medical Device Engineer'],
    futureOutlook: 'Very Good - Aging population driving demand',
    challenges: ['Regulatory compliance', 'Cost pressures', 'Technology adoption'],
    opportunities: ['Preventive care', 'AI applications', 'Global expansion']
  },
  {
    id: '3',
    name: 'Finance & Fintech',
    growth: 15,
    marketSize: '₹12 Trillion',
    keyTrends: ['Digital Banking', 'Blockchain', 'Robo-Advisors', 'Open Banking'],
    topCareers: ['Financial Analyst', 'Investment Banker', 'Fintech Developer', 'Risk Manager'],
    futureOutlook: 'Good - Digital transformation ongoing',
    challenges: ['Regulation changes', 'Cybersecurity', 'Competition'],
    opportunities: ['Financial inclusion', 'Emerging markets', 'Innovation']
  },
  {
    id: '4',
    name: 'Green Energy & Sustainability',
    growth: 30,
    marketSize: '₹3 Trillion',
    keyTrends: ['Renewable Energy', 'Carbon Neutrality', 'Smart Grids', 'Energy Storage'],
    topCareers: ['Environmental Engineer', 'Solar Engineer', 'Sustainability Consultant', 'Energy Analyst'],
    futureOutlook: 'Excellent - Climate change driving growth',
    challenges: ['Initial investment', 'Grid integration', 'Policy changes'],
    opportunities: ['Government support', 'Technology advances', 'Global demand']
  },
  {
    id: '5',
    name: 'E-commerce & Retail',
    growth: 20,
    marketSize: '₹7 Trillion',
    keyTrends: ['Omnichannel Retail', 'Social Commerce', 'Supply Chain Optimization', 'Personalization'],
    topCareers: ['E-commerce Manager', 'Supply Chain Analyst', 'Digital Marketing Specialist', 'UX Designer'],
    futureOutlook: 'Good - Digital adoption continuing',
    challenges: ['Competition', 'Logistics', 'Customer expectations'],
    opportunities: ['Rural markets', 'Mobile commerce', 'Innovation']
  }
];

const skillTrends: SkillTrend[] = [
  { skill: 'Python', demand: 95, growth: 25, category: 'Programming', careers: ['Data Scientist', 'AI Engineer', 'Software Engineer'] },
  { skill: 'Machine Learning', demand: 90, growth: 40, category: 'AI/ML', careers: ['Data Scientist', 'AI Engineer', 'ML Engineer'] },
  { skill: 'Cloud Computing', demand: 88, growth: 30, category: 'Technology', careers: ['DevOps Engineer', 'Cloud Architect', 'Software Engineer'] },
  { skill: 'Cybersecurity', demand: 85, growth: 35, category: 'Security', careers: ['Cybersecurity Analyst', 'Security Engineer', 'Penetration Tester'] },
  { skill: 'Data Analysis', demand: 82, growth: 20, category: 'Analytics', careers: ['Data Analyst', 'Business Analyst', 'Data Scientist'] },
  { skill: 'Digital Marketing', demand: 80, growth: 25, category: 'Marketing', careers: ['Digital Marketing Specialist', 'Marketing Manager', 'Growth Hacker'] },
  { skill: 'Project Management', demand: 78, growth: 15, category: 'Management', careers: ['Project Manager', 'Product Manager', 'Operations Manager'] },
  { skill: 'UI/UX Design', demand: 75, growth: 22, category: 'Design', careers: ['UX Designer', 'UI Designer', 'Product Designer'] }
];

export default function CareerTrends() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState('5-year');

  const filteredTrends = careerTrends.filter(trend => 
    selectedCategory === 'All' || trend.category === selectedCategory
  );

  const getGrowthIcon = (growth: number) => {
    if (growth > 30) return <ArrowUp className="h-4 w-4 text-green-600" />;
    if (growth > 15) return <ArrowUp className="h-4 w-4 text-blue-600" />;
    if (growth > 0) return <Minus className="h-4 w-4 text-yellow-600" />;
    return <ArrowDown className="h-4 w-4 text-red-600" />;
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFutureColor = (future: string) => {
    switch (future) {
      case 'Growing': return 'text-green-600 bg-green-100';
      case 'Stable': return 'text-blue-600 bg-blue-100';
      case 'Declining': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/parent-dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Career Trends
              </h1>
              <p className="text-xl text-muted-foreground">
                Stay updated with latest industry trends and job market insights
              </p>
            </div>
          </div>
        </div>

        {/* Key Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fastest Growing</p>
                  <p className="text-xl font-bold">AI Engineering</p>
                  <p className="text-sm text-green-600">+45% growth</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Most Job Openings</p>
                  <p className="text-xl font-bold">Digital Marketing</p>
                  <p className="text-sm text-blue-600">1.2L positions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Highest Salary</p>
                  <p className="text-xl font-bold">AI Engineer</p>
                  <p className="text-sm text-purple-600">₹30 LPA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Emerging Field</p>
                  <p className="text-xl font-bold">Green Energy</p>
                  <p className="text-sm text-orange-600">+38% growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="3-year">3 Years</SelectItem>
                    <SelectItem value="5-year">5 Years</SelectItem>
                    <SelectItem value="10-year">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="careers" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="careers">Career Trends</TabsTrigger>
            <TabsTrigger value="industries">Industry Analysis</TabsTrigger>
            <TabsTrigger value="skills">Skills in Demand</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="careers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTrends.map((trend) => (
                <Card key={trend.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">{trend.title}</CardTitle>
                        <Badge variant="secondary" className="mb-2">{trend.category}</Badge>
                        <p className="text-sm text-muted-foreground">{trend.description}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getGrowthIcon(trend.currentGrowth)}
                        <span className="text-sm font-medium">{trend.currentGrowth}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-success/5 rounded">
                        <div className="flex items-center space-x-1 mb-1">
                          <DollarSign className="h-3 w-3 text-success" />
                          <span className="text-xs font-medium">Avg Salary</span>
                        </div>
                        <div className="text-sm font-bold text-success">{trend.averageSalary}</div>
                      </div>
                      <div className="p-3 bg-primary/5 rounded">
                        <div className="flex items-center space-x-1 mb-1">
                          <Briefcase className="h-3 w-3 text-primary" />
                          <span className="text-xs font-medium">Job Openings</span>
                        </div>
                        <div className="text-sm font-bold text-primary">{trend.jobOpenings.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Demand and Future */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Demand:</span>
                        <Badge className={getDemandColor(trend.demand)}>
                          {trend.demand}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Future:</span>
                        <Badge className={getFutureColor(trend.future)}>
                          {trend.future}
                        </Badge>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {trend.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Industries */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Top Industries</h4>
                      <div className="flex flex-wrap gap-1">
                        {trend.industries.slice(0, 3).map((industry, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Growth Projection */}
                    <div className="p-3 bg-gradient-to-r from-primary/5 to-success/5 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">5-Year Growth Projection</span>
                        <span className="text-lg font-bold text-success">+{trend.projectedGrowth}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="industries" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {industryTrends.map((industry) => (
                <Card key={industry.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">{industry.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Market Size: {industry.marketSize}</span>
                          <span>Growth: +{industry.growth}%</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        +{industry.growth}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Key Trends */}
                    <div>
                      <h4 className="font-semibold mb-2">Key Trends</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.keyTrends.map((trend, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {trend}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Top Careers */}
                    <div>
                      <h4 className="font-semibold mb-2">Top Careers</h4>
                      <div className="space-y-1">
                        {industry.topCareers.map((career, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {career}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Future Outlook */}
                    <div className="p-3 bg-primary/5 rounded">
                      <h4 className="font-semibold mb-1">Future Outlook</h4>
                      <p className="text-sm text-muted-foreground">{industry.futureOutlook}</p>
                    </div>

                    {/* Challenges & Opportunities */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-red-600">Challenges</h4>
                        <ul className="space-y-1">
                          {industry.challenges.map((challenge, index) => (
                            <li key={index} className="text-sm text-red-700">• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-green-600">Opportunities</h4>
                        <ul className="space-y-1">
                          {industry.opportunities.map((opportunity, index) => (
                            <li key={index} className="text-sm text-green-700">• {opportunity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Skills in High Demand</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillTrends.map((skill, index) => (
                    <Card key={index} className="hover:shadow-hover transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold mb-1">{skill.skill}</h3>
                            <Badge variant="secondary" className="text-xs">{skill.category}</Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-primary">{skill.demand}%</div>
                            <div className="text-xs text-muted-foreground">Demand</div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span>Growth Rate</span>
                            <span className="font-medium text-success">+{skill.growth}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-success h-2 rounded-full" 
                              style={{ width: `${skill.growth}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Related Careers</h4>
                          <div className="space-y-1">
                            {skill.careers.map((career, careerIndex) => (
                              <div key={careerIndex} className="text-xs text-muted-foreground">
                                • {career}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Market Overview */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Market Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Job Market</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Total Active Jobs</span>
                        <span className="font-medium">2.5M+</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Average Salary Growth</span>
                        <span className="font-medium text-success">+12% YoY</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Remote Work Adoption</span>
                        <span className="font-medium">45%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Skill Gap</span>
                        <span className="font-medium text-warning">35%</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-success/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Emerging Opportunities</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>AI and Machine Learning roles increasing 40% annually</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Green energy sector creating 50K+ new jobs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Healthcare technology roles in high demand</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Digital transformation driving IT hiring</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Future Predictions */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Future Predictions (2025-2030)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Technology Sector</h4>
                      <p className="text-sm text-muted-foreground">
                        Expected to grow 30% with AI, quantum computing, and cybersecurity leading the charge.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Healthcare & Biotech</h4>
                      <p className="text-sm text-muted-foreground">
                        Personalized medicine and telemedicine will drive 25% growth in related careers.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Sustainable Energy</h4>
                      <p className="text-sm text-muted-foreground">
                        Climate change initiatives will create 100K+ new jobs in renewable energy sector.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Remote Work Evolution</h4>
                      <p className="text-sm text-muted-foreground">
                        60% of jobs will be hybrid/remote, requiring new skills in digital collaboration.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="shadow-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <span>Career Planning Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-semibold mb-3 text-primary">For Students</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Focus on STEM subjects and digital literacy</li>
                        <li>• Develop soft skills like communication and teamwork</li>
                        <li>• Consider internships in emerging technologies</li>
                        <li>• Build a strong online presence and portfolio</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-success/5 rounded-lg">
                      <h4 className="font-semibold mb-3 text-success">For Career Changers</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Identify transferable skills from current role</li>
                        <li>• Consider upskilling in high-demand areas</li>
                        <li>• Network with professionals in target industry</li>
                        <li>• Start with side projects to build experience</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-warning/5 rounded-lg">
                      <h4 className="font-semibold mb-3 text-warning">For Parents</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Encourage exploration of diverse career paths</li>
                        <li>• Support development of both technical and soft skills</li>
                        <li>• Stay informed about emerging industries</li>
                        <li>• Consider ROI of different educational investments</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
