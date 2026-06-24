import Link from "next/link";

export default function Navigation() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        background: "rgba(250,248,241,0.92)",
        borderBottom: "1px solid rgba(180,168,140,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-2xl italic text-[#4D463D]">
            Eve Dönüş
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7268]">
            Atölyeleri
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#7A7268] hover:text-[#4D463D]">
            Ana Sayfa
          </Link>

          <Link
            href="/workshops"
            className="text-[#7A7268] hover:text-[#4D463D]"
          >
            Atölyeler
          </Link>

          <Link
            href="/journal"
            className="text-[#7A7268] hover:text-[#4D463D]"
          >
            Yol Notları
          </Link>

          <Link
            href="/about"
            className="text-[#7A7268] hover:text-[#4D463D]"
          >
            Hakkımda
          </Link>

          <Link
            href="/contact"
            className="text-[#7A7268] hover:text-[#4D463D]"
          >
            İletişim
          </Link>
        </div>

        <Link
          href="/workshops"
          className="hidden md:flex items-center px-5 py-2 rounded-full bg-[#D8B458] text-white text-sm"
        >
          Atölyeleri İncele
        </Link>
      </div>
    </nav>
  );
}