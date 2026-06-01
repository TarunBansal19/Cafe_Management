import {z} from "zod";

export const createOrderSchema = z.object({
    notes: z.string().optional(),

    items: z.array(
        z.object({
            name: z.string().min(1),
            quantity: z.number().positive(),
            unitPrice: z.number().positive(),
        })
    ).min(1),
});

export const updateStatusSchema = z.object({
    status: z.enum([
        "PENDING",
        "PREPARING",
        "DONE",
    ]),
});