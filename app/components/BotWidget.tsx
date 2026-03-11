'use client';
import { useState, useEffect } from 'react';
import { Copy, Check, Zap, Settings, Radio, ChevronRight, AlertTriangle, TrendingUp, TrendingDown, RefreshCw, Shield, Target, DollarSign } from 'lucide-react';

const API = 'https://tradeflow-ai-backend-production.up.railway.app';

const MIN_SL_PIPS: Record<string, number> = {
  XAUUSD: 50, EURUSD: 10, BTCUSD: 100, GBPUSD: 10, USDJPY: 10, NASDAQ: 20,
};
const PIP_VALUE: Record<string, number> = {
  XAUUSD: 1.0, EURUSD: 10.0, BTCUSD: 1.0, GBPUSD: 10.0, USDJPY: 9.0, NASDAQ: 1.0,
};
const PIP_SIZE: Record<string, number> = {
  XAUUSD: 0.01, EURUSD: 0.0001, BTCUSD: 1.0, GBPUSD: 0.0001, USDJPY: 0.01, NASDAQ: 0.1,
};

function calcLotSize(balance: number, riskPct: number, entry: number, sl: number, symbol: string): number {
  if (!entry || !sl || entry === sl) return 0.01;
  const riskAmount = balance * (riskPct / 100);
  const pipSize = PIP_SIZE[symbol] || 0.0001;
  const pipValue = PIP_VALUE[symbol] || 10;
  const slPips = Math.abs(entry - sl) / pipSize;
  const lot = riskAmount / (slPips * pipValue);
  return Math.max(0.01, parseFloat(lot.toFixed(2)));
}

function validateSL(entry: number, sl: number, symbol: string, action: 'BUY' | 'SELL'): string | null {
  if (!entry || !sl) return null;
  const pipSize = PIP_SIZE[symbol] || 0.0001;
  const minPips = MIN_SL_PIPS[symbol] || 10;
  const slPips = Math.abs(entry - sl) / pipSize;
  if (action === 'BUY' && sl >= entry) return '⚠️ BUY işlemde SL entry\'den düşük olmalı';
  if (action === 'SELL' && sl <= entry) return '⚠️ SELL işlemde SL entry\'den yüksek olmalı';
  if (slPips < minPips) return `⚠️ SL çok yakın! Min ${minPips} pip gerekli (şu an: ${slPips.toFixed(1)} pip)`;
  return null;
}

