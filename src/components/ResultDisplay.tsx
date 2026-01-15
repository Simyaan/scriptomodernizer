
import React, { useState } from 'react';
import { ManuscriptResult, ViewMode } from '../types';

interface Props {
  result: ManuscriptResult;
  image: string;
}

const ResultDisplay: React.FC<Props> = ({ result, image }) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SIDE_BY_SIDE);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Processed Manuscript</h2>
          <p className="text-stone-500 flex items-center gap-2">
            <i className="fas fa-globe-europe"></i> {result.language}
          </p>
        </div>
        <div className="flex bg-stone-200 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode(ViewMode.SIDE_BY_SIDE)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === ViewMode.SIDE_BY_SIDE ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Side by Side
          </button>
          <button 
            onClick={() => setViewMode(ViewMode.SINGLE_FOCUS)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === ViewMode.SINGLE_FOCUS ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Focus
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${viewMode === ViewMode.SIDE_BY_SIDE ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
        {/* Source Image */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider">Source Manuscript</h3>
          <div className="rounded-xl overflow-hidden border border-stone-200 shadow-md">
            <img src={image} alt="Original manuscript" className="w-full object-contain max-h-[600px] bg-stone-100" />
          </div>
        </div>

        {/* Modernized Text */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider">Modernized Reading</h3>
          <div className="parchment p-8 rounded-xl border border-amber-200 shadow-lg min-h-[400px]">
            <div className="prose prose-stone max-w-none">
              <p className="text-xl font-manuscript text-stone-800 leading-relaxed italic whitespace-pre-wrap">
                {result.modernizedText}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Full Transcription */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider">Literal Transcription</h3>
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm font-mono text-sm overflow-auto max-h-[400px] whitespace-pre-wrap">
            {result.transcription}
          </div>
        </div>

        {/* Historical Insight */}
        <div className="space-y-6">
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 shadow-sm">
            <h3 className="flex items-center gap-2 text-amber-900 font-bold mb-3">
              <i className="fas fa-landmark"></i> Historical Context
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              {result.historicalContext}
            </p>
          </div>

          <div className="bg-stone-900 p-6 rounded-xl text-white shadow-sm">
            <h3 className="flex items-center gap-2 font-bold mb-4">
              <i className="fas fa-book-open text-amber-400"></i> Glossary of Terms
            </h3>
            <div className="space-y-4">
              {result.notableTerms.map((item, idx) => (
                <div key={idx} className="border-b border-stone-700 pb-3 last:border-0 last:pb-0">
                  <span className="font-manuscript text-amber-300 text-lg block">{item.term}</span>
                  <p className="text-stone-400 text-xs mt-1">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
