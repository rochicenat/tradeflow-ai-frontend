'use client';
import { getToken } from '@/app/lib/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Activity } from 'lucide-react';

export default function PricingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPlan, setUserPlan] = useState<string>('free');
  const [userEmail, setUserEmail] = useState<string>('');
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      fetch('https://tradeflow-ai-backend-production.up.railway.app/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(r => r.json()).then(d => { setUserPlan(d.plan || 'free'); setUserEmail(d.email || ''); }).catch(() => {});
    }
  }, []);

  const monthlyPrice = 9.99;
  const yearlyPrice = 7.99;
  const yearlyTotal = (yearlyPrice * 12).toFixed(0);

  const features = [
    'Unlimited AI chart analyses',
    'Swing & Scalp trading',
    'Entry, SL & TP levels',
    'Smart Money Concepts (SMC)',
    'Fibonacci & Breakout analysis',
    'Risk assessment & Trade plan',
    'Custom trading parameters',
    'Full analysis history',
  ];

  const buildCheckoutUrl = (baseUrl: string) => {
    if (!userEmail) return baseUrl;
    return `${baseUrl}?checkout%5Bemail%5D=${encodeURIComponent(userEmail)}`;
  };

  const monthlyUrl = buildCheckoutUrl('https://tradeflowai.lemonsqueezy.com/checkout/buy/47621ebf-7c5e-4b6e-bbc9-d6bee626b2d4');
  const yearlyUrl = buildCheckoutUrl('https://tradeflowai.lemonsqueezy.com/checkout/buy/60423ba8-053a-4d04-a924-69b6aaae30e3');

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
              <Link href="/dashboard" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-slate-300 hover:text-white transition">Login</Link>
                <Link href="/signup" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-400">One plan. Everything you need.</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center gap-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${billing === 'monthly' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${billing === 'yearly' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>
              Yearly
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-bold">-20%</span>
            </button>
          </div>
        </div>

        {/* Plan Card */}
        <motion.div
          key={billing}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-8 relative bg-orange-500/10 border-2 border-orange-500/50">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
            Most Popular
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-bold text-white">
              ${billing === 'monthly' ? monthlyPrice : yearlyPrice}
            </span>
            <span className="text-slate-400">/month</span>
          </div>

          {billing === 'yearly' && (
            <div className="text-green-400 text-sm mb-1 font-medium">
              Billed ${yearlyTotal}/year — save ${((monthlyPrice - yearlyPrice) * 12).toFixed(0)}/year
            </div>
          )}

          <div className="text-slate-400 text-sm mb-8">Unlimited analyses</div>

          <ul className="space-y-3 mb-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>

          {userPlan === 'pro' ? (
            <div className="w-full py-3 rounded-lg font-semibold text-center bg-green-500/20 text-green-400 border border-green-500/30">
              ✓ Current Plan
            </div>
          ) : (
            <button
              onClick={() => {
                if (!isLoggedIn) { window.location.href = '/login?redirect=pricing'; return; }
                window.location.href = billing === 'monthly' ? monthlyUrl : yearlyUrl;
              }}
              className="block w-full py-3 rounded-lg font-semibold text-center bg-orange-500 text-white hover:bg-orange-600 transition text-lg">
              Get Pro — ${billing === 'monthly' ? `${monthlyPrice}/mo` : `${yearlyPrice}/mo`}
            </button>
          )}
        </motion.div>

        <div className="mt-16 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">⚠️ Educational Tool Disclaimer</h3>
          <p className="text-slate-300 max-w-3xl mx-auto">
            TradeFlow AI is a research and educational AI data analytics platform. None of the information provided is financial or investment advice.
          </p>
        </div>
      </div>
    </div>
  );
}
