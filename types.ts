
export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: number;
  basics: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedIn: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  certifications: string[];
  languages: string[];
  achievements: string[];
  hobbies: string[];
  settings: {
    template: string;
    primaryColor: string;
    fontFamily: string;
    fontSize: number;
    spacing: number;
    lineHeight: number;
  };
}

export type ResumeSection = 'basics' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'achievements' | 'hobbies';
