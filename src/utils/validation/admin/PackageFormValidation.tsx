import * as z from "zod";

export const PackageFormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  slug: z.string().nonempty("Slug is required"),
  // serviceId: z.string().nonempty("Service ID is required"),
  duration: z.string().nonempty("Duration is required"),
  sharedprice: z.string().nonempty("Shared Price is required"),
  privateprice: z.string().nonempty("Private Price is required"),
  sharedOfferPrice: z.string().optional(),
  privateOfferPrice: z.string().optional(),

  thumbnail: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Image size should not exceed 2MB"
    ),

  // image: z.string().nonempty("Image URL is required"),
  highlights: z.string().optional(),
  description: z.string().nonempty("Description is required"),
  itinerary: z.string().optional(),
  costInclusion: z.string().optional(),
  costExclusion: z.string().optional(),
  // gallery: z.array(z.string()).optional(),
});