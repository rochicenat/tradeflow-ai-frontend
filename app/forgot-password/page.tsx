'use client';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('email', email);
      const res = await fetch('https://tradeflow-ai-backend-production.up.railway.app/forgot-password', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1A1A1A] border border-[#252525] rounded-2xl p-8">
          <a href="/login" className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </a>

          <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
          <p className="text-slate-400 text-sm mb-6">Enter your email and we'll send you a reset link.</p>

          {sent ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400 text-sm">
              ✓ Reset link sent! Check your email inbox.
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="you@example.com"
                  className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={loading || !email}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
