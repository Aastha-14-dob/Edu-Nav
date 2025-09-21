import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  ArrowLeft,
  BarChart3,
  PieChart,
  AlertCircle,
  CheckCircle2,
  IndianRupee,
  Calendar,
  Target,
  Award
} from 'lucide-react';
import { mockCareers, mockColleges } from '@/data/mockData';

interface ROICalculation {
  totalInvestment: number;
  expectedSalary: number;
  yearsToRecover: number;
  lifetimeEarnings: number;
  roi: number;
  monthlyIncome: number;
  annualIncome: number;
}

export default function ROICalculator() {
  const navigate = useNavigate();
  const [selectedCareer, setSelectedCareer] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [educationCost, setEducationCost] = useState('');
  const [additionalExpenses, setAdditionalExpenses] = useState('');
  const [yearsOfStudy, setYearsOfStudy] = useState('4');
  const [workingYears, setWorkingYears] = useState('40');
  const [roiCalculation, setRoiCalculation] = useState<ROICalculation | null>(null);

  const calculateROI = () => {
    if (!selectedCareer || !educationCost || !yearsOfStudy) return;

    const career = mockCareers.find(c => c.title === selectedCareer);
    const college = mockColleges.find(c => c.name === selectedCollege);
    
    const totalCost = parseFloat(educationCost) + parseFloat(additionalExpenses || '0');
    const salaryRange = career?.averageSalary || '₹6-15 LPA';
    const avgSalary = parseFloat(salaryRange.split('-')[1]?.replace(/[₹,LPA]/g, '')) * 100000 || 800000;
    
    const yearsToRecover = totalCost / avgSalary;
    const lifetimeEarnings = avgSalary * parseInt(workingYears);
    const roi = ((lifetimeEarnings - totalCost) / totalCost) * 100;
    const monthlyIncome = avgSalary / 12;
    const annualIncome = avgSalary;

    setRoiCalculation({
      totalInvestment: totalCost,
      expectedSalary: avgSalary,
      yearsToRecover,
      lifetimeEarnings,
      roi,
      monthlyIncome,
      annualIncome
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getROIStatus = (roi: number) => {
    if (roi > 500) return { status: 'excellent', color: 'text-green-600', icon: CheckCircle2 };
    if (roi > 200) return { status: 'good', color: 'text-blue-600', icon: TrendingUp };
    if (roi > 100) return { status: 'average', color: 'text-yellow-600', icon: AlertCircle };
    return { status: 'poor', color: 'text-red-600', icon: AlertCircle };
  };

  const careerOptions = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'Clinical Psychologist',
    'Chartered Accountant',
    'Investment Banker',
    'Doctor',
    'Engineer',
    'Teacher',
    'Lawyer'
  ];

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
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                ROI Calculator
              </h1>
              <p className="text-xl text-muted-foreground">
                Calculate the return on investment for your child's education
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="calculator" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>Education Investment Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="career">Target Career</Label>
                    <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a career" />
                      </SelectTrigger>
                      <SelectContent>
                        {careerOptions.map((career) => (
                          <SelectItem key={career} value={career}>
                            {career}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">Preferred College</Label>
                    <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a college" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockColleges.map((college) => (
                          <SelectItem key={college.id} value={college.name}>
                            {college.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educationCost">Total Education Cost (₹)</Label>
                    <Input
                      id="educationCost"
                      type="number"
                      placeholder="e.g., 500000"
                      value={educationCost}
                      onChange={(e) => setEducationCost(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalExpenses">Additional Expenses (₹)</Label>
                    <Input
                      id="additionalExpenses"
                      type="number"
                      placeholder="Books, accommodation, etc."
                      value={additionalExpenses}
                      onChange={(e) => setAdditionalExpenses(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfStudy">Years of Study</Label>
                      <Select value={yearsOfStudy} onValueChange={setYearsOfStudy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 years</SelectItem>
                          <SelectItem value="3">3 years</SelectItem>
                          <SelectItem value="4">4 years</SelectItem>
                          <SelectItem value="5">5 years</SelectItem>
                          <SelectItem value="6">6 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workingYears">Expected Working Years</Label>
                      <Select value={workingYears} onValueChange={setWorkingYears}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 years</SelectItem>
                          <SelectItem value="35">35 years</SelectItem>
                          <SelectItem value="40">40 years</SelectItem>
                          <SelectItem value="45">45 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={calculateROI} 
                    className="w-full"
                    disabled={!selectedCareer || !educationCost}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate ROI
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-success" />
                    <span>ROI Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {roiCalculation ? (
                    <div className="space-y-6">
                      {/* ROI Status */}
                      <div className="text-center p-6 bg-muted/50 rounded-lg">
                        {(() => {
                          const status = getROIStatus(roiCalculation.roi);
                          const StatusIcon = status.icon;
                          return (
                            <>
                              <StatusIcon className={`h-12 w-12 mx-auto mb-3 ${status.color}`} />
                              <h3 className="text-2xl font-bold mb-2">ROI: {roiCalculation.roi.toFixed(1)}%</h3>
                              <Badge className={`${status.color} bg-current/10`}>
                                {status.status.toUpperCase()}
                              </Badge>
                            </>
                          );
                        })()}
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <IndianRupee className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Total Investment</span>
                          </div>
                          <div className="text-xl font-bold">
                            {formatCurrency(roiCalculation.totalInvestment)}
                          </div>
                        </div>

                        <div className="p-4 bg-success/5 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-success" />
                            <span className="text-sm font-medium">Expected Salary</span>
                          </div>
                          <div className="text-xl font-bold">
                            {formatCurrency(roiCalculation.expectedSalary)}/year
                          </div>
                        </div>

                        <div className="p-4 bg-warning/5 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="h-4 w-4 text-warning" />
                            <span className="text-sm font-medium">Years to Recover</span>
                          </div>
                          <div className="text-xl font-bold">
                            {roiCalculation.yearsToRecover.toFixed(1)} years
                          </div>
                        </div>

                        <div className="p-4 bg-info/5 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="h-4 w-4 text-info" />
                            <span className="text-sm font-medium">Lifetime Earnings</span>
                          </div>
                          <div className="text-xl font-bold">
                            {formatCurrency(roiCalculation.lifetimeEarnings)}
                          </div>
                        </div>
                      </div>

                      {/* Monthly Breakdown */}
                      <div className="p-4 bg-gradient-to-r from-primary/5 to-success/5 rounded-lg">
                        <h4 className="font-semibold mb-3">Monthly Income Projection</h4>
                        <div className="text-3xl font-bold text-success">
                          {formatCurrency(roiCalculation.monthlyIncome)}/month
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calculator className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Fill in the details and click "Calculate ROI" to see your analysis</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Insights */}
            {roiCalculation && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-warning" />
                    <span>Investment Insights & Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 text-primary">Investment Timeline</h4>
                      <p className="text-sm text-muted-foreground">
                        With an investment of {formatCurrency(roiCalculation.totalInvestment)}, 
                        your child will break even in {roiCalculation.yearsToRecover.toFixed(1)} years 
                        and earn {formatCurrency(roiCalculation.lifetimeEarnings)} over their career.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 text-success">Salary Growth</h4>
                      <p className="text-sm text-muted-foreground">
                        Starting salary of {formatCurrency(roiCalculation.expectedSalary)} with 
                        potential for 15-20% annual growth based on experience and skills development.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 text-warning">Risk Assessment</h4>
                      <p className="text-sm text-muted-foreground">
                        {roiCalculation.roi > 300 ? 'Low risk investment with excellent returns expected.' : 
                         roiCalculation.roi > 150 ? 'Moderate risk with good potential returns.' :
                         'Consider alternative paths or additional skill development.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Highest ROI Careers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { career: 'Software Engineer', roi: '850%', salary: '₹15 LPA' },
                      { career: 'Data Scientist', roi: '720%', salary: '₹12 LPA' },
                      { career: 'Product Manager', roi: '680%', salary: '₹18 LPA' },
                      { career: 'Investment Banker', roi: '650%', salary: '₹25 LPA' },
                      { career: 'Doctor', roi: '580%', salary: '₹20 LPA' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                        <div>
                          <div className="font-medium">{item.career}</div>
                          <div className="text-sm text-muted-foreground">{item.salary}</div>
                        </div>
                        <Badge variant="secondary">{item.roi}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Education Cost Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Engineering', cost: '₹15-25 L', trend: '+12%' },
                      { type: 'Medical', cost: '₹50-100 L', trend: '+8%' },
                      { type: 'Commerce', cost: '₹5-15 L', trend: '+15%' },
                      { type: 'Arts', cost: '₹3-10 L', trend: '+10%' },
                      { type: 'Science', cost: '₹8-20 L', trend: '+14%' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                        <div>
                          <div className="font-medium">{item.type}</div>
                          <div className="text-sm text-muted-foreground">{item.cost}</div>
                        </div>
                        <Badge className="text-green-600">{item.trend}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Job Market Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { sector: 'Technology', growth: '25%', jobs: '2.5M' },
                      { sector: 'Healthcare', growth: '18%', jobs: '1.8M' },
                      { sector: 'Finance', growth: '12%', jobs: '1.2M' },
                      { sector: 'Education', growth: '8%', jobs: '800K' },
                      { sector: 'Manufacturing', growth: '6%', jobs: '600K' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                        <div>
                          <div className="font-medium">{item.sector}</div>
                          <div className="text-sm text-muted-foreground">{item.jobs} jobs</div>
                        </div>
                        <Badge className="text-blue-600">{item.growth}</Badge>
                      </div>
                    ))}
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
