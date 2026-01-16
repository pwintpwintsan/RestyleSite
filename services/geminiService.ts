
import { GoogleGenAI, Type } from "@google/genai";
import { ScannedResult } from "../types";

export const analyzeReceipt = async (base64Image: string): Promise<ScannedResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: "Extract information from this service ticket or receipt for the fashion house 'Restyle'. Identify the service type, the total amount spent, and estimate points earned (assume 2 points per dollar). Return the data in valid JSON format.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          service: { type: Type.STRING, description: "Name of the service performed" },
          amount: { type: Type.NUMBER, description: "Total price paid" },
          points: { type: Type.NUMBER, description: "Calculated points for this visit" },
          date: { type: Type.STRING, description: "Date on the receipt" },
          storeLocation: { type: Type.STRING, description: "Location or branch name" }
        },
        required: ["service", "amount", "points", "date"]
      }
    }
  });

  try {
    const text = response.text || "{}";
    return JSON.parse(text) as ScannedResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Could not read receipt accurately. Please try again.");
  }
};
