import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { 
  IndianRupee, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  ArrowLeft,
  Calculator,
  PieChart,
  Target,
  Calendar,
  Banknote,
  Building,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  BookOpen,
  Shield,
  Zap,
  Award,
  PiggyBank,
  CreditCard,
  Home,
  Car,
  Briefcase
} from 'lucide-react';

interface InvestmentOption {
  id: string;
  name: string;
  type: 'Savings' | 'Investment' | 'Loan' | 'Insurance';
  description: string;
  minAmount: number;
  maxAmount: number;
  returns: {
    min: number;
    max: number;
    risk: 'Low' | 'Medium' | 'High';
  };
  tenure: string;
  liquidity: 'High' | 'Medium' | 'Low';
  taxBenefits: boolean;
  pros: string[];
  cons: string[];
  eligibility: string;
  documents: string[];
  icon: any;
}

interface EducationGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  yearsToGoal: number;
  monthlyContribution: number;
  expectedReturn: number;
  status: 'On Track' | 'Behind' | 'Ahead';
}

const investmentOptions: InvestmentOption[] = [
  {
    id: '1',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    type: 'Savings',
    description: 'Government-backed savings scheme for girl child education',
    minAmount: 250,
    maxAmount: 150000,
    returns: {
      min: 7.6,
      max: 8.2,
      risk: 'Low'
    },
    tenure: '21 years or until marriage (after 18)',
    liquidity: 'Low',
    taxBenefits: true,
    pros: ['Government guarantee', 'Tax benefits', 'Higher interest rates', 'Long-term security'],
    cons: ['Limited to girl child', 'Long lock-in period', 'Limited liquidity'],
    eligibility: 'Girl child below 10 years',
    documents: ['Birth certificate', 'PAN card', 'Bank account details'],
    icon: Shield
  },
  {
    id: '2',
    name: 'Public Provident Fund (PPF)',
    type: 'Savings',
    description: 'Long-term savings scheme with tax benefits',
    minAmount: 500,
    maxAmount: 150000,
    returns: {
      min: 7.1,
      max: 7.6,
      risk: 'Low'
    },
    tenure: '15 years (extendable)',
    liquidity: 'Low',
    taxBenefits: true,
    pros: ['Tax-free returns', 'Government guarantee', 'Stable returns', 'Flexible contributions'],
    cons: ['Long lock-in period', 'Limited liquidity', 'Annual contribution limit'],
    eligibility: 'Indian citizen, 18+ years',
    documents: ['PAN card', 'Address proof', 'Bank account details'],
    icon: PiggyBank
  },
  {
    id: '3',
    name: 'Equity Mutual Funds',
    type: 'Investment',
    description: 'Market-linked investments for higher returns',
    minAmount: 500,
    maxAmount: 10000000,
    returns: {
      min: 12,
      max: 18,
      risk: 'High'
    },
    tenure: 'Flexible (recommended 5+ years)',
    liquidity: 'High',
    taxBenefits: true,
    pros: ['Higher returns potential', 'Professional management', 'Diversification', 'Flexible SIP'],
    cons: ['Market volatility', 'No guaranteed returns', 'Risk of capital loss'],
    eligibility: 'KYC compliant individuals',
    documents: ['PAN card', 'Bank account', 'KYC documents'],
    icon: TrendingUp
  },
  {
    id: '4',
    name: 'Fixed Deposits',
    type: 'Savings',
    description: 'Bank fixed deposits with guaranteed returns',
    minAmount: 1000,
    maxAmount: 5000000,
    returns: {
      min: 6.5,
      max: 7.5,
      risk: 'Low'
    },
    tenure: '7 days to 10 years',
    liquidity: 'Medium',
    taxBenefits: false,
    pros: ['Guaranteed returns', 'Safe investment', 'Flexible tenure', 'Easy to understand'],
    cons: ['Lower returns', 'Tax on interest', 'Penalty on premature withdrawal'],
    eligibility: 'Bank account holder',
    documents: ['PAN card', 'Bank account details'],
    icon: Banknote
  },
  {
    id: '5',
    name: 'Education Loan',
    type: 'Loan',
    description: 'Loans specifically for education expenses',
    minAmount: 50000,
    maxAmount: 5000000,
    returns: {
      min: 8.5,
      max: 12.5,
      risk: 'Medium'
    },
    tenure: '1-15 years',
    liquidity: 'High',
    taxBenefits: true,
    pros: ['Tax deduction on interest', 'Moratorium period', 'Competitive rates', 'No collateral for smaller amounts'],
    cons: ['Interest burden', 'Repayment obligation', 'Credit score impact'],
    eligibility: 'Student or parent with good credit score',
    documents: ['Admission letter', 'Income proof', 'Academic records', 'Collateral documents'],
    icon: CreditCard
  },
  {
    id: '6',
    name: 'Child Insurance Plans',
    type: 'Insurance',
    description: 'Life insurance with education benefits',
    minAmount: 10000,
    maxAmount: 100000,
    returns: {
      min: 6,
      max: 8,
      risk: 'Low'
    },
    tenure: '15-25 years',
    liquidity: 'Medium',
    taxBenefits: true,
    pros: ['Life cover', 'Education benefits', 'Tax benefits', 'Guaranteed returns'],
    cons: ['Lower returns', 'Long commitment', 'Surrender charges'],
    eligibility: 'Parent/Guardian of child',
    documents: ['Medical reports', 'Income proof', 'Child birth certificate'],
    icon: Shield
  },
  {
    id: '7',
    name: 'Gold ETF',
    type: 'Investment',
    description: 'Exchange-traded funds investing in gold',
    minAmount: 1000,
    maxAmount: 1000000,
    returns: {
      min: 8,
      max: 15,
      risk: 'Medium'
    },
    tenure: 'Flexible',
    liquidity: 'High',
    taxBenefits: false,
    pros: ['Inflation hedge', 'Liquid investment', 'No storage issues', 'Lower costs'],
    cons: ['Price volatility', 'No regular income', 'Storage costs in physical form'],
    eligibility: 'Demat account holder',
    documents: ['PAN card', 'Demat account', 'Bank account'],
    icon: Award
  },
  {
    id: '8',
    name: 'National Savings Certificate (NSC)',
    type: 'Savings',
    description: 'Government savings certificate with fixed returns',
    minAmount: 1000,
    maxAmount: 100000,
    returns: {
      min: 6.8,
      max: 7.5,
      risk: 'Low'
    },
    tenure: '5 years',
    liquidity: 'Low',
    taxBenefits: true,
    pros: ['Government guarantee', 'Tax benefits', 'Fixed returns', 'Safe investment'],
    cons: ['Long lock-in', 'Limited liquidity', 'Lower returns'],
    eligibility: 'Indian citizen',
    documents: ['PAN card', 'Address proof', 'Identity proof'],
    icon: Building
  }
];

