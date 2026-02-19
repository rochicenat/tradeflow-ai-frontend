'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      alert('Please accept Terms & Privacy Policy');
      return;
    }

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

      // ✅ DİREKT GİRİŞ
      localStorage.setItem('token', data.access_token);
      router.replace('/dashboard');
    } catch (err: any) {
      alert(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Visual */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Activity className="w-32 h-32 text-white mx-auto mb-8 opacity-90" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Your Free Trial
          </h2>
          <p className="text-xl text-white/90 max-w-md mx-auto">
            AI-powered chart analysis in seconds.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Activity className="w-10 h-10 text-orange-500" />
            <span className="text-2xl font-bold text-white">TradeFlow AI</span>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400 mb-8">
            Start analyzing charts with AI today
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            <Input icon={<UserIcon />} placeholder="Full Name" value={name} onChange={setName} />
            <Input icon={<Mail />} placeholder="Email" value={email} onChange={setEmail} type="email" />
            <Input icon={<Lock />} placeholder="Password" value={password} onChange={setPassword} type="password" />
            <Input icon={<Lock />} placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} type="password" />

            <div className="flex items-start gap-3 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
              />
              <span>
                I agree to the{' '}
                <Link href="/terms" className="text-orange-500 underline">Terms</Link> and{' '}
                <Link href="/privacy" className="text-orange-500 underline">Privacy Policy</Link>
              </span>
            </div>

            <button
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? 'Creating...' : 'Create Account'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function Input({ icon, placeholder, value, onChange, type = 'text' }: any) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full bg-[#1A1A1A] border border-[#252525] rounded-lg pl-12 pr-4 py-3 text-white focus:border-orange-500 outline-none"
      />
    </div>
  );
}
