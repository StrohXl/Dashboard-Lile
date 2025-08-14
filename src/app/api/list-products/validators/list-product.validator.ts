import { z, ZodError } from "zod";
import { ListProduct } from "../models";

const ListProductSchema = z.object({
  id: z.number(),
  name: z.string().min(3).nonempty(),
  price: z.number().min(0).positive(),
  stock: z.number().min(1).positive(),
  sellingPrice: z.optional(z.number().min(0.1).positive()),
});

type TypeZodProduct = z.infer<typeof ListProductSchema>;

export default function listProductValidator(
  body: ListProduct
): TypeZodProduct | ZodError {
  try {
    return ListProductSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
