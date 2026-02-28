'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/me")
      .then(() => setLoading(false))
      .catch(() => router.push("/login"));
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </div>
  );
}
