/* ===================================================================
   FRZN - STORE STATE & PRODUCT REPOSITORY
   Catálogo de produtos em Português, preços em Reais (R$) e persistência
   =================================================================== */

export const PRODUCTS = [
  /* --- CATEGORIA 1: CASACOS (4 ITENS) --- */
  {
    id: 'arctic-01',
    name: 'FRZN-01 Arctic Down Parka',
    category: 'Casacos',
    drop: 'drop1',
    price: 6890,
    currency: 'R$',
    formattedPrice: 'R$ 6.890,00',
    studioImg: 'assets/images/arctic01_studio.jpg',
    lifestyleImg: 'assets/images/arctic01_lifestyle.jpg',
    detailImg: 'assets/images/arctic01_detail.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    badge: 'FLAGSHIP · EDIÇÃO LIMITADA',
    tagline: '3L GORE-TEX Pro · Pluma de Ganso 850+ · Fivelas Fidlock',
    description: 'A expressão definitiva do luxo técnico Ártico Urbano. Esculpida com acabamento metálico fosco congelado, câmaras de isolamento articuladas, fivelas duplas magnéticas Fidlock V-Buckle na cintura e retenção térmica certificada para até -40°C.',
    specs: {
      'Isolamento': 'Pluma de Ganso Ultra-Seca 850+',
      'Membrana': '3L GORE-TEX Pro Impermeável',
      'Impermeabilidade': 'Coluna d\'água de 28.000mm',
      'Ferragens': 'Fivelas Magnéticas Fidlock V-Buckle'
    }
  },
  {
    id: 'subzero-shell',
    name: 'Hardshell Alpina Sub-Zero',
    category: 'Casacos',
    drop: 'drop1',
    price: 4890,
    currency: 'R$',
    formattedPrice: 'R$ 4.890,00',
    studioImg: 'assets/images/subzero_studio.jpg',
    lifestyleImg: 'assets/images/subzero_lifestyle.jpg',
    detailImg: 'assets/images/subzero_studio.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'ALTA MONTANHA · SUB-ZERO',
    tagline: 'Costuras Seladas Ice Blue · Capuz de Tempestade · YKK AquaGuard',
    description: 'Projetada para nevascas extremas e expedições urbanas noturnas. Padrão ergonômico com fita de vedação reflexiva soldada a laser na cor azul-gelo, cotovelos pré-articulados e capuz de tempestade ajustável em 3 pontos.',
    specs: {
      'Membrana': 'Pertex Shield 3L Respirável',
      'Respirabilidade': '20.000g/m²/24h',
      'Zíperes': 'YKK AquaGuard Emborrachados',
      'Peso': '480g Ultraleve'
    }
  },
  {
    id: 'frost-anorak',
    name: 'Anorak Térmico Frost 3L',
    category: 'Casacos',
    drop: 'drop2',
    price: 5450,
    currency: 'R$',
    formattedPrice: 'R$ 5.450,00',
    studioImg: 'assets/images/anorak_studio.jpg',
    lifestyleImg: 'assets/images/anorak_lifestyle.jpg',
    detailImg: 'assets/images/anorak_studio.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'DROP 02 · EDIMOS FRZN',
    tagline: 'Gore-Tex 3L · Fecho Anorak Kanguru · Gola com Máscara',
    description: 'Anorak de corte minimalista com painel canguru de acesso rápido com ímãs de neodímo e máscara facial ajustável acoplada na gola de retenção de ar frio.',
    specs: {
      'Construção': 'Gore-Tex 3L Trino II',
      'Zíper Lateral': 'Abertura Dupla de Ventilação Direct Vent',
      'Bolso Canguru': 'Fecho Magnético Impermeável',
      'Capuz': 'Ergonômico Compatível com Capacete'
    }
  },
  {
    id: 'storm-hybrid',
    name: 'Jaqueta Híbrida Storm Alpha 3L',
    category: 'Casacos',
    drop: 'drop1',
    price: 5290,
    currency: 'R$',
    formattedPrice: 'R$ 5.290,00',
    studioImg: 'assets/images/storm_hybrid_studio.jpg',
    lifestyleImg: 'assets/images/storm_hybrid_studio.jpg',
    detailImg: 'assets/images/storm_hybrid_studio.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'EDITION OBSIDIAN · ALPHA',
    tagline: 'Polartec Alpha 3L · Costuras Ice-Blue · Fivelas Magnéticas',
    description: 'Casaco híbrido de alta resistência estrutural com fivelas torácicas magnéticas duplas e termorregulação ativa Polartec Alpha para transição climática extrema.',
    specs: {
      'Membrana': 'Polartec Alpha Direct + 3L Shell',
      'Costuras': 'Selagem Termosoldada Ice-Blue',
      'Ferragens': 'Fechos Magnéticos de Liberação Rápida',
      'Respirabilidade': '24.000g/m²/24h'
    }
  },

  /* --- CATEGORIA 2: PARKAS (4 ITENS) --- */
  {
    id: 'vortex-parka',
    name: 'Parka Técnica Vortex Down',
    category: 'Parkas',
    drop: 'drop1',
    price: 7950,
    currency: 'R$',
    formattedPrice: 'R$ 7.950,00',
    studioImg: 'assets/images/vortex_studio.jpg',
    lifestyleImg: 'assets/images/vortex_lifestyle.jpg',
    detailImg: 'assets/images/vortex_studio.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    badge: 'ESPECIFICAÇÃO EXPEDIÇÃO',
    tagline: 'Comprimento Estendido · Escudo Térmico · Aba Magnética Dupla',
    description: 'Arquitetura subterrânea para temperaturas negativas. Uma parka longa técnica em Cordura branca com painéis de reforço grafite, abas de tempestade magnéticas de acionamento rápido e preenchimento integral em pluma termorrefletora.',
    specs: {
      'Resistência': 'Certificada até -45°C Sub-Zero',
      'Tecido Externo': 'Cordura 500D Reforçada',
      'Forro': 'Mylar Prateado Termorrefletor',
      'Fechamento': 'Carcela Magnética com Trava Dupla'
    }
  },
  {
    id: 'glacier-parka',
    name: 'Parka Expedição Glacier',
    category: 'Parkas',
    drop: 'drop2',
    price: 8900,
    currency: 'R$',
    formattedPrice: 'R$ 8.900,00',
    studioImg: 'assets/images/glacier_studio.jpg',
    lifestyleImg: 'assets/images/glacier_lifestyle.jpg',
    detailImg: 'assets/images/glacier_studio.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'DROP 02 · EDIÇÃO POLAR',
    tagline: 'Cordura Polar White · Pluma 900+ Goose Down · Visor Térmico',
    description: 'Criada para expedições de longa duração em gelo continental. Casulo térmico de ultra expansão com tiras magnéticas de arnês interno para transporte mãos livres.',
    specs: {
      'Isolamento': 'Pluma de Ganso Virgem 900+ Hydrophobic',
      'Construção': 'Câmaras Baffle H-Box sem Pontes Frias',
      'Cinta Interna': 'Arnês Magnético Carry-System',
      'Pesagem': '1.100g para Condições Extremas'
    }
  },
  {
    id: 'boreal-parka',
    name: 'Parka Modular Boreal Overcoat',
    category: 'Parkas',
    drop: 'drop1',
    price: 7200,
    currency: 'R$',
    formattedPrice: 'R$ 7.200,00',
    studioImg: 'assets/images/boreal_studio.jpg',
    lifestyleImg: 'assets/images/boreal_lifestyle.jpg',
    detailImg: 'assets/images/boreal_studio.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    badge: 'CONCEITO METROPOLITANO',
    tagline: 'Silhueta Oversized · 3 Camadas Destacáveis · Grafite Metálico',
    description: 'Sobretudo longo parka modular com colete interno destacável. Permite configurações térmicas de 0°C a -30°C com fechos ultra-rápidos e bolsos revestidos em fleece.',
    specs: {
      'Modularidade': 'Sistema 3 em 1 com Colete Removível',
      'Forro Térmico': 'Fleece Polartec High-Loft Injetado',
      'Bolsos': '8 Bolsos com Revestimento Aquecido',
      'Impermeabilidade': 'Tratamento Teflon EcoElite™ DWR'
    }
  },
  {
    id: 'aurora-parka',
    name: 'Parka Ártica Aurora Pro 950+',
    category: 'Parkas',
    drop: 'drop2',
    price: 8450,
    currency: 'R$',
    formattedPrice: 'R$ 8.450,00',
    studioImg: 'assets/images/aurora_parka_studio.jpg',
    lifestyleImg: 'assets/images/aurora_parka_studio.jpg',
    detailImg: 'assets/images/aurora_parka_studio.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    badge: 'DROP 02 · EXPEDIÇÃO AURORA',
    tagline: 'Deep Midnight Navy · Pluma 950+ Goose Down · Forro Térmico Mylar',
    description: 'Desenvolvida para o frio ártico profundo da Noruega setentrional. Forro metalizado com reflexão de calor infravermelho e carcela de tempestade magnética hermética.',
    specs: {
      'Isolamento': 'Pluma de Ganso Húngaro 950+ Fill Power',
      'Retenção': 'Barreira Radiante Mylar Interior',
      'Fechamento': 'Zíper Bidirecional com Carcela Magnética',
      'Proteção Térmica': 'Certificada até -48°C'
    }
  },

  /* --- CATEGORIA 3: CALÇAS (4 ITENS) --- */
  {
    id: 'cryo-cargo',
    name: 'Calça Tática Modular Cryo',
    category: 'Calças',
    drop: 'drop1',
    price: 3190,
    currency: 'R$',
    formattedPrice: 'R$ 3.190,00',
    studioImg: 'assets/images/cargo_studio.jpg',
    lifestyleImg: 'assets/images/cargo_lifestyle.jpg',
    detailImg: 'assets/images/cargo_studio.jpg',
    sizes: ['38', '40', '42', '44', '46'],
    badge: 'TECHWEAR MODULAR',
    tagline: 'Joelhos Articulados · Tiras de Tensão Ice-Blue · Acabamento DWR',
    description: 'Criada para mobilidade urbana fluida em climas gélidos. Fabricada em tecido softshell técnico Schoeller® com elasticidade quadridirecional, bolsos cargo magnéticos e fitas de tensão ajustáveis em azul-gelo.',
    specs: {
      'Tecido': 'Schoeller® Softshell 4-Way Stretch',
      'Bolsos': 'Configuração Modular com 6 Compartimentos',
      'Tratamento': 'Repelência à Água DWR Nanotech',
      'Barra': 'Polaina Interna com Zíper Térmico'
    }
  },
  {
    id: 'tundra-pants',
    name: 'Calça Hardshell Tundra Alpina',
    category: 'Calças',
    drop: 'drop2',
    price: 3850,
    currency: 'R$',
    formattedPrice: 'R$ 3.850,00',
    studioImg: 'assets/images/tundra_studio.jpg',
    lifestyleImg: 'assets/images/tundra_lifestyle.jpg',
    detailImg: 'assets/images/tundra_studio.jpg',
    sizes: ['38', '40', '42', '44', '46'],
    badge: 'DROP 02 · HARDWARE HARDSHELL',
    tagline: 'Pertex Shield 3L · Polainas de Neve Integradas · Kevlar Reinforcement',
    description: 'Calça hardshell impermeável para travessias em neve profunda. Possui reforço de matriz de Kevlar na bainha interna contra abrasão por cãibras de neve.',
    specs: {
      'Proteção': 'Reforço de Matriz de Kevlar na Bainha',
      'Membrana': 'Pertex Shield 3L (25.000mm)',
      'Aberturas': 'Ventilação Lateral de Quadril YKK AquaGuard',
      'Cinto': 'Cinto Integrado em Nylon com Fivela Fidlock'
    }
  },
  {
    id: 'nordic-cargo',
    name: 'Calça Cargo Térmica Nordic',
    category: 'Calças',
    drop: 'drop2',
    price: 3400,
    currency: 'R$',
    formattedPrice: 'R$ 3.400,00',
    studioImg: 'assets/images/nordic_studio.jpg',
    lifestyleImg: 'assets/images/nordic_lifestyle.jpg',
    detailImg: 'assets/images/nordic_studio.jpg',
    sizes: ['38', '40', '42', '44', '46'],
    badge: 'DROP 02 · ISOLAMENTO URBANO',
    tagline: 'Fleece Interno · 8 Bolsos Magnéticos · Ajuste Micrométrico',
    description: 'Pantalona cargo tática com revestimento interno aveludado contra o vento. Silhueta cônica moderna com tiras duplas de compressão nas panturrilhas.',
    specs: {
      'Isolamento': 'Microfleece Escovado Retentor de Calor',
      'Ajuste': 'Fivelas Micrométricas nas Panturrilhas',
      'Bolsos': '8 Compartimentos Táticos Magnéticos',
      'Elasticidade': 'Softshell Flex 3D'
    }
  },
  {
    id: 'alpine-bib',
    name: 'Salopete Técnica Alpina Apex',
    category: 'Calças',
    drop: 'drop1',
    price: 4250,
    currency: 'R$',
    formattedPrice: 'R$ 4.250,00',
    studioImg: 'assets/images/alpine_bib_studio.jpg',
    lifestyleImg: 'assets/images/alpine_bib_studio.jpg',
    detailImg: 'assets/images/alpine_bib_studio.jpg',
    sizes: ['38', '40', '42', '44', '46'],
    badge: 'ALTA MONTANHA · SALOPETE',
    tagline: 'Arnês Ergonômico · Reforço Cordura · Zíperes Verticais',
    description: 'Salopete alpina impermeável de cintura alta com suspensórios magnéticos ajustáveis. Projetada para resistir à abrasão contra rochas e neve em ventos fortes.',
    specs: {
      'Construção': 'Hardshell 3L Trino com Reforço Cordura',
      'Suspensórios': 'Tiras Ajustáveis com Fecho Fidlock',
      'Zíperes': 'YKK AquaGuard de Abertura Total Lateral',
      'Impermeabilidade': '28.000mm Coluna de Água'
    }
  },

  /* --- CATEGORIA 4: ACESSÓRIOS (4 ITENS) --- */
  {
    id: 'glacial-balaclava',
    name: 'Balaclava Glacial & Goggles',
    category: 'Acessórios',
    drop: 'drop1',
    price: 1750,
    currency: 'R$',
    formattedPrice: 'R$ 1.750,00',
    studioImg: 'assets/images/balaclava_studio.jpg',
    lifestyleImg: 'assets/images/balaclava_lifestyle.jpg',
    detailImg: 'assets/images/balaclava_studio.jpg',
    sizes: ['TAMANHO ÚNICO'],
    badge: 'PROTEÇÃO ÁRTICA',
    tagline: 'Lente Magnética Polarizada · Fleece Corta-Vento · Antiembaçante',
    description: 'Blindagem facial total contra tempestades de gelo. Balaclava de compressão térmica sem costuras integrada a óculos cilíndricos de neve com fixação magnética e lentes polarizadas de alta definição.',
    specs: {
      'Lente': 'Espelhada Ice Blue Polarizada VLT 14%',
      'Ventilação': 'Portas Respiratórias Cortadas a Laser',
      'Isolamento': 'Fleece Corta-Vento Térmico Polar',
      'Ajuste': 'Fita Micrométrica de Fixação Posterior'
    }
  },
  {
    id: 'polar-gloves',
    name: 'Luvas Táticas Polar Touch',
    category: 'Acessórios',
    drop: 'drop2',
    price: 1450,
    currency: 'R$',
    formattedPrice: 'R$ 1.450,00',
    studioImg: 'assets/images/gloves_studio.jpg',
    lifestyleImg: 'assets/images/gloves_lifestyle.jpg',
    detailImg: 'assets/images/gloves_studio.jpg',
    sizes: ['P', 'M', 'G'],
    badge: 'DROP 02 · TECNOLOGIA POLAR',
    tagline: 'Gore-Tex Warm · Conectividade Touchscreen · Palma Grip Emborrachada',
    description: 'Luvas técnicas impermeáveis com tecnologia Gore-Tex Warm. Palma antideslizante em borracha moldada e condutividade capacitiva em todos os dedos para operação de telas sensíveis ao toque em sub-zero.',
    specs: {
      'Membrana': 'Gore-Tex Warm Isolada',
      'Grip': 'Borracha Texturizada de Alta Aderência',
      'Touchscreen': 'Fios de Prata Condutivos nos Dedos',
      'Punho': 'Fecho com Fivela Magnética Rápida'
    }
  },
  {
    id: 'arctic-backpack',
    name: 'Mochila Tática Ártica 45L',
    category: 'Acessórios',
    drop: 'drop1',
    price: 2890,
    currency: 'R$',
    formattedPrice: 'R$ 2.890,00',
    studioImg: 'assets/images/backpack_studio.jpg',
    lifestyleImg: 'assets/images/backpack_lifestyle.jpg',
    detailImg: 'assets/images/backpack_studio.jpg',
    sizes: ['45L'],
    badge: 'EQUIPAMENTO DE TRANSPORTE',
    tagline: 'Lona TPU Hermética · Roll-Top Magnético · Compartimento Notebook',
    description: 'Mochila tática polar 100% estanque e submergível. Fechamento Roll-Top magnético Fidlock, zíperes soldados por alta frequência e arnês ergonômico acolchoado em malha 3D.',
    specs: {
      'Capacidade': '45 Litros Expansível',
      'Impermeabilidade': 'Certificação IPX7 Estanque',
      'Material': 'Lona TPU Cordura 840D',
      'Compartimento': 'Case Térmico para Laptop de 16"'
    }
  },
  {
    id: 'ice-goggles',
    name: 'Óculos Glacial Storm Pro Goggles',
    category: 'Acessórios',
    drop: 'drop2',
    price: 2190,
    currency: 'R$',
    formattedPrice: 'R$ 2.190,00',
    studioImg: 'assets/images/goggles_pro_studio.jpg',
    lifestyleImg: 'assets/images/goggles_pro_studio.jpg',
    detailImg: 'assets/images/goggles_pro_studio.jpg',
    sizes: ['TAMANHO ÚNICO'],
    badge: 'DROP 02 · ÓPTICA GLACIAL',
    tagline: 'Lente Cilíndrica Magnética · Tratamento Polarizado VLT 12% · Tira Jacquard',
    description: 'Óculos técnicos de nevasca com troca magnética instantânea de lente, tratamento antiembaçante permanente e tira jacquard técnica com acabamento de silicone antiderrapante.',
    specs: {
      'Lente': 'Cilíndrica Dupla Ice-Blue Polarizada UV400',
      'Troca Rápida': '8 Ímãs de Neodímio Integrados',
      'Ventilação': 'Canais de Fluxo de Ar Antiembaçante',
      'Compatibilidade': 'Ajuste Universal para Capacetes e Balaclavas'
    }
  }
];

