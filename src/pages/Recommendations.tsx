import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  CheckCircle2
} from 'lucide-react';

const careerRecommendations = [
  {
    id: 1,
    title: 'Software Engineer',
    matchPercentage: 95,
    salaryRange: '₹8-25 LPA',
    demandLevel: 'Very High',
    growthRate: '+15%',
    description: 'Design, develop, and maintain software applications and systems.',
    keySkills: ['Programming', 'Problem Solving', 'Algorithms', 'Software Design'],
    education: 'B.Tech Computer Science, BCA, MCA',
    jobRoles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer'],
    companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'TCS'],
    workEnvironment: 'Office/Remote',
    jobSecurity: 'High'
  },
  {
    id: 2,
    title: 'Data Scientist',
    matchPercentage: 88,
    salaryRange: '₹10-30 LPA',
    demandLevel: 'Very High',
    growthRate: '+20%',
    description: 'Analyze complex data to help organizations make better decisions.',
    keySkills: ['Statistics', 'Machine Learning', 'Python', 'Data Visualization'],
    education: 'B.Tech, M.Tech in CS/IT, Statistics, Mathematics',
    jobRoles: ['ML Engineer', 'Data Analyst', 'AI Researcher', 'Business Analyst'],
    companies: ['Meta', 'Google', 'IBM', 'Flipkart', 'Paytm'],
    workEnvironment: 'Office/Hybrid',
    jobSecurity: 'Very High'
  },
  {
    id: 3,
    title: 'Digital Marketing Manager',
    matchPercentage: 82,
    salaryRange: '₹6-18 LPA',
    demandLevel: 'High',
    growthRate: '+12%',
    description: 'Plan and execute digital marketing campaigns across various platforms.',
    keySkills: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics'],
    education: 'BBA, MBA Marketing, Mass Communication',
    jobRoles: ['SEO Specialist', 'Social Media Manager', 'Content Strategist', 'PPC Expert'],
    companies: ['Zomato', 'Swiggy', 'Byju\'s', 'Unacademy', 'Agencies'],
    workEnvironment: 'Office/Remote',
    jobSecurity: 'High'
  }
];

const skillsAssessment = [
  { skill: 'Logical Reasoning', score: 92, level: 'Expert' },
  { skill: 'Mathematical Aptitude', score: 88, level: 'Advanced' },
  { skill: 'Communication', score: 85, level: 'Advanced' },
  { skill: 'Problem Solving', score: 90, level: 'Expert' },
  { skill: 'Creativity', score: 78, level: 'Good' },
  { skill: 'Leadership', score: 82, level: 'Advanced' }
];

export default function Recommendations() {
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-success';
    if (score >= 80) return 'bg-primary';
    if (score >= 70) return 'bg-warning';
    return 'bg-muted';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Career Recommendations
          </h1>
          <p className="text-xl text-muted-foreground">
            Based on your aptitude test results, here are the careers that match your skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Assessment */}
          <div className="lg:col-span-1">
            <Card className="shadow-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Your Skills Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsAssessment.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <span className={`text-sm font-bold ${getScoreColor(skill.score)}`}>
                          {skill.score}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={skill.score} className="flex-1" />
                        <Badge variant="outline" className="text-xs">
                          {skill.level}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/quiz">
                      Retake Assessment
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/colleges">
                      Find Colleges
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/scholarships">
                      Apply for Scholarships
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Recommendations */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {careerRecommendations.map((career, index) => (
                <Card 
                  key={career.id} 
                  className={`shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer ${
                    selectedCareer === career.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCareer(selectedCareer === career.id ? null : career.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                            <CardTitle className="text-xl">{career.title}</CardTitle>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{career.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success mb-1">
                          {career.matchPercentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">Match</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

                      {/* Expanded Details */}
                      {selectedCareer === career.id && (
                        <div className="space-y-4 pt-4 border-t">
                          <div>
                            <h4 className="font-medium mb-2">Key Skills Required:</h4>
                            <div className="flex flex-wrap gap-2">
                              {career.keySkills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Educational Path:</h4>
                            <p className="text-sm text-muted-foreground">{career.education}</p>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Popular Job Roles:</h4>
                            <div className="flex flex-wrap gap-2">
                              {career.jobRoles.map((role, roleIndex) => (
                                <Badge key={roleIndex} variant="secondary" className="text-xs">
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Top Hiring Companies:</h4>
                            <p className="text-sm text-muted-foreground">
                              {career.companies.join(', ')}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-3 pt-4">
                        <Button className="flex-1" asChild>
                          <Link to={`/recommendations/${career.title.toLowerCase().replace(/\s+/g, '-')}`}>
                            View Career Path
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to={`/recommendations/${career.title.toLowerCase().replace(/\s+/g, '-')}/path`}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Roadmap
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="mt-8 bg-gradient-card shadow-hover">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Explore colleges that offer programs for your recommended careers and find 
                  scholarships to support your education.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/colleges">
                      Find Perfect Colleges
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/scholarships">
                      Discover Scholarships
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}