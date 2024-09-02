import * as z from "zod";

export const TrekkingTipFormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  slug: z.string().nonempty("Slug is required"),
  authors: z.string().nonempty("Author is required"),
  img_url: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Image size should not exceed 2MB"
    ),
  body: z.string().nonempty("Trekking tips is required!"),
//   category
});
