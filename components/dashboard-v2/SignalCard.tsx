'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface SignalCardProps {
  action: 'BUY' | 'SELL' | 'WAIT';
  reasoning: string;
  confidence: number;
}

export function SignalCard({ action, reasoning, confidence }: SignalCardProps) {
  const config = {
    BUY: {
      bg: 'from-[#10B981] to-[#059669]',
      text: 'AL',
      icon: TrendingUp,
      border: 'border-[#10B981]',
    },
    SELL: {
      bg: 'from-[#EF4444] to-[#DC2626]',
      text: 'SAT',
      icon: TrendingDown,
      border: 'border-[#EF4444]',
    },
    WAIT: {
      bg: 'from-[#F59E0B] to-[#D97706]',
      text: 'BEKLE',
      icon: Clock,
      border: 'border-[#F59E0B]',
    },
  };

  const { bg, text, icon: Icon, border } = config[action];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative p-8 rounded-2xl bg-gradient-to-br ${bg} shadow-2xl border-2 ${border}`}
    >
      {/* Main Signal */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-white/80 mb-1">AI Sinyali</p>
          <h2 className="text-5xl font-bold text-white">{text}</h2>
        </div>
        <Icon className="w-16 h-16 text-white/30" strokeWidth={1.5} />
      </div>

      {/* Reasoning */}
      <p className="text-white/90 text-sm mb-4 leading-relaxed">
        {reasoning}
      </p>

      {/* Confidence Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="text-xs text-white font-medium">
          Güven: %{confidence}
        </span>
      </div>
    </motion.div>
  );
}
