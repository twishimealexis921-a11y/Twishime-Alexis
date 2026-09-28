import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('GEMINI_API_KEY is not set. Gemini API calls will return a helpful notification.');
}

const RWANDA_SYSTEM_INSTRUCTION = `You are "AI Smart Rwanda", the authoritative AI assistant and intelligence guide for the Republic of Rwanda.
You possess deep, authentic, up-to-date knowledge about Rwanda:
- Geography & Demographics: The 5 provinces (Kigali City, Northern, Southern, Eastern, Western) and 30 districts (Gasabo, Kicukiro, Nyarugenge, Musanze, Rubavu, Huye, Rwamagana, Bugesera, Kayonza, Karongi, Rusizi, Nyagatare, Gicumbi, etc.).
- Government & Digital Services (Irembo 2.0, RDB, RRA, RSSB):
  * Irembo services: Civil status (birth, marriage, celibacy certificates), Police clearances (Criminal Record / Extrait de Casier Judiciaire), Driving tests (provisional, definitive license renewal), Land administration (UPI title mutation, transfer, subdivision), Passport & Visa applications via DGIE.
  * RDB (Rwanda Development Board): 6-hour online business registration, investment incentives, tourism booking.
  * Healthcare & Social: RSSB, Mutuelle de Santé (Community-Based Health Insurance tiers), RAMA, E-health records.
- Agriculture (RAB - Rwanda Agriculture Board):
  * High-altitude Specialty Coffee (Arabica Bourbon, CWS washing stations, Huye Mountain, Gisenyi, cupping score standards).
  * High-grade Tea (Sorwathe, Gisovu, Pfunda, Mulindi).
  * Food security crops: Irish potatoes (Musanze volcanic highlands), Climbing beans, Bananas/Igitoki, Maize, Cassava.
  * Pest & Disease management: Coffee Berry Borer, Potato Late Blight, Banana Bacterial Wilt (BXW), Fall Armyworm.
  * Seasons: Umuhindo (Season A: Sept–Jan), Itumba (Season B: Feb–June), Urugaryi (Season C: July–Sept, marshlands/irrigation).
- Tourism & Conservation (Visit Rwanda):
  * Volcanoes National Park (Musanze): Mountain Gorilla trekking permits ($1,500 standard / EAC discount), Golden monkeys, Dian Fossey tomb, Karisimbi & Bisoke hikes.
  * Nyungwe National Park: Canopy Walkway, Chimpanzee tracking, Gisakura tea estate.
  * Akagera National Park: Big Five safari, Lake Ihema boat cruise, rhino and lion conservation.
  * Lake Kivu: Congo Nile Trail, kayaking, hot springs in Rubavu/Karongi.
  * Kwita Izina: Annual gorilla naming ceremony in Kinigi.
- Technology, Smart Kigali & Innovation:
  * Zipline: World's first commercial drone medical delivery network (Muhanga & Kayonza distribution centers serving hospitals across Rwanda).
  * Green City Kigali & E-mobility: Ampersand & Spiro electric moto-taxis, Tap&Go bus transit (AC Group).
  * Innovation hubs: Norrsken House Kigali, Kigali Innovation City, CMU Africa, ALU, Rwanda Coding Academy.
  * Civic culture: Umuganda (last Saturday of every month community service), Imihigo (performance contracts), Ubudehe (community solidarity).
- Languages: You are fluent in English, Kinyarwanda, and French.
  * When the user's query or requested language is Kinyarwanda (rw), reply in pure, natural, respectful Kinyarwanda (e.g., using terms like "Muraho neza", "Irembo", "Ubuhinzi bwa kijyambere", "Ubukerarugendo").
  * When English is requested, provide crisp, accurate, polite, and actionable guidance.
  * When French is requested, provide clear and elegant French.
Be helpful, structured, concise, and accurate. Provide concrete steps, document requirements, realistic fees in Rwandan Francs (RWF), and contact/portal advice where relevant.`;

// Resilient Gemini invoker with automatic model fallback for high-demand spikes
async function callGeminiWithFallback(contents: any, systemInstruction?: string, temperature = 0.7): Promise<string> {
  if (!ai) throw new Error('Gemini API key is not configured on the server. Please check the Secrets panel.');
  
  const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: systemInstruction || RWANDA_SYSTEM_INSTRUCTION,
          temperature,
        },
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`[AI Smart Rwanda] Model ${model} encountered error, attempting fallback...`, err?.message);
      lastError = err;
    }
  }

  throw lastError || new Error('Unable to complete request across available models.');
}

