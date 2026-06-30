import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

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
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Messages array is required" });
      return;
    }

    if (!apiKey) {
      res.status(500).json({ error: "Gemini API key is not configured in workspace settings." });
      return;
    }

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

    res.status(200).json({ success: true, content: response.text });
  } catch (error: any) {
    console.error("Error in coach chat:", error);
    res.status(500).json({ error: error.message || "Failed to communicate with coach" });
  }
}
