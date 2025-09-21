import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScholarshipProvider } from "@/contexts/ScholarshipContext";
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
import AdminAddCollege from "./pages/AdminAddCollege";
import AdminAddCollegeDetails from "./pages/AdminAddCollegeDetails";
import AdminAddCollegeCourses from "./pages/AdminAddCollegeCourses";
import AdminAddScholarship from "./pages/AdminAddScholarship";
import AdminAddScholarshipDetails from "./pages/AdminAddScholarshipDetails";
import AdminAddScholarshipTerms from "./pages/AdminAddScholarshipTerms";
import AdminViewReports from "./pages/AdminViewReports";
import AdminUserAnalyticsReport from "./pages/AdminUserAnalyticsReport";
import AdminCollegePerformanceReport from "./pages/AdminCollegePerformanceReport";
import CareerPath from "./pages/CareerPath";
import CareerRoadmap from "./pages/CareerRoadmap";
import StreamCourses from "./pages/StreamCourses";
import ROICalculator from "./pages/ROICalculator";
import CareerComparison from "./pages/CareerComparison";
import CollegeInsights from "./pages/CollegeInsights";
import CareerTrends from "./pages/CareerTrends";
import InvestmentPlanning from "./pages/InvestmentPlanning";

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
        <ScholarshipProvider>
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
              
              {/* Parent Tool Routes */}
              <Route path="/roi-calculator" element={<ROICalculator />} />
              <Route path="/compare-careers" element={<CareerComparison />} />
              <Route path="/college-insights" element={<CollegeInsights />} />
              <Route path="/career-trends" element={<CareerTrends />} />
              <Route path="/investment-planning" element={<InvestmentPlanning />} />
              
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
              
              {/* Admin Add College Routes */}
              <Route path="/admin/add-college" element={<AdminAddCollege />} />
              <Route path="/admin/add-college/details" element={<AdminAddCollegeDetails />} />
              <Route path="/admin/add-college/courses" element={<AdminAddCollegeCourses />} />
              
              {/* Admin Add Scholarship Routes */}
              <Route path="/admin/add-scholarship" element={<AdminAddScholarship />} />
              <Route path="/admin/add-scholarship/details" element={<AdminAddScholarshipDetails />} />
              <Route path="/admin/add-scholarship/terms" element={<AdminAddScholarshipTerms />} />
              
              {/* Admin Reports Routes */}
              <Route path="/admin/view-reports" element={<AdminViewReports />} />
              <Route path="/admin/reports/user-analytics" element={<AdminUserAnalyticsReport />} />
              <Route path="/admin/reports/college-performance" element={<AdminCollegePerformanceReport />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </ScholarshipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
