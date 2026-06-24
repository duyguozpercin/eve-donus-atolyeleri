import { defineField, defineType } from "sanity";

export const workshop = defineType({
  name: "workshop",
  title: "Workshop",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Detaylı İçerik",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Yazı", value: "Yazı" },
          { title: "Mindfulness", value: "Mindfulness" },
          { title: "Şefkat", value: "Şefkat" },
          { title: "Kitap Kulübü", value: "Kitap Kulübü" },
        ],
      },
    }),

    defineField({
      name: "coverImage",
      title: "Kapak Görseli",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "startDate",
      title: "Başlangıç Tarihi",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "duration",
      title: "Süre",
      type: "string",
      description: "Örn: 2 saat, 4 hafta, 8 oturum",
    }),

    defineField({
      name: "sessions",
      title: "Oturum Sayısı",
      type: "number",
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: "price",
      title: "Ücret",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "capacity",
      title: "Kontenjan",
      type: "number",
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: "remainingSeats",
      title: "Kalan Kontenjan",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "featured",
      title: "Öne Çıkar",
      type: "boolean",
      initialValue: false,
    }),
  ],
});