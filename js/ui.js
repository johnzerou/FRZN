/* ===================================================================
   FRZN - USER INTERFACE & INTERACTIONS (EM PORTUGUÊS)
   Cart Drawer, Product Detail Modal (Entrar no Produto),
   Product Hero Switcher, Filter Reflow, Live Search & Toasts
   =================================================================== */

import { store, PRODUCTS } from './store.js';

export class UIManager {
  constructor() {
    this.selectedHeroSize = null; // FRZN2.pdf Trava de segurança: nulo por padrão
    this.modalSelectedSize = null;
    this.activeFilter = 'all';
    this.activeSort = 'featured';

    this.initElements();
    this.bindEvents();
    this.renderCart();
    this.renderProductGrids();
  }

  initElements() {
    // Drawer do carrinho
    this.cartDrawer = document.getElementById('cart-drawer');
    this.cartBackdrop = document.getElementById('cart-backdrop');
    this.cartBtn = document.getElementById('btn-header-cart');
    this.cartCloseBtn = document.getElementById('btn-close-cart');
    this.cartItemsContainer = document.getElementById('cart-items-container');
    this.cartSubtotalEl = document.getElementById('cart-subtotal-val');
    this.cartBadges = document.querySelectorAll('.cart-badge');
    this.checkoutBtn = document.getElementById('btn-checkout');

    // Modal de Detalhes do Produto (Entrar no produto)
    this.productModalBackdrop = document.getElementById('product-modal-backdrop');
    this.productModalClose = document.getElementById('btn-close-product-modal');
    this.modalMainImg = document.getElementById('modal-main-img');
    this.modalThumbsRow = document.getElementById('modal-thumbs-row');
    this.modalCategoryTag = document.getElementById('modal-category-tag');
    this.modalTitle = document.getElementById('modal-title');
    this.modalPrice = document.getElementById('modal-price');
    this.modalDesc = document.getElementById('modal-desc');
    this.modalSpecsList = document.getElementById('modal-specs-list');
    this.modalSizesRow = document.getElementById('modal-sizes-row');
    this.modalAddBtn = document.getElementById('btn-modal-add');

    // Busca
    this.searchModal = document.getElementById('search-modal');
    this.searchBtn = document.getElementById('btn-header-search');
    this.searchCloseBtn = document.getElementById('btn-close-search');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');

    // Hero Arctic 01
    this.heroMainImg = document.getElementById('hero-stage-img');
    this.heroThumbBtns = document.querySelectorAll('.thumb-btn');
    this.heroSizeBtns = document.querySelectorAll('#hero-size-options .size-btn');
    this.btnHeroAdd = document.getElementById('btn-hero-add');

    // Grids e Filtros
    this.homeGrid = document.getElementById('home-products-grid');
    this.shopGrid = document.getElementById('shop-products-grid');
    this.filterBtns = document.querySelectorAll('.filter-btn');

    // Mobile nav
    this.mobileMenuBtn = document.getElementById('btn-mobile-menu');
    this.mobileDrawer = document.getElementById('mobile-nav-drawer');
    this.mobileBackdrop = document.getElementById('mobile-nav-backdrop');

    // Newsletter forms
    this.footerNewsletterForm = document.getElementById('footer-newsletter-form');
    this.footerNewsletterInput = document.getElementById('footer-newsletter-email');
  }

