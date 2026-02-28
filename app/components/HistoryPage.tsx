'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, TrendingDown, Minus, AlertCircle, Trash2, DollarSign, Shield, Target, Activity } from 'lucide-react';
import { getToken } from '@/app/lib/auth';

interface HistoryItem {
  id: number;
  trend: string;
  confidence: string;
  analysis_text: string;
  created_at: string;
}

interface ParsedAnalysis {
  entry: string;
  stopLoss: string;
  takeProfit: string;
  keyLevels: string[];
  signalReason: string[];
  riskAssessment: string[];
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/analysis-history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) setHistory(await response.json());
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnalysis = async (id: number) => {
    const token = getToken();
    if (!token) return;
    setDeleting(id);
    try {
      const response = await fetch(`https://tradeflow-ai-backend-production.up.railway.app/delete-analysis/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) setHistory(history.filter(item => item.id !== id));
      else alert('Failed to delete analysis');
    } catch (error) {
      alert('Error deleting analysis');
    } finally {
      setDeleting(null);
    }
  };

  const parseAnalysis = (text: string): ParsedAnalysis => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    let entry = '', stopLoss = '', takeProfit = '';
    let keyLevels: string[] = [], signalReason: string[] = [], riskAssessment: string[] = [];
    let currentSection = '';
    for (const line of lines) {
      if (line.startsWith('Entry:') || line.startsWith('Reference:')) {
        entry = line.replace('Entry:', '').replace('Reference:', '').trim();
      } else if (line.startsWith('SL:') || line.startsWith('Lower:')) {
        stopLoss = line.replace('SL:', '').replace('Lower:', '').trim();
      } else if (line.startsWith('TP:') || line.startsWith('Upper:')) {
        takeProfit = line.replace('TP:', '').replace('Upper:', '').trim();
      } else if (line.includes('Key Levels')) {
        currentSection = 'levels';
      } else if (line.includes('Pattern Analysis') || line.includes('Signal Reason')) {
        currentSection = 'reason';
      } else if (line.includes('Risk')) {
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
    return { entry, stopLoss, takeProfit, keyLevels, signalReason, riskAssessment };
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'bullish') return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (trend === 'bearish') return 'text-red-400 bg-red-500/10 border-red-500/30';
    return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'bullish') return <TrendingUp className="w-5 h-5 text-green-400" />;
    if (trend === 'bearish') return <TrendingDown className="w-5 h-5 text-red-400" />;
    return <Minus className="w-5 h-5 text-yellow-400" />;
  };

  const getTrendLabel = (trend: string) => {
    if (trend === 'bullish') return 'Uptrend';
    if (trend === 'bearish') return 'Downtrend';
    return 'Neutral';
  };

  const getConfidenceBadge = (confidence: string) => {
    const colors: Record<string, string> = {
      high: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[confidence.toLowerCase()] || colors.medium;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateString));
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (history.length === 0) return (
    <div className="text-center py-20">
      <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
      <h3 className="text-2xl font-semibold text-slate-400 mb-2">No Analysis History</h3>
      <p className="text-slate-500">Upload your first chart to get started</p>
    </div>
  );

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Analysis History</h2>
        <p className="text-slate-400">View all your past chart analyses</p>
      </div>
      <div className="space-y-4">
        {history.map((item, index) => {
          const parsed = parseAnalysis(item.analysis_text);
          const isExpanded = expanded === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6 hover:border-orange-500/30 transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${getTrendColor(item.trend)}`}>
                    {getTrendIcon(item.trend)}
                    <span className="font-semibold uppercase text-sm">{getTrendLabel(item.trend)}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-lg border text-xs font-semibold uppercase ${getConfidenceBadge(item.confidence)}`}>
                    {item.confidence} Confidence
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.created_at)}
                  </div>
                  <button
                    onClick={() => deleteAnalysis(item.id)}
                    disabled={deleting === item.id}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition disabled:opacity-50"
                  >
                    {deleting === item.id
                      ? <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                      : <Trash2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Entry / SL / TP */}
              {(parsed.entry || parsed.stopLoss || parsed.takeProfit) && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {parsed.entry && (
                    <div className="bg-black/30 border border-orange-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1 mb-1"><DollarSign className="w-3 h-3 text-orange-500" /><span className="text-orange-500 text-xs font-semibold uppercase">Entry Price</span></div>
                      <div className="text-white font-bold text-sm">{parsed.entry}</div>
                    </div>
                  )}
                  {parsed.stopLoss && (
                    <div className="bg-black/30 border border-red-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1 mb-1"><Shield className="w-3 h-3 text-red-400" /><span className="text-red-400 text-xs font-semibold uppercase">Stop Loss</span></div>
                      <div className="text-white font-bold text-sm">{parsed.stopLoss}</div>
                    </div>
                  )}
                  {parsed.takeProfit && (
                    <div className="bg-black/30 border border-green-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1 mb-1"><Target className="w-3 h-3 text-green-400" /><span className="text-green-400 text-xs font-semibold uppercase">Take Profit</span></div>
                      <div className="text-white font-bold text-sm">{parsed.takeProfit}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Expand / Collapse */}
              {(parsed.keyLevels.length > 0 || parsed.signalReason.length > 0 || parsed.riskAssessment.length > 0) && (
                <>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : item.id)}
                    className="text-orange-400 hover:text-orange-300 text-sm font-medium transition mb-3"
                  >
                    {isExpanded ? '▲ Hide details' : '▼ Show details'}
                  </button>
                  {isExpanded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {parsed.keyLevels.length > 0 && (
                        <div className="bg-black/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2"><Target className="w-4 h-4 text-purple-400" /><span className="text-white text-sm font-semibold">Key Levels</span></div>
                          {parsed.keyLevels.map((l, i) => <div key={i} className="text-slate-300 text-xs mb-1">• {l}</div>)}
                        </div>
                      )}
                      {parsed.signalReason.length > 0 && (
                        <div className="bg-black/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2"><Activity className="w-4 h-4 text-orange-500" /><span className="text-white text-sm font-semibold">Pattern Analysis</span></div>
                          {parsed.signalReason.map((r, i) => <div key={i} className="text-slate-300 text-xs mb-1">• {r}</div>)}
                        </div>
                      )}
                      {parsed.riskAssessment.length > 0 && (
                        <div className="bg-black/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-400" /><span className="text-white text-sm font-semibold">Risk</span></div>
                          {parsed.riskAssessment.map((r, i) => <div key={i} className="text-slate-300 text-xs mb-1">• {r}</div>)}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
