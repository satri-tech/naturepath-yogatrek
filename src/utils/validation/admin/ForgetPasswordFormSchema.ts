import * as z from "zod";

export const forgetPasswordFormSchema = z.object({
  email: z.string().nonempty("Last name is required"),
});
