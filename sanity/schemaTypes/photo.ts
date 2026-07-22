import { defineField, defineType } from "sanity";

export default defineType({
  name: "photo",
  title: "Photograph",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "What it inspired, or where it was taken",
    }),
    defineField({
      name: "relatedWriting",
      title: "Related poem or diary entry",
      type: "reference",
      to: [{ type: "poem" }, { type: "diaryEntry" }],
      description: "Optional \u2014 link this photo to the piece it inspired",
    }),
    defineField({
      name: "takenAt",
      title: "Date taken",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
  },
});
