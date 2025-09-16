import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  MessageCircle,
  Clock,
  Lightbulb,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const suggestedQuestions = [
  "What are the best career options after 12th science?",
  "How to choose between engineering and medical?",
  "What is the scope of computer science engineering?",
  "Which entrance exams should I prepare for?",
  "What are the top colleges for commerce students?",
  "How to get scholarships for higher education?"
];

const sampleResponses: { [key: string]: string } = {
  "career options": "Based on your background, here are some excellent career options:\n\n1. **Engineering** - Computer Science, Mechanical, Electrical\n2. **Medical** - MBBS, BDS, Pharmacy\n3. **Research** - Pure Sciences, PhD programs\n4. **Technology** - Data Science, AI/ML, Software Development\n\nWould you like me to elaborate on any specific field?",
  "engineering vs medical": "Great question! Here's a comparison:\n\n**Engineering:**\n• Duration: 4 years\n• High job availability\n• Technology-focused\n• Average salary: ₹8-25 LPA\n\n**Medical:**\n• Duration: 5.5+ years\n• Social impact\n• Healthcare focus\n• Average salary: ₹10-30 LPA\n\nConsider your interests, aptitude, and long-term goals. Would you like to take our aptitude test?",
  "computer science": "Computer Science Engineering is one of the most sought-after fields!\n\n**Scope:**\n• Software Development\n• Data Science & AI\n• Cybersecurity\n• Product Management\n• Entrepreneurship\n\n**Job Market:** Excellent with 95%+ placement rates\n**Salary Range:** ₹6-50 LPA depending on skills\n\nWant to know about specific colleges or entrance exams?",
  "entrance exams": "Here are the key entrance exams you should know:\n\n**Engineering:**\n• JEE Main & Advanced\n• BITSAT\n• State CETs\n\n**Medical:**\n• NEET UG\n• AIIMS (if applicable)\n\n**General:**\n• CUET UG\n• University-specific exams\n\nNeed specific preparation tips for any exam?",
  "commerce colleges": "Top colleges for Commerce students:\n\n**Government:**\n• Delhi University (SRCC, LSR)\n• Mumbai University\n• Calcutta University\n\n**Private:**\n• Christ University\n• Symbiosis\n• Amity University\n\n**Courses:** BCom, BBA, Economics, CA, CS\n\nWant details about admission requirements?",
  "scholarships": "Here are scholarship opportunities:\n\n**Merit-based:**\n• National Merit Scholarship\n• Inspire Scholarship\n• State government scholarships\n\n**Need-based:**\n• Minority scholarships\n• EWS scholarships\n• Private foundation grants\n\n**Tips:**\n• Apply early\n• Maintain good grades\n• Prepare required documents\n\nShall I help you find specific scholarships?"
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! Welcome to FAQs. I'm here to help you with career guidance, college information, and educational planning. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const generateResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(sampleResponses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }
    
    // Default responses for common patterns
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
      return "Hello! I'm here to help you with your educational and career questions. What would you like to know?";
    }
    
    if (lowercaseMessage.includes('thank')) {
      return "You're welcome! Feel free to ask more questions. I'm here to help you succeed in your educational journey.";
    }
    
    return "That's an interesting question! While I can provide general guidance, I'd recommend:\n\n1. Speaking with a career counselor for personalized advice\n2. Taking our aptitude test for better insights\n3. Exploring our detailed course and college information\n\nIs there a specific aspect you'd like me to help you with?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col shadow-hover">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-6 w-6 text-primary" />
                  <span>FAQs</span>
                  <div className="ml-auto flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Online</span>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.sender === 'bot' && (
                              <Bot className="h-4 w-4 mt-1 text-primary" />
                            )}
                            {message.sender === 'user' && (
                              <User className="h-4 w-4 mt-1" />
                            )}
                            <div className="flex-1">
                              <div className="whitespace-pre-wrap text-sm">
                                {message.text}
                              </div>
                              <div className={`text-xs mt-1 ${
                                message.sender === 'user' 
                                  ? 'text-primary-foreground/70' 
                                  : 'text-muted-foreground'
                              }`}>
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me about careers, colleges, or courses..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Questions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-warning" />
                  <span>Suggested Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-3 text-wrap"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      <HelpCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{question}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/quiz">
                      Take Aptitude Test
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/colleges">
                      Browse Colleges
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/scholarships">
                      Find Scholarships
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/courses">
                      Explore Courses
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chat History */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>Chat History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/chatbot/history">
                    View Previous Chats
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}