'use client';
import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Shield, Zap, DollarSign } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || 'https://thorough-wonder-production-4037.up.railway.app';

interface BotData {
  btc: number;
  eth: number;
  killStatus: string;
  tradingAllowed: boolean;
  strategies: any[];
  pnl: number;
  openPositions: number;
}

export default function BotWidget() {
  const [data, setData] = useState<BotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [killConfirm, setKillConfirm] = useState(false);

  const headers: Record<string, string> = {
    'X-Internal-Token': process.env.NEXT_PUBLIC_BOT_TOKEN || 'internal-token-changethis',
    'Content-Type': 'application/json',
  };

  const fetchData = async () => {
    try {
      const [btcRes, ethRes, killRes, posRes, stratRes] = await Promise.allSettled([
        fetch(`${API_URL}/api/v1/binance/price/BTCUSDT`, { headers }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/binance/price/ETHUSDT`, { headers }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/kill-switch/status`, { headers }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/positions/summary`, { headers }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/strategies/list`, { headers }).then(r => r.json()),
      ]);

      setData({
        btc: btcRes.status === 'fulfilled' ? btcRes.value.price : 0,
        eth: ethRes.status === 'fulfilled' ? ethRes.value.price : 0,
        killStatus: killRes.status === 'fulfilled' ? killRes.value.global_state : 'UNKNOWN',
        tradingAllowed: killRes.status === 'fulfilled' ? killRes.value.trading_allowed : false,
        strategies: stratRes.status === 'fulfilled' ? (stratRes.value.strategies || []) : [],
        pnl: posRes.status === 'fulfilled' ? (posRes.value.total_realized_pnl || 0) : 0,
        openPositions: posRes.status === 'fulfilled' ? (posRes.value.open_count || 0) : 0,
      });
    } catch (e) {
      console.error('BotWidget fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleKillSwitch = async () => {
    if (!killConfirm) { setKillConfirm(true); return; }
    try {
      await fetch(`${API_URL}/api/v1/kill-switch/trigger`, {
        method: 'POST',
        headers,
      });
      setKillConfirm(false);
      fetchData();
    } catch (e) {
      console.error('Kill switch error:', e);
    }
  };

  if (loading) return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-2xl p-6">
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        Bot servisi yükleniyor...
      </div>
    </div>
  );

  const isKilled = data?.killStatus === 'TRIGGERED';

  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-500" />
          <span className="text-white font-semibold">Trading Bot</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-bold ${isKilled ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
          {isKilled ? '● DURDURULDU' : '● CANLI'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#141414] rounded-xl p-3">
          <div className="text-slate-400 text-xs mb-1">₿ Bitcoin</div>
          <div className="text-white font-bold">${data?.btc ? Number(data.btc).toLocaleString() : '—'}</div>
        </div>
        <div className="bg-[#141414] rounded-xl p-3">
          <div className="text-slate-400 text-xs mb-1">Ξ Ethereum</div>
          <div className="text-white font-bold">${data?.eth ? Number(data.eth).toLocaleString() : '—'}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#141414] rounded-xl p-3">
          <div className="text-slate-400 text-xs mb-1 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Realized PnL
          </div>
          <div className={`font-bold ${(data?.pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${(data?.pnl || 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-[#141414] rounded-xl p-3">
          <div className="text-slate-400 text-xs mb-1 flex items-center gap-1">
            <Activity className="w-3 h-3" /> Açık Pozisyon
          </div>
          <div className="text-white font-bold">{data?.openPositions ?? '—'}</div>
        </div>
      </div>

      <div className="bg-[#141414] rounded-xl p-3">
        <div className="text-slate-400 text-xs mb-2 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Aktif Stratejiler
        </div>
        <div className="space-y-1">
          {data?.strategies?.length ? data.strategies.map((s: any) => (
            <div key={s.name} className="flex items-center justify-between">
              <span className="text-green-400 text-xs font-mono">{s.name}</span>
              <span className="text-slate-500 text-xs">{s.version ? `v${s.version}` : ''}</span>
            </div>
          )) : (
            <span className="text-slate-600 text-xs">Strateji bulunamadı</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Shield className="w-3 h-3" />
          İşlem İzni:{' '}
          <span className={data?.tradingAllowed ? 'text-green-400' : 'text-red-400'}>
            {data?.tradingAllowed ? '✅ Var' : '❌ Yok'}
          </span>
        </div>
        <button
          onClick={handleKillSwitch}
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition ${
            killConfirm
              ? 'bg-red-500 text-white'
              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
          }`}
        >
          {killConfirm ? '⚠️ EMİN MİSİN? TEKRAR TIKLA' : '🛑 Kill Switch'}
        </button>
        {killConfirm && (
          <button
            onClick={() => setKillConfirm(false)}
            className="w-full py-2 rounded-xl text-xs text-slate-400 border border-slate-700 hover:border-slate-500 transition"
          >
            İptal
          </button>
        )}
      </div>
    </div>
  );
}
