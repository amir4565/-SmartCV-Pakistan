import React, { useState } from 'react';
import type { ResumeData, Experience, Education, Skill } from '../types';
import { generateDescription, generateSummary } from '../services/geminiService';
import { BrainCircuitIcon } from './icons';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
  const [loadingExp, setLoadingExp] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handleExperienceChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [name]: value } : exp),
    }));
  };

  const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [name]: value } : edu),
    }));
  };
  
  const handleSkillChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => skill.id === id ? { ...skill, [name]: value } : skill),
    }));
  };

  const addExperience = () => {
    const newExp: Experience = { id: `exp${Date.now()}`, jobTitle: '', company: '', startDate: '', endDate: '', description: '' };
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const addEducation = () => {
    const newEdu: Education = { id: `edu${Date.now()}`, degree: '', institution: '', gradYear: '' };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };
  
  const addSkill = () => {
    const newSkill: Skill = { id: `skill${Date.now()}`, name: '' };
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const removeExperience = (id: string) => setResumeData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  const removeEducation = (id: string) => setResumeData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  const removeSkill = (id: string) => setResumeData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill.id !== id) }));

  const handleAIDescription = async (exp: Experience) => {
    if (!exp.jobTitle || !exp.company) {
      alert("Please enter Job Title and Company first.");
      return;
    }
    setLoadingExp(exp.id);
    const desc = await generateDescription(exp.jobTitle, exp.company);
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === exp.id ? { ...e, description: desc } : e),
    }));
    setLoadingExp(null);
  };

  const handleAISummary = async () => {
    setIsSummaryLoading(true);
    const summary = await generateSummary(resumeData);
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, summary: summary },
    }));
    setIsSummaryLoading(false);
  };

  const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
  
  const Input: React.FC<{ label: string, name: string, value: string, onChange: any, placeholder?: string, type?: string }> = ({ label, name, value, onChange, placeholder, type = 'text' }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 transition" />
    </div>
  );
  
  const Textarea: React.FC<{ label: string, name: string, value: string, onChange: any, placeholder?: string, rows?: number }> = ({ label, name, value, onChange, placeholder, rows = 4 }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 transition" />
    </div>
  );

  return (
    <div className="space-y-6">
      <FormSection title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" name="name" value={resumeData.personalInfo.name} onChange={handlePersonalInfoChange} />
          <Input label="Job Title" name="title" value={resumeData.personalInfo.title} onChange={handlePersonalInfoChange} />
          <Input label="Phone" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} />
          <Input label="Email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} type="email" />
        </div>
        <Input label="Address" name="address" value={resumeData.personalInfo.address} onChange={handlePersonalInfoChange} />
        <div>
          <Textarea label="Professional Summary" name="summary" value={resumeData.personalInfo.summary} onChange={handlePersonalInfoChange} />
          <button 
            onClick={handleAISummary} 
            disabled={isSummaryLoading} 
            className="flex items-center gap-2 text-sm bg-gray-200 text-gray-800 font-semibold py-1 px-3 rounded-full hover:bg-gray-300 transition disabled:opacity-50 mt-2"
          >
            <BrainCircuitIcon className="w-4 h-4 text-green-600"/>
            {isSummaryLoading ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>
      </FormSection>

      <FormSection title="Work Experience">
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="p-4 border rounded-md space-y-4 relative">
             <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(exp.id, e)} />
              <Input label="Company" name="company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, e)} />
              <Input label="Start Date" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, e)} />
              <Input label="End Date" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, e)} />
            </div>
            <Textarea label="Description" name="description" value={exp.description} onChange={(e) => handleExperienceChange(exp.id, e)} rows={5} />
            <button onClick={() => handleAIDescription(exp)} disabled={loadingExp === exp.id} className="flex items-center gap-2 text-sm bg-gray-200 text-gray-800 font-semibold py-1 px-3 rounded-full hover:bg-gray-300 transition disabled:opacity-50">
              <BrainCircuitIcon className="w-4 h-4 text-green-600"/>
              {loadingExp === exp.id ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
        ))}
        <button onClick={addExperience} className="w-full bg-gray-100 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-200 transition">+ Add Experience</button>
      </FormSection>

      <FormSection title="Education">
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-md space-y-4 relative">
            <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
            <Input label="Degree / Certificate" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, e)} />
            <Input label="Institution" name="institution" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, e)} />
            <Input label="Graduation Year" name="gradYear" value={edu.gradYear} onChange={(e) => handleEducationChange(edu.id, e)} />
          </div>
        ))}
        <button onClick={addEducation} className="w-full bg-gray-100 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-200 transition">+ Add Education</button>
      </FormSection>
      
      <FormSection title="Skills">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="relative">
                <Input label="" name="name" value={skill.name} onChange={(e) => handleSkillChange(skill.id, e)} />
                <button onClick={() => removeSkill(skill.id)} className="absolute -top-1 -right-1 text-red-500 bg-white rounded-full hover:text-red-700 text-xs w-5 h-5 flex items-center justify-center border">&times;</button>
              </div>
            ))}
        </div>
        <button onClick={addSkill} className="w-full bg-gray-100 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-200 transition">+ Add Skill</button>
      </FormSection>
    </div>
  );
};