export default function BotWidget({ userEmail }: { userEmail?: string }) {
  const [activeTab, setActiveTab] = useState<'setup' | 'signals' | 'settings'>('setup');
  const [copied, setCopied] = useState(false);
  const [signals, setSignals] = useState<any[]>([]);
  const [symbol, setSymbol] = useState('XAUUSD');
  const [lotSize, setLotSize] = useState('0.01');
  const [riskPercent, setRiskPercent] = useState('1');
  const [accountBalance, setAccountBalance] = useState('10000');
  const [slPips, setSlPips] = useState('20');
  const [saved, setSaved] = useState(false);
  const [manualAction, setManualAction] = useState<'BUY'|'SELL'>('BUY');
  const [manualSymbol, setManualSymbol] = useState('XAUUSD');
  // manualSymbol settings'ten güncellenecek
  const [manualEntry, setManualEntry] = useState('');
  const [manualSL, setManualSL] = useState('');
  const [manualTP, setManualTP] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [slError, setSlError] = useState<string | null>(null);
  const [autoLot, setAutoLot] = useState(true);
  const [calculatedLot, setCalculatedLot] = useState('0.01');
  const [loadingSignals, setLoadingSignals] = useState(false);

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('token') || sessionStorage.getItem('token')) : '';

  useEffect(() => {
    const entry = parseFloat(manualEntry);
    const sl = parseFloat(manualSL);
    const err = validateSL(entry, sl, manualSymbol, manualAction);
    setSlError(err);
    if (autoLot && entry && sl && !err) {
      const bal = parseFloat(accountBalance) || 10000;
      const risk = parseFloat(riskPercent) || 1;
      setCalculatedLot(calcLotSize(bal, risk, entry, sl, manualSymbol).toString());
    }
  }, [manualEntry, manualSL, manualSymbol, manualAction, autoLot, accountBalance, riskPercent]);

  const fetchSignals = async () => {
    if (!userEmail) return;
    setLoadingSignals(true);
    try {
      const r = await fetch(`${API}/bot/signals/${userEmail}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      const d = await r.json();
      setSignals(Array.isArray(d) ? d.reverse().slice(0, 10) : []);
    } catch (e) {}
    setLoadingSignals(false);
  };

  useEffect(() => {
    if (activeTab === 'signals') {
      fetchSignals();
      const interval = setInterval(fetchSignals, 10000);
      return () => clearInterval(interval);
    }
  }, [activeTab, userEmail]);

  useEffect(() => {
    if (userEmail) {
      fetch(`${API}/bot/settings`, { headers: { 'Authorization': `Bearer ${getToken()}` } })
        .then(r => r.json()).then(d => {
          if (d.symbol) { setSymbol(d.symbol); setManualSymbol(d.symbol); }
          if (d.lot_size) setLotSize(d.lot_size);
          if (d.risk_percent) setRiskPercent(d.risk_percent);
        if (d.account_balance) setAccountBalance(d.account_balance);
        if (d.sl_pips) setSlPips(d.sl_pips);
        if (d.symbol) setManualSymbol(d.symbol);
        if (d.account_balance) setAccountBalance(d.account_balance);
        if (d.sl_pips) setSlPips(d.sl_pips);
        if (d.symbol) setManualSymbol(d.symbol);
        }).catch(() => {});
    }
  }, [userEmail]);

  const sendManualSignal = async () => {
    if (!manualEntry || !manualSL || !manualTP || slError) return;
    const finalLot = autoLot ? parseFloat(calculatedLot) : parseFloat(lotSize);
    setSending(true);
    try {
      await fetch(`${API}/bot/signal/${userEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify({ action: manualAction, symbol: manualSymbol, entry: parseFloat(manualEntry), sl: parseFloat(manualSL), tp: parseFloat(manualTP), lot: finalLot })
      });
      setSent(true);
      setTimeout(() => setSent(false), 2000);
      setManualEntry(''); setManualSL(''); setManualTP('');
    } catch(e) {}
    setSending(false);
  };

  const webhookUrl = `${API}/bot/signal/${userEmail || 'your-email'}`;
  const copyWebhook = () => { navigator.clipboard.writeText(webhookUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const saveSettings = async () => {
    const formData = new FormData();
    formData.append('symbol', symbol);
    formData.append('lot_size', lotSize);
    formData.append('risk_percent', riskPercent);
    formData.append('account_balance', accountBalance);
    formData.append('sl_pips', slPips);
    formData.append('account_balance', accountBalance);
    formData.append('sl_pips', slPips);
    try {
      await fetch(`${API}/bot/settings`, { method: 'POST', headers: { 'Authorization': `Bearer ${getToken()}` }, body: formData });
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    } catch(e) {}
  };

  const calcRR = () => {
    const entry = parseFloat(manualEntry);
    const sl = parseFloat(manualSL);
    const tp = parseFloat(manualTP);
    if (!entry || !sl || !tp || entry === sl) return null;
    return (Math.abs(tp - entry) / Math.abs(entry - sl)).toFixed(2);
  };

  const rr = calcRR();
  const slPipsDisplay = manualEntry && manualSL
    ? (Math.abs(parseFloat(manualEntry) - parseFloat(manualSL)) / (PIP_SIZE[manualSymbol] || 0.0001)).toFixed(1)
    : null;

  const tabs = [
    { id: 'setup', label: 'EA Setup', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'signals', label: 'Signals', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <Zap className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Trading Bot</h2>
            <p className="text-slate-500 text-xs">MT5 Webhook + EA Integration</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-semibold">LIVE</span>
        </div>
      </div>

      <div className="flex gap-1 bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-1">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition ${activeTab === tab.id ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'setup' && (
        <div className="space-y-3">
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">Your Webhook URL</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-[#111] border border-[#252525] rounded-lg px-3 py-2 text-xs text-slate-400 font-mono truncate">{webhookUrl}</div>
              <button onClick={copyWebhook}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${copied ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
                {copied ? <><Check className="w-3.5 h-3.5" />Copied</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
              </button>
            </div>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">Installation Steps</p>
            <div className="space-y-3">
              {[
                { step: '01', title: 'Download EA File', desc: 'Download the TradeFlow AI Expert Advisor (.ex5 file) below', action: true },
                { step: '02', title: 'Install to MT5', desc: 'Copy the EA file to: MT5 → File → Open Data Folder → MQL5 → Experts' },
                { step: '03', title: 'Attach to Chart', desc: 'Open any chart in MT5, drag & drop the EA, enable "Allow WebRequest"' },
                { step: '04', title: 'Enter Webhook URL', desc: 'Paste your webhook URL above into the EA settings field' },
                { step: '05', title: 'Start Receiving Signals', desc: 'EA will automatically execute trades when AI generates signals' },
              ].map(s => (
                <div key={s.step} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-xs font-bold flex-shrink-0">{s.step}</div>
                  <div className="flex-1">
                    <p className="text-white text-xs font-semibold">{s.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{s.desc}</p>
                    {s.action && (
                      <a href="/TradeFlowAI.mq5" download className="mt-2 flex items-center gap-1 text-orange-500 text-xs font-semibold hover:text-orange-400 transition">
                        Download EA <ChevronRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-400 text-xs">Never share your webhook URL. It is unique to your account and controls your MT5 trades.</p>
          </div>
        </div>
      )}

      {activeTab === 'signals' && (
        <div className="space-y-3">
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4 space-y-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Manual Signal</p>
            <div className="flex gap-2">
              {(['BUY','SELL'] as const).map(a => (
                <button key={a} onClick={() => setManualAction(a)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition border ${manualAction === a ? (a === 'BUY' ? 'bg-green-500 border-green-500 text-white' : 'bg-red-500 border-red-500 text-white') : 'bg-[#111] border-[#252525] text-slate-400'}`}>
                  {a}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['XAUUSD','EURUSD','BTCUSD','GBPUSD','USDJPY','NASDAQ'].map(s => (
                <button key={s} onClick={() => setManualSymbol(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${manualSymbol === s ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#111] border-[#252525] text-slate-400'}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div><label className="text-xs text-slate-500 mb-1 block">Entry</label><input type="number" value={manualEntry} onChange={e => setManualEntry(e.target.value)} placeholder="0.00" className="w-full bg-[#111] border border-[#252525] rounded-lg px-3 py-2 text-white text-xs focus:border-orange-500 focus:outline-none" /></div>
              <div><label className="text-xs text-slate-500 mb-1 block">Stop Loss</label><input type="number" value={manualSL} onChange={e => setManualSL(e.target.value)} placeholder="0.00" className={`w-full bg-[#111] border rounded-lg px-3 py-2 text-white text-xs focus:outline-none ${slError ? 'border-red-500' : 'border-[#252525] focus:border-red-500'}`} /></div>
              <div><label className="text-xs text-slate-500 mb-1 block">Take Profit</label><input type="number" value={manualTP} onChange={e => setManualTP(e.target.value)} placeholder="0.00" className="w-full bg-[#111] border border-[#252525] rounded-lg px-3 py-2 text-white text-xs focus:border-green-500 focus:outline-none" /></div>
            </div>

            {slError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <span className="text-red-400 text-xs">{slError}</span>
              </div>
            )}

            {manualEntry && manualSL && !slError && (
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#111] border border-[#252525] rounded-lg px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1"><Shield className="w-3 h-3 text-slate-500" /><span className="text-xs text-slate-500">SL Pips</span></div>
                  <span className="text-white text-xs font-bold">{slPipsDisplay}</span>
                </div>
                <div className="bg-[#111] border border-[#252525] rounded-lg px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1"><Target className="w-3 h-3 text-slate-500" /><span className="text-xs text-slate-500">R:R Ratio</span></div>
                  <span className={`text-xs font-bold ${rr && parseFloat(rr) >= 2 ? 'text-green-400' : rr && parseFloat(rr) >= 1 ? 'text-yellow-400' : 'text-red-400'}`}>{rr ? `1:${rr}` : '-'}</span>
                </div>
                <div className="bg-[#111] border border-[#252525] rounded-lg px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1"><DollarSign className="w-3 h-3 text-slate-500" /><span className="text-xs text-slate-500">Lot Size</span></div>
                  <span className="text-orange-400 text-xs font-bold">{autoLot ? calculatedLot : lotSize}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between bg-[#111] border border-[#252525] rounded-lg px-3 py-2">
              <div>
                <p className="text-xs text-white font-semibold">Auto Lot Size</p>
                <p className="text-xs text-slate-500">%{riskPercent} risk → ${(parseFloat(accountBalance) * parseFloat(riskPercent) / 100).toFixed(0)}</p>
              </div>
              <button onClick={() => setAutoLot(!autoLot)}
                className={`w-10 h-5 rounded-full transition-colors relative ${autoLot ? 'bg-orange-500' : 'bg-[#252525]'}`}>
                <span style={{position:"absolute", top:"2px", left: autoLot ? "22px" : "2px", width:"16px", height:"16px", backgroundColor:"white", borderRadius:"50%", transition:"left 0.2s"}} />
              </button>
            </div>

            <button onClick={sendManualSignal} disabled={sending || !!slError || !manualEntry || !manualSL || !manualTP}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${sent ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'} disabled:opacity-40 disabled:cursor-not-allowed`}>
              {sent ? '✓ Signal Sent!' : sending ? 'Sending...' : 'Send Signal to MT5'}
            </button>
          </div>

          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Signal History</p>
              <button onClick={fetchSignals} className="text-slate-500 hover:text-orange-500 transition">
                <RefreshCw className={`w-3.5 h-3.5 ${loadingSignals ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {signals.length === 0 ? (
              <div className="text-center py-10">
                <Radio className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No active signals</p>
                <p className="text-slate-600 text-xs mt-1">Upload a chart to generate a signal</p>
              </div>
            ) : (
              <div className="space-y-2">
                {signals.map((s, i) => {
                  const isBuy = s.action === 'BUY';
                  const pipSz = PIP_SIZE[s.symbol] || 0.0001;
                  const rrVal = s.entry && s.sl && s.tp ? (Math.abs(s.tp - s.entry) / Math.abs(s.entry - s.sl)).toFixed(1) : '-';
                  return (
                    <div key={i} className={`p-3 rounded-lg border ${isBuy ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {isBuy ? <TrendingUp className="w-3.5 h-3.5 text-green-400" /> : <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${isBuy ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{s.action}</span>
                          <span className="text-white text-xs font-semibold">{s.symbol}</span>
                          <span className="text-slate-500 text-xs">Lot: {s.lot}</span>
                        </div>
                        <span className="text-slate-600 text-xs">{s.signal_id}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div><span className="text-slate-500">Entry </span><span className="text-white font-semibold">{s.entry}</span></div>
                        <div><span className="text-slate-500">SL </span><span className="text-red-400 font-semibold">{s.sl}</span></div>
                        <div><span className="text-slate-500">TP </span><span className="text-green-400 font-semibold">{s.tp}</span></div>
                        <div><span className="text-slate-500">R:R </span><span className="text-orange-400 font-semibold">1:{rrVal}</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-3">
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4 space-y-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Bot Settings</p>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Account Balance ($)</label>
              <input type="number" value={accountBalance} onChange={e => setAccountBalance(e.target.value)}
                className="w-full bg-[#111] border border-[#252525] rounded-lg px-3 py-2 text-white text-xs focus:border-orange-500 focus:outline-none" />
              <p className="text-xs text-slate-600 mt-1">Used for auto lot size calculation</p>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Default Symbol</label>
              <div className="flex flex-wrap gap-2">
                {['XAUUSD','EURUSD','BTCUSD','GBPUSD','USDJPY','NASDAQ'].map(s => (
                  <button key={s} onClick={() => { setSymbol(s); setManualSymbol(s); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${symbol === s ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#111] border-[#252525] text-slate-400 hover:border-orange-500/50'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Lot Size</label>
              <div className="flex gap-2">
                {['0.01','0.05','0.1','0.5','1.0'].map(l => (
                  <button key={l} onClick={() => setLotSize(l)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${lotSize === l ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#111] border-[#252525] text-slate-400 hover:border-orange-500/50'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Risk Per Trade (%)</label>
              <div className="flex gap-2">
                {['1','2','3','5','10'].map(r => (
                  <button key={r} onClick={() => setRiskPercent(r)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${riskPercent === r ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#111] border-[#252525] text-slate-400 hover:border-orange-500/50'}`}>
                    {r}%
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-1">Risk amount: ${(parseFloat(accountBalance || '10000') * parseFloat(riskPercent) / 100).toFixed(0)} per trade</p>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Default SL Distance (pips)</label>
              <div className="flex gap-2">
                {['10','20','30','50','100'].map(p => (
                  <button key={p} onClick={() => setSlPips(p)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${slPips === p ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#111] border-[#252525] text-slate-400 hover:border-orange-500/50'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={saveSettings}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${saved ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}>
              {saved ? '✓ Saved' : 'Save Settings'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
