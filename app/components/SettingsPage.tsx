'use client';

import { useState } from 'react';
import { User, CreditCard, Shield, Bell } from 'lucide-react';

interface UserData {
  email: string;
  name: string;
  plan: string;
  analyses_used: number;
  analyses_limit: number;
  subscription_status: string;
}

interface SettingsPageProps {
  userData: UserData | null;
}

export default function SettingsPage({ userData }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-5xl">
      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[#252525]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition relative ${
                activeTab === tab.id
                  ? 'text-orange-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.name}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Profile Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={userData?.name}
                  className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={userData?.email}
                  disabled
                  className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Current Plan</h3>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-3xl font-bold text-white mb-1 uppercase">{userData?.plan || 'Free'}</div>
                <div className="text-slate-400">
                  {userData?.analyses_used || 0} / {userData?.analyses_limit || 3} analyses used
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/pricing'}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Upgrade Plan
              </button>
            </div>

            <div className="h-2 bg-[#252525] rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all"
                style={{ width: `${((userData?.analyses_used || 0) / (userData?.analyses_limit || 3)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                <input type="password" className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition" placeholder="••••••••" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                <input type="password" className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition" placeholder="••••••••" />
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition">
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-2">Delete Account</h3>
            <p className="text-slate-400 text-sm mb-4">All your data will be permanently deleted.</p>
            <button className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-6 py-2 rounded-lg font-semibold transition">
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Email Notifications</h3>
            
            <div className="space-y-4">
              {[
                { id: 'analysis', label: 'Analysis Complete', description: 'Notify when analysis is ready' },
                { id: 'limit', label: 'Limit Warning', description: 'Alert when approaching limit' },
                { id: 'updates', label: 'Product Updates', description: 'New features and improvements' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-[#252525] last:border-0">
                  <div>
                    <div className="text-white font-medium">{item.label}</div>
                    <div className="text-sm text-slate-400">{item.description}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#252525] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
