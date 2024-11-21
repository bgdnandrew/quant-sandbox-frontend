// src/lib/api/index.ts
// --------------------------------

/*
API Services Organization System Documentation
-------------------------------------------

Overview:
We've implemented a centralized API management system for our application that provides a clean and 
organized way to handle all our API services. Currently, we're handling correlation analysis, but 
the system is structured to easily accommodate future algorithm additions.

Architecture Design:

1. Core Components:
   - APIClient: Base client handling all HTTP communications
   - Service Modules: Individual services for each type of analysis
   - Central Export: Single point of access for all API services

2. Organization Pattern:
   We're using the facade pattern where 'api' object acts as a unified interface to all our 
   service modules. This gives us several benefits:
   - Clean imports in other parts of the application
   - Centralized API instance management
   - Easy addition of new services
   - Consistent client configuration across services

3. Service Structure:
   - Each financial analysis algo gets its own service class
   - All services share the same APIClient instance
   - Services are initialized only once at application startup

4. Usage Pattern:
   Instead of creating multiple instances or importing services directly, other parts of our 
   application can simply import the 'api' object and access any service:
   import { api } from '@/lib/api';
   api.correlation.analyze(data);

5. Extensibility:
   To add new algos/ analysis types:
   1. Create new service class
   2. Add instance to api object
   3. No changes needed in existing code

Benefits:
- Single source of truth for API interactions
- Consistent error handling across services
- Reduced code duplication
- Clear separation of concerns
- Easy testing through dependency injection
*/

import { APIClient } from './client';
import { CorrelationService } from './services/correlation';

// Initialize the API client once
const apiClient = new APIClient();

// Export services
export const api = {
  correlation: new CorrelationService(apiClient),
  // Add new services here as you add more algorithms
};