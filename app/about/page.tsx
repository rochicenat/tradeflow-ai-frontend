'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Globe, Activity } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              TradeFlow AI
            </span>
          </Link>
          <Link 
            href="/"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-white mb-8">About TradeFlow AI</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                TradeFlow AI is an advanced AI-powered data analytics platform designed for market researchers, 
                quantitative analysts, and students. Our mission is to democratize access to professional-grade 
                chart analysis tools through cutting-edge artificial intelligence technology.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white mb-4">What We Do</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                We provide instant, AI-powered technical analysis of market charts for educational and research purposes. 
                Our platform uses advanced machine learning algorithms to identify:
              </p>
              <ul className="list-disc list-inside text-slate-300 text-lg space-y-2 ml-4">
                <li>Historical price patterns and statistical trends</li>
                <li>Quantitative probability models</li>
                <li>Technical indicator analysis (RSI, MACD, EMA)</li>
                <li>Data visualization and pattern recognition</li>
                <li>Statistical confidence scoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white mb-4">Technology</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Our platform is built on state-of-the-art technology:
              </p>
              <ul className="list-disc list-inside text-slate-300 text-lg space-y-2 ml-4 mt-4">
                <li><strong>AI Engine:</strong> Google Gemini 2.5 Flash for advanced pattern recognition</li>
                <li><strong>Frontend:</strong> Next.js 14 with TypeScript and Tailwind CSS</li>
                <li><strong>Backend:</strong> FastAPI with PostgreSQL database</li>
                <li><strong>Security:</strong> Bank-level SSL/TLS encryption, GDPR compliant</li>
                <li><strong>Infrastructure:</strong> Vercel (frontend) and Railway (backend) for 99.9% uptime</li>
              </ul>
            </section>

            <section className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3">Important Disclaimer</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    <strong>TradeFlow AI is an educational research tool only.</strong> None of the information, 
                    analyses, or insights provided on this platform constitute financial advice, investment recommendations, 
                    or trading signals. All data is provided for educational and research purposes. Users should conduct 
                    their own independent research and consult with qualified financial professionals before making any 
                    financial decisions.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white mb-4">Contact Us</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300 text-lg">
                  <Mail className="w-6 h-6 text-orange-500" />
                  <div>
                    <strong>Support:</strong>{' '}
                    <a href="mailto:support@tradeflowai.cloud" className="text-orange-500 hover:underline">
                      support@tradeflowai.cloud
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-lg">
                  <Mail className="w-6 h-6 text-orange-500" />
                  <div>
                    <strong>Privacy:</strong>{' '}
                    <a href="mailto:privacy@tradeflowai.cloud" className="text-orange-500 hover:underline">
                      privacy@tradeflowai.cloud
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-lg">
                  <Globe className="w-6 h-6 text-orange-500" />
                  <div>
                    <strong>Website:</strong>{' '}
                    <a href="https://tradeflowai.cloud" className="text-orange-500 hover:underline">
                      tradeflowai.cloud
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white mb-4">Privacy & Security</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                We take data privacy seriously. All uploaded charts are processed instantly and permanently deleted 
                after analysis. We never store your research data or share it with third parties. For more information, 
                please read our{' '}
                <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white mb-4">Terms & Policies</h2>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/terms" 
                  className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition border border-slate-700"
                >
                  Terms of Service
                </Link>
                <Link 
                  href="/privacy" 
                  className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition border border-slate-700"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/refund" 
                  className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition border border-slate-700"
                >
                  Refund Policy
                </Link>
              </div>
            </section>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-400">
            © 2026 TradeFlow AI. All rights reserved. Educational research tool only.
          </p>
        </div>
      </footer>
    </div>
  );
}
