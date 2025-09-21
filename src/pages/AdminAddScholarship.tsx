import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScholarship } from '@/contexts/ScholarshipContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Plus, Award, DollarSign, Calendar, Users } from 'lucide-react';

export default function AdminAddScholarship() {
  const navigate = useNavigate();
  const { addScholarship } = useScholarship();
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    type: '',
    category: '',
    amount: '',
    currency: 'INR',
    description: '',
    eligibility: '',
    applicationProcess: '',
    requiredDocuments: '',
    applicationDeadline: '',
    announcementDate: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const scholarshipTypes = [
    'Merit-based',
    'Need-based',
    'Merit-cum-Means',
    'Sports',
    'Cultural',
    'Research',
    'International',
    'Government',
    'Private',
    'Corporate',
    'Other'
  ];

  const categories = [
    'Engineering',
    'Medical',
    'Management',
    'Arts & Science',
    'Law',
    'Agriculture',
    'Pharmacy',
    'Architecture',
    'Dental',
    'Veterinary',
    'General',
    'Other'
  ];

  const currencies = ['INR', 'USD', 'EUR', 'GBP'];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Scholarship name is required';
    if (!formData.provider.trim()) newErrors.provider = 'Provider is required';
    if (!formData.type) newErrors.type = 'Scholarship type is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.amount.trim()) newErrors.amount = 'Amount is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.eligibility.trim()) newErrors.eligibility = 'Eligibility criteria is required';
    if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    // Website validation
    const websiteRegex = /^https?:\/\/.+/;
    if (formData.website && !websiteRegex.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (starting with http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Convert form data to scholarship format
      const scholarshipData = {
        title: formData.name,
        provider: formData.provider,
        type: formData.type,
        category: formData.category,
        amount: formData.amount,
        currency: formData.currency,
        description: formData.description,
        eligibility: formData.eligibility,
        applicationProcess: formData.applicationProcess,
        requiredDocuments: formData.requiredDocuments,
        applicationDeadline: formData.applicationDeadline,
        announcementDate: formData.announcementDate,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        website: formData.website,
        isActive: formData.isActive,
      };
      
      addScholarship(scholarshipData);
      alert('Scholarship added successfully!');
      navigate('/admin/scholarships');
    }
  };

  const handleSaveAndAddDetails = () => {
    if (validateForm()) {
      console.log('Saving scholarship data:', formData);
      navigate('/admin/add-scholarship/details', { state: { scholarshipData: formData } });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Scholarship</h1>
          <p className="text-muted-foreground">Enter basic information about the scholarship</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Scholarship Information</span>
              </CardTitle>
              <CardDescription>
                Fill in the basic details of the scholarship
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scholarship Name and Provider */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Scholarship Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter scholarship name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provider">Provider/Organization *</Label>
                  <Input
                    id="provider"
                    placeholder="Enter provider name"
                    value={formData.provider}
                    onChange={(e) => handleInputChange('provider', e.target.value)}
                    className={errors.provider ? 'border-destructive' : ''}
                  />
                  {errors.provider && <p className="text-sm text-destructive">{errors.provider}</p>}
                </div>
              </div>

              {/* Type and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Scholarship Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select scholarship type" />
                    </SelectTrigger>
                    <SelectContent>
                      {scholarshipTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                </div>
              </div>

              {/* Amount and Currency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    placeholder="Enter scholarship amount"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className={errors.amount ? 'border-destructive' : ''}
                  />
                  {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the scholarship program..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={errors.description ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              {/* Eligibility */}
              <div className="space-y-2">
                <Label htmlFor="eligibility">Eligibility Criteria *</Label>
                <Textarea
                  id="eligibility"
                  placeholder="Describe eligibility requirements..."
                  value={formData.eligibility}
                  onChange={(e) => handleInputChange('eligibility', e.target.value)}
                  className={errors.eligibility ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.eligibility && <p className="text-sm text-destructive">{errors.eligibility}</p>}
              </div>

              {/* Application Process */}
              <div className="space-y-2">
                <Label htmlFor="applicationProcess">Application Process</Label>
                <Textarea
                  id="applicationProcess"
                  placeholder="Describe how to apply..."
                  value={formData.applicationProcess}
                  onChange={(e) => handleInputChange('applicationProcess', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Required Documents */}
              <div className="space-y-2">
                <Label htmlFor="requiredDocuments">Required Documents</Label>
                <Textarea
                  id="requiredDocuments"
                  placeholder="List required documents..."
                  value={formData.requiredDocuments}
                  onChange={(e) => handleInputChange('requiredDocuments', e.target.value)}
                  rows={2}
                />
              </div>

              {/* Important Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Important Dates</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                    <Input
                      id="applicationDeadline"
                      type="date"
                      value={formData.applicationDeadline}
                      onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                      className={errors.applicationDeadline ? 'border-destructive' : ''}
                    />
                    {errors.applicationDeadline && <p className="text-sm text-destructive">{errors.applicationDeadline}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="announcementDate">Announcement Date</Label>
                    <Input
                      id="announcementDate"
                      type="date"
                      value={formData.announcementDate}
                      onChange={(e) => handleInputChange('announcementDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://www.scholarship.org"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className={errors.website ? 'border-destructive' : ''}
                  />
                  {errors.website && <p className="text-sm text-destructive">{errors.website}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@scholarship.org"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className={errors.contactEmail ? 'border-destructive' : ''}
                    />
                    {errors.contactEmail && <p className="text-sm text-destructive">{errors.contactEmail}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      placeholder="+91 1234567890"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    />
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
                Save Scholarship
              </Button>
              
              <Button onClick={handleSaveAndAddDetails} variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Save & Add Details
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
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">Basic Information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Additional Details</span>
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