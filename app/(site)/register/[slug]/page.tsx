import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { workshopBySlugQuery } from "@/sanity/lib/queries";
import { RegisterWorkshopBox } from "../../workshops/RegisterWorkshopBox";

export const revalidate = 60;

type Workshop = {
  _id: string;
  title: string;
  slug: string;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RegisterPage({ params }: PageProps) {
  const { slug } = await params;

  const workshop = await client.fetch<Workshop | null>(workshopBySlugQuery, {
    slug,
  });

  if (!workshop) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-32">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#B9C6A5]">
        Kayıt
      </p>

      <h1 className="mb-6 text-5xl text-[#4D463D]">
        {workshop.title}
      </h1>

      <p className="text-lg leading-8 text-[#7A7268]">
        Bu atölye için kayıt sistemi yakında aktif olacak.
      </p>

      <RegisterWorkshopBox
        workshopId={workshop._id}
        workshopSlug={workshop.slug}
        workshopTitle={workshop.title}
      />
    </main>
  );
}