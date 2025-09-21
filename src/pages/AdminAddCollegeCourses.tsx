import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Plus, Trash2, Edit, BookOpen, GraduationCap } from 'lucide-react';

export default function AdminAddCollegeCourses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collegeData, setCollegeData] = useState<any>(null);
  const [detailsData, setDetailsData] = useState<any>(null);
  
  const [courses, setCourses] = useState<Array<{
    id: string;
    name: string;
    duration: string;
    degree: string;
    specialization: string;
    eligibility: string;
    intake: string;
    fees: string;
    description: string;
  }>>([]);

  const [newCourse, setNewCourse] = useState({
    name: '',
    duration: '',
    degree: '',
    specialization: '',
    eligibility: '',
    intake: '',
    fees: '',
    description: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);

  const degreeTypes = [
    'Bachelor of Technology (B.Tech)',
    'Bachelor of Engineering (B.E)',
    'Bachelor of Science (B.Sc)',
    'Bachelor of Commerce (B.Com)',
    'Bachelor of Arts (B.A)',
    'Bachelor of Business Administration (BBA)',
    'Bachelor of Computer Applications (BCA)',
    'Master of Technology (M.Tech)',
    'Master of Science (M.Sc)',
    'Master of Commerce (M.Com)',
    'Master of Arts (M.A)',
    'Master of Business Administration (MBA)',
    'Master of Computer Applications (MCA)',
    'Doctor of Philosophy (Ph.D)',
    'Other'
  ];

  const durationOptions = [
    '1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years'
  ];

  useEffect(() => {
    if (location.state?.collegeData && location.state?.detailsData) {
      setCollegeData(location.state.collegeData);
      setDetailsData(location.state.detailsData);
    } else {
      // If no data, redirect back to add college
      navigate('/admin/add-college');
    }
  }, [location.state, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setNewCourse(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.degree && newCourse.duration) {
      const course = {
        id: Date.now().toString(),
        ...newCourse
      };
      setCourses(prev => [...prev, course]);
      setNewCourse({
        name: '',
        duration: '',
        degree: '',
        specialization: '',
        eligibility: '',
        intake: '',
        fees: '',
        description: ''
      });
      setShowAddForm(false);
    }
  };

  const handleEditCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setNewCourse({
        name: course.name,
        duration: course.duration,
        degree: course.degree,
        specialization: course.specialization,
        eligibility: course.eligibility,
        intake: course.intake,
        fees: course.fees,
        description: course.description
      });
      setEditingCourse(courseId);
      setShowAddForm(true);
    }
  };

  const handleUpdateCourse = () => {
    if (editingCourse && newCourse.name && newCourse.degree && newCourse.duration) {
      setCourses(prev => prev.map(course => 
        course.id === editingCourse 
          ? { ...course, ...newCourse }
          : course
      ));
      setNewCourse({
        name: '',
        duration: '',
        degree: '',
        specialization: '',
        eligibility: '',
        intake: '',
        fees: '',
        description: ''
      });
      setEditingCourse(null);
      setShowAddForm(false);
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
  };

  const handleSave = () => {
    console.log('Saving college with courses:', { collegeData, detailsData, courses });
    alert('College and courses saved successfully!');
    navigate('/admin/colleges');
  };

  if (!collegeData || !detailsData) {
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
        <Button variant="outline" onClick={() => navigate('/admin/add-college/details', { state: { collegeData, detailsData } })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Details
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add College Courses</h1>
          <p className="text-muted-foreground">Manage courses for {collegeData.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Course Form */}
          {showAddForm && (
            <Card className="shadow-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>{editingCourse ? 'Edit Course' : 'Add New Course'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Computer Science Engineering"
                      value={newCourse.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree Type *</Label>
                    <Select value={newCourse.degree} onValueChange={(value) => handleInputChange('degree', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree type" />
                      </SelectTrigger>
                      <SelectContent>
                        {degreeTypes.map((degree) => (
                          <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration *</Label>
                    <Select value={newCourse.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map((duration) => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      placeholder="e.g., Artificial Intelligence"
                      value={newCourse.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eligibility">Eligibility</Label>
                    <Input
                      id="eligibility"
                      placeholder="e.g., 10+2 with 60% marks"
                      value={newCourse.eligibility}
                      onChange={(e) => handleInputChange('eligibility', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="intake">Intake Capacity</Label>
                    <Input
                      id="intake"
                      placeholder="e.g., 120"
                      value={newCourse.intake}
                      onChange={(e) => handleInputChange('intake', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fees">Course Fees (per year)</Label>
                  <Input
                    id="fees"
                    placeholder="e.g., ₹1,50,000"
                    value={newCourse.fees}
                    onChange={(e) => handleInputChange('fees', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Course description..."
                    value={newCourse.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={editingCourse ? handleUpdateCourse : handleAddCourse}
                    className="flex-1"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {editingCourse ? 'Update Course' : 'Add Course'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCourse(null);
                      setNewCourse({
                        name: '',
                        duration: '',
                        degree: '',
                        specialization: '',
                        eligibility: '',
                        intake: '',
                        fees: '',
                        description: ''
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Courses List */}
          <Card className="shadow-hover">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Courses ({courses.length})</CardTitle>
                  <CardDescription>List of all courses offered by this college</CardDescription>
                </div>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Course
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {courses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No courses added yet. Click "Add Course" to get started.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Degree</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Intake</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{course.name}</div>
                            {course.specialization && (
                              <Badge variant="outline" className="text-xs">
                                {course.specialization}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {course.degree}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{course.duration}</Badge>
                        </TableCell>
                        <TableCell>{course.intake || '-'}</TableCell>
                        <TableCell className="font-medium">{course.fees || '-'}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditCourse(course.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCourse(course.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Complete the college setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save College & Courses
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
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Additional Details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">Course Management</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle>College Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{collegeData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{collegeData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{collegeData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Courses:</span>
                  <span className="font-medium">{courses.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
