import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  Award, 
  Users, 
  CheckCircle2,
  Clock,
  TrendingUp
} from 'lucide-react';

const scholarshipHistory = [
  {
    year: 2024,
    scholarships: [
      {
        id: 1,
        title: 'National Merit Scholarship',
        provider: 'Government of India',
        recipients: 2500,
        totalAmount: '₹12.5 Crores',
        status: 'completed'
      },
      {
        id: 2,
        title: 'Inspire Scholarship',
        provider: 'Department of Science & Technology',
        recipients: 1800,
        totalAmount: '₹14.4 Crores',
        status: 'ongoing'
      }
    ]
  },
  {
    year: 2023,
    scholarships: [
      {
        id: 3,
        title: 'National Merit Scholarship',
        provider: 'Government of India',
        recipients: 2400,
        totalAmount: '₹12 Crores',
        status: 'completed'
      },
      {
        id: 4,
        title: 'Prime Minister Special Scholarship',
        provider: 'AICTE',
        recipients: 1200,
        totalAmount: '₹24 Crores',
        status: 'completed'
      }
    ]
  },
  {
    year: 2022,
    scholarships: [
      {
        id: 5,
        title: 'Girl Child Education Scholarship',
        provider: 'State Government',
        recipients: 3000,
        totalAmount: '₹7.5 Crores',
        status: 'completed'
      },
      {
        id: 6,
        title: 'Minority Community Scholarship',
        provider: 'Ministry of Minority Affairs',
        recipients: 2200,
        totalAmount: '₹6.6 Crores',
        status: 'completed'
      }
    ]
  }
];

const totalStats = {
  totalRecipients: scholarshipHistory.reduce((sum, year) => 
    sum + year.scholarships.reduce((yearSum, scholarship) => yearSum + scholarship.recipients, 0), 0
  ),
  totalAmount: '₹76.8 Crores',
  activeScholarships: scholarshipHistory
    .flatMap(year => year.scholarships)
    .filter(s => s.status === 'ongoing').length,
  completedScholarships: scholarshipHistory
    .flatMap(year => year.scholarships)
    .filter(s => s.status === 'completed').length
};

export default function ScholarshipHistory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'ongoing': return 'default';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'ongoing': return 'Ongoing';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/scholarships">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Scholarships
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Scholarship History & Statistics
          </h1>
          <p className="text-xl text-muted-foreground">
            Track the impact of scholarship programs over the years and see how many students have been helped.
          </p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">{totalStats.totalRecipients.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Recipients</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">{totalStats.totalAmount}</div>
              <div className="text-sm text-muted-foreground">Total Amount Disbursed</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">{totalStats.activeScholarships}</div>
              <div className="text-sm text-muted-foreground">Active Programs</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">{totalStats.completedScholarships}</div>
              <div className="text-sm text-muted-foreground">Completed Programs</div>
            </CardContent>
          </Card>
        </div>

        {/* Year-wise History */}
        <div className="space-y-8">
          {scholarshipHistory.map((yearData) => (
            <Card key={yearData.year} className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center">
                    <Calendar className="mr-3 h-6 w-6" />
                    {yearData.year}
                  </CardTitle>
                  <Badge variant="outline" className="text-sm">
                    {yearData.scholarships.length} Programs
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {yearData.scholarships.map((scholarship) => (
                    <Card key={scholarship.id} className="border border-border/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{scholarship.title}</CardTitle>
                          <Badge variant={getStatusColor(scholarship.status)}>
                            {getStatusText(scholarship.status)}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{scholarship.provider}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-xl font-bold text-primary">{scholarship.recipients.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Recipients</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-success">{scholarship.totalAmount}</div>
                            <div className="text-xs text-muted-foreground">Total Amount</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Section */}
        <Card className="mt-12 bg-gradient-primary text-white shadow-glow">
          <CardContent className="p-8 text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Making Education Accessible
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
              Over the years, our scholarship programs have helped thousands of students achieve their educational dreams. 
              The data shows a consistent increase in both the number of recipients and the total funding allocated to support students from all backgrounds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-sm opacity-80">Students Per Year</div>
              </div>
              <div>
                <div className="text-2xl font-bold">₹20Cr+</div>
                <div className="text-sm opacity-80">Annual Budget</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Section */}
        <div className="mt-8 text-center">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Ready to Apply?</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="hero">
                  <Link to="/scholarships">
                    View Current Scholarships
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">
                    Get Application Help
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