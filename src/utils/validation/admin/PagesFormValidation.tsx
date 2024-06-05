import z from "zod";


const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  description: z.string().min(1, "Section description is required"),
});

export const PagesFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required"),
    // .refine(async (slug) => {
    //   const { data } = await fetch("/check-slug");
    //   return data.unique;
    // }, "Slug already exists"),
  // image: z.string().url("Invalid URL format for image").optional(),
  sections: z.array(sectionSchema).optional(),
});
