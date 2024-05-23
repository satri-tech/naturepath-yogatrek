import z from "zod";


export const PagesFormSchema = z.object({
    page_title: z.string().min(2, {
      message: "Title is required",
    }),
    page_description: z.string().min(2, {
      message: "Description is required",
    }),
  })