class StoreManager {
  constructor() {
    this.cart = this.loadCart();
    this.listeners = [];
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('frzn_cart_br');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('frzn_cart_br', JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage', e);
    }
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(fn => fn(this.cart));
  }

  addToCart(productId, size = 'M', quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(
      item => item.id === productId && item.size === size
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        formattedPrice: product.formattedPrice,
        size: size,
        quantity: quantity,
        img: product.studioImg
      });
    }

    this.saveCart();
    return product;
  }

  updateQuantity(productId, size, quantity) {
    const index = this.cart.findIndex(
      item => item.id === productId && item.size === size
    );
    if (index > -1) {
      if (quantity <= 0) {
        this.cart.splice(index, 1);
      } else {
        this.cart[index].quantity = quantity;
      }
      this.saveCart();
    }
  }

  removeFromCart(productId, size) {
    this.cart = this.cart.filter(
      item => !(item.id === productId && item.size === size)
    );
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartSubtotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getFormattedSubtotal() {
    const subtotal = this.getCartSubtotal();
    return `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  getAllProducts() {
    return PRODUCTS;
  }

  getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
  }

  filterProducts(category = 'all', drop = 'all', sort = 'featured') {
    let filtered = [...PRODUCTS];

    if (category && category !== 'all') {
      filtered = filtered.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (drop && drop !== 'all') {
      filtered = filtered.filter(
        p => (p.drop || 'drop1').toLowerCase() === drop.toLowerCase()
      );
    }

    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }

  searchProducts(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }
}

export const store = new StoreManager();
