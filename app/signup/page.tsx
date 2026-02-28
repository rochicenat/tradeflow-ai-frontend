'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useLanguage } from '@/app/contexts/LanguageContext';

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

function SignupContent() {
  const router = useRouter();
  const { t, lang } = useLanguage();
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

  const passwordValid = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid || password !== confirmPassword) return;
    if (!agreed) {
      toast.error(lang === 'tr' ? 'Şartları ve Gizlilik Politikasını kabul etmelisiniz' : 'You must accept Terms & Privacy Policy');
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
      toast.success(lang === 'tr' ? 'Hesap oluşturuldu! E-postanızı doğrulayın.' : 'Account created! Please check your email to verify.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex relative">
      <Toaster position="top-right" />
      <LanguageToggle />
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 items-center justify-center p-12">
        <div className="text-white text-center">
          <Activity className="w-24 h-24 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            {lang === 'tr' ? 'Analize Başla' : 'Start Analysis'}
          </h2>
          <p className="opacity-90">
            {lang === 'tr' ? 'Saniyeler içinde yapay zeka destekli grafik analizi' : 'AI-powered chart analysis in seconds'}
          </p>
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
              {lang === 'tr'
                ? `Kayıt sonrası ${plan === 'pro' ? 'Pro (₺/ay)' : 'Premium (₺/ay)'} aboneliğinizi tamamlayabilirsiniz`
                : `After signup, you will be redirected to complete your ${plan === 'pro' ? 'Pro ($9.99/mo)' : 'Premium ($19.99/mo)'} subscription`}
            </div>
          )}

          <h1 className="text-3xl font-bold text-white mb-6">{t('signup.title')}</h1>

          <button
            onClick={() => window.location.href="https://tradeflow-ai-backend-production.up.railway.app/auth/google"}
            className="w-full flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#222] border border-[#333] text-white py-3 rounded-lg transition font-medium mb-4"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="G" />
            {lang === 'tr' ? 'Google ile devam et' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#333]"></div>
            <span className="text-slate-500 text-xs">{lang === 'tr' ? 'veya' : 'or'}</span>
            <div className="flex-1 h-px bg-[#333]"></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <input required placeholder={t('signup.name')} value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-[#1A1A1A] p-3 rounded text-white border border-[#252525] focus:border-orange-500 focus:outline-none" />
            <input required type="email" placeholder={t('signup.email')} value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] p-3 rounded text-white border border-[#252525] focus:border-orange-500 focus:outline-none" />
            <div className="space-y-1">
              <input required type="password" placeholder={t('signup.password')} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] p-3 rounded text-white border border-[#252525] focus:border-orange-500 focus:outline-none" />
              {!passwordValid && password.length > 0 && (
                <p className="text-red-500 text-xs px-1">
                  {lang === 'tr' ? 'Min 8 karakter, 1 büyük harf, 1 rakam' : 'Min 8 chars, 1 uppercase, 1 number'}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <input required type="password" placeholder={t('signup.confirm')} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] p-3 rounded text-white border border-[#252525] focus:border-orange-500 focus:outline-none" />
              {!passwordsMatch && (
                <p className="text-red-500 text-xs px-1">
                  {lang === 'tr' ? 'Şifreler eşleşmiyor' : 'Passwords do not match'}
                </p>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              {lang === 'tr' ? 'Kabul ediyorum:' : 'I accept'}{' '}
              <Link href="/terms" className="text-orange-500">{lang === 'tr' ? 'Şartlar' : 'Terms'}</Link>
              {' & '}
              <Link href="/privacy" className="text-orange-500">{lang === 'tr' ? 'Gizlilik' : 'Privacy'}</Link>
            </label>
            <button disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded text-white flex justify-center gap-2 font-semibold disabled:opacity-50">
              {loading ? (lang === 'tr' ? 'Oluşturuluyor...' : 'Creating...') : t('signup.button')}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 text-center text-slate-400">
            {t('signup.have_account')}{' '}
            <Link href="/login" className="text-orange-500">{t('signup.login')}</Link>
          </div>
          <div className="mt-6 text-center">
            <Link href="/" className="text-slate-500">
              {lang === 'tr' ? '← Ana sayfaya dön' : '← Back to Home'}
            </Link>
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
