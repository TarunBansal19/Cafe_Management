import {z} from "zod";

export const createInvoiceSchema = z.object({
    taxRate: z.number().min(0),

    discountType: z.enum([
        "PERCENT",
        "FIXED"
    ]).optional(),
    
    discountValue: z.number().min(0).default(0),
})