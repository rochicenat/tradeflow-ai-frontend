import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "TradeFlow AI - AI-Powered Trading & Chart Analysis Tool",
  description: "Analyze trading charts instantly with AI. Get entry points, stop loss, take profit levels for swing and scalp trading. Powered by Google Gemini.",
  keywords: ["trading analysis", "AI trading", "chart analysis", "swing trading", "scalp trading", "technical analysis", "trading signals"],
  authors: [{ name: "TradeFlow AI" }],
  creator: "TradeFlow AI",
  metadataBase: new URL("https://tradeflowai.cloud"),
  alternates: {
    canonical: "https://tradeflowai.cloud",
  },
  openGraph: {
    type: "website",
    url: "https://tradeflowai.cloud",
    title: "TradeFlow AI - AI-Powered Trading & Chart Analysis Tool",
    description: "Analyze trading charts instantly with AI. Get entry points, stop loss, take profit levels for swing and scalp trading.",
    siteName: "TradeFlow AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TradeFlow AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeFlow AI - AI-Powered Trading & Chart Analysis Tool",
    description: "Analyze trading charts instantly with AI. Get entry points, stop loss and take profit levels.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "loFLu7ez9F9h8aYTJU0_yxZ014bjHtCxwUnmyE-sA94",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="loFLu7ez9F9h8aYTJU0_yxZ014bjHtCxwUnmyE-sA94" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
