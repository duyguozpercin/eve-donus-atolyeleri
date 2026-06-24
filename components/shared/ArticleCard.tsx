import type { Article } from "@/data/articles";

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  return (
    <article className="group cursor-pointer">
      <div className="mb-5 aspect-[4/3] overflow-hidden rounded-3xl bg-[#DDE7D6]">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mb-3 flex items-center gap-3">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B9C6A5]">
          {article.category}
        </span>

        <span className="text-[#B9C6A5]">·</span>

        <span className="text-xs text-[#7A7268]">
          {article.readTime} okuma
        </span>
      </div>

      <h3 className="mb-3 text-2xl leading-tight text-[#4D463D]">
        {article.title}
      </h3>

      <p className="mb-3 line-clamp-2 text-sm leading-7 text-[#7A7268]">
        {article.excerpt}
      </p>

      <p className="text-xs text-[#B9C6A5]">
        {article.date}
      </p>
    </article>
  );
}