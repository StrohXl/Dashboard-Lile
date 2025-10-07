import { CreateClient } from "@/models/client";
import { z } from "zod";

export const createClientSchema = z
  .object({
    name: z.string().nonempty().min(3),
    last_name: z.string().nonempty().min(3),
    ci: z
      .number()
      .refine((value) => {
        return value.toString().length >= 7;
      })
      .positive(),
  })
  .strict();

export default function createClientValidator(body: CreateClient) {
  try {
    const result = createClientSchema.parse(body);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}
