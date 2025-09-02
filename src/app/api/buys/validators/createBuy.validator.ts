import { z, ZodError } from "zod";

const BuySchema = z
  .array(
    z
      .object({
        id: z.number(),
        name: z.string().min(3).nonempty(),
        price: z.number().min(0).positive(),
        stock: z.number().min(1).positive(),
        unit: z.union([
          z.literal("unit"),
          z.literal("kg"),
          z.literal("package"),
        ]),
        selling_price: z.number().min(0.1).positive(),
      })
      .strict()
  )
  .nonempty();

export type CreateBuy = z.infer<typeof BuySchema>;

export default function createBuyValidator(
  body: CreateBuy
): CreateBuy | ZodError {
  try {
    return BuySchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
