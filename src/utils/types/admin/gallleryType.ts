import { GalleryFormSchema } from "@/utils/validation/GalleryFormValidation";
import { z } from "zod";

export type galleriesFormInput = z.infer<typeof GalleryFormSchema>;
