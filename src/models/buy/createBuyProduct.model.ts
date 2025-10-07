import { createBuyProductsSchema } from "@/app/api/buys/validators/createBuy.validator";
import { z } from "zod";
export type CreateBuyProduct = z.infer<typeof createBuyProductsSchema>;
