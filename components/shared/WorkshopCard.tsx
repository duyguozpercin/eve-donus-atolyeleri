import { ArrowRight, Calendar, Clock, Users } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import type { Workshop } from "@/data/workshops";

type Props = {
  workshop: Workshop;
};

export default function WorkshopCard({ workshop }: Props) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-3xl border border-[#B4A88C]/25 bg-[#FAF8F1] p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <CategoryBadge
          category={workshop.category}
          label={workshop.categoryLabel}
        />

        {workshop.remaining <= 3 && (
          <span className="rounded-full bg-[#F5EDD6] px-3 py-1 text-[11px] text-[#8A6A2A]">
            Son {workshop.remaining} yer
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
          {workshop.nextDate}
        </span>

        <span className="flex items-center gap-1.5">
          <Clock size={13} />
          {workshop.duration}
        </span>

        <span className="flex items-center gap-1.5">
          <Users size={13} />
          {workshop.sessions}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="text-xl text-[#4D463D]">
          {workshop.price}
        </span>

        <button className="flex items-center gap-2 rounded-full bg-[#4D463D] px-5 py-2.5 text-sm text-[#FAF8F1] transition hover:opacity-85">
          Kaydol
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}