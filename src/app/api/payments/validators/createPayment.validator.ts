import z from "zod";

export const createPaymentSchema = z
  .object({
    payment_method: z.union([
      z.literal("efectivo Bs"),
      z.literal("divisa"),
      z.literal("transferencia"),
      z.literal("biopago"),
    ]),
    payment_amount: z.number().positive().min(0.1),
    operation: z
      .number()
      .refine((value) => {
        return value.toString().length >= 4;
      })
      .optional(),
    sales_id: z.number().positive(),
  })
  .strict();

export type CreatePayment = z.infer<typeof createPaymentSchema>;

export function createPaymentValidator(body: CreatePayment) {
  try {
    const bodyValidator = createPaymentSchema.parse(body);
    return bodyValidator;
  } catch (error) {
    console.error(error);
    return error;
  }
}
