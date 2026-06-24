import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Users } from "lucide-react";
import type { Image as SanityImage } from "sanity";

import CategoryBadge from "./CategoryBadge";
import { urlFor } from "@/sanity/lib/image";

export type WorkshopCardData = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category?: string;
  coverImage?: SanityImage;
  startDate?: string;
  duration?: string;
  sessions?: number;
  price?: number;
  capacity?: number;
  remainingSeats?: number;
  featured?: boolean;
};

type Props = {
  workshop: WorkshopCardData;
};

function formatDate(date?: string) {
  if (!date) return "Tarih yakında";

  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(price?: number) {
  if (price === undefined || price === null) return "Ücret yakında";
  if (price === 0) return "Ücretsiz";

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function WorkshopCard({ workshop }: Props) {
  const isAlmostFull =
    typeof workshop.remainingSeats === "number" &&
    workshop.remainingSeats > 0 &&
    workshop.remainingSeats <= 3;

  const imageUrl = workshop.coverImage
    ? urlFor(workshop.coverImage).width(700).height(525).fit("crop").url()
    : null;

  return (
    <Link
      href={`/workshops/${workshop.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#B4A88C]/25 bg-[#FAF8F1] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B9C6A5]/60"
    >
      {imageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden bg-[#DDE7D6]">
          <Image
            src={imageUrl}
            alt={workshop.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex items-start justify-between gap-4">
          {workshop.category && (
            <CategoryBadge
              category={workshop.category}
              label={workshop.category}
            />
          )}

          {isAlmostFull && (
            <span className="rounded-full bg-[#F5EDD6] px-3 py-1 text-[11px] text-[#8A6A2A]">
              Son {workshop.remainingSeats} yer
            </span>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-2xl leading-tight text-[#4D463D]">
            {workshop.title}
          </h3>

          <p className="line-clamp-4 text-sm leading-7 text-[#7A7268]">
            {workshop.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[#B4A88C]/25 pt-4 text-xs text-[#7A7268]">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {formatDate(workshop.startDate)}
          </span>

          {workshop.duration && (
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {workshop.duration}
            </span>
          )}

          {workshop.sessions && (
            <span className="flex items-center gap-1.5">
              <Users size={13} />
              {workshop.sessions} oturum
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xl text-[#4D463D]">
            {formatPrice(workshop.price)}
          </span>

          <span className="flex items-center gap-2 rounded-full bg-[#4D463D] px-5 py-2.5 text-sm text-[#FAF8F1] transition group-hover:opacity-85">
            Detay
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}