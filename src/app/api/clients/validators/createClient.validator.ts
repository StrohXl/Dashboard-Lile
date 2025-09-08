import { z } from "zod";

const ClientSchema = z.object({
  name: z.string().nonempty().min(3),
  last_name: z.string().nonempty().min(3),
  ci: z.number().positive(),
}).strict();

export type CreateClient = z.infer<typeof ClientSchema>;

export default function createClientValidator(body: CreateClient) {
  try {
    const result = ClientSchema.parse(body);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}
