'use client';
import { useState } from 'react';
import { User, CreditCard, Shield, Bell } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { getToken, removeToken } from '@/app/lib/auth';

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
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(userData?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleDeleteAccount = async () => {
    if (!window.confirm(lang === 'tr' ? 'Emin misiniz? Bu işlem geri alınamaz.' : 'Are you sure? This action cannot be undone.')) return;
    const token = getToken();
    try {
      const res = await fetch('https://tradeflow-ai-backend-production.up.railway.app/delete-account', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        removeToken();
        window.location.href = '/login';
      } else {
        alert(lang === 'tr' ? 'Hesap silinemedi' : 'Failed to delete account');
      }
    } catch (e) {
      alert(lang === 'tr' ? 'Hata oluştu' : 'Error deleting account');
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveSuccess(false);
    const token = getToken();
    if (!token) return;
    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/update-profile', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert(lang === 'tr' ? 'Değişiklikler kaydedilemedi' : 'Failed to save changes');
      }
    } catch (error) {
      alert(lang === 'tr' ? 'Hata oluştu' : 'Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword) {
      alert(lang === 'tr' ? 'Lütfen tüm şifre alanlarını doldurun' : 'Please fill in all password fields');
      return;
    }
    const passwordValid = newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword);
    if (!passwordValid) {
      alert(lang === 'tr' ? 'Şifre en az 8 karakter, 1 büyük harf ve 1 rakam içermeli' : 'Password must be at least 8 characters, include 1 uppercase letter and 1 number');
      return;
    }
    setPasswordUpdating(true);
    setPasswordSuccess(false);
    const token = getToken();
    if (!token) return;
    try {
      const response = await fetch('https://tradeflow-ai-backend-production.up.railway.app/change-password', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
      });
      const data = await response.json();
      if (response.ok) {
        setPasswordSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        alert(data.detail || (lang === 'tr' ? 'Şifre güncellenemedi' : 'Failed to update password'));
      }
    } catch (error) {
      alert(lang === 'tr' ? 'Hata oluştu' : 'Error updating password');
    } finally {
      setPasswordUpdating(false);
    }
  };

  const tabs = [
    { id: 'profile', name: lang === 'tr' ? 'Profil' : 'Profile', icon: User },
    { id: 'billing', name: lang === 'tr' ? 'Fatura' : 'Billing', icon: CreditCard },
    { id: 'security', name: lang === 'tr' ? 'Güvenlik' : 'Security', icon: Shield },
    { id: 'notifications', name: lang === 'tr' ? 'Bildirimler' : 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-5xl">
      <div className="flex gap-2 mb-8 border-b border-[#252525]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition relative ${activeTab === tab.id ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}>
              <Icon className="w-5 h-5" />
              {tab.name}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />}
            </button>
          );
        })}
      </div>

      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">{lang === 'tr' ? 'Profil Bilgileri' : 'Profile Information'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{lang === 'tr' ? 'Ad Soyad' : 'Full Name'}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{lang === 'tr' ? 'E-posta Adresi' : 'Email Address'}</label>
                <input type="email" defaultValue={userData?.email} disabled
                  className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed" />
                <p className="text-xs text-slate-500 mt-1">{lang === 'tr' ? 'E-posta değiştirilemez' : 'Email cannot be changed'}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleSaveProfile} disabled={saving}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50">
                  {saving ? (lang === 'tr' ? 'Kaydediliyor...' : 'Saving...') : (lang === 'tr' ? 'Değişiklikleri Kaydet' : 'Save Changes')}
                </button>
                {saveSuccess && <span className="text-green-400 text-sm font-medium">✓ {lang === 'tr' ? 'Kaydedildi!' : 'Changes saved!'}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">{lang === 'tr' ? 'Mevcut Plan' : 'Current Plan'}</h3>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-3xl font-bold text-white mb-1 uppercase">{userData?.plan || 'Free'}</div>
                {userData?.plan !== 'free' && (
                  <div className="text-slate-400">
                    {userData?.analyses_used || 0} / {userData?.plan === "premium" ? "∞" : userData?.analyses_limit || 3} {lang === "tr" ? "analiz kullanıldı" : "analyses used"}
                  </div>
                )}
              </div>
              {userData?.plan === 'free' && (
                <button onClick={() => window.location.href = '/pricing'}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                  {lang === 'tr' ? 'Planı Yükselt' : 'Upgrade Plan'}
                </button>
              )}
            </div>
            {userData?.plan !== 'free' && (
              <div className="h-2 bg-[#252525] rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 transition-all"
                  style={{ width: `${((userData?.analyses_used || 0) / (userData?.analyses_limit || 3)) * 100}%` }} />
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">{lang === 'tr' ? 'Şifre Değiştir' : 'Change Password'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{lang === 'tr' ? 'Mevcut Şifre' : 'Current Password'}</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                  placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{lang === 'tr' ? 'Yeni Şifre' : 'New Password'}</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                  placeholder="••••••••" />
                <p className="text-xs text-slate-500 mt-1">{lang === 'tr' ? 'Min 8 karakter, 1 büyük harf, 1 rakam' : 'Min 8 chars, 1 uppercase, 1 number'}</p>
                {newPassword.length > 0 && !(newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)) && (
                  <p className="text-red-500 text-xs mt-1">{lang === 'tr' ? 'Min 8 karakter, 1 büyük harf, 1 rakam' : 'Min 8 chars, 1 uppercase, 1 number'}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handlePasswordUpdate} disabled={passwordUpdating}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50">
                  {passwordUpdating ? (lang === 'tr' ? 'Güncelleniyor...' : 'Updating...') : (lang === 'tr' ? 'Şifreyi Güncelle' : 'Update Password')}
                </button>
                {passwordSuccess && <span className="text-green-400 text-sm font-medium">✓ {lang === 'tr' ? 'Şifre güncellendi!' : 'Password updated!'}</span>}
              </div>
            </div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-2">{lang === 'tr' ? 'Hesabı Sil' : 'Delete Account'}</h3>
            <p className="text-slate-400 text-sm mb-4">{lang === 'tr' ? 'Tüm verileriniz kalıcı olarak silinecek.' : 'All your data will be permanently deleted.'}</p>
            <button onClick={handleDeleteAccount}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-6 py-2 rounded-lg font-semibold transition">
              {lang === 'tr' ? 'Hesabı Sil' : 'Delete Account'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-[#252525] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">{lang === 'tr' ? 'E-posta Bildirimleri' : 'Email Notifications'}</h3>
            <div className="space-y-4">
              {[
                { id: 'analysis', label: lang === 'tr' ? 'Analiz Tamamlandı' : 'Analysis Complete', description: lang === 'tr' ? 'Analiz hazır olduğunda bildir' : 'Notify when analysis is ready' },
                { id: 'limit', label: lang === 'tr' ? 'Limit Uyarısı' : 'Limit Warning', description: lang === 'tr' ? 'Limite yaklaşınca uyar' : 'Alert when approaching limit' },
                { id: 'updates', label: lang === 'tr' ? 'Ürün Güncellemeleri' : 'Product Updates', description: lang === 'tr' ? 'Yeni özellikler ve iyileştirmeler' : 'New features and improvements' },
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
