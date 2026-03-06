"use client";
import { createContext, useContext, useState } from "react";
type Language = "en";
interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType | null>(null);
const translations: Record<string, string> = {
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
};
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang] = useState<Language>("en");
  const toggleLang = () => {};
  const t = (key: string): string => translations[key] ?? key;
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
