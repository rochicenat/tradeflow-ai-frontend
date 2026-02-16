'use client'

import Link from 'next/link'
import Logo from '../components/Logo'
import { BarChart3, TrendingUp, Shield, Zap, ChevronDown, Upload, Brain, LineChart } from 'lucide-react'
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

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">
              Upload any chart screenshot and get instant AI-powered analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl font-bold z-10">
                1
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 pt-12 hover:border-orange-500/50 transition-all">
                <div className="mb-6 flex justify-center">
                  <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700">
                    <Upload className="w-16 h-16 text-gray-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload</h3>
                <p className="text-gray-400 text-sm">Drop any chart screenshot from any platform or timeframe</p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl font-bold z-10">
                2
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 pt-12 hover:border-orange-500/50 transition-all">
                <div className="mb-6 flex justify-center">
                  <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="relative">
                      <Brain className="w-16 h-16 text-orange-500 animate-pulse" />
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyze</h3>
                <p className="text-gray-400 text-sm">AI identifies patterns, trends, and key levels in seconds</p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl font-bold z-10">
                3
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 pt-12 hover:border-orange-500/50 transition-all">
                <div className="mb-6 flex justify-center">
                  <div className="w-full h-48 bg-gradient-to-br from-green-900/20 to-red-900/20 rounded-lg flex items-center justify-center border border-gray-700 relative overflow-hidden">
                    <LineChart className="w-16 h-16 text-orange-500" />
                    <div className="absolute top-2 right-2 bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded border border-orange-500/50">PATTERN</div>
                    <div className="absolute bottom-2 right-2 bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/50">DATA</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
                <p className="text-gray-400 text-sm">Receive detailed statistical analysis with pattern recognition and data visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-orange-500 font-semibold mb-2">TESTIMONIALS</p>
            <h2 className="text-4xl font-bold">Trusted by Analysts Worldwide</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TestimonialCard
              initials="SM"
              name="Sarah Mitchell"
              role="Market Researcher"
              rating={5}
              text="The pattern recognition feature saves me hours of manual chart analysis. I can now process 10x more data points in my research."
            />
            <TestimonialCard
              initials="MC"
              name="Michael Chen"
              role="Data Analyst"
              rating={5}
              text="Been analyzing charts for 5 years. This AI spotted correlations I completely missed. Game-changer for systematic research."
            />
            <TestimonialCard
              initials="JR"
              name="Jennifer Rodriguez"
              role="Financial Researcher"
              rating={5}
              text="Started using this for my thesis on market behavior patterns. The statistical insights are incredibly detailed and well-structured."
            />
            <TestimonialCard
              initials="AT"
              name="Alex Thompson"
              role="Quantitative Analyst"
              rating={5}
              text="The speed is incredible. Upload a chart, get comprehensive pattern analysis in under 3 seconds. Saves hours every week."
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
      <footer className="border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  TradeFlow
                </span>
                <span className="text-2xl font-light text-gray-400">AI</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                AI-powered market analysis platform for researchers and analysts
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Analysis Tools */}
            <div>
              <h3 className="font-semibold text-white mb-4">Analysis Tools</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/signup" className="hover:text-orange-500 transition-colors">AI Chart Analysis</Link></li>
                <li><Link href="/dashboard" className="hover:text-orange-500 transition-colors">Pattern Recognition</Link></li>
                <li><Link href="/pricing" className="hover:text-orange-500 transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Get Started */}
            <div>
              <h3 className="font-semibold text-white mb-4">Get Started</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/signup" className="hover:text-orange-500 transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-orange-500 transition-colors">Login</Link></li>
                <li><Link href="/pricing" className="hover:text-orange-500 transition-colors">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-orange-500 transition-colors">About</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-orange-500 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-xs text-gray-500 text-center max-w-4xl mx-auto">
              Market analysis involves significant risk. TradeFlow AI provides AI-powered analysis tools for educational and research purposes only and does not constitute financial advice. Past patterns do not guarantee future results. Users are responsible for their own decisions and should consult with qualified financial advisors before making any decisions.
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <div>© 2024 TradeFlow AI. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-orange-500 transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms</Link>
              <Link href="/refund" className="hover:text-orange-500 transition-colors">Refund</Link>
            </div>
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

function TestimonialCard({ initials, name, role, rating, text }: { 
  initials: string; 
  name: string; 
  role: string; 
  rating: number; 
  text: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-orange-500/50 transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-white">
          {initials}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-400">{role}</div>
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-4 h-4 fill-orange-500" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-400 text-sm">&ldquo;{text}&rdquo;</p>
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
