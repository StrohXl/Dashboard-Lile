import { z, ZodError } from "zod";

const ListProductSchema = z
  .array(
    z.object({
      id: z.number(),
      name: z.string().min(3).nonempty(),
      price: z.number().min(0).positive(),
      stock: z.number().min(1).positive(),
      unit: z.union([z.literal("unit"), z.literal("kg"), z.literal("package")]),
    })
  )
  .nonempty();

export type CreateListProduct = z.infer<typeof ListProductSchema>;

export default function createListProductValidator(
  body: CreateListProduct
): CreateListProduct | ZodError {
  try {
    return ListProductSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return error;
    }
    throw error;
  }
}
