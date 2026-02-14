'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Activity } from 'lucide-react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      monthlyPrice: 0,
      annualPrice: 0,
      analyses: 3,
      features: [
        'Basic AI analysis',
        'Pattern recognition',
        'Historical data insights',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      analyses: 50,
      features: [
        'Everything in Free',
        '50 analyses per month',
        'Advanced probability models',
        'Statistical analysis',
        'Quantitative insights',
        'Data visualization',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Premium',
      monthlyPrice: 19.99,
      annualPrice: 199.99,
      analyses: 'Unlimited',
      features: [
        'Everything in Pro',
        'Unlimited analyses',
        'API access',
        'Custom models',
        'Real-time data processing',
        'Research dashboard',
        '24/7 priority support',
        'Early access to features'
      ]
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return '$0';
    return isAnnual ? `$${plan.annualPrice}` : `$${plan.monthlyPrice}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.annualPrice;
    return `Save $${savings.toFixed(0)}/year`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">
              DataFlow Analytics
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-300 hover:text-white transition">
              Login
            </Link>
            <Link href="/signup" className="bg-gradient-to-r bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Choose the plan that fits your research needs
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-4 bg-slate-900/50 border border-slate-800 rounded-full p-2">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  !isAnnual 
                    ? 'bg-gradient-to-r bg-orange-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full font-semibold transition relative ${
                  isAnnual 
                    ? 'bg-gradient-to-r bg-orange-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-8 relative ${
                plan.popular
                  ? 'bg-gradient-to-b bg-orange-500/20 border-2 border-orange-500/50 scale-105'
                  : 'bg-slate-900/50 border border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-bold text-white">{getPrice(plan)}</span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-slate-400">/{isAnnual ? 'year' : 'month'}</span>
                  )}
                </div>
                {isAnnual && plan.monthlyPrice > 0 && (
                  <div className="text-green-400 text-sm font-semibold">
                    💰 {getSavings(plan)}
                  </div>
                )}
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

              <Link
                href="/signup"
                className={`block w-full py-3 rounded-lg font-semibold text-center transition ${
                  plan.popular
                    ? 'bg-gradient-to-r bg-orange-500 text-white hover:from-blue-700 hover:to-cyan-700'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {plan.monthlyPrice === 0 ? 'Get Started' : `Get ${plan.name}`}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
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
            DataFlow Analytics is a research and educational AI data analytics platform. None of the information provided is financial or investment advice. All analyses are for educational and research purposes only.
          </p>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-slate-400 text-sm"
        >
          <p>All plans include SSL security, GDPR compliance, and 7-day money-back guarantee.</p>
          <p className="mt-2">
            Need help choosing? <Link href="/about" className="text-orange-500 hover:underline">Contact us</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
