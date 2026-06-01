import { z } from "zod";

export const createInventorySchema = z.object({
    name: z.string().min(1),
    quantity: z.number().nonnegative(),
    unit: z.string().min(1),
});

export const updateInventorySchema = createInventorySchema.partial();