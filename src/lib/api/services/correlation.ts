// src/lib/api/services/correlation.ts
// ---------------- ---------------- ----------------

/*
Application Architecture Overview
-------------------------------

                    UI LAYER (React Components)
                            ↓ ↑
                    STATE MANAGEMENT
                    (React Hooks/Context)
                            ↓ ↑
                      API FACADE
                     (src/lib/api)
                            ↓ ↑
            +----------------+----------------+
            |               |                |
    CorrelationService  OtherService    FutureService
    (services/corr...)  (services/...)  (services/...)
            |               |                |
            +----------------+----------------+
                            ↓ ↑
                        APIClient
                    (src/lib/api/client)
                            ↓ ↑
                        BACKEND API
                            ↓ ↑
                         DATABASE
*/

/*
Correlation Service Documentation
---------------- ---------------- ----------------

Overview:
We've implemented a dedicated service class for handling correlation analysis operations in our 
application. This service acts as a bridge between our frontend and the correlation analysis 
endpoints of our API.

Service Architecture:

1. Dependencies:
   - APIClient: Handles the actual HTTP communications
   - ENDPOINTS: Contains all API endpoint configurations
   - Types: Defines the structure of our input and output data

2. Service Design:
   - Class-based implementation for better organization and potential extension
   - Dependency injection of APIClient for better testing and flexibility
   - Type-safe implementation using TypeScript interfaces
   - Promise-based async operations for non-blocking API calls

3. Core Functionality:
   This service currently handles one main operation:
   - analyze: Processes correlation analysis requests
     * Takes structured input data
     * Returns correlation analysis results
     * Handles asynchronous communication
     * Ensures type safety for both input and output

4. Usage Pattern:
   The service is designed to be used through our central API facade:
   import { api } from '@/lib/api';
   const result = await api.correlation.analyze(inputData);

5. Error Handling:
   - Relies on APIClient's built-in error handling
   - Preserves API error information
   - Maintains type safety in error scenarios

Key Benefits:
- Clean separation of concerns
- Type-safe API interactions
- Consistent error handling
- Easy testing through dependency injection
- Clear interface for correlation analysis operations



Purpose of the CorrelationService Class:

1. Type Safety & Validation:

// With CorrelationService:
async analyze(input: CorrelationInput): Promise<CorrelationResult> {
    // TypeScript ensures input matches CorrelationInput structure
    // Return type is guaranteed to match CorrelationResult
    return this.client.post<CorrelationResult>(ENDPOINTS.CORRELATION.ANALYZE, input);
}

// Without CorrelationService (direct API calls):
// We'd have to handle types everywhere we make a correlation request
const result = await apiClient.post('/api/correlation/analyze', {
    // No type checking - could send wrong data structure
    data: someData  // Could be anything!
});
// Result type is unknown - might not match what we expect


2. Code Organization & Reusability:

// With CorrelationService:
// Use it anywhere in the app:
const result = await api.correlation.analyze(data);

// Without CorrelationService:
// Would need to repeat this everywhere:
const result = await apiClient.post(
    '/api/correlation/analyze',  // Endpoint URL duplicated
    data,
    // Need to remember correct options, headers, etc.
);
*/

import { APIClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { CorrelationInput, CorrelationResult } from "@/types";

/**
 * Service class handling all correlation analysis operations.
 * This service manages communication with correlation-related API endpoints.
 *
 * Usage example:
 * ```typescript
 * const service = new CorrelationService(apiClient);
 * const result = await service.analyze({
 *   dataset: [...],
 *   variables: [...]
 * });
 * ```
 */

export class CorrelationService {
  constructor(private client: APIClient) {}

  /**
   * Performs correlation analysis on the provided input data.
   *
   * @param input - The correlation analysis parameters and dataset
   * @returns Promise resolving to correlation analysis results
   *
   * @throws Will throw an error if the API request fails
   *
   * Example usage:
   * ```typescript
   * const result = await correlationService.analyze({
   *   dataset: [
   *     { x: 1, y: 2 },
   *     { x: 2, y: 4 }
   *   ],
   *   variables: ['x', 'y']
   * });
   * ```
   */

  async analyze(input: CorrelationInput): Promise<CorrelationResult> {
    return this.client.post<CorrelationResult>(
      ENDPOINTS.CORRELATION.ANALYZE,
      input
    );
  }
}
