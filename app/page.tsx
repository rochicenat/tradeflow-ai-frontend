'use client'

import Link from 'next/link'
import Logo from '../components/Logo'
import { BarChart3, TrendingUp, Shield, Zap, ChevronDown, Upload, Brain, LineChart, ArrowRight, Users, Activity, Star, TrendingDown, Timer } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>
}

const translations = {
  en: {
    pricing: "Pricing", howItWorks: "How It Works", faq: "FAQ",
    login: "Log In", signup: "Sign Up Free",
    badge: "AI-Powered Trading Analysis",
    h1a: "Analyze Any Chart", h1b: "In Seconds With AI",
    hero_desc: "Upload your chart screenshot. Get instant AI analysis for",
    hero_desc2: "trading — entry, stop loss, take profit and more.",
    cta1: "Start Free Analysis", cta2: "See How It Works",
    stats1: "Charts Analyzed", stats2: "Active Users", stats3: "Avg. Analysis Time",
    features_badge: "Features", features_title: "Why Choose",
    f1t: "Swing Trading", f1d: "Multi-day trend analysis with major support/resistance zones and pattern detection",
    f2t: "Scalp Trading", f2d: "1-15 minute chart precision analysis with tight entry/exit points and momentum signals",
    f3t: "Instant Results", f3d: "Upload and get complete AI analysis in under 3 seconds with entry, SL and TP levels",
    f4t: "Any Market", f4d: "Stocks, forex, crypto, commodities — works with charts from any platform",
    hiw_badge: "Process", hiw_title: "How It Works", hiw_sub: "3 steps to instant AI-powered chart analysis",
    s1t: "Upload Chart", s1d: "Drag & drop any chart screenshot from TradingView, MT4, Binance or any platform",
    s2t: "AI Analyzes", s2d: "Our AI identifies patterns, key levels, momentum signals and trade setup quality",
    s3t: "Get Insights", s3d: "Receive entry price, stop loss, take profit, pattern analysis and risk assessment",
    test_badge: "Testimonials", test_title: "Trusted by Traders Worldwide",
    faq_badge: "FAQ", faq_title: "Frequently Asked Questions",
    q1: "What markets does TradeFlow AI support?", a1: "TradeFlow AI analyzes charts from all major financial markets including stocks, forex, cryptocurrencies, commodities, and indices. Works with any chart screenshot.",
    q2: "What's the difference between Swing and Scalp analysis?", a2: "Swing trading analysis focuses on multi-day trends (2-10 days), wider stop losses and larger targets. Scalp trading analysis focuses on 1-15 minute charts with tight stop losses and quick entries/exits.",
    q3: "How accurate is the AI analysis?", a3: "Our AI achieves ~98% accuracy in pattern recognition. However, all analysis is educational — market conditions can change and no analysis guarantees profits.",
    q4: "What is included in each plan?", a4: "Pro plan offers 50 analyses per month with full Swing & Scalp access. Premium plan provides unlimited analyses with priority processing.",
    q5: "How do I cancel my subscription?", a5: "You can cancel anytime from your account settings. Your access continues until the end of your current billing period.",
    q6: "Do I need trading experience?", a6: "No prior experience required. Our AI provides clear, structured insights with entry, stop loss and take profit levels that anyone can understand.",
    pricing_badge: "Pricing", pricing_title: "Simple, Transparent Pricing", pricing_sub: "Start analyzing charts today",
    most_popular: "Most Popular", best_value: "Best Value",
    pro_features: ["50 AI chart analyses/month", "Swing & Scalp trading", "Entry, SL & TP levels", "Pattern recognition", "Full analysis history", "Priority support"],
    premium_features: ["Unlimited AI analyses", "Everything in Pro", "Priority AI processing", "Advanced insights", "Early access to features", "24/7 priority support"],
    get_pro: "Get Pro — $9.99/mo", get_premium: "Get Premium — $19.99/mo",
    cta_title: "Ready to Trade", cta_orange: "Smarter?", cta_sub: "Join 3,200+ traders using AI to analyze charts instantly.",
    cta_btn: "Start Analyzing Now",
    footer_desc: "AI-powered chart analysis for swing and scalp traders worldwide.",
    product: "Product", account: "Account", legal: "Legal",
    ai_analysis: "AI Chart Analysis", footer_hiw: "How It Works", footer_pricing: "Pricing",
    footer_signup: "Sign Up", footer_login: "Login", footer_dashboard: "Dashboard",
    terms: "Terms of Service", privacy: "Privacy Policy", refund: "Refund Policy",
    footer_disclaimer: "TradeFlow AI provides AI-powered analysis tools for educational purposes only. Not financial advice. Trading involves significant risk of loss.",
    footer_copy: "© 2026 TradeFlow AI. All rights reserved.",
    t1r: "Swing Trader", t2r: "Scalp Trader", t3r: "Forex Trader", t4r: "Crypto Analyst",
    t1: "The AI spotted a bull flag I completely missed. Entry was perfect, hit TP in 2 days. This tool is insane.",
    t2: "I scalp BTC daily and this saves me so much time. The momentum signals are surprisingly accurate.",
    t3: "Works great on forex charts too. The support/resistance levels are spot on every time.",
    t4: "3 seconds to full analysis. I run 20+ charts a day and Pro plan is absolutely worth it.",
  },
  tr: {
    pricing: "Fiyatlar", howItWorks: "Nasıl Çalışır", faq: "SSS",
    login: "Giriş Yap", signup: "Ücretsiz Kaydol",
    badge: "Yapay Zeka Destekli İşlem Analizi",
    h1a: "Her Grafiği Analiz Et", h1b: "Saniyeler İçinde Yapay Zeka ile",
    hero_desc: "Grafik ekran görüntünü yükle. Anında yapay zeka analizi al —",
    hero_desc2: "giriş, stop loss, kar al ve daha fazlası.",
    cta1: "Ücretsiz Analiz Başlat", cta2: "Nasıl Çalıştığını Gör",
    stats1: "Analiz Edilen Grafik", stats2: "Aktif Kullanıcı", stats3: "Ort. Analiz Süresi",
    features_badge: "Özellikler", features_title: "Neden",
    f1t: "Swing Trading", f1d: "Ana destek/direnç bölgeleriyle çok günlü trend analizi ve formasyon tespiti",
    f2t: "Scalp Trading", f2d: "1-15 dakikalık grafik hassas analizi, sıkı giriş/çıkış noktaları ve momentum sinyalleri",
    f3t: "Anlık Sonuçlar", f3d: "Yükle ve 3 saniyede giriş, SL ve TP seviyeleriyle tam yapay zeka analizi al",
    f4t: "Her Piyasa", f4d: "Hisse, forex, kripto, emtia — her platformdan grafik ekran görüntüsüyle çalışır",
    hiw_badge: "Süreç", hiw_title: "Nasıl Çalışır", hiw_sub: "Anında yapay zeka destekli grafik analizi için 3 adım",
    s1t: "Grafik Yükle", s1d: "TradingView, MT4, Binance veya herhangi bir platformdan grafik ekran görüntüsü sürükle-bırak",
    s2t: "Yapay Zeka Analiz Eder", s2d: "Yapay zekamız formasyonları, kilit seviyeleri, momentum sinyallerini ve işlem kalitesini belirler",
    s3t: "İçgörü Al", s3d: "Giriş fiyatı, stop loss, kar al, formasyon analizi ve risk değerlendirmesi al",
    test_badge: "Yorumlar", test_title: "Dünya Genelinde Trader'ların Güveni",
    faq_badge: "SSS", faq_title: "Sıkça Sorulan Sorular",
    q1: "TradeFlow AI hangi piyasaları destekler?", a1: "TradeFlow AI; hisse senetleri, forex, kripto paralar, emtialar ve endeksler dahil tüm büyük finansal piyasaların grafiklerini analiz eder.",
    q2: "Swing ve Scalp analizi arasındaki fark nedir?", a2: "Swing trading analizi çok günlü trendlere (2-10 gün) odaklanırken, Scalp trading analizi 1-15 dakikalık grafiklere odaklanır.",
    q3: "Yapay zeka analizi ne kadar doğru?", a3: "Yapay zekamız formasyon tanımada yaklaşık %98 doğruluk sağlar. Ancak tüm analizler eğitim amaçlıdır.",
    q4: "Her planda ne var?", a4: "Pro plan aylık 50 analiz sunar. Premium plan sınırsız analiz sağlar.",
    q5: "Aboneliği nasıl iptal ederim?", a5: "Hesap ayarlarınızdan istediğiniz zaman iptal edebilirsiniz.",
    q6: "İşlem deneyimine ihtiyacım var mı?", a6: "Önceden deneyim gerekmez. Yapay zekamız herkesin anlayabileceği net giriş, stop loss ve kar al seviyeleri sunar.",
    pricing_badge: "Fiyatlandırma", pricing_title: "Basit, Şeffaf Fiyatlandırma", pricing_sub: "Bugün grafik analizine başlayın",
    most_popular: "En Popüler", best_value: "En İyi Değer",
    pro_features: ["Aylık 50 yapay zeka analizi", "Swing & Scalp trading", "Giriş, SL & TP seviyeleri", "Formasyon tanıma", "Tam analiz geçmişi", "Öncelikli destek"],
    premium_features: ["Sınırsız yapay zeka analizi", "Pro'daki her şey", "Öncelikli yapay zeka işlemi", "Gelişmiş içgörüler", "Özelliklere erken erişim", "7/24 öncelikli destek"],
    get_pro: "Pro Al — $9.99/ay", get_premium: "Premium Al — $19.99/ay",
    cta_title: "Daha Akıllı", cta_orange: "İşlem Yapmaya Hazır mısın?", cta_sub: "Grafikleri anında analiz etmek için yapay zekayı kullanan 3.200+ trader'a katıl.",
    cta_btn: "Hemen Analiz Etmeye Başla",
    footer_desc: "Dünya genelindeki swing ve scalp trader'lar için yapay zeka destekli grafik analizi.",
    product: "Ürün", account: "Hesap", legal: "Yasal",
    ai_analysis: "Yapay Zeka Grafik Analizi", footer_hiw: "Nasıl Çalışır", footer_pricing: "Fiyatlar",
    footer_signup: "Kaydol", footer_login: "Giriş", footer_dashboard: "Panel",
    terms: "Kullanım Şartları", privacy: "Gizlilik Politikası", refund: "İade Politikası",
    footer_disclaimer: "TradeFlow AI, yapay zeka destekli analiz araçlarını yalnızca eğitim amaçlı sunar. Finansal tavsiye değildir.",
    footer_copy: "© 2026 TradeFlow AI. Tüm hakları saklıdır.",
    t1r: "Swing Trader", t2r: "Scalp Trader", t3r: "Forex Trader", t4r: "Kripto Analist",
    t1: "Yapay zeka tamamen kaçırdığım bir boğa bayrağı tespit etti. Giriş mükemmeldi, 2 günde TP'ye ulaştı.",
    t2: "Her gün BTC scalp yapıyorum ve bu çok zaman kazandırıyor. Momentum sinyalleri şaşırtıcı derecede doğru.",
    t3: "Forex grafiklerinde de harika çalışıyor. Destek/direnç seviyeleri her seferinde tam isabet.",
    t4: "Tam analize 3 saniye. Günde 20+ grafik bakıyorum ve Pro plan kesinlikle değer.",
  }
}

