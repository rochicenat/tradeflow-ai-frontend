'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Activity } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function PricingPage() {
  const { lang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPlan, setUserPlan] = useState<string>('free');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetch('${process.env.NEXT_PUBLIC_API_URL}/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(r => r.json()).then(d => setUserPlan(d.plan || 'free')).catch(() => {});
    }
  }, []);

  const isPro = userPlan === 'pro';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-orange-500">TradeFlow AI</span>
          </Link>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link href="/dashboard" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                {lang === 'tr' ? 'Panele Git' : 'Go to Dashboard'}
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-slate-300 hover:text-white transition">{lang === 'tr' ? 'Giriş' : 'Login'}</Link>
                <Link href="/signup" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">{lang === 'tr' ? 'Kaydol' : 'Sign Up'}</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            {lang === 'tr' ? 'Basit, Şeffaf Fiyatlandırma' : 'Simple, Transparent Pricing'}
          </h1>
          <p className="text-xl text-slate-400">
            {lang === 'tr' ? 'İhtiyacınıza uygun planı seçin' : 'Choose the plan that fits your needs'}
          </p>
          {isPro && (
            <div className="mt-4 inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2">
              <span className="text-orange-400 text-sm font-medium">
                {lang === 'tr' ? '✓ Zaten Pro planındasınız — Premium\'a yükseltin' : '✓ You\'re on Pro — Upgrade to Premium'}
              </span>
            </div>
          )}
        </div>

        <div className={`grid grid-cols-1 ${isPro ? '' : 'md:grid-cols-2'} gap-8 ${isPro ? 'max-w-md mx-auto' : ''}`}>

          {/* PRO — sadece free kullanıcılara göster */}
          {!isPro && (
            <div className="rounded-2xl p-8 relative bg-orange-500/20 border-2 border-orange-500/50">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                {lang === 'tr' ? 'En Popüler' : 'Most Popular'}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-bold text-white">$9.99</span>
                <span className="text-slate-400">/month</span>
              </div>
              <div className="text-slate-300 mb-6"><span className="font-semibold">50</span> {lang === 'tr' ? 'analiz/ay' : 'analyses/month'}</div>
              <ul className="space-y-3 mb-8">
                {(lang === 'tr'
                  ? ['Aylık 50 yapay zeka analizi', 'Swing & Scalp trading', 'Giriş, SL & TP seviyeleri', 'Kilit seviyeler & formasyon tanıma', 'Risk değerlendirmesi', 'Tam analiz geçmişi']
                  : ['50 AI chart analyses/month', 'Swing & Scalp trading', 'Entry, SL & TP levels', 'Key levels & pattern recognition', 'Risk assessment', 'Full analysis history']
                ).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="https://tradeflowai.lemonsqueezy.com/checkout/buy/60423ba8-053a-4d04-a924-69b6aaae30e3" target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 rounded-lg font-semibold text-center bg-orange-500 text-white hover:bg-orange-600 transition">
                {lang === 'tr' ? 'Pro Al — $9.99/ay' : 'Get Pro — $9.99/mo'}
              </a>
            </div>
          )}

          {/* PREMIUM — herkese göster */}
          <div className={`rounded-2xl p-8 relative ${isPro ? 'bg-purple-500/20 border-2 border-purple-500/50' : 'bg-slate-900/50 border border-slate-800'}`}>
            {isPro && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                {lang === 'tr' ? 'Önerilen Yükseltme' : 'Recommended Upgrade'}
              </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-bold text-white">$19.99</span>
              <span className="text-slate-400">/month</span>
            </div>
            <div className="text-slate-300 mb-6">
              <span className="font-semibold">{lang === 'tr' ? 'Sınırsız' : 'Unlimited'}</span> {lang === 'tr' ? 'analiz/ay' : 'analyses/month'}
            </div>
            <ul className="space-y-3 mb-8">
              {(lang === 'tr'
                ? ['Sınırsız yapay zeka analizi', 'Swing & Scalp Premium analiz', 'RSI & MA indikatör analizi', 'Fibonacci seviyeleri', 'Psikoloji & Trade Planı', 'Kırılım & Retest analizi']
                : ['Unlimited AI analyses', 'Swing & Scalp Premium analysis', 'RSI & MA indicator analysis', 'Fibonacci levels', 'Psychology & Trade Plan', 'Breakout & Retest analysis']
              ).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <a href="https://tradeflowai.lemonsqueezy.com/checkout/buy/47621ebf-7c5e-4b6e-bbc9-d6bee626b2d4" target="_blank" rel="noopener noreferrer"
              className={`block w-full py-3 rounded-lg font-semibold text-center text-white transition ${isPro ? 'bg-purple-500 hover:bg-purple-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
              {lang === 'tr' ? 'Premium Al — $19.99/ay' : 'Get Premium — $19.99/mo'}
            </a>
          </div>
        </div>

        <div className="mt-16 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">⚠️ {lang === 'tr' ? 'Eğitim Aracı Bildirimi' : 'Educational Tool Disclaimer'}</h3>
          <p className="text-slate-300 max-w-3xl mx-auto">
            {lang === 'tr'
              ? 'TradeFlow AI bir araştırma ve eğitim platformudur. Sağlanan hiçbir bilgi finansal veya yatırım tavsiyesi değildir.'
              : 'TradeFlow AI is a research and educational AI data analytics platform. None of the information provided is financial or investment advice.'}
          </p>
        </div>
      </div>
    </div>
  );
}
