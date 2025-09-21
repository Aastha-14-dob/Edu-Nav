import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  ArrowLeft,
  Search,
  MapPin,
  Users,
  Award,
  Star,
  BookOpen,
  IndianRupee,
  Calendar,
  Target,
  CheckCircle2,
  AlertCircle,
  Building,
  Globe,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { mockColleges } from '@/data/mockData';

interface CollegeInsight {
  id: string;
  name: string;
  location: string;
  type: string;
  ranking: number;
  establishedYear: number;
  totalStudents: number;
  facultyCount: number;
  fees: {
    tuition: string;
    hostel: string;
    total: string;
    breakdown: {
      tuition: number;
      hostel: number;
      library: number;
      sports: number;
      other: number;
    };
  };
  placement: {
    averagePackage: string;
    highestPackage: string;
    placementRate: number;
    topRecruiters: string[];
    departmentWise: {
      department: string;
      averagePackage: string;
      placementRate: number;
    }[];
  };
  academics: {
    courses: string[];
    faculty: {
      total: number;
      phd: number;
      experience: string;
    };
    research: {
      publications: number;
      patents: number;
      funding: string;
    };
  };
  infrastructure: {
    campus: string;
    hostels: string;
    library: string;
    labs: string;
    sports: string;
  };
  admission: {
    cutoff: string;
    process: string;
    examAccepted: string[];
    seats: number;
    applicationFee: string;
  };
  alumni: {
    notable: string[];
    companies: string[];
    successRate: number;
  };
  reviews: {
    overall: number;
    academics: number;
    placement: number;
    infrastructure: number;
    faculty: number;
    valueForMoney: number;
  };
  pros: string[];
  cons: string[];
  image: string;
  description: string;
}

