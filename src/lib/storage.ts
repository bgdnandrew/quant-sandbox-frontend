// src/lib/storage.ts
// --------------------------------

/*
Storage Management System Documentation
------------------------------------

Overview:
We've implemented a client-side storage system for our Quant Sandbox application that manages the history 
of quantitative analyses performed by users. At the moment, the system handles correlation analyses, but is 
designed to be extensible for other types of algo runs in the future.

Key Features:
- Persistent storage of analysis history using localStorage
- Automatic management of storage limits (50 most recent analyses)
- Unique identification for each analysis
- Error handling for storage operations
- Type safety through TypeScript interfaces

Core Functionality:

1. Data Structure (StoredAnalysis):
   - Each analysis contains:
     * Unique ID: Generated using crypto.randomUUID()
     * Timestamp: Unix timestamp of when the analysis was performed
     * Type: Currently only 'correlation', expandable for future analysis types
     * Input: The data provided for analysis (CorrelationInput)
     * Result: The analysis results (CorrelationResult)

2. Storage Operations:
   a) Reading History (getHistory):
      - Retrieves all stored analyses from localStorage
      - Returns empty array if:
        * Running in server-side context
        * No previous analyses exist
        * Storage parsing fails
   
   b) Adding Analysis (addAnalysis):
      - Creates new analysis entry with unique ID and timestamp
      - Prepends new analysis to history
      - Maintains maximum of 50 entries (FIFO)
      - Handles storage failures gracefully
   
   c) Deleting Analysis (deleteAnalysis):
      - Removes specific analysis by ID
      - Maintains existing order of other analyses
      - Handles deletion failures gracefully
   
   d) Clearing History (clearHistory):
      - Removes all stored analyses
      - Complete reset of storage state

Security Considerations:
- Server-side safety checks prevent localStorage access errors
- Error handling prevents application crashes
- Data validation through TypeScript interfaces

Storage Format:
- Key: 'quant-sandbox-history'
- Value: JSON string of StoredAnalysis array
*/

import { CorrelationInput, CorrelationResult } from "@/types";

/**
 * Interface defining the structure of stored analysis data.
 * Each analysis contains metadata and the actual analysis data.
 */

export interface StoredAnalysis {
  id: string; // unique identifier for each analysis
  timestamp: number;
  type: "correlation"; // we can add more types later
  input: CorrelationInput;
  result: CorrelationResult;
}

/** Key used for storing analyses in localStorage */
const STORAGE_KEY = "quant-sandbox-history";

/**
 * StorageManager handles all persistence operations for analysis history.
 * Provides methods for reading, writing, and managing stored analyses.
 */

export const StorageManager = {
  getHistory: (): StoredAnalysis[] => {
    // prevent localStorage access during server-side rendering
    if (typeof window === "undefined") return [];

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse storage:", error);
      return [];
    }
  },

  /**
   * Adds a new analysis to the storage history.
   *
   * @param input - The algo input data
   * @param result - The algo output/ results
   */

  addAnalysis: (input: CorrelationInput, result: CorrelationResult): void => {
    if (typeof window === "undefined") return;

    try {
      const history = StorageManager.getHistory();
      const newAnalysis: StoredAnalysis = {
        id: crypto.randomUUID(), // generate unique ID
        timestamp: Date.now(),
        type: "correlation",
        input,
        result,
      };

      // keep only the last 50 analyses
      const updatedHistory = [newAnalysis, ...history].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Failed to save to storage:", error);
    }
  },

  /**
   * Deletes a specific analysis from storage by its ID.
   *
   * @param id - The unique identifier of the analysis to delete
   */

  deleteAnalysis: (id: string): void => {
    if (typeof window === "undefined") return;

    try {
      const history = StorageManager.getHistory();
      const updatedHistory = history.filter((analysis) => analysis.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Failed to delete analysis:", error);
    }
  },

  clearHistory: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
