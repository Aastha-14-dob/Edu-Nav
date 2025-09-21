import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockScholarships } from '@/data/adminMockData';

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  type: string;
  category: string;
  amount: string;
  currency: string;
  description: string;
  eligibility: string;
  applicationProcess: string;
  requiredDocuments: string;
  applicationDeadline: string;
  announcementDate: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  isActive: boolean;
  applyLink?: string;
}

interface ScholarshipContextType {
  scholarships: Scholarship[];
  addScholarship: (scholarship: Omit<Scholarship, 'id'>) => void;
  updateScholarship: (id: string, scholarship: Partial<Scholarship>) => void;
  deleteScholarship: (id: string) => void;
  getScholarshipById: (id: string) => Scholarship | undefined;
}

const ScholarshipContext = createContext<ScholarshipContextType | undefined>(undefined);

export const useScholarship = () => {
  const context = useContext(ScholarshipContext);
  if (!context) {
    throw new Error('useScholarship must be used within a ScholarshipProvider');
  }
  return context;
};

interface ScholarshipProviderProps {
  children: ReactNode;
}

export const ScholarshipProvider: React.FC<ScholarshipProviderProps> = ({ children }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarships);

  const addScholarship = (scholarshipData: Omit<Scholarship, 'id'>) => {
    const newScholarship: Scholarship = {
      ...scholarshipData,
      id: Date.now().toString(),
      applyLink: scholarshipData.website || `https://example.com/apply-${Date.now()}`,
    };
    setScholarships(prev => [...prev, newScholarship]);
  };

  const updateScholarship = (id: string, updatedData: Partial<Scholarship>) => {
    setScholarships(prev => 
      prev.map(scholarship => 
        scholarship.id === id 
          ? { ...scholarship, ...updatedData }
          : scholarship
      )
    );
  };

  const deleteScholarship = (id: string) => {
    setScholarships(prev => prev.filter(scholarship => scholarship.id !== id));
  };

  const getScholarshipById = (id: string) => {
    return scholarships.find(scholarship => scholarship.id === id);
  };

  const value: ScholarshipContextType = {
    scholarships,
    addScholarship,
    updateScholarship,
    deleteScholarship,
    getScholarshipById,
  };

  return (
    <ScholarshipContext.Provider value={value}>
      {children}
    </ScholarshipContext.Provider>
  );
};
