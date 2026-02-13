'use client';

import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';

interface RiskIndicatorProps {
  level: 'low' | 'medium' | 'high';
}

export function RiskIndicator({ level }: RiskIndicatorProps) {
  const config = {
    low: {
      bg: 'bg-[#10B981]/10',
      border: 'border-[#10B981]/30',
      text: 'text-[#10B981]',
      icon: Shield,
      label: 'Düşük Risk',
    },
    medium: {
      bg: 'bg-[#F59E0B]/10',
      border: 'border-[#F59E0B]/30',
      text: 'text-[#F59E0B]',
      icon: AlertCircle,
      label: 'Orta Risk',
    },
    high: {
      bg: 'bg-[#EF4444]/10',
      border: 'border-[#EF4444]/30',
      text: 'text-[#EF4444]',
      icon: AlertTriangle,
      label: 'Yüksek Risk',
    },
  };

  const { bg, border, text, icon: Icon, label } = config[level];

  return (
    <div className={`p-4 rounded-xl ${bg} border ${border} backdrop-blur-sm`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${text}`} />
        <div>
          <p className="text-xs text-[#94A3B8]">Risk Seviyesi</p>
          <p className={`text-sm font-semibold ${text}`}>{label}</p>
        </div>
      </div>
    </div>
  );
}
