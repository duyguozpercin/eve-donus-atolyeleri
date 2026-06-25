"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import {
  checkWorkshopRegistration,
  getWorkshopStats,
  registerWorkshop,
} from "@/lib/services/registrationService";

type RegisterWorkshopBoxProps = {
  workshopId: string;
  workshopSlug: string;
  workshopTitle: string;
  capacity: number;
  remainingSeats: number;
};

export function RegisterWorkshopBox({
  workshopId,
  workshopSlug,
  workshopTitle,
  capacity,
  remainingSeats,
}: RegisterWorkshopBoxProps) {
  const { user, loading } = useAuth();

  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [currentRemainingSeats, setCurrentRemainingSeats] =
    useState(remainingSeats);

  const isFull = currentRemainingSeats <= 0;

  useEffect(() => {
    async function checkRegistration() {
      if (!user) return;

      const result = await checkWorkshopRegistration(
        workshopSlug,
        user.uid
      );

      setAlreadyRegistered(result);

      const stats = await getWorkshopStats(workshopSlug);

      if (stats && capacity > 0) {
        setCurrentRemainingSeats(
          Math.max(0, capacity - stats.registeredCount)
        );
      }
    }

    checkRegistration();
  }, [user, workshopSlug, capacity]);

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

      <div className="mb-6 space-y-2 text-sm text-[#7A7268]">
        <p>{user.email}</p>

        {capacity > 0 && (
          <p>
            Kontenjan: {capacity} kişi / Kalan yer:{" "}
            {currentRemainingSeats}
          </p>
        )}
      </div>

      {isFull && !alreadyRegistered && (
        <p className="mb-4 text-sm text-[#7A7268]">
          Bu atölyenin kontenjanı dolmuştur.
        </p>
      )}

      <button
        type="button"
        disabled={alreadyRegistered || isSubmitting || isFull}
        onClick={async () => {
          if (!user || !user.email) return;

          setIsSubmitting(true);
          setMessage("");

          try {
            await registerWorkshop({
              workshopId,
              workshopSlug,
              workshopTitle,
              capacity: capacity ?? 0,
              userId: user.uid,
              userEmail: user.email,
            });

            setAlreadyRegistered(true);
            setCurrentRemainingSeats((prev) =>
              Math.max(0, prev - 1)
            );
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
            : isFull
              ? "Kontenjan Doldu"
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