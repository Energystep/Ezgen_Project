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
