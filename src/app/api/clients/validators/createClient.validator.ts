import { string, z } from "zod";

const ClientSchema = z.object({
  name: string().nonempty().min(3),
  last_name: string().nonempty().min(3),
});

export type ZodClientSchema = z.infer<typeof ClientSchema>;

export default function createClientValidator(body: ZodClientSchema) {
  try {
    const result = ClientSchema.parse(body);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}
