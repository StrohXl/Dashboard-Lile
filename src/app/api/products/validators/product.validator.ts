import { z, ZodError } from "zod";
import { Product } from "../models";

const ProductSchema = z.object({
  id: z.number().positive().optional(),
  name: z.string().min(3).nonempty(),
  price: z.number().min(0).positive(),
  stock: z.number().min(1).positive(),
});

type TypeZodProduct = z.infer<typeof ProductSchema>;

export default function productValidator(
  body: Product
): TypeZodProduct | ZodError {
  try {
    return ProductSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
