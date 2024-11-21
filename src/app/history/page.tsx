// src/app/history/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { StorageManager, type StoredAnalysis } from '@/lib/storage';
import { Card } from '@/components/base/card';
import { formatDistanceToNow } from 'date-fns';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);

  useEffect(() => {
    setAnalyses(StorageManager.getHistory());
  }, []);

  const handleDelete = (id: string) => {
    StorageManager.deleteAnalysis(id);
    setAnalyses(StorageManager.getHistory());
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">History</h1>
          {analyses.length > 0 && (
            <button
              onClick={() => {
                StorageManager.clearHistory();
                setAnalyses([]);
              }}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Clear History
            </button>
          )}
        </div>

        {analyses.length === 0 ? (
          <Card className="p-8 text-center text-zinc-400 bg-zinc-900/40 border-zinc-800/50">
            No analyses yet. Try running some correlations!
          </Card>
        ) : (
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <Card 
                key={analysis.id}
                className="bg-zinc-900/40 border-zinc-800/50 hover:bg-zinc-900/60 transition-colors"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {analysis.input.ticker1} vs {analysis.input.ticker2}
                      </h3>
                      <p className="text-sm text-zinc-400">
                        {formatDistanceToNow(analysis.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(analysis.id)}
                      className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
                      aria-label="Delete analysis"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-4xl font-bold text-white mb-1">
                        {analysis.result.correlation.toFixed(4)}
                      </div>
                      <div className="text-sm text-zinc-400">Correlation Score</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-zinc-400">Period</div>
                        <div className="text-white">
                          {analysis.result.first_date} - {analysis.result.last_date}
                        </div>
                      </div>
                      <div>
                        <div className="text-zinc-400">Data Points</div>
                        <div className="text-white">{analysis.result.data_points}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-800 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-zinc-400">Covariance: </span>
                        <span className="text-white">{analysis.result.covariance.toFixed(6)}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400">Trading Days: </span>
                        <span className="text-white">{analysis.result.trading_days}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}