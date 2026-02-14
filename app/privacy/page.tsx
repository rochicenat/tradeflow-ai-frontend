'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function PrivacyPage() {
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
        <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: February 14, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="text-slate-300 leading-relaxed">
              DataFlow Analytics ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you 
              use our educational AI data analytics platform.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              We are GDPR and KVKK compliant and follow industry best practices for data protection.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">2.1 Account Information</h3>
            <p className="text-slate-300 leading-relaxed">When you register, we collect:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li>Email address</li>
              <li>Full name</li>
              <li>Encrypted password (bcrypt hashed)</li>
              <li>Subscription plan type</li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">2.2 Usage Data</h3>
            <p className="text-slate-300 leading-relaxed">We automatically collect:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li>Number of analyses performed</li>
              <li>Timestamp of platform usage</li>
              <li>Browser type and version</li>
              <li>Device information (non-identifying)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">2.3 Payment Information</h3>
            <p className="text-slate-300 leading-relaxed">
              Payment processing is handled by third-party processors (Paddle/Stripe). We do NOT store 
              your credit card details. We only receive:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li>Payment confirmation status</li>
              <li>Transaction ID (for refund purposes)</li>
              <li>Subscription status</li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">2.4 Uploaded Chart Data</h3>
            <p className="text-slate-300 leading-relaxed font-semibold text-lg">
              IMPORTANT: Uploaded charts are processed instantly by our AI and <strong>immediately deleted</strong>. 
              We do NOT store your research data or chart images permanently.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-300 leading-relaxed">We use collected data to:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li>Provide and improve our AI analytics service</li>
              <li>Manage your account and subscription</li>
              <li>Process payments and send receipts</li>
              <li>Send service updates and important notices</li>
              <li>Monitor platform usage and prevent abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              We do NOT use your data for advertising or sell it to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="text-slate-300 leading-relaxed">We protect your data using:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li><strong>HTTPS/TLS encryption</strong> for all data transmission</li>
              <li><strong>Bcrypt password hashing</strong> (passwords never stored in plain text)</li>
              <li><strong>Secure hosting</strong> on Vercel (frontend) and Railway (backend)</li>
              <li><strong>Database encryption</strong> for stored user data</li>
              <li><strong>Regular security audits</strong> and updates</li>
              <li><strong>Limited employee access</strong> to personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">5. Third-Party Sharing</h2>
            <p className="text-slate-300 leading-relaxed">We share data only with:</p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">5.1 Payment Processors</h3>
            <p className="text-slate-300 leading-relaxed">
              Paddle/Stripe process payments securely. They have their own privacy policies.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">5.2 AI Service Provider</h3>
            <p className="text-slate-300 leading-relaxed">
              Google Gemini API processes uploaded charts. Charts are sent <strong>anonymously</strong> 
              (no user identification) and Google does not store them per their API terms.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">5.3 Analytics</h3>
            <p className="text-slate-300 leading-relaxed">
              We may use privacy-friendly analytics (e.g., Plausible) to understand platform usage. 
              No personal data is shared.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">5.4 Legal Requirements</h3>
            <p className="text-slate-300 leading-relaxed">
              We may disclose data if required by law, court order, or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">6. Your Rights (GDPR/KVKK)</h2>
            <p className="text-slate-300 leading-relaxed">You have the right to:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Correction:</strong> Update inaccurate information</li>
              <li><strong>Deletion:</strong> Request account and data deletion</li>
              <li><strong>Portability:</strong> Export your data in machine-readable format</li>
              <li><strong>Withdraw consent:</strong> Opt-out of marketing emails</li>
              <li><strong>Object:</strong> Object to certain data processing activities</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              To exercise these rights, contact{' '}
              <a href="mailto:privacy@tradeflowai.cloud" className="text-orange-500 hover:underline">
                privacy@tradeflowai.cloud
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">7. Data Retention</h2>
            <p className="text-slate-300 leading-relaxed">We retain data as follows:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
              <li><strong>Account data:</strong> Until you request deletion (+ 30 days grace period)</li>
              <li><strong>Payment records:</strong> 7 years (legal requirement for tax purposes)</li>
              <li><strong>Uploaded charts:</strong> Immediately deleted after analysis (NOT stored)</li>
              <li><strong>Usage logs:</strong> 90 days for security monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">8. Cookies</h2>
            <p className="text-slate-300 leading-relaxed">
              We use essential cookies for authentication and session management only. 
              No third-party tracking cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">9. International Transfers</h2>
            <p className="text-slate-300 leading-relaxed">
              Data is stored on servers in the EU/US (Railway/Vercel). We ensure GDPR-compliant 
              data transfer mechanisms are in place.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">10. Children's Privacy</h2>
            <p className="text-slate-300 leading-relaxed">
              DataFlow Analytics is not intended for users under 18. We do not knowingly collect 
              data from minors. If you believe a minor has provided data, contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted with a new 
              "Last updated" date. Continued use constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">12. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              For privacy questions or to exercise your rights:
            </p>
            <p className="text-slate-300 leading-relaxed mt-2">
              Email: <a href="mailto:privacy@tradeflowai.cloud" className="text-orange-500 hover:underline">
                privacy@tradeflowai.cloud
              </a>
            </p>
            <p className="text-slate-300 leading-relaxed mt-2">
              Website: <a href="https://tradeflowai.cloud" className="text-orange-500 hover:underline">
                tradeflowai.cloud
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
