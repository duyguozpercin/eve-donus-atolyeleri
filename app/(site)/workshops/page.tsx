import WorkshopCard from "@/components/shared/WorkshopCard";
import { client } from "@/sanity/lib/client";
import { workshopsQuery } from "@/sanity/lib/queries";
import type { Image as SanityImage } from "sanity";

export const revalidate = 60;

type Workshop = {
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

export default async function WorkshopsPage() {
  const workshops = await client.fetch<Workshop[]>(workshopsQuery);

  return (
    <main className="mx-auto max-w-6xl px-6 py-32">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#B9C6A5]">
        Atölyeler
      </p>

      <h1 className="mb-6 text-5xl text-[#4D463D]">Tüm Atölyeler</h1>

      <p className="mb-12 max-w-xl text-[#7A7268]">
        Mindfulness, öz şefkat ve yaratıcı yazarlık alanlarında düzenlenen
        çalışmalar.
      </p>

      {workshops.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop._id} workshop={workshop} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-[#B4A88C]/25 bg-[#FAF8F1] p-8">
          <p className="text-[#7A7268]">
            Henüz yayınlanmış bir atölye bulunmuyor.
          </p>
        </div>
      )}
    </main>
  );
}