import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image as SanityImage } from "sanity";
import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { workshopBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-9 text-[#5F574D]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-5 mt-12 text-3xl text-[#4D463D]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 text-2xl text-[#4D463D]">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-4 border-[#B9C6A5] pl-6 text-xl italic leading-9 text-[#7A7268]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 list-disc space-y-3 pl-6 text-lg leading-8 text-[#5F574D]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-8 list-decimal space-y-3 pl-6 text-lg leading-8 text-[#5F574D]">
        {children}
      </ol>
    ),
  },
};

type Workshop = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  body?: PortableTextBlock[];
  category?: string;
  coverImage?: SanityImage;
  startDate?: string;
  duration?: string;
  sessions?: number;
  price?: number;
  capacity?: number;
  remainingSeats?: number;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const workshop = await client.fetch<Workshop | null>(workshopBySlugQuery, {
    slug,
  });

  if (!workshop) {
    return {
      title: "Atölye bulunamadı",
    };
  }

  const imageUrl = workshop.coverImage
    ? urlFor(workshop.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${workshop.title} | Eve Dönüş Atölyeleri`,
    description: workshop.description,
    openGraph: {
      title: workshop.title,
      description: workshop.description,
      type: "website",
      images: imageUrl
        ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: workshop.title,
          },
        ]
        : [],
    },
  };
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const workshop = await client.fetch<Workshop | null>(workshopBySlugQuery, {
    slug,
  });

  if (!workshop) {
    notFound();
  }

  const imageUrl = workshop.coverImage
    ? urlFor(workshop.coverImage).width(1400).height(788).fit("crop").url()
    : null;

  return (
    <main className="mx-auto max-w-4xl px-6 py-32">
      {workshop.category && (
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#B9C6A5]">
          {workshop.category}
        </p>
      )}

      <h1 className="mb-6 text-5xl leading-tight text-[#4D463D] md:text-6xl">
        {workshop.title}
      </h1>

      <p className="mb-10 max-w-2xl text-lg leading-8 text-[#7A7268]">
        {workshop.description}
      </p>

      {imageUrl && (
        <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image
            src={imageUrl}
            alt={workshop.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mb-16 grid gap-4 rounded-3xl border border-[#B4A88C]/25 bg-[#FAF8F1] p-6 text-[#7A7268] md:grid-cols-2">
        <p>Tarih: {formatDate(workshop.startDate)}</p>
        <p>Süre: {workshop.duration ?? "Yakında"}</p>
        <p>Oturum: {workshop.sessions ?? "Yakında"}</p>
        <p>Ücret: {formatPrice(workshop.price)}</p>
        <p>Kontenjan: {workshop.capacity ?? "Yakında"}</p>
        <p>Kalan Yer: {workshop.remainingSeats ?? "Yakında"}</p>
      </div>

      <div className="mb-16 rounded-3xl bg-[#4D463D] p-8 text-[#FAF8F1]">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#B9C6A5]">
          Katılım
        </p>

        <h2 className="mb-4 text-3xl">Bu atölyeye katılmak ister misin?</h2>

        <p className="mb-6 max-w-2xl leading-7 text-[#E8E0D0]">
          Kayıt sistemi yakında aktif olacak. Şimdilik detayları inceleyebilir,
          kontenjan durumunu takip edebilirsin.
        </p>

        <Link
          href={`/register/${workshop.slug}`}
          className="inline-flex rounded-full bg-[#FAF8F1] px-6 py-3 text-sm text-[#4D463D] transition hover:opacity-90"
        >
          Kayıt Ol
        </Link>
      </div>

      {workshop.body && (
        <article>
          <PortableText
            value={workshop.body}
            components={portableTextComponents}
          />
        </article>
      )}
    </main>
  );
}