import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="eduNav-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
