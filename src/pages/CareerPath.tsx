import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  IndianRupee, 
  Clock, 
  Users,
  Star,
  BookOpen,
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Brain,
  Code,
  Database,
  Megaphone
} from 'lucide-react';

const careerData: { [key: string]: any } = {
  'software-engineer': {
    title: 'Software Engineer',
    icon: Code,
    description: 'Design, develop, and maintain software applications and systems that power our digital world.',
    matchPercentage: 95,
    salaryRange: '₹8-25 LPA',
    demandLevel: 'Very High',
    growthRate: '+15%',
    jobSecurity: 'High',
    workEnvironment: 'Office/Remote',
    overview: 'Software engineers are the architects of the digital age, creating the applications and systems that billions of people use daily. They combine technical expertise with creative problem-solving to build solutions that make life easier and more efficient.',
    keySkills: [
      { skill: 'Programming Languages', level: 95, description: 'Proficiency in multiple programming languages like Java, Python, JavaScript, C++' },
      { skill: 'Problem Solving', level: 90, description: 'Ability to break down complex problems into manageable solutions' },
      { skill: 'Data Structures & Algorithms', level: 88, description: 'Understanding of efficient data organization and algorithmic thinking' },
      { skill: 'Software Design Patterns', level: 85, description: 'Knowledge of design principles and architectural patterns' },
      { skill: 'Version Control', level: 82, description: 'Experience with Git and collaborative development workflows' },
      { skill: 'Testing & Debugging', level: 80, description: 'Skills in writing tests and identifying/fixing bugs' }
    ],
    education: {
      degrees: ['B.Tech Computer Science', 'B.Tech Information Technology', 'BCA', 'MCA', 'M.Tech Computer Science'],
      duration: '4 years (B.Tech/BCA) + 2 years (M.Tech/MCA)',
      subjects: ['Programming', 'Data Structures', 'Algorithms', 'Database Management', 'Software Engineering', 'Computer Networks', 'Operating Systems'],
      topColleges: ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIIT Hyderabad', 'BITS Pilani', 'VIT Vellore', 'SRM University']
    },
    careerPath: {
      entry: [
        { role: 'Junior Developer', experience: '0-2 years', salary: '₹4-8 LPA', requirements: 'Strong programming fundamentals, portfolio projects' },
        { role: 'Software Developer', experience: '2-4 years', salary: '₹8-15 LPA', requirements: 'Experience with frameworks, understanding of SDLC' },
        { role: 'Senior Developer', experience: '4-7 years', salary: '₹15-25 LPA', requirements: 'Leadership skills, architecture knowledge, mentoring ability' }
      ],
      senior: [
        { role: 'Tech Lead', experience: '7-10 years', salary: '₹25-40 LPA', requirements: 'Technical leadership, team management, strategic thinking' },
        { role: 'Engineering Manager', experience: '10+ years', salary: '₹40-60 LPA', requirements: 'People management, project planning, business acumen' },
        { role: 'Principal Engineer', experience: '10+ years', salary: '₹50-80 LPA', requirements: 'Deep technical expertise, innovation, thought leadership' }
      ]
    },
    jobRoles: [
      { title: 'Frontend Developer', description: 'Build user interfaces using React, Vue, Angular', salary: '₹6-18 LPA', demand: 'High' },
      { title: 'Backend Developer', description: 'Develop server-side logic and APIs', salary: '₹8-20 LPA', demand: 'Very High' },
      { title: 'Full Stack Developer', description: 'Work on both frontend and backend technologies', salary: '₹10-25 LPA', demand: 'Very High' },
      { title: 'DevOps Engineer', description: 'Manage deployment and infrastructure', salary: '₹12-30 LPA', demand: 'High' },
      { title: 'Mobile App Developer', description: 'Create iOS and Android applications', salary: '₹8-22 LPA', demand: 'High' },
      { title: 'Data Engineer', description: 'Build and maintain data pipelines', salary: '₹10-28 LPA', demand: 'Very High' }
    ],
    companies: [
      { name: 'Google', description: 'Search engine and cloud services giant', hiring: 'Very High', workCulture: 'Innovative' },
      { name: 'Microsoft', description: 'Software and cloud computing leader', hiring: 'Very High', workCulture: 'Collaborative' },
      { name: 'Amazon', description: 'E-commerce and AWS cloud services', hiring: 'Very High', workCulture: 'Customer-focused' },
      { name: 'Flipkart', description: 'Leading e-commerce platform in India', hiring: 'High', workCulture: 'Startup-like' },
      { name: 'TCS', description: 'Global IT services and consulting', hiring: 'Very High', workCulture: 'Structured' },
      { name: 'Infosys', description: 'IT services and digital transformation', hiring: 'Very High', workCulture: 'Professional' }
    ],
    marketTrends: {
      growth: '+15% annually',
      demand: 'Very High',
      automation: 'Low risk',
      remoteWork: 'Highly supported',
      future: 'AI/ML integration, cloud computing, cybersecurity focus'
    },
    certifications: [
      { name: 'AWS Certified Developer', provider: 'Amazon', value: 'High', cost: '₹15,000' },
      { name: 'Google Cloud Professional', provider: 'Google', value: 'High', cost: '₹18,000' },
      { name: 'Microsoft Azure Developer', provider: 'Microsoft', value: 'High', cost: '₹12,000' },
      { name: 'Oracle Java Certification', provider: 'Oracle', value: 'Medium', cost: '₹20,000' }
    ]
  },
  'data-scientist': {
    title: 'Data Scientist',
    icon: Database,
    description: 'Analyze complex data to extract insights and help organizations make data-driven decisions.',
    matchPercentage: 88,
    salaryRange: '₹10-30 LPA',
    demandLevel: 'Very High',
    growthRate: '+20%',
    jobSecurity: 'Very High',
    workEnvironment: 'Office/Hybrid',
    overview: 'Data scientists are the detectives of the digital world, uncovering hidden patterns in data that drive business decisions. They combine statistical knowledge with programming skills to transform raw data into actionable insights.',
    keySkills: [
      { skill: 'Statistics & Mathematics', level: 95, description: 'Strong foundation in statistics, probability, and mathematical modeling' },
      { skill: 'Programming (Python/R)', level: 90, description: 'Proficiency in data analysis languages like Python, R, SQL' },
      { skill: 'Machine Learning', level: 88, description: 'Understanding of ML algorithms, model building, and evaluation' },
      { skill: 'Data Visualization', level: 85, description: 'Skills in creating compelling visualizations using tools like Tableau, PowerBI' },
      { skill: 'Big Data Tools', level: 82, description: 'Experience with Hadoop, Spark, and distributed computing' },
      { skill: 'Domain Knowledge', level: 80, description: 'Understanding of business context and industry-specific challenges' }
    ],
    education: {
      degrees: ['B.Tech Computer Science', 'B.Tech Data Science', 'M.Tech Data Science', 'MSc Statistics', 'MBA in Analytics'],
      duration: '4 years (B.Tech) + 2 years (M.Tech/MSc)',
      subjects: ['Statistics', 'Machine Learning', 'Data Mining', 'Big Data Analytics', 'Python/R Programming', 'Database Systems'],
      topColleges: ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIM Bangalore', 'ISI Kolkata', 'JNU Delhi', 'IISc Bangalore']
    },
    careerPath: {
      entry: [
        { role: 'Data Analyst', experience: '0-2 years', salary: '₹6-12 LPA', requirements: 'SQL, Excel, basic statistics, visualization tools' },
        { role: 'Junior Data Scientist', experience: '2-3 years', salary: '₹10-18 LPA', requirements: 'Python/R, ML basics, statistical modeling' },
        { role: 'Data Scientist', experience: '3-5 years', salary: '₹18-30 LPA', requirements: 'Advanced ML, deep learning, business acumen' }
      ],
      senior: [
        { role: 'Senior Data Scientist', experience: '5-8 years', salary: '₹30-45 LPA', requirements: 'Leadership, advanced algorithms, mentorship' },
        { role: 'Principal Data Scientist', experience: '8+ years', salary: '₹45-70 LPA', requirements: 'Research, innovation, strategic thinking' },
        { role: 'Chief Data Officer', experience: '10+ years', salary: '₹60-100 LPA', requirements: 'Executive leadership, data strategy, governance' }
      ]
    },
    jobRoles: [
      { title: 'ML Engineer', description: 'Build and deploy machine learning models', salary: '₹12-35 LPA', demand: 'Very High' },
      { title: 'Data Analyst', description: 'Analyze data to provide business insights', salary: '₹6-15 LPA', demand: 'High' },
      { title: 'AI Researcher', description: 'Research and develop new AI algorithms', salary: '₹20-50 LPA', demand: 'High' },
      { title: 'Business Analyst', description: 'Bridge between data and business strategy', salary: '₹8-20 LPA', demand: 'High' },
      { title: 'Data Engineer', description: 'Build data pipelines and infrastructure', salary: '₹10-28 LPA', demand: 'Very High' }
    ],
    companies: [
      { name: 'Google', description: 'Leading in AI and machine learning research', hiring: 'Very High', workCulture: 'Research-focused' },
      { name: 'Microsoft', description: 'Cloud AI and analytics services', hiring: 'Very High', workCulture: 'Innovation-driven' },
      { name: 'IBM', description: 'AI and cognitive computing solutions', hiring: 'High', workCulture: 'Enterprise-focused' },
      { name: 'Flipkart', description: 'E-commerce analytics and recommendation systems', hiring: 'High', workCulture: 'Data-driven' },
      { name: 'Paytm', description: 'Fintech and payment analytics', hiring: 'High', workCulture: 'Fast-paced' }
    ],
    marketTrends: {
      growth: '+20% annually',
      demand: 'Very High',
      automation: 'Low risk',
      remoteWork: 'Highly supported',
      future: 'AI/ML expansion, real-time analytics, ethical AI'
    },
    certifications: [
      { name: 'Google Data Analytics Certificate', provider: 'Google', value: 'High', cost: '₹10,000' },
      { name: 'IBM Data Science Professional', provider: 'IBM', value: 'High', cost: '₹15,000' },
      { name: 'Microsoft Certified: Azure Data Scientist', provider: 'Microsoft', value: 'High', cost: '₹12,000' },
      { name: 'AWS Machine Learning Specialty', provider: 'Amazon', value: 'High', cost: '₹18,000' }
    ]
  },
  'digital-marketing-manager': {
    title: 'Digital Marketing Manager',
    icon: Megaphone,
    description: 'Plan and execute digital marketing campaigns across various platforms to drive brand awareness and sales.',
    matchPercentage: 82,
    salaryRange: '₹6-18 LPA',
    demandLevel: 'High',
    growthRate: '+12%',
    jobSecurity: 'High',
    workEnvironment: 'Office/Remote',
    overview: 'Digital marketing managers are the strategists behind successful online campaigns. They combine creativity with analytics to reach target audiences and drive business growth through digital channels.',
    keySkills: [
      { skill: 'SEO/SEM', level: 90, description: 'Search engine optimization and marketing expertise' },
      { skill: 'Social Media Marketing', level: 88, description: 'Creating engaging content and managing social platforms' },
      { skill: 'Content Marketing', level: 85, description: 'Creating valuable content that attracts and converts audiences' },
      { skill: 'Analytics & Reporting', level: 82, description: 'Measuring campaign performance and ROI using analytics tools' },
      { skill: 'Email Marketing', level: 80, description: 'Designing and executing email campaigns' },
      { skill: 'PPC Advertising', level: 78, description: 'Managing paid advertising campaigns on Google, Facebook' }
    ],
    education: {
      degrees: ['BBA Marketing', 'MBA Marketing', 'Mass Communication', 'Digital Marketing Certificate'],
      duration: '3 years (BBA) + 2 years (MBA)',
      subjects: ['Marketing Management', 'Digital Marketing', 'Consumer Behavior', 'Brand Management', 'Marketing Analytics'],
      topColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'FMS Delhi', 'XLRI Jamshedpur', 'SIBM Pune']
    },
    careerPath: {
      entry: [
        { role: 'Digital Marketing Intern', experience: '0-1 year', salary: '₹2-4 LPA', requirements: 'Basic digital marketing knowledge, creativity' },
        { role: 'Digital Marketing Executive', experience: '1-3 years', salary: '₹4-8 LPA', requirements: 'Platform expertise, campaign management' },
        { role: 'Digital Marketing Specialist', experience: '3-5 years', salary: '₹8-15 LPA', requirements: 'Advanced skills, team coordination' }
      ],
      senior: [
        { role: 'Digital Marketing Manager', experience: '5-8 years', salary: '₹15-25 LPA', requirements: 'Strategy development, team leadership' },
        { role: 'Head of Digital Marketing', experience: '8+ years', salary: '₹25-40 LPA', requirements: 'Department management, budget planning' },
        { role: 'Chief Marketing Officer', experience: '10+ years', salary: '₹40-70 LPA', requirements: 'Executive leadership, brand strategy' }
      ]
    },
    jobRoles: [
      { title: 'SEO Specialist', description: 'Optimize websites for search engines', salary: '₹4-12 LPA', demand: 'High' },
      { title: 'Social Media Manager', description: 'Manage brand presence on social platforms', salary: '₹5-15 LPA', demand: 'High' },
      { title: 'Content Strategist', description: 'Plan and create engaging content', salary: '₹6-18 LPA', demand: 'High' },
      { title: 'PPC Expert', description: 'Manage paid advertising campaigns', salary: '₹8-20 LPA', demand: 'High' },
      { title: 'Marketing Analyst', description: 'Analyze campaign performance and insights', salary: '₹7-16 LPA', demand: 'Medium' }
    ],
    companies: [
      { name: 'Zomato', description: 'Food delivery and restaurant discovery', hiring: 'High', workCulture: 'Innovative' },
      { name: 'Swiggy', description: 'Online food ordering platform', hiring: 'High', workCulture: 'Fast-paced' },
      { name: 'Byju\'s', description: 'EdTech and online learning platform', hiring: 'High', workCulture: 'Mission-driven' },
      { name: 'Unacademy', description: 'Online education and test preparation', hiring: 'High', workCulture: 'Student-focused' }
    ],
    marketTrends: {
      growth: '+12% annually',
      demand: 'High',
      automation: 'Medium risk',
      remoteWork: 'Highly supported',
      future: 'AI-powered marketing, personalization, voice search'
    },
    certifications: [
      { name: 'Google Ads Certification', provider: 'Google', value: 'High', cost: 'Free' },
      { name: 'Facebook Blueprint', provider: 'Meta', value: 'High', cost: 'Free' },
      { name: 'HubSpot Content Marketing', provider: 'HubSpot', value: 'Medium', cost: '₹5,000' },
      { name: 'Google Analytics Certification', provider: 'Google', value: 'High', cost: 'Free' }
    ]
  }
};

