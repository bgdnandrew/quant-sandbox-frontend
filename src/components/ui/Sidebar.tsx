// src/components/ui/sidebar.tsx
// --------------------------------

"use client";

import { usePathname } from "next/navigation";
import {
  ArrowsRightLeftIcon,
  ChartBarIcon,
  ChartPieIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  Sidebar as SidebarRoot,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  SidebarLabel,
  SidebarHeading,
  SidebarSpacer,
} from "@/components/base/sidebar-base";

const algorithms = [
  {
    name: "Correlation Analysis",
    href: "/correlation-analysis",
    icon: ArrowsRightLeftIcon,
  },
  {
    name: "Volatility Analysis",
    href: "/volatility-analysis",
    icon: ChartBarIcon,
  },
  {
    name: "Portfolio Analysis",
    href: "/portfolio-analysis",
    icon: ChartPieIcon,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarRoot>
      <SidebarHeader>
        <SidebarSection>
          <SidebarItem href="/">
            <SidebarLabel>QuantSandbox</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection>
          <SidebarHeading>Algorithms</SidebarHeading>
          {algorithms.map((algorithm) => (
            <SidebarItem
              key={algorithm.href}
              href={algorithm.href}
              current={pathname === algorithm.href}
            >
              <algorithm.icon className="h-5 w-5" data-slot="icon" />
              <SidebarLabel>{algorithm.name}</SidebarLabel>
            </SidebarItem>
          ))}
        </SidebarSection>

        <SidebarSection>
          <SidebarHeading>History</SidebarHeading>
          <SidebarItem href="/history" current={pathname === "/history"}>
            <ClockIcon className="h-5 w-5" data-slot="icon" />
            <SidebarLabel>Recent Algo Runs</SidebarLabel>
          </SidebarItem>
        </SidebarSection>

        <SidebarSpacer />

        <SidebarSection>
          <SidebarItem
            href="https://github.com/bgdnandrew/quant-sandbox"
            target="_blank"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              data-slot="icon"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <SidebarLabel>Source Code</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>

      <SidebarFooter>
        <SidebarSection>
          {/* Links */}
          <div className="flex flex-col gap-2 mb-4">
            <SidebarItem href="https://x.com/bgdnandrew" target="_blank">
              <svg
                className="h-5 w-5"
                data-slot="icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <SidebarLabel>@bgdnandrew</SidebarLabel>
            </SidebarItem>

            <SidebarItem href="https://bgdnandrew.com" target="_blank">
              <svg
                className="h-5 w-5"
                data-slot="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <SidebarLabel>bgdnandrew.com</SidebarLabel>
            </SidebarItem>

            <SidebarItem href="https://orientedplatforms.com" target="_blank">
              <svg
                className="h-5 w-5"
                data-slot="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
                <path d="M12 11v6" />
                <path d="M8 11v3" />
                <path d="M16 11v3" />
              </svg>
              <SidebarLabel>Oriented Platforms</SidebarLabel>
            </SidebarItem>
          </div>

          <div className="mt-4 border-t border-zinc-800/50 pt-4">
            <div className="px-2 text-xs text-zinc-500 dark:text-zinc-400">
              Version 1.0.0
            </div>
            <div className="px-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              © {new Date().getFullYear()} Oriented Platforms LLC
            </div>
          </div>
        </SidebarSection>
      </SidebarFooter>
    </SidebarRoot>
  );
}
