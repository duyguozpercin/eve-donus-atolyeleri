export type Article = {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Kâğıda Dökülen Sessizlik: Yazmanın Şifa Gücü",
    category: "Yaratıcı Yazarlık",
    excerpt:
      "Yazı yazmak, iç dünyamızı anlamlandırmanın en eski ve en derin yollarından biri.",
    readTime: "7 dk",
    date: "12 Haziran 2026",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&h=460&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Kendinize Söyleyeceğiniz Şefkatli Bir Söz",
    category: "Öz Şefkat",
    excerpt:
      "Kendinizle nasıl konuştuğunuz, kendinizi nasıl hissettiğinizi derinden etkiler.",
    readTime: "5 dk",
    date: "3 Haziran 2026",
    image:
      "https://images.unsplash.com/photo-1490750967868-88df5691cc8e?w=700&h=460&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Mevsim Değişimlerinde Farkındalık Pratiği",
    category: "Farkındalık",
    excerpt:
      "Doğanın döngüsüyle uyum içinde yaşamak, geçiş dönemlerini bilinçli deneyimleme fırsatı sunar.",
    readTime: "6 dk",
    date: "24 Mayıs 2026",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=700&h=460&fit=crop&auto=format",
  },
];