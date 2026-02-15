'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              TradeFlow AI
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
        <h1 className="text-5xl font-bold text-white mb-4">Refund Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: February 14, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">1. Subscription Refunds</h2>
            <p className="text-slate-300 leading-relaxed">
              TradeFlow AI offers a <strong>7-day money-back guarantee</strong> for all paid subscriptions 
              (Pro and Premium plans). If you are not satisfied with our educational analytics service, you may 
              request a full refund within 7 days of your initial purchase.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">2. Eligibility for Refunds</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Refunds are available under the following conditions:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Request is made within 7 days of the initial subscription purchase</li>
              <li>No more than 10 chart analyses have been performed</li>
              <li>No previous refund has been issued for the same user</li>
              <li>The account has not been suspended or banned for policy violations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">3. Non-Refundable Items</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The following are <strong>not eligible</strong> for refunds:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Subscription renewals after the initial 7-day period</li>
              <li>Partial month refunds (subscriptions are billed monthly)</li>
              <li>Downgrade requests (you may cancel and re-subscribe to a lower tier)</li>
              <li>Analysis credits that have already been used</li>
              <li>Free plan users (no payment, no refund applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">4. How to Request a Refund</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              To request a refund:
            </p>
            <ol className="list-decimal list-inside text-slate-300 space-y-2 ml-4">
              <li>Email us at <strong>support@tradeflowai.cloud</strong></li>
              <li>Include your account email and subscription details</li>
              <li>Provide a brief reason for the refund request (optional)</li>
              <li>Our team will review your request within 2-3 business days</li>
            </ol>
            <p className="text-slate-300 leading-relaxed mt-4">
              Once approved, refunds are processed to the original payment method within 5-10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">5. Cancellations</h2>
            <p className="text-slate-300 leading-relaxed">
              You may cancel your subscription at any time through your account dashboard. 
              Cancellations take effect at the end of the current billing period, and you 
              will retain access to your plan features until that date. No partial refunds 
              are provided for mid-cycle cancellations.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">6. Service Outages</h2>
            <p className="text-slate-300 leading-relaxed">
              If TradeFlow AI experiences significant downtime (more than 24 consecutive hours) 
              due to technical issues on our end, affected users may be eligible for a prorated 
              refund or service credit. Please contact support for assistance.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">7. Chargebacks and Disputes</h2>
            <p className="text-slate-300 leading-relaxed">
              If you initiate a chargeback or payment dispute without contacting us first, 
              your account will be immediately suspended pending resolution. We encourage 
              you to reach out to our support team before filing disputes with your bank 
              or payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">8. Changes to This Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We reserve the right to update this Refund Policy at any time. Changes will 
              be posted on this page with an updated "Last updated" date. Continued use 
              of TradeFlow AI after policy changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="bg-blue-500/10 border border-orange-500/30 rounded-2xl p-6">
            <h2 className="text-3xl font-semibold text-orange-500 mb-4">9. Educational Service Notice</h2>
            <p className="text-slate-300 leading-relaxed">
              TradeFlow AI is an educational data analytics platform. Refund requests based on 
              "lack of profitability" or "inaccurate predictions" are not valid, as we explicitly state 
              that our service is for research and educational purposes only, not financial advice or 
              guaranteed outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-4">10. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              For refund requests or questions about this policy:
            </p>
            <p className="text-slate-300 leading-relaxed mt-2">
              Email: <a href="mailto:support@tradeflowai.cloud" className="text-orange-500 hover:underline">
                support@tradeflowai.cloud
              </a>
            </p>
          </section>
        </div>
      </motion.div>

      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          © 2026 TradeFlow AI. Educational research tool only.
        </div>
      </footer>
    </div>
  );
}
