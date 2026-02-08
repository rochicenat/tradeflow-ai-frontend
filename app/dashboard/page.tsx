'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { IconLogo } from '@/components/Logo';
import { AnalysisResults } from '@/components/AnalysisResults';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AnalysisResult {
  analysis: string;
  trend: string;
  confidence: string;
}

export default function Dashboard() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  const MONTHLY_LIMIT = 3;

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    const count = localStorage.getItem('analysisCount');
    if (count) {
      setAnalysisCount(parseInt(count));
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

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
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: false
  });

  const analyzeChart = async () => {
    if (!image) return;

    if (analysisCount >= MONTHLY_LIMIT) {
      alert('You have reached your monthly limit! Upgrade to Pro for more analyses.');
      router.push('/pricing');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('file', blob, 'chart.png');

      const apiResponse = await fetch('https://lucky-mercy-production-45c7.up.railway.app/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to analyze image');
      }

      const data: AnalysisResult = await apiResponse.json();
      setResult(data);
      
      const newCount = analysisCount + 1;
      setAnalysisCount(newCount);
      localStorage.setItem('analysisCount', newCount.toString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const remainingAnalyses = MONTHLY_LIMIT - analysisCount;
  const isLimitReached = analysisCount >= MONTHLY_LIMIT;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
          <Link href="/">
            <IconLogo />
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Welcome, <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>!
            </span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Analyses This Month</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {analysisCount} / {MONTHLY_LIMIT}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {remainingAnalyses} remaining
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Plan</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">Free</p>
                <Link href="/pricing" className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block">
                  Upgrade →
                </Link>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white"
          >
            <h3 className="text-sm font-semibold mb-2">Upgrade to Pro</h3>
            <p className="text-2xl font-bold mb-1">50 Analyses/mo</p>
            <p className="text-sm text-blue-100 mb-3">Just $9.99/month</p>
            <Link 
              href="/pricing"
              className="block w-full text-center bg-white text-blue-600 hover:bg-gray-100 py-2 rounded-lg font-semibold transition-all text-sm"
            >
              Upgrade Now →
            </Link>
          </motion.div>
        </div>

        {/* Limit Warning */}
        {isLimitReached && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                  Monthly Limit Reached
                </h3>
                <p className="text-yellow-700 dark:text-yellow-400 text-sm mb-3">
                  You've used all {MONTHLY_LIMIT} analyses for this month. Upgrade to Pro for 50 analyses/month or Premium for unlimited!
                </p>
                <Link 
                  href="/pricing"
                  className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
                >
                  View Pricing Plans
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI-Powered Chart Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your trading chart and get instant insights
          </p>
        </div>

        {/* Upload Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : isLimitReached
                ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <input {...getInputProps()} disabled={isLimitReached} />
            <div className="flex flex-col items-center">
              <svg
                className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {isLimitReached ? (
                <>
                  <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">
                    Upload Disabled - Limit Reached
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">
                    Upgrade to continue analyzing charts
                  </p>
                </>
              ) : isDragActive ? (
                <p className="text-blue-600 dark:text-blue-400 font-medium">Drop the image here</p>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                    Drag & drop your chart image here
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    or click to select a file
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Preview & Analyze */}
        {image && !isLimitReached && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Chart Preview
            </h2>
            <img
              src={image}
              alt="Uploaded chart"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600"
            />
            <button
              onClick={analyzeChart}
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                '🔍 Analyze Chart'
              )}
            </button>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 rounded-lg p-4 mb-6"
          >
            <p className="font-medium">Error: {error}</p>
          </motion.div>
        )}

        {/* Results - YENİ COMPONENT */}
        {result && (
          <AnalysisResults 
            analysis={result.analysis}
            trend={result.trend}
            confidence={result.confidence}
          />
        )}
      </div>
    </div>
  );
}
