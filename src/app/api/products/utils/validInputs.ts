import TypeProduct from "../type/typeProducts";
import { z, ZodError } from "zod";

const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(3).nonempty(),
  price: z.number().min(0).positive(),
  stock: z.number().min(1).positive(),
  sellingPrice: z.optional(z.number().min(1).positive()),
});

type TypeZodProduct = z.infer<typeof ProductSchema>;

export default function validInputs(
  body: TypeProduct
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
