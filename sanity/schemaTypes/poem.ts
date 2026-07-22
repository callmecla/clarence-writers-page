import { defineField, defineType } from "sanity";

export default defineType({
  name: "poem",
  title: "Poem",
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
    }),
    defineField({
      name: "body",
      title: "Poem text",
      type: "text",
      rows: 12,
      description: "Line breaks are preserved as written",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date written",
      type: "date",
    }),
    defineField({
      name: "isDraft",
      title: "Still a draft",
      type: "boolean",
      description: "Draft poems can be styled differently on the site (e.g. faded) if you want",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
  },
});
