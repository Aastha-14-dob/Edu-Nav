import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Award, DollarSign, FileText, Users, CheckCircle, Loader2, Calendar } from 'lucide-react';

interface ScholarshipData {
  // Basic Information
  name: string;
  provider: string;
  type: string;
  category: string;
  description: string;
  
  // Financial Information
  amount: string;
  amountType: string;
  coverage: string[];
  
  // Eligibility Criteria
  eligibilityCriteria: {
    academicLevel: string[];
    stream: string[];
    minimumMarks: string;
    incomeLimit: string;
    nationality: string;
    ageLimit: string;
    specialRequirements: string[];
  };
  
  // Application Information
  applicationProcess: string;
  requiredDocuments: string[];
  applicationDeadline: string;
  applicationStartDate: string;
  applicationFee: string;
  
  // Selection Process
  selectionProcess: string;
  selectionCriteria: string[];
  interviewRequired: boolean;
  examRequired: boolean;
  
  // Additional Information
  benefits: string[];
  termsAndConditions: string;
  contactInformation: {
    email: string;
    phone: string;
    website: string;
    address: string;
  };
  
  // Status & Management
  status: string;
  maxApplications: string;
  renewalPolicy: string;
  notes: string;
}

export default function AdminAddScholarship() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [scholarshipData, setScholarshipData] = useState<ScholarshipData>({
    name: '',
    provider: '',
    type: '',
    category: '',
    description: '',
    amount: '',
    amountType: '',
    coverage: [],
    eligibilityCriteria: {
      academicLevel: [],
      stream: [],
      minimumMarks: '',
      incomeLimit: '',
      nationality: 'Indian',
      ageLimit: '',
      specialRequirements: []
    },
    applicationProcess: '',
    requiredDocuments: [],
    applicationDeadline: '',
    applicationStartDate: '',
    applicationFee: '',
    selectionProcess: '',
    selectionCriteria: [],
    interviewRequired: false,
    examRequired: false,
    benefits: [],
    termsAndConditions: '',
    contactInformation: {
      email: '',
      phone: '',
      website: '',
      address: ''
    },
    status: 'active',
    maxApplications: '',
    renewalPolicy: '',
    notes: ''
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: Award },
    { id: 2, title: 'Financial Details', icon: DollarSign },
    { id: 3, title: 'Eligibility Criteria', icon: Users },
    { id: 4, title: 'Application Process', icon: FileText },
    { id: 5, title: 'Selection & Benefits', icon: CheckCircle },
    { id: 6, title: 'Review & Submit', icon: Calendar }
  ];

  const handleInputChange = (field: keyof ScholarshipData, value: string | string[] | boolean) => {
    setScholarshipData(prev => ({ ...prev, [field]: value }));
  };

  const handleEligibilityChange = (field: keyof ScholarshipData['eligibilityCriteria'], value: string | string[]) => {
    setScholarshipData(prev => ({
      ...prev,
      eligibilityCriteria: { ...prev.eligibilityCriteria, [field]: value }
    }));
  };

  const handleContactChange = (field: keyof ScholarshipData['contactInformation'], value: string) => {
    setScholarshipData(prev => ({
      ...prev,
      contactInformation: { ...prev.contactInformation, [field]: value }
    }));
  };

  const handleArrayToggle = (field: keyof ScholarshipData, value: string) => {
    const currentArray = scholarshipData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleInputChange(field, newArray);
  };

  const handleEligibilityArrayToggle = (field: keyof ScholarshipData['eligibilityCriteria'], value: string) => {
    const currentArray = scholarshipData.eligibilityCriteria[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleEligibilityChange(field, newArray);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return scholarshipData.name && scholarshipData.provider && scholarshipData.type && scholarshipData.category && scholarshipData.description && scholarshipData.status && scholarshipData.maxApplications;
      case 2:
        return scholarshipData.amount && scholarshipData.amountType && scholarshipData.coverage.length > 0 && scholarshipData.applicationFee && scholarshipData.renewalPolicy;
      case 3:
        return scholarshipData.eligibilityCriteria.academicLevel.length > 0 && scholarshipData.eligibilityCriteria.stream.length > 0 && scholarshipData.eligibilityCriteria.minimumMarks && scholarshipData.eligibilityCriteria.incomeLimit && scholarshipData.eligibilityCriteria.nationality && scholarshipData.eligibilityCriteria.ageLimit && scholarshipData.eligibilityCriteria.specialRequirements.length > 0;
      case 4:
        return scholarshipData.applicationStartDate && scholarshipData.applicationDeadline && scholarshipData.applicationProcess && scholarshipData.requiredDocuments.length > 0 && scholarshipData.contactInformation.email && scholarshipData.contactInformation.phone && scholarshipData.contactInformation.website && scholarshipData.contactInformation.address;
      case 5:
        return scholarshipData.selectionProcess && scholarshipData.selectionCriteria.length > 0 && scholarshipData.benefits.length > 0 && scholarshipData.termsAndConditions && scholarshipData.notes;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields before proceeding.',
        variant: 'destructive',
      });
      return;
    }
    
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Success',
      description: 'Scholarship has been successfully added to the database!',
    });
    
    setIsLoading(false);
    navigate('/admin/scholarships');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Scholarship Name *</Label>
                <Input
                  id="name"
                  value={scholarshipData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter scholarship name"
                />
              </div>
              <div>
                <Label htmlFor="provider">Provider/Organization *</Label>
                <Input
                  id="provider"
                  value={scholarshipData.provider}
                  onChange={(e) => handleInputChange('provider', e.target.value)}
                  placeholder="e.g., Government, Private Company, NGO"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Scholarship Type *</Label>
                <Select value={scholarshipData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="merit-based">Merit-Based</SelectItem>
                    <SelectItem value="need-based">Need-Based</SelectItem>
                    <SelectItem value="merit-cum-need">Merit-cum-Need</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="minority">Minority</SelectItem>
                    <SelectItem value="disability">Disability</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={scholarshipData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="ngo">NGO</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={scholarshipData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the scholarship program"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={scholarshipData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maxApplications">Maximum Applications</Label>
                <Input
                  id="maxApplications"
                  value={scholarshipData.maxApplications}
                  onChange={(e) => handleInputChange('maxApplications', e.target.value)}
                  placeholder="e.g., 1000"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Scholarship Amount *</Label>
                <Input
                  id="amount"
                  value={scholarshipData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="e.g., ₹50,000"
                />
              </div>
              <div>
                <Label htmlFor="amountType">Amount Type *</Label>
                <Select value={scholarshipData.amountType} onValueChange={(value) => handleInputChange('amountType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select amount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="percentage">Percentage of Fees</SelectItem>
                    <SelectItem value="full-tuition">Full Tuition</SelectItem>
                    <SelectItem value="partial-tuition">Partial Tuition</SelectItem>
                    <SelectItem value="monthly-stipend">Monthly Stipend</SelectItem>
                    <SelectItem value="one-time">One-time Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Coverage</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Tuition Fees', 'Hostel Fees', 'Books & Supplies', 'Transportation', 'Meals', 'Medical', 'Research Expenses', 'Travel', 'Equipment', 'Other Expenses'].map(coverage => (
                  <div key={coverage} className="flex items-center space-x-2">
                    <Checkbox
                      id={coverage}
                      checked={scholarshipData.coverage.includes(coverage)}
                      onCheckedChange={() => handleArrayToggle('coverage', coverage)}
                    />
                    <Label htmlFor={coverage} className="text-sm">{coverage}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="applicationFee">Application Fee</Label>
              <Input
                id="applicationFee"
                value={scholarshipData.applicationFee}
                onChange={(e) => handleInputChange('applicationFee', e.target.value)}
                placeholder="e.g., ₹500 or Free"
              />
            </div>

            <div>
              <Label htmlFor="renewalPolicy">Renewal Policy</Label>
              <Textarea
                id="renewalPolicy"
                value={scholarshipData.renewalPolicy}
                onChange={(e) => handleInputChange('renewalPolicy', e.target.value)}
                placeholder="Describe renewal conditions and requirements"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Academic Level</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['10th Grade', '12th Grade', 'Undergraduate', 'Postgraduate', 'PhD', 'Diploma', 'Certificate Course', 'Professional Course'].map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={level}
                      checked={scholarshipData.eligibilityCriteria.academicLevel.includes(level)}
                      onCheckedChange={() => handleEligibilityArrayToggle('academicLevel', level)}
                    />
                    <Label htmlFor={level} className="text-sm">{level}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Stream/Field of Study</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Science', 'Commerce', 'Arts', 'Engineering', 'Medicine', 'Management', 'Law', 'Design', 'Architecture', 'Pharmacy', 'Nursing', 'Agriculture'].map(stream => (
                  <div key={stream} className="flex items-center space-x-2">
                    <Checkbox
                      id={stream}
                      checked={scholarshipData.eligibilityCriteria.stream.includes(stream)}
                      onCheckedChange={() => handleEligibilityArrayToggle('stream', stream)}
                    />
                    <Label htmlFor={stream} className="text-sm">{stream}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minimumMarks">Minimum Marks/Percentage</Label>
                <Input
                  id="minimumMarks"
                  value={scholarshipData.eligibilityCriteria.minimumMarks}
                  onChange={(e) => handleEligibilityChange('minimumMarks', e.target.value)}
                  placeholder="e.g., 80% or 8.0 CGPA"
                />
              </div>
              <div>
                <Label htmlFor="incomeLimit">Family Income Limit</Label>
                <Input
                  id="incomeLimit"
                  value={scholarshipData.eligibilityCriteria.incomeLimit}
                  onChange={(e) => handleEligibilityChange('incomeLimit', e.target.value)}
                  placeholder="e.g., ₹5,00,000 per annum"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Select value={scholarshipData.eligibilityCriteria.nationality} onValueChange={(value) => handleEligibilityChange('nationality', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indian">Indian</SelectItem>
                    <SelectItem value="Any">Any</SelectItem>
                    <SelectItem value="NRI">NRI</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ageLimit">Age Limit</Label>
                <Input
                  id="ageLimit"
                  value={scholarshipData.eligibilityCriteria.ageLimit}
                  onChange={(e) => handleEligibilityChange('ageLimit', e.target.value)}
                  placeholder="e.g., 18-25 years"
                />
              </div>
            </div>

            <div>
              <Label>Special Requirements</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Female Only', 'Male Only', 'Rural Area', 'Urban Area', 'First Generation Learner', 'Single Parent', 'Orphan', 'Physically Challenged', 'SC/ST/OBC', 'Minority Community'].map(req => (
                  <div key={req} className="flex items-center space-x-2">
                    <Checkbox
                      id={req}
                      checked={scholarshipData.eligibilityCriteria.specialRequirements.includes(req)}
                      onCheckedChange={() => handleEligibilityArrayToggle('specialRequirements', req)}
                    />
                    <Label htmlFor={req} className="text-sm">{req}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicationStartDate">Application Start Date</Label>
                <Input
                  id="applicationStartDate"
                  type="date"
                  value={scholarshipData.applicationStartDate}
                  onChange={(e) => handleInputChange('applicationStartDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={scholarshipData.applicationDeadline}
                  onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="applicationProcess">Application Process</Label>
              <Textarea
                id="applicationProcess"
                value={scholarshipData.applicationProcess}
                onChange={(e) => handleInputChange('applicationProcess', e.target.value)}
                placeholder="Describe the step-by-step application process"
                rows={4}
              />
            </div>

            <div>
              <Label>Required Documents</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Academic Transcripts', 'Income Certificate', 'Caste Certificate', 'Passport Size Photo', 'Identity Proof', 'Address Proof', 'Bank Account Details', 'Recommendation Letter', 'Statement of Purpose', 'Portfolio', 'Medical Certificate', 'Other Documents'].map(doc => (
                  <div key={doc} className="flex items-center space-x-2">
                    <Checkbox
                      id={doc}
                      checked={scholarshipData.requiredDocuments.includes(doc)}
                      onCheckedChange={() => handleArrayToggle('requiredDocuments', doc)}
                    />
                    <Label htmlFor={doc} className="text-sm">{doc}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={scholarshipData.contactInformation.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="scholarship@provider.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={scholarshipData.contactInformation.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder="+91 1234567890"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactWebsite">Website</Label>
                <Input
                  id="contactWebsite"
                  value={scholarshipData.contactInformation.website}
                  onChange={(e) => handleContactChange('website', e.target.value)}
                  placeholder="https://www.provider.com"
                />
              </div>

              <div>
                <Label htmlFor="contactAddress">Address</Label>
                <Textarea
                  id="contactAddress"
                  value={scholarshipData.contactInformation.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  placeholder="Provider organization address"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="selectionProcess">Selection Process</Label>
              <Textarea
                id="selectionProcess"
                value={scholarshipData.selectionProcess}
                onChange={(e) => handleInputChange('selectionProcess', e.target.value)}
                placeholder="Describe how candidates will be selected"
                rows={4}
              />
            </div>

            <div>
              <Label>Selection Criteria</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Academic Performance', 'Financial Need', 'Interview Performance', 'Written Test', 'Essay Writing', 'Portfolio Review', 'Recommendation Letters', 'Extracurricular Activities', 'Community Service', 'Leadership Qualities', 'Innovation', 'Research Potential'].map(criteria => (
                  <div key={criteria} className="flex items-center space-x-2">
                    <Checkbox
                      id={criteria}
                      checked={scholarshipData.selectionCriteria.includes(criteria)}
                      onCheckedChange={() => handleArrayToggle('selectionCriteria', criteria)}
                    />
                    <Label htmlFor={criteria} className="text-sm">{criteria}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interviewRequired"
                  checked={scholarshipData.interviewRequired}
                  onCheckedChange={(checked) => handleInputChange('interviewRequired', checked as boolean)}
                />
                <Label htmlFor="interviewRequired">Interview Required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="examRequired"
                  checked={scholarshipData.examRequired}
                  onCheckedChange={(checked) => handleInputChange('examRequired', checked as boolean)}
                />
                <Label htmlFor="examRequired">Written Exam Required</Label>
              </div>
            </div>

            <div>
              <Label>Benefits</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Financial Support', 'Mentorship', 'Internship Opportunities', 'Job Placement', 'Networking Events', 'Skill Development', 'Research Opportunities', 'Study Abroad', 'Conference Attendance', 'Publication Support', 'Equipment Access', 'Alumni Network'].map(benefit => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <Checkbox
                      id={benefit}
                      checked={scholarshipData.benefits.includes(benefit)}
                      onCheckedChange={() => handleArrayToggle('benefits', benefit)}
                    />
                    <Label htmlFor={benefit} className="text-sm">{benefit}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
              <Textarea
                id="termsAndConditions"
                value={scholarshipData.termsAndConditions}
                onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
                placeholder="Important terms, conditions, and obligations"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={scholarshipData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional information or special instructions"
                rows={3}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Name:</strong> {scholarshipData.name}</p>
                  <p><strong>Provider:</strong> {scholarshipData.provider}</p>
                  <p><strong>Type:</strong> {scholarshipData.type}</p>
                  <p><strong>Category:</strong> {scholarshipData.category}</p>
                  <p><strong>Status:</strong> {scholarshipData.status}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Financial Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Amount:</strong> {scholarshipData.amount}</p>
                  <p><strong>Type:</strong> {scholarshipData.amountType}</p>
                  <p><strong>Coverage:</strong> {scholarshipData.coverage.join(', ')}</p>
                  <p><strong>Application Fee:</strong> {scholarshipData.applicationFee}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Academic Level:</strong> {scholarshipData.eligibilityCriteria.academicLevel.join(', ')}</p>
                <p><strong>Stream:</strong> {scholarshipData.eligibilityCriteria.stream.join(', ')}</p>
                <p><strong>Minimum Marks:</strong> {scholarshipData.eligibilityCriteria.minimumMarks}</p>
                <p><strong>Income Limit:</strong> {scholarshipData.eligibilityCriteria.incomeLimit}</p>
                <p><strong>Nationality:</strong> {scholarshipData.eligibilityCriteria.nationality}</p>
                <p><strong>Age Limit:</strong> {scholarshipData.eligibilityCriteria.ageLimit}</p>
                <p><strong>Special Requirements:</strong> {scholarshipData.eligibilityCriteria.specialRequirements.join(', ')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Application Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Start Date:</strong> {scholarshipData.applicationStartDate}</p>
                <p><strong>Deadline:</strong> {scholarshipData.applicationDeadline}</p>
                <p><strong>Required Documents:</strong> {scholarshipData.requiredDocuments.join(', ')}</p>
                <p><strong>Interview Required:</strong> {scholarshipData.interviewRequired ? 'Yes' : 'No'}</p>
                <p><strong>Exam Required:</strong> {scholarshipData.examRequired ? 'Yes' : 'No'}</p>
              </CardContent>
            </Card>

            {scholarshipData.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{scholarshipData.description}</p>
                </CardContent>
              </Card>
            )}

            {scholarshipData.termsAndConditions && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Terms and Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{scholarshipData.termsAndConditions}</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Scholarship</h1>
          <p className="text-muted-foreground">Create a comprehensive scholarship program</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Progress Steps */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-primary bg-primary text-primary-foreground' :
                    isCompleted ? 'border-green-500 bg-green-500 text-white' :
                    'border-muted-foreground text-muted-foreground'
                  }`}>
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-muted-foreground'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>
            Step {currentStep} of {steps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentStep < 6 ? (
          <Button onClick={nextStep}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Scholarship
          </Button>
        )}
      </div>
    </div>
  );
}
