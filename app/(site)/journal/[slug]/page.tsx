import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image as SanityImage } from "sanity";
import type { Metadata } from "next";

import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  publishedAt?: string;
  coverImage?: SanityImage;
  body?: PortableTextBlock[];
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-9 text-[#5F574D]">
        {children}
      </p>
    ),

    h2: ({ children }) => (
      <h2 className="mt-12 mb-5 text-3xl text-[#4D463D]">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 text-2xl text-[#4D463D]">
        {children}
      </h3>
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });

  if (!post) {
    return {
      title: "Yazı bulunamadı",
    };
  }

  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${post.title} | Eve Dönüş Atölyeleri`,
    description: post.excerpt ?? "Eve Dönüş Atölyeleri blog yazısı.",
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "Eve Dönüş Atölyeleri blog yazısı.",
      type: "article",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
  };
}

export default async function JournalDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const post = await client.fetch<Post | null>(
    postBySlugQuery,
    { slug }
  );

  if (!post) {
    notFound();
  }

  const imageUrl = post.coverImage
    ? urlFor(post.coverImage)
        .width(1400)
        .height(788)
        .fit("crop")
        .url()
    : null;

  return (
    <main className="mx-auto max-w-4xl px-6 py-32">
      {post.category && (
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#B9C6A5]">
          {post.category}
        </p>
      )}

      <h1 className="mb-6 text-5xl leading-tight text-[#4D463D] md:text-6xl">
        {post.title}
      </h1>

      <div className="mb-10 flex flex-wrap gap-4 text-sm text-[#9A9288]">
        {post.publishedAt && (
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("tr-TR")}
          </time>
        )}

        {post.readTime && <span>{post.readTime}</span>}
      </div>

      {imageUrl && (
        <div className="relative mb-16 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      )}

      {post.body && (
        <article className="mx-auto">
          <PortableText
            value={post.body}
            components={portableTextComponents}
          />
        </article>
      )}
    </main>
  );
}