export default function Home() {
  const [lang, setLang] = useState<'en' | 'tr'>(() => {
    if (typeof window !== 'undefined') return (localStorage.getItem('siteLang') as 'en' | 'tr') || 'en'
    return 'en'
  })
  const t = translations[lang]

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'tr' : 'en'
    setLang(newLang)
    localStorage.setItem('siteLang', newLang)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800 backdrop-blur-lg bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex items-center gap-6">
              <a href="#pricing" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">{t.pricing}</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">{t.howItWorks}</a>
              <a href="#faq" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">{t.faq}</a>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleLang} className="px-3 py-1.5 rounded-lg border border-[#252525] text-slate-400 hover:text-white hover:border-orange-500/50 transition text-xs font-bold">
                {lang === 'en' ? 'TR' : 'EN'}
              </button>
              <a href="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">{t.login}</a>
              <a href="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">{t.signup}</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">{t.badge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">{t.h1a}</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">{t.h1b}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero_desc} <span className="text-white font-semibold">Swing</span> {lang === 'en' ? 'or' : 've'} <span className="text-white font-semibold">Scalp</span> {t.hero_desc2}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25">
              {t.cta1} <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-lg font-semibold transition-all">
              {t.cta2}
            </a>
          </div>
          <div className="max-w-3xl mx-auto bg-[#0A0A0A] border border-[#252525] rounded-2xl p-6 text-left shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
                <Activity className="w-3 h-3 text-orange-400" />
                <span className="text-orange-400 text-xs font-medium">⚡ Scalp Trading</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                <div className="text-green-400 text-xs font-semibold mb-1">SIGNAL</div>
                <div className="text-white font-black text-sm sm:text-xl">UPTREND</div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                <div className="text-orange-400 text-xs font-semibold mb-1">ENTRY</div>
                <div className="text-white font-black text-sm sm:text-xl">$97,240</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                <div className="text-red-400 text-xs font-semibold mb-1">STOP LOSS</div>
                <div className="text-white font-black text-sm sm:text-xl">$96,890</div>
              </div>
            </div>
            <div className="bg-[#111] rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-gray-400 text-sm">
                <span className="text-white font-medium">Bullish engulfing pattern</span> detected at key support zone. RSI showing momentum build-up. Risk/Reward: <span className="text-green-400 font-medium">1:2.5</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-y border-gray-800 bg-gray-900/20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-4xl md:text-5xl font-black text-orange-500 mb-2"><AnimatedCounter end={12400} suffix="+" /></div><div className="text-gray-400 text-sm font-medium">{t.stats1}</div></div>
          <div><div className="text-4xl md:text-5xl font-black text-orange-500 mb-2"><AnimatedCounter end={3200} suffix="+" /></div><div className="text-gray-400 text-sm font-medium">{t.stats2}</div></div>
          <div><div className="text-4xl md:text-5xl font-black text-orange-500 mb-2"><AnimatedCounter end={3} suffix="s" /></div><div className="text-gray-400 text-sm font-medium">{t.stats3}</div></div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">{t.features_badge}</p>
            <h2 className="text-4xl font-bold">{t.features_title} <span className="text-orange-500">TradeFlow AI?</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<TrendingUp className="w-8 h-8 text-orange-500" />} title={t.f1t} description={t.f1d} />
            <FeatureCard icon={<Timer className="w-8 h-8 text-orange-500" />} title={t.f2t} description={t.f2d} />
            <FeatureCard icon={<Zap className="w-8 h-8 text-orange-500" />} title={t.f3t} description={t.f3d} />
            <FeatureCard icon={<Shield className="w-8 h-8 text-orange-500" />} title={t.f4t} description={t.f4d} />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">{t.hiw_badge}</p>
            <h2 className="text-4xl font-bold mb-4">{t.hiw_title}</h2>
            <p className="text-xl text-gray-400">{t.hiw_sub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', icon: <Upload className="w-10 h-10 text-orange-500" />, title: t.s1t, desc: t.s1d },
              { num: '02', icon: <Brain className="w-10 h-10 text-orange-500" />, title: t.s2t, desc: t.s2d },
              { num: '03', icon: <LineChart className="w-10 h-10 text-orange-500" />, title: t.s3t, desc: t.s3d },
            ].map((step, i) => (
              <div key={i} className="relative bg-[#0A0A0A] border border-[#252525] hover:border-orange-500/40 rounded-2xl p-8 transition-all group">
                <div className="text-6xl font-black text-orange-500/10 group-hover:text-orange-500/20 transition-all absolute top-4 right-6">{step.num}</div>
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl w-fit mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">{t.test_badge}</p>
            <h2 className="text-4xl font-bold">{t.test_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TestimonialCard initials="SM" name="Sarah M." role={t.t1r} rating={5} text={t.t1} />
            <TestimonialCard initials="MC" name="Michael C." role={t.t2r} rating={5} text={t.t2} />
            <TestimonialCard initials="JR" name="Jennifer R." role={t.t3r} rating={5} text={t.t3} />
            <TestimonialCard initials="AT" name="Alex T." role={t.t4r} rating={5} text={t.t4} />
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">{t.faq_badge}</p>
            <h2 className="text-4xl font-bold">{t.faq_title}</h2>
          </div>
          <div className="space-y-4">
            <FAQItem question={t.q1} answer={t.a1} />
            <FAQItem question={t.q2} answer={t.a2} />
            <FAQItem question={t.q3} answer={t.a3} />
            <FAQItem question={t.q4} answer={t.a4} />
            <FAQItem question={t.q5} answer={t.a5} />
            <FAQItem question={t.q6} answer={t.a6} />
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-orange-500 font-semibold mb-2 uppercase tracking-wider">{t.pricing_badge}</p>
            <h2 className="text-4xl font-bold text-white mb-4">{t.pricing_title}</h2>
            <p className="text-xl text-gray-400">{t.pricing_sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-orange-500/10 border-2 border-orange-500/50 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">{t.most_popular}</div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-1"><span className="text-5xl font-black text-white">$9.99</span><span className="text-gray-400">/month</span></div>
              <div className="text-gray-400 mb-6">50 analyses/month</div>
              <ul className="space-y-3 mb-8">{t.pro_features.map((f: string, i: number) => (<li key={i} className="flex items-center gap-2 text-gray-300 text-sm"><span className="text-green-400 font-bold">✓</span> {f}</li>))}</ul>
              <a href="/signup?plan=pro" className="block w-full py-3 rounded-xl font-bold text-center bg-orange-500 text-white hover:bg-orange-600 transition text-lg">{t.get_pro}</a>
            </div>
            <div className="bg-[#0A0A0A] border border-purple-500/30 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">{t.best_value}</div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="flex items-baseline gap-2 mb-1"><span className="text-5xl font-black text-white">$19.99</span><span className="text-gray-400">/month</span></div>
              <div className="text-gray-400 mb-6">Unlimited analyses</div>
              <ul className="space-y-3 mb-8">{t.premium_features.map((f: string, i: number) => (<li key={i} className="flex items-center gap-2 text-gray-300 text-sm"><span className="text-green-400 font-bold">✓</span> {f}</li>))}</ul>
              <a href="/signup?plan=premium" className="block w-full py-3 rounded-xl font-bold text-center bg-purple-500 text-white hover:bg-purple-600 transition text-lg">{t.get_premium}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">{t.cta_title} <span className="text-orange-500">{t.cta_orange}</span></h2>
            <p className="text-xl text-gray-400 mb-8">{t.cta_sub}</p>
            <a href="/signup" className="inline-flex items-center gap-2 px-10 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25">
              {t.cta_btn} <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">TradeFlow</span>
                <span className="text-2xl font-light text-gray-400">AI</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{t.footer_desc}</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/aitradeflow/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@aitradeflow" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">{t.product}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/signup" className="hover:text-orange-500 transition-colors">{t.ai_analysis}</Link></li>
                <li><Link href="#how-it-works" className="hover:text-orange-500 transition-colors">{t.footer_hiw}</Link></li>
                <li><Link href="#pricing" className="hover:text-orange-500 transition-colors">{t.footer_pricing}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">{t.account}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/signup" className="hover:text-orange-500 transition-colors">{t.footer_signup}</Link></li>
                <li><Link href="/login" className="hover:text-orange-500 transition-colors">{t.footer_login}</Link></li>
                <li><Link href="/dashboard" className="hover:text-orange-500 transition-colors">{t.footer_dashboard}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">{t.legal}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/terms" className="hover:text-orange-500 transition-colors">{t.terms}</Link></li>
                <li><Link href="/privacy" className="hover:text-orange-500 transition-colors">{t.privacy}</Link></li>
                <li><Link href="/refund" className="hover:text-orange-500 transition-colors">{t.refund}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-xs text-gray-500 text-center max-w-4xl mx-auto">{t.footer_disclaimer}</p>
            <div className="mt-4 text-center text-gray-400 text-sm">{t.footer_copy}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#252525] hover:border-orange-500/40 transition-all group">
      <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl w-fit mb-4 group-hover:bg-orange-500/20 transition-all">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

function TestimonialCard({ initials, name, role, rating, text }: { initials: string; name: string; role: string; rating: number; text: string }) {
  return (
    <div className="bg-[#0A0A0A] border border-[#252525] rounded-xl p-6 hover:border-orange-500/30 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-white text-sm">{initials}</div>
        <div><div className="font-semibold text-sm">{name}</div><div className="text-xs text-gray-400">{role}</div></div>
      </div>
      <div className="flex gap-1 mb-3">{[...Array(rating)].map((_, i) => (<svg key={i} className="w-3 h-3 fill-orange-500" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div>
      <p className="text-gray-400 text-sm">&ldquo;{text}&rdquo;</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-[#252525] rounded-xl overflow-hidden bg-[#0A0A0A]">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#111] transition-colors">
        <span className="font-semibold">{question}</span>
        <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-6 pb-4 text-gray-400 text-sm">{answer}</div>}
    </div>
  )
}
