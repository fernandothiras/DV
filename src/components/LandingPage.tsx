import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { PROBLEMS, SOLUTIONS, TESTIMONIALS, PLANS } from "../data";
import { 
  Sparkles, 
  ChevronRight, 
  Check, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Megaphone,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Star,
  Users
} from "lucide-react";
import { Plan } from "../types";

interface LandingPageProps {
  onStartApp: (planId?: string) => void;
}

export default function LandingPage({ onStartApp }: LandingPageProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    negocio: "",
    segmento: "E-commerce",
    whatsapp: "+244 ",
    plano: "davoz"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ email: string; plano: string } | null>(null);

  const getReference = (plano: string, email: string) => {
    const cleanEmail = email.trim().toUpperCase();
    if (plano === "starter") {
      return `DV-STARTER-${cleanEmail}`;
    } else if (plano === "davoz") {
      return `DV-VOZ-${cleanEmail}`;
    } else if (plano === "mastermind") {
      return `DV-MASTER-${cleanEmail}`;
    }
    return `DV-${plano.toUpperCase()}-${cleanEmail}`;
  };

  const handleCopyReference = () => {
    if (!submittedData) return;
    const refText = getReference(submittedData.plano, submittedData.email);
    navigator.clipboard.writeText(refText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleScrollToForm = (planId?: string) => {
    if (planId) {
      setFormData(prev => ({ ...prev, plano: planId }));
    }
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = "O Nome Completo é obrigatório.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "O Email é obrigatório.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Insira um endereço de e-mail válido.";
      }
    }

    if (!formData.negocio.trim()) {
      newErrors.negocio = "O seu Negócio/Profissão é obrigatório.";
    }

    const cleanedWhatsapp = formData.whatsapp.trim();
    if (!cleanedWhatsapp || cleanedWhatsapp === "+244") {
      newErrors.whatsapp = "O número de WhatsApp é obrigatório.";
    } else if (!cleanedWhatsapp.startsWith("+244")) {
      newErrors.whatsapp = "O WhatsApp deve conter o indicativo (+244...).";
    } else if (cleanedWhatsapp.replace(/[^0-9]/g, "").length < 6) {
      newErrors.whatsapp = "Por favor, digite um número de WhatsApp válido.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
      return;
    }

    setErrors({});
    setSubmittedData({
      email: formData.email,
      plano: formData.plano
    });
    setSuccess(true);

    // Keep the defaults but clear name, email and details
    setFormData({
      nomeCompleto: "",
      email: "",
      negocio: "",
      segmento: "E-commerce",
      whatsapp: "+244 ",
      plano: formData.plano
    });
  };

  return (
    <div className="bg-brand-white text-brand-text-main min-h-screen font-sans selection:bg-brand-orange selection:text-white">
      
      {/* HEADER & HERO */}
      <header className="relative overflow-hidden bg-brand-blue text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-brand-orange/10 to-transparent blur-3xl" />
        
        {/* Navigation Bar */}
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-brand-orange text-white p-2 rounded-lg font-display font-extrabold text-xl tracking-tight leading-none shadow-lg shadow-brand-orange/10">
              DV
            </div>
            <span className="font-display font-black text-2xl tracking-tighter text-white">
              DA VOZ
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleScrollToForm("davoz")}
              id="nav-cta-btn"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white font-bold px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:shadow-brand-orange/20 transition-all text-sm flex items-center gap-1.5 cursor-pointer"
            >
              Criar Post Grátis
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Body */}
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-white/10 border border-brand-white/15 rounded-full px-4 py-1.5 mb-8 text-xs font-mono tracking-widest text-brand-orange uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            O Futuro das Tuas Redes Sociais
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-5xl md:text-7xl tracking-tight leading-none text-white mb-6"
          >
            Dá Voz à <span className="text-brand-orange relative">Tua Marca<span className="absolute bottom-1 left-0 w-full h-1 bg-brand-orange/30 rounded-full"></span></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-orange font-display font-medium text-lg md:text-2xl mb-8 tracking-wide max-w-2xl mx-auto"
          >
            30 posts por mês que convertem. Automáticos. Sem tu pensares.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-300 font-sans text-md md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Enquanto outros perdem horas preciosas a escrever, o teu negócio cresce. Copywriting e calendário editorial estruturados com português angolano autêntico.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              id="hero-primary-cta"
              onClick={() => handleScrollToForm("davoz")}
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl shadow-brand-orange/15 hover:shadow-brand-orange/25 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              Começar Mês Gratuito
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              id="hero-secondary-cta"
              onClick={() => {
                const element = document.getElementById("pricing-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto bg-brand-white/10 hover:bg-brand-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-brand-white/15 transition cursor-pointer"
            >
              Ver Planos de Preços
            </button>
          </motion.div>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">✅ Sem cartão de crédito</span>
            <span className="flex items-center gap-1">⚡ Configura em 2 minutos</span>
            <span className="flex items-center gap-1">🔒 Cancele a qualquer momento</span>
          </div>
        </div>
      </header>

      {/* PAIN GRID / AGITA-DOR */}
      <section className="py-24 px-6 border-b border-brand-border bg-brand-bg-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase block mb-3">Reconheces estas dores?</span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-brand-text-main tracking-tight">
              A Gestão de Redes está a Roubar o Teu Tempo?
            </h2>
            <p className="text-brand-text-desc mt-4 max-w-xl mx-auto text-sm md:text-base">
              Se passares pelo menos por uma destas situações, a tua marca está atualmente a perder faturamento diário para a concorrência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROBLEMS.map((prob, idx) => (
              <motion.div
                key={idx}
                id={`problem-card-${idx}`}
                className="bg-brand-white p-6 rounded-xl border border-brand-border hover:border-brand-orange/40 transition-all duration-300 group flex flex-col justify-between shadow-xs"
                whileHover={{ y: -4 }}
              >
                <div>
                  <div className="bg-brand-orange/10 text-brand-orange p-2.5 rounded-lg w-fit mb-5">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-brand-text-main mb-2 group-hover:text-brand-orange transition-colors">
                    {prob.title}
                  </h3>
                  <p className="text-brand-text-desc text-sm leading-relaxed">
                    {prob.description}
                  </p>
                </div>
                <div className="mt-6 border-t border-brand-border pt-4 flex items-center justify-between text-xs font-mono text-brand-text-desc">
                  <span>Dor Comum #{idx + 1}</span>
                  <span className="text-brand-orange font-bold">Crítico</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOLUTION / NOSSA OFERTA */}
      <section className="py-24 px-6 border-b border-brand-border bg-brand-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-7">
              <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase block mb-3">Enquanto Tu Dormes, Teu Conteúdo Vende</span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-brand-text-main tracking-tight leading-none mb-6">
                Como Funciona o Serviço Inteligente do DA VOZ:
              </h2>
              <p className="text-brand-text-desc mb-8 leading-relaxed text-sm md:text-base">
                Criamos um funil completo de redes sociais com redação otimizada para o mercado de Luanda. Nós estruturamos e tu apenas colhes os leads.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOLUCOES_DIVIDIDAS.map((sol, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <div className="bg-brand-orange/10 rounded-full p-1 text-brand-orange mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-brand-text-desc text-sm font-medium leading-relaxed">{sol}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <button
                  id="solution-trigger-btn"
                  onClick={() => handleScrollToForm("davoz")}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 transition cursor-pointer"
                >
                  Experimentar o Criador de Copy
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Mockup Visualization Card */}
            <div className="lg:col-span-5 bg-brand-bg-light p-8 rounded-2xl border border-brand-border relative shadow-lg overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-2xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-brand-border pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center font-bold text-xs">
                      100%
                    </div>
                    <div>
                      <p className="text-xs text-brand-text-desc font-mono">Foco em Angola</p>
                      <h4 className="text-sm font-bold text-brand-text-main">Copywriting Autêntico</h4>
                    </div>
                  </div>
                  <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-brand-orange/20">
                    AUTOMÁTICO
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-brand-white p-4 rounded-xl border border-brand-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-brand-text-desc">HOOK CAPTURADOR (3s)</span>
                      <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded">Gancho</span>
                    </div>
                    <p className="text-xs font-semibold text-brand-text-main leading-relaxed">
                      "Para de vender 'preço no privado'! Estás a deitar faturamento bruto fora, madié..."
                    </p>
                  </div>

                  <div className="bg-brand-white p-4 rounded-xl border border-brand-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-brand-text-desc font-bold">CONVERSÃO DE ANGOLA</span>
                      <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded">WhatsApp</span>
                    </div>
                    <p className="text-brand-text-desc text-xs leading-relaxed">
                      "Utilizamos o dialeto real do nosso mercado de Luanda para criar conexão humana. Isso gera confiança imediata e mensagens na tua caixa com banga."
                    </p>
                  </div>
                </div>

                <div className="bg-brand-white p-3 rounded-xl flex items-center justify-between text-xs font-mono text-brand-text-desc border border-brand-border">
                  <span>🚀 Crescimento Estimado</span>
                  <span className="text-brand-orange font-bold">+200%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION / RESULTADOS */}
      <section className="py-20 px-6 bg-brand-white border-b border-brand-border">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase block mb-3">CONVERSÃO DE VERDADE</span>
          <h2 className="font-display font-extrabold text-2xl md:text-4xl text-brand-text-main mb-12">Resultados Médios dos Nossos Clientes no Mês 1</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-brand-bg-light rounded-xl border border-brand-border">
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 text-brand-orange" />
              </div>
              <p className="font-display font-extrabold text-4xl md:text-5xl text-brand-orange mb-2">+2.500</p>
              <p className="text-brand-text-main font-semibold text-sm">Seguidores Reais Qualificados</p>
              <p className="text-brand-text-desc text-xs mt-1 font-mono">Nos primeiros 30 dias de planner</p>
            </div>

            <div className="p-6 bg-brand-bg-light rounded-xl border border-brand-border">
              <div className="flex justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-brand-orange" />
              </div>
              <p className="font-display font-extrabold text-4xl md:text-5xl text-brand-orange mb-2">8x</p>
              <p className="text-brand-text-main font-semibold text-sm">Mais DMs/Leads de Vendas</p>
              <p className="text-brand-text-desc text-xs mt-1 font-mono">Público quente pronto para faturar</p>
            </div>

            <div className="p-6 bg-brand-bg-light rounded-xl border border-brand-border">
              <div className="flex justify-center mb-3">
                <Clock className="w-8 h-8 text-brand-orange" />
              </div>
              <p className="font-display font-extrabold text-4xl md:text-5xl text-brand-orange mb-2">5h</p>
              <p className="text-brand-text-main font-semibold text-sm">Guardadas por Semana</p>
              <p className="text-brand-text-desc text-xs mt-1 font-mono">Tempo livre para focar no core-biz</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLENT TESTIMONIALS */}
      <section className="py-24 px-6 border-b border-brand-border bg-brand-bg-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase block mb-3">FEEDBACK DE CARGA</span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-brand-text-main tracking-tight">O Que Dizem Nossos Clientes</h2>
            <p className="text-brand-text-desc mt-4 max-w-xl mx-auto text-sm md:text-base">
              Descubra como empreendedores, marcas e mentores de Luanda transformaram a sua rotina editorial com o DA VOZ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, i) => (
              <div 
                key={i} 
                id={`testimonial-card-${i}`}
                className="bg-brand-white p-6 rounded-xl border border-brand-border flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-1 text-brand-orange mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-brand-orange stroke-none" />
                    ))}
                  </div>
                  <p className="text-brand-text-desc text-sm leading-relaxed italic mb-6">
                    "{test.text}"
                  </p>
                </div>
                <div className="border-t border-brand-border pt-4">
                  <h4 className="text-brand-text-main font-bold text-sm">{test.author}</h4>
                  <span className="text-brand-orange font-mono text-xs">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing-section" className="py-24 px-6 bg-brand-white border-b border-brand-border">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="text-center mb-16">
            <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase block mb-3">ESCOLHE O TEU NÍVEL</span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-brand-text-main tracking-tight">O Preço Perfeito Para Ti</h2>
            <p className="text-brand-text-desc mt-4 max-w-xl mx-auto text-sm md:text-base">
              Apenas foca em crescer. Copie, cole ou automatize as tuas postagens por um valor irrisório comparado com os custos tradicionais de agências chata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PLANS.map((plan) => {
              const isDefault = plan.id === "davoz";
              return (
                <div
                  key={plan.id}
                  id={`plan-${plan.id}`}
                  className={`bg-brand-white rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                    isDefault 
                      ? "border-2 border-brand-orange shadow-xl shadow-brand-orange/10 scale-105 z-10" 
                      : "border border-brand-border hover:border-brand-orange/30"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-orange text-white font-mono font-extrabold text-[10px] tracking-widest px-4 py-1.5 rounded-full border border-brand-orange">
                      {plan.badge}
                    </span>
                  )}
                  
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-brand-text-main mb-2">{plan.name}</h3>
                    <p className="text-brand-text-desc text-xs mb-6 font-mono">{plan.subtitle}</p>
                    
                    <div className="mb-6 flex items-baseline">
                      <span className="font-display font-black text-4xl md:text-5xl text-brand-orange">{plan.price}</span>
                      <span className="text-brand-text-desc text-xs font-mono ml-1.5">/mês</span>
                    </div>

                    <div className="border-t border-brand-border my-6 pb-2" />
                    
                    <ul className="space-y-3.5 text-sm">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-brand-text-desc">
                          <Check className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <button
                      id={`buy-btn-${plan.id}`}
                      onClick={() => handleScrollToForm(plan.id)}
                      className={`w-full py-4 rounded-xl font-bold transition text-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
                        isDefault 
                          ? "bg-brand-orange hover:bg-brand-orange-hover text-white shadow-lg shadow-brand-orange/10" 
                          : "bg-brand-bg-light hover:bg-brand-border text-brand-text-main border border-brand-border"
                      }`}
                    >
                      Dá Voz ao Meu Negócio
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-brand-text-desc font-mono mt-12 bg-brand-bg-light border border-brand-border py-3.5 px-6 rounded-xl max-w-2xl mx-auto leading-relaxed">
            🚀 <strong>Oferta Especial de Lançamento:</strong> Os primeiros 5 clientes deste mês ganham assistência VIP humana sem custos adicionais.
          </p>
        </div>
      </section>

      {/* FINAL INTIMIDATIVE INTERACTIVE CTA */}
      <section className="py-24 px-6 bg-brand-blue relative overflow-hidden text-center text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-brand-orange/5 rounded-full blur-3xl" />
        <div className="max-w-2xl mx-auto relative z-10 space-y-6">
          <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase">POSSO SER DIRETO COMIGO MESMO?</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-none">
            Teu Concorrente Já Começou.
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Enquanto tu lês isto, ele está a crescer, o conteúdo dele está a vender e a lista de seguidores aumenta diariamente.
          </p>
          <div className="text-slate-400 text-sm italic font-mono max-w-md mx-auto py-2">
            "Ou continuas como estás. But let's be honest: isso está de facto a funcionar no teu negócio?"
          </div>
          
          <div className="pt-4">
            <button
              id="final-cta-btn"
              onClick={() => handleScrollToForm("davoz")}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-lg font-bold px-8 py-4.5 rounded-xl shadow-xl shadow-brand-orange/15 transition duration-300 inline-flex items-center gap-2 cursor-pointer group"
            >
              Começar Grátis com 100% Zero Risco
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-slate-400 text-xs font-mono mt-3.5">
              Sem cartão de crédito necessário. Cancele com um só clique.
            </p>
          </div>
        </div>
      </section>

      {/* INTEGRATED LEAD CAPTURE FORM */}
      <section 
        ref={formSectionRef} 
        id="lead-registration-form" 
        className="py-24 px-6 bg-[#f8f9fa] border-b border-brand-border"
      >
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase block mb-3">
              Inscrição Rápida
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#1a1a1a] tracking-tight">
              Comeca Teu Mes Gratuito Agora
            </h2>
            <p className="text-brand-text-desc mt-2 text-sm md:text-base">
              Sem cartão. Sem compromisso. Sem pegadinhas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-brand-border shadow-md">
            {success ? (
              <div className="space-y-6 text-left">
                {/* Success Message Banner */}
                <div className="text-center pb-6 border-b border-brand-border space-y-2">
                  <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#1a1a1a]">Obrigado! Vamos contactar em breve.</h3>
                  <p className="text-sm text-slate-700">
                    O teu registo foi efetuado com sucesso para o email <span className="font-semibold text-slate-900">{submittedData?.email}</span>.
                  </p>
                  <p className="text-brand-text-desc text-xs">
                    Um email de confirmação será enviado. O formulário foi limpo para nova inscrição.
                  </p>
                </div>

                {/* DADOS PARA TRANSFERÊNCIA MULTICAIXA */}
                <div className="bg-[#f8f9fa] border border-[#e0e0e0] rounded-xl p-6 text-[#1a1a1a] space-y-4">
                  <div className="border-b border-[#e0e0e0] pb-2 flex items-center gap-2">
                    <span className="text-lg">💳</span>
                    <h4 className="font-display font-extrabold text-[#1a1a1a] text-sm uppercase tracking-wide">
                      DADOS PARA TRANSFERÊNCIA MULTICAIXA
                    </h4>
                  </div>

                  <div className="space-y-3.5 text-sm">
                    {/* Plano */}
                    <div className="flex justify-between items-center py-1 border-b border-dashed border-[#e0e0e0]">
                      <span className="font-semibold text-slate-700">Plano:</span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {submittedData?.plano === "starter" ? "STARTER - 4.000 Kz" : submittedData?.plano === "davoz" ? "DA VOZ - 6.500 Kz" : "MASTERMIND - 9.000 Kz"}
                      </span>
                    </div>

                    {/* IBAN */}
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-700 block text-xs sm:text-sm">📱 IBAN:</span>
                      <div className="font-mono text-[#ff6b35] font-extrabold text-[13px] sm:text-sm tracking-wider bg-white px-3 py-2 rounded-lg border border-[#e0e0e5] select-all break-all text-center sm:text-left">
                        AO06 0040 0000 6189 7689 1017 3
                      </div>
                    </div>

                    {/* Referência */}
                    <div className="space-y-1.5">
                      <span className="font-semibold text-slate-700 block text-xs sm:text-sm">📌 Referência:</span>
                      <div className="bg-white p-3 rounded-lg border border-[#e0e0e0] space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-mono font-bold text-xs bg-[#f8f9fa] px-2 py-1 rounded text-slate-900 break-all select-all border border-slate-100">
                            {submittedData ? getReference(submittedData.plano, submittedData.email) : ""}
                          </span>
                          <span className="text-[10px] text-[#666666] self-start sm:self-auto">
                            (Exemplo: {submittedData?.plano === "starter" ? "DV-STARTER-joao@email.com" : submittedData?.plano === "davoz" ? "DV-VOZ-joao@email.com" : "DV-MASTER-joao@email.com"})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyReference}
                          className="w-full bg-[#ff6b35] hover:bg-[#e55a25] text-white font-bold py-2 px-3 rounded-lg text-xs transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span className="font-extrabold">Referência copiada! ✓</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                              <span>Copiar Referência</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Valor */}
                    <div className="flex justify-between items-center py-1 border-b border-dashed border-[#e0e0e0]">
                      <span className="font-semibold text-slate-700">💰 Valor:</span>
                      <span className="font-extrabold text-[#ff6b35] text-sm sm:text-base">
                        {submittedData?.plano === "starter" ? "4.000 Kz" : submittedData?.plano === "davoz" ? "6.500 Kz" : "9.000 Kz"}
                      </span>
                    </div>

                    {/* Multicaixa Express */}
                    <div className="flex justify-between items-center py-1 border-b border-dashed border-[#e0e0e0]">
                      <span className="font-semibold text-slate-700">🏪 Multicaixa Express:</span>
                      <span className="font-mono font-bold text-slate-900">
                        936210505
                      </span>
                    </div>

                    {/* Descrição na transferência */}
                    <div className="flex justify-between items-center py-1">
                      <span className="font-semibold text-slate-700">📝 Descrição na transferência:</span>
                      <span className="font-medium text-slate-900 bg-[#e0f2fe]/50 px-2 py-0.5 rounded font-mono text-xs">
                        {submittedData?.plano === "starter" ? '"DA VOZ - STARTER"' : submittedData?.plano === "davoz" ? '"DA VOZ - DA VOZ"' : '"DA VOZ - MASTERMIND"'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PRÓXIMOS PASSOS */}
                <div className="bg-[#f8f9fa] border border-[#e0e0e0] rounded-xl p-6 text-[#1a1a1a] space-y-4">
                  <div className="border-b border-[#e0e0e0] pb-2 flex items-center gap-2">
                    <span className="text-base">⏱️</span>
                    <h4 className="font-display font-extrabold text-[#1a1a1a] text-sm uppercase tracking-wide">
                      PRÓXIMOS PASSOS
                    </h4>
                  </div>

                  <ul className="space-y-3.5 text-xs text-slate-700 font-medium leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-sm font-semibold text-[#ff6b35]">1️⃣</span>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Transfere agora no Multicaixa</p>
                        <p className="text-[#6c757d] text-[11px]">(Online ou no balcão mais próximo)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-sm font-semibold text-[#ff6b35]">2️⃣</span>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Vamos confirmar em máximo 1 hora</p>
                        <p className="text-[#6c757d] text-[11px]">(Verifica teu email)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-sm font-semibold text-[#ff6b35]">3️⃣</span>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Tu recebes os 30 posts</p>
                        <p className="text-[#6c757d] text-[11px]">(Via email + Google Drive)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-sm font-semibold text-[#ff6b35]">4️⃣</span>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Começa a postar e vender!</p>
                      </div>
                    </li>
                  </ul>

                  <div className="border-t border-[#e0e0e0] pt-3.5 space-y-2 text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                      📞 Dúvidas?
                    </span>
                    <div className="space-y-1.5 pl-1">
                      <p className="font-semibold text-slate-800 text-xs">
                        WhatsApp: <span className="text-[#ff6b35] font-bold font-mono">+244 929976331</span>
                      </p>
                      <p className="font-semibold text-slate-800 text-xs">
                        Email: <span className="text-[#ff6b35] font-mono select-all text-[11px]">contacto.fernatech@gmail.com</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* MENSAGEM PÓS-PAGAMENTO */}
                <div className="bg-[#ff6b35]/5 border border-[#ff6b35]/15 rounded-xl p-5 text-xs space-y-3">
                  <p className="font-bold text-[#ff6b35] text-[13px] leading-snug">
                    Assim que confirmarmos o pagamento, tu recebes email com:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1a1a1a] font-semibold">
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-500 text-sm">✅</span>
                      <span>30 posts prontos</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-500 text-sm">✅</span>
                      <span>3 templates Canva</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-500 text-sm">✅</span>
                      <span>Link Google Drive</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-500 text-sm">✅</span>
                      <span>Suporte WhatsApp</span>
                    </li>
                  </ul>
                </div>

                {/* Reset button if needed to clear success and input again */}
                <div className="pt-4 border-t border-brand-border text-center">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setTimeout(() => nameInputRef.current?.focus(), 150);
                    }}
                    className="text-brand-orange hover:text-brand-orange-hover font-bold text-xs transition uppercase tracking-wider font-mono cursor-pointer"
                  >
                    ← Fazer Nova Inscrição
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome Completo */}
                <div>
                  <label htmlFor="form-fullname" className="block text-sm font-semibold text-[#1a1a1a] mb-1.5 align-left text-left">
                    Nome Completo *
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    id="form-fullname"
                    value={formData.nomeCompleto}
                    onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                    placeholder="Seu nome completo"
                    className={`w-full bg-[#ffffff] border ${errors.nomeCompleto ? 'border-red-500 focus:border-red-500' : 'border-[#e0e0e0] focus:border-[#ff6b35]'} text-[#1a1a1a] rounded-lg px-4 py-2.5 focus:outline-hidden text-sm transition`}
                  />
                  {errors.nomeCompleto && (
                    <p className="text-red-500 text-xs mt-1 text-left font-medium">{errors.nomeCompleto}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="form-email" className="block text-sm font-semibold text-[#1a1a1a] mb-1.5 align-left text-left">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exemplo@gmail.com"
                    className={`w-full bg-[#ffffff] border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#e0e0e0] focus:border-[#ff6b35]'} text-[#1a1a1a] rounded-lg px-4 py-2.5 focus:outline-hidden text-sm transition`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 text-left font-medium">{errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Negócio/Profissão */}
                  <div>
                    <label htmlFor="form-business" className="block text-sm font-semibold text-[#1a1a1a] mb-1.5 align-left text-left">
                      Negócio/Profissão *
                    </label>
                    <input
                      type="text"
                      id="form-business"
                      value={formData.negocio}
                      onChange={(e) => setFormData({ ...formData, negocio: e.target.value })}
                      placeholder="Ex: Seu Negócio"
                      className={`w-full bg-[#ffffff] border ${errors.negocio ? 'border-red-500 focus:border-red-500' : 'border-[#e0e0e0] focus:border-[#ff6b35]'} text-[#1a1a1a] rounded-lg px-4 py-2.5 focus:outline-hidden text-sm transition`}
                    />
                    {errors.negocio && (
                      <p className="text-red-500 text-xs mt-1 text-left font-medium">{errors.negocio}</p>
                    )}
                  </div>

                  {/* Segmento */}
                  <div>
                    <label htmlFor="form-segment" className="block text-sm font-semibold text-[#1a1a1a] mb-1.5 align-left text-left">
                      Segmento
                    </label>
                    <select
                      id="form-segment"
                      value={formData.segmento}
                      onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                      className="w-full bg-[#ffffff] border border-[#e0e0e0] focus:border-[#ff6b35] text-[#1a1a1a] rounded-lg px-4 py-2.5 focus:outline-hidden text-sm cursor-pointer"
                    >
                      <option value="Tech/SaaS">Tech/SaaS</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Consultoria">Consultoria</option>
                      <option value="Beleza/Wellness">Beleza/Wellness</option>
                      <option value="Serviços">Serviços</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp com código */}
                  <div>
                    <label htmlFor="form-whatsapp" className="block text-sm font-semibold text-[#1a1a1a] mb-1.5 align-left text-left">
                      WhatsApp com código *
                    </label>
                    <input
                      type="text"
                      id="form-whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+244 9..."
                      className={`w-full bg-[#ffffff] border ${errors.whatsapp ? 'border-red-500 focus:border-red-500' : 'border-[#e0e0e0] focus:border-[#ff6b35]'} text-[#1a1a1a] rounded-lg px-4 py-2.5 focus:outline-hidden text-sm transition`}
                    />
                    {errors.whatsapp && (
                      <p className="text-red-500 text-xs mt-1 text-left font-medium">{errors.whatsapp}</p>
                    )}
                  </div>

                  {/* Plano Escolhido */}
                  <div>
                    <label htmlFor="form-plan" className="block text-sm font-semibold text-[#1a1a1a] mb-1.5 align-left text-left">
                      Plano Escolhido
                    </label>
                    <select
                      id="form-plan"
                      value={formData.plano}
                      onChange={(e) => setFormData({ ...formData, plano: e.target.value })}
                      className="w-full bg-[#ffffff] border border-[#e0e0e0] focus:border-[#ff6b35] text-[#1a1a1a] rounded-lg px-4 py-2.5 focus:outline-hidden text-sm cursor-pointer"
                    >
                      <option value="starter">STARTER - 4.000 Kz</option>
                      <option value="davoz">DA VOZ - 6.500 Kz</option>
                      <option value="mastermind">MASTERMIND - 9.000 Kz</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#ff6b35] hover:bg-[#e55a25] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Comeca Agora
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-blue text-slate-400 py-16 px-6 border-t border-brand-blue">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-brand-orange text-white p-1.5 rounded-md font-display font-black text-xs">
              DV
            </div>
            <p className="font-display font-black text-white text-lg tracking-tight">
              DA VOZ
            </p>
            <span className="text-xs text-slate-450 font-mono ml-2 border-l border-brand-white/20 pl-2">
              Dá voz à tua marca
            </span>
          </div>

          <div className="text-center md:text-right text-xs space-y-1.5 text-slate-400">
            <p>&copy; 2026 DA VOZ. Estratégia de Conteúdo e Copywriting Inteligente.</p>
            <p>Criado por <strong className="text-white">Fernando Thiras</strong> | Fernatech</p>
            <p className="text-brand-orange hover:text-brand-orange-hover transition cursor-pointer font-mono">
              luanda ∙ angola 🇦🇴
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

const SOLUCOES_DIVIDIDAS = SOLUTIONS;
