'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

interface HistoryItem {
  id: number;
  trend: string;
  confidence: string;
  analysis_text: string;
  created_at: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/analysis-history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'bullish') return <TrendingUp className="w-5 h-5 text-green-400" />;
    if (trend === 'bearish') return <TrendingDown className="w-5 h-5 text-red-400" />;
    return <Minus className="w-5 h-5 text-yellow-400" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'bullish') return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (trend === 'bearish') return 'text-red-400 bg-red-500/10 border-red-500/30';
    return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
  };

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[confidence.toLowerCase() as keyof typeof colors] || colors.medium;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-slate-400 mb-2">No Analysis History</h3>
        <p className="text-slate-500">Upload your first chart to get started</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Analysis History</h2>
        <p className="text-slate-400">View all your past chart analyses</p>
      </div>

      <div className="space-y-4">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6 hover:border-orange-500/30 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${getTrendColor(item.trend)}`}>
                  {getTrendIcon(item.trend)}
                  <span className="font-semibold uppercase text-sm">
                    {item.trend === 'bullish' ? 'Uptrend' : item.trend === 'bearish' ? 'Downtrend' : 'Neutral'}
                  </span>
                </div>

                <div className={`px-3 py-1 rounded-lg border text-xs font-semibold uppercase ${getConfidenceBadge(item.confidence)}`}>
                  {item.confidence} Confidence
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                {formatDate(item.created_at)}
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {item.analysis_text}
              {item.analysis_text.length >= 200 && '...'}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
