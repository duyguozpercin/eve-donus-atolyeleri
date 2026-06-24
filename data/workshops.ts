export type Workshop = {
  id: number;
  title: string;
  category: "writing" | "self-compassion" | "mindfulness" | "seasonal";
  categoryLabel: string;
  description: string;
  duration: string;
  sessions: string;
  nextDate: string;
  capacity: number;
  remaining: number;
  facilitator: string;
  price: string;
  online: boolean;
};

export const workshops: Workshop[] = [
  {
    id: 1,
    title: "Kendine Dönen Kalem",
    category: "writing",
    categoryLabel: "Yaratıcı Yazarlık",
    description:
      "Yazı aracılığıyla iç sesinizi keşfedin ve hikâyenizi kâğıda dökümeye başlayın. Dört haftalık bu atölye, yazıyı bir öz keşif aracı olarak kullanmanın derin yollarını araştırır.",
    duration: "4 hafta",
    sessions: "8 oturum",
    nextDate: "15 Temmuz 2026",
    capacity: 12,
    remaining: 4,
    facilitator: "Defne Işık",
    price: "₺1.800",
    online: true,
  },
  {
    id: 2,
    title: "Öz Şefkat Temelleri",
    category: "self-compassion",
    categoryLabel: "Öz Şefkat",
    description:
      "Kendinize daha nazik ve anlayışlı bir gözle bakmanın yollarını keşfederek içinizdeki sesi dönüştürün. Kristin Neff'in araştırmalarına dayanan uygulamalı bir yolculuk.",
    duration: "6 hafta",
    sessions: "12 oturum",
    nextDate: "22 Temmuz 2026",
    capacity: 10,
    remaining: 3,
    facilitator: "Defne Işık",
    price: "₺2.200",
    online: true,
  },
  {
    id: 3,
    title: "Bahar Farkındalık Çemberi",
    category: "mindfulness",
    categoryLabel: "Farkındalık",
    description:
      "Doğanın ritmiyle uyum içinde, mevsimin enerjisini duyumsamayı ve anda kalmayı pratik eden sekiz haftalık bir çember. Her hafta yeni bir farkındalık kapısı açılıyor.",
    duration: "8 hafta",
    sessions: "16 oturum",
    nextDate: "5 Ağustos 2026",
    capacity: 15,
    remaining: 7,
    facilitator: "Defne Işık",
    price: "₺2.800",
    online: true,
  },
];