import z from "zod";

export const AddTeamFormSchema = z.object({
  name: z.string().min(2, {
    message: "Title is required",
  }),
  position: z.string().min(2, {
    message: "Position is required",
  }),
  bio: z.string().min(2, {
    message: "Description is required",
  }),
  profile_pic: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Image size should not exceed 2MB"
    ),
});
