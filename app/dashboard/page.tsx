'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Activity,
  BarChart3,
  Target,
  AlertTriangle,
  Shield,
  Zap,
  LogOut,
  User,
  CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';

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

export default function TradingDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

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
      console.error('Error fetching user:', error);
      router.push('/login');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please login first');
      router.push('/login');
      return;
    }

    setUploading(true);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

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
  }, [router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    disabled: uploading
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out');
    router.push('/');
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'bullish': return <TrendingUp className="w-8 h-8" />;
      case 'bearish': return <TrendingDown className="w-8 h-8" />;
      default: return <Minus className="w-8 h-8" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'bullish': return 'from-green-500 to-emerald-600';
      case 'bearish': return 'from-red-500 to-rose-600';
      default: return 'from-yellow-500 to-orange-500';
    }
  };

  const getTrendBg = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'bullish': return 'bg-green-500/10 border-green-500/30';
      case 'bearish': return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-yellow-500/10 border-yellow-500/30';
    }
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

  const parseAnalysis = (text: string) => {
    const sections = {
      support: '',
      breakout: '',
      indicators: '',
      strategy: ''
    };

    const supportMatch = text.match(/\*\*Support\/Resistance.*?:\*\*([\s\S]*?)(?=\*\*|$)/);
    const breakoutMatch = text.match(/\*\*Possible Breakout.*?:\*\*([\s\S]*?)(?=\*\*|$)/);
    const indicatorsMatch = text.match(/\*\*RSI or Indicator.*?:\*\*([\s\S]*?)(?=\*\*|$)/);
    const strategyMatch = text.match(/\*\*Trading Idea.*?:\*\*([\s\S]*?)(?=\*\*|$)/);

    if (supportMatch) sections.support = supportMatch[1].trim();
    if (breakoutMatch) sections.breakout = breakoutMatch[1].trim();
    if (indicatorsMatch) sections.indicators = indicatorsMatch[1].trim();
    if (strategyMatch) sections.strategy = strategyMatch[1].trim();

    return sections;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                TradeFlow AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
              <span className="text-blue-300 font-semibold text-sm uppercase">{userData?.plan || 'Free'}</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <User className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300 text-sm font-medium">{userData?.name || 'User'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition"
            >
              <LogOut className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-slate-300 font-semibold">Usage</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Analyses</span>
                    <span className="text-white font-semibold">
                      {userData?.analyses_used || 0} / {userData?.analyses_limit || 3}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                      style={{ width: `${((userData?.analyses_used || 0) / (userData?.analyses_limit || 3)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
              <h3 className="text-slate-300 font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/pricing')}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Upgrade Plan
                </button>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-slate-300 font-semibold">Market</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">BTC</span>
                  <span className="text-green-400 font-semibold text-sm">+2.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">ETH</span>
                  <span className="text-green-400 font-semibold text-sm">+1.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">SOL</span>
                  <span className="text-red-400 font-semibold text-sm">-0.5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-6">
              <div
                {...getRootProps()}
                className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all cursor-pointer
                  ${isDragActive 
                    ? 'border-cyan-500 bg-cyan-500/10' 
                    : 'border-slate-700 bg-slate-900/30 hover:border-cyan-500/50 hover:bg-slate-900/50'
                  }`}
              >
                <input {...getInputProps()} />
                <div className="p-12 text-center">
                  <motion.div
                    animate={{ y: isDragActive ? -10 : 0 }}
                    className="mb-4"
                  >
                    <Upload className="w-16 h-16 mx-auto text-cyan-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {uploading ? 'Analyzing...' : 'Upload Trading Chart'}
                  </h3>
                  <p className="text-slate-400">
                    {uploading 
                      ? 'AI is processing your chart...'
                      : isDragActive 
                        ? 'Drop your chart here'
                        : 'Drag & drop or click to select a chart image'
                    }
                  </p>
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-cyan-400 font-semibold">Analyzing Chart...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className={`relative overflow-hidden rounded-2xl border ${getTrendBg(result.trend)} backdrop-blur-xl p-8`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${getTrendColor(result.trend)} text-white`}>
                          {getTrendIcon(result.trend)}
                        </div>
                        <div>
                          <h2 className="text-4xl font-bold text-white uppercase mb-2">
                            {result.trend}
                          </h2>
                          <p className="text-slate-300">
                            {result.trend === 'bullish' ? 'Strong upward momentum detected' : 
                             result.trend === 'bearish' ? 'Downward pressure identified' : 
                             'Sideways consolidation pattern'}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-slate-400 mb-2">Confidence Score</div>
                        <div className="text-3xl font-bold text-white mb-2">
                          {getConfidenceValue(result.confidence)}%
                        </div>
                        <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getConfidenceColor(getConfidenceValue(result.confidence))} transition-all`}
                            style={{ width: `${getConfidenceValue(result.confidence)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(() => {
                      const sections = parseAnalysis(result.analysis);
                      return (
                        <>
                          {sections.support && (
                            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Target className="w-5 h-5 text-blue-400" />
                                <h3 className="text-white font-semibold">Support & Resistance</h3>
                              </div>
                              <div className="text-slate-300 text-sm space-y-2">
                                {sections.support.split('\n').slice(0, 3).map((line, i) => {
                                  const clean = line.replace(/\*\*/g, '').replace(/^\*\s*/, '').trim();
                                  return clean ? <p key={i}>• {clean}</p> : null;
                                })}
                              </div>
                            </div>
                          )}

                          {sections.breakout && (
                            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-5 h-5 text-green-400" />
                                <h3 className="text-white font-semibold">Breakout Zones</h3>
                              </div>
                              <div className="text-slate-300 text-sm space-y-2">
                                {sections.breakout.split('\n').slice(0, 3).map((line, i) => {
                                  const clean = line.replace(/\*\*/g, '').replace(/^\*\s*/, '').trim();
                                  return clean ? <p key={i}>• {clean}</p> : null;
                                })}
                              </div>
                            </div>
                          )}

                          {sections.indicators && (
                            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Activity className="w-5 h-5 text-purple-400" />
                                <h3 className="text-white font-semibold">Technical Indicators</h3>
                              </div>
                              <div className="text-slate-300 text-sm space-y-2">
                                {sections.indicators.split('\n').slice(0, 3).map((line, i) => {
                                  const clean = line.replace(/\*\*/g, '').replace(/^\*\s*/, '').trim();
                                  return clean ? <p key={i}>• {clean}</p> : null;
                                })}
                              </div>
                            </div>
                          )}

                          {sections.strategy && (
                            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Shield className="w-5 h-5 text-cyan-400" />
                                <h3 className="text-white font-semibold">Trading Strategy</h3>
                              </div>
                              <div className="text-slate-300 text-sm space-y-2">
                                {sections.strategy.split('\n').slice(0, 3).map((line, i) => {
                                  const clean = line.replace(/\*\*/g, '').replace(/^\*\s*/, '').trim();
                                  return clean ? <p key={i}>• {clean}</p> : null;
                                })}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-yellow-400 font-semibold mb-1">Risk Disclaimer</h4>
                        <p className="text-slate-300 text-sm">
                          This analysis is for informational purposes only. Always use stop-loss orders and never risk more than you can afford to lose.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!result && !loading && (
              <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-12 text-center">
                <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">No Analysis Yet</h3>
                <p className="text-slate-500">Upload a trading chart to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
