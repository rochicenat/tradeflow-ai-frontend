'use client';

import { motion } from 'framer-motion';

interface ConfidenceScoreProps {
  score: number; // 0-100
}

export function ConfidenceScore({ score }: ConfidenceScoreProps) {
  const getColor = () => {
    if (score >= 70) return 'from-[#10B981] to-[#059669]';
    if (score >= 40) return 'from-[#F59E0B] to-[#D97706]';
    return 'from-[#EF4444] to-[#DC2626]';
  };

  const getLabel = () => {
    if (score >= 70) return 'Güçlü';
    if (score >= 40) return 'Orta';
    return 'Zayıf';
  };

  return (
    <div className="p-6 bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#334155]">
      <h3 className="text-sm text-[#94A3B8] mb-4">Güven Skoru</h3>
      
      {/* Progress Bar */}
      <div className="relative h-4 bg-[#0F172A] rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${getColor()} relative`}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>

      {/* Score Display */}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-white">%{score}</span>
        <span className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${getColor()}`}>
          {getLabel()}
        </span>
      </div>
    </div>
  );
}
