import { defineCollection, z } from 'astro:content';

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    status: z.enum(['published', 'coming-soon']),
    duration: z.string(),
    moduleCount: z.number(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    deckPath: z.string().optional(),
    modules: z.array(z.object({
      n: z.number(),
      name: z.string(),
      summary: z.string(),
      minutes: z.number(),
    })),
    practiceFiles: z.array(z.object({
      label: z.string(),
      file: z.string(),
      module: z.number().optional(),
    })),
    heroAccent: z.string().default('#1B4DE4'),
    order: z.number().default(0),
  }),
});

export const collections = { courses };
