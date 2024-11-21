// src/types/index.ts
// --------------------------------

export interface CorrelationInput {
    ticker1: string;
    ticker2: string;
    start_date: string;
    end_date: string;
  }
  
  export interface CorrelationResult {
    id: number;
    ticker1: string;
    ticker2: string;
    correlation: number;
    covariance: number;
    start_date: string;
    end_date: string;
    first_date: string;
    last_date: string;
    data_points: number;
    trading_days: number;
    created_at: string;
  }
  
  // for local storage
  export interface StoredAnalysis {
    timestamp: number;
    input: CorrelationInput;
    result: CorrelationResult;
  }