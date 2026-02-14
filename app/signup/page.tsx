'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, password, name })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Activity className="w-32 h-32 text-white mx-auto mb-8 opacity-90" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Your Free Trial
          </h2>
          <p className="text-xl text-white/90 max-w-md mx-auto mb-12">
            Get 3 free analyses to experience professional AI-powered data insights.
          </p>
          <div className="space-y-4 text-left max-w-sm mx-auto">
            {[
              'No credit card required',
              'Instant AI analysis in under 3 seconds',
              'Upgrade anytime to unlock more features',
              'Cancel anytime, no questions asked'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">✓</span>
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Activity className="w-10 h-10 text-orange-500" />
            <span className="text-2xl font-bold text-white">DataFlow Analytics</span>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400 mb-8">Start analyzing charts with AI today</p>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-[#252525] rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-[#252525] rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-[#1A1A1A] border border-[#252525] rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-orange-500 hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>
          </p>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-orange-500 hover:text-orange-400 font-semibold">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-[#252525]">
            <Link href="/" className="text-slate-400 hover:text-white transition text-sm">
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
