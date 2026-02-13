'use client';

import { Target, Shield, TrendingUp } from 'lucide-react';

interface TradePanelProps {
  entryPrice?: number;
  takeProfit?: number;
  stopLoss?: number;
  riskRewardRatio?: number;
}

export function TradePanel({ 
  entryPrice = 0, 
  takeProfit = 0, 
  stopLoss = 0,
  riskRewardRatio = 0 
}: TradePanelProps) {
  return (
    <div className="p-6 bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#334155]">
      <h3 className="text-sm text-[#94A3B8] mb-4">Hızlı İşlem Bilgileri</h3>
      
      <div className="space-y-3">
        {/* Entry Price */}
        <div className="flex items-center justify-between p-3 bg-[#0F172A]/50 rounded-xl">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm text-[#94A3B8]">Giriş</span>
          </div>
          <span className="text-sm font-bold text-white">
            ${entryPrice > 0 ? entryPrice.toFixed(2) : '--'}
          </span>
        </div>

        {/* Take Profit */}
        <div className="flex items-center justify-between p-3 bg-[#10B981]/10 rounded-xl border border-[#10B981]/30">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm text-[#94A3B8]">Take Profit</span>
          </div>
          <span className="text-sm font-bold text-[#10B981]">
            ${takeProfit > 0 ? takeProfit.toFixed(2) : '--'}
          </span>
        </div>

        {/* Stop Loss */}
        <div className="flex items-center justify-between p-3 bg-[#EF4444]/10 rounded-xl border border-[#EF4444]/30">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#EF4444]" />
            <span className="text-sm text-[#94A3B8]">Stop Loss</span>
          </div>
          <span className="text-sm font-bold text-[#EF4444]">
            ${stopLoss > 0 ? stopLoss.toFixed(2) : '--'}
          </span>
        </div>

        {/* Risk/Reward Ratio */}
        <div className="mt-4 p-4 bg-gradient-to-r from-[#3B82F6]/20 to-[#8B5CF6]/20 rounded-xl border border-[#3B82F6]/30">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#94A3B8]">Risk/Reward</span>
            <span className="text-xl font-bold text-white">
              {riskRewardRatio > 0 ? `1:${riskRewardRatio.toFixed(1)}` : '--'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
