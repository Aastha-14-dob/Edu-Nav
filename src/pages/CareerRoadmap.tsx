import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Code,
  Database,
  Megaphone,
  Target,
  TrendingUp,
  Users,
  Award,
  GraduationCap,
  MapPin,
  Brain,
  Briefcase,
  IndianRupee,
  Star,
  BarChart3
} from 'lucide-react';

const roadmapData: { [key: string]: any } = {
  'software-engineer': {
    title: 'Software Engineer',
    icon: Code,
    totalDuration: '8-12 years',
    phases: [
      {
        title: 'Foundation Phase (0-2 years)',
        duration: '2 years',
        description: 'Build fundamental programming skills and get your first job',
        color: 'border-green-500',
        bgColor: 'bg-green-50',
        items: [
          {
            title: 'Learn Programming Fundamentals',
            duration: '6 months',
            description: 'Master one programming language (Python, Java, or JavaScript)',
            tasks: [
              'Complete online coding bootcamp or course',
              'Build 3-5 small projects',
              'Practice coding problems daily',
              'Learn version control with Git'
            ],
            resources: ['Codecademy', 'freeCodeCamp', 'LeetCode', 'GitHub'],
            skills: ['Programming', 'Problem Solving', 'Git']
          },
          {
            title: 'Data Structures & Algorithms',
            duration: '6 months',
            description: 'Understand core computer science concepts',
            tasks: [
              'Study arrays, linked lists, trees, graphs',
              'Practice algorithm problems',
              'Understand time and space complexity',
              'Participate in coding contests'
            ],
            resources: ['GeeksforGeeks', 'LeetCode', 'HackerRank', 'Cracking the Coding Interview'],
            skills: ['Algorithms', 'Data Structures', 'Complexity Analysis']
          },
          {
            title: 'Build Portfolio Projects',
            duration: '6 months',
            description: 'Create impressive projects to showcase your skills',
            tasks: [
              'Build a full-stack web application',
              'Create a mobile app',
              'Contribute to open source projects',
              'Deploy projects online'
            ],
            resources: ['React', 'Node.js', 'MongoDB', 'AWS', 'Netlify'],
            skills: ['Full Stack Development', 'Deployment', 'Project Management']
          },
          {
            title: 'Land First Job',
            duration: '6 months',
            description: 'Apply for internships and entry-level positions',
            tasks: [
              'Prepare resume and portfolio',
              'Practice technical interviews',
              'Apply to 50+ companies',
              'Network with professionals'
            ],
            resources: ['LinkedIn', 'AngelList', 'Glassdoor', 'Company websites'],
            skills: ['Interviewing', 'Networking', 'Resume Writing']
          }
        ]
      },
      {
        title: 'Growth Phase (2-5 years)',
        duration: '3 years',
        description: 'Specialize and become a competent developer',
        color: 'border-blue-500',
        bgColor: 'bg-blue-50',
        items: [
          {
            title: 'Choose Specialization',
            duration: '1 year',
            description: 'Focus on frontend, backend, or full-stack development',
            tasks: [
              'Master chosen technology stack',
              'Build 2-3 complex projects',
              'Learn industry best practices',
              'Get certified in relevant technologies'
            ],
            resources: ['React/Vue/Angular', 'Node.js/Django/Spring', 'AWS/Azure'],
            skills: ['Specialized Development', 'Best Practices', 'Certifications']
          },
          {
            title: 'Advanced Programming',
            duration: '1 year',
            description: 'Learn advanced concepts and frameworks',
            tasks: [
              'Study design patterns',
              'Learn microservices architecture',
              'Understand database optimization',
              'Practice system design'
            ],
            resources: ['Design Patterns Book', 'System Design Interview', 'Microservices.io'],
            skills: ['System Design', 'Architecture', 'Performance Optimization']
          },
          {
            title: 'Team Collaboration',
            duration: '1 year',
            description: 'Learn to work effectively in teams',
            tasks: [
              'Use agile methodologies',
              'Learn code review practices',
              'Improve communication skills',
              'Mentor junior developers'
            ],
            resources: ['Scrum Guide', 'Agile Manifesto', 'Team collaboration tools'],
            skills: ['Agile', 'Code Review', 'Mentoring', 'Communication']
          }
        ]
      },
      {
        title: 'Senior Phase (5-8 years)',
        duration: '3 years',
        description: 'Become a technical leader and expert',
        color: 'border-purple-500',
        bgColor: 'bg-purple-50',
        items: [
          {
            title: 'Technical Leadership',
            duration: '1.5 years',
            description: 'Lead technical decisions and mentor others',
            tasks: [
              'Architect large-scale systems',
              'Make technology stack decisions',
              'Lead code reviews',
              'Mentor junior developers'
            ],
            resources: ['Leadership books', 'Technical blogs', 'Conference talks'],
            skills: ['Technical Leadership', 'Architecture', 'Mentoring']
          },
          {
            title: 'Advanced Specialization',
            duration: '1.5 years',
            description: 'Become an expert in your chosen field',
            tasks: [
              'Master cutting-edge technologies',
              'Contribute to open source',
              'Speak at conferences',
              'Write technical articles'
            ],
            resources: ['Latest tech trends', 'Open source projects', 'Tech conferences'],
            skills: ['Expertise', 'Thought Leadership', 'Community Building']
          }
        ]
      },
      {
        title: 'Expert Phase (8+ years)',
        duration: 'Ongoing',
        description: 'Become a recognized expert and leader',
        color: 'border-orange-500',
        bgColor: 'bg-orange-50',
        items: [
          {
            title: 'Principal Engineer',
            duration: '2+ years',
            description: 'Set technical direction for the organization',
            tasks: [
              'Define technical strategy',
              'Research new technologies',
              'Build technical teams',
              'Drive innovation'
            ],
            resources: ['Research papers', 'Industry reports', 'Innovation labs'],
            skills: ['Strategic Thinking', 'Innovation', 'Team Building']
          },
          {
            title: 'Engineering Manager/CTO',
            duration: 'Ongoing',
            description: 'Lead engineering organizations',
            tasks: [
              'Manage engineering teams',
              'Set technical vision',
              'Drive business outcomes',
              'Build engineering culture'
            ],
            resources: ['Management books', 'Leadership courses', 'MBA programs'],
            skills: ['Management', 'Business Acumen', 'Leadership']
          }
        ]
      }
    ],
    milestones: [
      { title: 'First Programming Project', time: '3 months', importance: 'High' },
      { title: 'First Job Offer', time: '1 year', importance: 'Critical' },
      { title: 'First Promotion', time: '2.5 years', importance: 'High' },
      { title: 'Technical Lead Role', time: '5 years', importance: 'Critical' },
      { title: 'Senior Engineer', time: '7 years', importance: 'High' },
      { title: 'Principal Engineer', time: '10 years', importance: 'Critical' }
    ],
    salaryProgression: [
      { level: 'Entry Level', experience: '0-2 years', salary: '₹4-8 LPA', growth: '100%' },
      { level: 'Mid Level', experience: '2-5 years', salary: '₹8-20 LPA', growth: '150%' },
      { level: 'Senior Level', experience: '5-8 years', salary: '₹20-40 LPA', growth: '100%' },
      { level: 'Principal', experience: '8+ years', salary: '₹40-80 LPA', growth: '100%' }
    ]
  },
  'data-scientist': {
    title: 'Data Scientist',
    icon: Database,
    totalDuration: '8-10 years',
    phases: [
      {
        title: 'Foundation Phase (0-2 years)',
        duration: '2 years',
        description: 'Build mathematical and programming foundation',
        color: 'border-green-500',
        bgColor: 'bg-green-50',
        items: [
          {
            title: 'Mathematics & Statistics',
            duration: '6 months',
            description: 'Master the mathematical foundation',
            tasks: [
              'Review linear algebra and calculus',
              'Learn probability and statistics',
              'Study inferential statistics',
              'Practice statistical modeling'
            ],
            resources: ['Khan Academy', 'Coursera Statistics', 'Introduction to Statistical Learning'],
            skills: ['Statistics', 'Probability', 'Linear Algebra']
          },
          {
            title: 'Programming Skills',
            duration: '6 months',
            description: 'Learn Python/R and data manipulation',
            tasks: [
              'Master Python/R programming',
              'Learn pandas/numpy for data manipulation',
              'Practice data cleaning techniques',
              'Work with Jupyter notebooks'
            ],
            resources: ['Python for Data Analysis', 'R for Data Science', 'Jupyter Notebooks'],
            skills: ['Python/R', 'Data Manipulation', 'Data Cleaning']
          },
          {
            title: 'Data Visualization',
            duration: '6 months',
            description: 'Learn to create compelling visualizations',
            tasks: [
              'Master matplotlib/seaborn/plotly',
              'Learn Tableau/PowerBI',
              'Create interactive dashboards',
              'Practice storytelling with data'
            ],
            resources: ['Matplotlib', 'Tableau', 'PowerBI', 'D3.js'],
            skills: ['Data Visualization', 'Dashboard Creation', 'Storytelling']
          },
          {
            title: 'First Data Job',
            duration: '6 months',
            description: 'Land an entry-level data role',
            tasks: [
              'Build a portfolio with data projects',
              'Prepare for data science interviews',
              'Apply to data analyst positions',
              'Network with data professionals'
            ],
            resources: ['Kaggle', 'DataCamp', 'LinkedIn', 'Data science meetups'],
            skills: ['Portfolio Building', 'Interviewing', 'Networking']
          }
        ]
      },
      {
        title: 'Growth Phase (2-5 years)',
        duration: '3 years',
        description: 'Specialize in machine learning and advanced analytics',
        color: 'border-blue-500',
        bgColor: 'bg-blue-50',
        items: [
          {
            title: 'Machine Learning Fundamentals',
            duration: '1 year',
            description: 'Learn core ML algorithms and techniques',
            tasks: [
              'Study supervised and unsupervised learning',
              'Implement ML algorithms from scratch',
              'Learn model evaluation techniques',
              'Practice with real datasets'
            ],
            resources: ['Scikit-learn', 'Machine Learning Course by Andrew Ng', 'Hands-on ML'],
            skills: ['Machine Learning', 'Model Evaluation', 'Feature Engineering']
          },
          {
            title: 'Deep Learning',
            duration: '1 year',
            description: 'Master neural networks and deep learning',
            tasks: [
              'Learn neural network fundamentals',
              'Master frameworks like TensorFlow/PyTorch',
              'Build deep learning models',
              'Understand computer vision and NLP'
            ],
            resources: ['TensorFlow', 'PyTorch', 'Deep Learning Specialization', 'Fast.ai'],
            skills: ['Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP']
          },
          {
            title: 'Big Data & Cloud',
            duration: '1 year',
            description: 'Work with large datasets and cloud platforms',
            tasks: [
              'Learn Hadoop and Spark',
              'Master cloud platforms (AWS/GCP/Azure)',
              'Work with distributed computing',
              'Build scalable data pipelines'
            ],
            resources: ['Apache Spark', 'AWS', 'Google Cloud', 'Azure'],
            skills: ['Big Data', 'Cloud Computing', 'Data Pipelines', 'Scalability']
          }
        ]
      },
      {
        title: 'Senior Phase (5-8 years)',
        duration: '3 years',
        description: 'Become a technical leader in data science',
        color: 'border-purple-500',
        bgColor: 'bg-purple-50',
        items: [
          {
            title: 'Advanced ML & AI',
            duration: '1.5 years',
            description: 'Work on cutting-edge AI problems',
            tasks: [
              'Research new ML techniques',
              'Build production ML systems',
              'Lead ML model deployment',
              'Optimize model performance'
            ],
            resources: ['Research papers', 'MLOps', 'Model serving', 'A/B testing'],
            skills: ['Advanced ML', 'MLOps', 'Model Deployment', 'Research']
          },
          {
            title: 'Technical Leadership',
            duration: '1.5 years',
            description: 'Lead data science teams and projects',
            tasks: [
              'Architect data science solutions',
              'Mentor junior data scientists',
              'Set technical direction',
              'Drive business impact'
            ],
            resources: ['Leadership courses', 'Technical blogs', 'Industry conferences'],
            skills: ['Technical Leadership', 'Team Management', 'Strategic Thinking']
          }
        ]
      },
      {
        title: 'Expert Phase (8+ years)',
        duration: 'Ongoing',
        description: 'Become a recognized expert and leader',
        color: 'border-orange-500',
        bgColor: 'bg-orange-50',
        items: [
          {
            title: 'Principal Data Scientist',
            duration: '2+ years',
            description: 'Set data science strategy for organizations',
            tasks: [
              'Define data science roadmap',
              'Research emerging technologies',
              'Build data science teams',
              'Drive innovation in AI/ML'
            ],
            resources: ['AI research', 'Industry reports', 'Innovation labs'],
            skills: ['Strategic Planning', 'Innovation', 'Team Building']
          },
          {
            title: 'Chief Data Officer',
            duration: 'Ongoing',
            description: 'Lead data strategy across organizations',
            tasks: [
              'Set organization-wide data strategy',
              'Manage data governance',
              'Drive data-driven culture',
              'Lead digital transformation'
            ],
            resources: ['Data governance', 'Digital transformation', 'Executive courses'],
            skills: ['Executive Leadership', 'Data Strategy', 'Digital Transformation']
          }
        ]
      }
    ],
    milestones: [
      { title: 'First Data Analysis Project', time: '6 months', importance: 'High' },
      { title: 'First ML Model', time: '1 year', importance: 'Critical' },
      { title: 'First Data Job', time: '1.5 years', importance: 'Critical' },
      { title: 'ML Engineer Role', time: '3 years', importance: 'High' },
      { title: 'Senior Data Scientist', time: '5 years', importance: 'Critical' },
      { title: 'Principal Data Scientist', time: '8 years', importance: 'Critical' }
    ],
    salaryProgression: [
      { level: 'Data Analyst', experience: '0-2 years', salary: '₹6-12 LPA', growth: '100%' },
      { level: 'Junior Data Scientist', experience: '2-3 years', salary: '₹12-20 LPA', growth: '67%' },
      { level: 'Data Scientist', experience: '3-5 years', salary: '₹20-35 LPA', growth: '75%' },
      { level: 'Senior Data Scientist', experience: '5-8 years', salary: '₹35-60 LPA', growth: '71%' },
      { level: 'Principal Data Scientist', experience: '8+ years', salary: '₹60-100 LPA', growth: '67%' }
    ]
  },
  'digital-marketing-manager': {
    title: 'Digital Marketing Manager',
    icon: Megaphone,
    totalDuration: '6-8 years',
    phases: [
      {
        title: 'Foundation Phase (0-2 years)',
        duration: '2 years',
        description: 'Learn digital marketing fundamentals',
        color: 'border-green-500',
        bgColor: 'bg-green-50',
        items: [
          {
            title: 'Digital Marketing Fundamentals',
            duration: '6 months',
            description: 'Understand the digital marketing landscape',
            tasks: [
              'Learn digital marketing concepts',
              'Understand customer journey',
              'Study marketing psychology',
              'Learn about digital channels'
            ],
            resources: ['Google Digital Garage', 'HubSpot Academy', 'Coursera Marketing', 'Marketing books'],
            skills: ['Digital Marketing', 'Customer Psychology', 'Marketing Strategy']
          },
          {
            title: 'SEO & Content Marketing',
            duration: '6 months',
            description: 'Master search engine optimization and content',
            tasks: [
              'Learn SEO best practices',
              'Master content creation',
              'Understand keyword research',
              'Build content calendar'
            ],
            resources: ['Google Search Console', 'SEMrush', 'Ahrefs', 'Content management tools'],
            skills: ['SEO', 'Content Creation', 'Keyword Research', 'Content Strategy']
          },
          {
            title: 'Social Media & PPC',
            duration: '6 months',
            description: 'Learn paid advertising and social media marketing',
            tasks: [
              'Master Facebook/Instagram ads',
              'Learn Google Ads',
              'Understand social media strategy',
              'Practice campaign optimization'
            ],
            resources: ['Facebook Blueprint', 'Google Ads Academy', 'Hootsuite', 'Buffer'],
            skills: ['PPC Advertising', 'Social Media Marketing', 'Campaign Optimization']
          },
          {
            title: 'First Marketing Role',
            duration: '6 months',
            description: 'Land an entry-level digital marketing position',
            tasks: [
              'Build marketing portfolio',
              'Get Google/Facebook certifications',
              'Apply to marketing agencies',
              'Network with marketers'
            ],
            resources: ['Google Certifications', 'Facebook Blueprint', 'LinkedIn', 'Marketing meetups'],
            skills: ['Portfolio Building', 'Certifications', 'Networking']
          }
        ]
      },
      {
        title: 'Growth Phase (2-5 years)',
        duration: '3 years',
        description: 'Specialize and become a skilled marketer',
        color: 'border-blue-500',
        bgColor: 'bg-blue-50',
        items: [
          {
            title: 'Marketing Analytics',
            duration: '1 year',
            description: 'Learn to measure and optimize marketing performance',
            tasks: [
              'Master Google Analytics',
              'Learn A/B testing',
              'Understand attribution modeling',
              'Build marketing dashboards'
            ],
            resources: ['Google Analytics', 'Mixpanel', 'Amplitude', 'Data visualization tools'],
            skills: ['Marketing Analytics', 'A/B Testing', 'Attribution', 'Data Visualization']
          },
          {
            title: 'Marketing Automation',
            duration: '1 year',
            description: 'Automate marketing processes and campaigns',
            tasks: [
              'Learn email marketing automation',
              'Master CRM systems',
              'Build marketing funnels',
              'Implement lead nurturing'
            ],
            resources: ['Mailchimp', 'HubSpot', 'Marketo', 'Pardot'],
            skills: ['Marketing Automation', 'CRM', 'Email Marketing', 'Lead Nurturing']
          },
          {
            title: 'Advanced Strategy',
            duration: '1 year',
            description: 'Develop strategic thinking and campaign management',
            tasks: [
              'Plan integrated campaigns',
              'Manage marketing budgets',
              'Lead cross-functional teams',
              'Drive business growth'
            ],
            resources: ['Strategy frameworks', 'Budget planning tools', 'Project management'],
            skills: ['Strategic Planning', 'Budget Management', 'Team Leadership', 'Growth Marketing']
          }
        ]
      },
      {
        title: 'Senior Phase (5-8 years)',
        duration: '3 years',
        description: 'Become a marketing leader and manager',
        color: 'border-purple-500',
        bgColor: 'bg-purple-50',
        items: [
          {
            title: 'Marketing Management',
            duration: '1.5 years',
            description: 'Lead marketing teams and departments',
            tasks: [
              'Manage marketing teams',
              'Set marketing strategy',
              'Coordinate with sales teams',
              'Drive revenue growth'
            ],
            resources: ['Management courses', 'Leadership books', 'Sales alignment'],
            skills: ['Team Management', 'Strategic Leadership', 'Sales Alignment', 'Revenue Growth']
          },
          {
            title: 'Brand & Product Marketing',
            duration: '1.5 years',
            description: 'Focus on brand building and product marketing',
            tasks: [
              'Develop brand strategy',
              'Launch new products',
              'Manage brand positioning',
              'Drive brand awareness'
            ],
            resources: ['Brand strategy', 'Product marketing', 'Brand management'],
            skills: ['Brand Strategy', 'Product Marketing', 'Brand Management', 'Market Research']
          }
        ]
      },
      {
        title: 'Expert Phase (8+ years)',
        duration: 'Ongoing',
        description: 'Become a CMO or marketing executive',
        color: 'border-orange-500',
        bgColor: 'bg-orange-50',
        items: [
          {
            title: 'Chief Marketing Officer',
            duration: '2+ years',
            description: 'Lead marketing for entire organizations',
            tasks: [
              'Set company-wide marketing vision',
              'Manage large marketing budgets',
              'Drive digital transformation',
              'Lead marketing innovation'
            ],
            resources: ['Executive education', 'Digital transformation', 'Innovation labs'],
            skills: ['Executive Leadership', 'Digital Transformation', 'Innovation', 'Business Strategy']
          }
        ]
      }
    ],
    milestones: [
      { title: 'First Marketing Campaign', time: '6 months', importance: 'High' },
      { title: 'First Marketing Job', time: '1 year', importance: 'Critical' },
      { title: 'First Promotion', time: '2.5 years', importance: 'High' },
      { title: 'Marketing Manager', time: '4 years', importance: 'Critical' },
      { title: 'Senior Marketing Manager', time: '6 years', importance: 'High' },
      { title: 'Marketing Director', time: '8 years', importance: 'Critical' }
    ],
    salaryProgression: [
      { level: 'Marketing Intern', experience: '0-1 year', salary: '₹2-4 LPA', growth: '100%' },
      { level: 'Marketing Executive', experience: '1-3 years', salary: '₹4-8 LPA', growth: '100%' },
      { level: 'Marketing Specialist', experience: '3-5 years', salary: '₹8-15 LPA', growth: '88%' },
      { level: 'Marketing Manager', experience: '5-8 years', salary: '₹15-25 LPA', growth: '67%' },
      { level: 'Senior Marketing Manager', experience: '8+ years', salary: '₹25-40 LPA', growth: '60%' }
    ]
  }
};

