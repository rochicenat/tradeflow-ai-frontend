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
import { getToken, removeToken } from '@/app/lib/auth';

interface AnalysisResult { analysis: string; trend: string; confidence: string; }
interface UserData { email: string; name: string; plan: string; analyses_used: number; analyses_limit: number; subscription_status: string; }
interface ParsedAnalysis { signal: string; confidence: string; entry: string; stopLoss: string; takeProfit: string; keyLevels: string[]; signalReason: string[]; riskAssessment: string[]; breakoutRetest: string[]; indicators: string[]; fibonacci: string[]; psychologyPlan: string[]; smc: string[]; }

function UpgradeModal({ onClose, userEmail }: { onClose: () => void; userEmail?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition"><X className="w-5 h-5" /></button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Upgrade to Pro</h2>
          <p className="text-slate-400">{"You've reached your analysis limit."}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#1A1A1A] border border-orange-500/30 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3"><Star className="w-5 h-5 text-orange-400" /><span className="text-white font-bold">Monthly</span></div>
            <div className="text-3xl font-black text-white mb-1">$19.99<span className="text-sm font-normal text-slate-400">/mo</span></div>
            <ul className="text-slate-400 text-sm space-y-1 mb-5 flex-1">
              <li>✓ Unlimited analyses</li>
              <li>✓ Swing & Scalp Trading</li>
              <li>✓ Full history access</li>
            </ul>
            <a href={`https://tradeflowai.lemonsqueezy.com/checkout/buy/47621ebf-7c5e-4b6e-bbc9-d6bee626b2d4${userEmail ? "?checkout%5Bemail%5D=" + encodeURIComponent(userEmail) : ""}`} target="_blank" rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-center transition text-sm">
              Get Monthly
            </a>
          </div>
          <div className="bg-[#1A1A1A] border border-orange-500/50 rounded-xl p-5 flex flex-col relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-50%</div>
            <div className="flex items-center gap-2 mb-3"><Crown className="w-5 h-5 text-orange-400" /><span className="text-white font-bold">Yearly</span></div>
            <div className="text-3xl font-black text-white mb-1">$9.99<span className="text-sm font-normal text-slate-400">/mo</span></div>
            <div className="text-green-400 text-xs mb-3">Billed $119.88/year</div>
            <ul className="text-slate-400 text-sm space-y-1 mb-5 flex-1">
              <li>✓ Unlimited analyses</li>
              <li>✓ Swing & Scalp Trading</li>
              <li>✓ Full history access</li>
            </ul>
            <a href={`https://tradeflowai.lemonsqueezy.com/checkout/buy/60423ba8-053a-4d04-a924-69b6aaae30e3${userEmail ? "?checkout%5Bemail%5D=" + encodeURIComponent(userEmail) : ""}`} target="_blank" rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-center transition text-sm">
              Get Yearly
            </a>
          </div>
        </div>
        <button onClick={onClose} className="w-full py-2 text-slate-500 hover:text-slate-300 text-sm transition">
          Maybe later
        </button>
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
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [analysisType, setAnalysisType] = useState<'swing' | 'scalp' | 'swing_premium' | 'scalp_premium' | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showTradingParams, setShowTradingParams] = useState(false);
  const [pendingPremiumType, setPendingPremiumType] = useState<string | null>(null);
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("2");
  const [leverage, setLeverage] = useState("1");
  const [orderType, setOrderType] = useState("market");
  const [slType, setSlType] = useState("fixed");
  const [indicators, setIndicators] = useState<string[]>([]);
  const [session, setSession] = useState("");
  const [assetType, setAssetType] = useState("");
  const [slPips, setSlPips] = useState("20");
  const [rrRatio, setRrRatio] = useState("1:2");
  const [limitPrice, setLimitPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [timeframe, setTimeframe] = useState("");
  const [showParamsModal, setShowParamsModal] = useState(false);
  const [proMode, setProMode] = useState(false);
  const [riskProfile, setRiskProfile] = useState<'safe' | 'balanced' | 'aggressive'>('balanced');
  const [symbol, setSymbol] = useState('');
  const [showSymbolDropdown, setShowSymbolDropdown] = useState(false);
  const [symbolSearch, setSymbolSearch] = useState('');
  const RISK_PROFILES = {
    safe:       { leverage: '1',  riskPercent: '1',  rrRatio: '1:2' },
    balanced:   { leverage: '5',  riskPercent: '2',  rrRatio: '1:3' },
    aggressive: { leverage: '10', riskPercent: '5',  rrRatio: '1:4' },
  };

  useEffect(() => { fetchUserData(); }, []);

  const fetchUserData = async () => {
    const token = getToken();
    if (!token) { router.push('/login'); return; }
    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/me', { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { setUserData(await response.json()); } else { router.push('/login'); }
    } catch { router.push('/login'); }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    if (!analysisType) { toast.error('Please select Swing or Scalp Trading first'); return; }
    const file = acceptedFiles[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  }, [analysisType]);

  const startAnalysis = async () => {
    if (!selectedFile) { toast.error('Please upload a chart first'); return; }
    if (!analysisType) { toast.error('Please select Swing or Scalp Trading first'); return; }
    if (userData && (userData.plan === 'free' || userData.subscription_status !== 'active' || userData.analyses_used >= userData.analyses_limit)) {
      setShowUpgradeModal(true); return;
    }
    const token = getToken();
    if (!token) { toast.error('Please login first'); router.push('/login'); return; }
    // Auto-detect session from user time
    const hour = new Date().getUTCHours();
    const autoSession = hour >= 7 && hour < 16 ? 'london' : hour >= 12 && hour < 21 ? 'newyork' : hour >= 0 && hour < 9 ? 'asian' : 'all';
    setSession(autoSession);

    if (!proMode) {
      const profile = RISK_PROFILES[riskProfile];
      setLeverage(profile.leverage);
      setRiskPercent(profile.riskPercent);
      setRrRatio(profile.rrRatio);
    }
    setUploading(true); setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('analysis_type', analysisType);
    if (symbol) formData.append('symbol', symbol);
    if (accountSize) formData.append('account_size', accountSize);
    if (riskPercent) formData.append('risk_percent', riskPercent);
    if (leverage) formData.append('leverage', leverage);
    formData.append('order_type', orderType);
    formData.append('language', 'en');
    if (slType) formData.append('sl_type', slType);
    formData.append('indicators', 'RSI,MACD,Bollinger,EMA 20,EMA 50,EMA 200');
    if (session) formData.append('session', session);
    if (assetType) formData.append('asset_type', assetType);
    formData.append('sl_pips', slPips);
    if (rrRatio) formData.append('rr_ratio', rrRatio);
    if (limitPrice && orderType === 'limit') formData.append('limit_price', limitPrice);
    if (timeframe) formData.append('timeframe', timeframe);
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
      setResult(data); fetchUserData();
      toast.success('Analysis complete!');
    } catch (error: any) {
      if (!error.message?.includes('limit')) toast.error(error.message || 'Failed to analyze chart');
    } finally { setUploading(false); setLoading(false); }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }, maxFiles: 1, disabled: uploading || !analysisType
  });

  const handleLogout = () => { removeToken(); toast.success('Logged out'); router.push('/login'); };

  const parseNewFormat = (analysis: string, trend: string, confidence: string): ParsedAnalysis => {
    const lines = analysis.split('\n').map(l => l.trim()).filter(l => l);
    let signal = trend.toUpperCase();
    if (signal === 'BULLISH') signal = 'UPTREND';
    if (signal === 'BEARISH') signal = 'DOWNTREND';
    if (signal === 'SIDEWAYS') signal = 'NEUTRAL';
    let entry = '', stopLoss = '', takeProfit = '';
    let keyLevels: string[] = [], signalReason: string[] = [], riskAssessment: string[] = [];
    let breakoutRetest: string[] = [], indicators: string[] = [], fibonacci: string[] = [], psychologyPlan: string[] = [], smc: string[] = [];
    let currentSection = '';
    for (const line of lines) {
      if (line.match(/^(BUY|SELL|HOLD|UPTREND|DOWNTREND|NEUTRAL)$/i)) {
        if (line === 'BUY') signal = 'UPTREND'; else if (line === 'SELL') signal = 'DOWNTREND'; else if (line === 'HOLD') signal = 'NEUTRAL'; else signal = line.toUpperCase();
      } else if (line.startsWith('Entry:') || line.startsWith('Reference:')) { entry = line.replace('Entry:', '').replace('Reference:', '').trim(); }
      else if (line.startsWith('SL:') || line.startsWith('Lower:')) { const raw = line.replace('SL:', '').replace('Lower:', '').trim(); stopLoss = raw.replace(/,/g, '').match(/[\d.]+/)?.[0] || ''; }
      else if (line.startsWith('TP:') || line.startsWith('Upper:')) { const raw = line.replace('TP:', '').replace('Upper:', '').trim(); takeProfit = raw.replace(/,/g, '').match(/[\d.]+/)?.[0] || ''; }
      else if (line.includes('**Key Levels:**')) { currentSection = 'levels'; }
      else if (line.includes('**Pattern Analysis:**') || line.includes('**Signal Reason:**')) { currentSection = 'reason'; }
      else if (line.includes('**Risk')) { currentSection = 'risk'; }
      else if (line.includes('**Breakout')) { currentSection = 'breakout'; }
      else if (line.includes('**Indicators')) { currentSection = 'indicators'; }
      else if (line.includes('**Fibonacci')) { currentSection = 'fibonacci'; }
      else if (line.includes('**Psychology')) { currentSection = 'psychology'; }
      else if (line.includes('**Smart Money')) { currentSection = 'smc'; }
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
          else if (currentSection === 'smc') smc.push(clean);
        }
      }
    }
    return { signal, confidence, entry, stopLoss, takeProfit, keyLevels, signalReason, riskAssessment, breakoutRetest, indicators, fibonacci, psychologyPlan, smc };
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

  const menuGroups = [
    { label: 'MAIN', items: [
      { id: 'dashboard', name: 'Dashboard', icon: Home },
    ]},
    { label: 'TRADING', items: [
      { id: 'swing', name: 'Swing Trading', icon: TrendingUp },
      { id: 'scalp', name: 'Scalp Trading', icon: Timer },
    ]},
    { label: 'MARKETS', items: [
      { id: 'market', name: 'Market Analysis', icon: BarChart3 },
      { id: 'news', name: 'Crypto News', icon: Newspaper },
    ]},
    { label: 'ACCOUNT', items: [
      { id: 'history', name: 'History', icon: History },
      { id: 'settings', name: 'Settings', icon: SettingsIcon },
    ]},
  ];
  const menuItems = menuGroups.flatMap(g => g.items);

  const handleMenuClick = (id: string) => {
    if (id === 'swing') { setAnalysisType('swing'); setCurrentPage('dashboard'); setResult(null); }
    else if (id === 'scalp') { setAnalysisType('scalp'); setCurrentPage('dashboard'); setResult(null); }
    else { setCurrentPage(id); }
  };

  const usagePercent = userData ? Math.round((userData.analyses_used / userData.analyses_limit) * 100) : 0;

  return (
    <div className="bg-[#050505] flex flex-col font-sans overflow-hidden" style={{position:"fixed",width:"100%",top:0,left:0,bottom:0,right:0}}>
      <AnimatePresence>{showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} userEmail={userData?.email} />}</AnimatePresence>
      {showParamsModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black">
            {/* Header */}
            <div className="sticky top-0 bg-[#0D0D0D] border-b border-[#1E1E1E] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-base">⚙️</div>
                <div>
                  <h2 className="text-white font-bold text-base leading-none">Trading Parameters</h2>
                  <p className="text-slate-500 text-xs mt-0.5">{analysisType === 'swing' ? 'Swing Trading' : 'Scalp Trading'} — Customize analysis</p>
                </div>
              </div>
              <button onClick={() => setShowParamsModal(false)} className="w-7 h-7 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] text-slate-400 hover:text-white transition flex items-center justify-center text-sm">✕</button>
            </div>

            <div className="p-6 space-y-6">
              {/* Account Balance */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                  Account Balance ($)
                </label>
                <input type="number" value={accountSize} onChange={e => setAccountSize(e.target.value)}
                  placeholder="e.g. 10000"
                  className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 focus:outline-none transition text-sm" />
              </div>

              {/* Risk Per Trade */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                  Risk Per Trade (%)
                </label>
                <div className="flex gap-2 mb-2">
                  {['1', '2', '3', '5'].map(r => (
                    <button key={r} onClick={() => setRiskPercent(r)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${riskPercent === r
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105'
                        : 'bg-[#111] border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>
                      {r}%
                    </button>
                  ))}
                </div>
                <input type="number" value={riskPercent} onChange={e => setRiskPercent(e.target.value)}
                  placeholder="Custom %" className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:border-orange-500/50 focus:outline-none transition text-sm" />
              </div>

              {/* Leverage */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                  Leverage
                </label>
                <div className="flex gap-2">
                  {['1', '2', '5', '10', '20'].map(l => (
                    <button key={l} onClick={() => setLeverage(l)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${leverage === l
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105'
                        : 'bg-[#111] border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>
                      {l}x
                    </button>
                  ))}
                </div>
              </div>

              {/* R:R + Order Type row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                    R:R Ratio
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['1:1', '1:2', '1:3', '1:4'].map(r => (
                      <button key={r} onClick={() => setRrRatio(r)}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all ${rrRatio === r
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                          : 'bg-[#111] border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                    Order Type
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {[{v:'market', l:'Market'}, {v:'limit', l:'Limit'}].map(o => (
                      <button key={o.v} onClick={() => setOrderType(o.v)}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all ${orderType === o.v
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                          : 'bg-[#111] border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stop Loss Type */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                  Stop-Loss Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[{v:'fixed', l:'Fixed (Pips)'}, {v:'atr', l:'ATR Based'}].map(o => (
                    <button key={o.v} onClick={() => setSlType(o.v)}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all ${slType === o.v
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                        : 'bg-[#111] border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Indicators */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                  Favorite Indicators
                </label>
                <div className="flex flex-wrap gap-2">
                  {['RSI', 'MACD', 'Bollinger', 'EMA 20', 'EMA 50', 'EMA 200'].map(ind => (
                    <button key={ind} onClick={() => setIndicators(prev => prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind])}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${indicators.includes(ind)
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-[#111] border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Type */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                  Asset Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {[{v:'crypto', l:'₿ Crypto'}, {v:'forex', l:'💱 Forex'}, {v:'stocks', l:'📈 Stocks'}, {v:'commodities', l:'🛢 Commodities'}, {v:'indices', l:'📊 Indices'}, {v:'', l:'✨ Auto'}].map(o => (
                    <button key={o.v} onClick={() => setAssetType(o.v)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${assetType === o.v
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-[#111] border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              {/* SL Distance */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                  Min SL Distance
                </label>
                <div className="flex flex-wrap gap-2">
                  {[{v:'10',l:'10 pip'},{v:'20',l:'20 pip'},{v:'30',l:'30 pip'},{v:'50',l:'50 pip'},{v:'100',l:'100 pip'}].map(o => (
                    <button key={o.v} onClick={() => setSlPips(o.v)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${slPips === o.v
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-[#111] border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <span className="w-1 h-3 bg-orange-500 rounded-full inline-block"></span>
                  Trading Session
                </label>
                <div className="flex flex-wrap gap-2">
                  {[{v:'london', l:'🇬🇧 London'}, {v:'newyork', l:'🇺🇸 New York'}, {v:'asian', l:'🌏 Asian'}, {v:'london_ny', l:'🌍 London+NY'}, {v:'all', l:'🌐 All'}, {v:'', l:'— Any'}].map(o => (
                    <button key={o.v} onClick={() => setSession(o.v)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${session === o.v
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-[#111] border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#0D0D0D] border-t border-[#1E1E1E] px-6 py-4 flex gap-3 rounded-b-2xl">
              <button onClick={() => setShowParamsModal(false)}
                className="flex-1 py-3 rounded-xl border border-[#1E1E1E] text-slate-500 hover:text-white hover:border-[#333] transition text-sm font-medium">
                Skip
              </button>
              <button onClick={() => setShowParamsModal(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 text-sm">
                Start Analysis →
              </button>
            </div>
          </div>
        </div>
      )}

      {showTradingParams && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#252525] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-bold text-lg">{'Trading Parameters'}</h2>
                <p className="text-slate-400 text-xs mt-1">{pendingPremiumType === 'swing_premium' ? 'Swing Premium' : 'Scalp Premium'} {'Analysis'}</p>
              </div>
              <button onClick={() => setShowTradingParams(false)} className="text-slate-400 hover:text-white transition text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{'Account Size ($)'}</label>
                <input type="number" value={accountSize} onChange={e => setAccountSize(e.target.value)}
                  placeholder="e.g. 10000" className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{'Risk Per Trade (%)'}</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '2', '3', '5'].map(r => (
                    <button key={r} onClick={() => setRiskPercent(r)}
                      className={`py-2 rounded-lg text-sm font-semibold transition border ${riskPercent === r ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#0A0A0A] border-[#252525] text-slate-400 hover:border-orange-500/50'}`}>
                      {r}%
                    </button>
                  ))}
                </div>
                <input type="number" value={riskPercent} onChange={e => setRiskPercent(e.target.value)}
                  placeholder={'Custom %'} className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-2 text-white focus:border-orange-500 focus:outline-none transition mt-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{'Leverage'}</label>
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
                <label className="block text-sm font-medium text-slate-300 mb-2">{'Order Type'}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {v:'market', l: 'Market Order'},
                    {v:'limit', l: 'Limit Order'}
                  ].map(o => (
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
              {'Start Analysis →'}
            </button>
          </div>
        </div>
      )}



      {/* HEADER */}
      <header className="h-14 border-b border-[#1A1A1A] bg-[#0A0A0A] flex items-center px-3 sm:px-6 gap-2 flex-shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-2 lg:hidden mr-1">
          <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-1.5 text-sm min-w-0">
          <a href="/" className="text-slate-500 hidden sm:inline hover:text-orange-400 transition">TradeFlow</a>
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
      <div className="flex flex-1 overflow-hidden" style={{height: "calc(100dvh - 56px)"}}>
        {/* SIDEBAR */}
        <div className="hidden lg:flex flex-col w-56 bg-[#0A0A0A] border-r border-[#1A1A1A] flex-shrink-0">
          <div className="h-14 border-b border-[#1A1A1A] flex items-center justify-center px-3 gap-2">
            <span className="text-white font-bold text-base tracking-wide">TradeFlow <span className="text-orange-500">AI</span></span>
          </div>
          <nav className="flex-1 py-3 px-2 space-y-0.5">
            {menuGroups.map((group) => (
              <div key={group.label} className="mb-3">
                <div className="px-2.5 py-1 mb-1"><span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{group.label}</span></div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
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
                        <span className="font-medium">{item.name}</span>
                        {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex flex-1 overflow-hidden" style={{height: "calc(100dvh - 56px)"}}>
            <div className="flex-1 p-3 sm:p-6 overflow-y-auto pb-20 lg:pb-6">
              {currentPage === 'dashboard' && (
                <div className="space-y-6 max-w-6xl">
                  {userData?.plan !== 'free' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">{'Used'}</div>
                        <div className="text-2xl sm:text-3xl font-black text-white">{userData?.analyses_used || 0}</div>
                        <div className="text-xs text-slate-500 mt-1">of ∞</div>
                      </div>
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">{'Left'}</div>
                        <div className={`text-2xl sm:text-3xl font-black ${userData?.plan === 'premium' ? 'text-green-400' : ((userData?.analyses_limit || 0) - (userData?.analyses_used || 0)) <= 5 ? 'text-red-400' : 'text-green-400'}`}>
                          ∞
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{'remaining'}</div>
                      </div>
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
                        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Your Plan</div>
                        <div className={`text-2xl sm:text-3xl font-black uppercase ${userData?.plan === 'premium' ? 'text-purple-400' : 'text-orange-400'}`}>{userData?.plan}</div>
                      </div>
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
                  {userData?.plan === 'free' && (
                    <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Crown className="w-5 h-5 text-orange-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-white text-sm font-semibold">Upgrade Plan</div>
                          <div className="text-slate-400 text-xs">Starting at $19.99/mo</div>
                        </div>
                      </div>
                      <button onClick={() => setShowUpgradeModal(true)} className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition flex-shrink-0">
                        {'Upgrade'}
                      </button>
                    </div>
                  )}
                  {!analysisType && (
                    <div className="space-y-4">
                      {/* How It Works */}
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">How It Works</p>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { num: '01', icon: '📤', title: 'Upload Chart', desc: 'Screenshot from TradingView, MT4 or any platform', color: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/20' },
                            { num: '02', icon: '🧠', title: 'AI Analyzes', desc: 'Identifies SMC zones, patterns and key levels', color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/20' },
                            { num: '03', icon: '📊', title: 'Get Insights', desc: 'Entry, SL, TP, Fibonacci and risk plan', color: 'from-green-500/20 to-green-500/5', border: 'border-green-500/20' },
                          ].map(s => (
                            <div key={s.num} className={`bg-gradient-to-b ${s.color} border ${s.border} rounded-xl p-4 relative overflow-hidden`}>
                              <span className="absolute top-2 right-3 text-3xl font-black text-white/5">{s.num}</span>
                              <div className="text-xl mb-3">{s.icon}</div>
                              <p className="text-white text-xs font-bold mb-1">{s.title}</p>
                              <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{'Pro Analysis'}</p>
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
                                <p className="text-xs text-slate-500">{'2-10 day positions'}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-orange-400 transition" />
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">{'Timeframe'}</div><div className="text-xs sm:text-sm text-white font-semibold">Daily/4H</div></div>
                            <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">{'Target'}</div><div className="text-xs sm:text-sm text-white font-semibold">2-8%</div></div>
                            <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">{'Risk'}</div><div className="text-xs sm:text-sm text-green-400 font-semibold">{'Lower'}</div></div>
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
                                <p className="text-xs text-slate-500">{'1-30 minute trades'}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition" />
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">{'Timeframe'}</div><div className="text-xs sm:text-sm text-white font-semibold">1-15 min</div></div>
                            <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">{'Target'}</div><div className="text-xs sm:text-sm text-white font-semibold">5-20 pips</div></div>
                            <div className="bg-[#111] rounded-lg p-2.5"><div className="text-xs text-slate-500 mb-1">{'Risk'}</div><div className="text-xs sm:text-sm text-yellow-400 font-semibold">{'Higher'}</div></div>
                          </div>
                        </motion.button>
                      </div>

                    </div>
                  )}
                  {analysisType && (
                    <>
                      <div className="flex items-center gap-3">
                        <button onClick={() => { setAnalysisType(null); setResult(null); setImagePreview(null); }}
                          className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 transition">
                          ← {'Back'}
                        </button>
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
                          {!imagePreview && <p className="text-slate-600 text-sm">{'Drop your chart here or tap to browse'}</p>}
                        </div>
                        {uploading && (
                          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                              <p className="text-orange-400 text-sm font-medium">{'Analyzing Chart...'}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Trading Parameters inline */}
                      {!result && (
                        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl overflow-hidden">
                          <div className="px-5 py-3.5 border-b border-[#1A1A1A] flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xs">⚙️</div>
                            <h3 className="text-white font-semibold text-sm tracking-tight">Trading Parameters</h3>
                            <div className="ml-auto flex items-center gap-1 bg-[#1A1A1A] border border-[#252525] rounded-lg p-0.5">
                              <button onClick={() => setProMode(false)} className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${!proMode ? 'bg-orange-500 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Basic</button>
                              <button onClick={() => setProMode(true)} className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${proMode ? 'bg-orange-500 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Pro</button>
                            </div>
                          </div>
                          <div className="p-5 space-y-5">
                            {!proMode ? (
                              <div className="space-y-4">
                                <div className="relative">
                                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Symbol / Asset</label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={showSymbolDropdown ? symbolSearch : symbol}
                                      onChange={e => { setSymbolSearch(e.target.value.toUpperCase()); setSymbol(e.target.value.toUpperCase()); setShowSymbolDropdown(true); }}
                                      onFocus={() => { setShowSymbolDropdown(true); setSymbolSearch(''); }}
                                      placeholder="Search or select symbol..."
                                      className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 text-orange-400 text-sm font-mono font-bold placeholder-slate-700 focus:border-orange-500/50 focus:outline-none transition"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs cursor-pointer" onClick={() => setShowSymbolDropdown(!showSymbolDropdown)}>{showSymbolDropdown ? '▲' : '▼'}</span>
                                  </div>
                                  {showSymbolDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#0D0D0D] border border-[#222] rounded-xl z-50 shadow-2xl">
                                      <div className="p-3 space-y-3 max-h-72 overflow-y-auto">
                                        {(() => {
                                          const ALL_GROUPS = [
                                            {cat:'🪙 CRYPTO', symbols:['BTCUSDT','ETHUSDT','SOLUSDT','BNBUSDT','XRPUSDT','DOGEUSDT','ADAUSDT','DOTUSDT','MATICUSDT','PEPEUSDT','SHIBUSDT','AVAXUSDT']},
                                            {cat:'💱 FOREX', symbols:['EURUSD','GBPUSD','USDJPY','XAUUSD','AUDUSD','USDCAD','USDCHF','NZDUSD','GBPJPY','EURJPY','XAGUSD','USDTRY']},
                                            {cat:'📈 STOCKS', symbols:['AAPL','TSLA','NVDA','MSFT','AMZN','GOOGL','META','NFLX','AMD','INTC','BABA','COIN']},
                                            {cat:'📊 INDEX', symbols:['QQQ','SPY','DIA','IWM','VIX']},
                                          ];
                                          const filtered = symbolSearch
                                            ? ALL_GROUPS.map(g => ({...g, symbols: g.symbols.filter(s => s.includes(symbolSearch))})).filter(g => g.symbols.length > 0)
                                            : ALL_GROUPS;
                                          return filtered.map(group => (
                                            <div key={group.cat}>
                                              <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1.5 px-1">{group.cat}</div>
                                              <div className="flex flex-wrap gap-1.5">
                                                {group.symbols.map(s => (
                                                  <button key={s} onClick={() => { setSymbol(s); setSymbolSearch(''); setShowSymbolDropdown(false); }} className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${symbol === s ? 'bg-orange-500 text-white' : 'bg-[#1A1A1A] text-slate-400 hover:text-white hover:bg-orange-500/10'}`}>{s}</button>
                                                ))}
                                              </div>
                                            </div>
                                          ));
                                        })()}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Timeframe</label>
                                  <div className="flex flex-wrap gap-1.5">
                                    {(analysisType === 'scalp' ? ['1M','5M','15M','30M'] : ['1H','4H','Daily','Weekly']).map(tf => (
                                      <button key={tf} onClick={() => setTimeframe(tf)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${timeframe === tf ? 'bg-orange-500 text-white' : 'bg-[#111] border border-[#222] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>{tf}</button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Account Balance ($)</label>
                                  <input type="number" value={accountSize} onChange={e => setAccountSize(e.target.value)} placeholder="e.g. 10000" className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-700 focus:border-orange-500/50 focus:outline-none transition" />
                                </div>
                                <div>
                                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Risk Profile</label>
                                  <div className="grid grid-cols-3 gap-2">
                                    {([{id:'safe' as const,label:'Safe',desc:'1% · 1x'},{id:'balanced' as const,label:'Balanced',desc:'2% · 5x'},{id:'aggressive' as const,label:'Aggressive',desc:'5% · 10x'}]).map(p => (
                                      <button key={p.id} onClick={() => setRiskProfile(p.id)} className={`py-2.5 px-2 rounded-xl text-center transition-all border ${riskProfile === p.id ? p.id === 'safe' ? 'bg-green-500/15 border-green-500/50 text-green-400' : p.id === 'aggressive' ? 'bg-red-500/15 border-red-500/50 text-red-400' : 'bg-orange-500/15 border-orange-500/50 text-orange-400' : 'bg-[#111] border-[#222] text-slate-500 hover:border-orange-500/30'}`}>
                                        <div className="text-xs font-bold">{p.label}</div>
                                        <div className="text-[10px] opacity-70 mt-0.5">{p.desc}</div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-5">
                                <div className="relative">
                                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Symbol / Asset</label>
                                  <div className="relative">
                                    <input type="text" value={showSymbolDropdown ? symbolSearch : symbol} onChange={e => { setSymbolSearch(e.target.value.toUpperCase()); setSymbol(e.target.value.toUpperCase()); setShowSymbolDropdown(true); }} onFocus={() => { setShowSymbolDropdown(true); setSymbolSearch(''); }} placeholder="Search or select symbol..." className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 text-orange-400 text-sm font-mono font-bold placeholder-slate-700 focus:border-orange-500/50 focus:outline-none transition" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs cursor-pointer" onClick={() => setShowSymbolDropdown(!showSymbolDropdown)}>{showSymbolDropdown ? '▲' : '▼'}</span>
                                  </div>
                                  {showSymbolDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#0D0D0D] border border-[#222] rounded-xl z-50 shadow-2xl">
                                      <div className="p-3 space-y-3 max-h-72 overflow-y-auto">
                                        {(() => {
                                          const ALL_GROUPS = [
                                            {cat:'🪙 CRYPTO',symbols:['BTCUSDT','ETHUSDT','SOLUSDT','BNBUSDT','XRPUSDT','DOGEUSDT','ADAUSDT','DOTUSDT','MATICUSDT','PEPEUSDT','SHIBUSDT','AVAXUSDT']},
                                            {cat:'💱 FOREX',symbols:['EURUSD','GBPUSD','USDJPY','XAUUSD','AUDUSD','USDCAD','USDCHF','NZDUSD','GBPJPY','EURJPY','XAGUSD','USDTRY']},
                                            {cat:'📈 STOCKS',symbols:['AAPL','TSLA','NVDA','MSFT','AMZN','GOOGL','META','NFLX','AMD','INTC','BABA','COIN']},
                                            {cat:'📊 INDEX',symbols:['QQQ','SPY','DIA','IWM','VIX']},
                                          ];
                                          const filtered = symbolSearch ? ALL_GROUPS.map(g => ({...g,symbols:g.symbols.filter(s => s.includes(symbolSearch))})).filter(g => g.symbols.length > 0) : ALL_GROUPS;
                                          return filtered.map(group => (
                                            <div key={group.cat}>
                                              <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1.5 px-1">{group.cat}</div>
                                              <div className="flex flex-wrap gap-1.5">
                                                {group.symbols.map(s => (
                                                  <button key={s} onClick={() => { setSymbol(s); setSymbolSearch(''); setShowSymbolDropdown(false); }} className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${symbol === s ? 'bg-orange-500 text-white' : 'bg-[#1A1A1A] text-slate-400 hover:text-white hover:bg-orange-500/10'}`}>{s}</button>
                                                ))}
                                              </div>
                                            </div>
                                          ));
                                        })()}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Timeframe</label>
                                  <div className="flex flex-wrap gap-1.5">
                                    {(analysisType === 'scalp' ? ['1M','3M','5M','15M','30M'] : ['1H','4H','Daily','Weekly']).map(tf => (
                                      <button key={tf} onClick={() => setTimeframe(tf)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${timeframe === tf ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105' : 'bg-[#111] border border-[#222] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>{tf}</button>
                                    ))}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="col-span-2">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Account Balance ($)</label>
                                    <input type="number" value={accountSize} onChange={e => setAccountSize(e.target.value)} placeholder="e.g. 10000" className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-700 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/10 focus:outline-none transition" />
                                  </div>
                                  <div>
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Risk (%)</label>
                                    <div className="flex gap-1">
                                      {['1','2','5','10','20'].map(r => (
                                        <button key={r} onClick={() => setRiskPercent(r)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${riskPercent === r ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-[#111] border border-[#222] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>{r}%</button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Leverage</label>
                                    <div className="flex gap-1">
                                      {['1','10','25','50','100'].map(l => (
                                        <button key={l} onClick={() => setLeverage(l)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${leverage === l ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-[#111] border border-[#222] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>{l}x</button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>R:R Ratio</label>
                                    <div className="flex gap-1">
                                      {['1:1','1:2','1:3','1:4'].map(r => (
                                        <button key={r} onClick={() => setRrRatio(r)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${rrRatio === r ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-[#111] border border-[#222] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>{r}</button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>SL / Order</label>
                                    <div className="flex gap-1">
                                      {[{v:'fixed',l:'Fixed'},{v:'atr',l:'ATR'}].map(o => (
                                        <button key={o.v} onClick={() => setSlType(o.v)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${slType === o.v ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-[#111] border border-[#222] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>{o.l}</button>
                                      ))}
                                      {[{v:'market',l:'Mkt'},{v:'limit',l:'Lmt'}].map(o => (
                                        <button key={o.v} onClick={() => setOrderType(o.v)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${orderType === o.v ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-[#111] border border-[#222] text-slate-500 hover:text-white hover:border-orange-500/30'}`}>{o.l}</button>
                                      ))}
                                    </div>
                                  </div>
                                  {orderType === 'limit' && (
                                    <div className="col-span-2">
                                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5"><span className="w-0.5 h-3 bg-orange-500 rounded-full"></span>Limit Price</label>
                                      <input type="number" value={limitPrice} onChange={e => setLimitPrice(e.target.value)} placeholder="e.g. 42500.00" className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-700 focus:border-orange-500/50 focus:outline-none transition" />
                                    </div>
                                  )}
                                </div>


                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Start Analysis Button */}
                      {selectedFile && !result && (
                        <button onClick={startAnalysis} disabled={uploading}
                          className="w-full py-3 rounded-xl font-semibold text-sm bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white transition flex items-center justify-center gap-2">
                          {uploading ? (
                            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Analyzing...</>
                          ) : (
                            <>Start Analysis</>
                          )}
                        </button>
                      )}
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
                                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{'Signal'}</div>
                                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">{parsed.signal}</h2>
                                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                                    {parsed.signal === 'UPTREND'
                                      ? ('Bullish momentum detected')
                                      : parsed.signal === 'DOWNTREND'
                                      ? ('Bearish momentum detected')
                                      : ('Neutral / Consolidation')}
                                  </p>
                                </div>
                              </div>
                              <div className="text-left sm:text-right w-full sm:w-auto">
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">{'Confidence'}</div>
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
                                <div className="flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4 text-orange-500" /><span className="text-orange-400 text-xs font-bold uppercase">{'Entry'}</span></div>
                                <div className="text-xl font-black text-white">{parsed.entry}</div>
                              </div>
                            )}
                            {parsed.stopLoss && (
                              <div className="bg-[#0D0D0D] border border-red-500/20 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-red-400" /><span className="text-red-400 text-xs font-bold uppercase">{'Stop Loss'}</span></div>
                                <div className="text-xl font-black text-white">{parsed.stopLoss}</div>
                              </div>
                            )}
                            {parsed.takeProfit && (
                              <div className="bg-[#0D0D0D] border border-green-500/20 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2"><Target className="w-4 h-4 text-green-400" /><span className="text-green-400 text-xs font-bold uppercase">{'Take Profit'}</span></div>
                                <div className="text-xl font-black text-white">{parsed.takeProfit}</div>
                              </div>
                            )}
                          </div>
                          {/* KEY LEVELS - compact tags */}
                          {parsed.keyLevels.length > 0 && (
                            <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-3"><Target className="w-3.5 h-3.5 text-purple-400" /><span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Key Levels</span></div>
                              <div className="flex flex-wrap gap-2">{parsed.keyLevels.map((level, i) => <span key={i} className="bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs px-2.5 py-1 rounded-lg">{level}</span>)}</div>
                            </div>
                          )}
                          {/* PATTERN + RISK - 2 col */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {parsed.signalReason.length > 0 && (
                              <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3"><Activity className="w-3.5 h-3.5 text-orange-400" /><span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Pattern</span></div>
                                <div className="flex flex-col gap-1.5">{parsed.signalReason.map((r, i) => <div key={i} className="flex items-start gap-1.5"><span className="text-orange-400 text-xs mt-0.5">▸</span><span className="text-slate-400 text-xs">{r}</span></div>)}</div>
                              </div>
                            )}
                            {parsed.riskAssessment.length > 0 && (
                              <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-3.5 h-3.5 text-yellow-400" /><span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Risk</span></div>
                                <div className="flex flex-wrap gap-2">{parsed.riskAssessment.map((r, i) => <span key={i} className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs px-2.5 py-1 rounded-lg">{r}</span>)}</div>
                              </div>
                            )}
                          </div>
                          {/* SMC - Smart Money Concepts */}
                          {parsed.smc?.length > 0 && (
                            <div className="bg-[#0D0D0D] border border-orange-500/20 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-3"><Zap className="w-3.5 h-3.5 text-orange-400" /><span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Smart Money Concepts</span></div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{parsed.smc.map((item, i) => <div key={i} className="bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-2 text-xs text-slate-300">{item}</div>)}</div>
                            </div>
                          )}
                          {/* BREAKOUT + INDICATORS + FIB + PSYCHOLOGY */}
                          {(parsed.breakoutRetest?.length > 0 || parsed.indicators?.length > 0 || parsed.fibonacci?.length > 0 || parsed.psychologyPlan?.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {parsed.breakoutRetest?.length > 0 && (
                                <div className="bg-[#0D0D0D] border border-purple-500/20 rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-3"><TrendingUp className="w-3.5 h-3.5 text-purple-400" /><span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Breakout & Retest</span></div>
                                  <div className="flex flex-col gap-1.5">{parsed.breakoutRetest.map((item, i) => <div key={i} className="flex items-start gap-1.5"><span className="text-purple-400 text-xs mt-0.5">▸</span><span className="text-slate-400 text-xs">{item}</span></div>)}</div>
                                </div>
                              )}
                              {parsed.indicators?.length > 0 && (
                                <div className="bg-[#0D0D0D] border border-blue-500/20 rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-3"><Activity className="w-3.5 h-3.5 text-blue-400" /><span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Indicators</span></div>
                                  <div className="flex flex-wrap gap-2">{parsed.indicators.map((item, i) => <span key={i} className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs px-2.5 py-1 rounded-lg">{item}</span>)}</div>
                                </div>
                              )}
                              {parsed.fibonacci?.length > 0 && (
                                <div className="bg-[#0D0D0D] border border-yellow-500/20 rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-3"><BarChart3 className="w-3.5 h-3.5 text-yellow-400" /><span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Fibonacci</span></div>
                                  <div className="flex flex-wrap gap-2">{parsed.fibonacci.map((item, i) => <span key={i} className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs px-2.5 py-1 rounded-lg">{item}</span>)}</div>
                                </div>
                              )}
                              {parsed.psychologyPlan?.length > 0 && (
                                <div className="bg-[#0D0D0D] border border-green-500/20 rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-3"><Shield className="w-3.5 h-3.5 text-green-400" /><span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Trade Plan</span></div>
                                  <div className="flex flex-col gap-1.5">{parsed.psychologyPlan.map((item, i) => <div key={i} className="flex items-start gap-1.5"><span className="text-green-400 text-xs mt-0.5">▸</span><span className="text-slate-400 text-xs">{item}</span></div>)}</div>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <p className="text-slate-400 text-xs">
                              'Educational analysis only. Not financial advice. Always do your own research before trading.'
                            </p>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                  {!result && !loading && analysisType && (
                    <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-20 text-center">
                      <BarChart3 className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">{'Upload a chart to get AI-powered analysis'}</p>
                    </div>
                  )}
                </div>
              )}
              {currentPage === 'market' && <MarketAnalysisPage />}
              {currentPage === 'news' && <div className="w-full h-full flex flex-col"><NewsPanel /></div>}
              {currentPage === 'history' && <HistoryPage />}
              {currentPage === 'settings' && <SettingsPage userData={userData} />}
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
        const token = getToken();
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
          <span className="text-slate-200 text-sm font-semibold">{'Crypto News'}</span>
        </div>
        <span className="text-slate-600 text-xs">{'Live Feed'}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : news.length === 0 ? (
          <div className="text-center text-slate-600 text-sm p-8">{'No news available'}</div>
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
                      {sentiment === 'bullish' && <span className="text-xs text-green-400 font-medium">▲ {'Bull'}</span>}
                      {sentiment === 'bearish' && <span className="text-xs text-red-400 font-medium">▼ {'Bear'}</span>}
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
