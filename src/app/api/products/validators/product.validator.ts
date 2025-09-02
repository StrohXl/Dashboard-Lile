import { z, ZodError } from "zod";
import { Product } from "../models";

export const ProductSchema = z
  .object({
    id: z.number().positive().optional(),
    name: z.string().min(3).nonempty(),
    price: z.number().min(0).positive(),
    stock: z.number().min(1).positive(),
    unit: z.union([z.literal("unit"), z.literal("kg"), z.literal("package")]),
  })
  .strict();

export type CreateProduct = z.infer<typeof ProductSchema>;

export default function productValidator(
  body: Product
): CreateProduct | ZodError {
  try {
    return ProductSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