const collegeInsights: CollegeInsight[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, India',
    type: 'Engineering',
    ranking: 1,
    establishedYear: 1961,
    totalStudents: 8500,
    facultyCount: 650,
    fees: {
      tuition: '₹2,50,000/year',
      hostel: '₹1,20,000/year',
      total: '₹3,70,000/year',
      breakdown: {
        tuition: 250000,
        hostel: 120000,
        library: 15000,
        sports: 10000,
        other: 25000
      }
    },
    placement: {
      averagePackage: '₹18.5 LPA',
      highestPackage: '₹2.5 Cr',
      placementRate: 98,
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'McKinsey'],
      departmentWise: [
        { department: 'Computer Science', averagePackage: '₹25 LPA', placementRate: 100 },
        { department: 'Mechanical', averagePackage: '₹15 LPA', placementRate: 97 },
        { department: 'Electrical', averagePackage: '₹16 LPA', placementRate: 98 }
      ]
    },
    academics: {
      courses: ['B.Tech', 'M.Tech', 'MBA', 'Ph.D'],
      faculty: {
        total: 650,
        phd: 580,
        experience: '15+ years average'
      },
      research: {
        publications: 1200,
        patents: 85,
        funding: '₹150 Cr annually'
      }
    },
    infrastructure: {
      campus: '320 acres, modern facilities',
      hostels: '15 hostels, 6000+ capacity',
      library: 'Central library with 2M+ books',
      labs: '50+ specialized laboratories',
      sports: 'Olympic-size swimming pool, multiple courts'
    },
    admission: {
      cutoff: 'JEE Advanced Rank 1-500',
      process: 'JEE Advanced + Counseling',
      examAccepted: ['JEE Advanced', 'GATE', 'CAT'],
      seats: 1200,
      applicationFee: '₹2600'
    },
    alumni: {
      notable: ['Sundar Pichai', 'Nandan Nilekani', 'Raghuram Rajan'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'],
      successRate: 95
    },
    reviews: {
      overall: 4.8,
      academics: 4.9,
      placement: 4.8,
      infrastructure: 4.7,
      faculty: 4.8,
      valueForMoney: 4.6
    },
    pros: ['Excellent placements', 'World-class faculty', 'Strong alumni network', 'Research opportunities'],
    cons: ['High competition', 'Expensive fees', 'Academic pressure'],
    image: '/api/placeholder/400/300',
    description: 'Premier engineering institute with world-class faculty and infrastructure.'
  },
  {
    id: '2',
    name: 'All India Institute of Medical Sciences',
    location: 'New Delhi, India',
    type: 'Medical',
    ranking: 1,
    establishedYear: 1956,
    totalStudents: 3200,
    facultyCount: 1200,
    fees: {
      tuition: '₹5,856/year',
      hostel: '₹1,500/year',
      total: '₹7,356/year',
      breakdown: {
        tuition: 5856,
        hostel: 1500,
        library: 500,
        sports: 200,
        other: 300
      }
    },
    placement: {
      averagePackage: '₹12 LPA',
      highestPackage: '₹50 LPA',
      placementRate: 100,
      topRecruiters: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Government Hospitals'],
      departmentWise: [
        { department: 'Medicine', averagePackage: '₹15 LPA', placementRate: 100 },
        { department: 'Surgery', averagePackage: '₹18 LPA', placementRate: 100 },
        { department: 'Pediatrics', averagePackage: '₹12 LPA', placementRate: 100 }
      ]
    },
    academics: {
      courses: ['MBBS', 'MD', 'MS', 'DM', 'MCh', 'Ph.D'],
      faculty: {
        total: 1200,
        phd: 800,
        experience: '20+ years average'
      },
      research: {
        publications: 2000,
        patents: 120,
        funding: '₹200 Cr annually'
      }
    },
    infrastructure: {
      campus: '150 acres, hospital complex',
      hostels: '8 hostels, 2000+ capacity',
      library: 'Medical library with 1M+ books',
      labs: 'Advanced medical laboratories',
      sports: 'Comprehensive sports facilities'
    },
    admission: {
      cutoff: 'NEET Rank 1-100',
      process: 'NEET + Counseling',
      examAccepted: ['NEET', 'AIIMS PG', 'JIPMER'],
      seats: 100,
      applicationFee: '₹1500'
    },
    alumni: {
      notable: ['Dr. Devi Shetty', 'Dr. Naresh Trehan', 'Dr. Sanjay Gupta'],
      companies: ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare'],
      successRate: 98
    },
    reviews: {
      overall: 4.9,
      academics: 4.9,
      placement: 4.9,
      infrastructure: 4.8,
      faculty: 4.9,
      valueForMoney: 4.9
    },
    pros: ['Minimal fees', 'Best medical education', 'Government support', 'Excellent reputation'],
    cons: ['Extremely competitive', 'Long duration', 'Intensive curriculum'],
    image: '/api/placeholder/400/300',
    description: 'Leading medical college with excellent research facilities.'
  },
  {
    id: '3',
    name: 'Lady Shri Ram College',
    location: 'New Delhi, India',
    type: 'Arts',
    ranking: 2,
    establishedYear: 1956,
    totalStudents: 2800,
    facultyCount: 180,
    fees: {
      tuition: '₹45,000/year',
      hostel: '₹1,20,000/year',
      total: '₹1,65,000/year',
      breakdown: {
        tuition: 45000,
        hostel: 120000,
        library: 5000,
        sports: 3000,
        other: 7000
      }
    },
    placement: {
      averagePackage: '₹6 LPA',
      highestPackage: '₹15 LPA',
      placementRate: 85,
      topRecruiters: ['McKinsey', 'BCG', 'EY', 'PwC', 'Teach for India'],
      departmentWise: [
        { department: 'Economics', averagePackage: '₹8 LPA', placementRate: 90 },
        { department: 'Psychology', averagePackage: '₹5 LPA', placementRate: 80 },
        { department: 'English', averagePackage: '₹4 LPA', placementRate: 75 }
      ]
    },
    academics: {
      courses: ['B.A. Hons', 'M.A.', 'Ph.D'],
      faculty: {
        total: 180,
        phd: 150,
        experience: '12+ years average'
      },
      research: {
        publications: 300,
        patents: 15,
        funding: '₹25 Cr annually'
      }
    },
    infrastructure: {
      campus: '15 acres, heritage buildings',
      hostels: '3 hostels, 800+ capacity',
      library: 'Central library with 500K+ books',
      labs: 'Psychology and science laboratories',
      sports: 'Sports complex with courts and gym'
    },
    admission: {
      cutoff: '98% in Class 12',
      process: 'Merit-based + Interview',
      examAccepted: ['CUET', 'Direct Admission'],
      seats: 800,
      applicationFee: '₹500'
    },
    alumni: {
      notable: ['Shabana Azmi', 'Jaya Bachchan', 'Nandita Das'],
      companies: ['McKinsey', 'BCG', 'EY', 'Teach for India'],
      successRate: 88
    },
    reviews: {
      overall: 4.6,
      academics: 4.7,
      placement: 4.4,
      infrastructure: 4.5,
      faculty: 4.6,
      valueForMoney: 4.5
    },
    pros: ['Excellent faculty', 'Strong alumnae network', 'Liberal arts focus', 'Good placements'],
    cons: ['Limited hostel seats', 'Competitive admission', 'Arts stream limitations'],
    image: '/api/placeholder/400/300',
    description: 'Premier women\'s college known for liberal arts education.'
  },
  {
    id: '4',
    name: 'Shri Ram College of Commerce',
    location: 'New Delhi, India',
    type: 'Commerce',
    ranking: 1,
    establishedYear: 1926,
    totalStudents: 3200,
    facultyCount: 120,
    fees: {
      tuition: '₹50,000/year',
      hostel: '₹1,50,000/year',
      total: '₹2,00,000/year',
      breakdown: {
        tuition: 50000,
        hostel: 150000,
        library: 8000,
        sports: 5000,
        other: 12000
      }
    },
    placement: {
      averagePackage: '₹8 LPA',
      highestPackage: '₹25 LPA',
      placementRate: 92,
      topRecruiters: ['Goldman Sachs', 'JP Morgan', 'Deloitte', 'EY', 'PwC'],
      departmentWise: [
        { department: 'B.Com Hons', averagePackage: '₹9 LPA', placementRate: 95 },
        { department: 'Economics Hons', averagePackage: '₹10 LPA', placementRate: 90 },
        { department: 'BBA', averagePackage: '₹7 LPA', placementRate: 88 }
      ]
    },
    academics: {
      courses: ['B.Com Hons', 'Economics Hons', 'BBA', 'M.Com', 'MBA'],
      faculty: {
        total: 120,
        phd: 95,
        experience: '15+ years average'
      },
      research: {
        publications: 200,
        patents: 8,
        funding: '₹30 Cr annually'
      }
    },
    infrastructure: {
      campus: '12 acres, modern facilities',
      hostels: '2 hostels, 600+ capacity',
      library: 'Business library with 300K+ books',
      labs: 'Computer labs and trading room',
      sports: 'Sports facilities and gym'
    },
    admission: {
      cutoff: '97% in Class 12',
      process: 'Merit-based + Interview',
      examAccepted: ['CUET', 'Direct Admission'],
      seats: 600,
      applicationFee: '₹500'
    },
    alumni: {
      notable: ['Raghuram Rajan', 'Nandan Nilekani', 'Arun Jaitley'],
      companies: ['Goldman Sachs', 'JP Morgan', 'Deloitte', 'EY'],
      successRate: 94
    },
    reviews: {
      overall: 4.7,
      academics: 4.8,
      placement: 4.7,
      infrastructure: 4.6,
      faculty: 4.7,
      valueForMoney: 4.6
    },
    pros: ['Excellent placements', 'Strong finance focus', 'Alumni network', 'Industry connections'],
    cons: ['High competition', 'Limited hostel seats', 'Pressure to perform'],
    image: '/api/placeholder/400/300',
    description: 'Top commerce college with excellent placement records.'
  }
];

