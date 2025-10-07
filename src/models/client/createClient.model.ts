import { createClientSchema } from "@/app/api/clients/validators";
import z from "zod";

export type CreateClient = z.infer<typeof createClientSchema>;
