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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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

function PromoBanner() {
  return (
    <div style={{
      background: "linear-gradient(90deg, #1a0533 0%, #3b0764 40%, #1a0533 100%)",
      borderBottom: "1px solid rgba(168,85,247,0.3)",
      padding: "10px 16px",
      textAlign: "center",
      fontSize: "14px",
      color: "#e9d5ff",
      letterSpacing: "0.01em",
    }}>
      🎉 Get <strong style={{ color: "#fff" }}>30% off</strong> your first month — use code{" "}
      <span style={{
        background: "rgba(168,85,247,0.25)",
        border: "1px solid rgba(168,85,247,0.5)",
        borderRadius: "6px",
        padding: "2px 8px",
        fontWeight: "700",
        color: "#f0abfc",
        letterSpacing: "0.05em",
      }}>WELCOME30</span>
      {" "}at checkout.
    </div>
  );
}

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
          <PromoBanner />
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
