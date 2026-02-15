'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconLogo } from '@/components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconLogo className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-white">TradeFlow AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-300 hover:text-white transition">Features</Link>
            <Link href="#how-it-works" className="text-slate-300 hover:text-white transition">How It Works</Link>
            <Link href="/pricing" className="text-slate-300 hover:text-white transition">Pricing</Link>
            <Link href="/login" className="text-slate-300 hover:text-white transition">Login</Link>
            <Link href="/signup" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition">
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
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-orange-500/20 rounded-full">
              <span className="text-orange-500 text-sm font-semibold">🚀 AI-Powered Data Analytics</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Professional Chart Analysis
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                In Seconds
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload any market chart and get instant AI-powered technical analysis with historical patterns, statistical probability, and quantitative insights for educational research.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-blue-500/50">
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
              <div className="text-4xl font-bold text-orange-500 mb-2">99.2%</div>
              <div className="text-slate-400">Pattern Recognition Accuracy</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">&lt;3s</div>
              <div className="text-slate-400">Average Analysis Time</div>
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
              Professional Data Analytics Tools
            </h2>
            <p className="text-xl text-slate-400">Everything you need for market research and pattern analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Historical Pattern Analysis',
                description: 'AI identifies critical price patterns and statistical trends with precision, helping you understand market structure.'
              },
              {
                icon: '🚀',
                title: 'Probability Modeling',
                description: 'Get statistical probability models for potential market scenarios with quantitative data analysis.'
              },
              {
                icon: '📈',
                title: 'Technical Indicators',
                description: 'RSI, MACD, EMA analysis automatically extracted from your charts with actionable data insights.'
              },
              {
                icon: '💡',
                title: 'Data Visualization',
                description: 'Comprehensive visual analysis including data patterns, probability zones, and research insights.'
              },
              {
                icon: '⚡',
                title: 'Instant Results',
                description: 'Upload and analyze in under 3 seconds. No manual chart reading required.'
              },
              {
                icon: '🎯',
                title: 'Confidence Scoring',
                description: 'Every analysis includes a statistical confidence score based on historical data patterns.'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-orange-500/50 transition"
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
            <p className="text-xl text-slate-400">Three simple steps to professional data analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Upload Your Chart',
                description: 'Drag and drop any market chart screenshot from TradingView, data platforms, or any source.',
                icon: '📤'
              },
              {
                step: '02',
                title: 'AI Analyzes',
                description: 'Our advanced AI model processes the chart using quantitative analysis algorithms and historical pattern recognition.',
                icon: '🤖'
              },
              {
                step: '03',
                title: 'Get Insights',
                description: 'Receive detailed data analysis with pattern probabilities, statistical levels, and research insights for educational purposes.',
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
                <div className="text-7xl font-bold text-orange-500/20 mb-4">{item.step}</div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Researchers Worldwide
            </h2>
            <p className="text-xl text-slate-400">See what our users are saying</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Miller",
                role: "Data Analyst",
                avatar: "SM",
                rating: 5,
                text: "Incredible pattern recognition! The AI spotted historical correlations I completely missed in my market research."
              },
              {
                name: "Mike Chen",
                role: "Quantitative Researcher",
                avatar: "MC",
                rating: 5,
                text: "Been analyzing data for 5 years. This tool's statistical probability models are exceptionally accurate for research."
              },
              {
                name: "Jennifer Rodriguez",
                role: "Market Analyst",
                avatar: "JR",
                rating: 5,
                text: "Perfect educational tool. The AI analysis helped me understand complex market patterns for my thesis research."
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-orange-500/50 transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-600 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-400 mb-12">Start free, upgrade when you need more</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Free', price: '$0', analyses: '3', features: ['Basic analysis', 'Pattern recognition', 'Historical data'] },
              { name: 'Pro', price: '$9.99', analyses: '50', features: ['Everything in Free', 'Advanced probability models', 'Quantitative insights', 'Priority support'], highlight: true },
              { name: 'Premium', price: '$19.99', analyses: 'Unlimited', features: ['Everything in Pro', 'Unlimited analyses', 'API access', 'Custom models'] }
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-xl p-8 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-orange-500 to-orange-600 scale-105'
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
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-400">Everything you need to know</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How accurate is the AI analysis?",
                a: "Our AI model is trained on millions of historical market patterns and achieves 99.2% accuracy in technical pattern recognition for research purposes. This is an educational data analytics tool, not financial advice."
              },
              {
                q: "What data sources does TradeFlow AI support?",
                a: "TradeFlow AI processes charts from any source - crypto, stocks, forex, commodities. Simply upload a chart screenshot from TradingView, data platforms, or any visualization tool."
              },
              {
                q: "How fast are the analysis results?",
                a: "Most analyses complete in under 3 seconds. Our AI processes your chart instantly and provides detailed historical patterns, probability zones, and quantitative insights."
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes! Cancel anytime from your dashboard. We offer a 7-day money-back guarantee for all paid plans. No questions asked."
              },
              {
                q: "Do I need data analysis experience to use this?",
                a: "No! TradeFlow AI is designed for both beginners and professional researchers. The AI explains each analysis in clear terms with educational insights."
              },
              {
                q: "What's the difference between Pro and Premium?",
                a: "Pro gives you 50 analyses/month, perfect for regular research. Premium offers unlimited analyses + API access + advanced models, ideal for professional researchers."
              },
              {
                q: "Is my data secure?",
                a: "Absolutely. We use bank-level encryption (SSL/TLS), never store your research data permanently, and are fully GDPR compliant. Charts are analyzed and immediately deleted."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and PayPal through our secure payment processor. All transactions are encrypted."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <details className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-white text-lg list-none">
                    <span>{faq.q}</span>
                    <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-slate-400 leading-relaxed">{faq.a}</p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready for Smarter Data Analysis?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of researchers using AI-powered analytics
          </p>
          <Link href="/signup" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition">
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-6 bg-yellow-500/10 border-t border-yellow-500/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-3xl">⚠️</span>
            <h3 className="text-2xl font-bold text-yellow-400">Important Disclaimer</h3>
          </div>
          <p className="text-xl text-white font-semibold max-w-4xl mx-auto leading-relaxed">
            None of the information provided on this platform is financial or investment advice. This is strictly an educational AI data analytics tool for market research and pattern analysis purposes only.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IconLogo className="w-6 h-6 text-orange-500" />
              <span className="text-xl font-bold text-white">TradeFlow AI</span>
            </div>
            <p className="text-slate-400 text-sm">Professional data analytics powered by AI</p>
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
              <li><Link href="/refund" className="text-slate-400 hover:text-white text-sm">Refund</Link></li>
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
          © 2026 TradeFlow AI. All rights reserved. Educational data analytics tool only.
        </div>
      </footer>
    </div>
  );
}
