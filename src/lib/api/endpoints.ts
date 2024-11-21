// src/lib/api/endpoints.ts
// ---------------- ----------------

/*
API Endpoints Configuration Documentation
--------------------------------------

Overview:
We've implemented a centralized endpoints configuration system that defines all API routes 
in our application. This acts as a single source of truth for all API endpoints used across 
our quantitative analysis services.

Key Design Elements:

1. Structure:
   - Top-level categorization by analysis type (CORRELATION, VOLATILITY, etc.)
   - Sub-grouping of related endpoints within each category
   - Constant typing using 'as const' for type safety

2. Current Categories:
   CORRELATION:
   - Single endpoint for correlation analysis
   
   VOLATILITY:
   - Two endpoints:
     * Main analysis endpoint
     * Historical data retrieval endpoint

3. Type Safety:
   - Using 'as const' makes all strings literal types
   - Prevents accidental endpoint modification
   - Enables autocomplete in IDE
   
4. Usage Pattern:
   - Import ENDPOINTS constant
   - Access endpoints using dot notation
   - Used by service classes for API calls

Benefits:
1. Single source of truth for API routes
2. Easy endpoint management and updates
3. Type safety across the application
4. Clear organization by analysis type
5. Simple addition of new endpoints
*/

export const ENDPOINTS = {
    CORRELATION: {
      ANALYZE: '/api/correlation/correlation-analysis/',
    },
    VOLATILITY: {
      ANALYZE: '/api/volatility/volatility-analysis/',
      HISTORICAL: '/api/volatility/volatility-analysis/historical/',
    },
    // here we can add more algorithm endpoints, as needed
  } as const;