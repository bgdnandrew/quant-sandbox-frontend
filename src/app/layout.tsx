import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarLayout } from "@/components/base/sidebar-layout";
import { Sidebar } from "@/components/ui/Sidebar";
import { Navbar } from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "QuantSandbox",
  description: "Open Source Quantitative Analysis Platform",

  authors: [{ name: "Bogdan Andrei", url: "https://bgdnandrew.com" }],
  creator: "Bogdan Andrei",
  publisher: "Oriented Platforms",

  metadataBase: new URL("https://quantsandbox.io"),
  alternates: {
    canonical: "/",
  },

  // Social media handles
  twitter: {
    card: "summary_large_image",
    title: "QuantSandbox",
    description: "Open Source Quantitative Analysis Platform",
    creator: "@bgdnandrew",
    // images: ["/quant-sandbox-social-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="font-sans text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <SidebarLayout
          sidebar={<Sidebar/>}
          navbar={<Navbar/>}
          >
          {children}
        </SidebarLayout>
      </body>
    </html>
  );
}
