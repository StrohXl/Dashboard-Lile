import { updateSaleSchema } from "@/app/api/sales/validators";
import z from "zod";

export type UpdateSale = z.infer<typeof updateSaleSchema>;
