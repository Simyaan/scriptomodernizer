
export interface ManuscriptResult {
  transcription: string;
  modernizedText: string;
  language: string;
  historicalContext: string;
  notableTerms: Array<{
    term: string;
    meaning: string;
    context: string;
  }>;
}

export interface ProcessingState {
  isProcessing: boolean;
  error: string | null;
  result: ManuscriptResult | null;
}

export enum ViewMode {
  SIDE_BY_SIDE = 'SIDE_BY_SIDE',
  SINGLE_FOCUS = 'SINGLE_FOCUS'
}
