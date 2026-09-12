/* ===================================================================
   FRZN - STORE STATE & PRODUCT REPOSITORY
   Catálogo de produtos em Português, preços em Reais (R$) e persistência
   =================================================================== */

export const PRODUCTS = [
  {
    id: 'arctic-01',
    name: 'FRZN-01 Arctic Down Parka',
    category: 'Casacos',
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
    id: 'vortex-parka',
    name: 'Parka Técnica Vortex Down',
    category: 'Parkas',
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
    id: 'cryo-cargo',
    name: 'Calça Tática Modular Cryo',
    category: 'Calças',
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
  /* --- DROP 02: SVALBARD EXPEDITION --- */
  {
    id: 'svalbard-stealth',
    name: 'FRZN-02 Svalbard Stealth Parka',
    category: 'Parkas',
    drop: 'drop2',
    price: 8450,
    currency: 'R$',
    formattedPrice: 'R$ 8.450,00',
    studioImg: 'assets/images/vortex_studio.jpg',
    lifestyleImg: 'assets/images/vortex_lifestyle.jpg',
    detailImg: 'assets/images/vortex_studio.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'DROP 02 · EXCLUSIVO SVALBARD',
    tagline: 'Tecnologia Infravermelha Stealth · Cordura 1000D · GORE-TEX Pro',
    description: 'Desenvolvida no arquipélago de Svalbard. Escudo de proteção térmica e invisibilidade infravermelha com blindagem metálica de Cordura 1000D e capuz integrado com trava biométrica.',
    specs: {
      'Tecido Externo': 'Cordura 1000D Ultra-Resistente',
      'Blindagem': 'Barreira de Retenção Infravermelha',
      'Membrana': '3L GORE-TEX Pro 30.000mm',
      'Isolamento': 'Pluma de Ganso 900+ Fill Power'
    }
  },
  {
    id: 'polar-fleece',
    name: 'Sub-Zero Alpine Polar Fleece',
    category: 'Casacos',
    drop: 'drop2',
    price: 2980,
    currency: 'R$',
    formattedPrice: 'R$ 2.980,00',
    studioImg: 'assets/images/subzero_studio.jpg',
    lifestyleImg: 'assets/images/subzero_lifestyle.jpg',
    detailImg: 'assets/images/subzero_studio.jpg',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    badge: 'DROP 02 · CAMADA TÉRMICA',
    tagline: 'Polartec® Thermal Pro · Painéis Ripstop · Bolsos Selados',
    description: 'Segunda camada técnica de alto isolamento calor/peso. Confeccionada em Polartec® Thermal Pro com reforços de nylon Ripstop em zonas de fricção e gola de retenção de vento.',
    specs: {
      'Tecido Base': 'Polartec® Thermal Pro High-Loft',
      'Reforços': 'Nylon Ripstop 70D',
      'Retenção': 'Estrutura Alveolar de Retenção Térmica',
      'Zíperes': 'YKK® Vislon® Invertidos'
    }
  },
  {
    id: 'tactical-vest',
    name: 'Colete Tático Modular Svalbard',
    category: 'Acessórios',
    drop: 'drop2',
    price: 3650,
    currency: 'R$',
    formattedPrice: 'R$ 3.650,00',
    studioImg: 'assets/images/cargo_studio.jpg',
    lifestyleImg: 'assets/images/cargo_lifestyle.jpg',
    detailImg: 'assets/images/cargo_studio.jpg',
    sizes: ['P/M', 'G/GG'],
    badge: 'DROP 02 · MODULAR TÁTICO',
    tagline: 'Fivelas Magnéticas Fidlock® · Balaclava Acoplável · Sistema MOLLE',
    description: 'Colete tático modular acolchoado com balaclava acoplável e bolsas removíveis com fecho magnético Fidlock. Projetado para mobilidade e acesso rápido a equipamentos no ambiente polar.',
    specs: {
      'Sistema': 'MOLLE Cortado a Laser',
      'Ajuste': 'Fivelas Fidlock® V-Buckle 25mm',
      'Acessório': 'Balaclava Polar Magnética Incluída',
      'Tecido': 'Softshell DWR Quadridirecional'
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
