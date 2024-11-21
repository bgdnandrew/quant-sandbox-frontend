// src/components/algorithms/correlation/CorrelationForm.tsx
// ---------------- ---------------- ---------------- ----------------

/*
Algo #1; INPUT Component; Correlation Analysis Form Component Documentation
--------------------------------------------------------------------------------

Overview:
We've implemented a form component for collecting correlation analysis parameters. This form 
collects two ticker symbols and a date range to perform correlation analysis between financial 
instruments.

Component Architecture:

1. Core Features:
   - Input collection for two tickers
   - Date range selection
   - Form state management
   - Loading state handling
   - Dark theme styling

2. State Management:
   - Local state for form inputs
   - Parent-controlled submission handling
   - Loading state controlled by parent

3. Form Fields:
   - Ticker 1 (text input)
   - Ticker 2 (text input)
   - Start Date (date picker)
   - End Date (date picker)

4. Styling:
   - Dark theme with zinc color palette
   - Responsive grid layout
   - Focus states for better UX
   - Disabled states during loading

5. User Experience:
   - Required field validation
   - Loading state feedback
   - Clear input labeling
   - Consistent styling

Key Benefits:
1. Reusable component
2. Type-safe props and state
3. Controlled form inputs
4. Responsive design
5. Accessible form fields
*/

"use client";

import { useState } from "react";
import { CorrelationInput } from "@/types";
import { Card } from "@/components/base/card";

/**
 * Props interface for the CorrelationForm component
 */

interface CorrelationFormProps {
  onSubmit: (input: CorrelationInput) => Promise<void>;
  isLoading: boolean;
}

/**
 * CorrelationForm Component
 *
 * A form component for collecting correlation analysis parameters between two financial instruments.
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

export default function CorrelationForm({
  onSubmit,
  isLoading,
}: CorrelationFormProps) {
  const [input, setInput] = useState<CorrelationInput>({
    ticker1: "",
    ticker2: "",
    start_date: "",
    end_date: "",
  });

  /**
   * Handles form submission
   * Prevents default form behavior and calls the onSubmit callback
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(input);
  };

  return (
    <Card title="Input Parameters">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="ticker1"
              className="block text-sm font-medium mb-2 text-zinc-400"
            >
              Ticker 1
            </label>
            <input
              type="text"
              id="ticker1"
              value={input.ticker1}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, ticker1: e.target.value }))
              }
              className="w-full rounded-md bg-zinc-800/50 border-zinc-700/50 text-white focus:border-zinc-200 focus:ring-zinc-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="ticker2"
              className="block text-sm font-medium mb-2 text-zinc-400"
            >
              Ticker 2
            </label>
            <input
              type="text"
              id="ticker2"
              value={input.ticker2}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, ticker2: e.target.value }))
              }
              className="w-full rounded-md bg-zinc-800/50 border-zinc-700/50 text-white focus:border-zinc-200 focus:ring-zinc-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium mb-2 text-zinc-400"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              value={input.start_date}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, start_date: e.target.value }))
              }
              className="w-full rounded-md bg-zinc-800/50 border-zinc-700/50 text-white focus:border-zinc-200 focus:ring-zinc-200"
              placeholder="Start Date"
              required
            />
          </div>
          <div>
            <label
              htmlFor="end_date"
              className="block text-sm font-medium mb-2 text-zinc-400"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              value={input.end_date}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, end_date: e.target.value }))
              }
              className="w-full rounded-md bg-zinc-800/50 border-zinc-700/50 text-white focus:border-zinc-200 focus:ring-blue-200"
              placeholder="End Date"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-zinc-600 hover:bg-zinc-700 text-white font-medium p-2 rounded-md disabled:bg-zinc-800/50 transition-colors shadow-md"
        >
          {isLoading ? "Analyzing..." : "Analyze Correlation"}
        </button>
      </form>
    </Card>
  );
}
