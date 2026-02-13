'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  CreditCard,
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  PauseCircle
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

  const parseNewFormat = (analysis: string, trend: string, confidence: string): ParsedAnalysis => {
    const lines = analysis.split('\n').map(l => l.trim()).filter(l => l);
    
    let signal = trend.toUpperCase();
    if (signal === 'BULLISH') signal = 'BUY';
    if (signal === 'BEARISH') signal = 'SELL';
    if (signal === 'SIDEWAYS') signal = 'HOLD';
    
    let entry = '';
    let stopLoss = '';
    let takeProfit = '';
    let keyLevels: string[] = [];
    let signalReason: string[] = [];
    let riskAssessment: string[] = [];

    let currentSection = '';

    for (const line of lines) {
      if (line.match(/^(BUY|SELL|HOLD)$/i)) {
        signal = line.toUpperCase();
      } else if (line.startsWith('Entry:')) {
        entry = line.replace('Entry:', '').trim();
      } else if (line.startsWith('SL:')) {
        stopLoss = line.replace('SL:', '').trim();
      } else if (line.startsWith('TP:')) {
        takeProfit = line.replace('TP:', '').trim();
      } else if (line.includes('**Key Levels:**')) {
        currentSection = 'levels';
      } else if (line.includes('**Signal Reason:**')) {
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

    return {
      signal,
      confidence,
      entry,
      stopLoss,
      takeProfit,
      keyLevels,
      signalReason,
      riskAssessment
    };
  };

  const getSignalIcon = (signal: string) => {
    if (signal === 'BUY') return <ArrowUpCircle className="w-12 h-12" />;
    if (signal === 'SELL') return <ArrowDownCircle className="w-12 h-12" />;
    return <PauseCircle className="w-12 h-12" />;
  };

  const getSignalColor = (signal: string) => {
    if (signal === 'BUY') return 'from-green-500 to-emerald-600';
    if (signal === 'SELL') return 'from-red-500 to-rose-600';
    return 'from-yellow-500 to-orange-500';
  };

  const getSignalBg = (signal: string) => {
    if (signal === 'BUY') return 'bg-green-500/10 border-green-500/30';
    if (signal === 'SELL') return 'bg-red-500/10 border-red-500/30';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Activity className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TradeFlow AI
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
             <span className="text-blue-300 font-semibold text-sm uppercase">{userData?.plan || 'Free'}</span>
            </div>
           </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <User className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300 text-sm font-medium">{userData?.name || 'User'}</span>
          </Link>
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
          </Link>
                    <span className="text-white font-semibold">
                      {userData?.analyses_used || 0} / {userData?.analyses_limit || 3}
                    </span>
          </Link>
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
              <button
                onClick={() => router.push('/pricing')}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Upgrade Plan
              </button>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-slate-300 font-semibold">Market</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">BTC</span>
          </Link>
                  <span className="text-green-400 font-semibold text-sm">+2.4%</span>
          </Link>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">ETH</span>
          </Link>
                  <span className="text-green-400 font-semibold text-sm">+1.8%</span>
          </Link>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">SOL</span>
          </Link>
                  <span className="text-red-400 font-semibold text-sm">-0.5%</span>
          </Link>
                </div>
              </div>
            </div>
          </div>

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
                  <motion.div animate={{ y: isDragActive ? -10 : 0 }} className="mb-4">
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
              {result && (() => {
                const parsed = parseNewFormat(result.analysis, result.trend, result.confidence);
                
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className={`relative overflow-hidden rounded-2xl border ${getSignalBg(parsed.signal)} backdrop-blur-xl p-8`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className={`p-6 rounded-2xl bg-gradient-to-br ${getSignalColor(parsed.signal)} text-white shadow-2xl`}>
                            {getSignalIcon(parsed.signal)}
                          </div>
                          <div>
                            <h2 className="text-5xl font-black text-white uppercase mb-2 tracking-tight">
                              {parsed.signal}
                            </h2>
                            <p className="text-slate-300 text-lg">
                              {parsed.signal === 'BUY' ? 'Long position recommended' : 
                               parsed.signal === 'SELL' ? 'Short position recommended' : 
                               'Wait for better setup'}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-slate-400 mb-2">Confidence</div>
                          <div className="text-4xl font-bold text-white mb-3">
                            {getConfidenceValue(parsed.confidence)}%
                          </div>
                          <div className="w-48 h-3 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getConfidenceColor(getConfidenceValue(parsed.confidence))} transition-all`}
                              style={{ width: `${getConfidenceValue(parsed.confidence)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {parsed.entry && (
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-blue-400" />
                            <h4 className="text-blue-400 font-semibold text-sm uppercase">Entry</h4>
                          </div>
                          <div className="text-2xl font-bold text-white">{parsed.entry}</div>
                        </div>
                      )}

                      {parsed.stopLoss && (
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-red-500/30 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-red-400" />
                            <h4 className="text-red-400 font-semibold text-sm uppercase">Stop Loss</h4>
                          </div>
                          <div className="text-2xl font-bold text-white">{parsed.stopLoss}</div>
                        </div>
                      )}

                      {parsed.takeProfit && (
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-green-500/30 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-green-400" />
                            <h4 className="text-green-400 font-semibold text-sm uppercase">Take Profit</h4>
                          </div>
                          <div className="text-2xl font-bold text-white">{parsed.takeProfit}</div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {parsed.keyLevels.length > 0 && (
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-purple-400" />
                            <h3 className="text-white font-semibold">Key Levels</h3>
                          </div>
                          <div className="space-y-2">
                            {parsed.keyLevels.map((level, i) => (
                              <div key={i} className="text-slate-300 text-sm">• {level}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      {parsed.signalReason.length > 0 && (
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-cyan-400" />
                            <h3 className="text-white font-semibold">Signal Reason</h3>
                          </div>
                          <div className="space-y-2">
                            {parsed.signalReason.map((reason, i) => (
                              <div key={i} className="text-slate-300 text-sm">• {reason}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      {parsed.riskAssessment.length > 0 && (
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            <h3 className="text-white font-semibold">Risk</h3>
                          </div>
                          <div className="space-y-2">
                            {parsed.riskAssessment.map((risk, i) => (
                              <div key={i} className="text-slate-300 text-sm">• {risk}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-yellow-400 font-semibold mb-1">Risk Disclaimer</h4>
                          <p className="text-slate-300 text-sm">
                            This is AI-generated analysis for educational purposes. Always use proper risk management and never risk more than you can afford to lose.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {!result && !loading && (
              <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-12 text-center">
                <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">No Analysis Yet</h3>
                <p className="text-slate-500">Upload a trading chart to get AI signals</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
