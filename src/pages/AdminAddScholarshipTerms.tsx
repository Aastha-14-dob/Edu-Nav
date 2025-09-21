import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScholarship } from '@/contexts/ScholarshipContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, FileText, Award, DollarSign, Calendar } from 'lucide-react';

export default function AdminAddScholarshipTerms() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addScholarship } = useScholarship();
  const [scholarshipData, setScholarshipData] = useState<any>(null);
  const [detailsData, setDetailsData] = useState<any>(null);
  
  const [termsData, setTermsData] = useState({
    generalTerms: '',
    eligibilityTerms: '',
    applicationTerms: '',
    selectionTerms: '',
    disbursementTerms: '',
    renewalTerms: '',
    terminationTerms: '',
    repaymentTerms: '',
    privacyTerms: '',
    contactTerms: '',
    additionalTerms: '',
    legalCompliance: [] as string[],
    dataProtection: [] as string[],
    intellectualProperty: [] as string[],
    liabilityTerms: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const legalComplianceOptions = [
    'Complies with Indian Education Laws',
    'Follows UGC Guidelines',
    'Adheres to Government Scholarship Policies',
    'Meets International Standards',
    'Subject to Audit Requirements',
    'Other'
  ];

  const dataProtectionOptions = [
    'GDPR Compliant',
    'Data Encryption Required',
    'Secure Data Storage',
    'Limited Data Retention',
    'User Consent Required',
    'Data Sharing Restrictions',
    'Other'
  ];

  const intellectualPropertyOptions = [
    'Student Retains IP Rights',
    'Institution Shares IP Rights',
    'Research Publications Required',
    'Attribution Required',
    'Commercial Use Restrictions',
    'Other'
  ];

  const liabilityTermsOptions = [
    'No Liability for Academic Performance',
    'No Liability for Job Placement',
    'Force Majeure Clause',
    'Limited Liability for Damages',
    'Student Responsibility Clause',
    'Other'
  ];

  useEffect(() => {
    if (location.state?.scholarshipData && location.state?.detailsData) {
      setScholarshipData(location.state.scholarshipData);
      setDetailsData(location.state.detailsData);
    } else {
      navigate('/admin/add-scholarship');
    }
  }, [location.state, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setTermsData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setTermsData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!termsData.generalTerms.trim()) newErrors.generalTerms = 'General terms are required';
    if (!termsData.eligibilityTerms.trim()) newErrors.eligibilityTerms = 'Eligibility terms are required';
    if (!termsData.applicationTerms.trim()) newErrors.applicationTerms = 'Application terms are required';
    if (!termsData.selectionTerms.trim()) newErrors.selectionTerms = 'Selection terms are required';
    if (!termsData.disbursementTerms.trim()) newErrors.disbursementTerms = 'Disbursement terms are required';
    
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
      alert('Scholarship with terms and conditions saved successfully!');
      navigate('/admin/scholarships');
    }
  };

  if (!scholarshipData || !detailsData) {
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
        <Button variant="outline" onClick={() => navigate('/admin/add-scholarship/details', { state: { scholarshipData, detailsData } })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Details
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add Terms & Conditions</h1>
          <p className="text-muted-foreground">Final terms and conditions for {scholarshipData.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Terms */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>General Terms & Conditions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="generalTerms">General Terms *</Label>
                <Textarea
                  id="generalTerms"
                  placeholder="General terms and conditions for the scholarship..."
                  value={termsData.generalTerms}
                  onChange={(e) => handleInputChange('generalTerms', e.target.value)}
                  className={errors.generalTerms ? 'border-destructive' : ''}
                  rows={4}
                />
                {errors.generalTerms && <p className="text-sm text-destructive">{errors.generalTerms}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eligibilityTerms">Eligibility Terms *</Label>
                <Textarea
                  id="eligibilityTerms"
                  placeholder="Terms related to eligibility requirements..."
                  value={termsData.eligibilityTerms}
                  onChange={(e) => handleInputChange('eligibilityTerms', e.target.value)}
                  className={errors.eligibilityTerms ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.eligibilityTerms && <p className="text-sm text-destructive">{errors.eligibilityTerms}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationTerms">Application Terms *</Label>
                <Textarea
                  id="applicationTerms"
                  placeholder="Terms related to the application process..."
                  value={termsData.applicationTerms}
                  onChange={(e) => handleInputChange('applicationTerms', e.target.value)}
                  className={errors.applicationTerms ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.applicationTerms && <p className="text-sm text-destructive">{errors.applicationTerms}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Selection and Disbursement Terms */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Selection & Disbursement Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="selectionTerms">Selection Terms *</Label>
                <Textarea
                  id="selectionTerms"
                  placeholder="Terms related to the selection process..."
                  value={termsData.selectionTerms}
                  onChange={(e) => handleInputChange('selectionTerms', e.target.value)}
                  className={errors.selectionTerms ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.selectionTerms && <p className="text-sm text-destructive">{errors.selectionTerms}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="disbursementTerms">Disbursement Terms *</Label>
                <Textarea
                  id="disbursementTerms"
                  placeholder="Terms related to fund disbursement..."
                  value={termsData.disbursementTerms}
                  onChange={(e) => handleInputChange('disbursementTerms', e.target.value)}
                  className={errors.disbursementTerms ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.disbursementTerms && <p className="text-sm text-destructive">{errors.disbursementTerms}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Renewal and Termination Terms */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Renewal & Termination Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="renewalTerms">Renewal Terms</Label>
                <Textarea
                  id="renewalTerms"
                  placeholder="Terms related to scholarship renewal..."
                  value={termsData.renewalTerms}
                  onChange={(e) => handleInputChange('renewalTerms', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terminationTerms">Termination Terms</Label>
                <Textarea
                  id="terminationTerms"
                  placeholder="Terms related to scholarship termination..."
                  value={termsData.terminationTerms}
                  onChange={(e) => handleInputChange('terminationTerms', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repaymentTerms">Repayment Terms</Label>
                <Textarea
                  id="repaymentTerms"
                  placeholder="Terms related to repayment obligations..."
                  value={termsData.repaymentTerms}
                  onChange={(e) => handleInputChange('repaymentTerms', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Contact Terms */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Privacy & Contact Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacyTerms">Privacy Terms</Label>
                <Textarea
                  id="privacyTerms"
                  placeholder="Terms related to data privacy and protection..."
                  value={termsData.privacyTerms}
                  onChange={(e) => handleInputChange('privacyTerms', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactTerms">Contact Terms</Label>
                <Textarea
                  id="contactTerms"
                  placeholder="Terms related to communication and contact..."
                  value={termsData.contactTerms}
                  onChange={(e) => handleInputChange('contactTerms', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Legal Compliance */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Legal Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Legal Compliance</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {legalComplianceOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={termsData.legalCompliance.includes(option)}
                          onCheckedChange={(checked) => 
                            handleArrayChange('legalCompliance', option, checked as boolean)
                          }
                        />
                        <Label htmlFor={option} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Data Protection</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {dataProtectionOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={termsData.dataProtection.includes(option)}
                          onCheckedChange={(checked) => 
                            handleArrayChange('dataProtection', option, checked as boolean)
                          }
                        />
                        <Label htmlFor={option} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Intellectual Property</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {intellectualPropertyOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={termsData.intellectualProperty.includes(option)}
                          onCheckedChange={(checked) => 
                            handleArrayChange('intellectualProperty', option, checked as boolean)
                          }
                        />
                        <Label htmlFor={option} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Liability Terms</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {liabilityTermsOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={termsData.liabilityTerms.includes(option)}
                          onCheckedChange={(checked) => 
                            handleArrayChange('liabilityTerms', option, checked as boolean)
                          }
                        />
                        <Label htmlFor={option} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Terms */}
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Additional Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="additionalTerms">Additional Terms & Conditions</Label>
                <Textarea
                  id="additionalTerms"
                  placeholder="Any additional terms and conditions..."
                  value={termsData.additionalTerms}
                  onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Complete the scholarship setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Scholarship & Terms
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
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Additional Details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">Terms & Conditions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Scholarship Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{scholarshipData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-medium">{scholarshipData.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{scholarshipData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{scholarshipData.amount} {scholarshipData.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-medium">{scholarshipData.applicationDeadline}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
