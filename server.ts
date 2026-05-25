import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini Client initialized successfully on the server.");
  } catch (error) {
    console.error("Failed to initialize Gemini Client:", error);
  }
} else {
  console.log("GEMINI_API_KEY is not configured or uses placeholder. Running in fallback simulation mode.");
}

// ----------------------------------------------------
// API ROUTES FIRST
// ----------------------------------------------------

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGemini: !!ai,
    timestamp: new Date().toISOString(),
  });
});

// Post Copier / AI Generator Endpoint
app.post("/api/generate-posts", async (req, res) => {
  const {
    brandName = "A Minha Marca",
    niche = "E-commerce",
    description = "Venda de produtos online",
    audience = "Jovens em Luanda",
    tone = "Elegante e Persuasivo",
    platform = "instagram",
    count = 3
  } = req.body;

  // Enforce absolute limits to prevent timeouts
  const postCount = Math.min(Math.max(Number(count) || 3, 1), 10);

  // Fallback high-quality content template library in Portuguese (Angola flavor) 
  // in case API Key is missing or falls back. This keeps user experience absolutely flawless!
  const getFallbackPosts = (brand: string, nch: string, desc: string, aud: string, tn: string, plat: string, qty: number) => {
    const categories = ["Educacional", "Venda Direta", "Conexão/História", "Humor/Meme", "Dica Prática"];
    const angolanSlangs = ["banga", "bazar", "kumbu", "ndengue", "camba", "madié", "tipo assim", "está a bater", "carga", "cavalos", "tá seco"];
    
    const results = [];
    for (let i = 1; i <= qty; i++) {
      const cat = categories[(i - 1) % categories.length];
      const platType = plat === "all" ? (i % 3 === 1 ? "instagram" : i % 3 === 2 ? "linkedin" : "tiktok") : plat;
      
      let hook = "";
      let body = "";
      let hashtags = ["#davoz", "#negocios", "#luanda", "#angola"];
      let imagePrompt = `Clean aesthetic graphic with professional typography, presenting a social media post for ${brand}`;

      if (platType === "linkedin") {
        hook = `🔑 O segredo que nenhuma grande marca de ${nch} te vai contar hoje...`;
        body = `Muitos empreendedores em Angola passam noites sem dormir focados em likes. Mas a verdade é chocante: likes não pagam as contas na nossa praça.\n\nNa ${brand}, percebemos que para atingir o público-alvo (${aud}), precisas de estruturar uma comunicação com autoridade.\n\nEis 3 passos básicos:\n1. Identifica a dor exata (ex: falta de confiança no produto).\n2. Mostra um caso de sucesso local.\n3. Faz uma oferta direta e sem rodeios.\n\nO que achas desta estratégia para o teu negócio? Comenta abaixo.`;
        hashtags = ["#LinkedInAngola", `#${nch.replace(/\s+/g, "")}`, "#CopywritingPro", "#MarketingAngola"];
      } else if (platType === "tiktok") {
        hook = `🔥 POV: Tu usas o método antigo de fazer ${nch} e ficas assim...`;
        body = `[CENA INICIAL: cara de desespero a olhar para o telemóvel]\n\nSe tu ainda estás a perder tempo a criar posts sem estratégia, com certeza que o teu kumbu está a ir embora, madié! \n\nA ${brand} resolveu facilitar o jogo.\n\nPara atrair mais clientes do segmento (${aud}), para de fazer coisas genéricas. Faz isto:\n- Mostra os bastidores reais (a malta gosta de ver transparência!)\n- Revela o preço sem rodeios (nada de 'preço no privado'!)\n\nComenta 'QUERO' se precisas de um roteiro detalhado!`;
        hashtags = ["#TikTokAngola", "#Empreendedorismo_Angola", "#ParaTi", "#FypLuanda"];
      } else {
        // Instagram
        hook = `⭐️ Se queres vender mais no teu negócio de ${nch}, tens de parar de fazer isto!`;
        body = `Atenção, empreendedores de Luanda! 🇦🇴\n\nQuantas vezes já criaste um post super bonito sobre '${desc}' mas que deu ZERO vendas e ZERO comentários? É frustrante, nós sabemos.\n\nA ${brand} preparou este conteúdo especialmente para ti, que queres atingir ${aud}.\n\nO segredo está em falar diretamente com a dor do teu cliente, com aquele tom ${tn} que conecta na alma.\n\nDesliza para o lado e vê o passo a passo completo nos carrosséis! ➡️`;
        hashtags = ["#InstagramAngola", `#${brand.replace(/\s+/g, "")}`, "#VendasLuanda", "#MarketingDigital"];
      }

      results.push({
        day: i,
        platform: platType,
        category: cat,
        topic: `Post ${i} (${cat})`,
        hook,
        body,
        hashtags,
        imagePrompt
      });
    }
    return results;
  };

  if (!ai) {
    // Return mock simulation
    const fallback = getFallbackPosts(brandName, niche, description, audience, tone, platform, postCount);
    return res.json({
      success: true,
      mode: "simulation",
      posts: fallback
    });
  }

  try {
    const userPrompt = `Gere ${postCount} posts de redes sociais estratégicos e realísticos de alta conversão para a marca "${brandName}".
Detalhes da marca:
- Nicho / Ramo de Atividade: ${niche}
- Descrição da Marca / Produto: ${description}
- Público-Alvo: ${audience}
- Tom de Voz Desejado: ${tone}
- Plataforma: ${platform} (as opções podem ser "instagram", "linkedin", "tiktok" ou "all" para misturar uniformemente).

Requisitos críticos:
1. O texto do corpo ("body") deve estar em Português e refletir a realidade de Angola ( Luanda ). Se o tom sugerir gíria ou "Banga" angolana, adicione gírias locais realistas como "camba", "madié", "está a bater", "kumbu", "ndengue", "carga" de forma natural e sem fingimentos.
2. Cada post deve ser completo com um Hook atraente, o Corpo de copywriting focado em conversão e engajamento, Hashtags relevantes de Angola e do nicho, e uma indicação de prompt de imagem/vídeo descritivo para que o designer possa criar a arte.
3. Certifique-se de que os posts sejam diversificados em categorias: Educacional, Venda Direta/Produto, Conexão/História pessoal, Humorístico/Meme adaptado, Dica Curta.
4. O resultado DEVE ser uma lista em formato JSON rigorosamente estruturada conforme a especificação.`;

    const systemInstruction = `Você é o DA VOZ, o copywriter mais inteligente de Angola, especializado em criar calendários de conteúdo e posts que vendem de verdade nas redes sociais (Instagram, LinkedIn, TikTok). 
Você conhece profundamente a gíria e o português sofisticado ou popular falado em Luanda, e sabe exatamente o que faz um cliente clicar e comprar.
Você só responde em JSON válido, estruturado conforme o responseSchema fornecido. Nunca adicione explicações em linguagem natural fora do JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.INTEGER, description: "Número sequencial do dia do post." },
              platform: { type: Type.STRING, description: "Plataforma de destino: 'instagram', 'linkedin', ou 'tiktok'." },
              category: { type: Type.STRING, description: "Categoria do post (ex: Educacional, Venda, Conexão, Dica)." },
              topic: { type: Type.STRING, description: "Título curto do tema do post." },
              hook: { type: Type.STRING, description: "A frase gancho que captura a atenção nos primeiros 3 segundos." },
              body: { type: Type.STRING, description: "O corpo do texto principal do post estruturado com espaçamentos, emojis e copywriting forte." },
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array de hashtags relevantes locais (ex: #luanda, #marketing) e nichadas."
              },
              imagePrompt: { type: Type.STRING, description: "Um prompt descritivo detalhado em português para guiar a criação visual do post." }
            },
            required: ["day", "platform", "category", "topic", "hook", "body", "hashtags", "imagePrompt"]
          }
        }
      }
    });

    const responseText = response.text || "[]";
    const posts = JSON.parse(responseText);

    res.json({
      success: true,
      mode: "api",
      posts
    });
  } catch (error: any) {
    console.error("Error generating posts via Gemini API:", error);
    // Silent failover to mock data to prevent blocking
    const fallback = getFallbackPosts(brandName, niche, description, audience, tone, platform, postCount);
    res.json({
      success: true,
      mode: "fallback-after-error",
      error: error.message || "Unknown error",
      posts: fallback
    });
  }
});

// Port & Host bind and start Server with dev middleware
async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    // Import Vite dynamically on the server
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware loaded successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production files from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DA VOZ Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
