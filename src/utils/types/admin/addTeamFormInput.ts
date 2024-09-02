import { AddTeamFormSchema } from "@/utils/validation/admin/TeamFormValidation";
import { z } from "zod";

export type addTeamFormInput = z.infer<typeof AddTeamFormSchema>;
