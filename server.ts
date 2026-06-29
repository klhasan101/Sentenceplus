import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint 1: Generate dynamic English sentences
app.post("/api/sentences/generate", async (req: Request, res: Response) => {
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

    res.json({ success: true, sentences: results });
  } catch (error: any) {
    console.error("Error generating sentences:", error);
    res.status(500).json({ error: error.message || "Failed to generate sentences" });
  }
});

// Endpoint 2: Chat with AI English Coach
app.post("/api/coach/chat", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Messages array is required" });
      return;
    }

    if (!apiKey) {
      res.status(500).json({ error: "Gemini API key is not configured in workspace settings." });
      return;
    }

    // Format messages for @google/genai
    // Format: [{ role: "user" | "model", parts: [{ text: "..." }] }]
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: "أنت الأستاذ 'آدم'، مدرب لغة إنجليزية محترف، ودود ومشجع للغاية، تتحدث مع المتعلمين باللغة العربية. مهمتك هي تعليم اللغة الإنجليزية للمستخدم بطريقة ممتعة وتفاعلية. ساعده في تركيب الجمل، تصحيح الأخطاء الإملائية واللغوية، وشرح القواعد المعقدة ببساطة. عندما يكتب المستخدم جملة إنجليزية أو يطلب ترجمة، قدم له دائماً: 1) تصحيحاً وملاحظات، 2) النطق الصوتي التقريبي بالحروف العربية، 3) نصيحة أو عبارة إضافية متعلقة بالموضوع. استخدم نبرة مشجعة وودودة وإيجابية دوماً."
      }
    });

    res.json({ success: true, content: response.text });
  } catch (error: any) {
    console.error("Error in coach chat:", error);
    res.status(500).json({ error: error.message || "Failed to communicate with coach" });
  }
});

// Serve frontend assets
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

bootstrap();
