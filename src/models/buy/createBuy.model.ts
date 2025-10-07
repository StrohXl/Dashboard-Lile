import { createBuySchema } from "@/app/api/buys/validators/createBuy.validator";
import { z } from "zod";
export type CreateBuy = z.infer<typeof createBuySchema>;
