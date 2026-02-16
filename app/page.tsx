'use client'

import Link from 'next/link'
import Logo from '../components/Logo'
import { BarChart3, TrendingUp, Shield, Zap, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 backdrop-blur-lg bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex gap-4">
              <Link 
                href="/login"
                className="px-4 py-2 text-gray-300 hover:text-orange-500 transition-colors"
              >
                Log In
              </Link>
              <Link 
                href="/signup"
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
            Decode Market Patterns with Advanced AI Technology
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Lightning-fast chart recognition and statistical modeling at your fingertips. Trusted by data analysts, researchers, and institutions seeking objective market intelligence through computational analysis.
          </p>
          <Link 
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105"
          >
            Start Analysis Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose <span className="text-orange-500">TradeFlow AI?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BarChart3 className="w-12 h-12 text-orange-500" />}
              title="Pattern Recognition"
              description="Advanced AI identifies statistical patterns and trends across market data"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-12 h-12 text-orange-500" />}
              title="Research Intelligence"
              description="Data-driven insights for analysts conducting systematic market studies"
            />
            <FeatureCard 
              icon={<Zap className="w-12 h-12 text-orange-500" />}
              title="Instant Analysis"
              description="Upload and analyze charts in seconds with our computational engine"
            />
            <FeatureCard 
              icon={<Shield className="w-12 h-12 text-orange-500" />}
              title="Enterprise Security"
              description="Your data is encrypted and protected with bank-level security standards"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-orange-500 font-semibold mb-2">FAQ</p>
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <FAQItem 
              question="What markets does TradeFlow AI support?"
              answer="TradeFlow AI analyzes charts from all major financial markets including stocks, forex, cryptocurrencies, commodities, and indices. Our AI is trained on diverse market data to recognize patterns across different asset classes."
            />
            <FAQItem 
              question="How does the AI analysis work?"
              answer="Our deep learning models analyze uploaded charts to identify statistical patterns, trend lines, support/resistance levels, and technical indicators. The system processes visual data and compares it against historical market behavior to generate insights."
            />
            <FAQItem 
              question="What's included in each plan?"
              answer="Free plan includes 3 analyses per month. Pro plan offers 50 analyses with priority processing. Premium plan provides unlimited analyses, advanced pattern recognition, and API access for institutional users."
            />
            <FAQItem 
              question="How do I cancel my subscription?"
              answer="You can cancel anytime from your account settings under the Billing tab. Your access continues until the end of your current billing period, and you won't be charged again."
            />
            <FAQItem 
              question="Can I switch between monthly and annual plans?"
              answer="Yes, you can upgrade or downgrade between plans at any time. Changes take effect at your next billing cycle, and we'll prorate any differences in cost."
            />
            <FAQItem 
              question="What payment methods do you accept?"
              answer="We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal. All payments are processed securely through our payment partner."
            />
            <FAQItem 
              question="Do I need technical analysis experience?"
              answer="No prior experience required. Our AI provides clear, structured insights that both beginners and professional analysts can use. The platform is designed to make complex analysis accessible to everyone."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for data-driven intelligence?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join analysts and researchers using AI-powered statistical analysis
          </p>
          <Link 
            href="/pricing"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <div>© 2024 TradeFlow AI. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-orange-500 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms</Link>
            <Link href="/refund" className="hover:text-orange-500 transition-colors">Refund</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-orange-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-400">
          {answer}
        </div>
      )}
    </div>
  )
}
