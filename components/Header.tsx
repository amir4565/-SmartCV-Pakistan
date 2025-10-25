import React from 'react';
import { DownloadIcon, LanguagesIcon, SaveIcon } from './icons';
import { Language, Template } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onDownloadPDF: () => void;
  onSaveCV: () => void;
  onLoadCV: () => void;
  template: Template;
  onTemplateChange: (template: Template) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onDownloadPDF, onSaveCV, onLoadCV, template, onTemplateChange }) => {
  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-40">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-green-700">🇵🇰 SmartCV Pakistan</h1>
          <p className="text-sm text-gray-500">Create a Job-Winning CV in Seconds — Made for Pakistan.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center">
           <select 
             value={template} 
             onChange={(e) => onTemplateChange(e.target.value as Template)}
             className="bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-md hover:bg-gray-300 transition duration-300 appearance-none cursor-pointer"
           >
             <option value="modern">Modern</option>
             <option value="corporate">Corporate</option>
             <option value="creative">Creative</option>
           </select>
           <button onClick={onSaveCV} className="flex items-center gap-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            <SaveIcon className="w-5 h-5" />
            <span>Save</span>
          </button>
           <button onClick={onLoadCV} className="flex items-center gap-2 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300">
            Load
          </button>
          <button onClick={onDownloadPDF} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
            <DownloadIcon className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
          <div className="flex items-center border rounded-md p-1 bg-gray-100">
             <button
              onClick={() => onLanguageChange(Language.English)}
              className={`px-3 py-1 rounded-md text-sm transition ${language === Language.English ? 'bg-white shadow' : ''}`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange(Language.Urdu)}
              className={`px-3 py-1 rounded-md text-sm transition font-urdu ${language === Language.Urdu ? 'bg-white shadow' : ''}`}
            >
              اردو
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
