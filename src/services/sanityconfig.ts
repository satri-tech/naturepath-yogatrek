import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2022-03-07',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_BLOG_TOKEN!,
});


const builder = imageUrlBuilder(client);

export const urlFor = (source:any) => builder.image(source);