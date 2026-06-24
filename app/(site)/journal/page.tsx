import Image from "next/image";
import Link from "next/link";
import type { Image as SanityImage } from "sanity";

import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
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
};

export default async function JournalPage() {
  const posts = await client.fetch<Post[]>(postsQuery);

  return (
    <main className="mx-auto max-w-6xl px-6 py-32">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#B9C6A5]">
        Yol Notları
      </p>

      <h1 className="mb-6 text-5xl text-[#4D463D]">
        Yazılar ve Düşünceler
      </h1>

      <p className="mb-12 max-w-xl text-[#7A7268]">
        Blog ve içerikler burada yer alacak.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => {
          const imageUrl = post.coverImage
            ? urlFor(post.coverImage).width(700).height(525).fit("crop").url()
            : null;

          return (
            <Link
              key={post._id}
              href={`/journal/${post.slug}`}
              className="group block"
            >
              <article className="h-full rounded-3xl border border-[#B4A88C]/25 bg-[#FAF8F1] p-6 transition duration-300 group-hover:-translate-y-1 group-hover:border-[#B9C6A5]/60">
                {imageUrl && (
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-[#DDE7D6]">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {post.category && (
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#B9C6A5]">
                    {post.category}
                  </p>
                )}

                <h2 className="mb-3 text-2xl leading-tight text-[#4D463D]">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="mb-5 text-sm leading-7 text-[#7A7268]">
                    {post.excerpt}
                  </p>
                )}

                {post.readTime && (
                  <p className="text-xs text-[#B9C6A5]">{post.readTime}</p>
                )}
              </article>
            </Link>
          );
        })}
      </div>
    </main>
  );
}