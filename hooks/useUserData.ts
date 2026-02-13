import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';

const API_URL = 'https://lucky-mercy-production-45c7.up.railway.app';

interface User {
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'premium';
  analyses_used: number;
  analyses_limit: number;
  subscription_status: 'active' | 'inactive' | 'cancelled';
}

// Fetch user data
export const useUserData = () => {
  const { token, updateUser } = useAuthStore();

  return useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User> => {
      const response = await fetch(`${API_URL}/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch user');

      const data = await response.json();
      updateUser(data); // Zustand store'u da güncelle
      return data;
    },
    enabled: !!token, // Token varsa çalış
    staleTime: 30000, // 30 saniye fresh tut
    refetchOnWindowFocus: true, // Pencere focus olunca yenile
  });
};

// Refresh user data manually
export const useRefreshUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
