# Application Architecture Documentation

## Architecture Overview

```
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
```

## Layer Breakdown

### 1. Top Layer - UI Components

User interface elements and interactions live here. Components use services through the API facade.

```tsx
const AnalysisComponent = () => {
  const handleAnalyze = async () => {
    // Calls service through API facade
    const result = await api.correlation.analyze(data);
  }
}
```

### 2. State Management Layer

Manages application state and handles data caching.

```tsx
const useAnalysis = () => {
  const [results, setResults] = useState(null);
  const analyze = async (data) => {
    // Uses service through API facade
    const result = await api.correlation.analyze(data);
    setResults(result);
  }
}
```

### 3. API Facade Layer

Central point for accessing all services and manages service instances.

```typescript
// src/lib/api/index.ts
export const api = {
  correlation: new CorrelationService(apiClient),
  // other services...
}
```

### 4. Service Layer

Where our CorrelationService and other services live. Handles business logic, type validation, and API call formatting.

```typescript
// src/lib/api/services/correlation.ts
export class CorrelationService {
  constructor(private client: APIClient) {}
  
  async analyze(input: CorrelationInput): Promise<CorrelationResult> {
    return this.client.post(ENDPOINTS.CORRELATION.ANALYZE, input);
  }
}
```

### 5. APIClient Layer

Handles HTTP communication, error handling, and request/response processing.

```typescript
// src/lib/api/client.ts
export class APIClient {
  async post<T>(endpoint: string, data: any): Promise<T> {
    // handle HTTP communication
  }
}
```

## Architectural Benefits

### 1. Separation of Concerns

- UI only handles display and user interaction
- Services handle business logic and API communication
- Client handles HTTP details

### 2. Maintainability

Adding new functionality only requires changes in relevant layers:

```typescript
// New UI feature:
const NewComponent = () => {
  // Uses existing service
  const result = await api.correlation.analyze(data);
}

// New service feature:
class CorrelationService {
  // Add new method
  async newFeature() {
    // Implementation
  }
}
```

### 3. Testability

Each layer can be tested independently:

```typescript
describe('CorrelationService', () => {
  const mockClient = new MockAPIClient();
  const service = new CorrelationService(mockClient);
  
  it('handles analysis', async () => {
    const result = await service.analyze(testData);
    expect(result).toBeDefined();
  });
});
```

### 4. Scalability

Easy to add new services:

```typescript
export const api = {
  correlation: new CorrelationService(apiClient),
  newFeature: new NewFeatureService(apiClient),
}
```

### 5. Error Handling

Errors can be handled at appropriate levels:

```typescript
class CorrelationService {
  async analyze(input: CorrelationInput) {
    try {
      return await this.client.post(ENDPOINTS.CORRELATION.ANALYZE, input);
    } catch (error) {
      // Handle service-specific errors
      throw new CorrelationError(error);
    }
  }
}
```

## Best Practices

1. Always access services through the API facade
2. Keep business logic in services, not in components
3. Handle errors at the appropriate layer
4. Use TypeScript interfaces for type safety
5. Keep services focused on a single responsibility
6. Test each layer independently
7. Document service interfaces and important methods

## Obvious things TO BE DONE, once the breadth of the platform/ number of algos grows

- add service-level caching for frequently accessed data
- retry logic for failed API calls
- add logging at service level
- performance monitoring at service level