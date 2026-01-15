import React from "react";

interface NotableTerm {
  term: string;
  meaning: string;
}

interface ResultData {
  modernText?: string;
  notableTerms: NotableTerm[];
}

interface Props {
  result: ResultData;
  image?: string;
}

const ResultDisplay: React.FC<Props> = ({ result, image }) => {
  return (
    <div className="bg-stone-900 p-6 rounded-xl text-white shadow-md">
      {image && (
        <img
          src={image}
          alt="Uploaded manuscript"
          className="w-full rounded-lg mb-4"
        />
      )}

      {result.modernText && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-amber-400">
            Modern Translation
          </h2>
          <p className="text-stone-300 whitespace-pre-line">
            {result.modernText}
          </p>
        </div>
      )}

      <div>
        <h3 className="flex items-center gap-2 font-bold mb-4 text-lg">
          <i className="fas fa-book-open text-amber-400"></i>
          Glossary
        </h3>

        <div className="space-y-4">
          {result.notableTerms.map((item, idx) => (
            <div
              key={idx}
              className="border-b border-stone-700 pb-3"
            >
              <span className="font-manuscript text-amber-300 text-lg">
                {item.term}
              </span>
              <p className="text-stone-400 text-sm mt-1">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
