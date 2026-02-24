'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Invalid credentials');
      localStorage.setItem('token', data.access_token);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Activity className="w-10 h-10 text-orange-500" />
            <span className="text-2xl font-bold text-white">TradeFlow AI</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 mb-8">Sign in to access your dashboard</p>
          {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}

          {/* Google Login */}
          
            href="https://tradeflow-ai-backend-production.up.railway.app/auth/google"
            className="w-full flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#222] border border-[#333] text-white py-3 rounded-lg transition font-medium mb-4"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            Continue with Google
          </a>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#333]"></div>
            <span className="text-slate-500 text-xs">or</span>
            <div className="flex-1 h-px bg-[#333]"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full bg-[#1A1A1A] border border-[#252525] rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition"
                  placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full bg-[#1A1A1A] border border-[#252525] rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition"
                  placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">Don't have an account?{' '}
              <Link href="/signup" className="text-orange-500 hover:text-orange-400 font-semibold">Sign up</Link>
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-[#252525]">
            <Link href="/" className="text-slate-400 hover:text-white transition text-sm">← Back to home</Link>
          </div>
        </motion.div>
      </div>
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 items-center justify-center p-12">
        <div className="text-center">
          <Activity className="w-32 h-32 text-white mx-auto mb-8 opacity-90" />
          <h2 className="text-4xl font-bold text-white mb-4">AI-Powered Chart Analysis</h2>
          <p className="text-xl text-white/90 max-w-md mx-auto">Professional trading analysis in seconds.</p>
        </div>
      </div>
    </div>
  );
}
