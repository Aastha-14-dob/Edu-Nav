import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Check, X, Eye } from 'lucide-react';
import { mockTestimonials } from '@/data/adminMockData';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState(mockTestimonials);

  const handleApprove = (id: string) => {
    setTestimonials(prev => 
      prev.map(t => t.id === id ? { ...t, status: 'approved' } : t)
    );
  };

  const handleReject = (id: string) => {
    setTestimonials(prev => 
      prev.map(t => t.id === id ? { ...t, status: 'rejected' } : t)
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  const pendingCount = testimonials.filter(t => t.status === 'pending').length;
  const approvedCount = testimonials.filter(t => t.status === 'approved').length;
  const rejectedCount = testimonials.filter(t => t.status === 'rejected').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Testimonials Management</h1>
          <p className="text-muted-foreground">Review and manage student testimonials</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting moderation</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Published testimonials</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <X className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Not approved for publishing</p>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials List */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Student Testimonials</CardTitle>
          <CardDescription>Review and moderate testimonials from students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold">{testimonial.studentName}</h3>
                      <div className="flex items-center space-x-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Submitted on {new Date(testimonial.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      testimonial.status === 'approved' ? 'default' : 
                      testimonial.status === 'rejected' ? 'destructive' : 
                      'secondary'
                    }
                  >
                    {testimonial.status}
                  </Badge>
                </div>

                <blockquote className="text-foreground bg-muted/50 p-4 rounded border-l-4 border-primary">
                  "{testimonial.comment}"
                </blockquote>

                {testimonial.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleApprove(testimonial.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleReject(testimonial.id)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}