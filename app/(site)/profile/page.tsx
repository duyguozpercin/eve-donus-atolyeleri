"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRegistrations } from "@/components/profile/UserRegistrations";

import { useAuth } from "@/components/providers/AuthProvider";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading, logOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-32">
        <p className="text-[#7A7268]">Yükleniyor...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-32">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#B9C6A5]">
        Hesabım
      </p>

      <h1 className="mb-8 text-5xl text-[#4D463D]">Üyelik Bilgileri</h1>

      <div className="rounded-3xl border border-[#B4A88C]/25 bg-[#FAF8F1] p-8 shadow-sm">
        <div className="space-y-5 text-[#7A7268]">
          <p>
            <span className="text-[#4D463D]">E-posta:</span>{" "}
            {user.email}
          </p>

          <p>
            <span className="text-[#4D463D]">Rol:</span>{" "}
            {profile?.role ?? "member"}
          </p>

          <p>
            <span className="text-[#4D463D]">Üyelik Durumu:</span>{" "}
            {profile?.membershipStatus ?? "free"}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/workshops"
            className="rounded-full bg-[#4D463D] px-6 py-3 text-sm text-[#FAF8F1] transition hover:opacity-90"
          >
            Atölyeleri İncele
          </Link>

          <button
            type="button"
            onClick={logOut}
            className="rounded-full border border-[#B4A88C]/30 px-6 py-3 text-sm text-[#4D463D] transition hover:bg-[#F5F0E6]"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
      <UserRegistrations />
    </main>
  );
}