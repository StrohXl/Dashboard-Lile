import z, { ZodError } from "zod";

export const SchemaChange = z
  .object({
    id: z.number().optional(),
    change_method: z.union([
      z.literal("efectivo Bs"),
      z.literal("divisa"),
      z.literal("transferencia"),
    ]),
    change_amount: z.number().positive().min(0.1),
    operation: z.number().optional(),
    sale_id: z.number().positive(),
  })
  .strict();

export type CreateChangeManager = z.infer<typeof SchemaChange>;

export default function validatedChangeManager(body: CreateChangeManager) {
  try {
    return SchemaChange.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
