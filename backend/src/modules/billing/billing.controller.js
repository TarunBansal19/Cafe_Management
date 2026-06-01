import * as billingService from './billing.service.js'
import { createInvoiceSchema } from './billing.validation.js';

export const getInvoice = async (req, res, next) => {
    try {
        const invoice = await billingService.getInvoice(req.params.invoiceId)
        res.status(200).json({
            success: true,
            data: invoice,
        });
    } catch (err) {
        next(err);
    }
};

export const generateInvoice = async(req, res, next) => {
    try{
        const validatedData = createInvoiceSchema.parse(req.body);
        const { orderId } = req.params;
        const invoice = await billingService.generateInvoice(orderId, validatedData)

        res.status(201).json({
            success: true,
            data: invoice,
        });
    }catch(err) {
        next(err);
    }
}