import { defineField, defineType } from "sanity";

export default defineType({
  name: "marginaliaNote",
  title: "Marginalia Note",
  type: "document",
  fields: [
    defineField({
      name: "note",
      title: "Note",
      type: "string",
      description: "A short scribble left in the margin",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "targetType",
      title: "Left on",
      type: "string",
      options: { list: ["poem", "diaryEntry"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "targetId",
      title: "Target document ID",
      type: "string",
      description: "The _id of the poem or diary entry this note belongs to",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Left at",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "note", subtitle: "targetType" },
  },
});
