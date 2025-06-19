export interface SanityPost {
  id: string;
  title: string;
  slug: {
    current: string;
  };
  author?: string;
  body: any[]; // Portable Text array
  publishedAt?: string;
  _createdAt?: string;
}

export interface SanityConfig {
  projectId: string;
  dataset: string;
  token?: string;
  useCdn: boolean;
  apiVersion: string;
}