'use client';

import { IconLogo } from '@/components/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
          <IconLogo />
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            
            <Link 
              href="/pricing"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors"
            >
              Pricing
            </Link>
            
            <Link 
              href="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            AI-Powered Trading Chart Analysis
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Upload your trading charts and get instant, AI-powered insights. 
            Identify trends, support/resistance levels, and trading opportunities in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Link 
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Start Analyzing Free
            </Link>
            <a 
              href="#how-it-works"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:shadow-md"
            >
              See How It Works
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">Why TradeFlow AI?</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Powerful features to enhance your trading</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-blue-100 dark:border-gray-700 cursor-pointer transition-colors duration-300"
            >
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">AI-Powered Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced AI analyzes your charts and identifies patterns, trends, and key levels instantly.
              </p>
            </motion.div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-purple-100 dark:border-gray-700 cursor-pointer transition-colors duration-300"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get comprehensive analysis in seconds. No more manual chart reading.
              </p>
            </motion.div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-green-100 dark:border-gray-700 cursor-pointer transition-colors duration-300"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Detailed Insights</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Support/resistance zones, trend analysis, breakout predictions, and more.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">How It Works</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Simple 3-step process</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Upload Your Chart</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Drag and drop or select your trading chart screenshot
              </p>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">AI Analyzes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our advanced AI processes your chart in seconds
              </p>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Get Insights</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive detailed analysis with actionable insights
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Level Up Your Trading?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of traders using AI to make better decisions
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/signup"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 inline-block shadow-lg"
            >
              Start Free Today
            </Link>
            <Link 
              href="/pricing"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all inline-block"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <IconLogo />
          <p className="text-gray-400 text-sm mt-4">
            © 2026 TradeFlow AI. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Educational purposes only. Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
