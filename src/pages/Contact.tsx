import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  HeadphonesIcon,
  Globe
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We\'ll get back to you within 24 hours.',
    });
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About EduNav & Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering students and parents with data-driven insights and personalized guidance 
            to make informed educational and career decisions. Get in touch for support on your educational journey.
          </p>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To bridge the gap between student potential and career opportunities by providing 
                  accessible, personalized, and data-driven educational guidance that empowers 
                  every student to make informed decisions about their future.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A world where every student has access to quality career guidance and can 
                  confidently pursue their dreams, regardless of their background or circumstances.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-hover">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">50K+</span>
                    </div>
                    <h3 className="text-xl font-semibold">Students Guided</h3>
                  </div>
                  <p className="text-muted-foreground">Students successfully guided to their ideal career paths</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-hover">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-8 w-8 bg-success/20 rounded-full flex items-center justify-center">
                      <span className="text-success font-bold">500+</span>
                    </div>
                    <h3 className="text-xl font-semibold">Partner Colleges</h3>
                  </div>
                  <p className="text-muted-foreground">Partner colleges and educational institutions</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-hover">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-8 w-8 bg-warning/20 rounded-full flex items-center justify-center">
                      <span className="text-warning font-bold">95%</span>
                    </div>
                    <h3 className="text-xl font-semibold">Success Rate</h3>
                  </div>
                  <p className="text-muted-foreground">Student satisfaction rate with our recommendations</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us how we can help you..."
                      rows={6}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">support@edunav.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">+91 9876543210</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">
                      123 Education Hub<br />
                      New Delhi, India 110001
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">Business Hours</div>
                    <div className="text-sm text-muted-foreground">
                      Mon-Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 10:00 AM - 4:00 PM
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Live Chat Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <HeadphonesIcon className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  FAQ & Help Center
                </Button>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Counseling Sessions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a free 30-minute career counseling session with our experts.
                </p>
                <Button variant="secondary" className="w-full">
                  Book Free Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How does the aptitude test work?",
                answer: "Our comprehensive aptitude test evaluates your interests, skills, and personality traits to provide personalized career recommendations."
              },
              {
                question: "Is career counseling free?",
                answer: "Yes! We offer free 30-minute career counseling sessions with certified counselors to help you make informed decisions."
              },
              {
                question: "How accurate are the college recommendations?",
                answer: "Our recommendations are based on your profile, preferences, and real-time admission data from 500+ partner institutions."
              },
              {
                question: "Can parents access their child's progress?",
                answer: "Yes, our parent dashboard provides insights into your child's progress, applications, and personalized recommendations."
              }
            ].map((faq, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}