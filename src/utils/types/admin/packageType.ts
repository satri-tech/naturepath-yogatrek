import { PackageFormSchema } from "@/utils/validation/admin/PackageFormValidation";
import { z } from "zod";

export type packageFormInput = z.infer<typeof PackageFormSchema>;
