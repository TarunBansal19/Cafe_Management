import { imagekit } from '../../lib/imagekit.js';
import { prisma } from '../../lib/prisma.ts'
import { uploadToImagekit, identifyItem } from "./inventory.ai.service.js";

export const listItems = async () => {
    return await prisma.inventoryItem.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};


export const createItem = async (data) => {
    return await prisma.inventoryItem.create({
        data,
    });
};

export const createItemFromImage = async(file) => {
    const imageUrl = await uploadToImagekit(file);
    const aiResponse = await identifyItem(imageUrl);
    const { name } = JSON.parse(aiResponse);

    const item = await prisma.inventoryItem.create({
        data: {
            name,
            quantity: 0,
            unit: "unit",
            imageUrl,
        },
    });

    return item;
}

export const getItem = async (id) => {
    const item = await prisma.inventoryItem.findUnique({
        where: {
            id,
        },
    });
    if (!item) {
        throw new Error("Inventory item not found");
    }
    return item;
};

export const updateItem = async (id, data) => {
    const item = await prisma.inventoryItem.findUnique({
        where: {
            id,
        },
    });
    if (!item) {
        throw new Error("Inventory item not found");
    }
    return await prisma.inventoryItem.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteItem = async (id) => {
    const item = await prisma.inventoryItem.findUnique({
        where: {
            id,
        },
    });
    if (!item) {
        throw new Error("Inventory item not found");
    }
    await prisma.inventoryItem.delete({
        where: {
            id,
        },
    });
};