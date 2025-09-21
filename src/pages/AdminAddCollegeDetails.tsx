import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, Plus, MapPin, GraduationCap, DollarSign, Users, Award } from 'lucide-react';

export default function AdminAddCollegeDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collegeData, setCollegeData] = useState<any>(null);
  
  const [detailsData, setDetailsData] = useState({
    admissionProcess: '',
    applicationDeadline: '',
    entranceExams: [] as string[],
    cutoffMarks: {
      general: '',
      obc: '',
      sc: '',
      st: ''
    },
    feeStructure: {
      tuitionFee: '',
      hostelFee: '',
      messFee: '',
      otherFees: ''
    },
    facilities: [] as string[],
    placementStats: {
      averagePackage: '',
      highestPackage: '',
      placementPercentage: '',
      topRecruiters: ''
    },
    facultyInfo: {
      totalFaculty: '',
      phdFaculty: '',
      studentFacultyRatio: ''
    },
    infrastructure: {
      library: '',
      labs: '',
      hostels: '',
      sports: '',
      medical: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const entranceExams = [
    'JEE Main', 'JEE Advanced', 'NEET', 'CAT', 'MAT', 'XAT', 'CMAT', 'GATE',
    'UPSC', 'SSC', 'IBPS', 'SBI PO', 'CLAT', 'AILET', 'NATA', 'NIFT',
    'Other'
  ];

  const facilities = [
    'Library', 'Computer Lab', 'Science Lab', 'Hostel', 'Cafeteria', 'Sports Complex',
    'Gymnasium', 'Medical Center', 'Transport', 'WiFi', 'Auditorium', 'Conference Hall',
    'Bank', 'ATM', 'Post Office', 'Bookstore', 'Parking', 'Security'
  ];

  useEffect(() => {
    if (location.state?.collegeData) {
      setCollegeData(location.state.collegeData);
    } else {
      // If no college data, redirect back to add college
      navigate('/admin/add-college');
    }
  }, [location.state, navigate]);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setDetailsData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setDetailsData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setDetailsData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!detailsData.admissionProcess.trim()) newErrors.admissionProcess = 'Admission process is required';
    if (!detailsData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
    if (detailsData.entranceExams.length === 0) newErrors.entranceExams = 'At least one entrance exam is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving college details:', { collegeData, detailsData });
      alert('College details saved successfully!');
      navigate('/admin/colleges');
    }
  };

  const handleSaveAndAddCourses = () => {
    if (validateForm()) {
      console.log('Saving college details:', { collegeData, detailsData });
      navigate('/admin/add-college/courses', { 
        state: { 
          collegeData, 
          detailsData 
        } 
      });
    }
  };

  if (!collegeData) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p>Loading college data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/admin/add-college')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Basic Info
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add College Details</h1>
          <p className="text-muted-foreground">Additional information for {collegeData.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Admission Information */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span>Admission Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admissionProcess">Admission Process *</Label>
                <Textarea
                  id="admissionProcess"
                  placeholder="Describe the admission process..."
                  value={detailsData.admissionProcess}
                  onChange={(e) => handleInputChange('admissionProcess', e.target.value)}
                  className={errors.admissionProcess ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.admissionProcess && <p className="text-sm text-destructive">{errors.admissionProcess}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={detailsData.applicationDeadline}
                  onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                  className={errors.applicationDeadline ? 'border-destructive' : ''}
                />
                {errors.applicationDeadline && <p className="text-sm text-destructive">{errors.applicationDeadline}</p>}
              </div>

              <div className="space-y-2">
                <Label>Entrance Exams *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {entranceExams.map((exam) => (
                    <div key={exam} className="flex items-center space-x-2">
                      <Checkbox
                        id={exam}
                        checked={detailsData.entranceExams.includes(exam)}
                        onCheckedChange={(checked) => 
                          handleArrayChange('entranceExams', exam, checked as boolean)
                        }
                      />
                      <Label htmlFor={exam} className="text-sm">{exam}</Label>
                    </div>
                  ))}
                </div>
                {errors.entranceExams && <p className="text-sm text-destructive">{errors.entranceExams}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Cutoff Marks */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Cutoff Marks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="general">General</Label>
                  <Input
                    id="general"
                    placeholder="95%"
                    value={detailsData.cutoffMarks.general}
                    onChange={(e) => handleInputChange('cutoffMarks.general', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obc">OBC</Label>
                  <Input
                    id="obc"
                    placeholder="90%"
                    value={detailsData.cutoffMarks.obc}
                    onChange={(e) => handleInputChange('cutoffMarks.obc', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sc">SC</Label>
                  <Input
                    id="sc"
                    placeholder="85%"
                    value={detailsData.cutoffMarks.sc}
                    onChange={(e) => handleInputChange('cutoffMarks.sc', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="st">ST</Label>
                  <Input
                    id="st"
                    placeholder="80%"
                    value={detailsData.cutoffMarks.st}
                    onChange={(e) => handleInputChange('cutoffMarks.st', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fee Structure */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Fee Structure</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tuitionFee">Tuition Fee (per year)</Label>
                  <Input
                    id="tuitionFee"
                    placeholder="₹1,00,000"
                    value={detailsData.feeStructure.tuitionFee}
                    onChange={(e) => handleInputChange('feeStructure.tuitionFee', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hostelFee">Hostel Fee (per year)</Label>
                  <Input
                    id="hostelFee"
                    placeholder="₹50,000"
                    value={detailsData.feeStructure.hostelFee}
                    onChange={(e) => handleInputChange('feeStructure.hostelFee', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="messFee">Mess Fee (per year)</Label>
                  <Input
                    id="messFee"
                    placeholder="₹30,000"
                    value={detailsData.feeStructure.messFee}
                    onChange={(e) => handleInputChange('feeStructure.messFee', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherFees">Other Fees (per year)</Label>
                  <Input
                    id="otherFees"
                    placeholder="₹20,000"
                    value={detailsData.feeStructure.otherFees}
                    onChange={(e) => handleInputChange('feeStructure.otherFees', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facilities */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {facilities.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox
                      id={facility}
                      checked={detailsData.facilities.includes(facility)}
                      onCheckedChange={(checked) => 
                        handleArrayChange('facilities', facility, checked as boolean)
                      }
                    />
                    <Label htmlFor={facility} className="text-sm">{facility}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Placement Statistics */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Placement Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="averagePackage">Average Package</Label>
                  <Input
                    id="averagePackage"
                    placeholder="₹8,00,000"
                    value={detailsData.placementStats.averagePackage}
                    onChange={(e) => handleInputChange('placementStats.averagePackage', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="highestPackage">Highest Package</Label>
                  <Input
                    id="highestPackage"
                    placeholder="₹25,00,000"
                    value={detailsData.placementStats.highestPackage}
                    onChange={(e) => handleInputChange('placementStats.highestPackage', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="placementPercentage">Placement Percentage</Label>
                  <Input
                    id="placementPercentage"
                    placeholder="85%"
                    value={detailsData.placementStats.placementPercentage}
                    onChange={(e) => handleInputChange('placementStats.placementPercentage', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topRecruiters">Top Recruiters</Label>
                  <Input
                    id="topRecruiters"
                    placeholder="Google, Microsoft, Amazon, TCS..."
                    value={detailsData.placementStats.topRecruiters}
                    onChange={(e) => handleInputChange('placementStats.topRecruiters', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Save or continue to next step</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Details
              </Button>
              
              <Button onClick={handleSaveAndAddCourses} variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Save & Add Courses
              </Button>
              
              <Button 
                onClick={() => navigate('/admin/colleges')} 
                variant="ghost" 
                className="w-full"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Basic Information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">Additional Details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Course Management</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
