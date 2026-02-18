import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "Automation Studio | Custom Internal Tools in One Week",
  description:
    "We design and build small internal apps that automate one painful workflow. No subscriptions, no bloated software. Get a working prototype in one week.",
  keywords: [
    "internal tools",
    "business automation",
    "custom dashboard",
    "workflow automation",
    "automation studio",
  ],
  openGraph: {
    title: "Automation Studio | Custom Internal Tools in One Week",
    description:
      "Stop doing repetitive work. Get a custom tool built for your business in one week.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
