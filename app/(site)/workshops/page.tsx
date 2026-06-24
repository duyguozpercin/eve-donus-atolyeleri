import WorkshopCard from "@/components/shared/WorkshopCard";
import { workshops } from "@/data/workshops";

export default function WorkshopsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-32">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#B9C6A5]">
        Atölyeler
      </p>

      <h1 className="mb-6 text-5xl text-[#4D463D]">
        Tüm Atölyeler
      </h1>

      <p className="mb-12 max-w-xl text-[#7A7268]">
        Mindfulness, öz şefkat ve yaratıcı yazarlık alanlarında
        düzenlenen çalışmalar.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {workshops.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            workshop={workshop}
          />
        ))}
      </div>
    </main>
  );
}