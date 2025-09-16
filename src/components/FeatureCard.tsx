import { Link, useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: boolean;
}

export default function FeatureCard({ title, description, icon: Icon, href, gradient = false }: FeatureCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      navigate('/signup');
    }
  };

  return (
    <Link to={href} className="group" onClick={handleClick}>
      <Card className={`h-full transition-all duration-300 hover:scale-105 shadow-card hover:shadow-hover cursor-pointer ${
        gradient ? 'bg-gradient-card border-primary/20' : 'bg-card hover:bg-card-hover'
      }`}>
        <CardContent className="p-6 text-center space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            gradient 
              ? 'bg-gradient-primary text-white group-hover:scale-110' 
              : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
          }`}>
            <Icon className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}