'use client';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Activity,
  BarChart3,
  Target,
  AlertTriangle,
  Shield,
  Zap,
  LogOut,
  CreditCard,
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  PauseCircle,
  Home,
  TrendingUp,
  History,
  Settings as SettingsIcon,
  Menu,
  X,
  Timer,
  TrendingDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import SettingsPage from '../components/SettingsPage';
import HistoryPage from '../components/HistoryPage';
import MarketAnalysisPage from '../components/MarketAnalysisPage';
interface AnalysisResult {
  analysis: string;
  trend: string;
  confidence: string;
}
interface UserData {
  email: string;
  name: string;
  plan: string;
  analyses_used: number;
  analyses_limit: number;
  subscription_status: string;
}
interface ParsedAnalysis {
  signal: string;
  confidence: string;
  entry: string;
  stopLoss: string;
  takeProfit: string;
  keyLevels: string[];
  signalReason: string[];
  riskAssessment: string[];
}
export default function AnalyticsDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(typeof window !== 'undefined' && window.innerWidth > 1024);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [analysisType, setAnalysisType] = useState<'swing' | 'scalp' | null>(null);
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  };
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    if (!analysisType) { toast.error('Please select Swing or Scalp Trading first'); return; }
    const file = acceptedFiles[0];
    const token = localStorage.getItem('token');
    if (!token) { toast.error('Please login first'); router.push('/login'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setUploading(true);
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('analysis_type', analysisType);
    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/analyze-image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Analysis failed');
      }
      const data = await response.json();
      setResult(data);
      fetchUserData();
      toast.success('Analysis complete!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to analyze chart');
    } finally {
      setUploading(false);
      setLoading(false);
    }
  }, [router, analysisType]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    disabled: uploading || !analysisType
  });
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out');
    router.push('/');
  };
  const parseNewFormat = (analysis: string, trend: string, confidence: string): ParsedAnalysis => {
    const lines = analysis.split('\n').map(l => l.trim()).filter(l => l);
    let signal = trend.toUpperCase();
    if (signal === 'BULLISH') signal = 'UPTREND';
    if (signal === 'BEARISH') signal = 'DOWNTREND';
    if (signal === 'SIDEWAYS') signal = 'NEUTRAL';
    let entry = '', stopLoss = '', takeProfit = '';
    let keyLevels: string[] = [], signalReason: string[] = [], riskAssessment: string[] = [];
    let currentSection = '';
    for (const line of lines) {
      if (line.match(/^(BUY|SELL|HOLD|UPTREND|DOWNTREND|NEUTRAL)$/i)) {
        if (line === 'BUY') signal = 'UPTREND';
        else if (line === 'SELL') signal = 'DOWNTREND';
        else if (line === 'HOLD') signal = 'NEUTRAL';
        else signal = line.toUpperCase();
      } else if (line.startsWith('Entry:') || line.startsWith('Reference:')) {
        entry = line.replace('Entry:', '').replace('Reference:', '').trim();
      } else if (line.startsWith('SL:') || line.startsWith('Lower:')) {
        stopLoss = line.replace('SL:', '').replace('Lower:', '').trim();
      } else if (line.startsWith('TP:') || line.startsWith('Upper:')) {
        takeProfit = line.replace('TP:', '').replace('Upper:', '').trim();
      } else if (line.includes('**Key Levels:**')) {
        currentSection = 'levels';
      } else if (line.includes('**Pattern Analysis:**') || line.includes('**Signal Reason:**')) {
        currentSection = 'reason';
      } else if (line.includes('**Risk')) {
        currentSection = 'risk';
      } else if (line.startsWith('*') || line.startsWith('•')) {
        const clean = line.replace(/^[*•]\s*/, '').replace(/\*\*/g, '').trim();
        if (clean) {
          if (currentSection === 'levels') keyLevels.push(clean);
          else if (currentSection === 'reason') signalReason.push(clean);
          else if (currentSection === 'risk') riskAssessment.push(clean);
        }
      }
    }
    return { signal, confidence, entry, stopLoss, takeProfit, keyLevels, signalReason, riskAssessment };
  };
  const getSignalIcon = (signal: string) => {
    if (signal === 'UPTREND') return <ArrowUpCircle className="w-12 h-12" />;
    if (signal === 'DOWNTREND') return <ArrowDownCircle className="w-12 h-12" />;
    return <PauseCircle className="w-12 h-12" />;
  };
  const getSignalColor = (signal: string) => {
    if (signal === 'UPTREND') return 'from-green-500 to-emerald-600';
    if (signal === 'DOWNTREND') return 'from-red-500 to-rose-600';
    return 'from-yellow-500 to-orange-500';
  };
  const getSignalBg = (signal: string) => {
    if (signal === 'UPTREND') return 'bg-green-500/10 border-green-500/30';
    if (signal === 'DOWNTREND') return 'bg-red-500/10 border-red-500/30';
    return 'bg-yellow-500/10 border-yellow-500/30';
  };
  const getConfidenceValue = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high': return 85;
      case 'medium': return 65;
      default: return 35;
    }
  };
  const getConfidenceColor = (value: number) => {
    if (value >= 70) return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (value >= 40) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-rose-600';
  };
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'swing', name: 'Swing Trading', icon: TrendingUp },
    { id: 'scalp', name: 'Scalp Trading', icon: Timer },
    { id: 'market', name: 'Market Analysis', icon: BarChart3 },
    { id: 'history', name: 'Analysis History', icon: History },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];
  const handleMenuClick = (id: string) => {
    if (id === 'swing') { setAnalysisType('swing'); setCurrentPage('dashboard'); setResult(null); }
    else if (id === 'scalp') { setAnalysisType('scalp'); setCurrentPage('dashboard'); setResult(null); }
    else { setCurrentPage(id); }
  };
  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0A0A0A] border-r border-[#252525] transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-[#252525] flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold text-white">TradeFlow</span>
            </div>
          ) : (
            <Activity className="w-8 h-8 text-orange-500 mx-auto" />
          )}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = 
              (item.id === 'swing' && analysisType === 'swing' && currentPage === 'dashboard') ||
              (item.id === 'scalp' && analysisType === 'scalp' && currentPage === 'dashboard') ||
              (item.id === currentPage && item.id !== 'swing' && item.id !== 'scalp');
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#252525]">
          <div className={`${sidebarOpen ? 'flex items-center justify-between' : 'flex flex-col items-center gap-2'}`}>
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
                    {userData?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{userData?.name || 'User'}</div>
                    <div className="text-xs text-slate-400 uppercase">{userData?.plan || 'Free'}</div>
                  </div>
                </div>
                <button onClick={handleLogout} className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition">
                  <LogOut className="w-4 h-4 text-red-400" />
                </button>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
                  {userData?.name?.charAt(0) || 'U'}
                </div>
                <button onClick={handleLogout} className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition">
                  <LogOut className="w-4 h-4 text-red-400" />
                </button>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-[#252525] hover:bg-[#1A1A1A] transition flex items-center justify-center"
        >
          {sidebarOpen ? <X className="w-5 h-5 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="border-b border-[#252525] bg-[#0A0A0A] sticky top-0 z-50">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {currentPage === 'dashboard' && analysisType === 'swing' ? 'Swing Trading' :
                 currentPage === 'dashboard' && analysisType === 'scalp' ? 'Scalp Trading' :
                 menuItems.find(i => i.id === currentPage)?.name || 'Dashboard'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {currentPage === 'dashboard' && analysisType === 'swing' && 'Capture multi-day trends with AI-powered entry and exit timing'}
                {currentPage === 'dashboard' && analysisType === 'scalp' && 'Execute precision trades on 1-15 minute charts'}
                {currentPage === 'dashboard' && !analysisType && 'Select a trading style to begin analysis'}
                {currentPage === 'market' && 'Real-time market data and pattern insights'}
                {currentPage === 'history' && 'View your analysis history and patterns'}
                {currentPage === 'settings' && 'Manage your account preferences'}
              </p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
              <span className="text-orange-400 font-semibold text-sm uppercase">{userData?.plan || 'Free'}</span>
            </div>
          </div>
        </header>
        <div className="p-6">
          {currentPage === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-orange-500" />
                    <h3 className="text-slate-300 font-semibold">Usage</h3>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {userData?.analyses_used || 0} / {userData?.analyses_limit || 3}
                  </div>
                  <div className="h-2 bg-[#252525] rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all" style={{ width: `${((userData?.analyses_used || 0) / (userData?.analyses_limit || 3)) * 100}%` }} />
                  </div>
                </div>
                <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
                  <h3 className="text-slate-300 font-semibold mb-4">Quick Actions</h3>
                  <button onClick={() => router.push('/pricing')} className="w-full px-4 py-3 bg-orange-500 rounded-lg text-white font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Upgrade Plan
                  </button>
                </div>
              </div>

              {/* Trading Type Selection */}
              {!analysisType && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAnalysisType('swing')}
                    className="bg-[#1A1A1A] border border-[#252525] hover:border-orange-500/50 rounded-2xl p-8 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20 transition">
                        <TrendingUp className="w-6 h-6 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Swing Trading</h3>
                    </div>
                    <p className="text-slate-400 mb-6">Capture multi-day trends with AI-powered entry and exit timing.</p>
                    <div className="w-full py-3 rounded-xl border border-orange-500/30 text-orange-400 font-semibold text-center group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition">
                      Start Analysis
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAnalysisType('scalp')}
                    className="bg-[#1A1A1A] border border-[#252525] hover:border-orange-500/50 rounded-2xl p-8 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20 transition">
                        <Timer className="w-6 h-6 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Scalp Trading</h3>
                    </div>
                    <p className="text-slate-400 mb-6">Execute precision trades on 1-15 minute charts.</p>
                    <div className="w-full py-3 rounded-xl border border-orange-500/30 text-orange-400 font-semibold text-center group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition">
                      Start Analysis
                    </div>
                  </motion.button>
                </div>
              )}

              {/* Upload Area - only show if analysisType selected */}
              {analysisType && (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <button onClick={() => { setAnalysisType(null); setResult(null); setImagePreview(null); }} className="text-slate-400 hover:text-white text-sm flex items-center gap-1 transition">
                      ← Change type
                    </button>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${analysisType === 'swing' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {analysisType === 'swing' ? '📈 Swing Trading' : '⚡ Scalp Trading'}
                    </div>
                  </div>
                  <div
                    {...getRootProps()}
                    className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all cursor-pointer
                      ${isDragActive ? 'border-orange-500 bg-orange-500/10' : 'border-[#252525] bg-[#1A1A1A] hover:border-orange-500/50'}`}
                  >
                    <input {...getInputProps()} />
                    <div className="p-12 text-center">
                      <motion.div animate={{ y: isDragActive ? -10 : 0 }} className="mb-4">
                        <Upload className="w-16 h-16 mx-auto text-orange-500" />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="max-w-full max-h-64 rounded-lg mb-4 mx-auto" />}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {uploading ? 'Analyzing...' : 'Upload Market Chart'}
                      </h3>
                      <p className="text-slate-400">
                        {uploading ? 'AI is processing your data...' : isDragActive ? 'Drop your chart here' : 'Drag & drop or click to select a chart image'}
                      </p>
                    </div>
                    {uploading && (
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-orange-400 font-semibold">Analyzing Chart...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Results */}
              <AnimatePresence>
                {result && (() => {
                  const parsed = parseNewFormat(result.analysis, result.trend, result.confidence);
                  return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                      <div className={`relative overflow-hidden rounded-2xl border ${getSignalBg(parsed.signal)} p-8`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className={`p-6 rounded-2xl bg-gradient-to-br ${getSignalColor(parsed.signal)} text-white shadow-2xl`}>
                              {getSignalIcon(parsed.signal)}
                            </div>
                            <div>
                              <h2 className="text-5xl font-black text-white uppercase mb-2 tracking-tight">{parsed.signal}</h2>
                              <p className="text-slate-300 text-lg">
                                {parsed.signal === 'UPTREND' ? 'Upward momentum detected' : parsed.signal === 'DOWNTREND' ? 'Downward momentum detected' : 'Neutral consolidation'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-slate-400 mb-2">Confidence</div>
                            <div className="text-4xl font-bold text-white mb-3">{getConfidenceValue(parsed.confidence)}%</div>
                            <div className="w-48 h-3 bg-[#252525] rounded-full overflow-hidden">
                              <div className={`h-full ${getConfidenceColor(getConfidenceValue(parsed.confidence))} transition-all`} style={{ width: `${getConfidenceValue(parsed.confidence)}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {parsed.entry && (
                          <div className="bg-[#1A1A1A] border border-orange-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-2"><DollarSign className="w-5 h-5 text-orange-500" /><h4 className="text-orange-500 font-semibold text-sm uppercase">Reference</h4></div>
                            <div className="text-2xl font-bold text-white">{parsed.entry}</div>
                          </div>
                        )}
                        {parsed.stopLoss && (
                          <div className="bg-[#1A1A1A] border border-red-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-2"><Shield className="w-5 h-5 text-red-400" /><h4 className="text-red-400 font-semibold text-sm uppercase">Lower</h4></div>
                            <div className="text-2xl font-bold text-white">{parsed.stopLoss}</div>
                          </div>
                        )}
                        {parsed.takeProfit && (
                          <div className="bg-[#1A1A1A] border border-green-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-2"><Target className="w-5 h-5 text-green-400" /><h4 className="text-green-400 font-semibold text-sm uppercase">Upper</h4></div>
                            <div className="text-2xl font-bold text-white">{parsed.takeProfit}</div>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {parsed.keyLevels.length > 0 && (
                          <div className="bg-[#1A1A1A] border border-[#252525] rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4"><Target className="w-5 h-5 text-purple-400" /><h3 className="text-white font-semibold">Key Levels</h3></div>
                            <div className="space-y-2">{parsed.keyLevels.map((level, i) => <div key={i} className="text-slate-300 text-sm">• {level}</div>)}</div>
                          </div>
                        )}
                        {parsed.signalReason.length > 0 && (
                          <div className="bg-[#1A1A1A] border border-[#252525] rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4"><Activity className="w-5 h-5 text-orange-500" /><h3 className="text-white font-semibold">Pattern Analysis</h3></div>
                            <div className="space-y-2">{parsed.signalReason.map((reason, i) => <div key={i} className="text-slate-300 text-sm">• {reason}</div>)}</div>
                          </div>
                        )}
                        {parsed.riskAssessment.length > 0 && (
                          <div className="bg-[#1A1A1A] border border-[#252525] rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4"><AlertTriangle className="w-5 h-5 text-yellow-400" /><h3 className="text-white font-semibold">Risk</h3></div>
                            <div className="space-y-2">{parsed.riskAssessment.map((risk, i) => <div key={i} className="text-slate-300 text-sm">• {risk}</div>)}</div>
                          </div>
                        )}
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-yellow-400 font-semibold mb-1">Educational Disclaimer</h4>
                            <p className="text-slate-300 text-sm">This is AI-generated data analysis for educational purposes only. Not financial advice.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
              {!result && !loading && analysisType && (
                <div className="bg-[#1A1A1A] border border-[#252525] rounded-2xl p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No Analysis Yet</h3>
                  <p className="text-slate-500">Upload a chart to get AI-powered insights</p>
                </div>
              )}
            </div>
          )}
          {currentPage === 'market' && <MarketAnalysisPage />}
          {currentPage === 'history' && <HistoryPage />}
          {currentPage === 'settings' && <SettingsPage userData={userData} />}
        </div>
      </div>
    </div>
  );
}
