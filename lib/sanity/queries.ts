import { client } from "./client";

export interface Novel {
  _id: string;
  title: string;
  slug: { current: string };
  genre?: string;
  logline?: string;
  cover?: any;
  wattpadUrl: string;
  order?: number;
}

export interface Poem {
  _id: string;
  title: string;
  slug: { current: string };
  body: string;
  publishedAt?: string;
  isDraft?: boolean;
}

export interface DiaryEntry {
  _id: string;
  title?: string;
  slug: { current: string };
  body: any;
  mood?: string;
  publishedAt: string;
}

export interface Photo {
  _id: string;
  image: any;
  caption?: string;
  takenAt?: string;
}

export async function getNovels(): Promise<Novel[]> {
  return client.fetch(
    `*[_type == "novel" && published == true] | order(order asc) {
      _id, title, slug, genre, logline, cover, wattpadUrl, order
    }`
  );
}

export async function getPoems(): Promise<Poem[]> {
  return client.fetch(
    `*[_type == "poem" && isDraft != true] | order(publishedAt desc) {
      _id, title, slug, body, publishedAt
    }`
  );
}

export async function getDiaryEntries(): Promise<DiaryEntry[]> {
  return client.fetch(
    `*[_type == "diaryEntry"] | order(publishedAt desc) {
      _id, title, slug, body, mood, publishedAt
    }`
  );
}

export interface Light {
  _id: string;
  note?: string;
  createdAt: string;
}

export async function getPhotos(): Promise<Photo[]> {
  return client.fetch(
    `*[_type == "photo"] | order(takenAt desc) {
      _id, image, caption, takenAt
    }`
  );
}

export async function getLights(): Promise<Light[]> {
  return client.fetch(
    `*[_type == "light"] | order(createdAt desc) [0...60] {
      _id, note, createdAt
    }`
  );
}
