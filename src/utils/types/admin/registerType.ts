import { RegisterFormSchema } from "@/utils/validation/admin/RegisterFormSchema";
import { z } from "zod";

export type registerFormInput = z.infer<typeof RegisterFormSchema>;
