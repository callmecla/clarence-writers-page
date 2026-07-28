import { defineField, defineType } from "sanity";

export default defineType({
  name: "diaryEntry",
  title: "Diary Entry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional \u2014 leave blank to just show the date",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "body",
      title: "Entry",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "mood",
      title: "Mood tag",
      type: "string",
      description: "Optional small label, e.g. 'quiet', 'restless', 'grateful'",
    }),
    defineField({
      name: "publishedAt",
      title: "Date",
      type: "datetime",
      validation: (rule) => rule.required(),
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
