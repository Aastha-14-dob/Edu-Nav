import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  IndianRupee, 
  Users, 
  CheckCircle2,
  Clock,
  FileText,
  Award,
  AlertCircle
} from 'lucide-react';

export default function ScholarshipDetails() {
  const { id } = useParams();

  // Mock data - in real app, fetch based on ID
  const scholarship = {
    id: parseInt(id || '1'),
    title: 'National Merit Scholarship',
    provider: 'Government of India',
    amount: '₹50,000/year',
    eligibility: 'Class 12 with 85%+ marks',
    deadline: '2025-12-15',
    category: 'Merit-based',
    applicants: '10,000+',
    status: 'open',
    description: 'The National Merit Scholarship is awarded to meritorious students for undergraduate studies in any field. This scholarship aims to support academically excellent students in pursuing their higher education goals.',
    benefits: [
      'Tuition fee coverage up to ₹50,000 per year',
      'Monthly stipend for books and study materials',
      'Mentorship program access',
      'Career guidance sessions'
    ],
    eligibilityDetails: [
      'Must have scored 85% or above in Class 12 examination',
      'Family income should be less than ₹8 LPA',
      'Must be enrolled in a recognized institution',
      'Indian citizenship required'
    ],
    documents: [
      'Class 12 mark sheet',
      'Income certificate',
      'Caste certificate (if applicable)',
      'Bank account details',
      'Passport size photographs',
      'College admission letter'
    ],
    selectionProcess: [
      'Online application submission',
      'Document verification',
      'Merit list preparation',
      'Final selection and disbursement'
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-success text-success-foreground';
      case 'closing-soon': return 'bg-warning text-warning-foreground';
      case 'closed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Applications Open';
      case 'closing-soon': return 'Closing Soon';
      case 'closed': return 'Applications Closed';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/scholarships">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Scholarships
          </Link>
        </Button>

        {/* Header */}
        <Card className="mb-8 shadow-hover">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <CardTitle className="text-2xl md:text-3xl">{scholarship.title}</CardTitle>
                  <Badge className={getStatusColor(scholarship.status)}>
                    {getStatusText(scholarship.status)}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg">{scholarship.provider}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{scholarship.description}</p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <IndianRupee className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{scholarship.amount}</div>
              <div className="text-sm text-muted-foreground">Scholarship Amount</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 text-warning mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">
                {new Date(scholarship.deadline).toLocaleDateString('en-IN')}
              </div>
              <div className="text-sm text-muted-foreground">Application Deadline</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{scholarship.applicants}</div>
              <div className="text-sm text-muted-foreground">Total Applicants</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{scholarship.category}</div>
              <div className="text-sm text-muted-foreground">Category</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Benefits */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Scholarship Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scholarship.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Detailed Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scholarship.eligibilityDetails.map((criteria, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <span className="text-sm">{criteria}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scholarship.documents.map((document, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/30">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">{document}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selection Process */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Selection Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholarship.selectionProcess.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Card */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Apply Now</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scholarship.status === 'open' ? (
                  <>
                    <div className="flex items-center space-x-2 text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm">Applications are open</span>
                    </div>
                    <Button className="w-full">
                      Start Application
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Applications are closed</span>
                    </div>
                    <Button className="w-full" disabled>
                      Application Closed
                    </Button>
                  </>
                )}
                <Button variant="outline" className="w-full">
                  Download Guidelines
                </Button>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Application Start</span>
                  <span className="text-sm font-medium">01 Nov 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Application End</span>
                  <span className="text-sm font-medium">
                    {new Date(scholarship.deadline).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Result Declaration</span>
                  <span className="text-sm font-medium">31 Jan 2025</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/scholarships">Other Scholarships</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}