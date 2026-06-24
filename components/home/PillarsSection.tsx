import { Feather, Heart, Leaf } from "lucide-react";

const pillars = [
  {
    icon: <Leaf size={20} />,
    label: "Farkındalık",
    title: "Anda kalmayı öğrenmek",
    desc: "Düşüncelerinizi yargılamadan gözlemleyerek, anın içinde gerçekten var olmayı keşfeden pratikler.",
    color: "#DDE7D6",
    textColor: "#5A7050",
  },
  {
    icon: <Feather size={20} />,
    label: "Yaratıcı Yazarlık",
    title: "Kâğıda dökülen gerçekler",
    desc: "Yazmak, bir öz keşif aracıdır. Her sözcük kendinizi daha derinden tanımanıza yardım eder.",
    color: "#FAF8F1",
    textColor: "#4D463D",
  },
  {
    icon: <Heart size={20} />,
    label: "Öz Şefkat",
    title: "Kendinize nazik olmak",
    desc: "İçinizdeki eleştirmen sesini dönüştürmek ve kendinize daha yumuşak bir yerden yaklaşmak için bir alan.",
    color: "#F5EDD6",
    textColor: "#8A6A2A",
  },
];

export default function PillarsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 text-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B9C6A5]">
          Ne Yapıyoruz
        </p>

        <h2 className="text-4xl leading-tight text-[#4D463D] md:text-6xl">
          Üç kapı, tek yön:
          <br />
          kendine dönmek
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.label}
            className="rounded-3xl p-8"
            style={{ background: pillar.color }}
          >
            <div
              className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/50"
              style={{ color: pillar.textColor }}
            >
              {pillar.icon}
            </div>

            <p
              className="mb-3 text-[10px] uppercase tracking-[0.2em]"
              style={{ color: pillar.textColor }}
            >
              {pillar.label}
            </p>

            <h3 className="mb-4 text-2xl leading-snug text-[#4D463D]">
              {pillar.title}
            </h3>

            <p className="text-sm leading-7 text-[#7A7268]">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}