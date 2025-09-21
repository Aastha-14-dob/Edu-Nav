import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScholarship } from '@/contexts/ScholarshipContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, Plus, Award, DollarSign, Calendar, Users, FileText } from 'lucide-react';

export default function AdminAddScholarshipDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addScholarship } = useScholarship();
  const [scholarshipData, setScholarshipData] = useState<any>(null);
  
  const [detailsData, setDetailsData] = useState({
    selectionCriteria: '',
    renewalCriteria: '',
    disbursementSchedule: '',
    academicRequirements: {
      minimumGPA: '',
      attendanceRequirement: '',
      courseCompletion: '',
      otherRequirements: ''
    },
    financialRequirements: {
      familyIncomeLimit: '',
      assetLimit: '',
      bankAccountRequired: false,
      otherFinancialCriteria: ''
    },
    applicationRequirements: {
      essayRequired: false,
      recommendationLetters: '',
      portfolioRequired: false,
      interviewRequired: false,
      otherRequirements: ''
    },
    termsAndConditions: {
      maintenanceOfScholarship: '',
      reportingRequirements: '',
      repaymentConditions: '',
      otherTerms: ''
    },
    targetAudience: {
      ageRange: '',
      gender: '',
      nationality: '',
      residency: '',
      otherCriteria: ''
    },
    benefits: [] as string[],
    restrictions: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const benefits = [
    'Tuition Fee Waiver', 'Living Allowance', 'Book Allowance', 'Travel Allowance',
    'Research Grant', 'Equipment Allowance', 'Mentorship Program', 'Internship Opportunities',
    'Job Placement Assistance', 'Networking Events', 'Conference Funding', 'Other'
  ];

  const restrictions = [
    'Cannot hold other scholarships', 'Must maintain full-time enrollment',
    'Cannot work during studies', 'Must live on campus', 'Must participate in community service',
    'Cannot change major', 'Must maintain specific GPA', 'Must complete within time limit',
    'Must submit regular reports', 'Other'
  ];

  const genderOptions = ['Any', 'Male', 'Female', 'Other'];
  const nationalityOptions = ['Indian', 'International', 'Any'];
  const residencyOptions = ['Resident', 'Non-resident', 'Any'];

  useEffect(() => {
    if (location.state?.scholarshipData) {
      setScholarshipData(location.state.scholarshipData);
    } else {
      navigate('/admin/add-scholarship');
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
    
    if (!detailsData.selectionCriteria.trim()) newErrors.selectionCriteria = 'Selection criteria is required';
    if (!detailsData.renewalCriteria.trim()) newErrors.renewalCriteria = 'Renewal criteria is required';
    if (!detailsData.disbursementSchedule.trim()) newErrors.disbursementSchedule = 'Disbursement schedule is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Convert form data to scholarship format
      const scholarshipDataToSave = {
        title: scholarshipData.name,
        provider: scholarshipData.provider,
        type: scholarshipData.type,
        category: scholarshipData.category,
        amount: scholarshipData.amount,
        currency: scholarshipData.currency,
        description: scholarshipData.description,
        eligibility: scholarshipData.eligibility,
        applicationProcess: scholarshipData.applicationProcess,
        requiredDocuments: scholarshipData.requiredDocuments,
        applicationDeadline: scholarshipData.applicationDeadline,
        announcementDate: scholarshipData.announcementDate,
        contactEmail: scholarshipData.contactEmail,
        contactPhone: scholarshipData.contactPhone,
        website: scholarshipData.website,
        isActive: scholarshipData.isActive,
      };
      
      addScholarship(scholarshipDataToSave);
      alert('Scholarship details saved successfully!');
      navigate('/admin/scholarships');
    }
  };

  const handleSaveAndAddTerms = () => {
    if (validateForm()) {
      console.log('Saving scholarship details:', { scholarshipData, detailsData });
      navigate('/admin/add-scholarship/terms', { 
        state: { 
          scholarshipData, 
          detailsData 
        } 
      });
    }
  };

  if (!scholarshipData) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p>Loading scholarship data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/admin/add-scholarship')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Basic Info
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add Scholarship Details</h1>
          <p className="text-muted-foreground">Additional information for {scholarshipData.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selection and Renewal Criteria */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Selection & Renewal Criteria</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="selectionCriteria">Selection Criteria *</Label>
                <Textarea
                  id="selectionCriteria"
                  placeholder="Describe how students will be selected..."
                  value={detailsData.selectionCriteria}
                  onChange={(e) => handleInputChange('selectionCriteria', e.target.value)}
                  className={errors.selectionCriteria ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.selectionCriteria && <p className="text-sm text-destructive">{errors.selectionCriteria}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="renewalCriteria">Renewal Criteria *</Label>
                <Textarea
                  id="renewalCriteria"
                  placeholder="Describe requirements for scholarship renewal..."
                  value={detailsData.renewalCriteria}
                  onChange={(e) => handleInputChange('renewalCriteria', e.target.value)}
                  className={errors.renewalCriteria ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.renewalCriteria && <p className="text-sm text-destructive">{errors.renewalCriteria}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="disbursementSchedule">Disbursement Schedule *</Label>
                <Textarea
                  id="disbursementSchedule"
                  placeholder="Describe when and how funds will be disbursed..."
                  value={detailsData.disbursementSchedule}
                  onChange={(e) => handleInputChange('disbursementSchedule', e.target.value)}
                  className={errors.disbursementSchedule ? 'border-destructive' : ''}
                  rows={2}
                />
                {errors.disbursementSchedule && <p className="text-sm text-destructive">{errors.disbursementSchedule}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Academic Requirements */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Academic Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minimumGPA">Minimum GPA</Label>
                  <Input
                    id="minimumGPA"
                    placeholder="3.0"
                    value={detailsData.academicRequirements.minimumGPA}
                    onChange={(e) => handleInputChange('academicRequirements.minimumGPA', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendanceRequirement">Attendance Requirement</Label>
                  <Input
                    id="attendanceRequirement"
                    placeholder="85%"
                    value={detailsData.academicRequirements.attendanceRequirement}
                    onChange={(e) => handleInputChange('academicRequirements.attendanceRequirement', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseCompletion">Course Completion</Label>
                  <Input
                    id="courseCompletion"
                    placeholder="All courses must be completed"
                    value={detailsData.academicRequirements.courseCompletion}
                    onChange={(e) => handleInputChange('academicRequirements.courseCompletion', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherRequirements">Other Requirements</Label>
                  <Input
                    id="otherRequirements"
                    placeholder="Additional academic requirements"
                    value={detailsData.academicRequirements.otherRequirements}
                    onChange={(e) => handleInputChange('academicRequirements.otherRequirements', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Requirements */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Financial Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="familyIncomeLimit">Family Income Limit</Label>
                  <Input
                    id="familyIncomeLimit"
                    placeholder="₹5,00,000 per annum"
                    value={detailsData.financialRequirements.familyIncomeLimit}
                    onChange={(e) => handleInputChange('financialRequirements.familyIncomeLimit', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assetLimit">Asset Limit</Label>
                  <Input
                    id="assetLimit"
                    placeholder="₹10,00,000"
                    value={detailsData.financialRequirements.assetLimit}
                    onChange={(e) => handleInputChange('financialRequirements.assetLimit', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherFinancialCriteria">Other Financial Criteria</Label>
                  <Input
                    id="otherFinancialCriteria"
                    placeholder="Additional financial requirements"
                    value={detailsData.financialRequirements.otherFinancialCriteria}
                    onChange={(e) => handleInputChange('financialRequirements.otherFinancialCriteria', e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bankAccountRequired"
                    checked={detailsData.financialRequirements.bankAccountRequired}
                    onCheckedChange={(checked) => handleInputChange('financialRequirements.bankAccountRequired', checked as boolean)}
                  />
                  <Label htmlFor="bankAccountRequired">Bank Account Required</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Requirements */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Application Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="essayRequired"
                      checked={detailsData.applicationRequirements.essayRequired}
                      onCheckedChange={(checked) => handleInputChange('applicationRequirements.essayRequired', checked as boolean)}
                    />
                    <Label htmlFor="essayRequired">Essay Required</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="portfolioRequired"
                      checked={detailsData.applicationRequirements.portfolioRequired}
                      onCheckedChange={(checked) => handleInputChange('applicationRequirements.portfolioRequired', checked as boolean)}
                    />
                    <Label htmlFor="portfolioRequired">Portfolio Required</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interviewRequired"
                      checked={detailsData.applicationRequirements.interviewRequired}
                      onCheckedChange={(checked) => handleInputChange('applicationRequirements.interviewRequired', checked as boolean)}
                    />
                    <Label htmlFor="interviewRequired">Interview Required</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recommendationLetters">Recommendation Letters</Label>
                  <Input
                    id="recommendationLetters"
                    placeholder="2 letters from teachers/professors"
                    value={detailsData.applicationRequirements.recommendationLetters}
                    onChange={(e) => handleInputChange('applicationRequirements.recommendationLetters', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherRequirements">Other Requirements</Label>
                  <Textarea
                    id="otherRequirements"
                    placeholder="Additional application requirements..."
                    value={detailsData.applicationRequirements.otherRequirements}
                    onChange={(e) => handleInputChange('applicationRequirements.otherRequirements', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Target Audience</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ageRange">Age Range</Label>
                  <Input
                    id="ageRange"
                    placeholder="18-25 years"
                    value={detailsData.targetAudience.ageRange}
                    onChange={(e) => handleInputChange('targetAudience.ageRange', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={detailsData.targetAudience.gender} onValueChange={(value) => handleInputChange('targetAudience.gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((gender) => (
                        <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select value={detailsData.targetAudience.nationality} onValueChange={(value) => handleInputChange('targetAudience.nationality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {nationalityOptions.map((nationality) => (
                        <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residency">Residency</Label>
                  <Select value={detailsData.targetAudience.residency} onValueChange={(value) => handleInputChange('targetAudience.residency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select residency" />
                    </SelectTrigger>
                    <SelectContent>
                      {residencyOptions.map((residency) => (
                        <SelectItem key={residency} value={residency}>{residency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="otherCriteria">Other Criteria</Label>
                  <Input
                    id="otherCriteria"
                    placeholder="Additional target audience criteria"
                    value={detailsData.targetAudience.otherCriteria}
                    onChange={(e) => handleInputChange('targetAudience.otherCriteria', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits and Restrictions */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Benefits & Restrictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Benefits</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center space-x-2">
                        <Checkbox
                          id={benefit}
                          checked={detailsData.benefits.includes(benefit)}
                          onCheckedChange={(checked) => 
                            handleArrayChange('benefits', benefit, checked as boolean)
                          }
                        />
                        <Label htmlFor={benefit} className="text-sm">{benefit}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Restrictions</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {restrictions.map((restriction) => (
                      <div key={restriction} className="flex items-center space-x-2">
                        <Checkbox
                          id={restriction}
                          checked={detailsData.restrictions.includes(restriction)}
                          onCheckedChange={(checked) => 
                            handleArrayChange('restrictions', restriction, checked as boolean)
                          }
                        />
                        <Label htmlFor={restriction} className="text-sm">{restriction}</Label>
                      </div>
                    ))}
                  </div>
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
              
              <Button onClick={handleSaveAndAddTerms} variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Save & Add Terms
              </Button>
              
              <Button 
                onClick={() => navigate('/admin/scholarships')} 
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
                  <span className="text-sm text-muted-foreground">Terms & Conditions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
