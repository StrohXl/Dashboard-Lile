import z from "zod";

const UpdateSaleSchema = z.object({
  id_client: z.number().positive().optional(),
  payments: z
    .array(
      z.object({
        id: z.number().positive().optional(),
        payment_method: z.union([
          z.literal("efectivo Bs"),
          z.literal("divisa"),
          z.literal("transferencia"),
        ]),
        payment_amount: z.number().positive().min(0.1),
        operation: z
          .number()
          .refine((value) => {
            return value.toString().length > 3;
          })
          .positive()
          .optional(),
      })
    )
    .optional(),
}).strict();

export type UpdateSale = z.infer<typeof UpdateSaleSchema>;

export function updateBodySaleValidator(body: UpdateSale) {
  try {
    const validBody = UpdateSaleSchema.parse(body);
    return validBody;
  } catch (error) {
    return error;
  }
}
