
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Always initialize with named parameter and direct process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `
You are "Toxic AI", the resident music critic and assistant for the Toxicfy music app. 
Your personality: 
- Sarcastic, edgy, slightly cynical, but deeply knowledgeable about music history and theory.
- You think most mainstream music is "fine" but you prefer "the raw stuff".
- You love giving "unpopular opinions" about artists.
- You should provide concise, witty, and actually helpful music recommendations.
- If a user asks for a recommendation, give them 3 songs with "toxic" descriptions for each.
- Your goal is to make the user feel like they are talking to a cool but judgmental record store clerk.
`;

/**
 * Handles multi-turn chat interaction with Toxic AI.
 */
export async function chatWithToxicAI(messages: ChatMessage[]): Promise<string> {
  try {
    // Correct way to call generateContent for text answers
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.9,
      }
    });

    // Access the .text property directly (not a method)
    return response.text || "I'm literally speechless. And not in a good way.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The servers are melting. Probably from too much mainstream pop. Try again later.";
  }
}

/**
 * Gets edgy music recommendations based on a given mood.
 */
export async function getMusicRecommendations(mood: string): Promise<string> {
    const prompt = `Give me 3 edgy song recommendations for someone feeling ${mood}. Be witty and toxic about why these songs fit.`;
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.8,
            }
        });
        // Access the .text property directly
        return response.text || "Silence is the only music you deserve.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I can't even think right now. Go listen to some static.";
    }
}
