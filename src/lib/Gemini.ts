import { GoogleGenerativeAI } from "@google/generative-ai";

const generativeAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const geminiModel = generativeAI.getGenerativeModel({
    model: "gemini-2.5-flash",
})

