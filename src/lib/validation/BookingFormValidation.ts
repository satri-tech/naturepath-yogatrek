import z from "zod";


export const BookingFormSchema = z.object({
    FullName: z.string().min(2, {
      message: "Fullname is required",
    }),
    country: z.string().min(2, {
      message: "country is required",
    }),
    contact: z.string().min(2, {
      message: "contact number is required",
    }).regex(/^\+\d+$/, 'Phone number must start with + and Number'),
    Email: z.string().min(2, {
      message: "Email is required",
    }),
    package: z.string().min(2, {
      message: "Please choose the Package",
    }),
    roomPeferance: z.string().min(2, {
      message: "Please choose the Package",
    }),
    NoofPerson: z.string().min(2, {
        message: "Please choose the Package",
      }),
    StartingDate: z.string().min(2,{
        message:"Please choose the date"
    }),  
    Message:z.string()

  })