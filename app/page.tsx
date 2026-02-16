'use client'

import Link from 'next/link'
import Logo from '../components/Logo'
import { BarChart3, TrendingUp, Shield, Zap } from 'lucide-react'

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

      {/* CTA */}
      <section className="py-20 px-4">
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
