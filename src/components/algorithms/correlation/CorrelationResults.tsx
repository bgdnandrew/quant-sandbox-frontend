// src/components/algorithms/correlation/CorrelationResults.tsx
// ---------------- ---------------- ---------------- ----------------

/*
Algo #1; OUTPUT Component; Correlation Results Display Component Documentation
--------------------------------------------------------------------------------

Overview:
We've implemented a display component that presents the correlation analysis results in a 
visually structured way. The component takes correlation data and presents it in a card layout 
with different sections for various metrics.

Component Organization:

1. Visual Hierarchy:
   - Primary Metric (Correlation Score): Large, centered at the top
   - Date Range: Two-column layout below the score
   - Detailed Metrics: Vertical list at the bottom

2. Data Formatting:
   - Correlation: 4 decimal places for precision
   - Covariance: 6 decimal places for detailed accuracy
   - Dates: Human-readable format
   - Created At: Localized datetime string

3. Styling Patterns:
   - Dark theme using zinc color palette
   - Consistent text sizes
   - Clear visual separation between sections
   - Right alignment for end dates
   - Subtle borders for section separation

4. Layout Structure:
   - Card container with title
   - Centered score section
   - Grid layout for dates
   - Stacked layout for metrics
   
Benefits:
1. Clear visual hierarchy
2. Consistent dark theme styling
3. Responsive layout
4. Easy to scan metrics
5. Professional financial data presentation
*/

import { CorrelationResult } from '@/types';
import { Card } from '@/components/base/card';

interface CorrelationResultsProps {
  result: CorrelationResult;
}

export default function CorrelationResults({ result }: CorrelationResultsProps) {
  return (
    <Card title="Analysis Results">
      <div className="text-center mb-8">
        <p className="text-6xl font-bold text-white">{result.correlation.toFixed(4)}</p>
        <p className="text-xl mt-2 text-zinc-400">Correlation Score</p>
      </div>
      
      <div className="grid grid-cols-2 gap-x-8 mb-6">
        <div className="text-sm">
          <p className="text-zinc-400">Start Date</p>
          <p className="font-medium text-white">{result.first_date}</p>
        </div>
        <div className="text-sm text-right">
          <p className="text-zinc-400">End Date</p>
          <p className="font-medium text-white">{result.last_date}</p>
        </div>
      </div>
      
      <div className="space-y-4 text-sm border-t border-zinc-800/50 pt-6">
        <div>
          <p className="text-zinc-400">Covariance</p>
          <p className="font-medium text-white">{result.covariance.toFixed(6)}</p>
        </div>
        <div>
          <p className="text-zinc-400">Data Points</p>
          <p className="font-medium text-white">{result.data_points}</p>
        </div>
        <div>
          <p className="text-zinc-400">Trading Days</p>
          <p className="font-medium text-white">{result.trading_days}</p>
        </div>
        <div>
          <p className="text-zinc-400">Created At</p>
          <p className="font-medium text-white">
            {new Date(result.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}