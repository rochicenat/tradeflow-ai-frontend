import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'premium';
  analyses_used: number;
  analyses_limit: number;
  subscription_status: 'active' | 'inactive' | 'cancelled';
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setAuth: (token: string, user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => 
        set({ token, user, isAuthenticated: true }),

      updateUser: (user) => 
        set({ user }),

      logout: () => 
        set({ token: null, user: null, isAuthenticated: false }),

      clearAuth: () => 
        set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
