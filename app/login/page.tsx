'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError('');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          username: email,
          password: password
        })
      }
    );

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleLogin} className="bg-[#111] p-8 rounded-xl w-96 space-y-4">
        <h1 className="text-white text-2xl font-bold">Login</h1>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-[#1A1A1A] text-white rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-[#1A1A1A] text-white rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-orange-500 py-3 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
