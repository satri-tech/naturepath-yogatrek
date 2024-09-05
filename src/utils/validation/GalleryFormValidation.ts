import z from "zod";

// Define the size limit in bytes (2MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 2MB

// Helper function to validate file size and type
const fileValidation = z
  .instanceof(File, { message: "Image is required!" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "File size should not exceed 5MB",
  })
  .refine((file) => file.type.startsWith("image/"), {
    message: "File must be an image",
  });

export const GalleryFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required!",
  }),
  thumbnail: fileValidation,
  galleryPhotos: z
    .array(fileValidation)
    .min(1, { message: "At least one image is required in gallery photos" }),
});
