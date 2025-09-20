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
import { ArrowLeft, ArrowRight, Building2, MapPin, GraduationCap, DollarSign, CheckCircle, Loader2, Star } from 'lucide-react';

interface CollegeData {
  // Basic Information
  name: string;
  shortName: string;
  type: string;
  establishedYear: string;
  website: string;
  email: string;
  phone: string;
  
  // Location Information
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  
  // Academic Information
  university: string;
  accreditation: string[];
  courses: string[];
  specializations: string[];
  
  // Admission Information
  admissionProcess: string;
  eligibilityCriteria: string;
  applicationDeadline: string;
  entranceExams: string[];
  
  // Financial Information
  feeStructure: {
    tuitionFee: string;
    hostelFee: string;
    otherFees: string;
    scholarshipAvailable: boolean;
  };
  
  // Infrastructure & Facilities
  facilities: string[];
  campusSize: string;
  hostelsAvailable: boolean;
  libraryBooks: string;
  
  // Rankings & Recognition
  ranking: string;
  recognition: string[];
  achievements: string;
  
  // Additional Information
  description: string;
  highlights: string;
  placementStats: string;
  notableAlumni: string;
  images: string[];
}

export default function AdminAddCollege() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [collegeData, setCollegeData] = useState<CollegeData>({
    name: '',
    shortName: '',
    type: '',
    establishedYear: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    university: '',
    accreditation: [],
    courses: [],
    specializations: [],
    admissionProcess: '',
    eligibilityCriteria: '',
    applicationDeadline: '',
    entranceExams: [],
    feeStructure: {
      tuitionFee: '',
      hostelFee: '',
      otherFees: '',
      scholarshipAvailable: false
    },
    facilities: [],
    campusSize: '',
    hostelsAvailable: false,
    libraryBooks: '',
    ranking: '',
    recognition: [],
    achievements: '',
    description: '',
    highlights: '',
    placementStats: '',
    notableAlumni: '',
    images: []
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: Building2 },
    { id: 2, title: 'Location & Contact', icon: MapPin },
    { id: 3, title: 'Academic Details', icon: GraduationCap },
    { id: 4, title: 'Admission & Fees', icon: DollarSign },
    { id: 5, title: 'Facilities & Recognition', icon: Star },
    { id: 6, title: 'Review & Submit', icon: CheckCircle }
  ];

  const handleInputChange = (field: keyof CollegeData, value: string | string[] | boolean) => {
    setCollegeData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeeStructureChange = (field: keyof CollegeData['feeStructure'], value: string | boolean) => {
    setCollegeData(prev => ({
      ...prev,
      feeStructure: { ...prev.feeStructure, [field]: value }
    }));
  };

  const handleArrayToggle = (field: keyof CollegeData, value: string) => {
    const currentArray = collegeData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleInputChange(field, newArray);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return collegeData.name && collegeData.type && collegeData.establishedYear && collegeData.website && collegeData.email && collegeData.phone && collegeData.description;
      case 2:
        return collegeData.address && collegeData.city && collegeData.state && collegeData.pincode && collegeData.country && collegeData.campusSize;
      case 3:
        return collegeData.university && collegeData.accreditation.length > 0 && collegeData.courses.length > 0 && collegeData.specializations.length > 0 && collegeData.libraryBooks;
      case 4:
        return collegeData.admissionProcess && collegeData.eligibilityCriteria && collegeData.applicationDeadline && collegeData.entranceExams.length > 0 && collegeData.feeStructure.tuitionFee && collegeData.feeStructure.hostelFee && collegeData.feeStructure.otherFees && collegeData.feeStructure.renewalPolicy;
      case 5:
        return collegeData.facilities.length > 0 && collegeData.ranking && collegeData.recognition.length > 0 && collegeData.achievements && collegeData.placementStats && collegeData.notableAlumni && collegeData.highlights;
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
      description: 'College has been successfully added to the database!',
    });
    
    setIsLoading(false);
    navigate('/admin/colleges');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">College Name *</Label>
                <Input
                  id="name"
                  value={collegeData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full college name"
                />
              </div>
              <div>
                <Label htmlFor="shortName">Short Name/Acronym</Label>
                <Input
                  id="shortName"
                  value={collegeData.shortName}
                  onChange={(e) => handleInputChange('shortName', e.target.value)}
                  placeholder="e.g., IIT, NIT, DU"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">College Type *</Label>
                <Select value={collegeData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select college type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="deemed">Deemed University</SelectItem>
                    <SelectItem value="autonomous">Autonomous</SelectItem>
                    <SelectItem value="central">Central University</SelectItem>
                    <SelectItem value="state">State University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="establishedYear">Established Year *</Label>
                <Input
                  id="establishedYear"
                  value={collegeData.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  placeholder="e.g., 1950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={collegeData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://www.college.edu"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={collegeData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="info@college.edu"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={collegeData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 1234567890"
              />
            </div>

            <div>
              <Label htmlFor="description">College Description</Label>
              <Textarea
                id="description"
                value={collegeData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the college"
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={collegeData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter complete address"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={collegeData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={collegeData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state"
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={collegeData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="123456"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={collegeData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="campusSize">Campus Size</Label>
              <Input
                id="campusSize"
                value={collegeData.campusSize}
                onChange={(e) => handleInputChange('campusSize', e.target.value)}
                placeholder="e.g., 100 acres"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="university">Affiliated University</Label>
              <Input
                id="university"
                value={collegeData.university}
                onChange={(e) => handleInputChange('university', e.target.value)}
                placeholder="University name"
              />
            </div>

            <div>
              <Label>Accreditation</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['NAAC', 'NBA', 'AICTE', 'UGC', 'NIRF', 'QS Ranking', 'Times Higher Education', 'ARIIA'].map(acc => (
                  <div key={acc} className="flex items-center space-x-2">
                    <Checkbox
                      id={acc}
                      checked={collegeData.accreditation.includes(acc)}
                      onCheckedChange={() => handleArrayToggle('accreditation', acc)}
                    />
                    <Label htmlFor={acc} className="text-sm">{acc}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Courses Offered</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Engineering', 'Medicine', 'Management', 'Arts', 'Science', 'Commerce', 'Law', 'Design', 'Architecture', 'Pharmacy', 'Nursing', 'Agriculture'].map(course => (
                  <div key={course} className="flex items-center space-x-2">
                    <Checkbox
                      id={course}
                      checked={collegeData.courses.includes(course)}
                      onCheckedChange={() => handleArrayToggle('courses', course)}
                    />
                    <Label htmlFor={course} className="text-sm">{course}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="specializations">Specializations</Label>
              <Textarea
                id="specializations"
                value={collegeData.specializations.join(', ')}
                onChange={(e) => handleInputChange('specializations', e.target.value.split(', ').filter(s => s.trim()))}
                placeholder="Enter specializations separated by commas"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="libraryBooks">Library Collection</Label>
              <Input
                id="libraryBooks"
                value={collegeData.libraryBooks}
                onChange={(e) => handleInputChange('libraryBooks', e.target.value)}
                placeholder="e.g., 50,000 books, 100 journals"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="admissionProcess">Admission Process</Label>
              <Textarea
                id="admissionProcess"
                value={collegeData.admissionProcess}
                onChange={(e) => handleInputChange('admissionProcess', e.target.value)}
                placeholder="Describe the admission process"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="eligibilityCriteria">Eligibility Criteria</Label>
              <Textarea
                id="eligibilityCriteria"
                value={collegeData.eligibilityCriteria}
                onChange={(e) => handleInputChange('eligibilityCriteria', e.target.value)}
                placeholder="Minimum requirements for admission"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="applicationDeadline">Application Deadline</Label>
              <Input
                id="applicationDeadline"
                value={collegeData.applicationDeadline}
                onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                placeholder="e.g., March 31, 2025"
              />
            </div>

            <div>
              <Label>Entrance Exams Accepted</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['JEE Main', 'JEE Advanced', 'NEET', 'CAT', 'MAT', 'XAT', 'CMAT', 'GATE', 'CLAT', 'AILET', 'NATA', 'NID'].map(exam => (
                  <div key={exam} className="flex items-center space-x-2">
                    <Checkbox
                      id={exam}
                      checked={collegeData.entranceExams.includes(exam)}
                      onCheckedChange={() => handleArrayToggle('entranceExams', exam)}
                    />
                    <Label htmlFor={exam} className="text-sm">{exam}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Fee Structure</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tuitionFee">Tuition Fee (per year)</Label>
                  <Input
                    id="tuitionFee"
                    value={collegeData.feeStructure.tuitionFee}
                    onChange={(e) => handleFeeStructureChange('tuitionFee', e.target.value)}
                    placeholder="e.g., ₹2,00,000"
                  />
                </div>
                <div>
                  <Label htmlFor="hostelFee">Hostel Fee (per year)</Label>
                  <Input
                    id="hostelFee"
                    value={collegeData.feeStructure.hostelFee}
                    onChange={(e) => handleFeeStructureChange('hostelFee', e.target.value)}
                    placeholder="e.g., ₹50,000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="otherFees">Other Fees</Label>
                <Input
                  id="otherFees"
                  value={collegeData.feeStructure.otherFees}
                  onChange={(e) => handleFeeStructureChange('otherFees', e.target.value)}
                  placeholder="Library, lab, examination fees, etc."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="scholarshipAvailable"
                  checked={collegeData.feeStructure.scholarshipAvailable}
                  onCheckedChange={(checked) => handleFeeStructureChange('scholarshipAvailable', checked as boolean)}
                />
                <Label htmlFor="scholarshipAvailable">Scholarships Available</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hostelsAvailable"
                  checked={collegeData.hostelsAvailable}
                  onCheckedChange={(checked) => handleInputChange('hostelsAvailable', checked as boolean)}
                />
                <Label htmlFor="hostelsAvailable">Hostel Facilities Available</Label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label>Facilities Available</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['WiFi', 'Library', 'Laboratories', 'Sports Complex', 'Gymnasium', 'Cafeteria', 'Medical Center', 'Bank/ATM', 'Transport', 'Auditorium', 'Computer Center', 'Research Center'].map(facility => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox
                      id={facility}
                      checked={collegeData.facilities.includes(facility)}
                      onCheckedChange={() => handleArrayToggle('facilities', facility)}
                    />
                    <Label htmlFor={facility} className="text-sm">{facility}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="ranking">Ranking</Label>
              <Input
                id="ranking"
                value={collegeData.ranking}
                onChange={(e) => handleInputChange('ranking', e.target.value)}
                placeholder="e.g., Ranked 15th in NIRF Engineering 2023"
              />
            </div>

            <div>
              <Label>Recognition & Awards</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Excellence Award', 'Best College', 'Innovation Award', 'Research Excellence', 'Placement Excellence', 'Infrastructure Award', 'Faculty Excellence', 'Student Satisfaction'].map(recognition => (
                  <div key={recognition} className="flex items-center space-x-2">
                    <Checkbox
                      id={recognition}
                      checked={collegeData.recognition.includes(recognition)}
                      onCheckedChange={() => handleArrayToggle('recognition', recognition)}
                    />
                    <Label htmlFor={recognition} className="text-sm">{recognition}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="achievements">Notable Achievements</Label>
              <Textarea
                id="achievements"
                value={collegeData.achievements}
                onChange={(e) => handleInputChange('achievements', e.target.value)}
                placeholder="List major achievements and milestones"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="placementStats">Placement Statistics</Label>
              <Textarea
                id="placementStats"
                value={collegeData.placementStats}
                onChange={(e) => handleInputChange('placementStats', e.target.value)}
                placeholder="e.g., 95% placement rate, Average package ₹8 LPA"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="notableAlumni">Notable Alumni</Label>
              <Textarea
                id="notableAlumni"
                value={collegeData.notableAlumni}
                onChange={(e) => handleInputChange('notableAlumni', e.target.value)}
                placeholder="Famous alumni and their achievements"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="highlights">College Highlights</Label>
              <Textarea
                id="highlights"
                value={collegeData.highlights}
                onChange={(e) => handleInputChange('highlights', e.target.value)}
                placeholder="Key highlights and unique features"
                rows={4}
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
                  <p><strong>Name:</strong> {collegeData.name}</p>
                  <p><strong>Type:</strong> {collegeData.type}</p>
                  <p><strong>Established:</strong> {collegeData.establishedYear}</p>
                  <p><strong>Website:</strong> {collegeData.website}</p>
                  <p><strong>Location:</strong> {collegeData.city}, {collegeData.state}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>University:</strong> {collegeData.university}</p>
                  <p><strong>Courses:</strong> {collegeData.courses.join(', ')}</p>
                  <p><strong>Accreditation:</strong> {collegeData.accreditation.join(', ')}</p>
                  <p><strong>Ranking:</strong> {collegeData.ranking}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Admission & Fees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Entrance Exams:</strong> {collegeData.entranceExams.join(', ')}</p>
                <p><strong>Application Deadline:</strong> {collegeData.applicationDeadline}</p>
                <p><strong>Tuition Fee:</strong> {collegeData.feeStructure.tuitionFee}</p>
                <p><strong>Hostel Fee:</strong> {collegeData.feeStructure.hostelFee}</p>
                <p><strong>Scholarships:</strong> {collegeData.feeStructure.scholarshipAvailable ? 'Available' : 'Not Available'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Facilities & Recognition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Facilities:</strong> {collegeData.facilities.join(', ')}</p>
                <p><strong>Recognition:</strong> {collegeData.recognition.join(', ')}</p>
                <p><strong>Hostel:</strong> {collegeData.hostelsAvailable ? 'Available' : 'Not Available'}</p>
                <p><strong>Campus Size:</strong> {collegeData.campusSize}</p>
              </CardContent>
            </Card>

            {collegeData.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{collegeData.description}</p>
                </CardContent>
              </Card>
            )}

            {collegeData.highlights && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{collegeData.highlights}</p>
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
          <h1 className="text-3xl font-bold text-foreground">Add New College</h1>
          <p className="text-muted-foreground">Create a comprehensive college profile</p>
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
            Add College
          </Button>
        )}
      </div>
    </div>
  );
}
