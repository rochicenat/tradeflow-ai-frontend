'use client';

import { BarChart3, Activity, TrendingUp, Zap } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

export function QuickStats() {
  const { data: user } = useUserData();

  const stats = [
    {
      label: 'Aylık Analiz',
      value: `${user?.analyses_used || 0} / ${user?.analyses_limit || 0}`,
      icon: BarChart3,
      color: 'text-[#3B82F6]',
    },
    {
      label: 'Kalan Hak',
      value: `${(user?.analyses_limit || 0) - (user?.analyses_used || 0)}`,
      icon: Zap,
      color: 'text-[#F59E0B]',
    },
    {
      label: 'Plan',
      value: user?.plan === 'pro' ? 'Pro' : user?.plan === 'premium' ? 'Premium' : 'Free',
      icon: TrendingUp,
      color: 'text-[#10B981]',
    },
    {
      label: 'Durum',
      value: user?.subscription_status === 'active' ? 'Aktif' : 'İnaktif',
      icon: Activity,
      color: user?.subscription_status === 'active' ? 'text-[#10B981]' : 'text-[#94A3B8]',
    },
  ];

  return (
    <div className="space-y-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="p-4 bg-[#1E293B]/60 backdrop-blur-xl rounded-xl border border-[#334155]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#94A3B8]">{stat.label}</span>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-lg font-bold text-white">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
