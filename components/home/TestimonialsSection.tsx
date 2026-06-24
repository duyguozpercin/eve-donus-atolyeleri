import { MapPin } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="bg-[#F5F2E8] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-[#B9C6A5]">
            Katılımcı Deneyimleri
          </p>

          <h2 className="text-4xl text-[#4D463D] md:text-5xl">
            Onların sözleriyle
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="relative rounded-3xl bg-[#FAF8F1] p-8"
            >
              <span className="absolute left-6 top-4 text-6xl text-[#D8B458]/20">
                "
              </span>

              <p className="relative z-10 mb-8 pt-6 leading-7 text-[#4D463D] italic">
                {testimonial.text}
              </p>

              <div className="border-t border-[#B4A88C]/20 pt-5">
                <p className="text-lg text-[#4D463D]">
                  {testimonial.name}
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs text-[#B9C6A5]">
                  <MapPin size={11} />
                  {testimonial.city} · {testimonial.workshop}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}