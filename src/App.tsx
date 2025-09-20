import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import Colleges from "./pages/Colleges";
import Scholarships from "./pages/Scholarships";
import Admissions from "./pages/Admissions";
import Courses from "./pages/Courses";
import Chatbot from "./pages/Chatbot";
import Contact from "./pages/Contact";
import Recommendations from "./pages/Recommendations";
import RealityChecker from "./pages/RealityChecker";
import Careers from "./pages/Careers";
import Explore from "./pages/Explore";
import QuizResults from "./pages/QuizResults";
import CourseStream from "./pages/CourseStream";
import CollegeDetails from "./pages/CollegeDetails";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import ScholarshipHistory from "./pages/ScholarshipHistory";
import ScholarshipDatabase from "./pages/ScholarshipDatabase";
import Timeline from "./pages/Timeline";
import AdmissionDetails from "./pages/AdmissionDetails";
import CollegeCourses from "./pages/CollegeCourses";
import CourseDetails from "./pages/CourseDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminParents from "./pages/AdminParents";
import AdminColleges from "./pages/AdminColleges";
import AdminScholarships from "./pages/AdminScholarships";
import AdminQuizzes from "./pages/AdminQuizzes";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminSettings from "./pages/AdminSettings";
import AdminAdmins from "./pages/AdminAdmins";

const queryClient = new QueryClient();

function ScrollAnimator() {
  const location = useLocation();
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-animate]')) as HTMLElement[];
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('in-view');
            // Stagger support for children
            const staggerAttr = (entry.target as HTMLElement).getAttribute('data-stagger');
            const stagger = staggerAttr ? parseInt(staggerAttr, 10) : 0;
            if (stagger > 0) {
              const children = Array.from((entry.target as HTMLElement).querySelectorAll('[data-animate-child]')) as HTMLElement[];
              children.forEach((child, idx) => {
                child.style.setProperty('--delay', `${idx * stagger}ms`);
                child.classList.add('in-view');
              });
            }
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="eduNav-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollAnimator />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/parent-dashboard" element={<ParentDashboard />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/scholarship-database" element={<ScholarshipDatabase />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/reality-checker" element={<RealityChecker />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/quiz/results" element={<QuizResults />} />
              <Route path="/courses/:stream" element={<CourseStream />} />
              <Route path="/courses/:stream/:courseId" element={<CourseDetails />} />
              <Route path="/colleges/:id" element={<CollegeDetails />} />
              <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
              <Route path="/scholarships/history" element={<ScholarshipHistory />} />
              <Route path="/admissions/:id" element={<AdmissionDetails />} />
              <Route path="/colleges/:id/courses" element={<CollegeCourses />} />
              
              {/* Career Recommendation Routes */}
              <Route path="/recommendations/:careerName" element={<CareerPath />} />
              <Route path="/recommendations/:careerName/path" element={<CareerRoadmap />} />
              <Route path="/courses/:stream" element={<StreamCourses />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/parents" element={<AdminParents />} />
              <Route path="/admin/colleges" element={<AdminColleges />} />
              <Route path="/admin/scholarships" element={<AdminScholarships />} />
              <Route path="/admin/quizzes" element={<AdminQuizzes />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/settings/admins" element={<AdminAdmins />} />
              
              {/* Admin Quick Action Routes */}
              <Route path="/admin/add-student" element={<AdminAddStudent />} />
              <Route path="/admin/add-college" element={<AdminAddCollege />} />
              <Route path="/admin/add-scholarship" element={<AdminAddScholarship />} />
              <Route path="/admin/view-reports" element={<AdminViewReports />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
