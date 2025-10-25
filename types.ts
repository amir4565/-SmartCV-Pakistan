// FIX: Removed a self-import that was causing declaration conflicts. The types are defined within this file.
export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  gradYear: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export enum Language {
  English = 'English',
  Urdu = 'Urdu',
}

export interface ResumeScore {
  score: number;
  feedback: string;
  suggestions: string[];
}

export type Template = 'modern' | 'corporate' | 'creative';