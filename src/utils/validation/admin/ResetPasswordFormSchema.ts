import * as z from "zod";

export const ResetPasswordFormSchema = z
  .object({
    email: z.string().nonempty("Last name is required"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(32, { message: "Password must not be more than 32 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // set the path of the error to confirmPassword
    message: "Passwords do not match",
  });
