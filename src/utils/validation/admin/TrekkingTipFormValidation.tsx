import * as z from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const TrekkingTipFormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  slug: z.string().nonempty("Slug is required"),
  authors: z.string().nonempty("Author is required"),
  img_url: z
    .any() // Temporarily allow any type, since `File` is browser-only.
    .refine(
      (file: any) => {
        // Validate only if the file exists
        if (file && file instanceof File) {
          return file.size <= MAX_FILE_SIZE;
        }
        return true; // Pass for non-browser environments
      },
      {
        message: "File size must be less than 5MB",
      }
    )
    .refine(
      (file: any) => {
        // Validate file type only if file exists
        if (file && file instanceof File) {
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }
        return true; // Pass for non-browser environments
      },
      {
        message: "Invalid file type. Only JPEG, PNG, or WebP are allowed.",
      }
    ),
  // img_url: z
  //   .object({
  //     size: z.number().max(2 * 1024 * 1024, "Image size should not exceed 2MB"),
  //   })
  //   .refine(
  //     (file) => file.size <= 2 * 1024 * 1024,
  //     "Image size should not exceed 2MB"
  //   ),
  body: z.string().nonempty("Trekking tips is required!"),
  //   category
});
