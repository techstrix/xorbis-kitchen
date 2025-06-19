import { createClient } from '@sanity/client';
import type { SanityConfig } from '@/types/sanity';
import imageUrlBuilder from '@sanity/image-url';

// Using your actual Sanity credentials
const projectId = 'tafl285t';
const dataset = 'blogdataset';
const token = 'skCr5e0ERFhFFmZ7mlahCFdVEuhZeBcjl1RWJdp6MnxWgqmNUMfHe1XUSEcDf3dDa5MbtqFn0nMIvyilTRXRRtijrKLhnBh5QFSuSn87LggB6OMptZS0XbeNYor2lsY6a0T0eaAcsyYRzMQL0Bmpmzq29ZT9cD9V4DBBmwujDT7uZq7H2H5k';

const config: SanityConfig = {
  projectId,
  dataset,
  token,
  useCdn: true,
  apiVersion: '2024-01-01',
};

export const sanityClient = createClient(config);
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source).auto('format').fit('max');
// GROQ queries
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
  "id": _id,
  title,
  slug,
  "author": author->name,
  body,
  publishedAt,
  _createdAt
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  "id": _id,
  title,
  slug,
  "author": author->name,
  body,
  publishedAt,
  _createdAt
}`;