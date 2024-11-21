// src/app/page.tsx
"use client";

import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  ArrowsRightLeftIcon,
  ChartBarIcon,
  ChartPieIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 text-white">
          <h1 className="text-4xl font-bold tracking-tight">QuantSandbox.io</h1>
        </div>

        {/* Description */}
        <p className="text-lg text-zinc-400 text-center sm:text-left">
          An open-source quantitative analysis platform for exploring financial
          markets through algorithmic lenses.
        </p>

        {/* Quick Start Guide */}
        <div className="w-full">
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">
            QUICK START
          </h2>
          <ol className="list-inside list-decimal space-y-4 text-sm text-zinc-400">
            <li>
              Select an algorithm from the sidebar:
              <div className="ml-6 mt-2 flex gap-4">
                {[
                  { name: "Correlation", icon: ArrowsRightLeftIcon },
                  { name: "Volatility", icon: ChartBarIcon },
                  { name: "Portfolio", icon: ChartPieIcon },
                ].map((algo) => (
                  <div
                    key={algo.name}
                    className="flex items-center gap-2 text-zinc-500"
                  >
                    <algo.icon className="h-5 w-5" />
                    <span>{algo.name}</span>
                  </div>
                ))}
              </div>
            </li>
            <li>
              Enter your analysis parameters (e.g., ticker symbols, date range)
            </li>
            <li>View detailed results with interactive visualizations</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <Link
            href="/correlation-analysis"
            className="rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 font-medium flex items-center gap-2 transition-colors"
          >
            Try it
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/bgdnandrew/quant-sandbox"
            target="_blank"
            className="rounded-lg border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50 px-6 py-3 font-medium flex items-center gap-2 transition-colors text-zinc-300"
          >
            View Source
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-8">
          {[
            {
              title: "Algorithmic Analysis",
              description:
                "Analyze relationships between multiple assets with advanced statistical methods.",
            },
            {
              title: "Real-time Data",
              description:
                "Get up-to-date market data for accurate analysis and decision making.",
            },
            {
              title: "Interactive Charts",
              description:
                "Visualize your analysis with beautiful, interactive charts.",
            },
            {
              title: "Backtesting",
              description:
                "Access and analyze historical market data for deeper insights.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-800/40 transition-colors"
            >
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-zinc-500">
        <a
          href="https://github.com/bgdnandrew/quant-sandbox/#readme"
          target="_blank"
          // rel="noopener noreferrer"
          className="hover:text-zinc-300 transition-colors"
        >
          Backend Docs
        </a>
        <span>•</span>
        <a
          href="https://github.com/bgdnandrew/quant-sandbox-frontend/#readme"
          target="_blank"
          // rel="noopener noreferrer"
          className="hover:text-zinc-300 transition-colors"
        >
          Frontend Docs
        </a>
        <span>•</span>
        <a
          href="https://github.com/bgdnandrew/"
          target="_blank"
          // rel="noopener noreferrer"
          className="hover:text-zinc-300 transition-colors"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
