import { createSaleSchema } from "@/app/api/sales/validators";
import z from "zod";

export type CreateSale = z.infer<typeof createSaleSchema>;
