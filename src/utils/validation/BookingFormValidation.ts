import z from "zod";

export const BookingFormSchema = z.object({
  fullname: z.string().min(2, {
    message: "Fullname is required",
  }),
  country: z.string().min(2, {
    message: "country is required",
  }),
  contact: z
    .string()
    .min(2, {
      message: "contact number is required",
    })
    .regex(/^\+\d+$/, "Phone number must start with + and Number"),
  email: z.string().min(2, {
    message: "Email is required",
  }),
  packageId: z.string().min(2, {
    message: "Please choose the Package",
  }),
  roomPreferences: z.string().min(2, {
    message: "Please choose the Package",
  }),
  bookingDate: z.date({ required_error: "Please Pick the date" }),
  noofPerson: z.string({
    required_error: "Please specify the number of individuals for checkins",
  }).regex(/^[1-9]\d*$/, "Must be a number"),
  message: z.string().optional(),
});
