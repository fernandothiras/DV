import { Problem, Testimonial, Plan, Post } from "./types";

export const PROBLEMS: Problem[] = [
  {
    title: "Acordas sem saber o que postar",
    description: "Perdes 30 minutos tentando uma ideia. Depois o post fica fraco. E ninguém engaja."
  },
  {
    title: "Gastas 4 horas por semana em conteúdo",
    description: "Pensamento, escrita, design. Tempo valioso que devias estar a gastar focando nas tuas vendas."
  },
  {
    title: "Teu Instagram cresceu 0%",
    description: "Enquanto o teu concorrente cresceu 200%, e tu continuas sem perceber qual é o grande segredo militar."
  },
  {
    title: "Posts bonitos que ninguém comenta",
    description: "Engajamento fake, puras curtidas de amigos e familiares. Leads reais: zero. Vendas fechadas: zero."
  },
  {
    title: "Agência cobra 80k e entrega lixo",
    description: "Conteúdo genérico, frio, sem alma, sem estratégia real de marketing e muito menos resultados de negócios."
  },
  {
    title: "Teu faturamento está parado",
    description: "Enquanto outros madiés vendem muito mais, com muito menos esforço e sem sofrer com bloqueio criativo."
  }
];

export const SOLUTIONS = [
  "30 posts estratégicos por mês (copie-e-cole estruturado para o teu avatar)",
  "LinkedIn que vende - posicionamento premium para atrair tomadores de decisão",
  "Instagram que cresce - ganchos virais com engajamento de alta fidelização",
  "TikTok que viraliza - roteirização de tendências prontas para converter visualizações em kumbu",
  "Português angolano REAL - copywriting autêntico de Luanda, sem traduções artificiais no Google",
  "100% automático - tu só precisas de copiar o texto e publicar, ou nós fazemos por ti",
  "Estudo de Segmento - criamos com base exata no comportamento do teu cliente local",
  "Prontidão Absoluta - um calendário editorial de posts prontos a faturar imediatamente"
];

