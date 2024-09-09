import { ResetPasswordFormSchema } from "@/utils/validation/admin/ResetPasswordFormSchema";
import { z } from "zod";

export type resetPasswordFormInput = z.infer<typeof ResetPasswordFormSchema>;
