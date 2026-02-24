'use client'

import Link from 'next/link'
import Logo from '../components/Logo'
import { BarChart3, TrendingUp, Shield, Zap, ChevronDown, Upload, Brain, LineChart, ArrowRight, Users, Activity, Star, TrendingDown, Timer } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAV */}
      <nav className="border-b border-gray-800 backdrop-blur-lg bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex items-center gap-6">
              <a href="#pricing" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">Pricing</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">How It Works</a>
              <a href="#faq" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">FAQ</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Log In</a>
              <a href="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">Sign Up Free</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-24 pb-32 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">AI-Powered Trading Analysis</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Analyze Any Chart
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              In Seconds With AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your chart screenshot. Get instant AI analysis for <span className="text-white font-semibold">Swing</span> or <span className="text-white font-semibold">Scalp</span> trading — entry, stop loss, take profit and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25">
              Start Free Analysis
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-lg font-semibold transition-all">
              See How It Works
            </a>
          </div>

          {/* Mock chart card */}
          <div className="max-w-3xl mx-auto bg-[#0A0A0A] border border-[#252525] rounded-2xl p-6 text-left shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
                <Activity className="w-3 h-3 text-orange-400" />
                <span className="text-orange-400 text-xs font-medium">⚡ Scalp Trading</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                <div className="text-green-400 text-xs font-semibold mb-1">SIGNAL</div>
                <div className="text-white font-black text-xl">UPTREND</div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                <div className="text-orange-400 text-xs font-semibold mb-1">ENTRY</div>
                <div className="text-white font-black text-xl">$97,240</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                <div className="text-red-400 text-xs font-semibold mb-1">STOP LOSS</div>
                <div className="text-white font-black text-xl">$96,890</div>
              </div>
            </div>
            <div className="bg-[#111] rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-gray-400 text-sm">
                <span className="text-white font-medium">Bullish engulfing pattern</span> detected at key support zone. RSI showing momentum build-up. Risk/Reward: <span className="text-green-400 font-medium">1:2.5</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-4 border-y border-gray-800 bg-gray-900/20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-black text-orange-500 mb-2">
              <AnimatedCounter end={12400} suffix="+" />
            </div>
            <div className="text-gray-400 text-sm font-medium">Charts Analyzed</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-orange-500 mb-2">
              <AnimatedCounter end={3200} suffix="+" />
            </div>
            <div className="text-gray-400 text-sm font-medium">Active Users</div>
          </div>

          <div>
            <div className="text-4xl md:text-5xl font-black text-orange-500 mb-2">
              <AnimatedCounter end={3} suffix="s" />
            </div>
            <div className="text-gray-400 text-sm font-medium">Avg. Analysis Time</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">Features</p>
            <h2 className="text-4xl font-bold">Why Choose <span className="text-orange-500">TradeFlow AI?</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<TrendingUp className="w-8 h-8 text-orange-500" />} title="Swing Trading" description="Multi-day trend analysis with major support/resistance zones and pattern detection" />
            <FeatureCard icon={<Timer className="w-8 h-8 text-orange-500" />} title="Scalp Trading" description="1-15 minute chart precision analysis with tight entry/exit points and momentum signals" />
            <FeatureCard icon={<Zap className="w-8 h-8 text-orange-500" />} title="Instant Results" description="Upload and get complete AI analysis in under 3 seconds with entry, SL and TP levels" />
            <FeatureCard icon={<Shield className="w-8 h-8 text-orange-500" />} title="Any Market" description="Stocks, forex, crypto, commodities — works with charts from any platform" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">Process</p>
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">3 steps to instant AI-powered chart analysis</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', icon: <Upload className="w-10 h-10 text-orange-500" />, title: 'Upload Chart', desc: 'Drag & drop any chart screenshot from TradingView, MT4, Binance or any platform' },
              { num: '02', icon: <Brain className="w-10 h-10 text-orange-500" />, title: 'AI Analyzes', desc: 'Our AI identifies patterns, key levels, momentum signals and trade setup quality' },
              { num: '03', icon: <LineChart className="w-10 h-10 text-orange-500" />, title: 'Get Insights', desc: 'Receive entry price, stop loss, take profit, pattern analysis and risk assessment' },
            ].map((step, i) => (
              <div key={i} className="relative bg-[#0A0A0A] border border-[#252525] hover:border-orange-500/40 rounded-2xl p-8 transition-all group">
                <div className="text-6xl font-black text-orange-500/10 group-hover:text-orange-500/20 transition-all absolute top-4 right-6">{step.num}</div>
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl w-fit mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">Testimonials</p>
            <h2 className="text-4xl font-bold">Trusted by Traders Worldwide</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TestimonialCard initials="SM" name="Sarah M." role="Swing Trader" rating={5} text="The AI spotted a bull flag I completely missed. Entry was perfect, hit TP in 2 days. This tool is insane." />
            <TestimonialCard initials="MC" name="Michael C." role="Scalp Trader" rating={5} text="I scalp BTC daily and this saves me so much time. The momentum signals are surprisingly accurate." />
            <TestimonialCard initials="JR" name="Jennifer R." role="Forex Trader" rating={5} text="Works great on forex charts too. The support/resistance levels are spot on every time." />
            <TestimonialCard initials="AT" name="Alex T." role="Crypto Analyst" rating={5} text="3 seconds to full analysis. I run 20+ charts a day and Pro plan is absolutely worth it." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">FAQ</p>
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <FAQItem question="What markets does TradeFlow AI support?" answer="TradeFlow AI analyzes charts from all major financial markets including stocks, forex, cryptocurrencies, commodities, and indices. Works with any chart screenshot." />
            <FAQItem question="What's the difference between Swing and Scalp analysis?" answer="Swing trading analysis focuses on multi-day trends (2-10 days), wider stop losses and larger targets. Scalp trading analysis focuses on 1-15 minute charts with tight stop losses and quick entries/exits." />
            <FAQItem question="How accurate is the AI analysis?" answer="Our AI achieves ~98% accuracy in pattern recognition. However, all analysis is educational — market conditions can change and no analysis guarantees profits." />
            <FAQItem question="What is included in each plan?" answer="Pro plan offers 50 analyses per month with full Swing & Scalp access. Premium plan provides unlimited analyses with priority processing." />
            <FAQItem question="How do I cancel my subscription?" answer="You can cancel anytime from your account settings. Your access continues until the end of your current billing period." />
            <FAQItem question="Do I need trading experience?" answer="No prior experience required. Our AI provides clear, structured insights with entry, stop loss and take profit levels that anyone can understand." />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">Pricing</p>
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400">Start analyzing charts today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-orange-500/10 border-2 border-orange-500/50 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">Most Popular</div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-black text-white">$9.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <div className="text-gray-400 mb-6">50 analyses/month</div>
              <ul className="space-y-3 mb-8">
                {['50 AI chart analyses/month', 'Swing & Scalp trading', 'Entry, SL & TP levels', 'Pattern recognition', 'Full analysis history', 'Priority support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm"><span className="text-green-400 font-bold">✓</span> {f}</li>
                ))}
              </ul>
              <a href="/signup?plan=pro" className="block w-full py-3 rounded-xl font-bold text-center bg-orange-500 text-white hover:bg-orange-600 transition text-lg">
                Get Pro — $9.99/mo
              </a>
            </div>
            <div className="bg-[#0A0A0A] border border-purple-500/30 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">Best Value</div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-black text-white">$19.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <div className="text-gray-400 mb-6">Unlimited analyses</div>
              <ul className="space-y-3 mb-8">
                {['Unlimited AI analyses', 'Everything in Pro', 'Priority AI processing', 'Advanced insights', 'Early access to features', '24/7 priority support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm"><span className="text-green-400 font-bold">✓</span> {f}</li>
                ))}
              </ul>
              <a href="/signup?plan=premium" className="block w-full py-3 rounded-xl font-bold text-center bg-purple-500 text-white hover:bg-purple-600 transition text-lg">
                Get Premium — $19.99/mo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Ready to Trade <span className="text-orange-500">Smarter?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">Join 3,200+ traders using AI to analyze charts instantly.</p>
            <a href="/signup" className="inline-flex items-center gap-2 px-10 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25">
              Start Analyzing Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">TradeFlow</span>
                <span className="text-2xl font-light text-gray-400">AI</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">AI-powered chart analysis for swing and scalp traders worldwide.</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/aitradeflow/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@aitradeflow" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/signup" className="hover:text-orange-500 transition-colors">AI Chart Analysis</Link></li>
                <li><Link href="#how-it-works" className="hover:text-orange-500 transition-colors">How It Works</Link></li>
                <li><Link href="#pricing" className="hover:text-orange-500 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Account</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/signup" className="hover:text-orange-500 transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-orange-500 transition-colors">Login</Link></li>
                <li><Link href="/dashboard" className="hover:text-orange-500 transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-orange-500 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-xs text-gray-500 text-center max-w-4xl mx-auto">
              TradeFlow AI provides AI-powered analysis tools for educational purposes only. Not financial advice. Trading involves significant risk of loss.
            </p>
            <div className="mt-4 text-center text-gray-400 text-sm">© 2026 TradeFlow AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#252525] hover:border-orange-500/40 transition-all group">
      <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl w-fit mb-4 group-hover:bg-orange-500/20 transition-all">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

function TestimonialCard({ initials, name, role, rating, text }: { initials: string; name: string; role: string; rating: number; text: string }) {
  return (
    <div className="bg-[#0A0A0A] border border-[#252525] rounded-xl p-6 hover:border-orange-500/30 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-white text-sm">{initials}</div>
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-xs text-gray-400">{role}</div>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (<svg key={i} className="w-3 h-3 fill-orange-500" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}
      </div>
      <p className="text-gray-400 text-sm">&ldquo;{text}&rdquo;</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-[#252525] rounded-xl overflow-hidden bg-[#0A0A0A]">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#111] transition-colors">
        <span className="font-semibold">{question}</span>
        <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-6 pb-4 text-gray-400 text-sm">{answer}</div>}
    </div>
  )
}
