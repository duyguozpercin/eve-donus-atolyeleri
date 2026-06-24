"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import {
  getUserRegistrations,
  type WorkshopRegistration,
} from "@/lib/services/registrationService";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { workshopsBySlugsQuery } from "@/sanity/lib/queries";

type Workshop = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  startDate?: string;
  duration?: string;
  sessions?: string;
  coverImage?: Parameters<typeof urlFor>[0];
};

type RegisteredWorkshop = {
  registration: WorkshopRegistration;
  workshop?: Workshop;
};

export function UserRegistrations() {
  const { user } = useAuth();

  const [registeredWorkshops, setRegisteredWorkshops] = useState<
    RegisteredWorkshop[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRegistrations() {
      if (!user) {
        setLoading(false);
        return;
      }

      const registrations = await getUserRegistrations(user.uid);

      if (registrations.length === 0) {
        setRegisteredWorkshops([]);
        setLoading(false);
        return;
      }

      const slugs = registrations.map(
        (registration) => registration.workshopSlug
      );

      const workshops = await client.fetch<Workshop[]>(
        workshopsBySlugsQuery,
        { slugs }
      );

      const mergedData = registrations.map((registration) => ({
        registration,
        workshop: workshops.find(
          (workshop) =>
            workshop.slug === registration.workshopSlug
        ),
      }));

      setRegisteredWorkshops(mergedData);
      setLoading(false);
    }

    loadRegistrations();
  }, [user]);

  if (loading) {
    return (
      <section className="mt-10">
        <p className="text-[#7A7268]">
          Kayıtlı atölyeler yükleniyor...
        </p>
      </section>
    );
  }

  if (registeredWorkshops.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="mb-5 text-2xl text-[#4D463D]">
          Kayıtlı Atölyelerim
        </h2>

        <div className="rounded-3xl border border-[#E6DED2] bg-white p-6">
          <p className="text-[#7A7268]">
            Henüz kayıt olduğunuz bir atölye yok.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="mb-5 text-2xl text-[#4D463D]">
        Kayıtlı Atölyelerim
      </h2>

      <div className="space-y-5">
        {registeredWorkshops.map(({ registration, workshop }) => {
          const title =
            workshop?.title ?? registration.workshopTitle;

          const slug =
            workshop?.slug ?? registration.workshopSlug;

          return (
            <Link
              key={registration.id}
              href={`/workshops/${slug}`}
              className="grid gap-5 rounded-3xl border border-[#E6DED2] bg-white p-5 transition hover:-translate-y-1 md:grid-cols-[180px_1fr]"
            >
              {workshop?.coverImage && (
                <div className="relative h-40 overflow-hidden rounded-2xl md:h-full">
                  <Image
                    src={urlFor(workshop.coverImage)
                      .width(500)
                      .height(350)
                      .url()}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <p className="text-xl text-[#4D463D]">
                  {title}
                </p>

                {workshop?.description && (
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#7A7268]">
                    {workshop.description}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#7A7268]">
                  {workshop?.startDate && (
                    <span className="rounded-full bg-[#FAF8F1] px-3 py-1">
                      {new Date(
                        workshop.startDate
                      ).toLocaleDateString("tr-TR")}
                    </span>
                  )}

                  {workshop?.duration && (
                    <span className="rounded-full bg-[#FAF8F1] px-3 py-1">
                      {workshop.duration}
                    </span>
                  )}

                  {workshop?.sessions && (
                    <span className="rounded-full bg-[#FAF8F1] px-3 py-1">
                      {workshop.sessions} oturum
                    </span>
                  )}

                  <span className="rounded-full bg-[#FAF8F1] px-3 py-1">
                    ✓ Kayıtlı
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}