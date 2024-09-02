import { ServiceFormSchema } from "@/utils/validation/admin/ServicesFormValidation";
import { z } from "zod";

export type serviceFormInput = z.infer<typeof ServiceFormSchema>;
