import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateInquiryDraft = async (
  businessName: string,
  requirements: string
): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      You are a professional business assistant for a wholesale buyer.
      Write a polite, concise, and professional wholesale inquiry email draft.
      
      Sender Business Name: ${businessName}
      Target Business: HANUMANTAY (Wholesale Hankies & Scarves)
      User Requirements/Keywords: ${requirements}
      
      The email should ask about bulk pricing, minimum order quantities (MOQ), and shipping to their location.
      Keep it under 150 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate draft. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI assistant. Please type your message manually.";
  }
};
