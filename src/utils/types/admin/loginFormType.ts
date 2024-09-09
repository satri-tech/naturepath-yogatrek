import { LoginFormSchema } from "@/utils/validation/admin/LoginFormSchema";
import { z } from "zod";

export type loginFormInput = z.infer<typeof LoginFormSchema>;
