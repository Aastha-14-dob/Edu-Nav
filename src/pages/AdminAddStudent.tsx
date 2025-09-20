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
import { ArrowLeft, ArrowRight, User, GraduationCap, FileText, CheckCircle, Loader2 } from 'lucide-react';

interface StudentData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  
  // Academic Information
  currentClass: string;
  board: string;
  schoolName: string;
  previousMarks: string;
  subjects: string[];
  interests: string[];
  
  // Career Information
  careerGoals: string;
  preferredStreams: string[];
  budgetRange: string;
  locationPreference: string[];
  
  // Additional Information
  specialNeeds: string;
  achievements: string;
  extracurricularActivities: string;
  notes: string;
}

export default function AdminAddStudent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [studentData, setStudentData] = useState<StudentData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    currentClass: '',
    board: '',
    schoolName: '',
    previousMarks: '',
    subjects: [],
    interests: [],
    careerGoals: '',
    preferredStreams: [],
    budgetRange: '',
    locationPreference: [],
    specialNeeds: '',
    achievements: '',
    extracurricularActivities: '',
    notes: ''
  });

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Academic Details', icon: GraduationCap },
    { id: 3, title: 'Career Preferences', icon: FileText },
    { id: 4, title: 'Review & Submit', icon: CheckCircle }
  ];

  const handleInputChange = (field: keyof StudentData, value: string | string[]) => {
    setStudentData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof StudentData, value: string) => {
    const currentArray = studentData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleInputChange(field, newArray);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return studentData.firstName && studentData.lastName && studentData.email && studentData.phone && 
               studentData.dateOfBirth && studentData.gender && studentData.address && 
               studentData.city && studentData.state && studentData.pincode;
      case 2:
        return studentData.currentClass && studentData.board && studentData.schoolName && 
               studentData.previousMarks && studentData.subjects.length > 0 && studentData.interests.length > 0;
      case 3:
        return studentData.careerGoals && studentData.preferredStreams.length > 0 && 
               studentData.budgetRange && studentData.locationPreference.length > 0 && 
               studentData.specialNeeds;
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
    
    if (currentStep < 4) {
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
      description: 'Student has been successfully added to the system!',
    });
    
    setIsLoading(false);
    navigate('/admin/students');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={studentData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={studentData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={studentData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="student@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={studentData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={studentData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <RadioGroup value={studentData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={studentData.address}
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
                  value={studentData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={studentData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state"
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={studentData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="123456"
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
                <Label htmlFor="currentClass">Current Class *</Label>
                <Select value={studentData.currentClass} onValueChange={(value) => handleInputChange('currentClass', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">10th Grade</SelectItem>
                    <SelectItem value="11th">11th Grade</SelectItem>
                    <SelectItem value="12th">12th Grade</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="board">Board *</Label>
                <Select value={studentData.board} onValueChange={(value) => handleInputChange('board', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbse">CBSE</SelectItem>
                    <SelectItem value="icse">ICSE</SelectItem>
                    <SelectItem value="state">State Board</SelectItem>
                    <SelectItem value="ib">IB</SelectItem>
                    <SelectItem value="igcse">IGCSE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="schoolName">School Name *</Label>
              <Input
                id="schoolName"
                value={studentData.schoolName}
                onChange={(e) => handleInputChange('schoolName', e.target.value)}
                placeholder="Enter school name"
              />
            </div>

            <div>
              <Label htmlFor="previousMarks">Previous Academic Performance</Label>
              <Input
                id="previousMarks"
                value={studentData.previousMarks}
                onChange={(e) => handleInputChange('previousMarks', e.target.value)}
                placeholder="e.g., 85% in 10th grade"
              />
            </div>

            <div>
              <Label>Subjects of Interest</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Economics', 'Computer Science', 'Art', 'Music', 'Sports'].map(subject => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={subject}
                      checked={studentData.subjects.includes(subject)}
                      onCheckedChange={() => handleArrayToggle('subjects', subject)}
                    />
                    <Label htmlFor={subject} className="text-sm">{subject}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="interests">Additional Interests</Label>
              <Textarea
                id="interests"
                value={studentData.interests.join(', ')}
                onChange={(e) => handleInputChange('interests', e.target.value.split(', ').filter(i => i.trim()))}
                placeholder="Enter interests separated by commas"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="careerGoals">Career Goals *</Label>
              <Textarea
                id="careerGoals"
                value={studentData.careerGoals}
                onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                placeholder="Describe the student's career aspirations and goals"
                rows={4}
              />
            </div>

            <div>
              <Label>Preferred Streams</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Science', 'Commerce', 'Arts', 'Engineering', 'Medicine', 'Law', 'Management', 'Design', 'Sports', 'Arts & Humanities'].map(stream => (
                  <div key={stream} className="flex items-center space-x-2">
                    <Checkbox
                      id={stream}
                      checked={studentData.preferredStreams.includes(stream)}
                      onCheckedChange={() => handleArrayToggle('preferredStreams', stream)}
                    />
                    <Label htmlFor={stream} className="text-sm">{stream}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="budgetRange">Budget Range</Label>
              <Select value={studentData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1lakh">Under ₹1 Lakh</SelectItem>
                  <SelectItem value="1-2lakh">₹1-2 Lakhs</SelectItem>
                  <SelectItem value="2-5lakh">₹2-5 Lakhs</SelectItem>
                  <SelectItem value="5-10lakh">₹5-10 Lakhs</SelectItem>
                  <SelectItem value="above-10lakh">Above ₹10 Lakhs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Location Preferences</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Chandigarh', 'Anywhere in India', 'Abroad'].map(location => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={location}
                      checked={studentData.locationPreference.includes(location)}
                      onCheckedChange={() => handleArrayToggle('locationPreference', location)}
                    />
                    <Label htmlFor={location} className="text-sm">{location}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="specialNeeds">Special Needs or Requirements</Label>
              <Textarea
                id="specialNeeds"
                value={studentData.specialNeeds}
                onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                placeholder="Any special accommodations or requirements"
                rows={3}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Name:</strong> {studentData.firstName} {studentData.lastName}</p>
                  <p><strong>Email:</strong> {studentData.email}</p>
                  <p><strong>Phone:</strong> {studentData.phone}</p>
                  <p><strong>DOB:</strong> {studentData.dateOfBirth}</p>
                  <p><strong>Gender:</strong> {studentData.gender}</p>
                  <p><strong>Location:</strong> {studentData.city}, {studentData.state}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Class:</strong> {studentData.currentClass}</p>
                  <p><strong>Board:</strong> {studentData.board}</p>
                  <p><strong>School:</strong> {studentData.schoolName}</p>
                  <p><strong>Performance:</strong> {studentData.previousMarks}</p>
                  <p><strong>Subjects:</strong> {studentData.subjects.join(', ')}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Career Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Goals:</strong> {studentData.careerGoals}</p>
                <p><strong>Streams:</strong> {studentData.preferredStreams.join(', ')}</p>
                <p><strong>Budget:</strong> {studentData.budgetRange}</p>
                <p><strong>Locations:</strong> {studentData.locationPreference.join(', ')}</p>
              </CardContent>
            </Card>

            <div>
              <Label htmlFor="achievements">Achievements & Awards</Label>
              <Textarea
                id="achievements"
                value={studentData.achievements}
                onChange={(e) => handleInputChange('achievements', e.target.value)}
                placeholder="List any achievements, awards, or recognitions"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="extracurricularActivities">Extracurricular Activities</Label>
              <Textarea
                id="extracurricularActivities"
                value={studentData.extracurricularActivities}
                onChange={(e) => handleInputChange('extracurricularActivities', e.target.value)}
                placeholder="Sports, clubs, volunteer work, etc."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={studentData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional information or notes"
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Student</h1>
          <p className="text-muted-foreground">Create a comprehensive student profile</p>
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
                    <div className={`w-16 h-0.5 mx-4 ${
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

        {currentStep < 4 ? (
          <Button onClick={nextStep}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Student
          </Button>
        )}
      </div>
    </div>
  );
}
