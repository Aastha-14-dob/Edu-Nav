import Navbar from '@/components/Navbar';
import ApplicationTimeline from '@/components/ApplicationTimeline';

export default function Timeline() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ApplicationTimeline />
    </div>
  );
}