import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { 
  GitCompare, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  ArrowLeft,
  BarChart3,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BookOpen,
  Award,
  Target,
  IndianRupee,
  Calendar,
  MapPin
} from 'lucide-react';

interface CareerData {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  salaryRange: { min: number; max: number };
  growthRate: string;
  growthPercentage: number;
  skills: string[];
  education: string[];
  workEnvironment: string;
  jobSatisfaction: number;
  workLifeBalance: number;
  stressLevel: number;
  jobSecurity: number;
  advancementOpportunities: number;
  educationCost: string;
  educationDuration: string;
  employmentRate: number;
  topCompanies: string[];
  futureOutlook: string;
  pros: string[];
  cons: string[];
  personalityFit: string[];
}

const careerData: CareerData[] = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems.',
    averageSalary: '₹6-15 LPA',
    salaryRange: { min: 600000, max: 1500000 },
    growthRate: '22% (Much faster than average)',
    growthPercentage: 22,
    skills: ['Programming', 'Problem Solving', 'System Design', 'Communication'],
    education: ['B.Tech Computer Science', 'BCA', 'MCA', 'B.Sc IT'],
    workEnvironment: 'Office-based with remote work options',
    jobSatisfaction: 85,
    workLifeBalance: 70,
    stressLevel: 60,
    jobSecurity: 80,
    advancementOpportunities: 90,
    educationCost: '₹15-25 L',
    educationDuration: '4 years',
    employmentRate: 95,
    topCompanies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys'],
    futureOutlook: 'Excellent - High demand expected',
    pros: ['High salary potential', 'Remote work options', 'Continuous learning', 'Creative problem solving'],
    cons: ['Long hours sometimes', 'Constant technology changes', 'High competition'],
    personalityFit: ['Analytical', 'Detail-oriented', 'Problem solver', 'Continuous learner']
  },
  {
    id: '2',
    title: 'Clinical Psychologist',
    description: 'Assess, diagnose, and treat mental health disorders.',
    averageSalary: '₹4-8 LPA',
    salaryRange: { min: 400000, max: 800000 },
    growthRate: '8% (Faster than average)',
    growthPercentage: 8,
    skills: ['Empathy', 'Communication', 'Analytical Thinking', 'Research'],
    education: ['M.A. Psychology', 'M.Phil Clinical Psychology', 'Ph.D Psychology'],
    workEnvironment: 'Hospitals, clinics, private practice',
    jobSatisfaction: 90,
    workLifeBalance: 85,
    stressLevel: 40,
    jobSecurity: 85,
    advancementOpportunities: 70,
    educationCost: '₹8-15 L',
    educationDuration: '5-7 years',
    employmentRate: 88,
    topCompanies: ['AIIMS', 'Fortis Healthcare', 'Apollo Hospitals', 'Private Practice'],
    futureOutlook: 'Good - Growing awareness of mental health',
    pros: ['Helping people', 'Job satisfaction', 'Flexible hours', 'Growing field'],
    cons: ['Lower salary', 'Long education', 'Emotional toll', 'Licensing requirements'],
    personalityFit: ['Empathetic', 'Patient', 'Good listener', 'Emotionally stable']
  },
  {
    id: '3',
    title: 'Chartered Accountant',
    description: 'Handle financial auditing, taxation, and business advisory services.',
    averageSalary: '₹7-20 LPA',
    salaryRange: { min: 700000, max: 2000000 },
    growthRate: '6% (As fast as average)',
    growthPercentage: 6,
    skills: ['Financial Analysis', 'Attention to Detail', 'Ethics', 'Communication'],
    education: ['CA Foundation', 'CA Intermediate', 'CA Final'],
    workEnvironment: 'Accounting firms, corporate offices',
    jobSatisfaction: 75,
    workLifeBalance: 60,
    stressLevel: 70,
    jobSecurity: 90,
    advancementOpportunities: 85,
    educationCost: '₹3-8 L',
    educationDuration: '3-4 years',
    employmentRate: 92,
    topCompanies: ['Big 4 Firms', 'Deloitte', 'PwC', 'EY', 'KPMG'],
    futureOutlook: 'Stable - Always in demand',
    pros: ['High salary', 'Job security', 'Respected profession', 'Multiple career paths'],
    cons: ['High stress', 'Long working hours', 'Complex regulations', 'Competitive exams'],
    personalityFit: ['Detail-oriented', 'Analytical', 'Ethical', 'Patient']
  },
  {
    id: '4',
    title: 'Investment Banker',
    description: 'Help companies raise capital and provide financial advisory services.',
    averageSalary: '₹12-40 LPA',
    salaryRange: { min: 1200000, max: 4000000 },
    growthRate: '10% (Faster than average)',
    growthPercentage: 10,
    skills: ['Financial Modeling', 'Negotiation', 'Analytics', 'Communication'],
    education: ['MBA Finance', 'CFA', 'CA', 'B.Tech + MBA'],
    workEnvironment: 'Investment banks, corporate offices',
    jobSatisfaction: 70,
    workLifeBalance: 40,
    stressLevel: 85,
    jobSecurity: 75,
    advancementOpportunities: 95,
    educationCost: '₹20-50 L',
    educationDuration: '5-6 years',
    employmentRate: 85,
    topCompanies: ['Goldman Sachs', 'Morgan Stanley', 'JP Morgan', 'Deutsche Bank'],
    futureOutlook: 'Good - Financial services growth',
    pros: ['Very high salary', 'Prestige', 'Learning opportunities', 'Global exposure'],
    cons: ['Extremely high stress', 'Long hours', 'High competition', 'Work-life imbalance'],
    personalityFit: ['Ambitious', 'Risk-tolerant', 'Competitive', 'Results-driven']
  },
  {
    id: '5',
    title: 'Doctor',
    description: 'Diagnose and treat medical conditions, promote health and wellness.',
    averageSalary: '₹8-25 LPA',
    salaryRange: { min: 800000, max: 2500000 },
    growthRate: '7% (Faster than average)',
    growthPercentage: 7,
    skills: ['Medical Knowledge', 'Communication', 'Empathy', 'Problem Solving'],
    education: ['MBBS', 'MD/MS', 'Specialization'],
    workEnvironment: 'Hospitals, clinics, private practice',
    jobSatisfaction: 88,
    workLifeBalance: 50,
    stressLevel: 75,
    jobSecurity: 95,
    advancementOpportunities: 80,
    educationCost: '₹50-100 L',
    educationDuration: '5-8 years',
    employmentRate: 98,
    topCompanies: ['AIIMS', 'Apollo', 'Fortis', 'Max Healthcare', 'Private Practice'],
    futureOutlook: 'Excellent - Always needed',
    pros: ['Helping people', 'High respect', 'Job security', 'Good income'],
    cons: ['Long education', 'High cost', 'Stressful', 'Long hours'],
    personalityFit: ['Compassionate', 'Detail-oriented', 'Patient', 'Dedicated']
  }
];

