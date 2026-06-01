import * as orderService from './order.service.js'
import { createOrderSchema, updateStatusSchema } from './order.validation.js';


export const listOrders = async (_req, res, next) => {
    try {
        const orders = await orderService.listOrders();
        res.status(200).json({
            success: true,
            data: orders,
        })
    } catch (err) {
        next(err);
    }
}

export const createOrder = async (req, res, next) => {
    try {
        const validatedData = createOrderSchema.parse(req.body);
        const order = await orderService.createOrder(validatedData);

        res.status(201).json({
            success: true,
            data: order,
        });
    } catch (err) {
        next(err);
    }
};

export const getOrder = async (req, res, next) => {
    try {
        const order = await orderService.getOrder(req.params.id)
        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (err) {
        next(err);
    }
};

export const updateStatus = async (req, res, next) => {
    try {
        const { status } = updateStatusSchema.parse(req.body)
        const order = await orderService.updateStatus(req.params.id, status)
        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (err) {
        next(err);
    }
}

export const deleteOrder = async (req, res, next) => {
    try {
        await orderService.deleteOrder(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};