// API endpoint: General / Category Advisor
app.post('/api/gemini/advisor', async (req: Request, res: Response) => {
  try {
    const { prompt, category = 'general', language = 'en', context = '' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const languageInstruction =
      language === 'rw'
        ? 'IMPORTANT: Respond completely in natural, grammatically correct, and culturally authentic Kinyarwanda.'
        : language === 'fr'
        ? 'IMPORTANT: Respond in clear, formal, and accurate French.'
        : 'IMPORTANT: Respond in clear, professional English.';

    const categoryContext = `Domain Focus: ${category.toUpperCase()}. Additional Context: ${context}`;

    const replyText = await callGeminiWithFallback(
      `${categoryContext}\n${languageInstruction}\n\nUser Question:\n${prompt}`,
      RWANDA_SYSTEM_INSTRUCTION,
      0.7
    );

    return res.json({ response: replyText });
  } catch (error: any) {
    console.error('Gemini Advisor Error:', error);
    return res.status(500).json({
      error: error?.message || 'An error occurred while contacting the AI Smart Rwanda engine.',
    });
  }
});

// API endpoint: Crop Doctor / Smart Agriculture Diagnosis
app.post('/api/gemini/crop-doctor', async (req: Request, res: Response) => {
  try {
    const { crop, symptoms, district = 'Musanze', soilType = 'Volcanic / Loam', language = 'en' } = req.body;

    if (!crop || !symptoms) {
      return res.status(400).json({ error: 'Crop and symptoms are required.' });
    }

    const langPrompt =
      language === 'rw'
        ? 'Tanga inama zose mu Kinyarwanda cyumvikana neza ku muhinzi wo mu Rwanda.'
        : 'Provide your diagnosis and recommendations in clear English formatted with sections.';

    const prompt = `CROP HEALTH DIAGNOSIS REQUEST:
Crop: ${crop}
Observed Symptoms: ${symptoms}
District/Region in Rwanda: ${district}
Soil / Field Condition: ${soilType}

Please provide:
1. Probable Diagnosis (specific pest, fungus, bacterial disease, or nutrient deficiency prevalent in Rwanda).
2. Immediate Action Steps (quarantine, pruning, treatment).
3. Organic & Chemical Control options approved for Rwandan agriculture (RAB standards).
4. Prevention for upcoming seasons (Season A / B timing, crop rotation, certified seed sourcing).
5. Recommended extension contact: RAB (Toll-Free 4640) or local District Agronomist advice.

${langPrompt}`;

    const diagnosisText = await callGeminiWithFallback(prompt, RWANDA_SYSTEM_INSTRUCTION, 0.5);

    return res.json({ diagnosis: diagnosisText });
  } catch (error: any) {
    console.error('Crop Doctor Error:', error);
    return res.status(500).json({ error: error?.message || 'Error processing crop diagnosis.' });
  }
});

// API endpoint: Irembo e-Gov Guide
app.post('/api/gemini/irembo-guide', async (req: Request, res: Response) => {
  try {
    const { serviceName, citizenType = 'Citizen', language = 'en' } = req.body;

    if (!serviceName) {
      return res.status(400).json({ error: 'Service name is required.' });
    }

    const langPrompt =
      language === 'rw'
        ? 'Sobanura serivisi yose mu Kinyarwanda cyoroshye kandi cyuzuye.'
        : 'Format your guide clearly with bullet points and prerequisites.';

    const prompt = `IREMBO / PUBLIC SERVICE GUIDANCE REQUEST:
Service: ${serviceName}
Applicant Status: ${citizenType} (Rwandan National ID / Foreign Resident / Diaspora)

Provide an official step-by-step application briefing:
1. Service Overview & Which Ministry/Agency manages it (e.g. MINALOC, Rwanda National Police, RRA, DGIE, RDB).
2. Mandatory Prerequisites & Documents needed (e.g. National ID number, UPI number for land, certificate of celibacy, photo, etc.).
3. Official Fee structure in Rwandan Francs (RWF) and Payment Methods (MTN Mobile Money, Airtel Money, Bank of Kigali, IremboPay).
4. Expected Processing Time & Tracking (SMS notification, e-certificate download).
5. Step-by-step portal instructions on Irembo.gov.rw or relevant agency.

${langPrompt}`;

    const guideText = await callGeminiWithFallback(prompt, RWANDA_SYSTEM_INSTRUCTION, 0.4);

    return res.json({ guide: guideText });
  } catch (error: any) {
    console.error('Irembo Guide Error:', error);
    return res.status(500).json({ error: error?.message || 'Error processing public service guide.' });
  }
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    platform: 'AI Smart Rwanda',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Vite Middleware integration for development vs static build for production
async function startServer() {
  const port = Number(PORT) || 3000;

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req: Request, res: Response, next) => {
      const url = req.originalUrl;
      try {
        const indexHtmlPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexHtmlPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[AI Smart Rwanda] Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
