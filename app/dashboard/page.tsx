'use client';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Activity, BarChart3, Target, AlertTriangle, Shield,
  LogOut, CreditCard, DollarSign, ArrowUpCircle, ArrowDownCircle,
  PauseCircle, Home, TrendingUp, History, Settings as SettingsIcon,
  Menu, X, Timer, Crown, Star, ChevronRight, Zap, Clock, Newspaper
} from 'lucide-react';
import toast from 'react-hot-toast';
import SettingsPage from '../components/SettingsPage';
import HistoryPage from '../components/HistoryPage';
import MarketAnalysisPage from '../components/MarketAnalysisPage';

interface AnalysisResult { analysis: string; trend: string; confidence: string; }
interface UserData { email: string; name: string; plan: string; analyses_used: number; analyses_limit: number; subscription_status: string; }
interface ParsedAnalysis { signal: string; confidence: string; entry: string; stopLoss: string; takeProfit: string; keyLevels: string[]; signalReason: string[]; riskAssessment: string[]; breakoutRetest: string[]; indicators: string[]; fibonacci: string[]; psychologyPlan: string[]; }

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition"><X className="w-5 h-5" /></button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Upgrade Your Plan</h2>
          <p className="text-slate-400">You've reached your analysis limit.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#1A1A1A] border border-orange-500/30 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3"><Star className="w-5 h-5 text-orange-400" /><span className="text-white font-bold">Pro</span></div>
            <div className="text-3xl font-black text-white mb-1">$9.99<span className="text-sm font-normal text-slate-400">/mo</span></div>
            <ul className="text-slate-400 text-sm space-y-1 mb-5 flex-1">
              <li>✓ 50 analyses/month</li><li>✓ Swing & Scalp Trading</li><li>✓ Full history access</li>
            </ul>
            <a href="https://tradeflowai.lemonsqueezy.com/checkout/buy/60423ba8-053a-4d04-a924-69b6aaae30e3" target="_blank" rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-center transition text-sm">Get Pro</a>
          </div>
          <div className="bg-[#1A1A1A] border border-purple-500/30 rounded-xl p-5 flex flex-col relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">BEST</div>
            <div className="flex items-center gap-2 mb-3"><Crown className="w-5 h-5 text-purple-400" /><span className="text-white font-bold">Premium</span></div>
            <div className="text-3xl font-black text-white mb-1">$19.99<span className="text-sm font-normal text-slate-400">/mo</span></div>
            <ul className="text-slate-400 text-sm space-y-1 mb-5 flex-1">
              <li>✓ Unlimited analyses</li><li>✓ Priority AI processing</li><li>✓ Advanced insights</li>
            </ul>
            <a href="https://tradeflowai.lemonsqueezy.com/checkout/buy/47621ebf-7c5e-4b6e-bbc9-d6bee626b2d4" target="_blank" rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold text-center transition text-sm">Get Premium</a>
          </div>
        </div>
        <button onClick={onClose} className="w-full py-2 text-slate-500 hover:text-slate-300 text-sm transition">Maybe later</button>
      </motion.div>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span className="font-mono text-xs text-slate-400 hidden sm:inline">{time} UTC</span>;
}

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [analysisType, setAnalysisType] = useState<'swing' | 'scalp' | 'swing_premium' | 'scalp_premium' | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showMobileNews, setShowMobileNews] = useState(false);
  const [showTradingParams, setShowTradingParams] = useState(false);
  const [pendingPremiumType, setPendingPremiumType] = useState<string | null>(null);
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("2");
  const [leverage, setLeverage] = useState("1");
  const [orderType, setOrderType] = useState("market");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSidebarOpen(window.innerWidth > 1024);
    }
  }, []);

  useEffect(() => { fetchUserData(); }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/me', { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { setUserData(await response.json()); } else { router.push('/login'); }
    } catch { router.push('/login'); }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    if (!analysisType) { toast.error('Please select Swing or Scalp Trading first'); return; }
    if (userData && (userData.plan === 'free' || userData.subscription_status !== 'active' || userData.analyses_used >= userData.analyses_limit)) {
      setShowUpgradeModal(true); return;
    }
    const file = acceptedFiles[0];
    const token = localStorage.getItem('token');
    if (!token) { toast.error('Please login first'); router.push('/login'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setUploading(true); setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('analysis_type', analysisType);
    if (accountSize) formData.append('account_size', accountSize);
    if (riskPercent) formData.append('risk_percent', riskPercent);
    if (leverage) formData.append('leverage', leverage);
    formData.append('order_type', orderType);
    const lang = localStorage.getItem('analysisLanguage') || 'en';
    formData.append('language', lang);
    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/analyze-image', {
        method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData
      });
      if (!response.ok) {
        const error = await response.json();
        if (response.status === 403) { setShowUpgradeModal(true); return; }
        throw new Error(error.detail || 'Analysis failed');
      }
      const data = await response.json();
      setResult(data); fetchUserData(); toast.success('Analysis complete!');
    } catch (error: any) {
      if (!error.message?.includes('limit')) toast.error(error.message || 'Failed to analyze chart');
    } finally { setUploading(false); setLoading(false); }
  }, [router, analysisType, userData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }, maxFiles: 1, disabled: uploading || !analysisType
  });

  const handleLogout = () => { localStorage.removeItem('token'); toast.success('Logged out'); router.push('/'); };

  const parseNewFormat = (analysis: string, trend: string, confidence: string): ParsedAnalysis => {
    const lines = analysis.split('\n').map(l => l.trim()).filter(l => l);
    let signal = trend.toUpperCase();
    if (signal === 'BULLISH') signal = 'UPTREND';
    if (signal === 'BEARISH') signal = 'DOWNTREND';
    if (signal === 'SIDEWAYS') signal = 'NEUTRAL';
    let entry = '', stopLoss = '', takeProfit = '';
    let keyLevels: string[] = [], signalReason: string[] = [], riskAssessment: string[] = [];
    let breakoutRetest: string[] = [], indicators: string[] = [], fibonacci: string[] = [], psychologyPlan: string[] = [];
    let currentSection = '';
    for (const line of lines) {
      if (line.match(/^(BUY|SELL|HOLD|UPTREND|DOWNTREND|NEUTRAL)$/i)) {
        if (line === 'BUY') signal = 'UPTREND'; else if (line === 'SELL') signal = 'DOWNTREND'; else if (line === 'HOLD') signal = 'NEUTRAL'; else signal = line.toUpperCase();
      } else if (line.startsWith('Entry:') || line.startsWith('Reference:')) { entry = line.replace('Entry:', '').replace('Reference:', '').trim(); }
      else if (line.startsWith('SL:') || line.startsWith('Lower:')) { stopLoss = line.replace('SL:', '').replace('Lower:', '').trim(); }
      else if (line.startsWith('TP:') || line.startsWith('Upper:')) { takeProfit = line.replace('TP:', '').replace('Upper:', '').trim(); }
      else if (line.includes('**Key Levels:**')) { currentSection = 'levels'; }
      else if (line.includes('**Pattern Analysis:**') || line.includes('**Signal Reason:**')) { currentSection = 'reason'; }
      else if (line.includes('**Risk')) { currentSection = 'risk'; }
      else if (line.includes('**Breakout')) { currentSection = 'breakout'; }
      else if (line.includes('**Indicators')) { currentSection = 'indicators'; }
      else if (line.includes('**Fibonacci')) { currentSection = 'fibonacci'; }
      else if (line.includes('**Psychology')) { currentSection = 'psychology'; }
      else if (line.startsWith('*') || line.startsWith('•')) {
        const clean = line.replace(/^[*•]\s*/, '').replace(/\*\*/g, '').trim();
        if (clean) {
          if (currentSection === 'levels') keyLevels.push(clean);
          else if (currentSection === 'reason') signalReason.push(clean);
          else if (currentSection === 'risk') riskAssessment.push(clean);
          else if (currentSection === 'breakout') breakoutRetest.push(clean);
          else if (currentSection === 'indicators') indicators.push(clean);
          else if (currentSection === 'fibonacci') fibonacci.push(clean);
          else if (currentSection === 'psychology') psychologyPlan.push(clean);
        }
      }
    }
    return { signal, confidence, entry, stopLoss, takeProfit, keyLevels, signalReason, riskAssessment, breakoutRetest, indicators, fibonacci, psychologyPlan };
  };

  const getSignalIcon = (signal: string) => {
    if (signal === 'UPTREND') return <ArrowUpCircle className="w-8 h-8 sm:w-10 sm:h-10" />;
    if (signal === 'DOWNTREND') return <ArrowDownCircle className="w-8 h-8 sm:w-10 sm:h-10" />;
    return <PauseCircle className="w-8 h-8 sm:w-10 sm:h-10" />;
  };
  const getSignalColor = (signal: string) => signal === 'UPTREND' ? 'from-green-500 to-emerald-600' : signal === 'DOWNTREND' ? 'from-red-500 to-rose-600' : 'from-yellow-500 to-orange-500';
  const getSignalBg = (signal: string) => signal === 'UPTREND' ? 'bg-green-500/10 border-green-500/20' : signal === 'DOWNTREND' ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20';
  const getConfidenceValue = (confidence: string) => confidence.toLowerCase() === 'high' ? 85 : confidence.toLowerCase() === 'medium' ? 65 : 35;
  const getConfidenceColor = (value: number) => value >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : value >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-red-500 to-rose-600';

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'swing', name: 'Swing Trading', icon: TrendingUp },
    { id: 'scalp', name: 'Scalp Trading', icon: Timer },
    { id: 'market', name: 'Market Analysis', icon: BarChart3 },
    { id: 'history', name: 'History', icon: History },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  const handleMenuClick = (id: string) => {
    if (id === 'swing') { setAnalysisType('swing'); setCurrentPage('dashboard'); setResult(null); }
    else if (id === 'scalp') { setAnalysisType('scalp'); setCurrentPage('dashboard'); setResult(null); }
    else { setCurrentPage(id); }
  };

  const usagePercent = userData ? Math.round((userData.analyses_used / userData.analyses_limit) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans">
      <AnimatePresence>{showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}</AnimatePresence>
      {showTradingParams && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#252525] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-bold text-lg">Trading Parameters</h2>
                <p className="text-slate-400 text-xs mt-1">{pendingPremiumType === 'swing_premium' ? 'Swing Premium' : 'Scalp Premium'} Analysis</p>
              </div>
              <button onClick={() => setShowTradingParams(false)} className="text-slate-400 hover:text-white transition text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Account Size ($)</label>
                <input type="number" value={accountSize} onChange={e => setAccountSize(e.target.value)}
                  placeholder="e.g. 10000" className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Risk Per Trade (%)</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '2', '3', '5'].map(r => (
                    <button key={r} onClick={() => setRiskPercent(r)}
                      className={`py-2 rounded-lg text-sm font-semibold transition border ${riskPercent === r ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#0A0A0A] border-[#252525] text-slate-400 hover:border-orange-500/50'}`}>
                      {r}%
                    </button>
                  ))}
                </div>
                <input type="number" value={riskPercent} onChange={e => setRiskPercent(e.target.value)}
                  placeholder="Custom %" className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-2 text-white focus:border-orange-500 focus:outline-none transition mt-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Leverage</label>
                <div className="grid grid-cols-5 gap-2">
                  {['1', '2', '5', '10', '20'].map(l => (
                    <button key={l} onClick={() => setLeverage(l)}
                      className={`py-2 rounded-lg text-sm font-semibold transition border ${leverage === l ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#0A0A0A] border-[#252525] text-slate-400 hover:border-orange-500/50'}`}>
                      {l}x
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Order Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{v:'market',l:'Market Order'},{v:'limit',l:'Limit Order'}].map(o => (
                    <button key={o.v} onClick={() => setOrderType(o.v)}
                      className={`py-2 rounded-lg text-sm font-semibold transition border ${orderType === o.v ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#0A0A0A] border-[#252525] text-slate-400 hover:border-orange-500/50'}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => { setAnalysisType(pendingPremiumType as any); setShowTradingParams(false); }}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
              Start Analysis →
            </button>
          </div>
        </div>
      )}

      {/* Mobile News Modal */}
      <AnimatePresence>
        {showMobileNews && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col lg:hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white font-semibold">Crypto News</span>
              </div>
              <button onClick={() => setShowMobileNews(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <NewsPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="h-14 border-b border-[#1A1A1A] bg-[#0A0A0A] flex items-center px-3 sm:px-6 gap-2 flex-shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-2 lg:hidden mr-1">
          <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-1.5 text-sm min-w-0">
          <span className="text-slate-500 hidden sm:inline">TradeFlow</span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-slate-200 font-medium truncate">
            {currentPage === 'dashboard' && analysisType === 'swing' ? 'Swing Trading' :
             currentPage === 'dashboard' && analysisType === 'scalp' ? 'Scalp Trading' :
             menuItems.find(i => i.id === currentPage)?.name || 'Dashboard'}
          </span>
          {analysisType && currentPage === 'dashboard' && (
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${analysisType === 'swing' ? 'bg-orange-500/15 text-orange-400' : 'bg-blue-500/15 text-blue-400'}`}>
              {analysisType === 'swing' ? '📈' : '⚡'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <LiveClock />
          <button onClick={() => setShowMobileNews(true)}
            className="lg:hidden p-1.5 rounded-md bg-[#141414] border border-[#1A1A1A] text-slate-400 hover:text-white transition">
            <Newspaper className="w-4 h-4" />
          </button>
          <div className={`px-2 py-1 rounded-md border text-xs font-bold uppercase cursor-pointer transition ${
            userData?.plan === 'premium' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
            userData?.plan === 'pro' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
            'bg-red-500/10 border-red-500/20 text-red-400'
          }`} onClick={() => userData?.plan === 'free' && setShowUpgradeModal(true)}>
            {userData?.plan || 'free'}
          </div>
          <div className="flex items-center gap-2 bg-[#141414] border border-[#1A1A1A] rounded-md px-2 py-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
              {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="text-slate-300 text-sm font-medium hidden sm:block">{userData?.name || 'User'}</span>
          </div>
          <button onClick={handleLogout} className="p-1.5 rounded-md hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR - desktop only */}
        <div className={`hidden lg:flex flex-col ${sidebarOpen ? 'w-56' : 'w-14'} bg-[#0A0A0A] border-r border-[#1A1A1A] transition-all duration-300 flex-shrink-0`}>
          <div className="h-14 border-b border-[#1A1A1A] flex items-center px-3 gap-2">
            <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && <span className="text-white font-bold text-sm tracking-wide">TradeFlow <span className="text-orange-500">AI</span></span>}
          </div>
          <nav className="flex-1 py-3 px-2 space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                (item.id === 'swing' && analysisType === 'swing' && currentPage === 'dashboard') ||
                (item.id === 'scalp' && analysisType === 'scalp' && currentPage === 'dashboard') ||
                (item.id === currentPage && item.id !== 'swing' && item.id !== 'scalp');
              return (
                <button key={item.id} onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-all text-sm ${
                    isActive ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20' : 'text-slate-500 hover:text-slate-200 hover:bg-[#141414]'
                  }`}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.name}</span>}
                  {sidebarOpen && isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                </button>
              );
            })}
          </nav>
          {sidebarOpen && userData?.plan === 'premium' && (
            <div className="px-3 py-3 border-t border-[#1A1A1A]">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Usage</span>
                <span className="text-slate-400">{userData?.analyses_used}/{userData?.analyses_limit}</span>
              </div>
              <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${usagePercent > 80 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${usagePercent}%` }} />
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-10 border-t border-[#1A1A1A] hover:bg-[#141414] transition flex items-center justify-center text-slate-500 hover:text-slate-300">
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 p-3 sm:p-6 overflow-auto pb-20 lg:pb-6">
              {currentPage === 'dashboard' && (
                <div className="space-y-6 max-w-6xl">
                  {userData?.plan !== 'free' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Used</div>
                        <div className="text-2xl sm:text-3xl font-black text-white">{userData?.analyses_used || 0}</div>
                        <div className="text-xs text-slate-500 mt-1">of {userData?.plan === 'premium' ? '∞' : userData?.analyses_limit}</div>
                      </div>
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Left</div>
                        <div className={`text-2xl sm:text-3xl font-black ${userData?.plan === 'premium' ? 'text-green-400' : ((userData?.analyses_limit || 0) - (userData?.analyses_used || 0)) <= 5 ? 'text-red-400' : 'text-green-400'}`}>
                          {userData?.plan === 'premium' ? '∞' : (userData?.analyses_limit || 0) - (userData?.analyses_used || 0)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">remaining</div>
                      </div>
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Plan</div>
                        <div className={`text-2xl sm:text-3xl font-black uppercase ${userData?.plan === 'premium' ? 'text-purple-400' : 'text-orange-400'}`}>{userData?.plan}</div>
                      </div>
                      {userData?.plan !== 'premium' && (
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Usage</div>
                        <div className="text-2xl sm:text-3xl font-black text-white">{usagePercent}%</div>
                        <div className="h-1.5 bg-[#1A1A1A] rounded-full mt-2 overflow-hidden">
                          <div className={`h-full rounded-full ${usagePercent > 80 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${usagePercent}%` }} />
                        </div>
                      </div>
                      )}
                    </div>
                  )}
                  {userData?.plan === 'free' && (
                    <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Crown className="w-5 h-5 text-orange-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-white text-sm font-semibold">Upgrade to Pro or Premium</div>
                          <div className="text-slate-400 text-xs">Starting at $9.99/mo</div>
                        </div>
                      </div>
                      <button onClick={() => setShowUpgradeModal(true)} className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition flex-shrink-0">
                        Upgrade
                      </button>
                    </div>
                  )}
                  {!analysisType && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Pro Analysis</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setAnalysisType('swing')}
                        className="bg-[#0D0D0D] border border-[#1A1A1A] hover:border-orange-500/30 rounded-xl p-12 text-left transition-all group min-h-[220px]">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                              <TrendingUp className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold">Swing Trading</h3>
                              <p className="text-xs text-slate-500">2-10 day positions</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-orange-400 transition" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Timeframe</div><div className="text-xs sm:text-sm text-white font-semibold">Daily/4H</div></div>
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Target</div><div className="text-xs sm:text-sm text-white font-semibold">2-8%</div></div>
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Risk</div><div className="text-xs sm:text-sm text-green-400 font-semibold">Lower</div></div>
                        </div>
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setAnalysisType('scalp')}
                        className="bg-[#0D0D0D] border border-[#1A1A1A] hover:border-blue-500/30 rounded-xl p-12 text-left transition-all group min-h-[220px]">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                              <Timer className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold">Scalp Trading</h3>
                              <p className="text-xs text-slate-500">1-30 minute trades</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Timeframe</div><div className="text-xs sm:text-sm text-white font-semibold">1-15 min</div></div>
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Target</div><div className="text-xs sm:text-sm text-white font-semibold">5-20 pips</div></div>
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Risk</div><div className="text-xs sm:text-sm text-yellow-400 font-semibold">Higher</div></div>
                        </div>
                      </motion.button>
                    </div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-2">Premium Analysis</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                        onClick={() => userData?.plan === "premium" ? (setPendingPremiumType("swing_premium"), setShowTradingParams(true)) : router.push("/pricing")}
                        className="bg-[#0D0D0D] border border-purple-500/20 hover:border-purple-500/40 rounded-xl p-12 text-left transition-all group min-h-[220px] relative overflow-hidden">
                        {userData?.plan === 'free' && <div className="absolute top-3 right-3 bg-purple-500/20 border border-purple-500/30 rounded-full px-2 py-0.5 text-xs text-purple-400 font-medium">🔒 Premium</div>}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                              <TrendingUp className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold">Swing Premium</h3>
                              <p className="text-xs text-slate-500">RSI, MA, Fibonacci & more</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">RSI</div><div className="text-xs sm:text-sm text-purple-400 font-semibold">✓</div></div>
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Fibonacci</div><div className="text-xs sm:text-sm text-purple-400 font-semibold">✓</div></div>
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Trade Plan</div><div className="text-xs sm:text-sm text-purple-400 font-semibold">✓</div></div>
                        </div>
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                        onClick={() => userData?.plan === "premium" ? (setPendingPremiumType("scalp_premium"), setShowTradingParams(true)) : router.push("/pricing")}
                        className="bg-[#0D0D0D] border border-purple-500/20 hover:border-purple-500/40 rounded-xl p-12 text-left transition-all group min-h-[220px] relative overflow-hidden">
                        {userData?.plan === 'free' && <div className="absolute top-3 right-3 bg-purple-500/20 border border-purple-500/30 rounded-full px-2 py-0.5 text-xs text-purple-400 font-medium">🔒 Premium</div>}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                              <Timer className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold">Scalp Premium</h3>
                              <p className="text-xs text-slate-500">RSI, MA, Fibonacci & more</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">RSI</div><div className="text-xs sm:text-sm text-purple-400 font-semibold">✓</div></div>
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Fibonacci</div><div className="text-xs sm:text-sm text-purple-400 font-semibold">✓</div></div>
                          <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">Trade Plan</div><div className="text-xs sm:text-sm text-purple-400 font-semibold">✓</div></div>
                        </div>
                      </motion.button>
                    </div>
                    </div>
                  )}
                  {analysisType && (
                    <>
                      <div className="flex items-center gap-3">
                        <button onClick={() => { setAnalysisType(null); setResult(null); setImagePreview(null); }}
                          className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 transition">← Back</button>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          analysisType === 'swing' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          {analysisType === 'swing' ? '📈 Swing Trading' : '⚡ Scalp Trading'}
                        </div>
                      </div>
                      <div {...getRootProps()} className={`relative overflow-hidden rounded-xl border-2 border-dashed transition-all cursor-pointer
                        ${isDragActive ? 'border-orange-500 bg-orange-500/5' : 'border-[#1A1A1A] bg-[#0D0D0D] hover:border-[#2A2A2A]'}`}>
                        <input {...getInputProps()} />
                        <div className={imagePreview ? "p-4 text-center" : "p-16 sm:p-24 text-center"}>
                          {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="max-w-full w-full object-contain rounded-lg mx-auto" />
                          ) : (
                            <div className="w-12 h-12 bg-[#141414] border border-[#1A1A1A] rounded-xl flex items-center justify-center mx-auto mb-4">
                              <Upload className="w-5 h-5 text-slate-500" />
                            </div>
                          )}
                          {!imagePreview && <p className="text-slate-300 font-semibold mb-1">Upload Chart</p>}
                          {!imagePreview && <p className="text-slate-600 text-sm">Drop your chart here or tap to browse</p>}
                        </div>
                        {uploading && (
                          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                              <p className="text-orange-400 text-sm font-medium">Analyzing Chart...</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <AnimatePresence>
                    {result && (() => {
                      const parsed = parseNewFormat(result.analysis, result.trend, result.confidence);
                      return (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-3">
                          <div className={`rounded-xl border p-4 sm:p-6 ${getSignalBg(parsed.signal)}`}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${getSignalColor(parsed.signal)} text-white`}>
                                  {getSignalIcon(parsed.signal)}
                                </div>
                                <div>
                                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Signal</div>
                                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">{parsed.signal}</h2>
                                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                                    {parsed.signal === 'UPTREND' ? 'Bullish momentum detected' : parsed.signal === 'DOWNTREND' ? 'Bearish momentum detected' : 'Neutral / Consolidation'}
                                  </p>
                                </div>
                              </div>
                              <div className="text-left sm:text-right w-full sm:w-auto">
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Confidence</div>
                                <div className="text-2xl sm:text-3xl font-black text-white mb-2">{getConfidenceValue(parsed.confidence)}%</div>
                                <div className="w-full sm:w-40 h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                                  <div className={`h-full ${getConfidenceColor(getConfidenceValue(parsed.confidence))}`} style={{ width: `${getConfidenceValue(parsed.confidence)}%` }} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {parsed.entry && (
                              <div className="bg-[#0D0D0D] border border-orange-500/20 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4 text-orange-500" /><span className="text-orange-400 text-xs font-bold uppercase">Entry</span></div>
                                <div className="text-xl font-black text-white">{parsed.entry}</div>
                              </div>
                            )}
                            {parsed.stopLoss && (
                              <div className="bg-[#0D0D0D] border border-red-500/20 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-red-400" /><span className="text-red-400 text-xs font-bold uppercase">Stop Loss</span></div>
                                <div className="text-xl font-black text-white">{parsed.stopLoss}</div>
                              </div>
                            )}
                            {parsed.takeProfit && (
                              <div className="bg-[#0D0D0D] border border-green-500/20 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2"><Target className="w-4 h-4 text-green-400" /><span className="text-green-400 text-xs font-bold uppercase">Take Profit</span></div>
                                <div className="text-xl font-black text-white">{parsed.takeProfit}</div>
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {parsed.keyLevels.length > 0 && (
                              <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1A1A1A]">
                                  <Target className="w-4 h-4 text-purple-400" />
                                  <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Key Levels</span>
                                </div>
                                <div className="space-y-1.5">{parsed.keyLevels.map((level, i) => <div key={i} className="text-slate-400 text-xs flex items-start gap-1.5"><span className="text-purple-400 mt-0.5">▸</span>{level}</div>)}</div>
                              </div>
                            )}
                            {parsed.signalReason.length > 0 && (
                              <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1A1A1A]">
                                  <Activity className="w-4 h-4 text-orange-400" />
                                  <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Pattern Analysis</span>
                                </div>
                                <div className="space-y-1.5">{parsed.signalReason.map((reason, i) => <div key={i} className="text-slate-400 text-xs flex items-start gap-1.5"><span className="text-orange-400 mt-0.5">▸</span>{reason}</div>)}</div>
                              </div>
                            )}
                            {parsed.riskAssessment.length > 0 && (
                              <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1A1A1A]">
                                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                  <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Risk Assessment</span>
                                </div>
                                <div className="space-y-1.5">{parsed.riskAssessment.map((risk, i) => <div key={i} className="text-slate-400 text-xs flex items-start gap-1.5"><span className="text-yellow-400 mt-0.5">▸</span>{risk}</div>)}</div>
                              </div>
                            )}
                          </div>
                          {(parsed.breakoutRetest?.length > 0 || parsed.indicators?.length > 0 || parsed.fibonacci?.length > 0 || parsed.psychologyPlan?.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {parsed.breakoutRetest?.length > 0 && (
                                <div className="bg-[#0D0D0D] border border-purple-500/20 rounded-xl p-6">
                                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1A1A1A]">
                                    <TrendingUp className="w-4 h-4 text-purple-400" />
                                    <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Breakout & Retest</span>
                                    <span className="ml-auto text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">Premium</span>
                                  </div>
                                  <div className="space-y-1.5">{parsed.breakoutRetest.map((item, i) => <div key={i} className="text-slate-400 text-xs flex items-start gap-1.5"><span className="text-purple-400 mt-0.5">▸</span>{item}</div>)}</div>
                                </div>
                              )}
                              {parsed.indicators?.length > 0 && (
                                <div className="bg-[#0D0D0D] border border-blue-500/20 rounded-xl p-6">
                                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1A1A1A]">
                                    <Activity className="w-4 h-4 text-blue-400" />
                                    <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Indicators (RSI & MA)</span>
                                    <span className="ml-auto text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">Premium</span>
                                  </div>
                                  <div className="space-y-1.5">{parsed.indicators.map((item, i) => <div key={i} className="text-slate-400 text-xs flex items-start gap-1.5"><span className="text-blue-400 mt-0.5">▸</span>{item}</div>)}</div>
                                </div>
                              )}
                              {parsed.fibonacci?.length > 0 && (
                                <div className="bg-[#0D0D0D] border border-yellow-500/20 rounded-xl p-6">
                                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1A1A1A]">
                                    <BarChart3 className="w-4 h-4 text-yellow-400" />
                                    <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Fibonacci</span>
                                    <span className="ml-auto text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">Premium</span>
                                  </div>
                                  <div className="space-y-1.5">{parsed.fibonacci.map((item, i) => <div key={i} className="text-slate-400 text-xs flex items-start gap-1.5"><span className="text-yellow-400 mt-0.5">▸</span>{item}</div>)}</div>
                                </div>
                              )}
                              {parsed.psychologyPlan?.length > 0 && (
                                <div className="bg-[#0D0D0D] border border-green-500/20 rounded-xl p-6">
                                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1A1A1A]">
                                    <Shield className="w-4 h-4 text-green-400" />
                                    <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Psychology & Trade Plan</span>
                                    <span className="ml-auto text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">Premium</span>
                                  </div>
                                  <div className="space-y-1.5">{parsed.psychologyPlan.map((item, i) => <div key={i} className="text-slate-400 text-xs flex items-start gap-1.5"><span className="text-green-400 mt-0.5">▸</span>{item}</div>)}</div>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <p className="text-slate-400 text-xs">Educational analysis only. Not financial advice. Always do your own research before trading.</p>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                  {!result && !loading && analysisType && (
                    <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-20 text-center">
                      <BarChart3 className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">Upload a chart to get AI-powered analysis</p>
                    </div>
                  )}
                  {/* Daily Tips */}
                  {!analysisType && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-3">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Zap className="w-3 h-3 text-orange-400" />
                          <span>Daily Trading Tips</span>
                        </div>
                      </div>
                      {[
                        { icon: "📈", title: "Trend is Your Friend", tip: "Always trade in the direction of the major trend. Use Daily/4H charts to confirm direction before entering on lower timeframes.", tag: "Swing" },
                        { icon: "⚡", title: "Scalp with Momentum", tip: "Only take scalp trades when volume is above average and RSI shows momentum. Avoid trading in the first 15 minutes.", tag: "Scalp" },
                        { icon: "🛡️", title: "Risk Management", tip: "Never risk more than 1-2% of your account on a single trade. Your stop loss should be set before your entry.", tag: "General" },
                        { icon: "🎯", title: "Key Levels Matter", tip: "Support and resistance zones are where the best risk/reward setups appear. Wait for price to react at these levels.", tag: "Swing" },
                        { icon: "⏰", title: "Best Scalp Hours", tip: "The highest volume and best scalp opportunities occur during London (08:00-12:00 UTC) and NY (13:00-17:00 UTC) sessions.", tag: "Scalp" },
                        { icon: "🧠", title: "Patience Pays", tip: "Not every candle needs a trade. The best traders wait for A+ setups and skip low-quality signals. Quality over quantity.", tag: "General" },
                      ].map((item, i) => (
                        <div key={i} className="bg-[#0D0D0D] border border-[#1A1A1A] hover:border-orange-500/20 rounded-xl p-5 transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl">{item.icon}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                              item.tag === 'Swing' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                              item.tag === 'Scalp' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              'bg-slate-500/10 text-slate-400 border-slate-500/20'
                            }`}>{item.tag}</span>
                          </div>
                          <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed">{item.tip}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {userData?.plan === 'free' && !analysisType && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { num: '01', title: 'Choose Type', desc: 'Select Swing or Scalp' },
                        { num: '02', title: 'Upload Chart', desc: 'Drop any trading chart screenshot' },
                        { num: '03', title: 'Get Analysis', desc: 'Receive instant AI-powered insights' },
                      ].map((step, i) => (
                        <div key={i} className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4 flex items-center gap-4">
                          <div className="text-2xl font-black text-orange-500/30">{step.num}</div>
                          <div>
                            <div className="text-white text-sm font-semibold">{step.title}</div>
                            <div className="text-slate-500 text-xs mt-0.5">{step.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {currentPage === 'market' && <MarketAnalysisPage />}
              {currentPage === 'history' && <HistoryPage />}
              {currentPage === 'settings' && <SettingsPage userData={userData} />}
            </div>
            {/* NEWS PANEL - desktop only */}
            <div className="hidden lg:flex w-80 flex-shrink-0 bg-[#0A0A0A] border-l border-[#1A1A1A] flex-col overflow-hidden" style={{height: "calc(100vh - 56px)", position: "sticky", top: "56px"}}>
              <NewsPanel />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-[#1A1A1A] z-40">
        <div className="flex items-center justify-around px-2 py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              (item.id === 'swing' && analysisType === 'swing' && currentPage === 'dashboard') ||
              (item.id === 'scalp' && analysisType === 'scalp' && currentPage === 'dashboard') ||
              (item.id === currentPage && item.id !== 'swing' && item.id !== 'scalp');
            return (
              <button key={item.id} onClick={() => handleMenuClick(item.id)}
                className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-all ${
                  isActive ? 'text-orange-400' : 'text-slate-600 hover:text-slate-400'
                }`}>
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function NewsPanel() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://tradeflow-ai-backend-production.up.railway.app/news', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setNews(data.news || []);
      } catch (e) {
        console.error('News fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
    const interval = setInterval(fetchNews, 60000);
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    if (hours > 0) return `${hours}h ago`;
    return `${mins}m ago`;
  };

  const getVoteSentiment = (votes: any) => {
    if (!votes) return null;
    const positive = (votes.positive || 0) + (votes.liked || 0);
    const negative = (votes.negative || 0) + (votes.disliked || 0);
    if (positive > negative && positive > 2) return 'bullish';
    if (negative > positive && negative > 2) return 'bearish';
    return null;
  };

  return (
    <>
      <div className="px-4 py-3 border-b border-[#1A1A1A] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-slate-200 text-sm font-semibold">Crypto News</span>
        </div>
        <span className="text-slate-600 text-xs">Live Feed</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : news.length === 0 ? (
          <div className="text-center text-slate-600 text-sm p-8">No news available</div>
        ) : (
          <div className="divide-y divide-[#111]">
            {news.map((item, i) => {
              const sentiment = getVoteSentiment(item.votes);
              return (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="block px-4 py-3 hover:bg-[#111] transition-colors group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {item.currencies?.slice(0, 3).map((c: string, j: number) => (
                        <span key={j} className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded font-mono">{c}</span>
                      ))}
                      {item.currencies?.length === 0 && (
                        <span className="text-xs bg-[#1A1A1A] text-slate-500 px-1.5 py-0.5 rounded">CRYPTO</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {sentiment === 'bullish' && <span className="text-xs text-green-400 font-medium">▲ Bull</span>}
                      {sentiment === 'bearish' && <span className="text-xs text-red-400 font-medium">▼ Bear</span>}
                      <span className="text-xs text-slate-600">{getTimeAgo(item.published_at)}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed group-hover:text-white transition-colors line-clamp-2">{item.title}</p>
                  <div className="mt-1.5 text-slate-600 text-xs">{item.source}</div>
                </a>
              );
            })}
          </div>
        )}
      </div>
      <div className="px-4 py-2 border-t border-[#1A1A1A] flex-shrink-0">
        <p className="text-slate-700 text-xs text-center">Powered by CryptoPanic</p>
      </div>
    </>
  );
}
