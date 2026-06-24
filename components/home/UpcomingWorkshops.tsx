import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WorkshopCard from "@/components/shared/WorkshopCard";
import { workshops } from "@/data/workshops";

export default function UpcomingWorkshops() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#B9C6A5]">
            Yaklaşan
          </p>

          <h2 className="mb-6 text-4xl text-[#4D463D] md:text-5xl">
            Seçilmiş Atölyeler
          </h2>

          <p className="max-w-xl leading-relaxed text-[#7A7268]">
            Mindfulness, öz şefkat ve yaratıcı yazı aracılığıyla kendinle
            yeniden buluşabileceğin sakin bir alan.
          </p>
        </div>

        <Link
          href="/workshops"
          className="inline-flex items-center gap-2 text-sm text-[#7A7268]"
        >
          Tümünü gör
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {workshops.slice(0, 3).map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            workshop={workshop}
          />
        ))}
      </div>
    </section>
  );
}