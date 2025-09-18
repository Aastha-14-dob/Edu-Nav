import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  IndianRupee, 
  Users, 
  BookOpen,
  ArrowLeft,
  Star,
  TrendingUp,
  Award,
  Target,
  CheckCircle
} from 'lucide-react';

// Import the same data structure from CourseStream
const streamData = {
  'science(maths)': {
    title: 'Science (Maths) Stream Courses',
    description: 'Explore mathematical and technical fields that drive innovation and technology',
    courses: [
      {
        id: 1,
        title: 'Computer Science & Engineering',
        slug: 'computer-science---engineering',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹8-25 LPA',
        jobRoles: ['Software Engineer', 'Data Scientist', 'DevOps Engineer'],
        description: 'Learn programming, algorithms, and software development to build the digital future.',
        detailedDescription: 'Computer Science & Engineering is a comprehensive program that combines theoretical foundations with practical applications. Students learn programming languages, data structures, algorithms, software engineering, database management, and emerging technologies like AI and machine learning.',
        rating: 4.8,
        difficulty: 'High',
        demand: 'Very High',
        subjects: ['Programming', 'Data Structures', 'Algorithms', 'Database Management', 'Software Engineering', 'Computer Networks', 'Operating Systems', 'Machine Learning'],
        skills: ['Problem Solving', 'Logical Thinking', 'Programming', 'Mathematics', 'System Design'],
        eligibility: 'Class 12 with PCM (Physics, Chemistry, Mathematics) with minimum 75% marks'
      },
      {
        id: 2,
        title: 'Mathematics',
        slug: 'mathematics',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹6-18 LPA',
        jobRoles: ['Mathematician', 'Statistician', 'Data Analyst', 'Actuary'],
        description: 'Study pure and applied mathematics, statistics, and mathematical modeling.',
        detailedDescription: 'Mathematics is the study of numbers, structures, patterns, and change. Students learn calculus, algebra, geometry, statistics, and mathematical modeling to solve complex problems in various fields.',
        rating: 4.4,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Calculus', 'Linear Algebra', 'Statistics', 'Probability', 'Number Theory', 'Differential Equations', 'Mathematical Analysis'],
        skills: ['Logical Reasoning', 'Problem Solving', 'Mathematical Modeling', 'Statistical Analysis'],
        eligibility: 'Class 12 with Mathematics with minimum 70% marks'
      },
      {
        id: 3,
        title: 'Physics',
        slug: 'physics',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹5-15 LPA',
        jobRoles: ['Physicist', 'Research Scientist', 'Physics Teacher', 'Engineer'],
        description: 'Explore the fundamental laws of nature and physical phenomena.',
        detailedDescription: 'Physics is the study of matter, energy, and their interactions. Students learn classical mechanics, thermodynamics, electromagnetism, quantum mechanics, and modern physics.',
        rating: 4.3,
        difficulty: 'High',
        demand: 'Medium',
        subjects: ['Classical Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Mechanics', 'Optics', 'Nuclear Physics', 'Mathematical Physics'],
        skills: ['Mathematical Analysis', 'Laboratory Skills', 'Problem Solving', 'Research Methods'],
        eligibility: 'Class 12 with PCM with minimum 70% marks'
      },
      {
        id: 4,
        title: 'Statistics',
        slug: 'statistics',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹6-20 LPA',
        jobRoles: ['Statistician', 'Data Scientist', 'Research Analyst', 'Risk Analyst'],
        description: 'Learn statistical methods, data analysis, and probability theory.',
        detailedDescription: 'Statistics involves collecting, analyzing, interpreting, and presenting data. Students learn probability theory, statistical inference, regression analysis, and data science techniques.',
        rating: 4.5,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Probability Theory', 'Statistical Inference', 'Regression Analysis', 'Design of Experiments', 'Multivariate Analysis', 'Time Series Analysis'],
        skills: ['Data Analysis', 'Statistical Modeling', 'Programming', 'Critical Thinking'],
        eligibility: 'Class 12 with Mathematics with minimum 70% marks'
      },
      {
        id: 5,
        title: 'Electronics & Communication',
        slug: 'electronics---communication',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹6-18 LPA',
        jobRoles: ['Electronics Engineer', 'Network Engineer', 'Hardware Designer'],
        description: 'Master electronic systems, communication technologies, and circuit design.',
        detailedDescription: 'Electronics & Communication Engineering focuses on electronic devices, circuits, communication equipment, and systems. The program covers analog and digital electronics, microprocessors, signal processing, and telecommunications.',
        rating: 4.5,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Electronic Circuits', 'Digital Electronics', 'Microprocessors', 'Signal Processing', 'Communication Systems', 'VLSI Design', 'Embedded Systems'],
        skills: ['Circuit Analysis', 'Problem Solving', 'Mathematics', 'Laboratory Skills'],
        eligibility: 'Class 12 with PCM with minimum 70% marks'
      },
      {
        id: 6,
        title: 'Mechanical Engineering',
        slug: 'mechanical-engineering',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹6-20 LPA',
        jobRoles: ['Mechanical Engineer', 'Design Engineer', 'Manufacturing Engineer'],
        description: 'Design and manufacture mechanical systems and machinery.',
        detailedDescription: 'Mechanical Engineering involves the design, analysis, and manufacturing of mechanical systems. Students learn thermodynamics, fluid mechanics, materials science, and machine design.',
        rating: 4.4,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Thermodynamics', 'Fluid Mechanics', 'Materials Science', 'Machine Design', 'Manufacturing Processes', 'Heat Transfer', 'Control Systems'],
        skills: ['Design Thinking', 'Problem Solving', 'CAD Software', 'Project Management'],
        eligibility: 'Class 12 with PCM with minimum 70% marks'
      }
    ]
  },
  'science(biology)': {
    title: 'Science (Biology) Stream Courses',
    description: 'Explore life sciences and biological research fields',
    courses: [
      {
        id: 1,
        title: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
        slug: 'mbbs',
        duration: '5.5 years',
        type: 'Professional',
        expectedPackage: '₹8-50 LPA',
        jobRoles: ['Doctor', 'Surgeon', 'Medical Specialist', 'Medical Researcher'],
        description: 'Comprehensive medical education covering human anatomy, physiology, and clinical practice.',
        detailedDescription: 'MBBS is a comprehensive medical degree program that provides students with knowledge of human anatomy, physiology, pathology, pharmacology, and clinical medicine. It includes both theoretical learning and practical clinical training.',
        rating: 4.9,
        difficulty: 'Very High',
        demand: 'Very High',
        subjects: ['Human Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Medicine', 'Surgery', 'Pediatrics', 'Gynecology'],
        skills: ['Clinical Skills', 'Diagnostic Ability', 'Patient Care', 'Medical Knowledge'],
        eligibility: 'Class 12 with PCB with minimum 50% marks and NEET qualification'
      },
      {
        id: 2,
        title: 'BDS (Bachelor of Dental Surgery)',
        slug: 'bds',
        duration: '5 years',
        type: 'Professional',
        expectedPackage: '₹6-25 LPA',
        jobRoles: ['Dentist', 'Oral Surgeon', 'Orthodontist', 'Periodontist'],
        description: 'Specialized dental education focusing on oral health and dental care.',
        detailedDescription: 'BDS focuses on dental sciences, oral health, and dental surgery. Students learn about teeth, gums, oral diseases, and various dental procedures including cosmetic and restorative dentistry.',
        rating: 4.7,
        difficulty: 'Very High',
        demand: 'High',
        subjects: ['Oral Anatomy', 'Oral Pathology', 'Periodontics', 'Orthodontics', 'Oral Surgery', 'Prosthodontics', 'Conservative Dentistry'],
        skills: ['Dental Procedures', 'Patient Care', 'Manual Dexterity', 'Diagnostic Skills'],
        eligibility: 'Class 12 with PCB with minimum 50% marks and NEET qualification'
      },
      {
        id: 3,
        title: 'B.Sc Biology',
        slug: 'bsc-biology',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-12 LPA',
        jobRoles: ['Biologist', 'Research Assistant', 'Lab Technician', 'Environmental Scientist'],
        description: 'Study of living organisms, their structure, function, and interactions.',
        detailedDescription: 'B.Sc Biology provides comprehensive knowledge of living organisms, their structure, function, growth, evolution, and distribution. Students study botany, zoology, microbiology, and genetics.',
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['Botany', 'Zoology', 'Microbiology', 'Genetics', 'Ecology', 'Cell Biology', 'Biochemistry'],
        skills: ['Laboratory Techniques', 'Research Skills', 'Observation', 'Data Analysis'],
        eligibility: 'Class 12 with PCB with minimum 50% marks'
      },
      {
        id: 4,
        title: 'B.Sc Biotechnology',
        slug: 'bsc-biotechnology',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹5-18 LPA',
        jobRoles: ['Biotechnologist', 'Research Scientist', 'Quality Analyst', 'Product Manager'],
        description: 'Application of biological processes for technological advancement.',
        detailedDescription: 'B.Sc Biotechnology combines biology with technology to develop products and processes for healthcare, agriculture, and industry. Students learn molecular biology, genetic engineering, and bioprocessing.',
        rating: 4.5,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Molecular Biology', 'Genetic Engineering', 'Bioprocessing', 'Microbiology', 'Biochemistry', 'Immunology', 'Bioinformatics'],
        skills: ['Laboratory Techniques', 'Research Skills', 'Analytical Thinking', 'Problem Solving'],
        eligibility: 'Class 12 with PCB with minimum 50% marks'
      },
      {
        id: 5,
        title: 'B.Pharm (Bachelor of Pharmacy)',
        slug: 'b-pharm',
        duration: '4 years',
        type: 'Professional',
        expectedPackage: '₹4-15 LPA',
        jobRoles: ['Pharmacist', 'Drug Inspector', 'Medical Representative', 'Clinical Researcher'],
        description: 'Study of drugs, medicines, and pharmaceutical sciences.',
        detailedDescription: 'B.Pharm focuses on the study of drugs, their composition, effects, and manufacturing. Students learn pharmaceutical chemistry, pharmacology, pharmaceutics, and clinical pharmacy.',
        rating: 4.4,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Pharmaceutical Chemistry', 'Pharmacology', 'Pharmaceutics', 'Pharmacognosy', 'Clinical Pharmacy', 'Pharmaceutical Analysis', 'Biopharmaceutics'],
        skills: ['Drug Knowledge', 'Patient Counseling', 'Laboratory Skills', 'Quality Control'],
        eligibility: 'Class 12 with PCB with minimum 50% marks'
      },
      {
        id: 6,
        title: 'B.Sc Microbiology',
        slug: 'bsc-microbiology',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-10 LPA',
        jobRoles: ['Microbiologist', 'Clinical Lab Scientist', 'Food Safety Officer', 'Research Analyst'],
        description: 'Study of microorganisms and their impact on health and environment.',
        detailedDescription: 'B.Sc Microbiology focuses on the study of microorganisms including bacteria, viruses, fungi, and parasites. Students learn about microbial physiology, genetics, and their applications in medicine and industry.',
        rating: 4.2,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['Bacteriology', 'Virology', 'Mycology', 'Immunology', 'Medical Microbiology', 'Industrial Microbiology', 'Environmental Microbiology'],
        skills: ['Laboratory Techniques', 'Microscopy', 'Aseptic Techniques', 'Data Analysis'],
        eligibility: 'Class 12 with PCB with minimum 50% marks'
      }
    ]
  },
  science: {
    title: 'Science Stream Courses',
    description: 'Explore scientific and technical fields that shape our future',
    courses: [
      {
        id: 1,
        title: 'Computer Science & Engineering',
        slug: 'computer-science---engineering',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹8-25 LPA',
        jobRoles: ['Software Engineer', 'Data Scientist', 'DevOps Engineer'],
        description: 'Learn programming, algorithms, and software development to build the digital future.',
        detailedDescription: 'Computer Science & Engineering is a comprehensive program that combines theoretical foundations with practical applications. Students learn programming languages, data structures, algorithms, software engineering, database management, and emerging technologies like AI and machine learning.',
        rating: 4.8,
        difficulty: 'High',
        demand: 'Very High',
        subjects: ['Programming', 'Data Structures', 'Algorithms', 'Database Management', 'Software Engineering', 'Computer Networks', 'Operating Systems', 'Machine Learning'],
        skills: ['Problem Solving', 'Logical Thinking', 'Programming', 'Mathematics', 'System Design'],
        eligibility: 'Class 12 with PCM (Physics, Chemistry, Mathematics) with minimum 75% marks'
      },
      {
        id: 2,
        title: 'Electronics & Communication',
        slug: 'electronics---communication',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹6-18 LPA',
        jobRoles: ['Electronics Engineer', 'Network Engineer', 'Hardware Designer'],
        description: 'Master electronic systems, communication technologies, and circuit design.',
        detailedDescription: 'Electronics & Communication Engineering focuses on electronic devices, circuits, communication equipment, and systems. The program covers analog and digital electronics, microprocessors, signal processing, and telecommunications.',
        rating: 4.5,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Electronic Circuits', 'Digital Electronics', 'Microprocessors', 'Signal Processing', 'Communication Systems', 'VLSI Design', 'Embedded Systems'],
        skills: ['Circuit Analysis', 'Problem Solving', 'Mathematics', 'Laboratory Skills'],
        eligibility: 'Class 12 with PCM with minimum 70% marks'
      },
      {
        id: 3,
        title: 'Biotechnology',
        slug: 'biotechnology',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹5-15 LPA',
        jobRoles: ['Biotechnologist', 'Research Scientist', 'Quality Analyst'],
        description: 'Combine biology with technology to solve real-world problems.',
        detailedDescription: 'Biotechnology integrates biological sciences with engineering principles to develop solutions for healthcare, agriculture, environment, and industry. Students study molecular biology, genetics, bioprocessing, and biotechnological applications.',
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['Molecular Biology', 'Genetics', 'Biochemistry', 'Bioprocessing', 'Microbiology', 'Cell Biology', 'Bioinformatics'],
        skills: ['Laboratory Techniques', 'Research Skills', 'Analytical Thinking', 'Biology Knowledge'],
        eligibility: 'Class 12 with PCB (Physics, Chemistry, Biology) with minimum 65% marks'
      },
      {
        id: 4,
        title: 'Mechanical Engineering',
        slug: 'mechanical-engineering',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹6-20 LPA',
        jobRoles: ['Mechanical Engineer', 'Design Engineer', 'Manufacturing Engineer'],
        description: 'Design and manufacture mechanical systems and machinery.',
        detailedDescription: 'Mechanical Engineering involves the design, analysis, and manufacturing of mechanical systems. Students learn thermodynamics, fluid mechanics, materials science, and machine design.',
        rating: 4.4,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Thermodynamics', 'Fluid Mechanics', 'Materials Science', 'Machine Design', 'Manufacturing Processes', 'Heat Transfer', 'Control Systems'],
        skills: ['Design Thinking', 'Problem Solving', 'CAD Software', 'Project Management'],
        eligibility: 'Class 12 with PCM with minimum 70% marks'
      },
      {
        id: 5,
        title: 'Civil Engineering',
        slug: 'civil-engineering',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹5-16 LPA',
        jobRoles: ['Civil Engineer', 'Structural Engineer', 'Construction Manager'],
        description: 'Plan, design, and construct infrastructure projects.',
        detailedDescription: 'Civil Engineering involves the planning, design, construction, and maintenance of infrastructure projects including buildings, roads, bridges, and water systems.',
        rating: 4.3,
        difficulty: 'High',
        demand: 'Medium',
        subjects: ['Structural Engineering', 'Geotechnical Engineering', 'Transportation Engineering', 'Water Resources', 'Environmental Engineering', 'Construction Management'],
        skills: ['Project Management', 'Design Skills', 'Problem Solving', 'Technical Drawing'],
        eligibility: 'Class 12 with PCM with minimum 70% marks'
      },
      {
        id: 6,
        title: 'Aerospace Engineering',
        slug: 'aerospace-engineering',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹8-30 LPA',
        jobRoles: ['Aerospace Engineer', 'Aircraft Designer', 'Flight Test Engineer'],
        description: 'Design and develop aircraft and spacecraft systems.',
        detailedDescription: 'Aerospace Engineering focuses on the design, development, and testing of aircraft and spacecraft. Students learn aerodynamics, propulsion systems, and flight mechanics.',
        rating: 4.6,
        difficulty: 'Very High',
        demand: 'High',
        subjects: ['Aerodynamics', 'Propulsion Systems', 'Flight Mechanics', 'Aircraft Structures', 'Space Technology', 'Control Systems', 'Materials Science'],
        skills: ['Mathematical Modeling', 'Problem Solving', 'Design Skills', 'Technical Analysis'],
        eligibility: 'Class 12 with PCM with minimum 75% marks'
      }
    ]
  },
  commerce: {
    title: 'Commerce Stream Courses',
    description: 'Build expertise in business, finance, and entrepreneurship',
    courses: [
      {
        id: 1,
        title: 'Bachelor of Commerce (B.Com)',
        slug: 'bachelor-of-commerce-(b.com)',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-12 LPA',
        jobRoles: ['Accountant', 'Financial Analyst', 'Tax Consultant'],
        description: 'Comprehensive business education covering accounting, finance, and economics.',
        detailedDescription: 'Bachelor of Commerce provides foundational knowledge in business, accounting, finance, and economics. Students learn financial reporting, taxation, business law, and management principles preparing them for various business roles.',
        rating: 4.2,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['Accounting', 'Business Economics', 'Business Law', 'Taxation', 'Financial Management', 'Marketing', 'Statistics'],
        skills: ['Numerical Ability', 'Analytical Skills', 'Communication', 'Business Acumen'],
        eligibility: 'Class 12 in any stream with minimum 50% marks'
      },
      {
        id: 2,
        title: 'Bachelor of Business Administration (BBA)',
        slug: 'bachelor-of-business-administration-(bba)',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹5-15 LPA',
        jobRoles: ['Business Manager', 'Marketing Executive', 'HR Specialist'],
        description: 'Develop leadership and management skills for the corporate world.',
        detailedDescription: 'BBA focuses on developing managerial and leadership skills. The program covers all aspects of business management including human resources, marketing, finance, operations, and strategic management.',
        rating: 4.4,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['Management Principles', 'Marketing', 'Human Resource Management', 'Finance', 'Operations Management', 'Business Ethics', 'Organizational Behavior'],
        skills: ['Leadership', 'Communication', 'Strategic Thinking', 'Team Management'],
        eligibility: 'Class 12 in any stream with minimum 50% marks'
      },
      {
        id: 3,
        title: 'Chartered Accountancy (CA)',
        slug: 'chartered-accountancy-(ca)',
        duration: '3-5 years',
        type: 'Professional',
        expectedPackage: '₹8-25 LPA',
        jobRoles: ['Chartered Accountant', 'Financial Advisor', 'Audit Manager'],
        description: 'Prestigious professional course in accounting, taxation, and auditing.',
        detailedDescription: 'Chartered Accountancy is a professional qualification in accounting and finance. The course covers advanced accounting, auditing, taxation, financial management, and business advisory services.',
        rating: 4.7,
        difficulty: 'Very High',
        demand: 'Very High',
        subjects: ['Advanced Accounting', 'Auditing', 'Taxation', 'Financial Management', 'Corporate Law', 'Cost Accounting', 'Management Accounting'],
        skills: ['Analytical Skills', 'Attention to Detail', 'Mathematical Ability', 'Ethics'],
        eligibility: 'Class 12 with minimum 55% marks (50% for reserved categories)'
      },
      {
        id: 4,
        title: 'Company Secretary (CS)',
        slug: 'company-secretary-(cs)',
        duration: '3-4 years',
        type: 'Professional',
        expectedPackage: '₹6-20 LPA',
        jobRoles: ['Company Secretary', 'Compliance Officer', 'Corporate Governance Specialist'],
        description: 'Professional course in corporate law, governance, and compliance.',
        detailedDescription: 'Company Secretary is a professional course that focuses on corporate law, governance, and compliance. Students learn about company law, securities law, and corporate governance practices.',
        rating: 4.5,
        difficulty: 'Very High',
        demand: 'High',
        subjects: ['Company Law', 'Securities Law', 'Corporate Governance', 'Taxation', 'Economic and Commercial Laws', 'Financial Management', 'Cost and Management Accounting'],
        skills: ['Legal Knowledge', 'Compliance Management', 'Corporate Governance', 'Communication'],
        eligibility: 'Class 12 with minimum 50% marks'
      },
      {
        id: 5,
        title: 'Bachelor of Economics',
        slug: 'bachelor-of-economics',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹5-18 LPA',
        jobRoles: ['Economist', 'Policy Analyst', 'Research Associate'],
        description: 'Study economic theory, policy, and quantitative analysis.',
        detailedDescription: 'Bachelor of Economics provides comprehensive knowledge of economic theory, policy analysis, and quantitative methods. Students learn microeconomics, macroeconomics, econometrics, and economic policy.',
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['Microeconomics', 'Macroeconomics', 'Econometrics', 'Economic Policy', 'International Economics', 'Development Economics', 'Mathematical Economics'],
        skills: ['Economic Analysis', 'Quantitative Skills', 'Research Methods', 'Policy Analysis'],
        eligibility: 'Class 12 with Mathematics with minimum 50% marks'
      },
      {
        id: 6,
        title: 'Cost and Management Accountant (CMA)',
        slug: 'cost-and-management-accountant-(cma)',
        duration: '3-4 years',
        type: 'Professional',
        expectedPackage: '₹7-22 LPA',
        jobRoles: ['Cost Accountant', 'Management Accountant', 'Financial Controller'],
        description: 'Professional course in cost accounting and management accounting.',
        detailedDescription: 'CMA is a professional qualification in cost and management accounting. The course covers cost accounting, management accounting, financial management, and strategic management.',
        rating: 4.6,
        difficulty: 'Very High',
        demand: 'High',
        subjects: ['Cost Accounting', 'Management Accounting', 'Financial Management', 'Strategic Management', 'Taxation', 'Auditing', 'Corporate Law'],
        skills: ['Cost Analysis', 'Management Skills', 'Financial Planning', 'Strategic Thinking'],
        eligibility: 'Class 12 with minimum 50% marks'
      }
    ]
  },
  arts: {
    title: 'Arts & Humanities Courses',
    description: 'Explore creativity, culture, and human expression',
    courses: [
      {
        id: 1,
        title: 'Bachelor of Arts (English)',
        slug: 'bachelor-of-arts-(english)',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹3-10 LPA',
        jobRoles: ['Content Writer', 'Journalist', 'English Teacher'],
        description: 'Develop strong communication and analytical skills through literature study.',
        detailedDescription: 'BA English focuses on English literature, language, and communication skills. Students study various literary works, develop critical thinking, and enhance their writing and speaking abilities.',
        rating: 4.1,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['English Literature', 'Grammar & Composition', 'Literary Criticism', 'Creative Writing', 'Linguistics', 'Poetry', 'Drama'],
        skills: ['Communication', 'Critical Thinking', 'Writing', 'Reading Comprehension'],
        eligibility: 'Class 12 in any stream with minimum 45% marks'
      },
      {
        id: 2,
        title: 'Mass Communication & Journalism',
        slug: 'mass-communication---journalism',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-15 LPA',
        jobRoles: ['Journalist', 'PR Executive', 'Media Producer'],
        description: 'Learn media production, journalism, and communication strategies.',
        detailedDescription: 'Mass Communication & Journalism covers various aspects of media including print, electronic, and digital media. Students learn news reporting, media production, public relations, and communication theory.',
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['Journalism', 'Mass Media', 'Public Relations', 'Advertising', 'Film Studies', 'Digital Media', 'Communication Theory'],
        skills: ['Communication', 'Research', 'Writing', 'Technology Skills'],
        eligibility: 'Class 12 in any stream with minimum 50% marks'
      },
      {
        id: 3,
        title: 'Psychology',
        slug: 'psychology',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-12 LPA',
        jobRoles: ['Counselor', 'HR Specialist', 'Clinical Psychologist'],
        description: 'Understand human behavior and mental processes.',
        detailedDescription: 'Psychology is the scientific study of mind and behavior. Students learn about cognitive processes, personality, abnormal psychology, social psychology, and research methods in psychology.',
        rating: 4.4,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['General Psychology', 'Cognitive Psychology', 'Social Psychology', 'Abnormal Psychology', 'Research Methods', 'Statistics', 'Counseling Psychology'],
        skills: ['Empathy', 'Observation', 'Research Skills', 'Communication'],
        eligibility: 'Class 12 in any stream with minimum 50% marks'
      },
      {
        id: 4,
        title: 'Bachelor of Fine Arts (BFA)',
        slug: 'bachelor-of-fine-arts-(bfa)',
        duration: '4 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹3-12 LPA',
        jobRoles: ['Artist', 'Graphic Designer', 'Art Teacher'],
        description: 'Develop artistic skills and creative expression in various media.',
        detailedDescription: 'BFA focuses on developing artistic skills and creative expression through various media including painting, sculpture, digital art, and design. Students learn art history, techniques, and contemporary art practices.',
        rating: 4.2,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['Drawing', 'Painting', 'Sculpture', 'Digital Art', 'Art History', 'Color Theory', 'Design Principles'],
        skills: ['Creativity', 'Visual Communication', 'Technical Skills', 'Artistic Expression'],
        eligibility: 'Class 12 in any stream with minimum 45% marks'
      },
      {
        id: 5,
        title: 'Bachelor of Social Work (BSW)',
        slug: 'bachelor-of-social-work-(bsw)',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹3-8 LPA',
        jobRoles: ['Social Worker', 'Community Organizer', 'Counselor'],
        description: 'Learn to help individuals and communities overcome social challenges.',
        detailedDescription: 'BSW prepares students to work with individuals, families, and communities to address social problems and improve quality of life. Students learn social work methods, community development, and social policy.',
        rating: 4.0,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['Social Work Methods', 'Community Development', 'Social Policy', 'Human Behavior', 'Social Research', 'Social Welfare', 'Counseling'],
        skills: ['Empathy', 'Communication', 'Problem Solving', 'Community Engagement'],
        eligibility: 'Class 12 in any stream with minimum 45% marks'
      },
      {
        id: 6,
        title: 'Bachelor of Education (B.Ed)',
        slug: 'bachelor-of-education-(b-ed)',
        duration: '2 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹3-10 LPA',
        jobRoles: ['Teacher', 'Educational Counselor', 'Curriculum Developer'],
        description: 'Prepare for a career in teaching and educational administration.',
        detailedDescription: 'B.Ed is a professional degree that prepares students for teaching careers. Students learn educational psychology, teaching methods, curriculum development, and classroom management.',
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['Educational Psychology', 'Teaching Methods', 'Curriculum Development', 'Classroom Management', 'Educational Technology', 'Assessment', 'Educational Philosophy'],
        skills: ['Teaching', 'Communication', 'Classroom Management', 'Educational Planning'],
        eligibility: 'Graduation in any stream with minimum 50% marks'
      }
    ]
  },
  biology: {
    title: 'Biology Stream Courses',
    description: 'Explore life sciences and biological research fields',
    courses: [
      {
        id: 1,
        title: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
        slug: 'mbbs',
        duration: '5.5 years',
        type: 'Professional',
        expectedPackage: '₹8-50 LPA',
        jobRoles: ['Doctor', 'Surgeon', 'Medical Specialist', 'Medical Researcher'],
        description: 'Comprehensive medical education covering human anatomy, physiology, and clinical practice.',
        detailedDescription: 'MBBS is a comprehensive medical degree program that provides students with knowledge of human anatomy, physiology, pathology, pharmacology, and clinical medicine. It includes both theoretical learning and practical clinical training.',
        rating: 4.9,
        difficulty: 'Very High',
        demand: 'Very High',
        subjects: ['Human Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Medicine', 'Surgery', 'Pediatrics', 'Gynecology'],
        skills: ['Clinical Skills', 'Diagnostic Ability', 'Patient Care', 'Medical Knowledge'],
        eligibility: 'Class 12 with PCB with minimum 50% marks and NEET qualification'
      },
      {
        id: 2,
        title: 'BDS (Bachelor of Dental Surgery)',
        slug: 'bds',
        duration: '5 years',
        type: 'Professional',
        expectedPackage: '₹6-25 LPA',
        jobRoles: ['Dentist', 'Oral Surgeon', 'Orthodontist', 'Periodontist'],
        description: 'Specialized dental education focusing on oral health and dental care.',
        detailedDescription: 'BDS focuses on dental sciences, oral health, and dental surgery. Students learn about teeth, gums, oral diseases, and various dental procedures including cosmetic and restorative dentistry.',
        rating: 4.7,
        difficulty: 'Very High',
        demand: 'High',
        subjects: ['Oral Anatomy', 'Oral Pathology', 'Periodontics', 'Orthodontics', 'Oral Surgery', 'Prosthodontics', 'Conservative Dentistry'],
        skills: ['Dental Procedures', 'Patient Care', 'Manual Dexterity', 'Diagnostic Skills'],
        eligibility: 'Class 12 with PCB with minimum 50% marks and NEET qualification'
      },
      {
        id: 3,
        title: 'B.Sc Biology',
        slug: 'bsc-biology',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-12 LPA',
        jobRoles: ['Biologist', 'Research Assistant', 'Lab Technician', 'Environmental Scientist'],
        description: 'Study of living organisms, their structure, function, and interactions.',
        detailedDescription: 'B.Sc Biology provides comprehensive knowledge of living organisms, their structure, function, growth, evolution, and distribution. Students study botany, zoology, microbiology, and genetics.',
        rating: 4.3,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['Botany', 'Zoology', 'Microbiology', 'Genetics', 'Ecology', 'Cell Biology', 'Biochemistry'],
        skills: ['Laboratory Techniques', 'Research Skills', 'Observation', 'Data Analysis'],
        eligibility: 'Class 12 with PCB with minimum 50% marks'
      },
      {
        id: 4,
        title: 'B.Sc Biotechnology',
        slug: 'bsc-biotechnology',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹5-18 LPA',
        jobRoles: ['Biotechnologist', 'Research Scientist', 'Quality Analyst', 'Product Manager'],
        description: 'Application of biological processes for technological advancement.',
        detailedDescription: 'B.Sc Biotechnology combines biology with technology to develop products and processes for healthcare, agriculture, and industry. Students learn molecular biology, genetic engineering, and bioprocessing.',
        rating: 4.5,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Molecular Biology', 'Genetic Engineering', 'Bioprocessing', 'Microbiology', 'Biochemistry', 'Immunology', 'Bioinformatics'],
        skills: ['Laboratory Techniques', 'Research Skills', 'Analytical Thinking', 'Problem Solving'],
        eligibility: 'Class 12 with PCB with minimum 50% marks'
      },
      {
        id: 5,
        title: 'B.Pharm (Bachelor of Pharmacy)',
        slug: 'b-pharm',
        duration: '4 years',
        type: 'Professional',
        expectedPackage: '₹4-15 LPA',
        jobRoles: ['Pharmacist', 'Drug Inspector', 'Medical Representative', 'Clinical Researcher'],
        description: 'Study of drugs, medicines, and pharmaceutical sciences.',
        detailedDescription: 'B.Pharm focuses on the study of drugs, their composition, effects, and manufacturing. Students learn pharmaceutical chemistry, pharmacology, pharmaceutics, and clinical pharmacy.',
        rating: 4.4,
        difficulty: 'High',
        demand: 'High',
        subjects: ['Pharmaceutical Chemistry', 'Pharmacology', 'Pharmaceutics', 'Pharmacognosy', 'Clinical Pharmacy', 'Pharmaceutical Analysis', 'Biopharmaceutics'],
        skills: ['Drug Knowledge', 'Patient Counseling', 'Laboratory Skills', 'Quality Control'],
        eligibility: 'Class 12 with PCB with minimum 50% marks'
      },
      {
        id: 6,
        title: 'B.Sc Microbiology',
        slug: 'bsc-microbiology',
        duration: '3 years',
        type: 'Bachelor\'s',
        expectedPackage: '₹4-10 LPA',
        jobRoles: ['Microbiologist', 'Clinical Lab Scientist', 'Food Safety Officer', 'Research Analyst'],
        description: 'Study of microorganisms and their impact on health and environment.',
        detailedDescription: 'B.Sc Microbiology focuses on the study of microorganisms including bacteria, viruses, fungi, and parasites. Students learn about microbial physiology, genetics, and their applications in medicine and industry.',
        rating: 4.2,
        difficulty: 'Medium',
        demand: 'Medium',
        subjects: ['Bacteriology', 'Virology', 'Mycology', 'Immunology', 'Medical Microbiology', 'Industrial Microbiology', 'Environmental Microbiology'],
        skills: ['Laboratory Techniques', 'Microscopy', 'Aseptic Techniques', 'Data Analysis'],
        eligibility: 'Class 12 with PCB with minimum 50% marks'
      }
    ]
  },
  vocational: {
    title: 'Vocational & Skill-Based Courses',
    description: 'Practical skills training for immediate career entry',
    courses: [
      {
        id: 1,
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        duration: '6 months - 1 year',
        type: 'Certificate',
        expectedPackage: '₹3-12 LPA',
        jobRoles: ['Digital Marketer', 'SEO Specialist', 'Social Media Manager'],
        description: 'Master online marketing strategies and digital tools.',
        detailedDescription: 'Digital Marketing covers various online marketing strategies including SEO, social media marketing, content marketing, email marketing, and paid advertising. Students learn to use digital tools and analytics.',
        rating: 4.5,
        difficulty: 'Low',
        demand: 'Very High',
        subjects: ['SEO/SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Google Analytics', 'PPC Advertising', 'Digital Strategy'],
        skills: ['Creativity', 'Analytical Thinking', 'Technology Skills', 'Communication'],
        eligibility: 'Class 12 in any stream'
      },
      {
        id: 2,
        title: 'Web Development',
        slug: 'web-development',
        duration: '6 months - 2 years',
        type: 'Certificate/Diploma',
        expectedPackage: '₹4-15 LPA',
        jobRoles: ['Web Developer', 'Frontend Developer', 'Full Stack Developer'],
        description: 'Build websites and web applications using modern technologies.',
        detailedDescription: 'Web Development teaches students to create websites and web applications using various programming languages and frameworks. Students learn both frontend and backend development.',
        rating: 4.6,
        difficulty: 'Medium',
        demand: 'Very High',
        subjects: ['HTML/CSS', 'JavaScript', 'React/Angular', 'Node.js', 'Database Management', 'API Development', 'Version Control'],
        skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Creativity'],
        eligibility: 'Class 12 in any stream'
      },
      {
        id: 3,
        title: 'Graphic Design',
        slug: 'graphic-design',
        duration: '6 months - 1 year',
        type: 'Certificate',
        expectedPackage: '₹3-10 LPA',
        jobRoles: ['Graphic Designer', 'UI Designer', 'Brand Designer'],
        description: 'Create visual content for print and digital media.',
        detailedDescription: 'Graphic Design teaches visual communication through typography, color theory, layout design, and digital tools. Students learn to create designs for various media and purposes.',
        rating: 4.2,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['Design Principles', 'Typography', 'Color Theory', 'Adobe Creative Suite', 'Branding', 'Digital Illustration', 'UI/UX Design'],
        skills: ['Creativity', 'Attention to Detail', 'Software Skills', 'Visual Thinking'],
        eligibility: 'Class 12 in any stream'
      },
      {
        id: 4,
        title: 'Data Analytics',
        slug: 'data-analytics',
        duration: '6 months - 1 year',
        type: 'Certificate',
        expectedPackage: '₹5-18 LPA',
        jobRoles: ['Data Analyst', 'Business Analyst', 'Data Scientist'],
        description: 'Analyze data to drive business decisions and insights.',
        detailedDescription: 'Data Analytics teaches students to collect, process, and analyze data to extract meaningful insights. Students learn statistical analysis, data visualization, and business intelligence tools.',
        rating: 4.7,
        difficulty: 'Medium',
        demand: 'Very High',
        subjects: ['Statistics', 'Data Visualization', 'SQL', 'Python/R', 'Machine Learning', 'Business Intelligence', 'Excel Advanced'],
        skills: ['Analytical Thinking', 'Statistical Analysis', 'Programming', 'Problem Solving'],
        eligibility: 'Class 12 with Mathematics'
      },
      {
        id: 5,
        title: 'Cybersecurity',
        slug: 'cybersecurity',
        duration: '1-2 years',
        type: 'Certificate/Diploma',
        expectedPackage: '₹6-20 LPA',
        jobRoles: ['Cybersecurity Analyst', 'Security Engineer', 'Penetration Tester'],
        description: 'Protect digital systems and data from cyber threats.',
        detailedDescription: 'Cybersecurity focuses on protecting digital systems, networks, and data from cyber threats. Students learn about security protocols, ethical hacking, and risk management.',
        rating: 4.8,
        difficulty: 'High',
        demand: 'Very High',
        subjects: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Risk Management', 'Incident Response', 'Security Auditing', 'Compliance'],
        skills: ['Problem Solving', 'Technical Skills', 'Attention to Detail', 'Risk Assessment'],
        eligibility: 'Class 12 with Mathematics'
      },
      {
        id: 6,
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        duration: '6 months - 1 year',
        type: 'Certificate',
        expectedPackage: '₹4-15 LPA',
        jobRoles: ['UI Designer', 'UX Designer', 'Product Designer'],
        description: 'Design user interfaces and experiences for digital products.',
        detailedDescription: 'UI/UX Design focuses on creating user-friendly and visually appealing digital interfaces. Students learn user research, wireframing, prototyping, and design tools.',
        rating: 4.6,
        difficulty: 'Medium',
        demand: 'High',
        subjects: ['User Research', 'Wireframing', 'Prototyping', 'Figma/Adobe XD', 'Design Systems', 'Usability Testing', 'Interaction Design'],
        skills: ['Creativity', 'User Empathy', 'Design Thinking', 'Technical Skills'],
        eligibility: 'Class 12 in any stream'
      }
    ]
  }
};

