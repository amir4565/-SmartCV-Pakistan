
import React, { useState } from 'react';
import type { ResumeData, ResumeScore } from '../types';
import { scoreResume, generateCoverLetter } from '../services/geminiService';
import { BrainCircuitIcon, FileTextIcon } from './icons';

interface AIToolsPanelProps {
  resumeData: ResumeData;
}

export const AIToolsPanel: React.FC<AIToolsPanelProps> = ({ resumeData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeScore, setResumeScore] = useState<ResumeScore | null>(null);
  const [targetJob, setTargetJob] = useState('Software Engineer');
  const [coverLetter, setCoverLetter] = useState('');
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  const handleScoreResume = async () => {
    setIsLoading(true);
    setResumeScore(null);
    const result = await scoreResume(resumeData, targetJob);
    setResumeScore(result);
    setIsLoading(false);
  };

  const handleGenerateCoverLetter = async () => {
    setIsLoading(true);
    setCoverLetter('');
    const result = await generateCoverLetter(resumeData, targetJob, 'a leading company in Pakistan');
    setCoverLetter(result);
    setShowCoverLetter(true);
    setIsLoading(false);
  };

  const scoreColor = resumeScore ? (resumeScore.score > 75 ? 'text-green-500' : resumeScore.score > 50 ? 'text-yellow-500' : 'text-red-500') : '';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2">AI Toolkit</h3>
      
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-700">Resume Score & Tips</h4>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={targetJob}
            onChange={(e) => setTargetJob(e.target.value)}
            placeholder="Target Job Title (e.g., Doctor)"
            className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            onClick={handleScoreResume}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
          >
            <BrainCircuitIcon className="w-5 h-5" />
            <span>{isLoading ? 'Analyzing...' : 'Get Score'}</span>
          </button>
        </div>

        {resumeScore && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4">
              <div className={`text-5xl font-bold ${scoreColor}`}>{resumeScore.score}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Overall Feedback</p>
                <p className="text-sm text-gray-600">{resumeScore.feedback}</p>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold text-gray-800">Suggestions:</h5>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                {resumeScore.suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold text-gray-700">AI Cover Letter Generator</h4>
        <button
          onClick={handleGenerateCoverLetter}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          <FileTextIcon className="w-5 h-5" />
          <span>{isLoading ? 'Writing...' : 'Generate Cover Letter'}</span>
        </button>
      </div>

      {showCoverLetter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Your AI-Generated Cover Letter</h3>
            <textarea
              readOnly
              value={coverLetter}
              className="w-full h-96 p-3 border rounded-md bg-gray-50 font-mono text-sm"
            />
            <button
              onClick={() => setShowCoverLetter(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
