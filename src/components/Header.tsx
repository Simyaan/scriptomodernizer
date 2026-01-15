
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-stone-800 p-2 rounded-lg">
              <i className="fas fa-scroll text-amber-100 text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-stone-900">ScriptoModernizer</h1>
              <p className="text-xs text-stone-500 font-medium">Historical Manuscript Deciphering</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