export default function InvestmentPlanning() {
  const navigate = useNavigate();
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentOption | null>(null);
  const [investmentType, setInvestmentType] = useState('All');
  const [riskProfile, setRiskProfile] = useState('Medium');
  const [educationGoals, setEducationGoals] = useState<EducationGoal[]>([
    {
      id: '1',
      name: 'Engineering Degree',
      targetAmount: 2500000,
      currentAmount: 500000,
      yearsToGoal: 8,
      monthlyContribution: 15000,
      expectedReturn: 12,
      status: 'On Track'
    },
    {
      id: '2',
      name: 'Medical Degree',
      targetAmount: 5000000,
      currentAmount: 200000,
      yearsToGoal: 10,
      monthlyContribution: 20000,
      expectedReturn: 10,
      status: 'Behind'
    },
    {
      id: '3',
      name: 'Higher Studies Abroad',
      targetAmount: 8000000,
      currentAmount: 1000000,
      yearsToGoal: 12,
      monthlyContribution: 25000,
      expectedReturn: 8,
      status: 'On Track'
    }
  ]);

  const filteredInvestments = investmentOptions.filter(option => 
    investmentType === 'All' || option.type === investmentType
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLiquidityColor = (liquidity: string) => {
    switch (liquidity) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'text-green-600 bg-green-100';
      case 'Behind': return 'text-red-600 bg-red-100';
      case 'Ahead': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateFutureValue = (principal: number, monthlyContribution: number, years: number, rate: number) => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    
    // Future value of lump sum
    const fvLumpSum = principal * Math.pow(1 + monthlyRate, totalMonths);
    
    // Future value of monthly contributions
    const fvAnnuity = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    return fvLumpSum + fvAnnuity;
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
              <IndianRupee className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Investment Planning
              </h1>
              <p className="text-xl text-muted-foreground">
                Plan education expenses and explore funding options
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Goals</p>
                  <p className="text-2xl font-bold">{educationGoals.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Target</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(educationGoals.reduce((sum, goal) => sum + goal.targetAmount, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <PiggyBank className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Savings</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(educationGoals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-info/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Investment</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(educationGoals.reduce((sum, goal) => sum + goal.monthlyContribution, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="goals" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="goals">Education Goals</TabsTrigger>
            <TabsTrigger value="investments">Investment Options</TabsTrigger>
            <TabsTrigger value="calculator">SIP Calculator</TabsTrigger>
            <TabsTrigger value="insights">Planning Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {educationGoals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const futureValue = calculateFutureValue(
                  goal.currentAmount,
                  goal.monthlyContribution,
                  goal.yearsToGoal,
                  goal.expectedReturn
                );
                const shortfall = goal.targetAmount - futureValue;

                return (
                  <Card key={goal.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-2">{goal.name}</CardTitle>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(goal.status)}>
                              {goal.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {goal.yearsToGoal} years to goal
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Target</div>
                          <div className="text-xl font-bold text-primary">
                            {formatCurrency(goal.targetAmount)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-success/5 rounded">
                          <div className="flex items-center space-x-1 mb-1">
                            <PiggyBank className="h-3 w-3 text-success" />
                            <span className="text-xs font-medium">Current Savings</span>
                          </div>
                          <div className="text-sm font-bold text-success">
                            {formatCurrency(goal.currentAmount)}
                          </div>
                        </div>
                        <div className="p-3 bg-primary/5 rounded">
                          <div className="flex items-center space-x-1 mb-1">
                            <TrendingUp className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium">Monthly SIP</span>
                          </div>
                          <div className="text-sm font-bold text-primary">
                            {formatCurrency(goal.monthlyContribution)}
                          </div>
                        </div>
                      </div>

                      {/* Projections */}
                      <div className="p-4 bg-muted/50 rounded">
                        <h4 className="font-semibold mb-2">Projected Value</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Expected Future Value:</span>
                            <span className="font-medium text-success">
                              {formatCurrency(futureValue)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Shortfall/Surplus:</span>
                            <span className={`font-medium ${shortfall > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {formatCurrency(Math.abs(shortfall))} {shortfall > 0 ? 'shortfall' : 'surplus'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Expected Return:</span>
                            <span className="font-medium">{goal.expectedReturn}% p.a.</span>
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="p-3 bg-warning/5 rounded">
                        <h4 className="font-semibold mb-2 text-warning">Recommendations</h4>
                        {shortfall > 0 ? (
                          <div className="text-sm">
                            <p className="text-red-700 mb-1">• Increase monthly SIP by {formatCurrency(shortfall / (goal.yearsToGoal * 12))}</p>
                            <p className="text-red-700">• Consider higher return investments</p>
                          </div>
                        ) : (
                          <div className="text-sm text-green-700">
                            <p>• You're on track to meet your goal!</p>
                            <p>• Consider increasing your goal amount</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            {/* Filters */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Select value={investmentType} onValueChange={setInvestmentType}>
                      <SelectTrigger className="w-full md:w-64">
                        <SelectValue placeholder="Select investment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Savings">Savings</SelectItem>
                        <SelectItem value="Investment">Investment</SelectItem>
                        <SelectItem value="Loan">Loan</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={riskProfile} onValueChange={setRiskProfile}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Risk profile" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low Risk</SelectItem>
                        <SelectItem value="Medium">Medium Risk</SelectItem>
                        <SelectItem value="High">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvestments.map((investment) => {
                const IconComponent = investment.icon;
                return (
                  <Card 
                    key={investment.id} 
                    className="shadow-card hover:shadow-hover transition-all cursor-pointer"
                    onClick={() => setSelectedInvestment(investment)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{investment.name}</CardTitle>
                            <Badge variant="secondary" className="text-xs">{investment.type}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{investment.description}</p>
                      
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 bg-success/5 rounded">
                          <div className="text-xs text-muted-foreground mb-1">Returns</div>
                          <div className="text-sm font-bold text-success">
                            {investment.returns.min}-{investment.returns.max}%
                          </div>
                        </div>
                        <div className="p-2 bg-primary/5 rounded">
                          <div className="text-xs text-muted-foreground mb-1">Min Amount</div>
                          <div className="text-sm font-bold text-primary">
                            {formatCurrency(investment.minAmount)}
                          </div>
                        </div>
                      </div>

                      {/* Risk and Liquidity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Risk:</span>
                          <Badge className={getRiskColor(investment.returns.risk)}>
                            {investment.returns.risk}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Liquidity:</span>
                          <Badge className={getLiquidityColor(investment.liquidity)}>
                            {investment.liquidity}
                          </Badge>
                        </div>
                      </div>

                      {/* Tax Benefits */}
                      {investment.taxBenefits && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-sm font-medium">Tax Benefits Available</span>
                        </div>
                      )}

                      {/* Tenure */}
                      <div className="text-sm">
                        <span className="text-muted-foreground">Tenure: </span>
                        <span className="font-medium">{investment.tenure}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Investment Details Modal */}
            {selectedInvestment && (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{selectedInvestment.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{selectedInvestment.type}</Badge>
                        {selectedInvestment.taxBenefits && (
                          <Badge className="bg-green-100 text-green-800">Tax Benefits</Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedInvestment(null)}
                      size="sm"
                    >
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{selectedInvestment.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Investment Details */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Investment Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investment Range:</span>
                          <span className="font-medium">
                            {formatCurrency(selectedInvestment.minAmount)} - {formatCurrency(selectedInvestment.maxAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expected Returns:</span>
                          <span className="font-medium text-success">
                            {selectedInvestment.returns.min}-{selectedInvestment.returns.max}% p.a.
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Risk Level:</span>
                          <Badge className={getRiskColor(selectedInvestment.returns.risk)}>
                            {selectedInvestment.returns.risk}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Liquidity:</span>
                          <Badge className={getLiquidityColor(selectedInvestment.liquidity)}>
                            {selectedInvestment.liquidity}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tenure:</span>
                          <span className="font-medium">{selectedInvestment.tenure}</span>
                        </div>
                      </div>
                    </div>

                    {/* Eligibility & Documents */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Eligibility & Requirements</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-muted-foreground">Eligibility:</span>
                          <p className="text-sm mt-1">{selectedInvestment.eligibility}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Documents Required:</span>
                          <ul className="text-sm mt-1 space-y-1">
                            {selectedInvestment.documents.map((doc, index) => (
                              <li key={index}>• {doc}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">Advantages</h4>
                      <ul className="space-y-2">
                        {selectedInvestment.pros.map((pro, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600">Disadvantages</h4>
                      <ul className="space-y-2">
                        {selectedInvestment.cons.map((con, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <span>SIP Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-semibold">Calculate Your SIP</h4>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sipAmount">Monthly SIP Amount (₹)</Label>
                        <Input
                          id="sipAmount"
                          type="number"
                          placeholder="e.g., 10000"
                          defaultValue="10000"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="investmentPeriod">Investment Period (Years)</Label>
                        <Input
                          id="investmentPeriod"
                          type="number"
                          placeholder="e.g., 10"
                          defaultValue="10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                        <Input
                          id="expectedReturn"
                          type="number"
                          placeholder="e.g., 12"
                          defaultValue="12"
                        />
                      </div>
                      
                      <Button className="w-full">
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="font-semibold">Investment Summary</h4>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground">Total Investment</span>
                          <span className="text-lg font-bold">₹12,00,000</span>
                        </div>
                        <div className="text-sm text-muted-foreground">10 years × ₹10,000/month</div>
                      </div>
                      
                      <div className="p-4 bg-success/5 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground">Expected Returns</span>
                          <span className="text-lg font-bold text-success">₹10,50,000</span>
                        </div>
                        <div className="text-sm text-muted-foreground">At 12% annual return</div>
                      </div>
                      
                      <div className="p-4 bg-warning/5 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground">Total Value</span>
                          <span className="text-2xl font-bold text-warning">₹22,50,000</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Investment + Returns</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Planning Tips */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>Investment Planning Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Start Early</h4>
                      <p className="text-sm text-muted-foreground">
                        The power of compounding works best when you start investing early. 
                        Even small amounts can grow significantly over time.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-success/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Diversify Your Portfolio</h4>
                      <p className="text-sm text-muted-foreground">
                        Don't put all your money in one investment. Spread across different 
                        asset classes to reduce risk.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-warning/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Consider Tax Benefits</h4>
                      <p className="text-sm text-muted-foreground">
                        Many investment options offer tax deductions. This can significantly 
                        improve your effective returns.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-info/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Regular Review</h4>
                      <p className="text-sm text-muted-foreground">
                        Review your investment portfolio regularly and rebalance as needed 
                        to stay on track with your goals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Insights */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Market Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Current Interest Rates</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Bank FDs</span>
                          <span className="font-medium">6.5-7.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Government Schemes</span>
                          <span className="font-medium">7.1-8.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Equity Mutual Funds</span>
                          <span className="font-medium">12-18%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Inflation Impact</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Current inflation rate: 6.2%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Consider investments that beat inflation to preserve purchasing power 
                        of your education fund.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Education Cost Trends</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Engineering</span>
                          <span className="font-medium">+12% annually</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Medical</span>
                          <span className="font-medium">+15% annually</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Study Abroad</span>
                          <span className="font-medium">+8% annually</span>
                        </div>
                      </div>
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
