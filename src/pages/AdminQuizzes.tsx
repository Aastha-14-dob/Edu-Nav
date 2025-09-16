import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Download, Clock, TrendingUp, Users, Award } from 'lucide-react';
import { mockQuizResults, mockStats } from '@/data/adminMockData';

export default function AdminQuizzes() {
  const [quizResults] = useState(mockQuizResults);

  const quizStats = [
    {
      title: 'Total Quiz Attempts',
      value: mockStats.quizzesTaken.toLocaleString(),
      icon: BarChart3,
      description: 'All-time quiz completions',
      trend: '+25% this month'
    },
    {
      title: 'Average Score',
      value: '88.5%',
      icon: Award,
      description: 'Average quiz performance',
      trend: '+2.3% improvement'
    },
    {
      title: 'Active Users',
      value: '456',
      icon: Users,
      description: 'Users taking quizzes',
      trend: '+12% this month'
    },
    {
      title: 'Avg. Completion Time',
      value: '27 min',
      icon: Clock,
      description: 'Average time to complete',
      trend: '-3 min faster'
    },
  ];

  const scoreDistribution = [
    { range: '90-100%', count: 145, percentage: 35 },
    { range: '80-89%', count: 123, percentage: 30 },
    { range: '70-79%', count: 89, percentage: 22 },
    { range: '60-69%', count: 34, percentage: 8 },
    { range: '0-59%', count: 20, percentage: 5 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quiz & Career Tests</h1>
          <p className="text-muted-foreground">Monitor quiz performance and results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
          <Button variant="hero">View Analytics</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizStats.map((stat, index) => (
          <Card key={index} className="shadow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {stat.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Quiz results breakdown by score ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scoreDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 text-sm font-medium">{item.range}</div>
                    <div className="flex-1 bg-muted rounded-full h-2 w-32">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.count} users ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Quiz Results */}
        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle>Recent Quiz Results</CardTitle>
            <CardDescription>Latest quiz completions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.studentName}</TableCell>
                    <TableCell>
                      <Badge variant={result.score >= 85 ? "default" : "secondary"}>
                        {result.score}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {result.timeTaken}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Performance Chart */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Quiz Performance Trends</CardTitle>
          <CardDescription>Monthly quiz completion and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">Performance chart visualization would go here</p>
              <p className="text-xs text-muted-foreground mt-2">Shows trends in quiz scores and completion rates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}