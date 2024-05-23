import z from "zod";


export const ServiceFormSchema = z.object({
    title: z.string().min(2, {
      message: "Title is required",
    }),
    Description: z.string().min(2, {
      message: "Description is required",
    }),
  })