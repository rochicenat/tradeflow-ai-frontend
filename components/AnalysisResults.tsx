'use client';

import { motion } from 'framer-motion';

interface AnalysisResultsProps {
  analysis: string;
  trend: string;
  confidence: string;
}

export function AnalysisResults({ analysis, trend, confidence }: AnalysisResultsProps) {
  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'bullish':
        return 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'bearish':
        return 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default:
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'medium':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-600';
    }
  };

  // Parse analysis into sections
  const parseAnalysis = (text: string) => {
    const sections: { title: string; content: string; icon: string }[] = [];
    
    // Support/Resistance
    if (text.includes('Support') || text.includes('Resistance')) {
      const match = text.match(/\*\*Support\/Resistance Zones:\*\*([\s\S]*?)(?=\*\*|$)/);
      if (match) {
        sections.push({
          title: 'Support & Resistance Zones',
          content: match[1].trim(),
          icon: '📍'
        });
      }
    }

    // Breakout Areas
    if (text.includes('Breakout')) {
      const match = text.match(/\*\*Possible Breakout Areas:\*\*([\s\S]*?)(?=\*\*|$)/);
      if (match) {
        sections.push({
          title: 'Breakout Scenarios',
          content: match[1].trim(),
          icon: '🚀'
        });
      }
    }

    // RSI/Indicators
    if (text.includes('RSI') || text.includes('Indicator')) {
      const match = text.match(/\*\*RSI or Indicator Signals:\*\*([\s\S]*?)(?=\*\*|$)/);
      if (match) {
        sections.push({
          title: 'Technical Indicators',
          content: match[1].trim(),
          icon: '📊'
        });
      }
    }

    // Trading Idea
    if (text.includes('Trading Idea')) {
      const match = text.match(/\*\*Trading Idea:\*\*([\s\S]*?)(?=\*\*|$)/);
      if (match) {
        sections.push({
          title: 'Trading Strategy',
          content: match[1].trim(),
          icon: '💡'
        });
      }
    }

    // If no sections found, show full text
    if (sections.length === 0) {
      sections.push({
        title: 'Analysis',
        content: text,
        icon: '📈'
      });
    }

    return sections;
  };

  const sections = parseAnalysis(analysis);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analysis Results
        </h2>
        <div className="flex gap-2">
          <span className={`px-4 py-2 rounded-full font-semibold text-sm border ${getTrendColor(trend)}`}>
            {trend.charAt(0).toUpperCase() + trend.slice(1)}
          </span>
          <span className={`px-4 py-2 rounded-full font-semibold text-sm border ${getConfidenceColor(confidence)}`}>
            {confidence.charAt(0).toUpperCase() + confidence.slice(1)}
          </span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-600"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">{section.icon}</span>
              {section.title}
            </h3>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
              {section.content.split('\n').map((line, i) => {
                // Clean up formatting
                const cleanLine = line.replace(/\*\*/g, '').trim();
                if (!cleanLine) return null;

                // Check if it's a bullet point
                if (cleanLine.startsWith('*') || cleanLine.startsWith('•')) {
                  return (
                    <div key={i} className="flex items-start gap-2 ml-2">
                      <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                      <span>{cleanLine.substring(1).trim()}</span>
                    </div>
                  );
                }

                // Regular paragraph
                return cleanLine.length > 10 ? (
                  <p key={i} className="text-sm">{cleanLine}</p>
                ) : null;
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-yellow-800 dark:text-yellow-400 text-sm font-semibold mb-1">
              Risk Disclaimer
            </p>
            <p className="text-yellow-700 dark:text-yellow-500 text-xs">
              This analysis is for educational purposes only. Trading cryptocurrencies and financial instruments involves high risk. Always implement proper risk management, use stop-loss orders, and never trade with capital you cannot afford to lose. Past performance is not indicative of future results.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
