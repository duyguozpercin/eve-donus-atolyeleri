import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Yazısı",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kısa Açıklama",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Yaratıcı Yazarlık", value: "creative-writing" },
          { title: "Öz Şefkat", value: "self-compassion" },
          { title: "Farkındalık", value: "mindfulness" },
          { title: "Kitaplar", value: "books" },
          { title: "Yansımalar", value: "reflections" },
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
      name: "publishedAt",
      title: "Yayın Tarihi",
      type: "datetime",
    }),
    defineField({
      name: "readTime",
      title: "Okuma Süresi",
      type: "string",
      placeholder: "7 dk",
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});