'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Activity } from 'lucide-react';

export default function PricingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-orange-500">TradeFlow AI</span>
          </Link>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link href="/dashboard" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">Go to Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="text-slate-300 hover:text-white transition">Login</Link>
                <Link href="/signup" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-400">Choose the plan that fits your research needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-8 relative bg-orange-500/20 border-2 border-orange-500/50">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-bold text-white">$9.99</span>
              <span className="text-slate-400">/month</span>
            </div>
            <div className="text-slate-300 mb-6"><span className="font-semibold">50</span> analyses/month</div>
            <ul className="space-y-3 mb-8">
              {['AI-powered chart analysis','50 analyses per month','Swing & Scalp trading','Advanced pattern recognition','Statistical analysis','Priority support'].map((f,i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <a href="https://tradeflowai.lemonsqueezy.com/checkout/buy/60423ba8-053a-4d04-a924-69b6aaae30e3" target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-lg font-semibold text-center bg-orange-500 text-white hover:bg-orange-600 transition">Get Pro</a>
          </div>

          <div className="rounded-2xl p-8 bg-slate-900/50 border border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-bold text-white">$19.99</span>
              <span className="text-slate-400">/month</span>
            </div>
            <div className="text-slate-300 mb-6"><span className="font-semibold">Unlimited</span> analyses/month</div>
            <ul className="space-y-3 mb-8">
              {['Everything in Pro','Unlimited analyses','Priority AI processing','Advanced insights','Early access to features','24/7 priority support'].map((f,i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <a href="https://tradeflowai.lemonsqueezy.com/checkout/buy/47621ebf-7c5e-4b6e-bbc9-d6bee626b2d4" target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-lg font-semibold text-center bg-slate-800 text-white hover:bg-slate-700 transition">Get Premium</a>
          </div>
        </div>

        <div className="mt-16 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">⚠️ Educational Tool Disclaimer</h3>
          <p className="text-slate-300 max-w-3xl mx-auto">TradeFlow AI is a research and educational AI data analytics platform. None of the information provided is financial or investment advice.</p>
        </div>
      </div>
    </div>
  );
}
