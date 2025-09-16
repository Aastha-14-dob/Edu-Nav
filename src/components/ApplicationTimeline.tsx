import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  BookOpen,
  Trophy,
  GraduationCap
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  type: 'scholarship' | 'admission' | 'exam' | 'course';
  date: Date;
  deadline: Date;
  status: 'upcoming' | 'active' | 'completed' | 'missed';
  description: string;
  priority: 'high' | 'medium' | 'low';
  requirements?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'National Merit Scholarship Application',
    type: 'scholarship',
    date: new Date('2024-05-01'),
    deadline: new Date('2024-05-15'),
    status: 'active',
    description: 'Submit application for National Merit Scholarship with required documents',
    priority: 'high',
    requirements: ['Class 12 marksheet', 'Income certificate', 'Bank details']
  },
  {
    id: '2',
    title: 'JEE Advanced Registration',
    type: 'exam',
    date: new Date('2024-04-30'),
    deadline: new Date('2024-05-05'),
    status: 'active',
    description: 'Register for JEE Advanced examination',
    priority: 'high',
    requirements: ['JEE Main qualification', 'Valid ID proof', 'Photograph']
  },
  {
    id: '3',
    title: 'IIT Delhi Application',
    type: 'admission',
    date: new Date('2024-06-01'),
    deadline: new Date('2024-06-30'),
    status: 'upcoming',
    description: 'Apply for admission to IIT Delhi based on JEE Advanced rank',
    priority: 'high',
    requirements: ['JEE Advanced scorecard', 'Academic transcripts', 'Character certificate']
  },
  {
    id: '4',
    title: 'INSPIRE Scholarship',
    type: 'scholarship',
    date: new Date('2024-11-01'),
    deadline: new Date('2024-12-31'),
    status: 'upcoming',
    description: 'Apply for INSPIRE scholarship for science students',
    priority: 'medium',
    requirements: ['Science stream proof', 'Research proposal', 'Recommendation letters']
  },
  {
    id: '5',
    title: 'NEET Application Submission',
    type: 'exam',
    date: new Date('2024-03-01'),
    deadline: new Date('2024-03-31'),
    status: 'completed',
    description: 'NEET application successfully submitted',
    priority: 'high',
    requirements: ['Completed successfully']
  }
];

export default function ApplicationTimeline() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'active': return <Clock className="h-5 w-5 text-warning" />;
      case 'upcoming': return <CalendarIcon className="h-5 w-5 text-primary" />;
      case 'missed': return <AlertCircle className="h-5 w-5 text-destructive" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scholarship': return <Trophy className="h-4 w-4" />;
      case 'admission': return <GraduationCap className="h-4 w-4" />;
      case 'exam': return <BookOpen className="h-4 w-4" />;
      case 'course': return <BookOpen className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'active': return 'destructive';
      case 'upcoming': return 'default';
      case 'missed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredEvents = timelineEvents.filter(event => {
    if (filter === 'all') return true;
    return event.type === filter || event.status === filter;
  });

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Application Timeline
        </h1>
        <p className="text-xl text-muted-foreground">
          Track your scholarship applications, admission deadlines, and exam dates all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Calendar View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                  size="sm"
                >
                  All Events
                </Button>
                <Button
                  variant={filter === 'active' ? 'default' : 'outline'}
                  onClick={() => setFilter('active')}
                  size="sm"
                >
                  Active
                </Button>
                <Button
                  variant={filter === 'upcoming' ? 'default' : 'outline'}
                  onClick={() => setFilter('upcoming')}
                  size="sm"
                >
                  Upcoming
                </Button>
                <Button
                  variant={filter === 'scholarship' ? 'default' : 'outline'}
                  onClick={() => setFilter('scholarship')}
                  size="sm"
                >
                  Scholarships
                </Button>
                <Button
                  variant={filter === 'admission' ? 'default' : 'outline'}
                  onClick={() => setFilter('admission')}
                  size="sm"
                >
                  Admissions
                </Button>
                <Button
                  variant={filter === 'exam' ? 'default' : 'outline'}
                  onClick={() => setFilter('exam')}
                  size="sm"
                >
                  Exams
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Events */}
          <div className="space-y-4">
            {filteredEvents.map((event, index) => {
              const daysUntil = getDaysUntilDeadline(event.deadline);
              return (
                <Card key={event.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getStatusIcon(event.status)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getTypeIcon(event.type)}
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>Deadline: {event.deadline.toLocaleDateString('en-IN')}</span>
                            {event.status === 'active' && daysUntil > 0 && (
                              <Badge variant="outline" className="ml-2">
                                {daysUntil} days left
                              </Badge>
                            )}
                            {event.status === 'active' && daysUntil <= 0 && (
                              <Badge variant="destructive" className="ml-2">
                                Overdue
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(event.priority) as any}>
                          {event.priority} priority
                        </Badge>
                        <Badge variant={getStatusColor(event.status) as any}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    
                    {event.requirements && event.requirements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {event.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <CheckCircle2 className="h-4 w-4 text-success mr-2" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {event.status === 'active' && (
                      <div className="flex space-x-2">
                        <Button size="sm">
                          Take Action
                        </Button>
                        <Button variant="outline" size="sm">
                          Set Reminder
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}