import { forgetPasswordFormSchema } from "@/utils/validation/admin/ForgetPasswordFormSchema";
import { z } from "zod";

export type forgetPasswordformInput = z.infer<typeof forgetPasswordFormSchema>;