export default function CareerComparison() {
  const navigate = useNavigate();
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState<'detailed' | 'quick'>('detailed');

  const handleCareerSelect = (careerId: string) => {
    setSelectedCareers(prev => {
      if (prev.includes(careerId)) {
        return prev.filter(id => id !== careerId);
      } else if (prev.length < 3) {
        return [...prev, careerId];
      }
      return prev;
    });
  };

  const selectedCareerData = careerData.filter(career => 
    selectedCareers.includes(career.id)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
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
              <GitCompare className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Career Comparison
              </h1>
              <p className="text-xl text-muted-foreground">
                Compare different careers side-by-side to make informed decisions
              </p>
            </div>
          </div>
        </div>

        {/* Career Selection */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Select Careers to Compare (Max 3)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {careerData.map((career) => (
                <div
                  key={career.id}
                  onClick={() => handleCareerSelect(career.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedCareers.includes(career.id)
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{career.title}</h3>
                    {selectedCareers.includes(career.id) && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-success">
                      {career.averageSalary}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {career.growthRate}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Results */}
        {selectedCareers.length > 0 && (
          <div className="space-y-8">
            {/* Mode Selection */}
            <div className="flex justify-center">
              <Tabs value={comparisonMode} onValueChange={(value: 'detailed' | 'quick') => setComparisonMode(value)}>
                <TabsList>
                  <TabsTrigger value="detailed">Detailed Comparison</TabsTrigger>
                  <TabsTrigger value="quick">Quick Overview</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {comparisonMode === 'quick' ? (
              /* Quick Comparison Table */
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Quick Comparison Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-semibold">Career</th>
                          <th className="text-left p-4 font-semibold">Salary Range</th>
                          <th className="text-left p-4 font-semibold">Growth Rate</th>
                          <th className="text-left p-4 font-semibold">Education Cost</th>
                          <th className="text-left p-4 font-semibold">Job Security</th>
                          <th className="text-left p-4 font-semibold">Work-Life Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCareerData.map((career) => (
                          <tr key={career.id} className="border-b hover:bg-muted/50">
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{career.title}</div>
                                <div className="text-sm text-muted-foreground">{career.workEnvironment}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-medium text-success">{career.averageSalary}</div>
                            </td>
                            <td className="p-4">
                              <Badge className="bg-blue-100 text-blue-800">
                                {career.growthRate}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="font-medium">{career.educationCost}</div>
                              <div className="text-sm text-muted-foreground">{career.educationDuration}</div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Progress value={career.jobSecurity} className="w-16 h-2" />
                                <span className="text-sm font-medium">{career.jobSecurity}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Progress value={career.workLifeBalance} className="w-16 h-2" />
                                <span className="text-sm font-medium">{career.workLifeBalance}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Detailed Comparison Cards */
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {selectedCareerData.map((career) => (
                  <Card key={career.id} className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{career.title}</span>
                        <Badge className="bg-primary/10 text-primary">
                          {career.growthPercentage}% Growth
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Salary Information */}
                      <div className="p-4 bg-success/5 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <IndianRupee className="h-4 w-4 text-success" />
                          <span className="font-semibold">Salary Range</span>
                        </div>
                        <div className="text-xl font-bold text-success">
                          {formatCurrency(career.salaryRange.min)} - {formatCurrency(career.salaryRange.max)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Average: {career.averageSalary}
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-muted/50 rounded">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="h-3 w-3 text-warning" />
                            <span className="text-xs font-medium">Job Satisfaction</span>
                          </div>
                          <div className={`text-lg font-bold ${getScoreColor(career.jobSatisfaction)}`}>
                            {career.jobSatisfaction}%
                          </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded">
                          <div className="flex items-center space-x-1 mb-1">
                            <Clock className="h-3 w-3 text-info" />
                            <span className="text-xs font-medium">Work-Life Balance</span>
                          </div>
                          <div className={`text-lg font-bold ${getScoreColor(career.workLifeBalance)}`}>
                            {career.workLifeBalance}%
                          </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded">
                          <div className="flex items-center space-x-1 mb-1">
                            <AlertCircle className="h-3 w-3 text-warning" />
                            <span className="text-xs font-medium">Stress Level</span>
                          </div>
                          <div className={`text-lg font-bold ${getScoreColor(100 - career.stressLevel)}`}>
                            {100 - career.stressLevel}%
                          </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded">
                          <div className="flex items-center space-x-1 mb-1">
                            <Award className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium">Job Security</span>
                          </div>
                          <div className={`text-lg font-bold ${getScoreColor(career.jobSecurity)}`}>
                            {career.jobSecurity}%
                          </div>
                        </div>
                      </div>

                      {/* Education Requirements */}
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="font-semibold">Education</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div><strong>Cost:</strong> {career.educationCost}</div>
                          <div><strong>Duration:</strong> {career.educationDuration}</div>
                          <div><strong>Requirements:</strong></div>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            {career.education.map((edu, index) => (
                              <li key={index} className="text-xs">{edu}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Skills Required */}
                      <div>
                        <h4 className="font-semibold mb-2">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Pros and Cons */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-green-600 flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Pros
                          </h4>
                          <ul className="space-y-1">
                            {career.pros.map((pro, index) => (
                              <li key={index} className="text-sm text-green-700">• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-red-600 flex items-center">
                            <XCircle className="h-4 w-4 mr-1" />
                            Cons
                          </h4>
                          <ul className="space-y-1">
                            {career.cons.map((con, index) => (
                              <li key={index} className="text-sm text-red-700">• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Future Outlook */}
                      <div className="p-3 bg-muted/50 rounded">
                        <h4 className="font-semibold mb-1">Future Outlook</h4>
                        <p className="text-sm text-muted-foreground">{career.futureOutlook}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Summary Insights */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Comparison Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-success/5 rounded-lg">
                    <h4 className="font-semibold mb-2 text-success">Highest Earning Potential</h4>
                    {(() => {
                      const highestEarning = selectedCareerData.reduce((prev, current) => 
                        current.salaryRange.max > prev.salaryRange.max ? current : prev
                      );
                      return (
                        <div>
                          <div className="font-bold text-lg">{highestEarning.title}</div>
                          <div className="text-success">{highestEarning.averageSalary}</div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold mb-2 text-primary">Best Work-Life Balance</h4>
                    {(() => {
                      const bestBalance = selectedCareerData.reduce((prev, current) => 
                        current.workLifeBalance > prev.workLifeBalance ? current : prev
                      );
                      return (
                        <div>
                          <div className="font-bold text-lg">{bestBalance.title}</div>
                          <div className="text-primary">{bestBalance.workLifeBalance}% satisfaction</div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="p-4 bg-warning/5 rounded-lg">
                    <h4 className="font-semibold mb-2 text-warning">Fastest Growing</h4>
                    {(() => {
                      const fastestGrowing = selectedCareerData.reduce((prev, current) => 
                        current.growthPercentage > prev.growthPercentage ? current : prev
                      );
                      return (
                        <div>
                          <div className="font-bold text-lg">{fastestGrowing.title}</div>
                          <div className="text-warning">{fastestGrowing.growthRate}</div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedCareers.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="text-center py-12">
              <GitCompare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Select Careers to Compare</h3>
              <p className="text-muted-foreground">
                Choose up to 3 careers from the options above to see a detailed comparison
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
