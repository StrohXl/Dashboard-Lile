import { z } from "zod";

const UpdateClientSchema = z.object({
  name: z.string().min(3),
  last_name: z.string().min(3),
});

export type UpdateClient = z.infer<typeof UpdateClientSchema>;

export default function updateClientValidator(body: UpdateClient) {
  try {
    const valid = UpdateClientSchema.parse(body);
    return valid;
  } catch (error) {
    console.error(error);
    return error;
  }
}
