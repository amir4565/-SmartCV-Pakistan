import { GoogleGenAI, Type } from "@google/genai";
import type { ResumeData, ResumeScore, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateDescription = async (jobTitle: string, company: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 3 concise, professional bullet points for a job description for a ${jobTitle} at ${company}. Focus on key responsibilities and achievements. Start each point with '- '.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    return "Failed to generate description. Please try again.";
  }
};

export const generateSummary = async (resumeData: ResumeData): Promise<string> => {
  try {
    const relevantInfo = `
      Job Title: ${resumeData.personalInfo.title}
      Experience: ${resumeData.experience.map(e => `${e.jobTitle} at ${e.company}: ${e.description}`).join('; ')}
      Skills: ${resumeData.skills.map(s => s.name).join(', ')}
    `;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Based on the following resume details, write a compelling and professional 2-3 sentence summary for a CV. Tailor it for the Pakistani job market. Details: ${relevantInfo}`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary. Please try again.";
  }
};

export const translateText = async (text: string, targetLanguage: Language): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Translate the following text to ${targetLanguage}: "${text}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error translating text:", error);
    return text; // Return original text on failure
  }
};

export const scoreResume = async (resumeData: ResumeData, targetJob: string): Promise<ResumeScore> => {
  try {
    const resumeString = JSON.stringify(resumeData);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following resume data for a "${targetJob}" position in Pakistan. Provide a score out of 100, one sentence of overall feedback, and a list of 3 actionable suggestions for improvement (e.g., missing keywords). Resume Data: ${resumeString}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    });
    const parsedResponse = JSON.parse(response.text);
    return parsedResponse as ResumeScore;
  } catch (error) {
    console.error("Error scoring resume:", error);
    return {
      score: 0,
      feedback: "Could not score resume due to an error.",
      suggestions: [],
    };
  }
};

export const generateCoverLetter = async (resumeData: ResumeData, jobTitle: string, company: string): Promise<string> => {
  try {
    const resumeString = JSON.stringify(resumeData.personalInfo.name + " " + resumeData.personalInfo.summary + " " + resumeData.experience.map(e => e.jobTitle + " " + e.description).join(" "));
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Using the following resume information, write a professional and concise cover letter for the position of ${jobTitle} at ${company}. The tone should be formal and tailored to the Pakistani job market. Keep it to 3 paragraphs. Resume Info: ${resumeString}`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return "Failed to generate cover letter. Please try again.";
  }
};