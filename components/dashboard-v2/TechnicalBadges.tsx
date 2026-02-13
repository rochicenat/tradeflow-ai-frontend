'use client';

import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

interface TechnicalData {
  rsi: { value: number; status: 'oversold' | 'neutral' | 'overbought' };
  ema: { trend: 'up' | 'down' | 'sideways' };
  volume: { strength: 'strong' | 'moderate' | 'weak' };
  volatility: { level: 'high' | 'medium' | 'low' };
}

interface TechnicalBadgesProps {
  data: TechnicalData;
}

export function TechnicalBadges({ data }: TechnicalBadgesProps) {
  const getRSIColor = () => {
    if (data.rsi.status === 'oversold') return 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30';
    if (data.rsi.status === 'overbought') return 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30';
    return 'bg-[#94A3B8]/20 text-[#94A3B8] border-[#94A3B8]/30';
  };

  const getEMAIcon = () => {
    if (data.ema.trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (data.ema.trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getEMAColor = () => {
    if (data.ema.trend === 'up') return 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30';
    if (data.ema.trend === 'down') return 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30';
    return 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30';
  };

  return (
    <div className="p-6 bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#334155]">
      <h3 className="text-sm text-[#94A3B8] mb-4">Teknik Göstergeler</h3>
      
      <div className="flex flex-wrap gap-2">
        {/* RSI Badge */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getRSIColor()}`}>
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm font-medium">RSI: {data.rsi.value}</span>
        </div>

        {/* EMA Badge */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getEMAColor()}`}>
          {getEMAIcon()}
          <span className="text-sm font-medium">EMA {data.ema.trend === 'up' ? '↑' : data.ema.trend === 'down' ? '↓' : '→'}</span>
        </div>

        {/* Volume Badge */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
          data.volume.strength === 'strong' ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30' :
          data.volume.strength === 'moderate' ? 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30' :
          'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30'
        }`}>
          <Activity className="w-4 h-4" />
          <span className="text-sm font-medium">Hacim: {data.volume.strength}</span>
        </div>

        {/* Volatility Badge */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
          data.volatility.level === 'high' ? 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30' :
          data.volatility.level === 'medium' ? 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30' :
          'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30'
        }`}>
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm font-medium">Vol: {data.volatility.level}</span>
        </div>
      </div>
    </div>
  );
}
