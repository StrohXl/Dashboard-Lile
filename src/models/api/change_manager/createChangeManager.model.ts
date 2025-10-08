import { createChangeSchema } from "@/app/api/change_manager/validators/createChange.validator";
import z from "zod";

export type CreateChangeManager = z.infer<typeof createChangeSchema>;

