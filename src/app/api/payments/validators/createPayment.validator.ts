import z from "zod";

export const CreatePaymentSchema = z
  .object({
    payment_method: z.union([
      z.literal("efectivo Bs"),
      z.literal("divisa"),
      z.literal("transferencia"),
      z.literal("biopago"),
    ]),
    payment_amount: z.number().positive().min(0.1),
    operation: z.number().optional(),
    sales_id: z.number().positive(),
  })
  .strict();

export type CreatePayment = z.infer<typeof CreatePaymentSchema>;

export function createPaymentValidator(body: CreatePayment) {
  try {
    const bodyValidator = CreatePaymentSchema.parse(body);
    return bodyValidator;
  } catch (error) {
    console.error(error);
    return error;
  }
}
