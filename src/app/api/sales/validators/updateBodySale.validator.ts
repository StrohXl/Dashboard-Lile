import z from "zod";

const UpdateSaleSchema = z
  .object({
    payments: z.array(
      z.object({
        id: z.number(),
        payment_method: z.union([
          z.literal("efectivo Bs"),
          z.literal("divisa"),
          z.literal("transferencia"),
        ]),
        payment_amount: z.number().positive().min(0.1),
        operation: z.number().optional(),
      })
    ),
    change_manager: z
      .array(
        z.object({
          id: z.number().optional(),
          change_method: z.union([
            z.literal("efectivo Bs"),
            z.literal("divisa"),
            z.literal("transferencia"),
          ]),
          change_amount: z.number().positive().min(0.1),
          operation: z.number().optional(),
        })
      )
      .optional(),
  })
  .strict();

export type UpdateSale = z.infer<typeof UpdateSaleSchema>;

export function updateBodySaleValidator(body: UpdateSale) {
  try {
    const validBody = UpdateSaleSchema.parse(body);
    return validBody;
  } catch (error) {
    return error;
  }
}
