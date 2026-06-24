import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCard from "@/components/shared/ArticleCard";
import { articles } from "@/data/articles";

export default function JournalPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#B9C6A5]">
            Son Yazılar
          </p>

          <h2 className="mb-6 text-4xl text-[#4D463D] md:text-5xl">
            Yol Notları
          </h2>

          <p className="max-w-xl leading-relaxed text-[#7A7268]">
            Yazı, farkındalık ve öz şefkat üzerine kısa notlar.
          </p>
        </div>

        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm text-[#7A7268]"
        >
          Tüm yazılar
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}