export default function CareerRoadmap() {
  const { careerName } = useParams<{ careerName: string }>();
  const roadmap = roadmapData[careerName || ''];
  const IconComponent = roadmap?.icon || Target;

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Roadmap Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The career roadmap you're looking for doesn't exist.
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
                {roadmap.title} Career Roadmap
              </h1>
              <p className="text-xl text-muted-foreground">
                Your step-by-step journey to success
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Total Duration: {roadmap.totalDuration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>4 Major Phases</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Roadmap */}
          <div className="lg:col-span-2 space-y-8">
            {roadmap.phases.map((phase: any, phaseIndex: number) => (
              <Card key={phaseIndex} className={`shadow-card border-l-4 ${phase.color} ${phase.bgColor}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{phase.duration}</p>
                    </div>
                    <Badge variant="outline" className="text-lg font-bold">
                      Phase {phaseIndex + 1}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{phase.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {phase.items.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="border rounded-lg p-6 bg-white">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{item.duration}</span>
                              </div>
                              <Badge variant="secondary">{itemIndex + 1}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium mb-3 flex items-center">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-success" />
                              Key Tasks
                            </h5>
                            <ul className="space-y-2">
                              {item.tasks.map((task: string, taskIndex: number) => (
                                <li key={taskIndex} className="text-sm flex items-start">
                                  <ArrowRight className="h-3 w-3 mt-1 mr-2 text-primary flex-shrink-0" />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-3 flex items-center">
                              <BookOpen className="h-4 w-4 mr-2 text-primary" />
                              Resources & Tools
                            </h5>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {item.resources.map((resource: string, resourceIndex: number) => (
                                <Badge key={resourceIndex} variant="outline" className="text-xs">
                                  {resource}
                                </Badge>
                              ))}
                            </div>
                            
                            <h5 className="font-medium mb-2 flex items-center">
                              <Star className="h-4 w-4 mr-2 text-warning" />
                              Skills You'll Gain
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill: string, skillIndex: number) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Tracker */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Career Milestones</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roadmap.milestones.map((milestone: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        milestone.importance === 'Critical' ? 'bg-primary' : 'bg-success'
                      }`} />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{milestone.title}</h5>
                        <p className="text-xs text-muted-foreground">{milestone.time}</p>
                      </div>
                      {milestone.importance === 'Critical' && (
                        <Badge variant="default" className="text-xs">
                          Critical
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Salary Progression */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Salary Progression</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roadmap.salaryProgression.map((level: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-sm">{level.level}</h5>
                        <Badge variant="outline" className="text-xs">
                          {level.experience}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-success">{level.salary}</span>
                        <span className="text-xs text-muted-foreground">+{level.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to={`/recommendations/${careerName}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Career Details
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

            {/* Tips */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Success Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                    <p className="text-sm">Stay updated with latest technologies and trends</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                    <p className="text-sm">Build a strong portfolio with real projects</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                    <p className="text-sm">Network with professionals in your field</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                    <p className="text-sm">Get certified in relevant technologies</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                    <p className="text-sm">Contribute to open source projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
