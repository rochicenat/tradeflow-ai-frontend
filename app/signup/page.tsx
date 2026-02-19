'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

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
      const response = await fetch(
        'https://tradeflow-ai-backend-production.up.railway.app/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ name, email, password })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed');
      }

      // ✅ EMAIL DOĞRULAMA YOK → DİREKT DASHBOARD
      localStorage.setItem('token', data.access_token);
      router.replace('/dashboard');
    } catch (err: any) {
      alert(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8"
      >
        <Link href="/" className="flex items-center gap-2 mb-6">
          <Activity className="w-8 h-8 text-orange-500" />
          <span className="text-xl font-bold text-white">TradeFlow AI</span>
        </Link>

        <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            placeholder="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full p-3 rounded bg-[#1A1A1A] text-white border border-[#252525]"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-[#1A1A1A] text-white border border-[#252525]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-[#1A1A1A] text-white border border-[#252525]"
          />

          <button
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded text-white font-semibold"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-slate-400 text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-500">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
