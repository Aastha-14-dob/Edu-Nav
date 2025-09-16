import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  FileText,
  Users,
  GraduationCap,
  Filter
} from 'lucide-react';

interface Admission {
  id: number;
  examName: string;
  conductedBy: string;
  applicationStart: string;
  applicationEnd: string;
  examDate: string;
  resultDate: string;
  status: string;
  eligibility: string;
  applicationFee: string;
  mode: string;
  category: string;
  officialWebsite: string;
}

const admissions = [
  {
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
    officialWebsite: 'https://jeemain.nta.nic.in'
  },
  {
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
    officialWebsite: 'https://neet.nta.nic.in'
  },
  {
    id: 3,
    examName: 'CLAT 2024',
    conductedBy: 'Consortium of NLUs',
    applicationStart: '2024-08-01',
    applicationEnd: '2024-11-30',
    examDate: '2024-12-01',
    resultDate: '2024-12-31',
    status: 'application-open',
    eligibility: 'Class 12 passed',
    applicationFee: '₹4,000',
    mode: 'Online',
    category: 'Law',
    officialWebsite: 'https://consortiumofnlus.ac.in'
  },
  {
    id: 4,
    examName: 'CAT 2024',
    conductedBy: 'IIM Ahmedabad',
    applicationStart: '2024-07-15',
    applicationEnd: '2024-09-20',
    examDate: '2024-11-26',
    resultDate: '2025-01-05',
    status: 'closed',
    eligibility: 'Graduation degree',
    applicationFee: '₹2,300',
    mode: 'Online',
    category: 'Management',
    officialWebsite: 'https://iimcat.ac.in'
  },
  {
    id: 5,
    examName: 'GATE 2024',
    conductedBy: 'IIT Kharagpur',
    applicationStart: '2024-08-30',
    applicationEnd: '2024-10-07',
    examDate: '2024-02-03',
    resultDate: '2024-03-16',
    status: 'closed',
    eligibility: 'Engineering degree',
    applicationFee: '₹1,800',
    mode: 'Online',
    category: 'Engineering',
    officialWebsite: 'https://gate.iitkgp.ac.in'
  },
  {
    id: 6,
    examName: 'CUET UG 2024',
    conductedBy: 'National Testing Agency',
    applicationStart: '2024-11-01',
    applicationEnd: '2024-12-31',
    examDate: '2024-05-15',
    resultDate: '2024-06-30',
    status: 'upcoming',
    eligibility: 'Class 12 passed',
    applicationFee: '₹650',
    mode: 'Online',
    category: 'General',
    officialWebsite: 'https://cuet.samarth.ac.in'
  }
];

export default function Admissions() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAdmissions = admissions.filter(admission => {
    return selectedCategory === 'all' || admission.category.toLowerCase() === selectedCategory;
  });

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

  const getDaysRemaining = (dateString: string) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Admission Deadlines & Exams
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay updated with important admission dates, exam schedules, and application deadlines.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">6</div>
              <div className="text-sm text-muted-foreground">Active Applications</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">2</div>
              <div className="text-sm text-muted-foreground">Closing This Month</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Upcoming Exams</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">15</div>
              <div className="text-sm text-muted-foreground">Days to Next Deadline</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                All Categories
              </Button>
              <Button
                variant={selectedCategory === 'engineering' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('engineering')}
                size="sm"
              >
                Engineering
              </Button>
              <Button
                variant={selectedCategory === 'medical' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('medical')}
                size="sm"
              >
                Medical
              </Button>
              <Button
                variant={selectedCategory === 'management' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('management')}
                size="sm"
              >
                Management
              </Button>
              <Button
                variant={selectedCategory === 'law' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('law')}
                size="sm"
              >
                Law
              </Button>
              <Button
                variant={selectedCategory === 'general' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('general')}
                size="sm"
              >
                General
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admissions Timeline */}
        <div className="space-y-6">
          {filteredAdmissions.map((admission) => {
            const StatusIcon = getStatusIcon(admission.status);
            const daysToDeadline = getDaysRemaining(admission.applicationEnd);
            
            return (
              <Card key={admission.id} className="shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`h-5 w-5 ${
                          admission.status === 'application-open' ? 'text-success' :
                          admission.status === 'upcoming' ? 'text-warning' :
                          'text-destructive'
                        }`} />
                        <CardTitle className="text-xl">{admission.examName}</CardTitle>
                        <Badge variant={getStatusColor(admission.status) as "default" | "secondary" | "destructive" | "outline"}>
                          {getStatusText(admission.status)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">{admission.conductedBy}</p>
                    </div>
                    <Badge variant="outline">{admission.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Important Dates</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <div className="font-medium">Application: {new Date(admission.applicationStart).toLocaleDateString('en-IN')} - {new Date(admission.applicationEnd).toLocaleDateString('en-IN')}</div>
                            {admission.status === 'application-open' && daysToDeadline > 0 && (
                              <div className="text-warning text-xs">
                                {daysToDeadline} days remaining
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <GraduationCap className="h-4 w-4 text-success" />
                          <span>Exam: {new Date(admission.examDate).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <FileText className="h-4 w-4 text-accent" />
                          <span>Result: {new Date(admission.resultDate).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Details</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Eligibility: </span>
                          <span className="font-medium">{admission.eligibility}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fee: </span>
                          <span className="font-medium">{admission.applicationFee}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Mode: </span>
                          <span className="font-medium">{admission.mode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          className="w-full" 
                          disabled={admission.status === 'closed'}
                          asChild
                        >
                          <Link to={`/admissions/${admission.id}`}>
                            {admission.status === 'application-open' ? 'Apply Now' : 'View Details'}
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href={admission.officialWebsite} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Official Website
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Resources</h4>
                      <div className="space-y-2">
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Syllabus
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <Users className="mr-2 h-4 w-4" />
                          Previous Papers
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}