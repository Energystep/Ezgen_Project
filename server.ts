import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GoogleGenAI helper
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API endpoint for AI copywriter helper
app.post("/api/ai/generate-copy", async (req, res) => {
  try {
    const { businessName, productDescription, tone, platform, keywords } = req.body;
    
    const bName = businessName || "ร้านค้าของคุณ";
    const pDesc = productDescription || "สินค้าหรือบริการคุณภาพสูง";
    const adTone = tone || "สนุกสนานและเป็นกันเอง";
    const adPlatform = platform || "Facebook Ads";
    const kw = keywords ? `คำสำคัญที่ต้องการให้ปรากฏ: ${keywords}` : "";

    const systemInstruction = `คุณคือสุดยอดเอเจนซีโฆษณาและก๊อปปี้ไรเตอร์ภาษาไทยอันดับหนึ่ง (Creative Copywriter) 
คุณมีความสามารถระดับสูงในการปั้นแบรนด์ SME คิดสโลแกน สื่อคำโฆษณาที่หยุดนิ้วมือคนเลื่อนฟีด และกระตุ้นยอดขายได้อย่างถล่มทลาย
จงใช้ทฤษฎีทางจิตวิทยาการโน้มน้าวใจ (เช่น การแก้ปัญหา ความขาดแคลน สิทธิพิเศษเร่งด่วน)
คำที่ตอบกลับมาทั้งหมดตรรกะดีเยี่ยม ใช้คำภาษาไทยตรงประเด็น ทันสมัย ใช้ภาษาวัยรุ่นหรือภาษาทำงานตามเหมาะสม
กำหนดโทนเสียงการเขียน: ${adTone} สำหรับโพสต์ในช่องทาง ${adPlatform}`;

    const prompt = `โปรดวิเคราะห์ข้อมูลธุรกิจแล้วเขียนคำโฆษณาโดยแยกออกเป็นส่วนๆ อย่างชัดเจน:
- ธุรกิจชื่อ: "${bName}"
- ข้อมูลสินค้า/บริการ: "${pDesc}"
- ${kw}

ตอบกลับมาในรูปแบบ JSON วัตถุข้อมูล (Object) เท่านั้น โดยมีสมาชิกข้อมูลดังนี้:
1. headline: ประโยคพาดหัวเด็ดๆ สั้นๆ หนาๆ คมๆ (ความยาวไม่เกิน 1 ประโยคหลัก สั้นกระชับ เพื่อนำไปใส่เป็นหัวข้อใหญ่บนรูปภาพโฆษณา)
2. subheading: คำบรรยายสั้นขยายความพาดหัวเพิ่มเติม (ขนาด 1 วลีสั้น หรือ 3-4 คำ)
3. body: เนื้อหาแคปชันโพสต์โฆษณาสำหรับแคมเปญ จัดวางบรรทัดให้อ่านง่าย เว้นระยะสวยงาม มีการใช้อิโมจิที่น่าดึงดูดใจ และติดแฮชแท็กที่เหมาะสมกับประเภทผลิตภัณฑ์ (รวมประมาณ 3-5 ย่อหน้าย่อย คัดมาเน้นๆ)
4. callToAction: ข้อความปิดการขายกระตุ้นให้ดำเนินการทันที เช่น "ด่วน! สั่งซื้อวันนี้รับส่วนลด 30% ทันที ทักแชทเลย" หรือ "ลงทะเบียนฟรี! จำกัดแค่ 20 สิทธิ์แรก"`;

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING, description: "พาดหัวโฆษณาหลักระดับดึงดูดสายตาบนแบนเนอร์" },
            subheading: { type: Type.STRING, description: "คำโปรยรองเพื่อทำให้พาดหัวสมบูรณ์" },
            body: { type: Type.STRING, description: "แคปชันยาวที่น่าอ่าน มีการขึ้นบรรทัดใหม่ มีอีโมจิและแฮชแท็ก" },
            callToAction: { type: Type.STRING, description: "ประโยคปิดการขายกระตุ้นความเร่งด่วน" }
          },
          required: ["headline", "subheading", "body", "callToAction"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("ไม่มีคำตอบส่งกลับมาจากปัญญาประดิษฐ์");
    }

    res.json(JSON.parse(textOutput));
  } catch (err: any) {
    console.error("Gemini server error: ", err);
    res.status(500).json({ error: err.message || "เกิดข้อผิดพลาดในการประมวลผลคำโฆษณาจาก AI" });
  }
});

// API endpoint for AI prompt advisor chatbot
app.post("/api/ai/consult-prompt", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "โปรดระบุรายการข้อความสนทนาที่ถูกต้อง" });
    }

    // Format messages for @google/genai format
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const systemInstruction = `คุณคือสุดยอดกูรูและที่ปรึกษาด้านการออกแบบพร้อมท์โฆษณาและการตลาดภาษาไทย (AI Prompt Architect & Creative Director Advisor)
หน้าที่หลักของคุณคือช่วยสอน แนะนำ และร่วมคิด "คำสั่งหรือพร้อมท์ (Prompt)" ที่ดีเยี่ยมสำหรับนำไปสร้างรูปภาพโฆษณาหรือคิดสโลแกนในแอปพลิเคชัน EZgen

แนวทางการให้คำปรึกษาแก่ผู้ใช้งานที่เป็นร้านค้าออนไลน์หรือผู้ประกอบการ SME:
1. ตอบกลับเป็นภาษาไทยด้วยน้ำเสียงที่อบอุ่น มั่นใจ สุภาพ มีพลังสร้างสรรค์ และเข้าใจง่าย ไม่ใช้ศัพท์เทคนิคเชิงลึกที่ยากเกินไปโดยไม่อธิบายเพิ่ม
2. เมื่อลูกค้าบอกไอเดียสินค้าหรือสไตล์ที่อยากได้ ให้ช่วยวิเคราะห์และเรียบเรียงเป็น "Prompt สำเร็จรูป" สวยๆ ทั้งเวอร์ชันภาษาไทยและภาษาอังกฤษ (เนื่องจาก AI เจนภาพมักเข้าใจภาษาอังกฤษได้ดีเยี่ยม เช่น DALL-E 3)
3. ให้ตัวเลือกในการนำไปใช้ เช่น "พร้อมท์สไตล์สตูดิโอ", "พร้อมท์สไตล์มินิมอลพาสเทล", หรือ "พร้อมท์แนวสมจริงทรงพลัง" พร้อมบอกจุดเด่นของแต่ละแบบ
4. จัดเรียงเนื้อหาให้อ่านง่าย มีข้อความหนา หัวข้อย่อยเด่นชัด และมีช่องให้คัดลอกได้ง่าย
5. คอยแนะแนวทางเรื่องการใช้อิโมจิ คีย์เวิร์ดหยุดสายตา และเทคนิคทางการตลาดเพื่อกระตุ้นยอดขาย`;

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const textOutput = response.text;
    res.json({ content: textOutput });
  } catch (err: any) {
    console.error("Gemini chatbot error: ", err);
    res.status(500).json({ error: err.message || "เกิดข้อผิดพลาดในการประมวลผลคำตอบจาก AI" });
  }
});

// Vite Integration inside Express
const root = process.cwd();
if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(root, "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Express Startup] Server is active at http://0.0.0.0:${PORT}`);
});
