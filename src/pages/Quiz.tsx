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
    const categories = {
      Aptitude: 0,
      Interest: 0,
      Personality: 0
    };

    Object.keys(allAnswers).forEach(questionId => {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        categories[question.category]++;
      }
    });

    const total = Object.values(categories).reduce((sum, count) => sum + count, 0);
    
    return {
      categories,
      total,
      percentage: Math.round((total / questions.length) * 100),
      recommendations: getRecommendations(categories)
    };
  };

  const getRecommendations = (categories: Record<string, number>) => {
    const recommendations = [];
    
    if (categories.Aptitude >= 2) {
      recommendations.push('Engineering & Technology');
    }
    if (categories.Interest >= 2) {
      recommendations.push('Arts & Creative Fields');
    }
    if (categories.Personality >= 2) {
      recommendations.push('Social Services & Psychology');
    }
    
    return recommendations.length > 0 ? recommendations : ['General Academic Track'];
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