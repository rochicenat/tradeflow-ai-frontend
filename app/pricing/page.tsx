'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Activity } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Pro',
      price: 9.99,
      analyses: 50,
      features: [
        'AI-powered chart analysis',
        '50 analyses per month',
        'Swing & Scalp trading',
        'Advanced pattern recognition',
        'Statistical analysis',
        'Priority support'
      ],
      popular: true,
      link: 'https://tradeflowai.lemonsqueezy.com/checkout/buy/60423ba8-053a-4d04-a924-69b6aaae30e3'
    },
    {
      name: 'Premium',
      price: 19.99,
      analyses: 'Unlimited',
      features: [
        'Everything in Pro',
        'Unlimited analyses',
        'Priority AI processing',
        'Advanced insights',
        'Early access to features',
        '24/7 priority support'
      ],
      popular: false,
      link: 'https://tradeflowai.lemonsqueezy.com/checkout/buy/47621ebf-7c5e-4b6e-bbc9-d6bee626b2d4'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              TradeFlow AI
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-300 hover:text-white transition">Login</Link>
            <Link href="/signup" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">Sign Up</Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-slate-400">Choose the plan that fits your research needs</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-8 relative ${
                plan.popular
                  ? 'bg-orange-500/20 border-2 border-orange-500/50'
                  : 'bg-slate-900/50 border border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-bold text-white">${plan.price}</span>
                <span className="text-slate-400">/month</span>
              </div>
              <div className="text-slate-300 mb-6">
                <span className="font-semibold">{plan.analyses}</span> analyses/month
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-3 rounded-lg font-semibold text-center transition ${
                  plan.popular
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                Get {plan.name}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="text-2xl">⚠️</span>
            <h3 className="text-xl font-bold text-yellow-400">Educational Tool Disclaimer</h3>
          </div>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            TradeFlow AI is a research and educational AI data analytics platform. None of the information provided is financial or investment advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
