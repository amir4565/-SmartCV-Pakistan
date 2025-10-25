
import type { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: 'Muhammad Ali',
    title: 'Software Engineer',
    phone: '+92 300 1234567',
    email: 'muhammad.ali@example.com',
    address: 'Karachi, Pakistan',
    summary: 'A highly motivated Software Engineer with 2+ years of experience in developing scalable web applications using React and Node.js. Passionate about creating intuitive user experiences and solving complex problems.',
  },
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Frontend Developer',
      company: 'Tech Solutions Ltd.',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: '- Developed and maintained user interfaces for client projects using React.\n- Collaborated with designers and backend developers to implement new features.\n- Optimized application performance, resulting in a 20% reduction in load times.',
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'BS in Computer Science',
      institution: 'National University of Computer and Emerging Sciences',
      gradYear: '2021',
    },
  ],
  skills: [
    { id: 'skill1', name: 'JavaScript' },
    { id: 'skill2', name: 'React' },
    { id: 'skill3', name: 'Node.js' },
    { id: 'skill4', name: 'TypeScript' },
    { id: 'skill5', name: 'Tailwind CSS' },
  ],
};
