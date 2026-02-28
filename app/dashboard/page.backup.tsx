'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { IconLogo } from '@/components/Logo';
import { AnalysisResults } from '@/components/AnalysisResults';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface AnalysisResult {
  analysis: string;
  trend: string;
  confidence: string;
}

interface UserData {
  email: string;
  name: string;
  plan: string;
  analyses_used: number;
  analyses_limit: number;
  subscription_status: string;
}

export default function Dashboard() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
  setMounted(true);
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  
  // ÖNCE localStorage'dan yükle
  const cachedUser = localStorage.getItem('user');
  if (cachedUser) {
    setUserData(JSON.parse(cachedUser));
  }
  
  // Sonra API'den fresh data çek
  fetchUserData();
}, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('🔍 DEBUG: Fetched data:', data);
        console.log('🔍 DEBUG: Plan value:', data.plan);
        setUserData(data);
        localStorage.setItem('user', JSON.stringify(data));
        console.log('✅ DEBUG: Saved to localStorage');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch user data');
      router.push('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: 1,
  });

  const analyzeImage = async () => {
    if (!image || !userData) return;

    if (userData.analyses_used >= userData.analyses_limit) {
      toast.error('Monthly limit reached! Please upgrade your plan.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const blob = await fetch(image).then(r => r.blob());
      const formData = new FormData();
      formData.append('file', blob, 'chart.png');

      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/analyze-image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        // Refresh user data
        fetchUserData();
        toast.success('Analysis complete!');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Analysis failed');
        toast.error(errorData.detail || 'Analysis failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !userData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-800 dark:text-white">Loading...</div>
      </div>
    );
  }

  const remainingAnalyses = userData.analyses_limit - userData.analyses_used;
  const limitReached = userData.analyses_used >= userData.analyses_limit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
          <IconLogo />
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <span className="text-gray-700 dark:text-gray-300">Welcome, {userData.name}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-colors duration-300"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Analyses This Month</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {userData.analyses_used} / {userData.analyses_limit}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {remainingAnalyses} remaining
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-colors duration-300"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Plan</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2 capitalize">
              {userData.plan === 'pro' ? '⭐ Pro' : userData.plan === 'premium' ? '👑 Premium' : '🆓 Free'}
            </p>
            <Link href="/pricing" className="text-sm text-blue-600 dark:text-orange-500 hover:underline mt-2 inline-block">
              Upgrade →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg text-white"
          >
            <p className="text-sm opacity-90">Upgrade to Pro</p>
            <p className="text-3xl font-bold mt-2">50 Analyses/mo</p>
            <p className="text-sm opacity-90 mt-1">Just $9.99/month</p>
            <Link
              href="/pricing"
              className="mt-4 block text-center bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Upgrade Now →
            </Link>
          </motion.div>
        </div>

        {limitReached && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  Monthly Limit Reached
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 mb-4">
                  You've used all {userData.analyses_limit} analyses for this month. Upgrade to Pro for 50 analyses/month or Premium for unlimited!
                </p>
                <Link
                  href="/pricing"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  View Pricing Plans
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              AI-Powered Chart Analysis
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Upload your trading chart and get instant insights
            </p>

            <div
              {...getRootProps()}
              className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-orange-500 bg-blue-50 dark:bg-blue-900/20'
                  : limitReached
                  ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-50'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-orange-500'
              }`}
            >
              <input {...getInputProps()} disabled={limitReached} />
              {image ? (
                <div>
                  <img src={image} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Click or drag to change image
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">📊</div>
                  {limitReached ? (
                    <p className="text-gray-500 dark:text-gray-400 font-semibold">
                      Upload Disabled - Limit Reached
                    </p>
                  ) : (
                    <>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {isDragActive ? 'Drop your chart here' : 'Drop your trading chart here'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        or click to browse
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {image && !limitReached && (
              <button
                onClick={analyzeImage}
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Analyzing...' : 'Analyze Chart'}
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {result && <AnalysisResults analysis={result.analysis} trend={result.trend} confidence={result.confidence} />}
            {!result && !error && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center h-full flex items-center justify-center transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400">
                  Upload a chart to see analysis results here
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
