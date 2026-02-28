'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      onClick={toggleLang}
      className="absolute top-6 right-6 flex items-center gap-1 bg-[#1A1A1A] border border-[#333] text-white text-sm px-3 py-1.5 rounded-lg hover:border-orange-500 transition"
    >
      <span className={lang === 'en' ? 'text-orange-500 font-bold' : 'text-slate-400'}>EN</span>
      <span className="text-slate-600">/</span>
      <span className={lang === 'tr' ? 'text-orange-500 font-bold' : 'text-slate-400'}>TR</span>
    </button>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => { if (searchParams.get('verified') === 'true') setVerified(true); }, [searchParams]);

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
    <div className="min-h-screen bg-black flex relative">
      <LanguageToggle />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Activity className="w-10 h-10 text-orange-500" />
            <span className="text-2xl font-bold text-white">TradeFlow AI</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">{t('login.title')}</h1>
          <p className="text-slate-400 mb-8">{t('login.subtitle')}</p>

          {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}
          {verified && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
              ✓ {lang === 'tr' ? 'E-posta doğrulandı! Giriş yapabilirsiniz.' : 'Email verified! You can now log in.'}
            </div>
          )}

          <button
            onClick={() => window.location.href="https://tradeflow-ai-backend-production.up.railway.app/auth/google"}
            className="w-full flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#222] border border-[#333] text-white py-3 rounded-lg transition font-medium mb-4"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            {lang === 'tr' ? 'Google ile devam et' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#333]"></div>
            <span className="text-slate-500 text-xs">{t('login.or')}</span>
            <div className="flex-1 h-px bg-[#333]"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t('login.email')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full bg-[#1A1A1A] border border-[#252525] rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition"
                  placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t('login.password')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg pl-12 pr-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                />
                <div className="text-right mt-1">
                  <a href="/forgot-password" className="text-orange-500 hover:underline text-sm">{t('login.forgot')}</a>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? (lang === 'tr' ? 'Giriş yapılıyor...' : 'Signing in...') : t('login.button')}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">{t('login.no_account')}{' '}
              <Link href="/signup" className="text-orange-500 hover:text-orange-400 font-semibold">{t('login.signup')}</Link>
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-[#252525]">
            <Link href="/" className="text-slate-400 hover:text-white transition text-sm">
              {lang === 'tr' ? '← Ana sayfaya dön' : '← Back to home'}
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 items-center justify-center p-12">
        <div className="text-center">
          <Activity className="w-32 h-32 text-white mx-auto mb-8 opacity-90" />
          <h2 className="text-4xl font-bold text-white mb-4">
            {lang === 'tr' ? 'Yapay Zeka Destekli Grafik Analizi' : 'AI-Powered Chart Analysis'}
          </h2>
          <p className="text-xl text-white/90 max-w-md mx-auto">
            {lang === 'tr' ? 'Saniyeler içinde profesyonel trading analizi.' : 'Professional trading analysis in seconds.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginPageContent /></Suspense>;
}
