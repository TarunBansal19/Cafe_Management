import * as inventoryService from './inventory.service.js';
import { createInventorySchema, updateInventorySchema } from './inventory.validation.js';

export const listItems = async (_req, res, next) => {
    try {
        const items = await inventoryService.listItems();
        res.status(200).json({
            success: true,
            data: items,
        });
    } catch (err) {
        next(err);
    }
};

export const getItem = async (req, res, next) => {
    try {
        const item = await inventoryService.getItem(req.params.id);
        res.status(200).json({
            success: true,
            data: item,
        });
    } catch (err) {
        next(err);
    }
};

export const createItem = async (req, res, next) => {
    try {
        const validatedData = createInventorySchema.parse(req.body);
        const item = await inventoryService.createItem(validatedData);
        res.status(201).json({
            success: true,
            data: item,
        });
    } catch (err) {
        next(err);
    }
};

export const createItemFromImage = async (req, res, next) => {
    try {
        const item = await inventoryService.createItemFromImage(req.file);
        res.status(201).json({
            success: true,
            data: item,
        });
    } catch (err) {
        next(err);
    }
};

export const updateItem = async (req, res, next) => {
    try {
        const validatedData = updateInventorySchema.parse(req.body);
        const item = await inventoryService.updateItem(req.params.id, validatedData);
        res.status(200).json({
            success: true,
            data: item,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteItem = async (req, res, next) => {
    try {
        await inventoryService.deleteItem(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};