export default function CareerPath() {
  const { careerName } = useParams<{ careerName: string }>();
  const career = careerData[careerName || ''];
  const IconComponent = career?.icon || Code;

  if (!career) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Career Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The career path you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/recommendations">
              <ArrowRight className="mr-2 h-4 w-4" />
              Back to Recommendations
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <IconComponent className="h-12 w-12 text-primary" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {career.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                Complete Career Guide
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-4xl">
            {career.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Career Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {career.overview}
                </p>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <IndianRupee className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-sm font-medium">{career.salaryRange}</div>
                    <div className="text-xs text-muted-foreground">Salary Range</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-5 w-5 text-success mx-auto mb-1" />
                    <div className="text-sm font-medium">{career.growthRate}</div>
                    <div className="text-xs text-muted-foreground">Job Growth</div>
                  </div>
                  <div className="text-center">
                    <BarChart3 className="h-5 w-5 text-warning mx-auto mb-1" />
                    <div className="text-sm font-medium">{career.demandLevel}</div>
                    <div className="text-xs text-muted-foreground">Market Demand</div>
                  </div>
                  <div className="text-center">
                    <CheckCircle2 className="h-5 w-5 text-accent mx-auto mb-1" />
                    <div className="text-sm font-medium">{career.jobSecurity}</div>
                    <div className="text-xs text-muted-foreground">Job Security</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Skills */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Key Skills Required</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {career.keySkills.map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.skill}</span>
                        <span className="text-sm font-bold text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education Path */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Educational Path</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Recommended Degrees:</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.education.degrees.map((degree: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {degree}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Duration:</h4>
                    <p className="text-sm text-muted-foreground">{career.education.duration}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Key Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.education.subjects.map((subject: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Top Colleges:</h4>
                    <p className="text-sm text-muted-foreground">
                      {career.education.topColleges.join(', ')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Progression */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span>Career Progression</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 text-success">Entry Level (0-5 years)</h4>
                    <div className="space-y-3">
                      {career.careerPath.entry.map((role: any, index: number) => (
                        <div key={index} className="border-l-4 border-primary pl-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{role.role}</h5>
                              <p className="text-sm text-muted-foreground">{role.experience}</p>
                              <p className="text-sm text-muted-foreground">{role.requirements}</p>
                            </div>
                            <Badge variant="outline" className="text-success border-success">
                              {role.salary}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-primary">Senior Level (5+ years)</h4>
                    <div className="space-y-3">
                      {career.careerPath.senior.map((role: any, index: number) => (
                        <div key={index} className="border-l-4 border-warning pl-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{role.role}</h5>
                              <p className="text-sm text-muted-foreground">{role.experience}</p>
                              <p className="text-sm text-muted-foreground">{role.requirements}</p>
                            </div>
                            <Badge variant="outline" className="text-warning border-warning">
                              {role.salary}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Roles */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Popular Job Roles</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {career.jobRoles.map((role: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{role.title}</h5>
                        <Badge variant={role.demand === 'Very High' ? 'default' : 'outline'}>
                          {role.demand}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                      <p className="text-sm font-medium text-success">{role.salary}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Companies */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Top Hiring Companies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {career.companies.map((company: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{company.name}</h5>
                        <Badge variant={company.hiring === 'Very High' ? 'default' : 'outline'}>
                          {company.hiring} Hiring
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{company.description}</p>
                      <p className="text-sm font-medium text-primary">{company.workCulture} Culture</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Trends */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Market Trends & Future</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Current Trends</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Annual Growth:</span>
                        <span className="text-sm font-medium text-success">{career.marketTrends.growth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Market Demand:</span>
                        <span className="text-sm font-medium text-primary">{career.marketTrends.demand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Automation Risk:</span>
                        <span className="text-sm font-medium text-warning">{career.marketTrends.automation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Remote Work:</span>
                        <span className="text-sm font-medium text-success">{career.marketTrends.remoteWork}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Future Outlook</h4>
                    <p className="text-sm text-muted-foreground">
                      {career.marketTrends.future}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Recommended Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {career.certifications.map((cert: any, index: number) => (
                    <div key={index} className="flex justify-between items-center border rounded-lg p-4">
                      <div>
                        <h5 className="font-medium">{cert.name}</h5>
                        <p className="text-sm text-muted-foreground">by {cert.provider}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={cert.value === 'High' ? 'default' : 'outline'}>
                          {cert.value} Value
                        </Badge>
                        <p className="text-sm font-medium text-success mt-1">{cert.cost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to={`/recommendations/${careerName}/path`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Career Roadmap
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/colleges">
                      <MapPin className="mr-2 h-4 w-4" />
                      Find Colleges
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/scholarships">
                      <Award className="mr-2 h-4 w-4" />
                      Apply for Scholarships
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/admissions">
                      <Calendar className="mr-2 h-4 w-4" />
                      Check Deadlines
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Career Match */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-success mb-2">
                    {career.matchPercentage}%
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Compatibility Score
                  </div>
                  <Progress value={career.matchPercentage} className="mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Based on your aptitude test results, this career aligns well with your skills and interests.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Related Careers */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Related Careers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.keys(careerData)
                    .filter(key => key !== careerName)
                    .slice(0, 3)
                    .map((key) => {
                      const relatedCareer = careerData[key];
                      const RelatedIcon = relatedCareer.icon;
                      return (
                        <Link 
                          key={key}
                          to={`/recommendations/${key}`}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <RelatedIcon className="h-8 w-8 text-primary" />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{relatedCareer.title}</h5>
                            <p className="text-xs text-muted-foreground">{relatedCareer.salaryRange}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
