'use client';
import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Shield, Zap, DollarSign, Plus, Square, Play, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const API_URL = 'https://thorough-wonder-production-4037.up.railway.app';
const HEADERS = {
  'X-Internal-Token': 'internal-token-changethis',
  'Content-Type': 'application/json',
};

interface Strategy { name: string; version?: string; }
interface BotData {
  btc: number; eth: number; killStatus: string;
  tradingAllowed: boolean; strategies: Strategy[]; pnl: number; openPositions: number;
}
type Tab = 'overview' | 'bots' | 'create';

export default function BotWidget({ userEmail }: { userEmail?: string }) {
  const [data, setData]           = useState<BotData | null>(null);
  const [bots, setBots]           = useState<string[]>([]);
  const [loading, setLoading]     = useState(true);
  const [killConfirm, setKillConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [expandedBot, setExpandedBot] = useState<string | null>(null);
  const [botOrders, setBotOrders] = useState<Record<string, any[]>>({});
  const [botSummaries, setBotSummaries] = useState<Record<string, any>>({});

  const [form, setForm] = useState({ strategy: '', symbol: 'BTCUSDT', name: '' });
  const [creating, setCreating]   = useState(false);
  const [createMsg, setCreateMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // ── fetch overview ──────────────────────────────────────────────────────────
  const fetchData = async () => {
    try {
      const [btcR, ethR, killR, posR, stratR] = await Promise.allSettled([
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT').then(r => r.json()),
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT').then(r => r.json()),
        fetch(`${API_URL}/api/v1/kill-switch/status`, { headers: HEADERS }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/positions/summary`, { headers: HEADERS }).then(r => r.json()),
        fetch(`${API_URL}/api/v1/strategies/list`, { headers: HEADERS }).then(r => r.json()),
      ]);
      const strategies: Strategy[] = stratR.status === 'fulfilled' ? (stratR.value.strategies || []) : [];
      setData({
        // Public Binance API returns { symbol, price } — price is a string
        btc: btcR.status === 'fulfilled' ? parseFloat(btcR.value.price) : 0,
        eth: ethR.status === 'fulfilled' ? parseFloat(ethR.value.price) : 0,
        killStatus: killR.status === 'fulfilled' ? killR.value.global_state : 'UNKNOWN',
        tradingAllowed: killR.status === 'fulfilled' ? killR.value.trading_allowed : false,
        strategies,
        pnl: posR.status === 'fulfilled' ? (posR.value.total_realized_pnl || 0) : 0,
        openPositions: posR.status === 'fulfilled' ? (posR.value.open_count || 0) : 0,
      });
      if (strategies.length > 0 && !form.strategy)
        setForm(f => ({ ...f, strategy: strategies[0].name }));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  // ── fetch bot list ──────────────────────────────────────────────────────────
  const fetchBots = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/bots/list`, { headers: HEADERS });
      const json = await res.json();
      // active_bots is array of bot_id strings
      setBots(Array.isArray(json.active_bots) ? json.active_bots : []);
    } catch (e) { console.error(e); }
  };

  // ── fetch single bot summary ────────────────────────────────────────────────
  const fetchBotSummary = async (botId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/bots/${botId}/summary`, { headers: HEADERS });
      if (res.ok) {
        const json = await res.json();
        setBotSummaries(prev => ({ ...prev, [botId]: json }));
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchData(); fetchBots();
    const iv = setInterval(() => { fetchData(); fetchBots(); }, 15000);
    return () => clearInterval(iv);
  }, []);

  // fetch summaries when bot list changes
  useEffect(() => {
    bots.forEach(id => fetchBotSummary(id));
  }, [bots]);

  // ── fetch bot orders ───────────────────────────────────────────────────────
  const fetchBotOrders = async (botId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/bots/${botId}/orders?limit=10`, { headers: HEADERS });
      if (res.ok) {
        const json = await res.json();
        setBotOrders(prev => ({ ...prev, [botId]: json.orders || [] }));
      }
    } catch (e) { console.error(e); }
  };

  // ── kill switch ─────────────────────────────────────────────────────────────
  const handleKill = async () => {
    if (!killConfirm) { setKillConfirm(true); return; }
    await fetch(`${API_URL}/api/v1/kill-switch/trigger`, { method: 'POST', headers: HEADERS });
    setKillConfirm(false); fetchData(); fetchBots();
  };

  // ── stop bot ────────────────────────────────────────────────────────────────
  const handleStop = async (botId: string) => {
    await fetch(`${API_URL}/api/v1/bots/${botId}/stop`, { method: 'DELETE', headers: HEADERS });
    setBots(prev => prev.filter(id => id !== botId));
    setBotSummaries(prev => { const n = { ...prev }; delete n[botId]; return n; });
  };

  // ── create bot ──────────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!form.strategy || !form.symbol) {
      setCreateMsg({ type: 'error', text: 'Strateji ve sembol zorunlu!' }); return;
    }
    setCreating(true); setCreateMsg(null);
    try {
      const botId = crypto.randomUUID();
      const userId = userEmail || `user_${Date.now()}`;
      const payload = {
        bot_id: botId,
        user_id: userId,
        strategy_name: form.strategy,
        symbol: form.symbol.toUpperCase(),
        mode: 'paper',
        initial_balance: 10000.0,
        ...(form.name ? { name: form.name } : {}),
      };
      const res = await fetch(`${API_URL}/api/v1/bots/create`, {
        method: 'POST', headers: HEADERS, body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        // json.detail may be array (FastAPI validation) or string
        const msg = Array.isArray(json.detail)
          ? json.detail.map((e: any) => `${e.loc?.slice(-1)[0]}: ${e.msg}`).join(', ')
          : (typeof json.detail === 'string' ? json.detail : 'Hata oluştu');
        throw new Error(msg);
      }
      setCreateMsg({ type: 'success', text: `✅ Bot oluşturuldu! ID: ${json.bot_id}` });
      setForm(f => ({ ...f, name: '' }));
      fetchBots();
      setTimeout(() => { setActiveTab('bots'); setCreateMsg(null); }, 1500);
    } catch (e: any) {
      setCreateMsg({ type: 'error', text: e.message });
    } finally { setCreating(false); }
  };

  // ─── render ─────────────────────────────────────────────────────────────────
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-500" />
          <span className="text-white font-semibold">Trading Bot</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { fetchData(); fetchBots(); }}
            className="text-slate-500 hover:text-slate-300 transition" title="Yenile">
            <RefreshCw className="w-4 h-4" />
          </button>
          <span className={`text-xs px-2 py-1 rounded-full font-bold ${isKilled ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
            {isKilled ? '● DURDURULDU' : '● CANLI'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#141414] rounded-xl p-1">
        {(['overview', 'bots', 'create'] as Tab[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === tab ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>
            {tab === 'overview' ? '📊 Genel' : tab === 'bots' ? `🤖 Botlar (${bots.length})` : '➕ Yeni Bot'}
          </button>
        ))}
      </div>

      {/* ── TAB: OVERVIEW ── */}
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
              <div className="text-slate-400 text-xs mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Realized PnL</div>
              <div className={`font-bold ${(data?.pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>${(data?.pnl || 0).toFixed(2)}</div>
            </div>
            <div className="bg-[#141414] rounded-xl p-3">
              <div className="text-slate-400 text-xs mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> Açık Pozisyon</div>
              <div className="text-white font-bold">{data?.openPositions ?? '—'}</div>
            </div>
          </div>
          <div className="bg-[#141414] rounded-xl p-3">
            <div className="text-slate-400 text-xs mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Aktif Stratejiler</div>
            <div className="space-y-1">
              {data?.strategies?.length ? data.strategies.map(s => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="text-green-400 text-xs font-mono">{s.name}</span>
                  <span className="text-slate-500 text-xs">{s.version ? `v${s.version}` : ''}</span>
                </div>
              )) : <span className="text-slate-600 text-xs">Strateji bulunamadı</span>}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-3 h-3" /> İşlem İzni:{' '}
              <span className={data?.tradingAllowed ? 'text-green-400' : 'text-red-400'}>
                {data?.tradingAllowed ? '✅ Var' : '❌ Yok'}
              </span>
            </div>
            <button onClick={handleKill}
              className={`w-full py-2.5 rounded-xl text-sm font-bold transition ${killConfirm ? 'bg-red-500 text-white' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'}`}>
              {killConfirm ? '⚠️ EMİN MİSİN? TEKRAR TIKLA' : '🛑 Kill Switch'}
            </button>
            {killConfirm && (
              <button onClick={() => setKillConfirm(false)}
                className="w-full py-2 rounded-xl text-xs text-slate-400 border border-slate-700 hover:border-slate-500 transition">
                İptal
              </button>
            )}
          </div>
        </>
      )}

      {/* ── TAB: BOTS ── */}
      {activeTab === 'bots' && (
        <div className="space-y-2">
          {bots.length === 0 ? (
            <div className="text-center py-6 space-y-2">
              <div className="text-slate-500 text-sm">Henüz aktif bot yok</div>
              <button onClick={() => setActiveTab('create')} className="text-orange-400 text-xs hover:text-orange-300 underline">
                İlk botu oluştur →
              </button>
            </div>
          ) : bots.map(botId => {
            const summary = botSummaries[botId];
            const isExpanded = expandedBot === botId;
            return (
              <div key={botId} className="bg-[#141414] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 bg-green-400" />
                    <div className="min-w-0">
                      <div className="text-white text-xs font-semibold font-mono truncate">{botId.slice(0, 8)}…</div>
                      <div className="text-green-400 text-xs">● aktif</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleStop(botId)} title="Durdur"
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
                      <Square className="w-3 h-3" />
                    </button>
                    <button onClick={() => { setExpandedBot(isExpanded ? null : botId); if (!isExpanded) { fetchBotSummary(botId); fetchBotOrders(botId); } }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 transition">
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-[#1A1A1A]">
                    {summary ? (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div><div className="text-slate-500 text-xs">Mod</div><div className="text-white text-xs">{summary.mode || 'paper'}</div></div>
                        <div><div className="text-slate-500 text-xs">Bakiye</div><div className="text-white text-xs">${(summary.balance || summary.current_balance || 0).toFixed(2)}</div></div>
                        <div><div className="text-slate-500 text-xs">PnL</div>
                          <div className={`text-xs font-bold ${(summary.total_pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${(summary.total_pnl || 0).toFixed(2)}
                          </div>
                        </div>
                        <div><div className="text-slate-500 text-xs">İşlemler</div><div className="text-white text-xs">{summary.trade_count ?? summary.total_trades ?? summary.total_orders ?? '—'}</div></div>
                      </div>
                    ) : (
                      <div className="text-slate-600 text-xs mt-2">Özet yükleniyor...</div>
                    )}
                    <div className="text-slate-600 text-xs mt-1 font-mono truncate">{botId}</div>
                    <div className="mt-3">
                        <div className="text-slate-400 text-xs font-semibold mb-2">Son İşlemler</div>
                        {(!botOrders[botId] || botOrders[botId].length === 0) ? (
                          <div className="text-slate-600 text-xs text-center py-2">Henüz işlem yok</div>
                        ) : (
                        <div className="space-y-1.5">
                          {botOrders[botId].map((order: any) => (
                            <div key={order.id} className="flex items-center justify-between bg-[#0F0F0F] rounded-lg px-2 py-1.5">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${order.side === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                                  {order.side}
                                </span>
                                <span className="text-slate-400 text-xs">{order.symbol}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-white text-xs">${order.fill_price?.toLocaleString()}</div>
                                <div className="text-slate-600 text-xs">{new Date(order.timestamp).toLocaleTimeString('tr-TR')}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        )}
                      </div>
                  </div>
                )}
              </div>
            );
          })}
          {bots.length > 0 && (
            <button onClick={() => setActiveTab('create')}
              className="w-full py-2 rounded-xl text-xs text-orange-400 border border-orange-500/20 hover:border-orange-500/40 transition flex items-center justify-center gap-1">
              <Plus className="w-3 h-3" /> Yeni Bot Ekle
            </button>
          )}
        </div>
      )}

      {/* ── TAB: CREATE ── */}
      {activeTab === 'create' && (
        <div className="space-y-3">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Yeni Bot Oluştur</div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs">Strateji *</label>
            <select value={form.strategy} onChange={e => setForm(f => ({ ...f, strategy: e.target.value }))}
              className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-orange-500/50 transition">
              <option value="">Strateji seç...</option>
              {data?.strategies?.length ? data.strategies.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              )) : (
                <>
                  <option value="ema_crossover">EMA Crossover</option>
                  <option value="rsi_mean_revert">RSI Mean Reversion</option>
                </>
              )}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs">Sembol *</label>
            <div className="flex gap-2 mb-2">
              {['BTCUSDT', 'ETHUSDT', 'SOLUSDT'].map(sym => (
                <button key={sym} onClick={() => setForm(f => ({ ...f, symbol: sym }))}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${form.symbol === sym ? 'bg-orange-500 text-white' : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'}`}>
                  {sym.replace('USDT', '')}
                </button>
              ))}
            </div>
            <input type="text" value={form.symbol}
              onChange={e => setForm(f => ({ ...f, symbol: e.target.value.toUpperCase() }))}
              placeholder="Veya manuel gir: XRPUSDT"
              className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-orange-500/50 transition placeholder-slate-600" />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs">Bot Adı <span className="text-slate-600">(opsiyonel)</span></label>
            <input type="text" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Örn: BTC EMA Bot #1"
              className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-orange-500/50 transition placeholder-slate-600" />
          </div>

          {userEmail && (
            <div className="text-slate-600 text-xs">👤 {userEmail}</div>
          )}

          {createMsg && (
            <div className={`rounded-xl px-3 py-2 text-xs ${createMsg.type === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-green-500/10 border border-green-500/20 text-green-400'}`}>
              {createMsg.text}
            </div>
          )}

          <button onClick={handleCreate} disabled={creating}
            className={`w-full py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 ${creating ? 'bg-orange-500/50 text-white cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-400'}`}>
            {creating ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Oluşturuluyor...</>
            ) : (
              <><Plus className="w-4 h-4" /> Bot Oluştur & Başlat</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
