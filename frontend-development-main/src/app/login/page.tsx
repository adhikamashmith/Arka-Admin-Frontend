"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.login(email, password);

      if (response.success) {
        setAuth({
          accessToken: response.data.tokens.access_token,
          refreshToken: response.data.tokens.refresh_token,
          adminId: response.data.admin_id,
          email: response.data.email,
        });
        router.push("/");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-poppins">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/boat.jpg"
          alt="Ocean Background"
          fill
          className="object-cover"
          priority
        />
        {/* Blackish Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to your Account
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email and password to get started
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block text-left">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1B6486] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block text-left">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1B6486] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90 mt-4 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(90deg, #1B6486 0%, #1F9EBD 100%)",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#1B6486] font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
