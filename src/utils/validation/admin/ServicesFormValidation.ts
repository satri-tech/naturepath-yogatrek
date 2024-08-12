import z from "zod";

export const ServiceFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  description: z.string().min(2, {
    message: "Description is required",
  }),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Image size should not exceed 2MB"
    ),
});
