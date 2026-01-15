import React, { useCallback } from 'react';

interface Props {
  onImageSelected: (base64: string) => void;
  isLoading: boolean;
}

const ManuscriptUploader: React.FC<Props> = ({ onImageSelected, isLoading }) => {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 p-10 border-2 border-dashed border-stone-300 rounded-3xl bg-white/60 backdrop-blur-sm hover:bg-white hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-6 group shadow-sm">
      <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all duration-500 transform group-hover:scale-110">
        <i className="fas fa-file-upload text-3xl"></i>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-stone-900">Upload Manuscript</h3>
        <p className="text-stone-500 text-sm mt-2 font-medium">PNG, JPG or PDF up to 10MB</p>
      </div>
      <label className="relative mt-2 inline-flex items-center px-8 py-3.5 border border-transparent text-sm font-bold rounded-2xl shadow-lg text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-200 cursor-pointer disabled:opacity-50 transition-all active:scale-95">
        {isLoading ? (
          <><i className="fas fa-circle-notch fa-spin mr-3"></i> Deciphering Script...</>
        ) : (
          "Select Manuscript File"
        )}
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          accept="image/*,.pdf" 
          onChange={handleFileChange} 
          disabled={isLoading}
        />
      </label>
      <div className="flex items-center gap-4 text-xs text-stone-400 font-medium">
        <span className="flex items-center gap-1"><i className="fas fa-check-circle text-stone-300"></i> High Res Scans</span>
        <span className="flex items-center gap-1"><i className="fas fa-check-circle text-stone-300"></i> Multiple Languages</span>
      </div>
    </div>
  );
};

export default ManuscriptUploader;