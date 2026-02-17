import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BuildMind | Custom Internal Tools in 48 Hours",
  description:
    "We design and build small internal apps that automate one painful workflow. No subscriptions, no bloated software. Get a working prototype in 48 hours.",
  keywords: [
    "internal tools",
    "business automation",
    "custom dashboard",
    "AI tools",
    "workflow automation",
  ],
  openGraph: {
    title: "BuildMind | Custom Internal Tools in 48 Hours",
    description:
      "Stop doing repetitive work. Get a private AI-powered tool built for your business in 48 hours.",
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
