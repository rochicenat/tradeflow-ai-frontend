'use client';
import { IconLogo } from '@/components/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 max-w-4xl"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Refund Policy
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Last updated: February 13, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Subscription Refunds
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              TradeFlow AI offers a <strong>7-day money-back guarantee</strong> for all paid subscriptions 
              (Pro and Premium plans). If you are not satisfied with our service, you may request 
              a full refund within 7 days of your initial purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Eligibility for Refunds
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Refunds are available under the following conditions:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Request is made within 7 days of the initial subscription purchase</li>
              <li>No more than 10 chart analyses have been performed</li>
              <li>No previous refund has been issued for the same user</li>
              <li>The account has not been suspended or banned for policy violations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Non-Refundable Items
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The following are <strong>not eligible</strong> for refunds:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Subscription renewals after the initial 7-day period</li>
              <li>Partial month refunds (subscriptions are billed monthly)</li>
              <li>Downgrade requests (you may cancel and re-subscribe to a lower tier)</li>
              <li>Analysis credits that have already been used</li>
              <li>Free plan users (no payment, no refund applicable)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. How to Request a Refund
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              To request a refund:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Email us at <strong>support@tradeflowai.cloud</strong></li>
              <li>Include your account email and subscription details</li>
              <li>Provide a brief reason for the refund request (optional)</li>
              <li>Our team will review your request within 2-3 business days</li>
            </ol>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Once approved, refunds are processed to the original payment method within 5-10 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Cancellations
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              You may cancel your subscription at any time through your account settings. 
              Cancellations take effect at the end of the current billing period, and you 
              will retain access to your plan features until that date. No partial refunds 
              are provided for mid-cycle cancellations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Service Outages
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              If TradeFlow AI experiences significant downtime (more than 24 consecutive hours) 
              due to technical issues on our end, affected users may be eligible for a prorated 
              refund or service credit. Please contact support for assistance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Chargebacks and Disputes
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you initiate a chargeback or payment dispute without contacting us first, 
              your account will be immediately suspended pending resolution. We encourage 
              you to reach out to our support team before filing disputes with your bank 
              or payment provider.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to update this Refund Policy at any time. Changes will 
              be posted on this page with an updated "Last modified" date. Continued use 
              of TradeFlow AI after policy changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              For refund requests or questions about this policy:
              <br />
              Email: <strong>support@tradeflowai.cloud</strong>
            </p>
          </section>
        </div>
      </motion.div>

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
