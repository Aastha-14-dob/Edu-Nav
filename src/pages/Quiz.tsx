import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mockQuizQuestions } from '@/data/mockData';
import { Brain, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const questions = mockQuizQuestions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      toast({
        title: 'Please select an answer',
        description: 'Choose an option before proceeding.',
        variant: 'destructive',
      });
      return;
    }

    // Save answer
    const updatedAnswers = {
      ...answers,
      [questions[currentQuestion].id]: parseInt(selectedAnswer)
    };
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Calculate results and navigate
      const score = calculateScore(updatedAnswers);
      localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));
      localStorage.setItem('quizScore', JSON.stringify(score));
      
      toast({
        title: 'Quiz Completed!',
        description: 'Analyzing your responses...',
      });
      
      navigate('/quiz/results');
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    }
  };

  const handlePrevious = () => {
    if (isFirstQuestion) return;
    
    setCurrentQuestion(currentQuestion - 1);
    const previousAnswer = answers[questions[currentQuestion - 1].id];
    setSelectedAnswer(previousAnswer?.toString() || '');
  };

  const calculateScore = (allAnswers: Record<string, number>) => {
    const categoryScores = {
      Aptitude: { count: 0, total: 0, avg: 0 },
      Interest: { count: 0, total: 0, avg: 0 },
      Personality: { count: 0, total: 0, avg: 0 }
    };

    // Calculate weighted scores based on answer choices
    Object.entries(allAnswers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        categoryScores[question.category].count++;
        categoryScores[question.category].total += answer;
      }
    });

    // Calculate averages
    Object.keys(categoryScores).forEach(category => {
      if (categoryScores[category].count > 0) {
        categoryScores[category].avg = categoryScores[category].total / categoryScores[category].count;
      }
    });

    const total = Object.values(categoryScores).reduce((sum, cat) => sum + cat.total, 0);
    const maxPossible = questions.length * 5; // Assuming 5 options per question
    
    return {
      categories: {
        Aptitude: categoryScores.Aptitude.count,
        Interest: categoryScores.Interest.count,
        Personality: categoryScores.Personality.count
      },
      categoryScores,
      total,
      percentage: Math.round((total / maxPossible) * 100),
      recommendations: getRecommendations(categoryScores, allAnswers)
    };
  };

  const getRecommendations = (categoryScores: any, answers: Record<string, number>) => {
    const recommendations = [];
    
    // Analyze specific answer patterns for more accurate recommendations
    const answerAnalysis = {
      technical: 0,    // Building/fixing, math/logic, programming
      creative: 0,     // Creating/design, artistic expression, communication
      analytical: 0,   // Logic problems, research, data analysis
      social: 0,       // Helping/caring, people skills, leadership
      practical: 0,    // Hands-on work, tools, real-world application
      academic: 0      // Research, study, theoretical work
    };

    // Map answers to career inclinations
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        switch (questionId) {
          case '1': // What energizes you most?
            if (answer === 0) answerAnalysis.technical += 2; // Building/fixing
            if (answer === 1) answerAnalysis.analytical += 2; // Logic problems
            if (answer === 2) answerAnalysis.creative += 2; // Creating/design
            if (answer === 3) answerAnalysis.social += 2; // Helping/caring
            if (answer === 4) answerAnalysis.social += 1; // Selling/leading
            if (answer === 5) answerAnalysis.practical += 1; // Organizing
            break;
          case '2': // Which skills feel natural?
            if (answer === 0) answerAnalysis.analytical += 2; // Math/logic
            if (answer === 1) answerAnalysis.creative += 2; // Writing/speaking
            if (answer === 2) answerAnalysis.technical += 1; // Spatial/visual
            if (answer === 3) answerAnalysis.technical += 2; // Mechanical/tools
            if (answer === 4) answerAnalysis.creative += 2; // Artistic
            if (answer === 5) answerAnalysis.social += 2; // Service
            break;
          case '3': // Work trade-offs
            if (answer === 0) answerAnalysis.analytical += 1; // Autonomy
            if (answer === 1) answerAnalysis.practical += 2; // Stability
            if (answer === 2) answerAnalysis.social += 2; // People impact
            if (answer === 3) answerAnalysis.practical += 2; // Physical activity
            break;
          case '4': // Constraints
            if (answer === 0) answerAnalysis.practical += 2; // Limited time
            if (answer === 1) answerAnalysis.practical += 1; // Budget
            if (answer === 2) answerAnalysis.practical += 1; // Location
            break;
          case '5': // Deal-breakers
            if (answer === 2) answerAnalysis.practical += 2; // Prolonged study
            if (answer === 3) answerAnalysis.social -= 1; // Customer-facing
            if (answer === 4) answerAnalysis.practical += 1; // Low pay
            break;
          case '6': // Risk tolerance
            if (answer === 0 || answer === 1) answerAnalysis.practical += 2; // Low risk
            if (answer === 3 || answer === 4) answerAnalysis.analytical += 2; // High risk
            break;
          case '7': // Career priorities
            if (answer === 0) answerAnalysis.academic += 2; // Skills/credentials
            if (answer === 1) answerAnalysis.social += 1; // Role/position
            if (answer === 2) answerAnalysis.practical += 1; // Salary goals
            if (answer === 3) answerAnalysis.practical += 1; // Work-life balance
            break;
          case '8': // Experiment preferences
            if (answer === 0) answerAnalysis.practical += 2; // Job shadowing
            if (answer === 1) answerAnalysis.social += 2; // Informational interviews
            if (answer === 2) answerAnalysis.academic += 2; // Online course
            if (answer === 3) answerAnalysis.technical += 2; // Hands-on project
            if (answer === 4) answerAnalysis.social += 1; // Volunteer/trial
            break;
        }
      }
    });

    // Generate recommendations based on highest scores
    const sortedAnalysis = Object.entries(answerAnalysis)
      .sort(([,a], [,b]) => (b as number) - (a as number));

    if (sortedAnalysis[0][1] > 3) {
      const topInclination = sortedAnalysis[0][0];
      switch (topInclination) {
        case 'technical':
          recommendations.push('Engineering & Technology');
          if (sortedAnalysis[1][1] > 2 && sortedAnalysis[1][0] === 'analytical') {
            recommendations.push('Data Science & Analytics');
          }
          break;
        case 'creative':
          recommendations.push('Arts & Creative Fields');
          if (sortedAnalysis[1][1] > 2 && sortedAnalysis[1][0] === 'social') {
            recommendations.push('Media & Communication');
          }
          break;
        case 'analytical':
          recommendations.push('Research & Academia');
          if (sortedAnalysis[1][1] > 2 && sortedAnalysis[1][0] === 'technical') {
            recommendations.push('Computer Science');
          }
          break;
        case 'social':
          recommendations.push('Social Services & Psychology');
          if (sortedAnalysis[1][1] > 2 && sortedAnalysis[1][0] === 'creative') {
            recommendations.push('Education & Training');
          }
          break;
        case 'practical':
          recommendations.push('Vocational & Skill-Based');
          if (sortedAnalysis[1][1] > 2 && sortedAnalysis[1][0] === 'technical') {
            recommendations.push('Applied Sciences');
          }
          break;
        case 'academic':
          recommendations.push('Higher Education & Research');
          break;
      }
    }

    // Add secondary recommendations based on category scores
    if (categoryScores.Aptitude.avg > 3 && !recommendations.includes('Engineering & Technology')) {
      recommendations.push('Science & Mathematics');
    }
    if (categoryScores.Interest.avg > 3 && !recommendations.some(r => r.includes('Arts'))) {
      recommendations.push('Liberal Arts & Humanities');
    }
    if (categoryScores.Personality.avg > 3 && !recommendations.some(r => r.includes('Social'))) {
      recommendations.push('Healthcare & Wellness');
    }
    
    return recommendations.length > 0 ? recommendations.slice(0, 3) : ['General Academic Track'];
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Career Aptitude Assessment
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your strengths and get personalized career recommendations based on your interests, aptitude, and personality.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-hover mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Category: {currentQ.category}</span>
              </div>
            </div>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleAnswerSelect(index.toString())}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>Think carefully before answering</span>
          </div>

          <Button
            variant={isLastQuestion ? "hero" : "default"}
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="flex items-center space-x-2"
          >
            <span>{isLastQuestion ? 'Complete Quiz' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                Answer honestly based on your genuine interests and preferences. 
                There are no right or wrong answers - this assessment is designed to understand your unique profile.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}