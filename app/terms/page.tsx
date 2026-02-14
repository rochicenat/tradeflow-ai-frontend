'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              DataFlow Analytics
            </span>
          </Link>
          <Link href="/" className="text-sm text-slate-300 hover:text-white transition">
            Back to Home
          </Link>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 py-16"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last updated: February 14, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              By accessing or using DataFlow Analytics, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">2. Service Description</h2>
            <p className="text-slate-300 leading-relaxed">
              DataFlow Analytics is an <strong>educational AI data analytics platform</strong> that provides 
              automated technical analysis of market charts for research purposes only. Our service:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li>Analyzes uploaded chart images using AI algorithms</li>
              <li>Provides pattern recognition and statistical probability analysis</li>
              <li>Offers quantitative insights for educational research</li>
              <li>Is NOT a financial advisory service</li>
            </ul>
          </section>

          <section className="bg-red-500/10 border-2 border-red-500/50 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-red-400 mb-4">3. CRITICAL DISCLAIMER - NOT FINANCIAL ADVICE</h2>
            <p className="text-white text-lg font-semibold leading-relaxed">
              <strong>IMPORTANT:</strong> DataFlow Analytics is strictly an educational data analytics tool. 
              None of the information, analyses, patterns, probabilities, or insights provided on this platform 
              constitute financial advice, investment recommendations, trading signals, or any form of professional 
              financial guidance.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              Users acknowledge that:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li>All analyses are for educational and research purposes only</li>
              <li>Past patterns do not predict future outcomes</li>
              <li>No guarantees of accuracy or profitability are made</li>
              <li>Users are solely responsible for their own financial decisions</li>
              <li>Users should consult licensed financial advisors before making any financial decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">4. User Responsibilities</h2>
            <p className="text-slate-300 leading-relaxed">You agree to:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li>Use the platform for lawful educational and research purposes only</li>
              <li>Not share your account credentials with others</li>
              <li>Provide accurate registration information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not attempt to reverse-engineer or abuse our AI systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">5. Subscriptions and Payments</h2>
            <p className="text-slate-300 leading-relaxed">
              We offer Free, Pro ($9.99/month), and Premium ($19.99/month) plans. By subscribing:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li>You authorize recurring monthly charges</li>
              <li>Prices are subject to change with 30 days notice</li>
              <li>You can cancel anytime from your dashboard</li>
              <li>Refunds are handled per our Refund Policy (7-day money-back guarantee)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">6. Data Privacy</h2>
            <p className="text-slate-300 leading-relaxed">
              We respect your privacy. Uploaded charts are analyzed instantly and permanently deleted. 
              We do not store your research data. See our{' '}
              <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link> for details.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">7. Intellectual Property</h2>
            <p className="text-slate-300 leading-relaxed">
              All content, AI models, algorithms, and technology are owned by DataFlow Analytics. 
              You retain rights to your uploaded charts but grant us temporary license to process them.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-slate-300 leading-relaxed">
              DataFlow Analytics is provided "as is" without warranties. We are not liable for:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li>Financial losses resulting from use of our platform</li>
              <li>Inaccuracies in AI-generated analysis</li>
              <li>Service interruptions or technical issues</li>
              <li>Third-party actions or decisions based on our data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">9. Termination</h2>
            <p className="text-slate-300 leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these terms, 
              abuse our systems, or engage in fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">10. Changes to Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update these terms at any time. Continued use after changes constitutes acceptance. 
              We will notify users of material changes via email.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">11. Contact</h2>
            <p className="text-slate-300 leading-relaxed">
              For questions about these terms, contact us at:{' '}
              <a href="mailto:support@tradeflowai.cloud" className="text-orange-500 hover:underline">
                support@tradeflowai.cloud
              </a>
            </p>
          </section>
        </div>
      </motion.div>

      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          © 2026 DataFlow Analytics. Educational research tool only.
        </div>
      </footer>
    </div>
  );
}
