import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function consultGeminiAPI(base64Image: string): Promise<number> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "What is the numeric value shown in this image of a water or gas meter?";

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    const numericValue = parseInt(text.match(/\d+/)?.[0] || "0", 10);

    return numericValue;
  } catch (error: any) {
    console.error("Error in Gemini API:", error);
    throw new Error("Failed to process image: " + error.message);
  }
}
