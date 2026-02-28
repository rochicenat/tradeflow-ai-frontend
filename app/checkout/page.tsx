'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Plan {
  id: 'pro' | 'premium';
  name: string;
  price: number;
  features: string[];
  variant_id: string;
}

const plans: Plan[] = [
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 9.99,
    variant_id: '1297946',
    features: [
      '50 chart analyses per month',
      'Basic AI model',
      'Email support',
      'Standard processing speed'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 19.99,
    variant_id: '1297978',
    features: [
      'Unlimited chart analyses',
      'Advanced AI models (GPT-4, Claude)',
      'Priority support',
      'Fastest processing',
      'API access',
      'Custom indicators'
    ]
  }
];

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'premium'>('pro');
  
  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam === 'pro' || planParam === 'premium') {
      setSelectedPlan(planParam);
    }
  }, [searchParams]);

  const getUserInfo = () => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('user_email');
    const userId = localStorage.getItem('user_id');
    
    if (!token || !userEmail || !userId) {
      toast.error('Please login first');
      router.push('/login');
      return null;
    }
    
    return { userEmail, userId, token };
  };

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const userInfo = getUserInfo();
      if (!userInfo) return;
      
      const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({
          plan: selectedPlan,
          user_email: userInfo.userEmail,
          user_id: userInfo.userId
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        toast.error('Failed to create checkout session');
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300">
            Start analyzing trading charts with AI today
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`
                relative p-8 rounded-2xl cursor-pointer transition-all duration-300
                ${selectedPlan === plan.id 
                  ? 'bg-orange-500 shadow-2xl shadow-blue-500/50 scale-105' 
                  : 'bg-gray-800 hover:bg-gray-750'
                }
              `}
            >
              {plan.id === 'premium' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-300 ml-2">/month</span>
                  </div>
                </div>
                
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${selectedPlan === plan.id 
                    ? 'border-white bg-white' 
                    : 'border-gray-400'
                  }
                `}>
                  {selectedPlan === plan.id && (
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  )}
                </div>
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-400 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`
              px-12 py-4 rounded-xl font-bold text-lg
              bg-gradient-to-r from-blue-500 to-purple-600
              text-white shadow-lg hover:shadow-2xl
              transform hover:scale-105 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {loading ? (
              <div className="flex items-center justify-center">
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
                Processing...
              </div>
            ) : (
              `Subscribe to ${selectedPlanData.name} - $${selectedPlanData.price}/mo`
            )}
          </button>
          
          <p className="text-gray-400 mt-4 text-sm">
            Secure payment powered by Lemon Squeezy 🍋
          </p>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gray-800 rounded-lg p-6 max-w-2xl">
            <h4 className="text-white font-semibold mb-2">💳 Payment Information</h4>
            <p className="text-gray-300 text-sm">
              • Cancel anytime, no questions asked<br />
              • Instant access after payment<br />
              • Secure checkout with Lemon Squeezy<br />
              • 14-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><p className="text-white">Loading...</p></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
