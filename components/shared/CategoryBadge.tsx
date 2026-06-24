type Props = {
  category: string;
  label: string;
};

const categoryColors: Record<string, string> = {
  writing: "#DDE7D6",
  mindfulness: "#DDE7D6",
  "self-compassion": "#F5EDD6",
  seasonal: "#EAE4D4",
  community: "#E8E0D4",
};

const categoryTextColors: Record<string, string> = {
  writing: "#5A7050",
  mindfulness: "#5A7050",
  "self-compassion": "#8A6A2A",
  seasonal: "#6A5A3A",
  community: "#6A5A4A",
};

export default function CategoryBadge({
  category,
  label,
}: Props) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-[11px] tracking-widest uppercase"
      style={{
        background: categoryColors[category] || "#DDE7D6",
        color: categoryTextColors[category] || "#5A7050",
      }}
    >
      {label}
    </span>
  );
}
