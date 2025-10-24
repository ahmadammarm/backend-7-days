import { NextFunction, Request, Response } from "express"
import { GeminiModel } from "../lib/Gemini"

export const GeminiResult = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { prompt } = request.body;

        if (!prompt) {
            return response.status(400).json({
                success: false,
                message: "Prompt is required"
            });
        }

        const result = await GeminiModel.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        });

        const responseText = result.response.text();

        response.status(200).json({
            success: true,
            data: responseText
        });

    } catch (error: any) {
        console.error("Gemini Error:", error);
        next(error);
    }
};
