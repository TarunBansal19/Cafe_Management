import { prisma } from '../../lib/prisma.ts'

export const getInvoice = async (invoiceId) => {
    const invoice = await prisma.invoice.findUnique({
        where: {
            id: invoiceId
        },
        include: {
            order: true,
        },
    });
    if (!invoice)
        throw new Error("Invoice not found");

    return invoice;
}

export const generateInvoice = async (orderId, invoiceData) => {
    const {
        taxRate,
        discountType,
        discountValue,
    } = invoiceData;

    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            items: true,
        }
    });
    if (!order) {
        throw new Error("Order not found");
    }

    const existingInvoice = await prisma.invoice.findUnique({
        where: {
            orderId,
        },
    });

    if (existingInvoice) {
        throw new Error(
            "Invoice already exists for this order"
        );
    }

    const subtotal = order.items.reduce(
        (sum, item) =>
            sum + (item.quantity * item.unitPrice)
        , 0
    );

    const tax = (subtotal * taxRate) / 100;

    let discount = 0;

    if (discountType === 'PERCENT')
        discount = (subtotal * discountValue) / 100;

    if (discountType === 'FIXED')
        discount = discountValue;

    const total = subtotal + tax - discount;

    const invoice = await prisma.invoice.create({
        data: {
            orderId,
            subtotal,
            taxRate,
            discountType,
            discountValue,
            total
        },
        include: {
            order: true
        },
    });

    return invoice;
}