export const TESTIMONIALS: Testimonial[] = [
  {
    author: "Maria Mboa",
    role: "E-commerce de Moda",
    text: "Estava desesperada. Meu Instagram morria. Em 30 dias com o DA VOZ: consegui 2.500 seguidores novos e 12 DMs diretas de clientes em Luanda querendo comprar. Não é exagero, isto mudou as engrenagens do meu negócio."
  },
  {
    author: "João Silva",
    role: "Coach de Negócios / Consultor",
    text: "Como consultor, eu era praticamente invisível no LinkedIn em Angola. O DA VOZ me posicionou como expert de autoridade em 60 dias. Agora recebo 5 mensagens de clientes ultracalificados por semana."
  },
  {
    author: "Ana Costa",
    role: "Gestora Digital / Agente Imobiliária",
    text: "Qualquer agência clássica me cobrava 80k por mês para entregar conteúdos básicos. O DA VOZ custa apenas 6.500 Kz e é infinitamente superior na escrita e resultado prático de engajamento."
  }
];

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "STARTER",
    price: "4.000 Kz",
    subtitle: "Se só queres testar",
    features: [
      "15 posts por mês",
      "LinkedIn + Instagram",
      "Calendário de ideias editorial",
      "Copywriting com ganchos fortes",
      "Visualização interativa clássica",
      "Suporte via e-mail corporativo"
    ]
  },
  {
    id: "davoz",
    name: "DA VOZ",
    price: "6.500 Kz",
    subtitle: "Se queres crescer de verdade",
    features: [
      "30 posts completos por mês",
      "Instagram, LinkedIn e TikTok",
      "Geração rápida assistida por IA inteligente",
      "Acesso ao agendador automático visual",
      "Suporte humanizado via WhatsApp",
      "3 templates editáveis no Canva Grátis",
      "2 roteiros detalhados para vídeos curtos"
    ],
    badge: "MAIS VENDIDO"
  },
  {
    id: "mastermind",
    name: "MASTERMIND",
    price: "9.000 Kz",
    subtitle: "Se este é o teu negócio principal",
    features: [
      "30 posts Premium e personalizados",
      "Todas as redes sociais inclusas",
      "Vídeos curtos 100% roteirizados",
      "Chamada de mentoria mensal de 1 hora",
      "Análise profunda de performance quinzenal",
      "Suporte prioritário via WhatsApp ilimitado"
    ]
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    day: 1,
    platform: "instagram",
    category: "Educacional",
    topic: "Mito vs Realidade do Negócio",
    hook: "❌ 'Se o meu produto for bom, ele vende sozinho!' Pensas mesmo assim?",
    body: "Muitos madiés pensam exatamente isso e depois choram quando as vendas estão secas.\n\nA verdade que dói na alma: sem uma presença viva nas redes, até o melhor bolo de Luanda estraga no armário.\n\nTens de dar voz ao teu negócio hoje! Mostra os bastidores, explica o valor do teu produto e põe uma chamada para ação clara. Pare de ser tímido com as tuas criações.\n\nGostarias de ter um calendário que faz esse trabalho pesado por ti?",
    hashtags: ["#LuandaNegocios", "#EmpreenderAngola", "#DaVoz", "#CopyAngolano"],
    imagePrompt: "Uso de cores contrastantes (azul marinho e laranja quente) com o texto principal dividido em grid comparativo 'Mito' riscado e 'Realidade' destacado.",
    status: "scheduled"
  },
  {
    day: 2,
    platform: "linkedin",
    category: "Venda Direta",
    topic: "Apresentação de Solução Premium",
    hook: "💼 Como poupar 16 horas mensais na gestão de marca e vender 3x mais?",
    body: "Delegar a criação de conteúdo não deve custar o orçamento total de um departamento de marketing tradicional.\n\nA maioria das agências quer te prender com contratos mensais de 80.000 Kz para posts genéricos e sem foco.\n\nA nossa solução foca puramente em copywriting de conversão estruturado para posicionar startups e marcas líderes. Sem enrolação e direto ao ponto.\n\nFale connosco hoje e garanta o seu plano estratégico trimestral.",
    hashtags: ["#PosicionamentoExecutivo", "#LinkedInAngola", "#MarketingB2B"],
    imagePrompt: "Imagem minimalista em escala de cinzas de um escritório moderno em Luanda, com grafismo laranja apontando para o slogan da marca.",
    status: "ready"
  },
  {
    day: 3,
    platform: "tiktok",
    category: "Dica Prática",
    topic: "Roteiro Viral de Vendas",
    hook: "🔥 Faz estes 3 passos simples antes de publicar o teu próximo vídeo!",
    body: "[COMENTÁRIO NA TELA]: Se tu publicas vídeo sem gancho, estás a deitar kumbu fora camba!\n\nAqui vai o checklist cirúrgico:\n\n1. O gancho inicial tem de ser menor que 2.5 segundos (fala da dor imediata!).\n2. Mostre o produto em ação real (sem arte estática chata).\n3. Use música de fundo viral mas abaixe o volume a 5%.\n\nSiga-nos para mais estratégias diretas de Luanda!",
    hashtags: ["#AngolaTikTok", "#MarketingDeCarga", "#DicasLuanda", "#VenderRapido"],
    imagePrompt: "Video vertical dinâmico mostrando a tela de edição de vídeo, com legendas amarelas berrantes sob fundo transparente.",
    status: "draft"
  },
  {
    day: 4,
    platform: "instagram",
    category: "Conexão",
    topic: "História de Origem",
    hook: "🥺 Do zero ao topo: Como passamos de madiés sem rumo para uma referência no mercado...",
    body: "Tudo começou numa sala escura com apenas um portátil lento e muita vontade de fazer acontecer.\n\nOuvimos muitos 'não vai dar' e 'estão a sonhar acordados'. Mas a persistência valeu cada gota de suor.\n\nAprender a posicionar a nossa marca foi a grande chave mágica que abriu as portas do mercado local. Por isso fundamos o DA VOZ: para dar poder de copywriter a qualquer negócio de Luanda.\n\nQual é a tua maior motivação hoje para não desistir?",
    hashtags: ["#MotivacaoDiaria", "#LuandaCriativa", "#EmpreendedorGuerreiro"],
    imagePrompt: "Grafismo estilo colagem combinando foto preto e branco dos fundadores com sobreposição de tipografia brilhante 'Persistência'.",
    status: "draft"
  },
  {
    day: 5,
    platform: "linkedin",
    category: "Educacional",
    topic: "Análise Profissional de Canal",
    hook: "📊 Porque é que as mensagens no privado (DM) são o teu canal de vendas mais valioso?",
    body: "Muitos executivos valorizam métricas de vaidade como curtidas na página institucional do LinkedIn.\n\nContudo, o fechamento de grandes contratos de consultoria em Angola passa sempre por uma boa conversa bilateral privada.\n\nNutrir a sua rede com posts educativos de alta qualidade qualifica o prospecto antes mesmo do primeiro clique de contacto.\n\nQuer receber o nosso blueprint de DMs magnéticas de vendas?",
    hashtags: ["#VendasCorporativas", "#LuandaConsultoria", "#NetworkingPro"],
    imagePrompt: "Gráfico linear limpo mostrando a correlação entre postagens educativas e o volume de novas mensagens comerciais recebidas.",
    status: "draft"
  }
];
