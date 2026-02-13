'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconLogo } from '@/components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconLogo className="w-8 h-8 text-blue-500" />
            
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-300 hover:text-white transition">Features</Link>
            <Link href="#how-it-works" className="text-slate-300 hover:text-white transition">How It Works</Link>
            <Link href="/pricing" className="text-slate-300 hover:text-white transition">Pricing</Link>
            <Link href="/login" className="text-slate-300 hover:text-white transition">Login</Link>
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition">
              Start Free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-blue-400 text-sm font-semibold">🚀 AI-Powered Technical Analysis</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Professional Chart Analysis
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                In Seconds
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload any trading chart and get instant AI-powered technical analysis with support/resistance levels, breakout zones, and actionable trading strategies.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition shadow-lg shadow-blue-500/50">
                Get Started Free
              </Link>
              <Link href="#how-it-works" className="bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-700 transition border border-slate-700">
                See How It Works
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.2%</div>
              <div className="text-slate-400">Analysis Accuracy</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-cyan-400 mb-2">&lt;3s</div>
              <div className="text-slate-400">Average Response Time</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-slate-400">AI Availability</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Professional Analysis Tools
            </h2>
            <p className="text-xl text-slate-400">Everything you need for informed trading decisions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Support & Resistance',
                description: 'AI identifies critical price levels with precision, helping you spot entry and exit zones instantly.'
              },
              {
                icon: '🚀',
                title: 'Breakout Detection',
                description: 'Get alerted to potential bullish and bearish breakout scenarios with price targets and conditions.'
              },
              {
                icon: '📈',
                title: 'Technical Indicators',
                description: 'RSI, MACD, EMA analysis automatically extracted from your charts with actionable insights.'
              },
              {
                icon: '💡',
                title: 'Trading Strategies',
                description: 'Receive complete trade setups including entry points, stop loss, and profit targets.'
              },
              {
                icon: '⚡',
                title: 'Instant Results',
                description: 'Upload and analyze in under 3 seconds. No manual chart reading required.'
              },
              {
                icon: '🎯',
                title: 'Confidence Scoring',
                description: 'Every analysis includes a confidence score so you know how reliable the signals are.'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-blue-500/50 transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-400">Three simple steps to professional analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Upload Your Chart',
                description: 'Drag and drop any trading chart screenshot from TradingView, Binance, or any platform.',
                icon: '📤'
              },
              {
                step: '02',
                title: 'AI Analyzes',
                description: 'Our advanced AI model processes the chart using technical analysis algorithms in real-time.',
                icon: '🤖'
              },
              {
                step: '03',
                title: 'Get Insights',
                description: 'Receive detailed analysis with trend direction, key levels, and actionable trading strategies.',
                icon: '✅'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-7xl font-bold text-blue-500/20 mb-4">{item.step}</div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-400 mb-12">Start free, upgrade when you need more</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Free', price: '$0', analyses: '3', features: ['Basic analysis', 'Support/Resistance', 'Trend detection'] },
              { name: 'Pro', price: '$9.99', analyses: '50', features: ['Everything in Free', 'Breakout detection', 'Trading strategies', 'Priority support'], highlight: true },
              { name: 'Premium', price: '$19.99', analyses: 'Unlimited', features: ['Everything in Pro', 'Unlimited analyses', 'API access', 'Custom indicators'] }
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-xl p-8 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-blue-600 to-cyan-600 scale-105'
                    : 'bg-slate-900 border border-slate-800'
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-5xl font-bold text-white mb-1">{plan.price}</div>
                <div className="text-slate-300 mb-6">{plan.analyses} analyses/month</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="text-slate-300 flex items-center gap-2">
                      <span className="text-green-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full py-3 rounded-lg font-semibold transition ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-slate-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Trade Smarter?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of traders using AI-powered analysis
          </p>
          <Link href="/signup" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition">
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IconLogo className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">TradeFlow AI</span>
            </div>
            <p className="text-slate-400 text-sm">Professional trading analysis powered by AI</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="text-slate-400 hover:text-white text-sm">Pricing</Link></li>
              <li><Link href="#features" className="text-slate-400 hover:text-white text-sm">Features</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-slate-400 hover:text-white text-sm">About</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-white text-sm">Terms</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-white text-sm">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="mailto:support@tradeflowai.cloud" className="text-slate-400 hover:text-white text-sm">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © 2026 TradeFlow AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
