'use client';
import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Shield, Zap, DollarSign, Plus, Square, Play, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const API_URL = 'https://thorough-wonder-production-4037.up.railway.app';
const BOT_TOKEN = 'internal-token-changethis';

const HEADERS = {
  'X-Internal-Token': BOT_TOKEN,
  'Content-Type': 'application/json',
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface BotData {
  btc: number;
  eth: number;
  killStatus: string;
  tradingAllowed: boolean;
  strategies: Strategy[];
  pnl: number;
  openPositions: number;
}

interface Strategy {
  name: string;
  version?: string;
}

interface Bot {
  id: string;
  name?: string;
  strategy: string;
  symbol: string;
  status: string;
  created_at?: string;
  total_pnl?: number;
  trade_count?: number;
}

type Tab = 'overview' | 'bots' | 'create';

// ─── Component ────────────────────────────────────────────────────────────────

export default function BotWidget() {
  const [data, setData] = useState<BotData | null>(null);
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [botsLoading, setBotsLoading] = useState(false);
  const [killConfirm, setKillConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [expandedBot, setExpandedBot] = useState<string | null>(null);

  // Create form state
  const [createForm, setCreateForm] = useState({
    strategy: '',
    symbol: 'BTCUSDT',
    name: '',
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');

  // ── Fetch overview data ──────────────────────────────────────────────────────
  const fetchData = async () => {
    try {
      const [btcRes, ethRes, killRes, posRes, stratRes] = await Promise.allSettled([
        fetch(`${API_URL}/api/v1/binance/price/BTCUSDT`, { headers: HEADERS }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/binance/price/ETHUSDT`, { headers: HEADERS }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/kill-switch/status`, { headers: HEADERS }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/positions/summary`, { headers: HEADERS }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/strategies/list`, { headers: HEADERS }).then(r => r.json()),
      ]);

      const strategies: Strategy[] = stratRes.status === 'fulfilled'
        ? (stratRes.value.strategies || [])
        : [];

      setData({
        btc: btcRes.status === 'fulfilled' ? btcRes.value.price : 0,
        eth: ethRes.status === 'fulfilled' ? ethRes.value.price : 0,
        killStatus: killRes.status === 'fulfilled' ? killRes.value.global_state : 'UNKNOWN',
        tradingAllowed: killRes.status === 'fulfilled' ? killRes.value.trading_allowed : false,
        strategies,
        pnl: posRes.status === 'fulfilled' ? (posRes.value.total_realized_pnl || 0) : 0,
        openPositions: posRes.status === 'fulfilled' ? (posRes.value.open_count || 0) : 0,
      });

      // Pre-fill strategy select with first option
      if (strategies.length > 0 && !createForm.strategy) {
        setCreateForm(f => ({ ...f, strategy: strategies[0].name }));
      }
    } catch (e) {
      console.error('BotWidget fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch bot list ───────────────────────────────────────────────────────────
  const fetchBots = async () => {
    setBotsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/bots/list`, { headers: HEADERS });
      const json = await res.json();
      setBots(json.bots || json || []);
    } catch (e) {
      console.error('Bot list error:', e);
    } finally {
      setBotsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBots();
    const interval = setInterval(() => {
      fetchData();
      fetchBots();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // ── Kill switch ──────────────────────────────────────────────────────────────
  const handleKillSwitch = async () => {
    if (!killConfirm) { setKillConfirm(true); return; }
    try {
      await fetch(`${API_URL}/api/v1/kill-switch/trigger`, { method: 'POST', headers: HEADERS });
      setKillConfirm(false);
      fetchData();
      fetchBots();
    } catch (e) {
      console.error('Kill switch error:', e);
    }
  };

  // ── Stop bot ─────────────────────────────────────────────────────────────────
  const handleStopBot = async (botId: string) => {
    try {
      await fetch(`${API_URL}/api/v1/bots/${botId}/stop`, { method: 'DELETE', headers: HEADERS });
      fetchBots();
    } catch (e) {
      console.error('Stop bot error:', e);
    }
  };

  // ── Trade (run) bot ──────────────────────────────────────────────────────────
  const handleTradeBot = async (botId: string) => {
    try {
      await fetch(`${API_URL}/api/v1/bots/${botId}/trade`, { method: 'POST', headers: HEADERS });
      fetchBots();
    } catch (e) {
      console.error('Trade bot error:', e);
    }
  };

  // ── Create bot ───────────────────────────────────────────────────────────────
  const handleCreateBot = async () => {
    if (!createForm.strategy || !createForm.symbol) {
      setCreateError('Strateji ve sembol zorunlu!');
      return;
    }
    setCreating(true);
    setCreateError('');
    setCreateSuccess('');
    try {
      const payload: any = {
        strategy_name: createForm.strategy,
        symbol: createForm.symbol.toUpperCase(),
      };
      if (createForm.name) payload.name = createForm.name;

      const res = await fetch(`${API_URL}/api/v1/bots/create`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || 'Bot oluşturulamadı');

      setCreateSuccess(`✅ Bot oluşturuldu! ID: ${json.bot_id || json.id || '—'}`);
      setCreateForm(f => ({ ...f, name: '' }));
      fetchBots();
      setTimeout(() => {
        setActiveTab('bots');
        setCreateSuccess('');
      }, 1500);
    } catch (e: any) {
      setCreateError(e.message || 'Hata oluştu');
    } finally {
      setCreating(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

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

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-500" />
          <span className="text-white font-semibold">Trading Bot</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { fetchData(); fetchBots(); }}
            className="text-slate-500 hover:text-slate-300 transition"
            title="Yenile"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <span className={`text-xs px-2 py-1 rounded-full font-bold ${isKilled ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
            {isKilled ? '● DURDURULDU' : '● CANLI'}
          </span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-[#141414] rounded-xl p-1">
        {(['overview', 'bots', 'create'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === tab
                ? 'bg-orange-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'overview' ? '📊 Genel' : tab === 'bots' ? `🤖 Botlar (${bots.length})` : '➕ Yeni Bot'}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════
          TAB: OVERVIEW
      ══════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
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
              {data?.strategies?.length ? data.strategies.map((s: Strategy) => (
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
        </>
      )}

      {/* ══════════════════════════════════════════════════
          TAB: BOTS LIST
      ══════════════════════════════════════════════════ */}
      {activeTab === 'bots' && (
        <div className="space-y-2">
          {botsLoading ? (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-4 justify-center">
              <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              Botlar yükleniyor...
            </div>
          ) : bots.length === 0 ? (
            <div className="text-center py-6 space-y-2">
              <div className="text-slate-500 text-sm">Henüz bot yok</div>
              <button
                onClick={() => setActiveTab('create')}
                className="text-orange-400 text-xs hover:text-orange-300 transition underline"
              >
                İlk botu oluştur →
              </button>
            </div>
          ) : (
            bots.map((bot) => {
              const isActive = bot.status === 'active' || bot.status === 'running';
              const isExpanded = expandedBot === bot.id;
              return (
                <div key={bot.id} className="bg-[#141414] rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-green-400' : 'bg-slate-600'}`} />
                      <div className="min-w-0">
                        <div className="text-white text-xs font-semibold truncate">
                          {bot.name || bot.strategy || 'Bot'}
                        </div>
                        <div className="text-slate-500 text-xs">{bot.symbol}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleTradeBot(bot.id)}
                        title="Trade çalıştır"
                        className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition"
                      >
                        <Play className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleStopBot(bot.id)}
                        title="Botu durdur"
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                      >
                        <Square className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setExpandedBot(isExpanded ? null : bot.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 transition"
                      >
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-3 pb-3 pt-0 border-t border-[#1A1A1A] space-y-2">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <div className="text-slate-500 text-xs">ID</div>
                          <div className="text-slate-300 text-xs font-mono truncate">{bot.id}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs">Durum</div>
                          <div className={`text-xs font-semibold ${isActive ? 'text-green-400' : 'text-slate-400'}`}>
                            {bot.status}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs">PnL</div>
                          <div className={`text-xs font-bold ${(bot.total_pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${(bot.total_pnl || 0).toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs">İşlem Sayısı</div>
                          <div className="text-white text-xs">{bot.trade_count ?? '—'}</div>
                        </div>
                      </div>
                      {bot.created_at && (
                        <div className="text-slate-600 text-xs">
                          Oluşturulma: {new Date(bot.created_at).toLocaleString('tr-TR')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {bots.length > 0 && (
            <button
              onClick={() => setActiveTab('create')}
              className="w-full py-2 rounded-xl text-xs text-orange-400 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3 h-3" /> Yeni Bot Ekle
            </button>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          TAB: CREATE BOT
      ══════════════════════════════════════════════════ */}
      {activeTab === 'create' && (
        <div className="space-y-3">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Yeni Bot Oluştur</div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs">Strateji *</label>
            <select
              value={createForm.strategy}
              onChange={e => setCreateForm(f => ({ ...f, strategy: e.target.value }))}
              className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-orange-500/50 transition"
            >
              <option value="">Strateji seç...</option>
              {data?.strategies?.length ? data.strategies.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              )) : (
                <>
                  <option value="EMA_CROSSOVER">EMA Crossover</option>
                  <option value="RSI_MEAN_REVERSION">RSI Mean Reversion</option>
                </>
              )}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs">Sembol *</label>
            <div className="flex gap-2 mb-2">
              {['BTCUSDT', 'ETHUSDT', 'SOLUSDT'].map(sym => (
                <button
                  key={sym}
                  onClick={() => setCreateForm(f => ({ ...f, symbol: sym }))}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                    createForm.symbol === sym
                      ? 'bg-orange-500 text-white'
                      : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'
                  }`}
                >
                  {sym.replace('USDT', '')}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={createForm.symbol}
              onChange={e => setCreateForm(f => ({ ...f, symbol: e.target.value.toUpperCase() }))}
              placeholder="Veya manuel gir: XRPUSDT"
              className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-orange-500/50 transition placeholder-slate-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs">Bot Adı <span className="text-slate-600">(opsiyonel)</span></label>
            <input
              type="text"
              value={createForm.name}
              onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Örn: BTC EMA Bot #1"
              className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-orange-500/50 transition placeholder-slate-600"
            />
          </div>

          {createError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 text-red-400 text-xs">
              {createError}
            </div>
          )}
          {createSuccess && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2 text-green-400 text-xs">
              {createSuccess}
            </div>
          )}

          <button
            onClick={handleCreateBot}
            disabled={creating}
            className={`w-full py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 ${
              creating
                ? 'bg-orange-500/50 text-white cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-400'
            }`}
          >
            {creating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Oluşturuluyor...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Bot Oluştur & Başlat
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
