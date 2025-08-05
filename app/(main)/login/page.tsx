'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res && res.ok && !res.error) {
      router.push('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="flex flex-col gap-2 bg-white rounded-md px-6 py-4 max-w-sm">
        <h1 className="text-2xl mb-4 text-center font-semibold">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-2 bg-gray-100 outline-none rounded"
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="w-full p-2 bg-gray-100 outline-none rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="text-nowrap flex justify-between items-center gap-4">
            <div>
              <Link href={'/'} className="block text-indigo-600 hover:underline">Back to Home</Link>
            </div>
            <div>
              <button className="w-full bg-blue-500 text-white py-1.5 px-3 rounded block" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
