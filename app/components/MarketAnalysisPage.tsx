'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign, AlertCircle } from 'lucide-react';

interface MarketData {
  symbol: string;
  price: string;
  change: number;
  changePercent: number;
  volume: string;
  marketCap?: string;
}

export default function MarketAnalysisPage() {
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState<MarketData[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // Fetch live crypto data from CoinGecko
  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h'
      );
      const data = await response.json();
      
      const formatted: MarketData[] = data.map((coin: any) => ({
        symbol: `${coin.symbol.toUpperCase()}/USD`,
        price: `$${coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: coin.price_change_24h || 0,
        changePercent: coin.price_change_percentage_24h || 0,
        volume: `$${(coin.total_volume / 1e9).toFixed(2)}B`,
        marketCap: `$${(coin.market_cap / 1e12).toFixed(2)}T`
      }));
      
      setCryptoData(formatted);
      setLastUpdate(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch crypto data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mock stock and forex data (you can add real APIs later)
  const stockData: MarketData[] = [
    { symbol: 'AAPL', price: '$182.34', change: 1.87, changePercent: 1.04, volume: '$67.2M' },
    { symbol: 'MSFT', price: '$412.56', change: -3.21, changePercent: -0.77, volume: '$32.4M' },
    { symbol: 'GOOGL', price: '$141.23', change: 2.14, changePercent: 1.54, volume: '$28.9M' },
    { symbol: 'TSLA', price: '$234.87', change: -5.43, changePercent: -2.26, volume: '$112.3M' },
  ];

  const forexData: MarketData[] = [
    { symbol: 'EUR/USD', price: '1.0842', change: 0.0023, changePercent: 0.21, volume: '$2.1T' },
    { symbol: 'GBP/USD', price: '1.2654', change: -0.0012, changePercent: -0.09, volume: '$845B' },
    { symbol: 'USD/JPY', price: '148.32', change: 0.54, changePercent: 0.36, volume: '$1.3T' },
    { symbol: 'USD/TRY', price: '32.47', change: 0.21, changePercent: 0.65, volume: '$12.4B' },
  ];

  const renderMarketCard = (data: MarketData, index: number) => {
    const isPositive = data.changePercent >= 0;
    
    return (
      <motion.div
        key={data.symbol}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6 hover:border-orange-500/30 transition"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{data.symbol}</h3>
              <p className="text-slate-400 text-sm">Live Data</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{data.price}</div>
            <div className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#252525]">
          <div>
            <p className="text-slate-500 text-xs mb-1">24h Change</p>
            <p className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{data.change.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs mb-1">24h Volume</p>
            <p className="text-white font-semibold">{data.volume}</p>
          </div>
          {data.marketCap && (
            <>
              <div className="col-span-2">
                <p className="text-slate-500 text-xs mb-1">Market Cap</p>
                <p className="text-white font-semibold">{data.marketCap}</p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Market Analysis</h2>
        <div className="flex items-center justify-between">
          <p className="text-slate-400">Real-time market data and price movements</p>
          {lastUpdate && (
            <p className="text-slate-500 text-sm">Last updated: {lastUpdate}</p>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-500/10 border border-orange-500/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-orange-500 font-semibold mb-1">🔴 Live Market Data</h4>
          <p className="text-slate-300 text-sm">
            Cryptocurrency prices update automatically every 60 seconds. This is for educational and research purposes only, not financial advice.
          </p>
        </div>
      </div>

      {/* Cryptocurrency - LIVE DATA */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-orange-500" />
          <h3 className="text-2xl font-bold text-white">Cryptocurrency</h3>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">LIVE</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cryptoData.map((data, index) => renderMarketCard(data, index))}
        </div>
      </div>

      {/* Stocks */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-orange-500" />
          <h3 className="text-2xl font-bold text-white">Stocks</h3>
          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs font-semibold rounded-full">DEMO</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stockData.map((data, index) => renderMarketCard(data, index))}
        </div>
      </div>

      {/* Forex */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-6 h-6 text-orange-500" />
          <h3 className="text-2xl font-bold text-white">Forex</h3>
          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs font-semibold rounded-full">DEMO</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forexData.map((data, index) => renderMarketCard(data, index))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-yellow-400 font-semibold mb-1">Data Disclaimer</h4>
            <p className="text-slate-300 text-sm">
              Cryptocurrency data is live via CoinGecko API. Stock and Forex data are demo values for educational purposes. 
              Always verify data with official sources before making any decisions. This is not financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
