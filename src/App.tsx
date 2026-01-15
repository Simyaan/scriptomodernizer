
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ManuscriptUploader from './components/ManuscriptUploader';
import ResultDisplay from './components/ResultDisplay';
import { ProcessingState } from './types';
import { processManuscript } from './services/geminiService';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    error: null,
    result: null
  });

  const handleImageSelected = useCallback(async (base64: string) => {
    setImage(base64);
    setState(prev => ({ ...prev, isProcessing: true, error: null, result: null }));
    
    try {
      const result = await processManuscript(base64);
      setState({
        isProcessing: false,
        error: null,
        result
      });
    } catch (err: any) {
      setState({
        isProcessing: false,
        error: err.message || "An unexpected error occurred during processing.",
        result: null
      });
    }
  }, []);

  const reset = () => {
    setImage(null);
    setState({
      isProcessing: false,
      error: null,
      result: null
    });
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 w-full">
        {!image ? (
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-2">
              AI-Powered Paleography
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
              Bring History Into the <br className="hidden md:block" /> Modern Era.
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Our advanced AI vision system transcribes centuries-old script and translates it into contemporary readable language with historical accuracy.
            </p>
            <ManuscriptUploader 
              onImageSelected={handleImageSelected} 
              isLoading={state.isProcessing} 
            />
            
            <div className="grid md:grid-cols-3 gap-8 mt-20 text-left">
              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <i className="fas fa-keyboard text-stone-900 text-2xl mb-4"></i>
                <h4 className="font-bold mb-2">Literal Transcription</h4>
                <p className="text-sm text-stone-500 leading-relaxed">Exact character-by-character reproduction of the original document including archaic punctuation.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <i className="fas fa-language text-stone-900 text-2xl mb-4"></i>
                <h4 className="font-bold mb-2">Language Modernization</h4>
                <p className="text-sm text-stone-500 leading-relaxed">Seamlessly converts Middle English or other archaic dialects into fluent contemporary prose.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <i className="fas fa-search-plus text-stone-900 text-2xl mb-4"></i>
                <h4 className="font-bold mb-2">Contextual Insights</h4>
                <p className="text-sm text-stone-500 leading-relaxed">Identifies key historical terms and provides cultural background for deeper understanding.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button 
              onClick={reset}
              className="group flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
            >
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
              Back to Start
            </button>
            
            {state.isProcessing && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-stone-900">Deciphering Scroll...</h3>
                  <p className="text-stone-500 animate-pulse">Running advanced linguistic analysis</p>
                </div>
              </div>
            )}

            {state.error && (
              <div className="bg-red-50 border border-red-200 p-6 rounded-2xl flex items-start gap-4">
                <i className="fas fa-exclamation-circle text-red-500 text-xl mt-0.5"></i>
                <div>
                  <h3 className="font-bold text-red-900">Transcription Error</h3>
                  <p className="text-red-700 text-sm mt-1">{state.error}</p>
                  <button 
                    onClick={() => handleImageSelected(image)}
                    className="mt-4 text-sm font-semibold text-red-900 underline hover:no-underline"
                  >
                    Retry Analysis
                  </button>
                </div>
              </div>
            )}

            {state.result && <ResultDisplay result={state.result} image={image} />}
          </div>
        )}
      </main>

      {/* Persistent Call-to-Action / Status */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="bg-stone-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
          <i className="fas fa-question text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
