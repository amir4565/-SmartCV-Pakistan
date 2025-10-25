import React from 'react';
import type { ResumeData, Template } from '../types';
import { Language } from '../types';

interface ResumePreviewProps {
  resumeData: ResumeData;
  language: Language;
  template: Template;
}

interface TemplateProps {
    resumeData: ResumeData;
    isUrdu: boolean;
}

const renderList = (items: string[]) => (
  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
    {items.map((item, index) => <li key={index}>{item.replace(/^- /, '')}</li>)}
  </ul>
);

const ModernTemplate: React.FC<TemplateProps> = ({ resumeData: rd, isUrdu }) => (
    <div className={`p-8 md:p-12 w-full h-full`}>
      <header className="text-center border-b-2 border-green-700 pb-4 mb-6">
        <h1 className="text-4xl font-bold tracking-wider text-green-800">{rd.personalInfo.name}</h1>
        <p className="text-xl text-gray-600 mt-1">{rd.personalInfo.title}</p>
        <div className="flex justify-center gap-4 text-sm mt-3 text-gray-500">
          <span>{rd.personalInfo.phone}</span>
          <span>&bull;</span>
          <span>{rd.personalInfo.email}</span>
          <span>&bull;</span>
          <span>{rd.personalInfo.address}</span>
        </div>
      </header>
      <main className="space-y-6">
        <section>
          <h2 className="text-xl font-bold text-green-700 border-b border-gray-300 pb-1 mb-2">{isUrdu ? 'خلاصہ' : 'Summary'}</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{rd.personalInfo.summary}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-green-700 border-b border-gray-300 pb-1 mb-2">{isUrdu ? 'تجربہ' : 'Experience'}</h2>
          <div className="space-y-4">
            {rd.experience.map(exp => (
              <div key={exp.id}>
                <div className={`flex justify-between items-baseline ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className={`text-md text-gray-600 italic ${isUrdu ? 'text-right' : 'text-left'}`}>{exp.company}</p>
                <div className="text-sm text-gray-700 mt-1" style={{ whiteSpace: 'pre-wrap' }}>{renderList(exp.description.split('\n'))}</div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-green-700 border-b border-gray-300 pb-1 mb-2">{isUrdu ? 'تعلیم' : 'Education'}</h2>
          <div className="space-y-2">
            {rd.education.map(edu => (
              <div key={edu.id} className={`flex justify-between items-baseline ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div>
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <p className="text-md text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-500">{edu.gradYear}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-green-700 border-b border-gray-300 pb-1 mb-2">{isUrdu ? 'مہارتیں' : 'Skills'}</h2>
          <div className="flex flex-wrap gap-2">
            {rd.skills.map(skill => (
              <span key={skill.id} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{skill.name}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
);

const CorporateTemplate: React.FC<TemplateProps> = ({ resumeData: rd, isUrdu }) => (
    <div className="w-full h-full flex">
        <aside className="w-1/3 bg-gray-800 text-white p-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold">{rd.personalInfo.name}</h1>
                <p className="text-lg text-gray-300 mt-1">{rd.personalInfo.title}</p>
            </div>
            <div className="mt-8 space-y-6">
                <section>
                    <h2 className="text-lg font-bold text-green-400 border-b border-gray-600 pb-1 mb-2">{isUrdu ? 'رابطہ' : 'Contact'}</h2>
                    <div className="text-sm space-y-1 text-gray-200">
                        <p>{rd.personalInfo.phone}</p>
                        <p>{rd.personalInfo.email}</p>
                        <p>{rd.personalInfo.address}</p>
                    </div>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-green-400 border-b border-gray-600 pb-1 mb-2">{isUrdu ? 'مہارتیں' : 'Skills'}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {rd.skills.map(skill => (
                            <span key={skill.id} className="bg-gray-700 text-green-300 text-xs font-medium px-2 py-1 rounded">{skill.name}</span>
                        ))}
                    </div>
                </section>
            </div>
        </aside>
        <main className="w-2/3 p-8 space-y-6">
            <section>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2">{isUrdu ? 'خلاصہ' : 'Summary'}</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{rd.personalInfo.summary}</p>
            </section>
            <section>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2">{isUrdu ? 'تجربہ' : 'Experience'}</h2>
                <div className="space-y-4">
                    {rd.experience.map(exp => (
                        <div key={exp.id}>
                            <div className={`flex justify-between items-baseline ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className={`text-md text-gray-600 italic ${isUrdu ? 'text-right' : 'text-left'}`}>{exp.company}</p>
                            <div className="text-sm text-gray-700 mt-1" style={{ whiteSpace: 'pre-wrap' }}>{renderList(exp.description.split('\n'))}</div>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2">{isUrdu ? 'تعلیم' : 'Education'}</h2>
                 <div className="space-y-2">
                    {rd.education.map(edu => (
                    <div key={edu.id} className={`flex justify-between items-baseline ${isUrdu ? 'flex-row-reverse' : ''}`}>
                        <div>
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-md text-gray-600">{edu.institution}</p>
                        </div>
                        <p className="text-sm text-gray-500">{edu.gradYear}</p>
                    </div>
                    ))}
                </div>
            </section>
        </main>
    </div>
);

const CreativeTemplate: React.FC<TemplateProps> = ({ resumeData: rd, isUrdu }) => (
    <div className="w-full h-full p-8">
        <header className="relative text-center mb-8">
            <div className="bg-green-100 p-6">
                <h1 className="text-5xl font-bold text-green-800 font-serif">{rd.personalInfo.name}</h1>
                <p className="text-xl text-green-700 mt-2">{rd.personalInfo.title}</p>
            </div>
            <div className="flex justify-center gap-4 text-sm mt-4 text-gray-500">
                <span>{rd.personalInfo.phone}</span>
                <span className="text-green-500">&bull;</span>
                <span>{rd.personalInfo.email}</span>
                <span className="text-green-500">&bull;</span>
                <span>{rd.personalInfo.address}</span>
            </div>
        </header>

        <main className="space-y-6">
            <section>
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-3">{isUrdu ? 'خلاصہ' : 'Summary'}</h2>
                <p className="text-sm text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">{rd.personalInfo.summary}</p>
            </section>

             <hr className="my-6 border-t-2 border-green-100" />

            <section>
                <h2 className="text-xl font-bold text-green-700 uppercase tracking-widest mb-3">{isUrdu ? 'تجربہ' : 'Experience'}</h2>
                <div className="space-y-4 border-l-2 border-green-200 pl-4">
                    {rd.experience.map(exp => (
                        <div key={exp.id}>
                            <div className={`flex justify-between items-baseline ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                <h3 className="text-lg font-semibold">{exp.jobTitle} at <span className="text-gray-600 italic">{exp.company}</span></h3>
                                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <div className="text-sm text-gray-700 mt-1" style={{ whiteSpace: 'pre-wrap' }}>{renderList(exp.description.split('\n'))}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold text-green-700 uppercase tracking-widest mb-3">{isUrdu ? 'تعلیم' : 'Education'}</h2>
                <div className="space-y-2">
                    {rd.education.map(edu => (
                        <div key={edu.id} className={`flex justify-between items-baseline border-b border-gray-100 py-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <div>
                                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                                <p className="text-md text-gray-600">{edu.institution}</p>
                            </div>
                            <p className="text-sm text-gray-500">{edu.gradYear}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold text-green-700 uppercase tracking-widest mb-3">{isUrdu ? 'مہارتیں' : 'Skills'}</h2>
                <div className="flex flex-wrap gap-3">
                    {rd.skills.map(skill => (
                        <span key={skill.id} className="bg-gray-200 text-gray-800 text-sm font-medium px-4 py-1 rounded">{skill.name}</span>
                    ))}
                </div>
            </section>
        </main>
    </div>
);

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, language, template }) => {
  const isUrdu = language === Language.Urdu;
  const commonProps = { resumeData, isUrdu };

  const renderTemplate = () => {
    switch(template) {
        case 'modern':
            return <ModernTemplate {...commonProps} />;
        case 'corporate':
            return <CorporateTemplate {...commonProps} />;
        case 'creative':
            return <CreativeTemplate {...commonProps} />;
        default:
            return <ModernTemplate {...commonProps} />;
    }
  };
  
  return (
    <div id="resume-preview" className={`bg-white shadow-2xl w-full aspect-[210/297] min-h-[297mm] text-gray-800 overflow-hidden ${isUrdu ? 'font-urdu' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
      {renderTemplate()}
    </div>
  );
};
