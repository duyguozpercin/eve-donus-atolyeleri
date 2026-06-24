"use client";

import Link from "next/link";

import { useAuth } from "@/components/providers/AuthProvider";

export default function Navigation() {
  const { user, logOut } = useAuth();

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 backdrop-blur-md"
      style={{
        background: "rgba(250,248,241,0.92)",
        borderBottom: "1px solid rgba(180,168,140,0.2)",
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-2xl italic text-[#4D463D]">Eve Dönüş</span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7268]">
            Atölyeleri
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-[#7A7268] hover:text-[#4D463D]">
            Ana Sayfa
          </Link>

          <Link
            href="/workshops"
            className="text-[#7A7268] hover:text-[#4D463D]"
          >
            Atölyeler
          </Link>

          <Link
            href="/journal"
            className="text-[#7A7268] hover:text-[#4D463D]"
          >
            Yol Notları
          </Link>

          <Link
            href="/about"
            className="text-[#7A7268] hover:text-[#4D463D]"
          >
            Hakkımda
          </Link>

          <Link
            href="/contact"
            className="text-[#7A7268] hover:text-[#4D463D]"
          >
            İletişim
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                href="/profile"
                className="max-w-[180px] truncate text-sm text-[#7A7268] hover:text-[#4D463D]"
              >
                Hesabım
              </Link>

              <button
                type="button"
                onClick={logOut}
                className="rounded-full border border-[#B4A88C]/30 px-5 py-2 text-sm text-[#4D463D] transition hover:bg-[#F5F0E6]"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-[#7A7268]">
                Giriş Yap
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-[#D8B458] px-5 py-2 text-sm text-white transition hover:opacity-90"
              >
                Üye Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}