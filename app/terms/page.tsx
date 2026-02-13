'use client';
import { IconLogo } from '@/components/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
          Terms of Service
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Last updated: February 13, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing and using TradeFlow AI, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Service Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              TradeFlow AI provides AI-powered trading chart analysis services. Our service includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Technical analysis of trading charts</li>
              <li>AI-generated trading signals and insights</li>
              <li>Trend detection and confidence scoring</li>
              <li>Risk assessment and trading recommendations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. User Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Users agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Provide accurate registration information</li>
              <li>Maintain the security of their account</li>
              <li>Use the service in compliance with applicable laws</li>
              <li>Not share account credentials with others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Subscription and Payments
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              TradeFlow AI offers multiple subscription tiers:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>Free Plan:</strong> Limited monthly analyses</li>
              <li><strong>Pro Plan:</strong> Extended analysis limits</li>
              <li><strong>Premium Plan:</strong> Unlimited analyses and priority support</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Payments are processed securely through our payment provider. Subscriptions renew automatically 
              unless cancelled before the renewal date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Disclaimer of Investment Advice
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-semibold mb-4">
              IMPORTANT: TradeFlow AI provides technical analysis tools and is NOT financial advice.
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Our AI analysis is for informational purposes only</li>
              <li>We do not guarantee trading profits or outcomes</li>
              <li>Users are solely responsible for their trading decisions</li>
              <li>Past performance does not indicate future results</li>
              <li>Always consult with a licensed financial advisor</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              TradeFlow AI and its operators shall not be liable for any trading losses, missed opportunities, 
              or other financial damages resulting from the use of our service. Users assume all risks 
              associated with trading decisions made based on our analysis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Refund Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Due to the nature of our digital service, refunds are handled on a case-by-case basis. 
              Please contact support at support@tradeflowai.cloud for refund requests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to terminate or suspend access to our service for users who violate 
              these terms or engage in fraudulent activity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may update these Terms of Service periodically. Continued use of the service after 
              changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              For questions about these Terms of Service, contact us at:
              <br />
              Email: support@tradeflowai.cloud
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
