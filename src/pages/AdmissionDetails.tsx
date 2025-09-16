import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  ExternalLink,
  FileText,
  Users,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Download,
  BookOpen,
  MessageCircle
} from 'lucide-react';

// Mock data - in real app, this would come from API
const admissionDetails = {
  1: {
    id: 1,
    examName: 'JEE Main 2024',
    conductedBy: 'National Testing Agency',
    applicationStart: '2024-09-01',
    applicationEnd: '2024-10-31',
    examDate: '2024-01-24',
    resultDate: '2024-02-15',
    status: 'upcoming',
    eligibility: 'Class 12 with PCM',
    applicationFee: '₹650 (General)',
    mode: 'Online',
    category: 'Engineering',
    officialWebsite: 'https://jeemain.nta.nic.in',
    description: 'Joint Entrance Examination (JEE) Main is a national level entrance exam conducted by NTA for admission to various engineering colleges across India.',
    examPattern: 'Multiple Choice Questions (MCQs) and Numerical Answer Type questions',
    duration: '3 hours',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    totalQuestions: 90,
    totalMarks: 300,
    eligibilityDetails: [
      'Passed Class 12 or equivalent with Physics, Chemistry, and Mathematics',
      'Secured at least 75% marks in Class 12 (65% for SC/ST)',
      'Age limit: Born on or after October 1, 1999 (October 1, 1994 for SC/ST/PWD)'
    ]
  },
  2: {
    id: 2,
    examName: 'NEET UG 2024',
    conductedBy: 'National Testing Agency',
    applicationStart: '2024-10-15',
    applicationEnd: '2024-12-15',
    examDate: '2024-05-05',
    resultDate: '2024-06-04',
    status: 'application-open',
    eligibility: 'Class 12 with PCB',
    applicationFee: '₹1,600 (General)',
    mode: 'Offline',
    category: 'Medical',
    officialWebsite: 'https://neet.nta.nic.in',
    description: 'National Eligibility cum Entrance Test (NEET-UG) is conducted for admission to MBBS/BDS and other medical courses in government and private medical colleges.',
    examPattern: 'Multiple Choice Questions (MCQs)',
    duration: '3 hours 20 minutes',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    totalQuestions: 180,
    totalMarks: 720,
    eligibilityDetails: [
      'Passed Class 12 or equivalent with Physics, Chemistry, Biology/Biotechnology',
      'Secured at least 50% marks in Class 12 (40% for SC/ST/OBC)',
      'Age limit: Minimum 17 years, Maximum 25 years (30 for SC/ST/OBC)'
    ]
  }
};

export default function AdmissionDetails() {
  const { id } = useParams();
  const admission = admissionDetails[id as '1' | '2'];

  if (!admission) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Admission Not Found</h1>
            <Button asChild>
              <Link to="/admissions">Back to Admissions</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'application-open': return 'success';
      case 'upcoming': return 'warning';
      case 'closed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'application-open': return 'Applications Open';
      case 'upcoming': return 'Opening Soon';
      case 'closed': return 'Applications Closed';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'application-open': return CheckCircle2;
      case 'upcoming': return Clock;
      case 'closed': return AlertCircle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(admission.status);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/admissions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admissions
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <StatusIcon className={`h-6 w-6 ${
              admission.status === 'application-open' ? 'text-success' :
              admission.status === 'upcoming' ? 'text-warning' :
              'text-destructive'
            }`} />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {admission.examName}
            </h1>
            <Badge variant={getStatusColor(admission.status) as "default" | "secondary" | "destructive" | "outline"}>
              {getStatusText(admission.status)}
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground mb-4">
            Conducted by {admission.conductedBy}
          </p>
          <p className="text-muted-foreground">
            {admission.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Important Dates */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-medium">Application Period</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(admission.applicationStart).toLocaleDateString('en-IN')} - {new Date(admission.applicationEnd).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Exam Date</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(admission.examDate).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Result Date</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(admission.resultDate).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Application Fee</div>
                    <div className="text-sm text-muted-foreground">
                      {admission.applicationFee}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exam Pattern */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-primary" />
                  Exam Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-medium">Pattern</div>
                    <div className="text-sm text-muted-foreground">
                      {admission.examPattern}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Duration</div>
                    <div className="text-sm text-muted-foreground">
                      {admission.duration}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Mode</div>
                    <div className="text-sm text-muted-foreground">
                      {admission.mode}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Total Questions</div>
                    <div className="text-sm text-muted-foreground">
                      {admission.totalQuestions}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-medium mb-2">Subjects</div>
                  <div className="flex flex-wrap gap-2">
                    {admission.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline">{subject}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {admission.eligibilityDetails.map((criteria, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  disabled={admission.status === 'closed'}
                  asChild
                >
                  <a href={admission.officialWebsite} target="_blank" rel="noopener noreferrer">
                    {admission.status === 'application-open' ? 'Apply Now' : 'Visit Official Site'}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={admission.officialWebsite} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Official Website
                  </a>
                </Button>
                <Button variant="ghost" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Brochure
                </Button>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Syllabus
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Previous Papers
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Discussion Forum
                </Button>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <Badge variant="outline">{admission.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Marks:</span>
                  <span className="text-sm font-medium">{admission.totalMarks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Questions:</span>
                  <span className="text-sm font-medium">{admission.totalQuestions}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}