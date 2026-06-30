import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { topic, count = 5 } = req.body;
    if (!topic) {
      res.status(400).json({ error: "Topic is required" });
      return;
    }

    if (!apiKey) {
      res.status(500).json({ error: "Gemini API key is not configured in the workspace settings." });
      return;
    }

    const prompt = `Generate exactly ${count} very useful and common English sentences about the topic: "${topic}".
Provide their perfect Arabic translation, approximate Arabic phonetic spelling for pronunciation, and a brief grammar or vocabulary explanation in Arabic.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert English language teacher for Arabic speakers. Your sentences must be natural, grammatically correct, and highly relevant to the specified topic.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              english: {
                type: Type.STRING,
                description: "The complete English sentence. e.g. 'How much does this cost?'"
              },
              arabic: {
                type: Type.STRING,
                description: "The natural Arabic translation of the sentence."
              },
              pronunciation: {
                type: Type.STRING,
                description: "Phonetic pronunciation spelled with Arabic letters. e.g. 'هاو ماتش دز ذيس كوست؟'"
              },
              explanation: {
                type: Type.STRING,
                description: "A short, helpful grammar or vocabulary note in Arabic. Keep it under 20 words."
              }
            },
            required: ["english", "arabic", "pronunciation", "explanation"]
          }
        }
      }
    });

    const text = response.text || "[]";
    const sentences = JSON.parse(text);

    // Give each a generated temporary unique ID
    const results = sentences.map((s: any, idx: number) => ({
      id: `ai-${Date.now()}-${idx}`,
      english: s.english,
      arabic: s.arabic,
      category: 'ai-generated',
      pronunciation: s.pronunciation,
      explanation: s.explanation
    }));

    res.status(200).json({ success: true, sentences: results });
  } catch (error: any) {
    console.error("Error generating sentences:", error);
    res.status(500).json({ error: error.message || "Failed to generate sentences" });
  }
}
