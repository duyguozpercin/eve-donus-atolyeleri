"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/components/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();

  const { signIn, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signIn(email, password);

      router.push("/");
    } catch {
      setError("E-posta veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      await signInWithGoogle();

      router.push("/");
    } catch {
      setError("Google ile giriş yapılamadı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-32">
      <div className="w-full rounded-3xl border border-[#B4A88C]/25 bg-[#FAF8F1] p-8 shadow-sm">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#B9C6A5]">
          Giriş
        </p>

        <h1 className="mb-6 text-4xl text-[#4D463D]">
          Tekrar Hoş Geldin
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-[#7A7268]">
              E-posta
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-[#B4A88C]/30 bg-white px-4 py-3 text-[#4D463D] outline-none focus:border-[#B9C6A5]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#7A7268]">
              Şifre
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-[#B4A88C]/30 bg-white px-4 py-3 pr-12 text-[#4D463D] outline-none focus:border-[#B9C6A5]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A7268]"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#4D463D] px-6 py-3 text-sm text-[#FAF8F1]"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="my-6 h-px bg-[#B4A88C]/25" />

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full rounded-full border border-[#B4A88C]/30 bg-white px-6 py-3 text-sm text-[#4D463D]"
        >
          Google ile devam et
        </button>
      </div>
    </main>
  );
}