  bindEvents() {
    // Inscrição nas alterações do carrinho
    store.subscribe(() => {
      this.renderCart();
    });

    // Toggle Carrinho
    if (this.cartBtn) {
      this.cartBtn.addEventListener('click', () => this.openCart());
    }
    if (this.cartCloseBtn) {
      this.cartCloseBtn.addEventListener('click', () => this.closeCart());
    }
    if (this.cartBackdrop) {
      this.cartBackdrop.addEventListener('click', () => this.closeCart());
    }

    // Modal de Detalhes do Produto
    if (this.productModalClose) {
      this.productModalClose.addEventListener('click', () => this.closeProductModal());
    }
    if (this.productModalBackdrop) {
      this.productModalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.productModalBackdrop) this.closeProductModal();
      });
    }

    // Finalizar Compra Simulado
    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => {
        if (store.getCartCount() === 0) {
          this.showToast('Sua sacola ártica está vazia.');
          return;
        }
        this.showToast('Conectando ao Checkout Criptografado FRZN...');
        setTimeout(() => {
          this.showToast('Pedido confirmado com sucesso! Rastreamento de envio gerado.');
          store.clearCart();
          this.closeCart();
        }, 1400);
      });
    }

    // Toggle Busca
    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', () => this.openSearch());
    }
    if (this.searchCloseBtn) {
      this.searchCloseBtn.addEventListener('click', () => this.closeSearch());
    }
    if (this.searchModal) {
      this.searchModal.addEventListener('click', (e) => {
        if (e.target === this.searchModal) this.closeSearch();
      });
    }
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }

    // Mobile Menu
    if (this.mobileMenuBtn && this.mobileDrawer) {
      this.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = this.mobileDrawer.classList.contains('is-open');
        if (isOpen) {
          this.closeMobileMenu();
        } else {
          this.openMobileMenu();
        }
      });

      if (this.mobileBackdrop) {
        this.mobileBackdrop.addEventListener('click', () => this.closeMobileMenu());
      }

      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      });

      const quickSearchBtn = document.getElementById('btn-mobile-quick-search');
      if (quickSearchBtn) {
        quickSearchBtn.addEventListener('click', () => {
          this.closeMobileMenu();
          this.openSearch();
        });
      }

      const quickCartBtn = document.getElementById('btn-mobile-quick-cart');
      if (quickCartBtn) {
        quickCartBtn.addEventListener('click', () => {
          this.closeMobileMenu();
          this.openCart();
        });
      }
    }

    // Miniaturas do Hero FRZN-01 - Crossfade instantâneo
    if (this.heroThumbBtns.length > 0 && this.heroMainImg) {
      this.heroThumbBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const newSrc = btn.getAttribute('data-img-src');
          if (!newSrc) return;

          this.heroThumbBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          this.heroMainImg.style.opacity = '0';
          setTimeout(() => {
            this.heroMainImg.src = newSrc;
            this.heroMainImg.style.opacity = '1';
          }, 140);
        });
      });
    }

    // Seletor de Tamanho do Hero com Trava de Segurança (FRZN2.pdf Page 2 & Page 4)
    if (this.heroSizeBtns.length > 0) {
      this.heroSizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.heroSizeBtns.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          this.selectedHeroSize = btn.getAttribute('data-size');

          // Libera a trava do botão "Adicionar ao Carrinho"
          if (this.btnHeroAdd) {
            this.btnHeroAdd.classList.remove('is-locked');
            const btnText = document.getElementById('btn-hero-add-text');
            if (btnText) {
              btnText.textContent = `ADICIONAR AO CARRINHO — TAM ${this.selectedHeroSize}`;
            }
          }
        });
      });
    }

    // Botão Adicionar do Hero FRZN-01
    if (this.btnHeroAdd) {
      this.btnHeroAdd.addEventListener('click', () => {
        if (!this.selectedHeroSize) {
          this.showToast('Selecione formalmente uma opção de tamanho (P, M, G, GG) para continuar');
          return;
        }
        store.addToCart('arctic-01', this.selectedHeroSize, 1);
        this.showToast(`FRZN-01 Arctic Down Parka (Tam. ${this.selectedHeroSize}) adicionada à sacola`);
        this.openCart();
      });
    }

    // Filtros de Categoria
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-category') || 'all';
        this.renderProductGrids();
      });
    });

    // Formulário de Newsletter com Validação (FRZN2.pdf Page 3)
    if (this.footerNewsletterForm) {
      this.footerNewsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = this.footerNewsletterInput;
        const feedback = document.getElementById('newsletter-feedback');
        const email = input ? input.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
          if (feedback) {
            feedback.textContent = 'Endereço de e-mail inválido';
            feedback.className = 'newsletter-feedback error';
          }
          this.showToast('Endereço de e-mail inválido');
          return;
        }

        if (feedback) {
          feedback.textContent = 'Inscrição confirmada no boletim técnico FRZN';
          feedback.className = 'newsletter-feedback success';
        }
        this.showToast('Inscrição confirmada no boletim técnico FRZN');
        if (input) input.value = '';
      });
    }

    // Tecla ESC para fechar modais
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCart();
        this.closeSearch();
        this.closeProductModal();
      }
    });
  }

  /* --- MODAL DE DETALHES DO PRODUTO (ENTRAR NO PRODUTO) --- */
  openProductModal(productId) {
    const product = store.getProductById(productId);
    if (!product || !this.productModalBackdrop) return;

    this.currentModalProduct = product;
    this.modalSelectedSize = null; // Trava de segurança FRZN2.pdf

    // Imagem principal
    if (this.modalMainImg) {
      this.modalMainImg.src = product.studioImg;
      this.modalMainImg.alt = product.name;
    }

    // Miniaturas
    if (this.modalThumbsRow) {
      const images = [
        { src: product.studioImg, label: 'ESTÚDIO' },
        { src: product.lifestyleImg, label: 'LOOKBOOK' },
        ...(product.detailImg ? [{ src: product.detailImg, label: 'DETALHE' }] : [])
      ];

      this.modalThumbsRow.innerHTML = images.map((img, i) => `
        <button type="button" class="modal-thumb-btn ${i === 0 ? 'active' : ''}" data-src="${img.src}" onclick="window.frznApp.ui.switchModalImage('${img.src}', this)" data-cursor-label="${img.label}">
          <img src="${img.src}" alt="${product.name}">
        </button>
      `).join('');
    }

    // Informações textuais
    if (this.modalCategoryTag) {
      this.modalCategoryTag.textContent = `${product.category} · ${product.badge}`;
    }
    if (this.modalTitle) {
      this.modalTitle.textContent = product.name;
    }
    if (this.modalPrice) {
      this.modalPrice.textContent = product.formattedPrice;
    }
    if (this.modalDesc) {
      this.modalDesc.textContent = product.description;
    }

    // Especificações técnicas
    if (this.modalSpecsList && product.specs) {
      this.modalSpecsList.innerHTML = Object.entries(product.specs).map(([key, val]) => `
        <div class="modal-spec-row">
          <span class="modal-spec-label">${key}</span>
          <span class="modal-spec-value">${val}</span>
        </div>
      `).join('');
    }

    // Tamanhos (nenhum pré-selecionado por padrão)
    if (this.modalSizesRow) {
      this.modalSizesRow.innerHTML = product.sizes.map(sz => `
        <button type="button" class="size-btn" data-size="${sz}" onclick="window.frznApp.ui.selectModalSize('${sz}', this)" data-cursor-label="TAM">${sz}</button>
      `).join('');
    }

    // Botão Adicionar do Modal com trava inicial
    if (this.modalAddBtn) {
      this.modalAddBtn.classList.add('is-locked');
      const span = this.modalAddBtn.querySelector('span');
      if (span) span.textContent = 'SELECIONE O TAMANHO';

      this.modalAddBtn.onclick = () => {
        if (!this.modalSelectedSize) {
          this.showToast('Selecione formalmente uma opção de tamanho para continuar');
          return;
        }
        store.addToCart(product.id, this.modalSelectedSize, 1);
        this.showToast(`${product.name} (Tam. ${this.modalSelectedSize}) adicionada à sacola`);
        this.closeProductModal();
        this.openCart();
      };
    }

    this.productModalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  switchModalImage(src, btn) {
    if (this.modalMainImg) {
      this.modalMainImg.style.opacity = '0';
      setTimeout(() => {
        this.modalMainImg.src = src;
        this.modalMainImg.style.opacity = '1';
      }, 140);
    }
    document.querySelectorAll('.modal-thumb-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  selectModalSize(size, btn) {
    this.modalSelectedSize = size;
    document.querySelectorAll('#modal-sizes-row .size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    if (this.modalAddBtn) {
      this.modalAddBtn.classList.remove('is-locked');
      const span = this.modalAddBtn.querySelector('span');
      if (span) span.textContent = `ADICIONAR À SACOLA — TAM ${size}`;
    }
  }

  closeProductModal() {
    if (this.productModalBackdrop) {
      this.productModalBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  openCart() {
    if (this.cartDrawer && this.cartBackdrop) {
      this.cartBackdrop.classList.add('is-open');
      this.cartDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCart() {
    if (this.cartDrawer && this.cartBackdrop) {
      this.cartBackdrop.classList.remove('is-open');
      this.cartDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  openSearch() {
    if (this.searchModal) {
      this.searchModal.classList.add('is-open');
      if (this.searchInput) {
        setTimeout(() => this.searchInput.focus(), 100);
      }
    }
  }

  closeSearch() {
    if (this.searchModal) {
      this.searchModal.classList.remove('is-open');
      if (this.searchInput) {
        this.searchInput.value = '';
      }
      if (this.searchResults) {
        this.searchResults.innerHTML = '';
      }
    }
  }

  openMobileMenu() {
    if (this.mobileDrawer) {
      this.mobileDrawer.classList.add('is-open');
      if (this.mobileBackdrop) {
        this.mobileBackdrop.classList.add('is-open');
      }
      document.body.style.overflow = 'hidden';
    }
  }

  closeMobileMenu() {
    if (this.mobileDrawer) {
      this.mobileDrawer.classList.remove('is-open');
      if (this.mobileBackdrop) {
        this.mobileBackdrop.classList.remove('is-open');
      }
      document.body.style.overflow = '';
    }
  }

  handleSearch(query) {
    if (!this.searchResults) return;
    if (!query.trim()) {
      this.searchResults.innerHTML = '';
      return;
    }

    const matches = store.searchProducts(query);
    if (matches.length === 0) {
      this.searchResults.innerHTML = `
        <div style="font-family: var(--font-mono); color: var(--color-subtle-white); padding: 16px 0;">
          Nenhum equipamento técnico encontrado para "${query}".
        </div>
      `;
      return;
    }

    this.searchResults.innerHTML = matches.map(p => `
      <div class="cart-item" style="cursor: pointer;" onclick="window.frznApp.ui.closeSearch(); window.frznApp.ui.openProductModal('${p.id}');">
        <img src="${p.studioImg}" class="cart-item-img" alt="${p.name}">
        <div class="cart-item-details">
          <div class="cart-item-top">
            <h4 class="cart-item-title">${p.name}</h4>
            <span class="cart-item-price">${p.formattedPrice}</span>
          </div>
          <div class="cart-item-meta">${p.tagline}</div>
          <div style="margin-top: 8px;">
            <button class="filter-btn" style="padding: 4px 10px; font-size: 0.65rem;">VER DETALHES</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderCart() {
    const items = store.cart;
    const count = store.getCartCount();

    // Atualiza badges
    this.cartBadges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });

    // Atualiza valor de subtotal em Reais
    if (this.cartSubtotalEl) {
      this.cartSubtotalEl.textContent = store.getFormattedSubtotal();
    }

    // Renderiza lista
    if (!this.cartItemsContainer) return;

    if (items.length === 0) {
      this.cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <p style="margin: 0 0 12px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-ice-blue);">[SACOLA VAZIA]</p>
          <p style="margin: 0; font-size: 0.85rem;">Nenhum equipamento adicionado no momento.</p>
        </div>
      `;
      return;
    }

    this.cartItemsContainer.innerHTML = items.map(item => `
      <div class="cart-item">
        <img src="${item.img}" class="cart-item-img" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-top">
            <h4 class="cart-item-title">${item.name}</h4>
            <button class="close-btn" style="padding: 2px;" onclick="window.frznApp.ui.removeCartItem('${item.id}', '${item.size}')" title="Remover">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 16px; height: 16px;"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="cart-item-meta">TAMANHO: ${item.size}</div>
          <div class="cart-item-bottom">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="window.frznApp.ui.changeCartQty('${item.id}', '${item.size}', ${item.quantity - 1})">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="window.frznApp.ui.changeCartQty('${item.id}', '${item.size}', ${item.quantity + 1})">+</button>
            </div>
            <span class="cart-item-price">R$ ${(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  changeCartQty(id, size, qty) {
    store.updateQuantity(id, size, qty);
  }

  removeCartItem(id, size) {
    store.removeFromCart(id, size);
    this.showToast('Unidade removida da sacola');
  }

  quickAdd(productId, size = 'M', event = null) {
    if (event) event.stopPropagation();
    const p = store.addToCart(productId, size, 1);
    if (p) {
      this.showToast(`${p.name} adicionada à sacola`);
      this.openCart();
    }
  }

  renderProductCardHTML(product, index) {
    const staggerIdx = (index % 8) + 1;
    return `
      <article 
        class="product-card reveal-item stagger-${staggerIdx}" 
        data-product-id="${product.id}" 
        data-stagger-index="${staggerIdx}"
        onclick="window.frznApp.ui.openProductModal('${product.id}')"
        data-cursor-label="ENTRAR"
      >
        <div class="product-media-wrapper">
          <img 
            src="${product.studioImg}" 
            alt="${product.name} Vista Estúdio" 
            class="product-img product-img-studio" 
            loading="lazy"
          >
          <img 
            src="${product.lifestyleImg}" 
            alt="${product.name} Vista Lookbook" 
            class="product-img product-img-lifestyle" 
            loading="lazy"
          >
          <button 
            type="button" 
            class="product-quick-add" 
            onclick="window.frznApp.ui.quickAdd('${product.id}', 'M', event)"
            aria-label="Adicionar ${product.name} rapidamente à sacola"
            data-cursor-label="+ SACOLA"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Adicionar Rápido
          </button>
        </div>
        <div class="card-info">
          <span class="card-category">${product.category} // ${product.badge}</span>
          <h3 class="card-title">${product.name}</h3>
          <div class="card-bottom-row">
            <span class="card-price">${product.formattedPrice}</span>
            <span class="card-sizes-preview">${product.sizes.join(' · ')}</span>
          </div>
        </div>
      </article>
    `;
  }

  renderProductGrids() {
    const filteredProducts = store.filterProducts(this.activeFilter, this.activeSort);

    if (this.homeGrid) {
      this.homeGrid.innerHTML = filteredProducts
        .slice(0, 4)
        .map((p, idx) => this.renderProductCardHTML(p, idx))
        .join('');
    }

    if (this.shopGrid) {
      this.shopGrid.innerHTML = filteredProducts
        .map((p, idx) => this.renderProductCardHTML(p, idx))
        .join('');
    }

    if (window.frznApp?.scroll) {
      window.frznApp.scroll.refreshReveal();
    }
  }

  showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-ice-blue)" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}
