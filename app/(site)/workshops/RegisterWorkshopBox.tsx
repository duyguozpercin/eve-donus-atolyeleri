"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";

import { useEffect, useState } from "react";
import {
  checkWorkshopRegistration,
  registerWorkshop,
} from "@/lib/services/registrationService";

type RegisterWorkshopBoxProps = {
  workshopId: string;
  workshopSlug: string;
  workshopTitle: string;
};

export function RegisterWorkshopBox({
  workshopId,
  workshopSlug,
  workshopTitle,
}: RegisterWorkshopBoxProps) {
  const { user, loading } = useAuth();

  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkRegistration() {
      if (!user) return;

      const result = await checkWorkshopRegistration(
        workshopSlug,
        user.uid
      );

      setAlreadyRegistered(result);
    }

    checkRegistration();
  }, [user, workshopSlug]);

  if (loading) {
    return (
      <div className="mt-10 rounded-3xl border border-[#E6DED2] bg-white p-6">
        <p className="text-[#7A7268]">Kontrol ediliyor...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-10 rounded-3xl border border-[#E6DED2] bg-white p-6">
        <h2 className="mb-3 text-2xl text-[#4D463D]">
          Kayıt için giriş yapmalısınız.
        </h2>

        <p className="mb-6 text-[#7A7268]">
          Bu atölyeye kayıt olmak için hesabınıza giriş yapın.
        </p>

        <Link
          href={`/login?redirect=/register/${workshopSlug}`}
          className="inline-flex rounded-full bg-[#4D463D] px-6 py-3 text-sm text-white"
        >
          Giriş Yap
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-3xl border border-[#E6DED2] bg-white p-6">
      <h2 className="mb-3 text-2xl text-[#4D463D]">
        Atölyeye kayıt ol
      </h2>

      <p className="mb-6 text-[#7A7268]">
        {workshopTitle} atölyesine bu hesapla kayıt olacaksınız:
      </p>

      <p className="mb-6 text-sm text-[#7A7268]">
        {user.email}
      </p>

      <button
        type="button"
        disabled={alreadyRegistered || isSubmitting}
        onClick={async () => {
          if (!user || !user.email) return;

          setIsSubmitting(true);
          setMessage("");

          try {
            await registerWorkshop({
              workshopId,
              workshopSlug,
              workshopTitle,
              userId: user.uid,
              userEmail: user.email,
            });

            setAlreadyRegistered(true);
            setMessage("Kaydınız alındı.");
          } catch (error) {
            setMessage(
              error instanceof Error
                ? error.message
                : "Kayıt sırasında bir hata oluştu."
            );
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="rounded-full bg-[#4D463D] px-6 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Kaydediliyor..."
          : alreadyRegistered
            ? "Kaydınız Alındı"
            : "Kaydol"}
      </button>
      {message && (
        <p className="mt-4 text-sm text-[#7A7268]">
          {message}
        </p>
      )}
    </div>
  );
}