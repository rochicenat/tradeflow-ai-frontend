'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
function SignupContent() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const PLAN_URLS: Record<string, string> = {
    pro: 'https://tradeflowai.lemonsqueezy.com/checkout/buy/60423ba8-053a-4d04-a924-69b6aaae30e3',
    premium: 'https://tradeflowai.lemonsqueezy.com/checkout/buy/47621ebf-7c5e-4b6e-bbc9-d6bee626b2d4',
  };
  const passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password);
  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword;
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }
    if (!agreed) {
      toast.error('You must accept Terms & Privacy Policy');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://tradeflow-ai-backend-production.up.railway.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Signup failed');
      localStorage.setItem('token', data.access_token);
      toast.success('Account created successfully!');
      const redirectUrl = plan && PLAN_URLS[plan] ? PLAN_URLS[plan] : '/dashboard';
      setTimeout(() => {
        if (plan && PLAN_URLS[plan]) {
          window.location.href = PLAN_URLS[plan];
        } else {
          router.push('/dashboard');
        }
      }, 800);
    } catch (err: any) {
      toast.error(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black flex">
      <Toaster position="top-right" />
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 items-center justify-center p-12">
        <div className="text-white text-center">
          <Activity className="w-24 h-24 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Start Analysis</h2>
          <p className="opacity-90">AI-powered chart analysis in seconds</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Activity className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-white">TradeFlow AI</span>
          </Link>
          {plan && PLAN_URLS[plan] && (
            <div className="mb-4 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 text-sm font-medium">
              🎯 After signup, you'll be redirected to complete your {plan === 'pro' ? 'Pro ($9.99/mo)' : 'Premium ($19.99/mo)'} subscription
            </div>
          )}
          <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>
          {/* Google Signup */}
          
            href="https://tradeflow-ai-backend-production.up.railway.app/auth/google"
            className="w-full flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#222] border border-[#333] text-white py-3 rounded-lg transition font-medium mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#333]"></div>
            <span className="text-slate-500 text-xs">or</span>
            <div className="flex-1 h-px bg-[#333]"></div>
          </div>
          
          {/* Google Signup */}
          
            href="https://tradeflow-ai-backend-production.up.railway.app/auth/google"
            className="w-full flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#222] border border-[#333] text-white py-3 rounded-lg transition font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-[#333]"></div>
            <span className="text-slate-500 text-xs">or</span>
            <div className="flex-1 h-px bg-[#333]"></div>
          </div>
          <form onSubmit={handleSignup} className="space-y-5">
            <input
              required
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#1A1A1A] p-3 rounded text-white"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] p-3 rounded text-white"
            />
            <div className="space-y-1">
              <input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] p-3 rounded text-white"
              />
              {!passwordValid && password.length > 0 && (
                <p className="text-red-500 text-xs px-1">Password must be at least 8 characters, include 1 uppercase and 1 number</p>
              )}
            </div>
            <div className="space-y-1">
              <input
                required
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] p-3 rounded text-white"
              />
              {!passwordsMatch && (
                <p className="text-red-500 text-xs px-1">Passwords do not match</p>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              I accept <Link href="/terms" className="text-orange-500">Terms</Link> & <Link href="/privacy" className="text-orange-500">Privacy</Link>
            </label>
            <button
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded text-white flex justify-center gap-2"
            >
              {loading ? 'Creating...' : 'Sign Up'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
          <div className="mt-6 text-center text-slate-400">
            Already have an account? <Link href="/login" className="text-orange-500">Login</Link>
          </div>
          <div className="mt-6 text-center">
            <Link href="/" className="text-slate-500">← Back to Home</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SignupContent />
    </Suspense>
  );
}
