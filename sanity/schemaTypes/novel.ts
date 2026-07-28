import { defineField, defineType } from "sanity";

export default defineType({
  name: "novel",
  title: "Novel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "genre",
      title: "Genre tag",
      type: "string",
      description: "Shown as the small pill above the title, e.g. 'Literary Fantasy'",
    }),
    defineField({
      name: "logline",
      title: "Logline",
      type: "text",
      rows: 3,
      description: "One or two sentences, not the full synopsis",
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "wattpadUrl",
      title: "Wattpad link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description: "Turn off to hide from the live site while you're still drafting",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "genre", media: "cover" },
  },
});
