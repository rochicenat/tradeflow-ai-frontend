"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "tr";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "login.title": "Welcome Back",
    "login.subtitle": "Sign in to your account",
    "login.email": "Email",
    "login.password": "Password",
    "login.button": "Sign In",
    "login.forgot": "Forgot password?",
    "login.no_account": "Don't have an account?",
    "login.signup": "Sign up",
    "login.or": "or continue with",
    "signup.title": "Create Account",
    "signup.subtitle": "Start your trading journey",
    "signup.name": "Full Name",
    "signup.email": "Email",
    "signup.password": "Password",
    "signup.confirm": "Confirm Password",
    "signup.button": "Create Account",
    "signup.have_account": "Already have an account?",
    "signup.login": "Sign in",
    "dash.welcome": "Welcome",
    "dash.analyses": "Analyses Used",
    "dash.plan": "Your Plan",
    "dash.upgrade": "Upgrade Plan",
    "dash.upload": "Upload Chart",
    "dash.history": "Analysis History",
    "dash.logout": "Logout",
    "dash.settings": "Settings",
    "dash.new_analysis": "New Analysis",
    "dash.no_history": "No analyses yet",
    "dash.sidebar.dashboard": "Dashboard",
    "dash.sidebar.history": "History",
    "dash.sidebar.pricing": "Pricing",
    "dash.sidebar.settings": "Settings",
  },
  tr: {
    "login.title": "Tekrar Hoşgeldiniz",
    "login.subtitle": "Hesabınıza giriş yapın",
    "login.email": "E-posta",
    "login.password": "Şifre",
    "login.button": "Giriş Yap",
    "login.forgot": "Şifremi unuttum",
    "login.no_account": "Hesabın yok mu?",
    "login.signup": "Kayıt ol",
    "login.or": "veya şununla devam et",
    "signup.title": "Hesap Oluştur",
    "signup.subtitle": "Ticaret yolculuğuna başla",
    "signup.name": "Ad Soyad",
    "signup.email": "E-posta",
    "signup.password": "Şifre",
    "signup.confirm": "Şifre Tekrar",
    "signup.button": "Hesap Oluştur",
    "signup.have_account": "Zaten hesabın var mı?",
    "signup.login": "Giriş yap",
    "dash.welcome": "Hoşgeldin",
    "dash.analyses": "Kullanılan Analiz",
    "dash.plan": "Planın",
    "dash.upgrade": "Planı Yükselt",
    "dash.upload": "Grafik Yükle",
    "dash.history": "Analiz Geçmişi",
    "dash.logout": "Çıkış Yap",
    "dash.settings": "Ayarlar",
    "dash.new_analysis": "Yeni Analiz",
    "dash.no_history": "Henüz analiz yok",
    "dash.sidebar.dashboard": "Panel",
    "dash.sidebar.history": "Geçmiş",
    "dash.sidebar.pricing": "Fiyatlar",
    "dash.sidebar.settings": "Ayarlar",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language;
    if (saved === "en" || saved === "tr") setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "tr" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const t = (key: string): string => {
    return translations[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
