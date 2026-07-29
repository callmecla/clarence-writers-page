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
      name: "originStory",
      title: "Where this idea came from",
      type: "text",
      rows: 4,
      description: "The one sentence, image, or moment that sparked this story",
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "moodColors",
      title: "Mood board: colors",
      type: "array",
      of: [{ type: "string" }],
      description: "Hex codes, e.g. #7fae82 — 3 to 5 works well",
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "moodSong",
      title: "Mood board: song",
      type: "string",
      description: "e.g. 'Artist – Song Title', the song that fits this story",
    }),
    defineField({
      name: "moodSongUrl",
      title: "Mood board: song link",
      type: "url",
      description: "Optional — link to Spotify, YouTube, etc.",
    }),
    defineField({
      name: "moodImage",
      title: "Mood board: image",
      type: "image",
      description: "One image that captures the feeling of this story",
      options: { hotspot: true },
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