export default function CourseDetails() {
  const { stream, courseId } = useParams<{ stream: string; courseId: string }>();
  
  if (!stream || !courseId || !streamData[stream as keyof typeof streamData]) {
    return <Navigate to="/courses" replace />;
  }

  const data = streamData[stream as keyof typeof streamData];
  const course = data.courses.find(c => c.slug === courseId);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested course does not exist or is not available.</p>
          <Button asChild variant="outline">
            <Link to={`/courses/${stream}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {data.title}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Very High': return 'text-destructive';
      case 'High': return 'text-warning';
      case 'Medium': return 'text-primary';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-success';
      case 'High': return 'text-primary';
      case 'Medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link to={`/courses/${stream}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {data.title}
            </Link>
          </Button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="outline" className="text-sm">{course.type}</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-warning fill-warning" />
                  <span className="text-lg font-medium">{course.rating}</span>
                </div>
              </div>
              <p className="text-xl text-muted-foreground mb-6">
                {course.detailedDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{course.duration}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <IndianRupee className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{course.expectedPackage}</div>
              <div className="text-sm text-muted-foreground">Expected Package</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className={`text-lg font-bold ${getDifficultyColor(course.difficulty)}`}>{course.difficulty}</div>
              <div className="text-sm text-muted-foreground">Difficulty</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className={`text-lg font-bold ${getDemandColor(course.demand)}`}>{course.demand}</div>
              <div className="text-sm text-muted-foreground">Market Demand</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subjects */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Subjects Covered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">{subject}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Skills You'll Develop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Career Opportunities */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Career Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.jobRoles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{role}</span>
                      <Badge variant="outline">In Demand</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Eligibility */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{course.eligibility}</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-card">
              <CardContent className="p-6 space-y-4">
                <Button asChild className="w-full" size="lg">
                  <Link to="/colleges">
                    Find Colleges Offering This Course
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/scholarships">
                    View Scholarships
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/quiz">
                    Take Career Assessment
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