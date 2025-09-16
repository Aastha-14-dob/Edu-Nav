import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckCircle2,
  Clock,
  GraduationCap,
  Award,
  Filter,
  FileText,
  AlertCircle
} from 'lucide-react';
import { mockScholarships } from '@/data/mockData';

export default function ScholarshipDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState('all');
  const [selectedDeadline, setSelectedDeadline] = useState('all');

  // Enhanced scholarship data with detailed eligibility
  const enhancedScholarships = mockScholarships.map(scholarship => ({
    ...scholarship,
    detailedEligibility: {
      academicRequirement: scholarship.id === '1' ? 'Minimum 90% in Class 12' :
                          scholarship.id === '2' ? 'Belongs to minority community' :
                          scholarship.id === '3' ? 'State/National level sports achievement' :
                          scholarship.id === '4' ? 'Top 1% in Class 12 Science' :
                          scholarship.id === '5' ? 'Science aptitude test qualification' :
                          scholarship.id === '6' ? 'Technical course admission' :
                          scholarship.id === '7' ? 'SC category certificate' :
                          scholarship.id === '8' ? 'Minimum 75% in Class 12' :
                          scholarship.id === '9' ? 'Admission in technical degree' :
                          'Top 20,000 in Class 12 boards',
      incomeLimit: scholarship.id === '6' ? '< ₹6 LPA' :
                   scholarship.id === '7' ? '< ₹2.5 LPA' :
                   scholarship.id === '9' ? '< ₹8 LPA' :
                   scholarship.id === '10' ? '< ₹4.5 LPA' : undefined,
      categoryRequirement: scholarship.id === '2' ? 'Minority community' :
                          scholarship.id === '7' ? 'Scheduled Caste' : undefined,
      ageLimit: scholarship.id === '5' ? '17-22 years' : undefined,
      courseType: scholarship.id === '4' ? 'Science, Technology, Engineering, Mathematics' :
                  scholarship.id === '6' ? 'Technical courses' :
                  scholarship.id === '9' ? 'Technical degree courses' : undefined,
      additionalRequirements: scholarship.id === '3' ? ['Sports certificate', 'Achievement proof'] :
                             scholarship.id === '5' ? ['Research interest', 'Aptitude test'] :
                             scholarship.id === '8' ? ['Female candidate'] :
                             scholarship.id === '9' ? ['Female candidate', 'Technical course'] : []
    },
    applicationProcess: {
      steps: [
        'Register on official portal',
        'Fill application form',
        'Upload required documents',
        'Submit application',
        'Track application status'
      ],
      documentsRequired: [
        'Class 10th marksheet',
        'Class 12th marksheet',
        'Aadhar card',
        'Bank account details',
        'Income certificate (if applicable)',
        'Category certificate (if applicable)',
        'Passport size photograph'
      ],
      applicationFee: scholarship.id === '6' ? 'Free' : 'Free'
    },
    renewalCriteria: 'Maintain minimum 75% attendance and 60% marks each semester',
    benefits: [
      'Tuition fee coverage',
      'Monthly stipend',
      'Book allowance',
      'Hostel fee (if applicable)',
      'Examination fee coverage'
    ]
  }));

  const filteredScholarships = enhancedScholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || scholarship.type === selectedType;
    
    const amount = parseInt(scholarship.amount.replace(/[₹,]/g, '').split('/')[0]);
    const matchesAmount = selectedAmount === 'all' ||
                         (selectedAmount === 'high' && amount >= 75000) ||
                         (selectedAmount === 'medium' && amount >= 30000 && amount < 75000) ||
                         (selectedAmount === 'low' && amount < 30000);
    
    const deadline = new Date(scholarship.deadline);
    const today = new Date();
    const daysUntil = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const matchesDeadline = selectedDeadline === 'all' ||
                           (selectedDeadline === 'urgent' && daysUntil <= 30) ||
                           (selectedDeadline === 'soon' && daysUntil > 30 && daysUntil <= 90) ||
                           (selectedDeadline === 'later' && daysUntil > 90);
    
    return matchesSearch && matchesType && matchesAmount && matchesDeadline;
  });

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return { status: 'expired', color: 'destructive', text: 'Expired' };
    if (daysUntil <= 7) return { status: 'urgent', color: 'destructive', text: `${daysUntil} days left` };
    if (daysUntil <= 30) return { status: 'soon', color: 'warning', text: `${daysUntil} days left` };
    return { status: 'open', color: 'success', text: `${daysUntil} days left` };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Scholarship Database
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore detailed scholarship opportunities with complete eligibility criteria and application processes.
          </p>
        </div>

        {/* Enhanced Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, provider, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Scholarship Type</label>
                  <div className="flex flex-wrap gap-1">
                    <Button
                      variant={selectedType === 'all' ? 'default' : 'outline'}
                      onClick={() => setSelectedType('all')}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedType === 'Merit' ? 'default' : 'outline'}
                      onClick={() => setSelectedType('Merit')}
                      size="sm"
                    >
                      Merit
                    </Button>
                    <Button
                      variant={selectedType === 'Need-based' ? 'default' : 'outline'}
                      onClick={() => setSelectedType('Need-based')}
                      size="sm"
                    >
                      Need-based
                    </Button>
                    <Button
                      variant={selectedType === 'Sports' ? 'default' : 'outline'}
                      onClick={() => setSelectedType('Sports')}
                      size="sm"
                    >
                      Sports
                    </Button>
                    <Button
                      variant={selectedType === 'Minority' ? 'default' : 'outline'}
                      onClick={() => setSelectedType('Minority')}
                      size="sm"
                    >
                      Minority
                    </Button>
                  </div>
                </div>

                {/* Amount Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Scholarship Amount</label>
                  <div className="flex flex-wrap gap-1">
                    <Button
                      variant={selectedAmount === 'all' ? 'default' : 'outline'}
                      onClick={() => setSelectedAmount('all')}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedAmount === 'high' ? 'default' : 'outline'}
                      onClick={() => setSelectedAmount('high')}
                      size="sm"
                    >
                      ₹75K+
                    </Button>
                    <Button
                      variant={selectedAmount === 'medium' ? 'default' : 'outline'}
                      onClick={() => setSelectedAmount('medium')}
                      size="sm"
                    >
                      ₹30-75K
                    </Button>
                    <Button
                      variant={selectedAmount === 'low' ? 'default' : 'outline'}
                      onClick={() => setSelectedAmount('low')}
                      size="sm"
                    >
                      &lt;₹30K
                    </Button>
                  </div>
                </div>

                {/* Deadline Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Application Deadline</label>
                  <div className="flex flex-wrap gap-1">
                    <Button
                      variant={selectedDeadline === 'all' ? 'default' : 'outline'}
                      onClick={() => setSelectedDeadline('all')}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedDeadline === 'urgent' ? 'default' : 'outline'}
                      onClick={() => setSelectedDeadline('urgent')}
                      size="sm"
                    >
                      &lt;30 days
                    </Button>
                    <Button
                      variant={selectedDeadline === 'soon' ? 'default' : 'outline'}
                      onClick={() => setSelectedDeadline('soon')}
                      size="sm"
                    >
                      30-90 days
                    </Button>
                    <Button
                      variant={selectedDeadline === 'later' ? 'default' : 'outline'}
                      onClick={() => setSelectedDeadline('later')}
                      size="sm"
                    >
                      &gt;90 days
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{filteredScholarships.length}</div>
              <div className="text-sm text-muted-foreground">Available Scholarships</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">₹50L+</div>
              <div className="text-sm text-muted-foreground">Total Worth</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{filteredScholarships.filter(s => getDeadlineStatus(s.deadline).status === 'urgent').length}</div>
              <div className="text-sm text-muted-foreground">Urgent Deadlines</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">15+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Scholarships Grid */}
        <div className="space-y-6">
          {filteredScholarships.map((scholarship) => {
            const deadlineInfo = getDeadlineStatus(scholarship.deadline);
            return (
              <Card key={scholarship.id} className="shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 flex items-center">
                        <Award className="mr-2 h-5 w-5 text-primary" />
                        {scholarship.title}
                      </CardTitle>
                      <p className="text-muted-foreground">{scholarship.provider}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant={deadlineInfo.color as any}>
                        {deadlineInfo.text}
                      </Badge>
                      <Badge variant="outline">
                        {scholarship.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{scholarship.amount}</div>
                          <div className="text-xs text-muted-foreground">Scholarship Amount</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-warning" />
                        <div>
                          <div className="font-medium">{new Date(scholarship.deadline).toLocaleDateString('en-IN')}</div>
                          <div className="text-xs text-muted-foreground">Application Deadline</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-success" />
                        <div>
                          <div className="font-medium">{scholarship.detailedEligibility?.courseType || 'All Courses'}</div>
                          <div className="text-xs text-muted-foreground">Applicable Courses</div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground">{scholarship.description}</p>

                    {/* Detailed Eligibility */}
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-success" />
                        Detailed Eligibility Criteria
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium">Academic:</span> {scholarship.detailedEligibility?.academicRequirement}
                        </div>
                        {scholarship.detailedEligibility?.incomeLimit && (
                          <div>
                            <span className="font-medium">Family Income:</span> {scholarship.detailedEligibility.incomeLimit}
                          </div>
                        )}
                        {scholarship.detailedEligibility?.categoryRequirement && (
                          <div>
                            <span className="font-medium">Category:</span> {scholarship.detailedEligibility.categoryRequirement}
                          </div>
                        )}
                        {scholarship.detailedEligibility?.ageLimit && (
                          <div>
                            <span className="font-medium">Age Limit:</span> {scholarship.detailedEligibility.ageLimit}
                          </div>
                        )}
                      </div>
                      {scholarship.detailedEligibility?.additionalRequirements && scholarship.detailedEligibility.additionalRequirements.length > 0 && (
                        <div className="mt-3">
                          <span className="font-medium text-sm">Additional Requirements:</span>
                          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                            {scholarship.detailedEligibility.additionalRequirements.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Benefits */}
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Award className="mr-2 h-4 w-4 text-primary" />
                        Scholarship Benefits
                      </h4>
                      <ul className="text-sm space-y-1">
                        {scholarship.benefits?.map((benefit, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-success mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button asChild className="flex-1" disabled={deadlineInfo.status === 'expired'}>
                        <Link to={`/scholarships/${scholarship.id}`}>
                          <FileText className="mr-2 h-4 w-4" />
                          View Full Details
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/timeline">
                          <Clock className="mr-2 h-4 w-4" />
                          Add to Timeline
                        </Link>
                      </Button>
                      {deadlineInfo.status === 'urgent' && (
                        <Button variant="destructive" size="sm">
                          <AlertCircle className="mr-1 h-4 w-4" />
                          Apply Now
                        </Button>
                      )}
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