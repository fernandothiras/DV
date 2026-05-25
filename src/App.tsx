import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import { PROBLEMS, PLANS, INITIAL_POSTS } from "./data";
import { Post, BrandProfile } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ApiService } from "./services/api";
import {
  Sparkles,
  Calendar,
  Layers,
  Search,
  CheckCircle,
  Clock,
  Edit3,
  Copy,
  Plus,
  Trash2,
  FileText,
  Bookmark,
  ChevronLeft,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Instagram,
  Linkedin,
  Video,
  Settings,
  RefreshCw,
  Share2,
  TrendingUp,
  Award,
  Download,
  Check,
  Zap,
  HelpCircle,
  FileCode
} from "lucide-react";

export default function App() {
  // Navigation: "landing" | "app"
  const [view, setView] = useState<"landing" | "app">("landing");
  
  // Brand Profile State
  const [profile, setProfile] = useState<BrandProfile>({
    brandName: "Pura Banga Lda",
    niche: "Moda e Acessórios",
    description: "Venda de roupas exclusivas com estilo urbano de Luanda e tecidos tradicionais africanos.",
    audience: "Jovens e executivos angolanos modernos que gostam de se destacar",
    tone: "Banga Angolana / Com Gíria",
    platform: "all"
  });

  // Active Social Plan Posts - managed via custom local storage Hook
  const [posts, setPosts] = useLocalStorage<Post[]>("da_voz_posts", INITIAL_POSTS);

  // Currently selected post in workspace
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlatform, setFilterPlatform] = useState<"all" | "instagram" | "linkedin" | "tiktok">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "ready" | "scheduled">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState<number>(10);
  const [apiStatus, setApiStatus] = useState<{ checked: boolean; hasGemini: boolean; mode: string }>({
    checked: false,
    hasGemini: false,
    mode: "checking"
  });

  // Live edit values for selected post
  const [editTopic, setEditTopic] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editHook, setEditHook] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editHashtagsString, setEditHashtagsString] = useState("");
  const [editImagePrompt, setEditImagePrompt] = useState("");

  // Sync edit form on post selection
  useEffect(() => {
    if (posts.length > 0 && selectedPostIndex < posts.length) {
      const active = posts[selectedPostIndex];
      setEditTopic(active.topic);
      setEditCategory(active.category);
      setEditHook(active.hook);
      setEditBody(active.body);
      setEditHashtagsString(active.hashtags.join(", "));
      setEditImagePrompt(active.imagePrompt);
    }
  }, [selectedPostIndex, posts]);

  // Check backend server status using the ApiService
  useEffect(() => {
    ApiService.checkHealth()
      .then((data) => {
        setApiStatus({
          checked: true,
          hasGemini: data.hasGemini,
          mode: data.hasGemini ? "Gemini AI Ativa" : "Modo Simulação"
        });
      })
      .catch((err) => {
        console.error("Backend healthcheck failed:", err);
        setApiStatus({
          checked: true,
          hasGemini: false,
          mode: "Fallback Local"
        });
      });
  }, []);

  // Show automatic timed toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Switch workspace and route plan count
  const handleStartApp = (planId?: string) => {
    if (planId === "starter") {
      setGenerationCount(15);
    } else {
      setGenerationCount(30);
    }
    setView("app");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate new schedule through ApiService call
  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    triggerToast("🎙️ Gerando o seu plano estratégico pelo DA VOZ. Por favor, aguarde...");

    try {
      const data = await ApiService.generatePosts(profile, generationCount);
      if (data.success && data.posts && data.posts.length > 0) {
        // Map any generated item to default Draft state
        const formattedPosts = data.posts.map((p: any) => ({
          ...p,
          status: p.status || "draft"
        }));
        setPosts(formattedPosts);
        setSelectedPostIndex(0);
        triggerToast(`🔥 Sucesso! ${formattedPosts.length} posts criados com gíria de Angola e prontos!`);
      } else {
        throw new Error(data.error || "Formato inválido retornado pelo servidor");
      }
    } catch (err: any) {
      console.error("Failed to generate:", err);
      triggerToast("⚠️ Erro na rota do servidor. Os posts padrão de segurança foram ativados.");
    } finally {
      setLoading(false);
    }
  };

  // Save changes to current selected post
  const handleSavePostEdit = () => {
    if (posts.length === 0) return;
    const list = [...posts];
    list[selectedPostIndex] = {
      ...list[selectedPostIndex],
      topic: editTopic,
      category: editCategory,
      hook: editHook,
      body: editBody,
      hashtags: editHashtagsString.split(",").map(s => s.trim()).filter(Boolean),
      imagePrompt: editImagePrompt
    };
    setPosts(list);
    triggerToast("💾 Alterações salvas com sucesso no rascunho temporário d'Angola!");
  };

  // Update specific status of selected post
  const handleUpdateStatus = (status: "draft" | "ready" | "scheduled") => {
    if (posts.length === 0) return;
    const list = [...posts];
    list[selectedPostIndex] = {
      ...list[selectedPostIndex],
      status
    };
    setPosts(list);
    triggerToast(`📌 Post marcado como ${status === "scheduled" ? "Agendado" : status === "ready" ? "Pronto" : "Rascunho"}`);
  };

  // Copy text elements helper
  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`✨ ${label} copiado para a área de transferência!`);
  };

  // Export full strategy as JSON file
  const handleExportAsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      marca: profile,
      data_criacao: new Date().toISOString(),
      posts: posts
    }, null, 2));
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `plano_posts_da_voz_${profile.brandName.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast("📁 Download do arquivo JSON iniciado!");
  };

  // Delete individual post
  const handleDeletePost = () => {
    if (posts.length <= 1) {
      triggerToast("⚠️ Precisas de manter pelo menos um post de exemplo no painel!");
      return;
    }
    const currentDay = posts[selectedPostIndex].day;
    const updated = posts.filter((_, idx) => idx !== selectedPostIndex);
    // Re-index remaining days sequentially
    const reindexed = updated.map((p, idx) => ({
      ...p,
      day: idx + 1
    }));
    setPosts(reindexed);
    setSelectedPostIndex(Math.max(0, selectedPostIndex - 1));
    triggerToast(`🗑️ Post removido. Calendário reorganizado sequencialmente.`);
  };

  // Add a blank template post card
  const handleAddNewPost = () => {
    const nextDay = posts.length + 1;
    const newPostItem: Post = {
      day: nextDay,
      platform: "instagram",
      category: "Educacional",
      topic: "Novo Post Estratégico",
      hook: "🚀 Ei camba! Sabias que podes mudar o jogo das tuas vendas com apenas um post?",
      body: "Este é o corpo do teu novo copywriting personalizado para o mercado angolano.\n\nLembra de focar no valor real que entregas e usar a nossa banga de Luanda!\n\nDeixa um comentário com 'Sim' para participar.",
      hashtags: ["#Luanda", "#VilaClotilde", "#InovacaoAngola", "#DaVoz"],
      imagePrompt: "Imagem limpa e profissional mostrando uma xícara de café ao lado de um telemóvel exibindo notificações de vendas.",
      status: "draft"
    };
    setPosts([...posts, newPostItem]);
    setSelectedPostIndex(posts.length);
    triggerToast(`➕ Post do Dia ${nextDay} adicionado com sucesso!`);
  };

  // Reset to static baseline posts
  const handleResetToBaseline = () => {
    if (window.confirm("Queres mesmo apagar as personalizações locais e voltar aos 5 posts iniciais de demonstração?")) {
      setPosts(INITIAL_POSTS);
      setSelectedPostIndex(0);
      triggerToast("🔄 Painel redefinido para dados originais!");
    }
  };

  // Statistics calculation for SVG meters
  const totalCount = posts.length;
  const draftCount = posts.filter(p => p.status === "draft" || !p.status).length;
  const readyCount = posts.filter(p => p.status === "ready").length;
  const scheduledCount = posts.filter(p => p.status === "scheduled").length;

  const instagramCount = posts.filter(p => p.platform === "instagram").length;
  const linkedinCount = posts.filter(p => p.platform === "linkedin").length;
  const tiktokCount = posts.filter(p => p.platform === "tiktok").length;

  // Filter posts based on UI selection
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.hook.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === "all" || post.platform === filterPlatform;
    const matchesStatus = filterStatus === "all" || (post.status || "draft") === filterStatus;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  // Active item
  const activePost = posts[selectedPostIndex] || posts[0];

  if (view === "landing") {
    return <LandingPage onStartApp={handleStartApp} />;
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* GLOBAL TOAST BANNER */}
      {toastMessage && (
        <div id="toast-banner" className="fixed top-5 right-5 z-55 px-5 py-4 rounded-xl bg-slate-900 border border-amber-500 text-amber-400 shadow-2xl animate-fade-in flex items-center gap-3 font-medium max-w-sm text-sm">
          <div className="bg-amber-500/10 text-amber-500 p-1.5 rounded-full">
            <Zap className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP WORKSPACE NAVIGATION */}
      <nav className="glassy border-b border-slate-900sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView("landing")}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition font-mono uppercase cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Ver Landing Page
            </button>
            <div className="hidden sm:block text-slate-700">|</div>
            <div className="flex items-center gap-2">
              <div className="bg-amber-500 text-slate-950 p-1.5 rounded-md font-display font-extrabold text-xs">
                DV
              </div>
              <span className="font-display font-black text-lg tracking-tight text-white">
                PAINEL DA VOZ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* API Status Badge */}
            <div className="hidden md:flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-850">
              <span className={`w-2 h-2 rounded-full ${apiStatus.hasGemini ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                {apiStatus.mode}
              </span>
            </div>

            <button
              onClick={handleExportAsJson}
              className="bg-slate-900 hover:bg-slate-850 cursor-pointer text-slate-300 hover:text-white font-mono text-xs px-3.5 py-2 rounded-lg border border-slate-800 flex items-center gap-2 transition"
              title="Exportar plano para trabalhar offline"
            >
              <Download className="w-3.5 h-3.5 text-amber-500" />
              Exportar .JSON
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* UPPER SUMMARY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* PROFILE EDITOR & IA CONTROLLER */}
          <div className="lg:col-span-4 bg-slate-900/60 rounded-2xl p-6 border border-slate-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-850 pb-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-500" />
                  <h2 className="font-display font-bold text-base text-white">Marca & Avatar</h2>
                </div>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">
                  Luanda Engine V2
                </span>
              </div>

              <form onSubmit={handleGeneratePlan} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Nome do Teu Negócio</label>
                  <input
                    type="text"
                    required
                    value={profile.brandName}
                    onChange={(e) => setProfile({...profile, brandName: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-850 hover:border-slate-800 focus:border-amber-500/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Nicho de Atuação</label>
                    <input
                      type="text"
                      required
                      value={profile.niche}
                      onChange={(e) => setProfile({...profile, niche: e.target.value})}
                      className="w-full bg-slate-950/80 border border-slate-850 focus:border-amber-500/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Escolher Canal</label>
                    <select
                      value={profile.platform}
                      onChange={(e) => setProfile({...profile, platform: e.target.value as any})}
                      className="w-full bg-slate-950/80 border border-slate-850 focus:border-amber-500/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition cursor-pointer"
                    >
                      <option value="all">Misturar Todos</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Tom de Voz Angolano</label>
                  <select
                    value={profile.tone}
                    onChange={(e) => setProfile({...profile, tone: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-850 focus:border-amber-500/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition cursor-pointer"
                  >
                    <option value="Banga Angolana / Com Gíria">🔥 Banga Angolana (Com Gírias de Luanda)</option>
                    <option value="Elegante e Persuasivo">💎 Executivo Elegante e Persuasivo</option>
                    <option value="Jovem e Descontraído">⚡ Jovem Descontraído e Direto</option>
                    <option value="Formal e Corporativo">💼 Formal e Corporativo Tradicional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Descrição do Produto / Serviço</label>
                  <textarea
                    rows={2}
                    required
                    value={profile.description}
                    onChange={(e) => setProfile({...profile, description: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-850 focus:border-amber-500/60 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden transition resize-none"
                    placeholder="O que de facto tu vendes?"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Público-Alvo Específico</label>
                  <input
                    type="text"
                    required
                    value={profile.audience}
                    onChange={(e) => setProfile({...profile, audience: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-850 focus:border-amber-500/60 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden transition"
                    placeholder="Ex: cambas que vivem à volta do Talatona"
                  />
                </div>

                {/* COUNT SELECTOR */}
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-900 space-y-2 mt-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">QUANTIDADE DE POSTS</span>
                    <span className="text-amber-500 font-bold">{generationCount} Dias</span>
                  </div>
                  <input 
                    type="range" 
                    min={3} 
                    max={30} 
                    step={1}
                    value={generationCount}
                    onChange={(e) => setGenerationCount(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-600 font-mono leading-tight">
                    Starter gera 15 dias. Plano DA VOZ gera o ciclo integral de 30 dias para dominar as mentes de Luanda.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  id="submit-generate-plan"
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      O Copywriter está a pensar...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Re-gerar Calendário com IA
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Actions Footer inside card */}
            <div className="mt-4 pt-4 border-t border-slate-900/80 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1">🌐 Servidor 3000 online</span>
              <button 
                type="button" 
                onClick={handleResetToBaseline}
                className="text-slate-600 hover:text-red-400 transition underline cursor-pointer"
              >
                Limpar Memória
              </button>
            </div>
          </div>

          {/* DYNAMIC METRIC VIEW & SVG CHART */}
          <div className="lg:col-span-8 bg-slate-900/40 rounded-2xl p-6 border border-slate-900 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  <h2 className="font-display font-bold text-base text-white">Consistência e Métricas de Atividade</h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Dia 1 ao {totalCount}
                </span>
              </div>

              {/* STAT CARDS ROW */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-850 text-center">
                  <span className="text-[10px] font-mono text-slate-500 block">POSTS TOTAIS</span>
                  <span className="text-xl font-bold font-display text-white">{totalCount}</span>
                </div>
                <div className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/10 text-center">
                  <span className="text-[10px] font-mono text-amber-450 block">RASCUNHOS</span>
                  <span className="text-xl font-bold font-display text-amber-500">{draftCount}</span>
                </div>
                <div className="bg-rose-500/5 p-3 rounded-xl border border-rose-500/10 text-center">
                  <span className="text-[10px] font-mono text-rose-400 block">PRONTOS</span>
                  <span className="text-xl font-bold font-display text-slate-300">{readyCount}</span>
                </div>
                <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10 text-center">
                  <span className="text-[10px] font-mono text-emerald-450 block">AGENDADOS</span>
                  <span className="text-xl font-bold font-display text-emerald-500">{scheduledCount}</span>
                </div>
              </div>

              {/* INTEGRATED SVG CHART DISPLAYING PROPORTIONAL CHANNEL AND STATUS TRACK */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-850">
                <h4 className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-widest flex items-center justify-between">
                  <span>Balanceamento de Plataforma & Expectativa</span>
                  <span className="text-[10px] text-slate-600">Representação em Pixel Proporcional</span>
                </h4>

                <div className="group relative">
                  {/* SVG diagram representing activity spikes */}
                  <svg viewBox="0 0 500 120" className="w-full h-24 overflow-visible">
                    <defs>
                      <linearGradient id="gradient-amber" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#1e293b" strokeDasharray="3,3" />
                    <line x1="0" y1="60" x2="500" y2="60" stroke="#1e293b" strokeDasharray="3,3" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#1e293b" />

                    {/* Plot Line */}
                    <path
                      d={`M 0 90 Q 75 40 150 70 T 300 25 T 450 65 T 500 15`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Gradient Area under curve */}
                    <path
                      d={`M 0 90 Q 75 40 150 70 T 300 25 T 450 65 T 500 15 L 500 100 L 0 100 Z`}
                      fill="url(#gradient-amber)"
                    />

                    {/* Data Node Indicators with pulsing circles */}
                    <circle cx="150" cy="70" r="5" fill="#f59e0b" className="animate-pulse" />
                    <circle cx="300" cy="25" r="5" fill="#f59e0b" />
                    <circle cx="500" cy="15" r="5" fill="#f59e0b" />
                    
                    {/* SVG labels */}
                    <text x="10" y="113" fill="#64748b" className="text-[9px] font-mono">Semana 1</text>
                    <text x="160" y="113" fill="#64748b" className="text-[9px] font-mono">Semana 2</text>
                    <text x="310" y="113" fill="#64748b" className="text-[9px] font-mono">Semana 3</text>
                    <text x="440" y="113" fill="#64748b" className="text-[9px] font-mono">Post-Audit</text>
                  </svg>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-905/60 text-xs">
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 shrink-0" />
                      <span>Instagram ({instagramCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 shrink-0" />
                      <span>LinkedIn ({linkedinCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 shrink-0" />
                      <span>TikTok ({tiktokCount})</span>
                    </div>
                  </div>

                  <span className="italic text-[10px] text-slate-500 leading-none">
                    *Curva ideal de atração de leads ativos estimada para Luanda
                  </span>
                </div>
              </div>
            </div>

            {/* Premium CTA text helper */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 flex items-center justify-between text-xs mt-6">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-slate-300 font-medium">Escrevendo com gíria da praça local:</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px] font-bold">
                "Kumbu está a bater! 💸"
              </span>
            </div>
          </div>

        </div>

        {/* WORKSPACE CONTENT SHELF */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: CALENDAR SELECTOR GRID */}
          <div className="lg:col-span-4 bg-slate-900/60 rounded-2xl p-4 border border-slate-900">
            <div className="mb-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Roteiro Editorial
                </h3>
                <button
                  type="button"
                  onClick={handleAddNewPost}
                  className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-amber-500 hover:text-amber-400 px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition cursor-pointer"
                  title="Inserir um novo dia no calendário"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Novo Post
                </button>
              </div>

              {/* SEARCH BOX */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-550 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Pesquisar posts por palavra..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-850 hover:border-slate-800 focus:border-amber-500/40 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-hidden text-white transition"
                />
              </div>

              {/* FILTER TABS PLATE */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1 border-b border-slate-850 pb-2">
                  <button
                    onClick={() => setFilterPlatform("all")}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono transition uppercase cursor-pointer ${filterPlatform === "all" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400 hover:text-white"}`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFilterPlatform("instagram")}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono transition uppercase flex items-center gap-1 cursor-pointer ${filterPlatform === "instagram" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400"}`}
                  >
                    <Instagram className="w-3 h-3" />
                    IG
                  </button>
                  <button
                    onClick={() => setFilterPlatform("linkedin")}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono transition uppercase flex items-center gap-1 cursor-pointer ${filterPlatform === "linkedin" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400"}`}
                  >
                    <Linkedin className="w-3 h-3" />
                    LK
                  </button>
                  <button
                    onClick={() => setFilterPlatform("tiktok")}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono transition uppercase flex items-center gap-1 cursor-pointer ${filterPlatform === "tiktok" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400"}`}
                  >
                    <Video className="w-3 h-3" />
                    TK
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <span className="font-mono">Filtrar status:</span>
                  <button 
                    onClick={() => setFilterStatus("all")} 
                    className={`hover:text-amber-500 transition px-1 ${filterStatus === "all" ? "text-amber-500 font-bold" : ""}`}
                  >
                    Tudo
                  </button>
                  <span>∙</span>
                  <button 
                    onClick={() => setFilterStatus("draft")} 
                    className={`hover:text-amber-500 transition px-1 ${filterStatus === "draft" ? "text-amber-500 font-bold" : ""}`}
                  >
                    Rascunho
                  </button>
                  <span>∙</span>
                  <button 
                    onClick={() => setFilterStatus("ready")} 
                    className={`hover:text-amber-500 transition px-1 ${filterStatus === "ready" ? "text-amber-500 font-bold" : ""}`}
                  >
                    Pronto
                  </button>
                  <span>∙</span>
                  <button 
                    onClick={() => setFilterStatus("scheduled")} 
                    className={`hover:text-amber-500 transition px-1 ${filterStatus === "scheduled" ? "text-amber-500 font-bold" : ""}`}
                  >
                    Agendado
                  </button>
                </div>
              </div>
            </div>

            {/* SELECTION LIST */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-slate-950/40 rounded-xl border border-dashed border-slate-900">
                  <p className="text-xs text-slate-500 font-mono">Nenhum post corresponde aos filtros atuais.</p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterPlatform("all");
                      setFilterStatus("all");
                    }}
                    className="text-amber-500 text-xs mt-2 underline block mx-auto font-mono cursor-pointer"
                  >
                    Limpar Filtros
                  </button>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const originalIndex = posts.findIndex(p => p.day === post.day);
                  const isSelected = originalIndex === selectedPostIndex;
                  const st = post.status || "draft";

                  return (
                    <div
                      key={post.day}
                      id={`workspace-post-selector-${post.day}`}
                      onClick={() => setSelectedPostIndex(originalIndex)}
                      className={`p-3.5 rounded-xl border text-left transition duration-200 cursor-pointer flex items-center justify-between group ${
                        isSelected 
                          ? "bg-amber-500 text-slate-950 border-amber-500" 
                          : "bg-slate-950 hover:bg-slate-900/80 border-slate-900"
                      }`}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0 pr-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-md font-bold ${
                            isSelected ? "bg-slate-950/20 text-slate-950" : "bg-slate-900 text-slate-400"
                          }`}>
                            DIA {post.day}
                          </span>
                          
                          <span className="flex items-center">
                            {post.platform === "instagram" && <Instagram className="w-3.5 h-3.5 shrink-0" />}
                            {post.platform === "linkedin" && <Linkedin className="w-3.5 h-3.5 shrink-0" />}
                            {post.platform === "tiktok" && <Video className="w-3.5 h-3.5 shrink-0" />}
                          </span>

                          <span className={`text-[9px] font-mono px-1.5 rounded-md ${
                            st === "scheduled" 
                              ? "bg-emerald-500/20 text-emerald-500" 
                              : st === "ready" 
                                ? "bg-blue-500/20 text-blue-400" 
                                : "bg-slate-800 text-slate-400"
                          }`}>
                            {st}
                          </span>
                        </div>

                        <h4 className={`font-display font-bold text-xs truncate ${isSelected ? "text-slate-950" : "text-white"}`}>
                          {post.topic || `Post do Dia ${post.day}`}
                        </h4>
                        
                        <p className={`text-[11px] truncate ${isSelected ? "text-slate-900" : "text-slate-450"}`}>
                          {post.hook}
                        </p>
                      </div>

                      <div className="shrink-0 pl-1 opacity-60 group-hover:opacity-100 transition">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900/80 text-[11px] text-slate-500 font-mono text-center">
              A carregar de cache local para maior rapidez!
            </div>
          </div>

          {/* RIGHT VIEW AND LIVE FEED SIMULATION PREVIEW & EDIT SHELF */}
          {activePost ? (
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* EDITING FORMS INSIDE WORKSPACE */}
              <div className="md:col-span-7 bg-slate-900/60 rounded-2xl p-6 border border-slate-900 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-500" />
                    <h3 className="font-display font-bold text-base text-white">Editor de Copywriting</h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeletePost}
                    className="text-xs text-red-400 hover:text-red-300 transition flex items-center gap-1 cursor-pointer"
                    title="Remover definitivamente"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Excluir
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Título do Tema</label>
                      <input
                        type="text"
                        value={editTopic}
                        onChange={(e) => setEditTopic(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Categoria Comercial</label>
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden transition"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">A Frase Gancho (O Hook - Primeiros 3s)</label>
                      <button 
                        type="button" 
                        onClick={() => handleCopyToClipboard(editHook, "Frase Gancho")}
                        className="text-[10px] text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" /> Copiar Hook
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editHook}
                      onChange={(e) => setEditHook(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden transition font-semibold"
                    />
                    <p className="text-[9px] text-slate-600 mt-1 font-mono">
                      Deve prender o cliente enquanto ele arrasta o feed de Luanda!
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Corpo do Post (Gera conexão/venda)</label>
                      <button 
                        type="button" 
                        onClick={() => handleCopyToClipboard(editBody, "Corpo do Post")}
                        className="text-[10px] text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" /> Copiar Corpo
                      </button>
                    </div>
                    <textarea
                      rows={7}
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden transition font-sans leading-relaxed resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Hashtags (Separadas por vírgula)</label>
                    <input
                      type="text"
                      value={editHashtagsString}
                      onChange={(e) => setEditHashtagsString(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Indicação de Prompt para Arte Gráfica / Designer</label>
                    <textarea
                      rows={2}
                      value={editImagePrompt}
                      onChange={(e) => setEditImagePrompt(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/40 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden transition resize-none text-slate-400"
                    />
                  </div>
                </div>

                {/* SAVE CONTROLS & STATUS QUICK TOGGLE */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-850">
                  
                  <div className="space-y-1.5">
                    <span className="block text-[9px] font-mono text-slate-500 uppercase">MUDAR STATUS DE PROGRAMAÇÃO</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus("draft")}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                          (activePost.status || "draft") === "draft" 
                            ? "bg-slate-800 text-white font-bold" 
                            : "bg-slate-950 text-slate-450 hover:text-white"
                        }`}
                      >
                        Rascunho
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus("ready")}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                          activePost.status === "ready" 
                            ? "bg-slate-800 text-blue-400 font-bold" 
                            : "bg-slate-950 text-slate-450 hover:text-white"
                        }`}
                      >
                        Pronto
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus("scheduled")}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                          activePost.status === "scheduled" 
                            ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30" 
                            : "bg-slate-950 text-slate-450 hover:text-white"
                        }`}
                      >
                        Agendado
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSavePostEdit}
                    id="save-post-changes-btn"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 text-xs uppercase tracking-wider"
                  >
                    <Check className="w-4 h-4" />
                    Salvar Alterações
                  </button>

                </div>

              </div>

              {/* MD 5: LIVE SMARTPHONE EMULATOR SCREEN */}
              <div className="md:col-span-5 space-y-4">
                
                {/* HEAD DETAILS */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 text-xs font-mono space-y-2">
                  <span className="text-[10px] text-slate-500 block uppercase">Informações do Post</span>
                  <div className="flex justify-between text-slate-300">
                    <span>Posição Editorial:</span>
                    <span className="text-white font-bold">Dia {activePost.day}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Plataforma Alvo:</span>
                    <span className="text-amber-500 font-bold uppercase">{activePost.platform}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Estilo Linguístico:</span>
                    <span className="text-white font-bold">Angolano</span>
                  </div>
                </div>

                {/* EMULATOR BODY FRAME */}
                <div className="bg-slate-900 p-4 rounded-3xl border-4 border-slate-800 shadow-2xl relative overflow-hidden max-w-sm mx-auto">
                  
                  {/* Smartphone screen header simulation */}
                  <div className="w-32 h-4.5 bg-slate-800 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-slate-950 mr-2" />
                    <div className="w-10 h-1 bg-slate-950 rounded-full" />
                  </div>

                  <div className="pt-6 pb-2 px-1 space-y-4 relative z-10">
                    
                    {/* Simulated account profile badge */}
                    <div className="flex items-center justify-between bg-slate-950/40 p-2 rounded-xl border border-slate-850">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-display font-extrabold flex items-center justify-center text-xs">
                          {profile.brandName.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                          <h5 className="text-[11px] text-white font-extrabold leading-tight">{profile.brandName}</h5>
                          <span className="text-[9px] text-slate-500 block">Patrocinado ∙ Luanda</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-amber-500 font-bold">DA VOZ</span>
                    </div>

                    {/* Simulated Image Visual Frame */}
                    <div className="bg-slate-950 rounded-xl relative overflow-hidden border border-slate-850 aspect-square flex flex-col justify-between p-4 group">
                      
                      {/* Grid background visual design overlay */}
                      <div className="absolute inset-0 bg-radial from-slate-900 to-slate-950 z-0" />
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
                      
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="text-[10px] bg-amber-500 text-slate-950 font-mono font-bold px-2.5 py-1 rounded">
                          {activePost.category.toUpperCase()}
                        </span>
                        <span className="text-[9px] bg-slate-900/90 text-slate-450 font-mono px-2 py-1 rounded">
                          Dia {activePost.day}
                        </span>
                      </div>

                      <div className="relative z-10 my-auto text-center px-2 space-y-2">
                        <p className="font-display font-black text-sm text-white leading-tight tracking-tight drop-shadow-md">
                          "{activePost.hook}"
                        </p>
                        <p className="text-[9px] text-amber-500 font-mono tracking-wider uppercase">
                          {profile.brandName}
                        </p>
                      </div>

                      <div className="relative z-10 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-[9px] text-slate-400 font-sans backdrop-blur-xs">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold mb-0.5">Sugestão de Layout:</span>
                        <p className="italic leading-relaxed line-clamp-2">
                          {activePost.imagePrompt}
                        </p>
                      </div>

                    </div>

                    {/* Meta Interaction Bars */}
                    <div className="flex items-center justify-between text-slate-450 px-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs hover:text-white transition flex items-center gap-1">❤️ <span className="text-[10px] text-slate-500">1.2k</span></span>
                        <span className="text-xs hover:text-white transition flex items-center gap-1">💬 <span className="text-[10px] text-slate-500">45</span></span>
                        <span className="text-xs hover:text-white transition">✈️</span>
                      </div>
                      <span className="text-xs">💾</span>
                    </div>

                    {/* Interactive Text Display inside Feed */}
                    <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-850 space-y-2">
                      <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                        <strong className="text-white mr-1.5">{profile.brandName.toLowerCase().replace(/\s+/g, '')}</strong>
                        {activePost.body}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {activePost.hashtags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] text-amber-500 hover:underline">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* COPY ALL TEXT INTEGRATED ACTION */}
                <button
                  type="button"
                  onClick={() => {
                    const fullText = `${activePost.hook}\n\n${activePost.body}\n\n${activePost.hashtags.join(" ")}`;
                    handleCopyToClipboard(fullText, "Todo o texto do Post");
                  }}
                  id="copy-entire-post-payload"
                  className="w-full bg-slate-900 hover:bg-slate-850 text-white font-semibold py-3 px-4 rounded-xl border border-slate-850 hover:border-slate-800 transition flex items-center justify-center gap-2 text-xs cursor-pointer uppercase tracking-wider"
                >
                  <Copy className="w-4 h-4 text-amber-500" />
                  Copiar Todo o Conteúdo (Legenda)
                </button>

              </div>

            </div>
          ) : (
            <div className="lg:col-span-8 bg-slate-900/40 p-12 text-center rounded-2xl border border-dashed border-slate-800">
              <Calendar className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400">Nenhum post ativo selecionado no momento.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
