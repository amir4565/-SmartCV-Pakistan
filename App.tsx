import React, { useState, useCallback, useEffect } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { Header } from './components/Header';
import { AIToolsPanel } from './components/AIToolsPanel';
import { INITIAL_RESUME_DATA } from './constants';
import { Language, Template } from './types';
import type { ResumeData } from './types';
import { translateText } from './services/geminiService';

declare global {
    interface Window {
        jspdf: any;
        html2canvas: any;
    }
}

const App: React.FC = () => {
    const [resumeData, setResumeData] = useState<ResumeData>(() => {
        const savedData = localStorage.getItem('smartcv-data');
        return savedData ? JSON.parse(savedData) : INITIAL_RESUME_DATA;
    });
    const [language, setLanguage] = useState<Language>(Language.English);
    const [template, setTemplate] = useState<Template>('modern');
    const [isTranslating, setIsTranslating] = useState(false);
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [savedCVs, setSavedCVs] = useState<string[]>([]);

    useEffect(() => {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('smartcv-save-'));
        setSavedCVs(keys.map(k => k.replace('smartcv-save-', '')));
    }, []);

    const handleLanguageChange = useCallback(async (newLang: Language) => {
        if (newLang === language) return;
        
        setIsTranslating(true);
        setLanguage(newLang);

        const translateResumeData = async <T,>(data: T): Promise<T> => {
            if (typeof data === 'string') {
                return await translateText(data, newLang) as T;
            }
            if (Array.isArray(data)) {
                return Promise.all(data.map(item => translateResumeData(item))) as Promise<T>;
            }
            if (typeof data === 'object' && data !== null) {
                const translatedObject: { [key: string]: any } = {};
                for (const key in data) {
                    if (key !== 'id') { // Don't translate IDs
                        translatedObject[key] = await translateResumeData((data as any)[key]);
                    } else {
                        translatedObject[key] = (data as any)[key];
                    }
                }
                return translatedObject as T;
            }
            return data;
        };

        const translatedData = await translateResumeData(resumeData);
        setResumeData(translatedData);
        setIsTranslating(false);
    }, [language, resumeData]);

    const handleDownloadPDF = () => {
        const { jsPDF } = window.jspdf;
        const resumeElement = document.getElementById('resume-preview');
        if (!resumeElement) return;

        window.html2canvas(resumeElement, { scale: 3 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("SmartCV.pdf");
        });
    };

    const handleSaveCV = () => {
        const name = prompt("Enter a name for this CV:", `My CV ${new Date().toLocaleDateString()}`);
        if(name) {
            localStorage.setItem(`smartcv-save-${name}`, JSON.stringify(resumeData));
            alert(`CV "${name}" saved!`);
            setSavedCVs(prev => [...new Set([...prev, name])]);
        }
    };

    const handleLoadCV = (name?: string) => {
        if (name) {
            const data = localStorage.getItem(`smartcv-save-${name}`);
            if(data) {
                setResumeData(JSON.parse(data));
                setShowLoadModal(false);
                alert(`CV "${name}" loaded!`);
            }
        } else {
            setShowLoadModal(true);
        }
    };

    const handleDeleteCV = (name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            localStorage.removeItem(`smartcv-save-${name}`);
            setSavedCVs(prev => prev.filter(cv => cv !== name));
        }
    };
    
    useEffect(() => {
        localStorage.setItem('smartcv-data', JSON.stringify(resumeData));
    }, [resumeData]);

    return (
        <div className="bg-gray-50 min-h-screen">
            {isTranslating && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-white text-xl font-bold">Translating...</div>
                </div>
            )}
            
            {showLoadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative">
                        <h3 className="text-xl font-bold mb-4">Load a Saved CV</h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {savedCVs.length > 0 ? savedCVs.map(name => (
                                <div key={name} className="flex justify-between items-center p-2 border rounded-md">
                                    <span>{name}</span>
                                    <div>
                                        <button onClick={() => handleLoadCV(name)} className="text-sm bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600">Load</button>
                                        <button onClick={() => handleDeleteCV(name)} className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
                                    </div>
                                </div>
                            )) : <p className="text-gray-500">No saved CVs found.</p>}
                        </div>
                        <button onClick={() => setShowLoadModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>
            )}

            <Header 
                language={language} 
                onLanguageChange={handleLanguageChange} 
                onDownloadPDF={handleDownloadPDF}
                onSaveCV={handleSaveCV}
                onLoadCV={() => handleLoadCV()}
                template={template}
                onTemplateChange={setTemplate}
            />
            <main className="container mx-auto p-4 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                       <div className="space-y-6">
                            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                            <AIToolsPanel resumeData={resumeData} />
                       </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="sticky top-24">
                           <ResumePreview resumeData={resumeData} language={language} template={template} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
