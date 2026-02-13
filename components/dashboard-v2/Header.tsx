'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { LogOut, TrendingUp } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#1E293B]/80 backdrop-blur-xl border-b border-[#334155] z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">TradeFlow AI</h1>
            <p className="text-xs text-[#94A3B8]">Professional Trading Analysis</p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-[#94A3B8] capitalize">
              {user?.plan === 'pro' ? '⭐ Pro' : user?.plan === 'premium' ? '👑 Premium' : '🆓 Free'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-[#334155] rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-[#94A3B8]" />
          </button>
        </div>
      </div>
    </header>
  );
}
