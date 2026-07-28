import { defineField, defineType } from "sanity";

export default defineType({
  name: "light",
  title: "Guestbook Light",
  type: "document",
  fields: [
    defineField({
      name: "note",
      title: "Note",
      type: "string",
      description: "A short optional note left by a visitor",
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: "createdAt",
      title: "Left at",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "note", subtitle: "createdAt" },
    prepare({ title, subtitle }) {
      return { title: title || "(no note)", subtitle };
    },
  },
});
