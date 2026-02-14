'use client';
import { IconLogo } from '@/components/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
          <IconLogo />
          <Link 
            href="/"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 max-w-4xl"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          About TradeFlow AI
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              TradeFlow AI democratizes professional-grade technical analysis by leveraging advanced 
              artificial intelligence. We empower traders of all levels with instant, data-driven 
              insights to make informed trading decisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What We Do
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              TradeFlow AI analyzes trading charts using cutting-edge AI technology powered by 
              Google Gemini. Our platform provides:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Real-time technical analysis of trading charts</li>
              <li>AI-powered trend detection and pattern recognition</li>
              <li>Confidence scoring and risk assessment</li>
              <li>Support/resistance level identification</li>
              <li>Actionable trading signals (BUY/SELL/HOLD)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Technology
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Built with modern, scalable infrastructure:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>AI Engine:</strong> Google Gemini 2.5 Flash for advanced chart analysis</li>
              <li><strong>Frontend:</strong> Next.js 14 with TypeScript for optimal performance</li>
              <li><strong>Backend:</strong> FastAPI with PostgreSQL for reliable data processing</li>
              <li><strong>Security:</strong> JWT authentication, encrypted data transmission</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Why Choose TradeFlow AI?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚡ Instant Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Get AI-powered insights in seconds, not hours
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎯 High Accuracy</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Advanced AI trained on millions of chart patterns
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Professional Tools</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Institutional-grade analysis accessible to everyone
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔒 Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Your data is encrypted and never shared
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Support</h3>
                  <a 
                    href="mailto:support@tradeflowai.cloud"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    support@tradeflowai.cloud
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Live Chat</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Available 9 AM - 6 PM GMT
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Website</h3>
                  <a 
                    href="https://tradeflowai.cloud"
                    className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
                  >
                    tradeflowai.cloud
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Ready to Start Trading Smarter?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of traders using AI-powered analysis to improve their trading decisions.
            </p>
            <div className="flex gap-4">
              <Link
                href="/signup"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors border border-gray-300 dark:border-gray-600"
              >
                View Pricing
              </Link>
            </div>
          </section>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 TradeFlow AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Link href="/refund" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Refund</Link>
                Privacy
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
