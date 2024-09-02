import { BookingFormSchema } from "@/utils/validation/BookingFormValidation";
import { z } from "zod";

export type bookingFormInput = z.infer<typeof BookingFormSchema>;
