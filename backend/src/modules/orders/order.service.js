import { prisma } from '../../lib/prisma.ts'

const ALLOWED_TRANSITIONS = {
    PENDING: ["PREPARING"],
    PREPARING: ["DONE"],
    DONE: [],
};

export const listOrders = async () => {
    return await prisma.order.findMany({
        include: {
            items: true,
            invoice: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const createOrder = async (data) => {
    const { notes, items } = data;

    const order = await prisma.order.create({
        data: {
            notes,
            items: {
                create: items,
            },
        },
        include: {
            items: true,
        },
    });
    return order;
};

export const getOrder = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            items: true,
            invoice: true,
        },
    });
    if (!order) {
        throw new Error("Order not found");
    }

    return order;
};

export const updateStatus = async (orderId, newStatus) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });
    if (!order) {
        throw new Error("Order not found");
    }

    const allowed = ALLOWED_TRANSITIONS[order.status];

    if (!allowed.includes(newStatus)) {
        throw new Error(
            `Cannot change status from ${order.status} to ${newStatus}`
        );
    }

    return await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status: newStatus,
        },
    });
};

export const deleteOrder = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    await prisma.order.delete({
        where: {
            id: orderId
        },
    });
};
