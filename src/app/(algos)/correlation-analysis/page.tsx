// src/app/correlation-analysis/page.tsx
'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { CorrelationInput, CorrelationResult } from '@/types';
import CorrelationForm from '@/components/algorithms/correlation/CorrelationForm';
import CorrelationResults from '@/components/algorithms/correlation/CorrelationResults';
import { StorageManager } from '@/lib/storage';

export default function CorrelationAnalysisPage() {
  const [result, setResult] = useState<CorrelationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (input: CorrelationInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await api.correlation.analyze(input);
      setResult(data);
      StorageManager.addAnalysis(input, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Correlation Analysis</h1>
        
        <div className="space-y-6">
          <CorrelationForm onSubmit={handleAnalyze} isLoading={isLoading} />
          
          {error && (
            <div className="p-4 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}
          
          {result && <CorrelationResults result={result} />}
        </div>
      </div>
    </div>
  );
}