export default function CollegeInsights() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState<CollegeInsight | null>(null);

  const filteredColleges = collegeInsights.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || college.type === selectedType;
    return matchesSearch && matchesType;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/parent-dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                College Insights
              </h1>
              <p className="text-xl text-muted-foreground">
                Detailed information about colleges, fees, and placement records
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search colleges by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredColleges.map((college) => (
            <Card 
              key={college.id} 
              className="shadow-card hover:shadow-hover transition-all cursor-pointer"
              onClick={() => setSelectedCollege(college)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{college.name}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{college.location}</span>
                    </div>
                    <Badge className="mb-3">{college.type}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Ranking</div>
                    <div className="text-2xl font-bold text-primary">#{college.ranking}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-success/5 rounded">
                      <div className="flex items-center space-x-1 mb-1">
                        <IndianRupee className="h-3 w-3 text-success" />
                        <span className="text-xs font-medium">Avg Package</span>
                      </div>
                      <div className="text-sm font-bold text-success">
                        {college.placement.averagePackage}
                      </div>
                    </div>
                    <div className="p-3 bg-primary/5 rounded">
                      <div className="flex items-center space-x-1 mb-1">
                        <Users className="h-3 w-3 text-primary" />
                        <span className="text-xs font-medium">Placement</span>
                      </div>
                      <div className="text-sm font-bold text-primary">
                        {college.placement.placementRate}%
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {getRatingStars(college.reviews.overall)}
                    </div>
                    <span className="text-sm font-medium">{college.reviews.overall}</span>
                    <span className="text-xs text-muted-foreground">({college.totalStudents} students)</span>
                  </div>

                  {/* Fees */}
                  <div className="p-3 bg-muted/50 rounded">
                    <div className="text-sm font-medium mb-1">Annual Fees</div>
                    <div className="text-lg font-bold">{college.fees.total}</div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="text-muted-foreground">Established</div>
                      <div className="font-medium">{college.establishedYear}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Students</div>
                      <div className="font-medium">{college.totalStudents.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Faculty</div>
                      <div className="font-medium">{college.facultyCount}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed College View */}
        {selectedCollege && (
          <div className="space-y-8">
            {/* College Header */}
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{selectedCollege.name}</h2>
                        <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{selectedCollege.location}</span>
                          </div>
                          <Badge className="text-sm">{selectedCollege.type}</Badge>
                          <div className="flex items-center space-x-1">
                            <Award className="h-4 w-4" />
                            <span>Rank #{selectedCollege.ranking}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedCollege(null)}
                        size="sm"
                      >
                        Close
                      </Button>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{selectedCollege.description}</p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {getRatingStars(selectedCollege.reviews.overall)}
                        <span className="ml-2 font-medium">{selectedCollege.reviews.overall}</span>
                      </div>
                      <Badge variant="secondary">
                        {selectedCollege.establishedYear} • {selectedCollege.totalStudents.toLocaleString()} students
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="placement">Placement</TabsTrigger>
                <TabsTrigger value="academics">Academics</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                <TabsTrigger value="admission">Admission</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Established</span>
                        <span className="font-medium">{selectedCollege.establishedYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Students</span>
                        <span className="font-medium">{selectedCollege.totalStudents.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Faculty Count</span>
                        <span className="font-medium">{selectedCollege.facultyCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Placement Rate</span>
                        <span className="font-medium text-success">{selectedCollege.placement.placementRate}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reviews Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Reviews & Ratings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(selectedCollege.reviews).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-muted-foreground capitalize">{key}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={value * 20} className="w-16 h-2" />
                            <span className={`text-sm font-medium ${getRatingColor(value)}`}>
                              {value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Pros and Cons */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pros & Cons</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Pros
                          </h4>
                          <ul className="space-y-1">
                            {selectedCollege.pros.map((pro, index) => (
                              <li key={index} className="text-sm text-green-700">• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Cons
                          </h4>
                          <ul className="space-y-1">
                            {selectedCollege.cons.map((con, index) => (
                              <li key={index} className="text-sm text-red-700">• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Alumni Network */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Alumni Network</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Notable Alumni</h4>
                        <div className="space-y-2">
                          {selectedCollege.alumni.notable.map((alumnus, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded">
                              <div className="font-medium">{alumnus}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Top Companies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCollege.alumni.companies.map((company, index) => (
                            <Badge key={index} variant="secondary">{company}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fees" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <IndianRupee className="h-5 w-5 text-primary" />
                      <span>Fee Structure</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <h4 className="font-semibold mb-2">Annual Fee Breakdown</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Tuition Fee</span>
                              <span className="font-medium">{selectedCollege.fees.tuition}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Hostel Fee</span>
                              <span className="font-medium">{selectedCollege.fees.hostel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Library Fee</span>
                              <span className="font-medium">{formatCurrency(selectedCollege.fees.breakdown.library)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sports Fee</span>
                              <span className="font-medium">{formatCurrency(selectedCollege.fees.breakdown.sports)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Other Fees</span>
                              <span className="font-medium">{formatCurrency(selectedCollege.fees.breakdown.other)}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total Annual Fee</span>
                              <span className="text-primary">{selectedCollege.fees.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-success/5 rounded-lg">
                          <h4 className="font-semibold mb-2">ROI Analysis</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Average Package</span>
                              <span className="font-medium text-success">{selectedCollege.placement.averagePackage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Highest Package</span>
                              <span className="font-medium text-success">{selectedCollege.placement.highestPackage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Placement Rate</span>
                              <span className="font-medium text-success">{selectedCollege.placement.placementRate}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-warning/5 rounded-lg">
                          <h4 className="font-semibold mb-2">Financial Aid</h4>
                          <p className="text-sm text-muted-foreground">
                            Various scholarships and financial aid options are available. 
                            Contact the college administration for details on merit-based 
                            and need-based scholarships.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="placement" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-success" />
                      <span>Placement Statistics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="p-4 bg-success/5 rounded-lg text-center">
                        <div className="text-2xl font-bold text-success mb-1">
                          {selectedCollege.placement.averagePackage}
                        </div>
                        <div className="text-sm text-muted-foreground">Average Package</div>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {selectedCollege.placement.placementRate}%
                        </div>
                        <div className="text-sm text-muted-foreground">Placement Rate</div>
                      </div>
                      <div className="p-4 bg-warning/5 rounded-lg text-center">
                        <div className="text-2xl font-bold text-warning mb-1">
                          {selectedCollege.placement.highestPackage}
                        </div>
                        <div className="text-sm text-muted-foreground">Highest Package</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Department-wise Placements</h4>
                        <div className="space-y-3">
                          {selectedCollege.placement.departmentWise.map((dept, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{dept.department}</span>
                                <Badge variant="secondary">{dept.placementRate}%</Badge>
                              </div>
                              <div className="text-sm text-success font-medium">
                                {dept.averagePackage}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4">Top Recruiters</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedCollege.placement.topRecruiters.map((recruiter, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded text-center">
                              <div className="font-medium text-sm">{recruiter}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="academics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span>Academic Programs</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedCollege.academics.courses.map((course, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded">
                            <div className="font-medium">{course}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Faculty Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Faculty</span>
                        <span className="font-medium">{selectedCollege.academics.faculty.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">PhD Faculty</span>
                        <span className="font-medium">{selectedCollege.academics.faculty.phd}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average Experience</span>
                        <span className="font-medium">{selectedCollege.academics.faculty.experience}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span>Research & Development</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Publications</span>
                        <span className="font-medium">{selectedCollege.academics.research.publications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Patents</span>
                        <span className="font-medium">{selectedCollege.academics.research.patents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Research Funding</span>
                        <span className="font-medium">{selectedCollege.academics.research.funding}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="infrastructure" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-primary" />
                      <span>Infrastructure Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Campus</h4>
                          <p className="text-sm text-muted-foreground">{selectedCollege.infrastructure.campus}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Hostels</h4>
                          <p className="text-sm text-muted-foreground">{selectedCollege.infrastructure.hostels}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Library</h4>
                          <p className="text-sm text-muted-foreground">{selectedCollege.infrastructure.library}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Laboratories</h4>
                          <p className="text-sm text-muted-foreground">{selectedCollege.infrastructure.labs}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Sports Facilities</h4>
                          <p className="text-sm text-muted-foreground">{selectedCollege.infrastructure.sports}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="admission" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span>Admission Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <h4 className="font-semibold mb-2">Admission Process</h4>
                          <p className="text-sm text-muted-foreground mb-3">{selectedCollege.admission.process}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cutoff</span>
                              <span className="font-medium">{selectedCollege.admission.cutoff}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total Seats</span>
                              <span className="font-medium">{selectedCollege.admission.seats}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Application Fee</span>
                              <span className="font-medium">{selectedCollege.admission.applicationFee}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-success/5 rounded-lg">
                          <h4 className="font-semibold mb-2">Exams Accepted</h4>
                          <div className="space-y-2">
                            {selectedCollege.admission.examAccepted.map((exam, index) => (
                              <Badge key={index} variant="secondary" className="mr-2">
                                {exam}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-warning/5 rounded-lg">
                          <h4 className="font-semibold mb-2">Important Dates</h4>
                          <p className="text-sm text-muted-foreground">
                            Application deadlines and exam dates vary each year. 
                            Please check the official college website for current 
                            admission schedule and requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
