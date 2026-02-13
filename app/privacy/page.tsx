'use client';
import { IconLogo } from '@/components/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
          <IconLogo />
          <Link 
            href="/"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 max-w-4xl"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Last updated: February 13, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>Account Information:</strong> Email address, name, and password</li>
              <li><strong>Usage Data:</strong> Chart uploads, analysis requests, and feature usage</li>
              <li><strong>Payment Information:</strong> Processed securely through our payment provider</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use collected information to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Provide and improve our AI analysis services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send service-related notifications and updates</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Prevent fraud and ensure platform security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Data Storage and Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your data security is our priority:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>All data is encrypted in transit using HTTPS/TLS</li>
              <li>Passwords are hashed using industry-standard bcrypt</li>
              <li>Database hosted on secure cloud infrastructure (Railway)</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication mechanisms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Data Sharing and Third Parties
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We do NOT sell your personal data. We may share data with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>Payment Processors:</strong> To process transactions securely</li>
              <li><strong>AI Services:</strong> Google Gemini API for chart analysis (anonymized data)</li>
              <li><strong>Analytics Tools:</strong> For usage statistics (anonymized)</li>
              <li><strong>Legal Requirements:</strong> When required by law or court order</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Cookies and Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use essential cookies for authentication and session management. We do not use 
              third-party advertising cookies. You can disable cookies in your browser settings, 
              but this may affect service functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Your Rights (GDPR & KVKK Compliance)
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Export your data in portable format</li>
              <li>Withdraw consent for data processing</li>
              <li>Object to automated decision-making</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              To exercise these rights, contact us at: privacy@tradeflowai.cloud
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Data Retention
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We retain your data as long as your account is active. After account deletion:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>Personal data is deleted within 30 days</li>
              <li>Anonymized usage statistics may be retained for analytics</li>
              <li>Financial records retained as required by law (typically 7 years)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              TradeFlow AI is not intended for users under 18 years of age. We do not knowingly 
              collect data from children. If we discover such data, it will be deleted immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. International Data Transfers
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your data may be processed in servers located outside your country. We ensure 
              adequate data protection measures are in place for all transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may update this Privacy Policy periodically. Significant changes will be notified 
              via email. Continued use of the service constitutes acceptance of updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              11. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              For privacy-related questions or requests:
              <br />
              Email: privacy@tradeflowai.cloud
              <br />
              Support: support@tradeflowai.cloud
            </p>
          </section>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2026 TradeFlow AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
