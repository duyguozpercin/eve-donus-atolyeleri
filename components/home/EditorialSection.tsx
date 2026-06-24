import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function EditorialSection() {
  return (
    <section className="bg-[#F5F2E8] py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-[#DDE7D6]">
            <img
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=700&h=880&fit=crop&auto=format"
              alt="Çayır, dergi ve çiçekler"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -right-6 flex h-28 w-28 items-center justify-center rounded-full bg-[#E5D18B]">
            <span className="text-center text-xs italic leading-tight text-[#4D463D]">
              2020'den
              <br />
              bu yana
            </span>
          </div>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B9C6A5]">
            Burada Ne Bulacaksın?
          </p>

          <h2 className="mb-8 text-4xl leading-tight text-[#4D463D] md:text-5xl">
            Yavaşlamak için
            <br />
            bir alan
          </h2>

          <div className="mb-8 flex flex-col gap-5 text-[#7A7268]">
            <p className="leading-7">
              Eve Dönüş Atölyeleri, kendinizle yeniden bağlantı kurmanız için
              tasarlanmış küçük, samimi bir topluluktur. Burada kimse mükemmel
              olmak zorunda değil.
            </p>

            <p className="leading-7">
              Her atölye, yargısız bir alan açar. Yazmak için kâğıt, durmak
              için sessizlik, kendinizi duymak için fısıldayan bir ses.
            </p>

            <p className="leading-7">
              Yazıyla, farkındalıkla ve öz şefkatle birlikte kendi hikâyenizi
              yeniden yazmaya hazır mısınız?
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 border-b border-[#D8B458] pb-1 text-sm text-[#4D463D]"
          >
            Daha fazlasını oku
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}