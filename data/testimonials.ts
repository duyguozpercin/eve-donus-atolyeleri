export type Testimonial = {
  id: number;
  name: string;
  text: string;
  workshop: string;
  city: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayşe K.",
    text: "Eve Dönüş Atölyeleri bana kendime olan yolculuğumda bir pusula oldu. Yazmak, içimde taşıdığım ama hiç ifade edemediğim şeylere ulaşmamı sağladı.",
    workshop: "Kendine Dönen Kalem",
    city: "İstanbul",
  },
  {
    id: 2,
    name: "Melis D.",
    text: "Bu atölyede geçirdiğim haftalar hayatımda okuduğum en iyi kitap gibiydi. Yazmayı yeniden keşfettim ve kendimi yeniden dinlemeye başladım.",
    workshop: "Yaratıcı Yazarlık Atölyesi",
    city: "Ankara",
  },
  {
    id: 3,
    name: "Selin A.",
    text: "Öz şefkat pratiği benim için hayatımın en dönüştürücü deneyimlerinden biri oldu. Kendime olan sertliğimin farkına vardım.",
    workshop: "Öz Şefkat Temelleri",
    city: "İzmir",
  },
];