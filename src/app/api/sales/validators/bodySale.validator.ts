import { z, ZodError } from "zod";

const BodySaleSchema = z
  .object({
    client: z.object({
      id: z.number().positive(),
      name: z.string().nonempty().min(3).toLowerCase(),
      last_name: z.string().nonempty().min(3).toLowerCase(),
    }),
    list_products: z
      .array(
        z.object({
          id: z.number().positive(),
          name: z.string().nonempty().min(3),
          price: z.number().positive().min(0.1),
          stock: z.number().positive().min(1),
          unit: z.union([z.literal("unit"), z.literal("kg")]),
        })
      )
      .nonempty(),
    payments: z
      .array(
        z.object({
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
    change_manager: z
      .array(
        z.object({
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
  })
  .strict();

export type CreateSale = z.infer<typeof BodySaleSchema>;

export default function saleBodyValidator(
  body: CreateSale
): CreateSale | ZodError {
  try {
    return BodySaleSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
