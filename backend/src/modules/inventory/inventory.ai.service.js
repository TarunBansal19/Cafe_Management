import { imagekit } from "../../lib/imagekit.js"
import {toFile} from '@imagekit/nodejs';
import { openai } from "../../lib/openai.js";

export const uploadToImagekit = async (file) => {
    const response = await imagekit.files.upload({
        file: await toFile(file.buffer, file.originalname),
        fileName: file.originalname,
    });
    return response.url;
};

export const identifyItem = async (imageUrl) => {
    const response = await openai.responses.create({
        model: "gpt-5.5",
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: `You are an inventory assistant. Look at the image and identify the item. Return ONLY valid JSON, no explanation, no markdown.{ "name": "string" }`,
                    },
                    {
                        type: "input_image",
                        image_url: imageUrl,
                    },
                ],
            },
        ],
    });

    return response.output_text;
}