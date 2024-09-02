import { TrekkingTipFormSchema } from "@/utils/validation/admin/TrekkingTipFormValidation";
import { z } from "zod";

export type trekkingTipFormInput = z.infer<typeof TrekkingTipFormSchema>;
