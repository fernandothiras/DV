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
              onClick={() => onStartApp()}
              id="nav-app-btn"
              className="px-4 py-2 hover:text-brand-orange text-slate-300 font-medium transition text-sm cursor-pointer"
            >
              Entrar no Painel
            </button>
            <button 
              onClick={() => onStartApp("davoz")}
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
              onClick={() => onStartApp("davoz")}
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
                  onClick={() => onStartApp("davoz")}
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
                      onClick={() => onStartApp(plan.id)}
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
              onClick={() => onStartApp("davoz")}
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
