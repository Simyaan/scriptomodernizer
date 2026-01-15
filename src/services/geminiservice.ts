import { GoogleGenAI, Type } from "@google/genai";
import { ManuscriptResult } from "../types";

// Properly declare process for the browser environment so the IDE recognizes it
declare const process: {
  env: {
    API_KEY: string;
  };
};

export const processManuscript = async (imageBase64: string): Promise<ManuscriptResult> => {
  const apiKey = process.env.API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  
  const mimeTypeMatch = imageBase64.match(/data:(.*?);base64/);
  const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
  const base64Data = imageBase64.split(',')[1];

  const prompt = `
    Analyze this image of a historical manuscript. Perform the following steps:
    1. Transcribe the text exactly as written, including old spellings and punctuation.
    2. Provide a modernized version in contemporary English.
    3. Identify language/period and context.
    4. Extract difficult archaic terms.
    
    Return the response strictly as a JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            transcription: { type: Type.STRING },
            modernizedText: { type: Type.STRING },
            language: { type: Type.STRING },
            historicalContext: { type: Type.STRING },
            notableTerms: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  context: { type: Type.STRING }
                },
                required: ['term', 'meaning']
              }
            }
          },
          required: ['transcription', 'modernizedText', 'language', 'historicalContext', 'notableTerms']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as ManuscriptResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to process manuscript.");
  }
};