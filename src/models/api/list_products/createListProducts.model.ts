import { createListProductSchema } from "@/app/api/list-products/validators/createListProduct.validator";
import z from "zod";

export type CreateListProduct = z.infer<typeof createListProductSchema>;
