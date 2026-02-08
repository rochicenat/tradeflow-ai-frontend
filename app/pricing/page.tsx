'use client';

import { IconLogo } from '@/components/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function PricingPage() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) return null;

  const plans = [
    {
      name: 'Free',
      price: 0,
      annualPrice: 0,
      description: 'Perfect for getting started',
      features: [
        '3 chart analyses per month',
        'Basic AI insights',
        'Trend detection',
        'Email support',
      ],
      cta: 'Current Plan',
      popular: false,
    },
    {
      name: 'Pro',
      price: 9.99,
      annualPrice: 99,
      description: 'For serious traders',
      features: [
        '50 chart analyses per month',
        'Advanced AI insights',
        'Pattern recognition',
        'Support & resistance zones',
        'Priority email support',
        'Dark mode',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'Premium',
      price: 19.99,
      annualPrice: 199,
      description: 'For professional traders',
      features: [
        'Unlimited chart analyses',
        'Expert AI insights',
        'Real-time alerts',
        'Portfolio tracking',
        'API access',
        'Priority support 24/7',
        'Early access to features',
      ],
      cta: 'Upgrade to Premium',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
          <Link href="/">
            <IconLogo />
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            {user ? (
              <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Choose the plan that's right for you
            </p>

            {/* Annual Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-semibold ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-semibold ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Annual
                <span className="ml-2 text-green-600 dark:text-green-400">Save 20%</span>
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 transition-all hover:scale-105 ${
                  plan.popular
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {plan.description}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      ${isAnnual ? plan.annualPrice : plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                  {isAnnual && plan.price > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      ${(plan.price * 12).toFixed(2)} billed monthly
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Free' ? '/dashboard' : `/checkout?plan=${plan.name.toLowerCase()}`}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                      : plan.name === 'Free'
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      : 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="max-w-2xl mx-auto text-left space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I cancel anytime?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! You can cancel your subscription at any time. No questions asked.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We accept all major credit cards and debit cards through our secure payment processor.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! You can start with our Free plan and upgrade anytime when you're ready.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
