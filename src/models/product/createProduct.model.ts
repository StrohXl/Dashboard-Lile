import { createProductSchema } from "@/app/api/products/validators/product.validator";
import z from "zod";

export type CreateProduct = z.infer<typeof createProductSchema>;
