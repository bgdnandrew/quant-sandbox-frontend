# QuantSandbox (Frontend)

![QuantSandbox Logo](https://quantsandbox.io/quant-sandbox-github-logo.png)

An open-source quantitative analysis platform for exploring financial markets through algorithmic lenses. The frontend employs a clean, modular architecture. It is built with Next.js, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

QuantSandbox.io is a modern web platform that brings professional-grade quantitative analysis tools to anyone interested in exploring financial markets. By combining powerful algorithms with an intuitive interface, it makes quant analysis more accessible.

### Key Features (both current, and on the roadmap)

- 📊 **Suite of Algorithms**: Run the right algos, there's a plethora of them to choose from
- 📈 **Real-time Data Processing**: Up-to-date market data analysis
- 🎯 **Interactive Visualizations**: Clear, actionable insights through dynamic charts
- 📚 **Historical Analysis**: Backtesting; deep dives into historical market patterns

## Project Information

### Author

- **Name:** Bogdan Andrei
- **Website:** [bgdnandrew.com](https://bgdnandrew.com)
- **X/ Twitter:** [@bgdnandrew](https://x.com/bgdnandrew)
- **Software Agency:** [Oriented Platforms](https://orientedplatforms.com)

### Project Links

- **Frontend (this repo):** [GitHub - QuantSandbox Frontend](https://github.com/bgdnandrew/quant-sandbox-frontend)
- **Backend Repo:** [GitHub - QuantSandbox](https://github.com/bgdnandrew/quant-sandbox)
- **Live Platform:** [quantsandbox.io](https://quantsandbox.io)

## Project Philosophy

QuantSandbox was developed with inspiration from platforms such as Sentdex's [pythonprogramming.net](https://pythonprogramming.net), and Quantopian's [Quantopian Lectures](https://gist.github.com/ih2502mk/50d8f7feb614c8676383431b056f4291) (the Quantopian platform is now sunsetted, but the creator keeps its spirit alive through a nice newsletter).

> **From Wikipedia:** Quantopian was a company that aimed to create a crowd-sourced hedge fund by letting freelance quantitative analysts develop, test, and use trading algorithms to buy and sell securities. In November 2020, Quantopian announced it would shut down after 9 years of operation.

## Getting Started

> **Note on Documentation Style:** Throughout this documentation, you'll notice the use of "we" instead of "I". While QuantSandbox v1.0.0 was developed solely by myself (Bogdan), this choice reflects the project's commitment to community and collaboration. Open source is about "we" - the collective power of developers learning and building together.

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn
- Git

### Local Development Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/quant-sandbox-frontend.git
cd quant-sandbox-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Edit `.env.local` with your configuration. The Django backend should run on port 8000, if not confugured otherwise.

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The frontend application will be available at `http://localhost:3000`.

### Available Scripts

```bash
# Development
npm run dev         # Start development server

npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript compiler check
```

## Technology Stack

- **Framework:** Next.js 14 with App Router (React Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks & Context
- **API Communication:** Custom API client with TypeScript
- **Storage:** Browser LocalStorage for analysis history (currently, as of v1.0.0, the app does not require user authentication)

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

### Architectural Design Decisions

We've implemented a layered architecture that emphasizes separation of concerns, type safety, and scalability. Here's why we made certain architectural choices:

#### 1. Service Layer Pattern

```typescript
// src/lib/api/services/correlation.ts
export class CorrelationService {
  constructor(private client: APIClient) {}

  async analyze(input: CorrelationInput): Promise<CorrelationResult> {
    return this.client.post(ENDPOINTS.CORRELATION.ANALYZE, input);
  }
}
```

**Why This Pattern?**

- **Type Safety:** Services enforce strict typing for inputs and outputs
- **Encapsulation:** Business logic is isolated from UI components
- **Testability:** Services can be easily mocked for testing
- **Reusability:** Services can be used across different components

#### 2. API Facade Pattern

```typescript
// src/lib/api/index.ts
export const api = {
  correlation: new CorrelationService(apiClient),
  // Add new services here
};
```

**Benefits:**

- Single entry point for all API operations
- Consistent API access pattern across the application
- Easy addition of new services
- Centralized error handling

#### 3. Storage Management

```typescript
// src/lib/storage.ts
export const StorageManager = {
  getHistory: (): StoredAnalysis[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse storage:", error);
      return [];
    }
  },
  // ... other methods
};
```

**Key Features:**

- The history of the algo runs is stored in localStorage, since the app in this version (v1.0.0) does not require user authentication
- Client-side persistence of analysis history
- Type-safe storage operations
- Error handling for storage operations
- Server-side rendering compatibility

### Component Architecture

Our components follow a clear hierarchy and responsibility pattern:

#### 1. Page Components

- Handle routing and layout
- Manage page-level state
- Coordinate between child components

#### 2. Algo Specific Components

Example: Correlation Analysis

```typescript
// src/components/algorithms/correlation/CorrelationForm.tsx
export default function CorrelationForm({
  onSubmit,
  isLoading,
}: CorrelationFormProps) {
  // Component logic
}
```

- Implement specific features or algorithms
- Maintain their own local state
- Communicate with parent through props and callbacks

#### 3. Base Components

- Reusable UI elements
- Consistent styling through Tailwind
- Accessibility-focused design

### Type System

We use TypeScript extensively to ensure type safety:

```typescript
// src/types/index.ts
export interface CorrelationInput {
  ticker1: string;
  ticker2: string;
  start_date: string;
  end_date: string;
}

export interface CorrelationResult {
  correlation: number;
  covariance: number;
  // ... other fields
}
```

### API Communication

Our API client handles all HTTP communication:

```typescript
// src/lib/api/client.ts
export class APIClient {
  async post<T>(endpoint: string, data: any): Promise<T> {
    // HTTP communication logic
  }
}
```

### Error Handling Strategy

We implement error handling at multiple levels:

1. Service Level: Business logic errors
2. API Client Level: Network and HTTP errors
3. Component Level: UI-specific errors
4. Storage Level: Persistence errors

## Future Algorithmic Additions

We're planning to add more quantitative analysis algorithms:

1. **Portfolio Optimization**

   - Mean-Variance Optimization
   - Risk Parity Portfolios
   - Black-Litterman Model

2. **Risk Metrics**

   - Value at Risk (VaR)
   - Expected Shortfall
   - Stress Testing

3. **Time Series Analysis**

   - ARIMA Models
   - Kalman Filtering
   - Regime Detection

4. **Machine Learning Integration**
   - Factor Analysis
   - Clustering
   - Pattern Recognition

## Contributing

We welcome contributions to QuantSandbox! Whether you're fixing bugs, adding new features, or improving documentation, your help is appreciated.

### Contribution Workflow

1. **Fork the Repository**

   ```bash
   # Clone your fork
   git clone https://github.com/bgdnandrew/quant-sandbox-frontend.git
   cd quantsandbox

   # Add upstream remote
   git remote add upstream https://github.com/bgdnandrew/quant-sandbox-frontend.git
   ```

2. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

3. **Make Your Changes**

   - Write clean, documented code
   - Follow our code style guidelines
   - Add tests if applicable

4. **Commit Your Changes**

   ```bash
   git commit -m "feat: add new correlation visualization"
   # or
   git commit -m "fix: correct date range validation"
   ```

5. **Push and Create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

#### TypeScript/JavaScript

```typescript
// ✅ DO: Use clear, descriptive names
export interface CorrelationInput {
  ticker1: string;
  ticker2: string;
}

// ❌ DON'T: Use abbreviated or unclear names
export interface CorrInp {
  t1: string;
  t2: string;
}

// ✅ DO: Document complex functions
/**
 * Analyzes correlation between two financial instruments
 * @param input - Correlation parameters
 * @returns Promise resolving to correlation results
 */
async function analyzeCorrelation(
  input: CorrelationInput
): Promise<CorrelationResult> {
  // Implementation
}

// ❌ DON'T: Leave complex functions undocumented
async function analyze(input: any): Promise<any> {
  // Implementation
}
```

#### Component Structure

```typescript
// ✅ DO: Organize components with clear structure
export default function AnalysisComponent() {
  // 1. Hooks
  const [data, setData] = useState(null);

  // 2. Derived State
  const isLoading = data === null;

  // 3. Event Handlers
  const handleSubmit = async () => {
    // Implementation
  };

  // 4. Render
  return (
    // JSX
  );
}

// ❌ DON'T: Mix concerns or have unclear organization
export default function MessyComponent() {
  const handleClick = () => {};
  const [data] = useState();
  return <div onClick={handleClick}>{data}</div>;
  const isLoading = !data;
}
```

#### Styling with Tailwind

```tsx
// ✅ DO: Group related classes and use semantic naming
<div className="
  flex items-center justify-between  // Layout
  p-4 rounded-lg                    // Spacing & Shape
  bg-zinc-800 text-white           // Colors
  hover:bg-zinc-700 transition     // Interactions
">

// ❌ DON'T: Use arbitrary values or mix concerns
<div className="p-[13px] bg-[#333] flex random-utility">
```

### Testing Standards (🚧 To Be Implemented)

```typescript
// ✅ DO: Write meaningful tests
describe("CorrelationForm", () => {
  it("should validate input before submission", async () => {
    const handleSubmit = jest.fn();
    render(<CorrelationForm onSubmit={handleSubmit} />);

    // Test implementation
  });
});

// ❌ DON'T: Write implementation-dependent tests
describe("Component", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
});
```

> **Note:** Testing infrastructure is currently under development. We plan to implement:

1. **Unit Testing**

   - Jest + React Testing Library (we're open to robust alternatives)
   - Component testing
   - Service layer testing

2. **Integration Testing**

   - API integration tests
   - End-to-end user flows

3. **Performance Testing**
   - Load testing
   - Component render performance

Contributors interested in helping set up the testing infrastructure are welcome!

### Documentation Standards

1. **Component Documentation**

   ````typescript
   /**
    * CorrelationForm Component
    *
    * Collects and validates input for correlation analysis.
    *
    * @component
    * @example
    * ```tsx
    * <CorrelationForm
    *   onSubmit={handleAnalysis}
    *   isLoading={isAnalyzing}
    * />
    * ```
    */
   ````

2. **Architecture Documentation**

   - `.development-docs` is a folder ignored by git, meant for unpolished documentation that is still evolving
   - Ideally, all the code should be intuitive, easy to read, and self-explaining
   - Unfortunately, we do not live in an ideal world
   - As the project matures, if the need arises, we should include a directory with the proper, polished documentation that we've gathered

   We should always:

   - Document architectural decisions
   - Explain the reasoning behind patterns

### Pull Request Guidelines

1. **PR Title Format**

   ```
   feat: add new visualization component
   fix: correct date validation
   docs: update architecture documentation
   style: improve component layout
   refactor: simplify correlation logic
   ```

2. **PR Description Template**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Code style update
   - [ ] Refactor

   ## Testing

   Description of testing performed

   ## Screenshots

   If applicable
   ```

### Development Best Practices

1. **State Management**

   - Use local state for component-specific data
   - Use context for shared state
   - Keep state close to where it's used

2. **Performance**

   - Use React.memo() for expensive renders
   - Implement proper dependencies in useEffect
   - Optimize re-renders

3. **Error Handling**

   - Implement proper error boundaries
   - Provide meaningful error messages
   - Log errors appropriately

4. **Accessibility**
   - Use semantic HTML
   - Include ARIA labels
   - Ensure keyboard navigation

## Project Roadmap

1. **Algo Suite Expansion**

   - [ ] Volatility Analysis Implementation
   - [ ] Portfolio Optimization Tools
   - [ ] Enhanced Data Visualization
   - [ ] Supervised/ Unsupervised ML Features
   - [ ] Other Algos

2. **Technical Improvements**

   - [ ] Service Worker Implementation
   - [ ] Improved Error Handling
   - [ ] Performance Optimization
   - [ ] Enhanced Type Safety

3. **User Experience**

   - [ ] Responsive Design Improvements
   - [ ] Enhanced Form Validation
   - [ ] Interactive Tutorials

4. **Advanced Features**

   - [ ] Real-time Market Data Integration
   - [ ] Custom Algorithm Builder
   - [ ] Advanced Portfolio Analytics
   - [ ] Complex Machine Learning Integration

5. **Infrastructure**

   - [ ] Caching Layer Implementation
   - [ ] API Rate Limiting
   - [ ] Performance Monitoring
   - [ ] Automated Testing Pipeline
   - [ ] Real-time Data Processing
   - [ ] Distributed Computing Support

6. **User Features**

   - [ ] User Accounts
   - [ ] Saved Analysis History
   - [ ] Custom Dashboards
   - [ ] Analysis Sharing

### Longer Term Platform Evolution

- Community-contributed Algorithms
- Advanced Backtesting Framework
- Real-time Trading Integration
- Educational Resources

## Acknowledgments

Special thanks to:

- [Sentdex](https://pythonprogramming.net) for inspiration and educational content
- [Quantopian](https://gist.github.com/ih2502mk/50d8f7feb614c8676383431b056f4291) for their educational resources
- The open-source community for various tools and libraries
- Early users and contributors for valuable feedback

## Additional Resources

### Learning Resources

- [Django for Beginners](https://djangoforbeginners.com/introduction) by Will S. Vincent; IMHO this is **the best** Django resource for beginners out there; Will is regularly updating the website. Especially useful if your frontend contributions require knowledge of backend logic, for proper integration.

- [Python for Finance](https://pythonprogramming.net/getting-stock-prices-python-programming-for-finance/) by Sentdex
- [Quantopian Lectures](https://gist.github.com/ih2502mk/50d8f7feb614c8676383431b056f4291)
- [Quantitative Economics with Python](https://python.quantecon.org/) by QuantEcon
- [Awesome Quant](https://github.com/wilsonfreitas/awesome-quant) on GitHub

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Bogdan Andrei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

## Support

For support, questions, or collaboration:

- 📧 Email: bogdan [at] orientedplatforms.com
- ✖️ X/ Twitter: [@bgdnandrew](https://x.com/bgdnandrew)
- 🌐 Website: [bgdnandrew.com](https://bgdnandrew.com)

---

Built with ❤️ by [Bogdan Andrei](https://bgdnandrew.com) and the open-source community.
