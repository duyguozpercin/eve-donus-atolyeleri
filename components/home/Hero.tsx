import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F5F2E8] flex items-center justify-center px-6 pt-24">
      <div className="max-w-4xl mx-auto text-center">
        <p className="inline-block text-[11px] tracking-[0.3em] uppercase mb-8 px-4 py-2 rounded-full bg-[#FAF8F1]/80 text-[#4D463D]">
          Mindfulness · Öz Şefkat · Yaratıcı Yazarlık
        </p>

        <h1 className="text-6xl md:text-8xl leading-[1.05] mb-8 text-[#3A342C] italic">
          Eve Dönüş
          <br />
          Atölyeleri
        </h1>

        <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12 text-[#4D463D] italic">
          Mindfulness, öz şefkat ve yaratıcı yazı aracılığıyla kendinle yeniden
          buluşabileceğin sakin bir alan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/workshops"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm bg-[#D8B458] text-[#FAF8F1]"
          >
            Atölyeleri İncele
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/about"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm border border-[#B4A88C]/40 text-[#4D463D] bg-[#FAF8F1]/70"
          >
            Hikâyemizi Oku
          </Link>
        </div>
      </div>
    </section>
  );
}