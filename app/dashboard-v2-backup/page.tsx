'use client';

import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { Header } from '@/components/dashboard-v2/Header';
import { SignalCard } from '@/components/dashboard-v2/SignalCard';
import { ConfidenceScore } from '@/components/dashboard-v2/ConfidenceScore';
import { RiskIndicator } from '@/components/dashboard-v2/RiskIndicator';
import { TechnicalBadges } from '@/components/dashboard-v2/TechnicalBadges';
import { TradePanel } from '@/components/dashboard-v2/TradePanel';
import { QuickStats } from '@/components/dashboard-v2/QuickStats';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';

export default function DashboardV2() {
  const { data: user, refetch } = useUserData();
  const { token } = useAuthStore();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  // Mock technical data (AI'den gelecek)
  const technicalData = {
    rsi: { value: 45, status: 'neutral' as const },
    ema: { trend: 'up' as const },
    volume: { strength: 'strong' as const },
    volatility: { level: 'medium' as const },
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image || !user) return;

    if (user.analyses_used >= user.analyses_limit) {
      toast.error('Aylık limit doldu! Planınızı yükseltin.');
      return;
    }

    setLoading(true);

    try {
      const blob = await fetch(image).then(r => r.blob());
      const formData = new FormData();
      formData.append('file', blob, 'chart.png');

      const response = await fetch('https://trading-chart-analyzer-production.up.railway.app/analyze-image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
        refetch(); // Refresh user data
        toast.success('Analiz tamamlandı!');
      } else {
        toast.error('Analiz başarısız!');
      }
    } catch (err) {
      toast.error('Bağlantı hatası!');
    } finally {
      setLoading(false);
    }
  };

  const limitReached = user && user.analyses_used >= user.analyses_limit;

  return (
    <>
      <Header />
      
      {/* Main Container */}
      <div className="pt-20 px-6 pb-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column - Upload & Analysis */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Upload Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#334155]"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  AI-Powered Chart Analysis
                </h2>
                
                <div className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                  limitReached 
                    ? 'border-[#334155] bg-[#0F172A]/50 cursor-not-allowed opacity-50'
                    : 'border-[#3B82F6] bg-[#3B82F6]/5 hover:bg-[#3B82F6]/10 cursor-pointer'
                }`}>
                  
                  {image ? (
                    <div>
                      <img src={image} alt="Chart" className="max-h-96 mx-auto rounded-xl" />
                      <label className="mt-4 inline-block cursor-pointer text-[#3B82F6] hover:underline">
                        Farklı grafik yükle
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={limitReached}
                        />
                      </label>
                    </div>
                  ) : (
                    <label className={limitReached ? 'cursor-not-allowed' : 'cursor-pointer'}>
                      <Upload className="w-16 h-16 text-[#3B82F6] mx-auto mb-4" />
                      <p className="text-lg font-semibold text-white mb-2">
                        {limitReached ? 'Limit Doldu' : 'Grafik Yükle'}
                      </p>
                      <p className="text-sm text-[#94A3B8]">
                        PNG, JPG veya JPEG
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={limitReached}
                      />
                    </label>
                  )}
                </div>

                {image && !limitReached && (
                  <button
                    onClick={analyzeImage}
                    disabled={loading}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white rounded-xl font-bold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? 'Analiz Ediliyor...' : 'Analiz Et'}
                  </button>
                )}
              </motion.div>

              {/* Analysis Results */}
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <SignalCard
                    action={analysis.trend === 'bullish' ? 'BUY' : analysis.trend === 'bearish' ? 'SELL' : 'WAIT'}
                    reasoning={analysis.analysis.substring(0, 100) + '...'}
                    confidence={analysis.confidence === 'high' ? 85 : analysis.confidence === 'medium' ? 60 : 35}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ConfidenceScore 
                      score={analysis.confidence === 'high' ? 85 : analysis.confidence === 'medium' ? 60 : 35} 
                    />
                    <RiskIndicator 
                      level={analysis.confidence === 'high' ? 'low' : analysis.confidence === 'medium' ? 'medium' : 'high'} 
                    />
                  </div>

                  <TechnicalBadges data={technicalData} />
                  <TradePanel 
                    entryPrice={0}
                    takeProfit={0}
                    stopLoss={0}
                    riskRewardRatio={0}
                  />
                </motion.div>
              )}
            </div>

            {/* Right Column - Quick Stats */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <QuickStats />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
