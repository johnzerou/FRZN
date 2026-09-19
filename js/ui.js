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
    this.modalSizeSelectorWrap = document.getElementById('modal-size-selector-wrap');
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

    // Inicialização das máscaras reativas de checkout
    this.initCheckoutMasks();
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

    // Finalizar Compra -> Acessa o Modal de Checkout Profissional
    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => {
        if (store.getCartCount() === 0) {
          this.showToast('Sua sacola ártica está vazia.');
          return;
        }
        this.openCheckoutModal();
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

    // Filtros por Drop (Drop 01 e Drop 02)
    this.dropTabBtns = document.querySelectorAll('.drop-tab-btn');
    this.dropTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dropTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeDrop = btn.getAttribute('data-drop') || 'all';
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

    // Inicializa Hover Reveal Spotlight & Fallback Mobile (Svalbard Expedition)
    this.initSpotlightHover();

    // Tecla ESC para fechar modais
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCart();
        this.closeSearch();
        this.closeProductModal();
      }
    });
  }

  filterByDrop(drop) {
    this.activeDrop = drop;
    if (this.dropTabBtns) {
      this.dropTabBtns.forEach(btn => {
        if (btn.getAttribute('data-drop') === drop) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
    const shopView = document.getElementById('new-collection');
    if (shopView) {
      shopView.scrollIntoView({ behavior: 'smooth' });
    }
    this.renderProductGrids();
  }

  /* --- HOVER REVEAL COM SPOTLIGHT & FALLBACK MOBILE (SVALBARD EXPEDITION) --- */
  initSpotlightHover() {
    const container = document.getElementById('spotlight-compare-container');
    const revealWrap = document.getElementById('spotlight-reveal-wrap');
    const badge = document.getElementById('spotlight-hover-badge');
    if (!container || !revealWrap) return;

    // Coordenadas reativas do cursor para interpolação suave
    const coords = { x: container.offsetWidth / 2, y: container.offsetHeight / 2 };

    // GSAP quickTo para tracking a 60fps sem engasgos ou travamento
    let setX = null;
    let setY = null;
    if (typeof gsap !== 'undefined' && gsap.quickTo) {
      setX = gsap.quickTo(coords, 'x', {
        duration: 0.22,
        ease: 'power2.out',
        onUpdate: () => {
          revealWrap.style.setProperty('--spot-x', `${coords.x}px`);
        }
      });
      setY = gsap.quickTo(coords, 'y', {
        duration: 0.22,
        ease: 'power2.out',
        onUpdate: () => {
          revealWrap.style.setProperty('--spot-y', `${coords.y}px`);
        }
      });
    }

    let isInside = false;

    const onMouseEnter = (e) => {
      // Ignora hover em viewport mobile / touch
      if (window.matchMedia('(max-width: 768px), (hover: none)').matches) return;
      isInside = true;

      const rect = container.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      coords.x = currentX;
      coords.y = currentY;
      revealWrap.style.setProperty('--spot-x', `${currentX}px`);
      revealWrap.style.setProperty('--spot-y', `${currentY}px`);

      if (typeof gsap !== 'undefined') {
        gsap.to(revealWrap, { opacity: 1, duration: 0.35, ease: 'power2.out' });
        if (badge) {
          badge.classList.add('is-visible');
          gsap.fromTo(badge, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        }
      } else {
        revealWrap.style.opacity = '1';
        if (badge) badge.classList.add('is-visible');
      }
    };

    const onMouseMove = (e) => {
      if (!isInside) return;
      if (window.matchMedia('(max-width: 768px), (hover: none)').matches) return;

      const rect = container.getBoundingClientRect();
      const targetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const targetY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

      if (setX && setY) {
        setX(targetX);
        setY(targetY);
      } else {
        revealWrap.style.setProperty('--spot-x', `${targetX}px`);
        revealWrap.style.setProperty('--spot-y', `${targetY}px`);
      }
    };

    const onMouseLeave = () => {
      isInside = false;
      if (typeof gsap !== 'undefined') {
        gsap.to(revealWrap, { opacity: 0, duration: 0.38, ease: 'power2.inOut' });
        if (badge) {
          gsap.to(badge, {
            opacity: 0,
            y: 6,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => badge.classList.remove('is-visible')
          });
        }
      } else {
        revealWrap.style.opacity = '0';
        if (badge) badge.classList.remove('is-visible');
      }
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    // Ajusta estado se houver redimensionamento de tela
    window.addEventListener('resize', () => {
      if (window.matchMedia('(max-width: 768px), (hover: none)').matches) {
        revealWrap.style.opacity = '';
        if (badge) badge.classList.remove('is-visible');
      }
    });
  }

  /* Fallback Mobile: Alterna entre CAMPO e ESTÚDIO com suave crossfade e zoom */
  switchSpotlightMobile(mode) {
    const btnField = document.getElementById('btn-tab-field');
    const btnStudio = document.getElementById('btn-tab-studio');
    const revealWrap = document.getElementById('spotlight-reveal-wrap');
    const baseImg = document.getElementById('spotlight-base-img');

    if (btnField) btnField.classList.toggle('active', mode === 'field');
    if (btnStudio) btnStudio.classList.toggle('active', mode === 'studio');

    if (!revealWrap) return;

    if (mode === 'studio') {
      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf(revealWrap);
        gsap.fromTo(
          revealWrap,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
        );
      } else {
        revealWrap.style.opacity = '1';
      }
    } else {
      // Retorna para campo (lifestyle)
      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf(revealWrap);
        gsap.to(revealWrap, { opacity: 0, duration: 0.4, ease: 'power2.out' });
        if (baseImg) {
          gsap.fromTo(
            baseImg,
            { scale: 1.03 },
            { scale: 1, duration: 0.45, ease: 'power2.out' }
          );
        }
      } else {
        revealWrap.style.opacity = '0';
      }
    }
  }

  /* --- MODAL DE DETALHES DO PRODUTO (QUICK VIEW RIGOROSO) --- */
  openProductModal(productId) {
    if (!productId) return;
    const product = store.getProductById(productId);
    if (!product || !this.productModalBackdrop || !product.studioImg) {
      console.warn(`[FRZN UI] Tentativa de abrir modal com produto inválido ou sem mídia: ${productId}`);
      return;
    }

    this.currentModalProduct = product;
    this.modalSelectedSize = null;

    // Imagem principal com transição suave e proteção contra src vazio
    if (this.modalMainImg) {
      this.modalMainImg.style.opacity = '0';
      this.modalMainImg.src = product.studioImg;
      this.modalMainImg.alt = product.name;
      this.modalMainImg.onload = () => {
        this.modalMainImg.style.opacity = '1';
      };
      if (this.modalMainImg.complete) {
        this.modalMainImg.style.opacity = '1';
      }
    }

    // Miniaturas
    if (this.modalThumbsRow) {
      const images = [
        { src: product.studioImg, label: 'ESTÚDIO' },
        ...(product.lifestyleImg && product.lifestyleImg !== product.studioImg ? [{ src: product.lifestyleImg, label: 'LOOKBOOK' }] : []),
        ...(product.detailImg && product.detailImg !== product.studioImg && product.detailImg !== product.lifestyleImg ? [{ src: product.detailImg, label: 'DETALHE' }] : [])
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

    // Especificações técnicas dinâmicas
    if (this.modalSpecsList) {
      if (product.specs && Object.keys(product.specs).length > 0) {
        this.modalSpecsList.style.display = 'grid';
        this.modalSpecsList.innerHTML = Object.entries(product.specs).map(([key, val]) => `
          <div class="modal-spec-row">
            <span class="modal-spec-label">${key}</span>
            <span class="modal-spec-value">${val}</span>
          </div>
        `).join('');
      } else {
        this.modalSpecsList.style.display = 'none';
        this.modalSpecsList.innerHTML = '';
      }
    }

    // Gerenciamento estrito de tamanhos (Eliminação rígida de seletores órfãos)
    const hasValidSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
    const isSingleSize = hasValidSizes && (product.sizes.length === 1 || product.sizes[0] === 'TAMANHO ÚNICO' || product.sizes[0] === '45L');

    if (this.modalSizeSelectorWrap) {
      this.modalSizeSelectorWrap.style.display = hasValidSizes ? 'block' : 'none';
    }

    if (this.modalSizesRow) {
      if (hasValidSizes) {
        this.modalSizesRow.innerHTML = product.sizes.map(sz => `
          <button type="button" class="size-btn" data-size="${sz}" onclick="window.frznApp.ui.selectModalSize('${sz}', this)" data-cursor-label="TAM">${sz}</button>
        `).join('');
      } else {
        this.modalSizesRow.innerHTML = '';
      }
    }

    // Configuração do botão adicionar com trava de segurança FRZN
    if (this.modalAddBtn) {
      const span = this.modalAddBtn.querySelector('span');

      if (isSingleSize) {
        this.modalSelectedSize = product.sizes[0];
        this.modalAddBtn.classList.remove('is-locked');
        if (span) span.textContent = `Adicionar à Sacola (${this.modalSelectedSize})`;
        const singleBtn = this.modalSizesRow?.querySelector('.size-btn');
        if (singleBtn) singleBtn.classList.add('selected', 'active');
      } else if (hasValidSizes) {
        this.modalAddBtn.classList.add('is-locked');
        if (span) span.textContent = 'SELECIONE O TAMANHO';
      } else {
        this.modalSelectedSize = 'ÚNICO';
        this.modalAddBtn.classList.remove('is-locked');
        if (span) span.textContent = 'Adicionar à Sacola';
      }

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
    document.querySelectorAll('#modal-sizes-row .size-btn').forEach(b => b.classList.remove('selected', 'active'));
    btn.classList.add('selected', 'active');

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
      this.currentModalProduct = null;
      this.modalSelectedSize = null;
      if (this.modalSizeSelectorWrap) {
        this.modalSizeSelectorWrap.style.display = 'none';
      }
    }
  }

  openCart() {
    if (this.cartDrawer && this.cartBackdrop) {
      this.cartBackdrop.classList.add('is-open');
      this.cartDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      if (window.gsap) {
        window.gsap.fromTo(this.cartDrawer,
          { x: '100%' },
          { x: '0%', duration: 0.6, ease: 'back.out(1.2)', overwrite: 'auto' }
        );
        window.gsap.fromTo(this.cartBackdrop,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }
        );
      }
    }
  }

  closeCart() {
    if (this.cartDrawer && this.cartBackdrop) {
      if (window.gsap) {
        window.gsap.to(this.cartDrawer, {
          x: '100%',
          duration: 0.45,
          ease: 'power3.in',
          overwrite: 'auto',
          onComplete: () => {
            this.cartDrawer.classList.remove('is-open');
            this.cartBackdrop.classList.remove('is-open');
            document.body.style.overflow = '';
          }
        });
        window.gsap.to(this.cartBackdrop, {
          opacity: 0,
          duration: 0.35,
          overwrite: 'auto'
        });
      } else {
        this.cartBackdrop.classList.remove('is-open');
        this.cartDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
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
        <img src="${p.studioImg}" class="cart-item-img" alt="${p.name}" loading="lazy" decoding="async">
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
      this.showToast(`${p.name} (Tam. ${size}) adicionada à sacola`);
      this.openCart();
    }
  }

  renderProductCardHTML(product, index) {
    const staggerIdx = (index % 8) + 1;

    const quickSizesHTML = product.sizes.map(sz => `
      <button 
        type="button" 
        class="quick-size-chip" 
        onclick="window.frznApp.ui.quickAdd('${product.id}', '${sz}', event)"
        data-cursor-label="+ TAM ${sz}"
        title="Adicionar tamanho ${sz} à sacola"
      >
        ${sz}
      </button>
    `).join('');

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
            decoding="async"
          >
          <img 
            src="${product.lifestyleImg}" 
            alt="${product.name} Vista Lookbook" 
            class="product-img product-img-lifestyle" 
            loading="lazy"
            decoding="async"
          >

          <!-- Barra de Seleção Rápida de Tamanho no Hover -->
          <div class="product-quick-add-wrap">
            <span class="quick-add-title">TAMANHO RÁPIDO</span>
            <div class="quick-sizes-chips">
              ${quickSizesHTML}
            </div>
          </div>
        </div>
        <div class="card-info">
          <span class="card-category">${product.category} · ${product.badge}</span>
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
    const filteredProducts = store.filterProducts(this.activeFilter, this.activeDrop, this.activeSort);

    if (this.homeGrid) {
      this.homeGrid.innerHTML = filteredProducts
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

  filterCategoryFromFooter(category) {
    if (window.frznApp?.transitions) {
      window.frznApp.transitions.navigateTo('shop');
    }
    this.activeFilter = category;
    this.filterBtns.forEach(btn => {
      if (btn.getAttribute('data-category') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    this.renderProductGrids();
    const shopView = document.getElementById('view-shop');
    if (shopView) {
      shopView.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openPolicyModal(type) {
    const backdrop = document.getElementById('policy-modal');
    const eyebrow = document.getElementById('policy-eyebrow');
    const title = document.getElementById('policy-title');
    const body = document.getElementById('policy-body');
    if (!backdrop || !title || !body) return;

    const policies = {
      goretex: {
        eyebrow: 'ESPECIFICAÇÃO DE MATERIAIS FRZN™',
        title: 'PADRÕES 3L GORE-TEX® PRO',
        body: `
          <p>As membranas 3-Layer GORE-TEX® Pro utilizadas no vestuário FRZN são projetadas para os ambientes mais inóspitos do planeta. A estrutura laminada de três camadas une uma membrana ePTFE microporosa de alta densidade diretamente ao tecido externo de nylon Cordura® e a um forro interior ultraleve Micro Grid Backer.</p>
          <ul>
            <li><strong>Impermeabilidade Estática:</strong> Resiste a colunas d'água superiores a 28.000 mm.</li>
            <li><strong>Respirabilidade RET &lt; 6:</strong> Máxima taxa de evaporação de vapor de suor sob atividade física intensa.</li>
            <li><strong>Vedação de Costuras:</strong> Fitas térmicas de Poliuretano (PU) de 13mm aplicadas a laser em 100% das junções.</li>
          </ul>
        `
      },
      down: {
        eyebrow: 'ENGENHARIA DE ISOLAMENTO',
        title: 'PLUMA ÉTICA 850+ GOOSE DOWN',
        body: `
          <p>O preenchimento térmico de nossas parkas utiliza exclusivamente pluma de ganso cinzento europeu certificada pelo padrão internacional RDS (Responsible Down Standard). Cada lote passa por um tratamento nanotécnico hidrofóbico que impede que as plumas absorvam umidade e percam poder de expansão sob neve pesada.</p>
          <ul>
            <li><strong>Fill Power Certificado:</strong> 850+ cuin de expansão garantida.</li>
            <li><strong>Tratamento Hydrophobic:</strong> Mantém 95% do isolamento térmico mesmo após exposição prolongada à névoa.</li>
            <li><strong>Origem 100% Rastreável:</strong> Livre de práticas de colheita nocivas e com certificação ética auditada.</li>
          </ul>
        `
      },
      testing: {
        eyebrow: 'LABORATÓRIOS POLARES',
        title: 'TESTES EM CLIMAS SUB-ZERO (-45°C)',
        body: `
          <p>Antes do lançamento comercial, todos os protótipos FRZN passam por validação em câmaras térmicas pressurizadas no laboratório de Tromsø (Noruega) e testes práticos de expedição na tundra de Svalbard (Latitude 78° Norte).</p>
          <p>Nossos testes simulam ventos de tempestade de até 90 km/h e variações térmicas drásticas entre o exterior sub-zero e estações subterrâneas aquecidas.</p>
        `
      },
      care: {
        eyebrow: 'MANUTENÇÃO & CONSERVAÇÃO',
        title: 'GUIA DE CUIDADOS E REPARO VITALÍCIO',
        body: `
          <p>Equipamentos técnicos de alta performance exigem manutenção preventiva para manter a repelência à água (DWR) e a respirabilidade original.</p>
          <ul>
            <li><strong>Lavagem:</strong> Lavar à máquina em ciclo delicado a 30°C utilizando detergente neutro para roupas técnicas (sem amaciante).</li>
            <li><strong>Reativação DWR:</strong> Secar em tambor em temperatura média por 20 minutos para reativar o polímero repelente à água.</li>
            <li><strong>Serviço de Reparo:</strong> Oferecemos patches vulcanizados originais e substituição de zíperes através de nossa rede de suporte.</li>
          </ul>
        `
      },
      fidlock: {
        eyebrow: 'FERRAGENS AEROESPACIAIS',
        title: 'TRAVAS MAGNÉTICAS FIDLOCK® V-BUCKLE',
        body: `
          <p>Substituímos fechos plásticos convencionais por fivelas patenteadas Fidlock® V-Buckle usinadas em alumínio e polímero reforçado com fibra de vidro.</p>
          <p>O mecanismo auto-guiado combina atração magnética com travamento mecânico positivo. Permite acionamento ultra-rápido mesmo usando luvas polares espessas.</p>
        `
      },
      support: {
        eyebrow: 'REDE GLOBAL DE SUPORTE',
        title: 'SUPORTE TÉCNICO GLOBAL FRZN',
        body: `
          <p>Nossa equipe de especialistas oferece suporte em tempo real para especificações de produtos, sizing e rastreamento de entregas de expedição.</p>
          <ul>
            <li><strong>E-mail de Suporte:</strong> suporte@frzn-arctic.com</li>
            <li><strong>Pólo Europa (Berlim):</strong> +49 30 8924-0012</li>
            <li><strong>Pólo Ásia (Tóquio):</strong> +81 3 5410-8924</li>
          </ul>
        `
      },
      shipping: {
        eyebrow: 'LOGÍSTICA & ENTREGAS',
        title: 'ENVIOS EXPRESSOS & DEVOLUÇÃO GRATUITA',
        body: `
          <p>Todos os pedidos FRZN são despachados em embalagens herméticas seladas à prova d'água com envio expresso priorizado para todo o Brasil.</p>
          <ul>
            <li><strong>Frete Grátis:</strong> Disponível para todos os equipamentos do catálogo.</li>
            <li><strong>Prazo de Entrega:</strong> 2 a 5 dias úteis para capitais e regiões metropolitanas.</li>
            <li><strong>Devolução em 30 Dias:</strong> Se o tamanho não for ideal, a primeira troca é inteiramente gratuita com coleta domiciliar.</li>
          </ul>
        `
      },
      warranty: {
        eyebrow: 'COMPROMISSO DE QUALIDADE',
        title: 'GARANTIA VITALÍCIA DOS MATERIAIS',
        body: `
          <p>Garantimos a integridade de todas as membranas GORE-TEX, costuras seladas, fivelas Fidlock e zíperes YKK AquaGuard contra defeitos de fabricação durante toda a vida útil do produto.</p>
          <p>Caso ocorra delaminação ou falha em ferragens originais, o produto será reparado ou substituído sem custo adicional.</p>
        `
      },
      terms: {
        eyebrow: 'DOCUMENTAÇÃO LEGAL',
        title: 'TERMOS & PROTOCOLOS ÁRTICOS',
        body: `
          <p>Cada peça FRZN acompanha uma plaqueta metálica com número de série gravado a laser para autenticação em nosso registro de proprietários.</p>
          <p>A compra de edições limitadas e produtos do Drop 02 garante acesso prioritário aos próximos lançamentos do arquivo técnico.</p>
        `
      },
      privacy: {
        eyebrow: 'PROTEÇÃO DE DADOS',
        title: 'POLÍTICA DE PRIVACIDADE & ENCRIPTAÇÃO',
        body: `
          <p>Seus dados pessoais e de pagamento são protegidos por criptografia de ponta a ponta SSL 256-bit e protocolos rígidos de segurança de e-commerce.</p>
          <p>Não armazenamos dados bancários e nunca compartilhamos informações cadastrais com terceiros.</p>
        `
      }
    };

    const data = policies[type] || policies['goretex'];
    eyebrow.textContent = data.eyebrow;
    title.textContent = data.title;
    body.innerHTML = data.body;

    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  closePolicyModal() {
    const backdrop = document.getElementById('policy-modal');
    if (backdrop) {
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  /* --- FLUXO DE CHECKOUT E PAGAMENTO COM MÁSCARAS E VALIDAÇÃO --- */
  initCheckoutMasks() {
    // 1. Máscara CPF / CNPJ
    const cpfInput = document.getElementById('chk-cpf');
    if (cpfInput) {
      cpfInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 14) v = v.slice(0, 14);
        if (v.length <= 11) {
          // CPF: 000.000.000-00
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
          // CNPJ: 00.000.000/0000-00
          v = v.replace(/^(\d{2})(\d)/, '$1.$2');
          v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
          v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
          v = v.replace(/(\d{4})(\d)/, '$1-$2');
        }
        e.target.value = v;
      });
    }

    // 2. Máscara CEP (00000-000)
    const cepInput = document.getElementById('chk-cep');
    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 8);
        if (v.length > 5) {
          v = v.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = v;
      });
    }

    // 3. Máscara Telefone ((00) 00000-0000)
    const phoneInput = document.getElementById('chk-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 10) {
          v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (v.length > 6) {
          v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (v.length > 2) {
          v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else if (v.length > 0) {
          v = v.replace(/^(\d{0,2})$/, '($1');
        }
        e.target.value = v;
      });
    }

    // 4. Máscaras de Cartão de Crédito
    const cardNumInput = document.querySelector('#pay-panel-card input[placeholder*="0000"]');
    if (cardNumInput) {
      cardNumInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 16);
        v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = v;
      });
    }

    const cardExpiryInput = document.querySelector('#pay-panel-card input[placeholder="MM/AA"]');
    if (cardExpiryInput) {
      cardExpiryInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (v.length >= 2) {
          v = v.slice(0, 2) + '/' + v.slice(2);
        }
        e.target.value = v;
      });
    }

    const cardCvvInput = document.querySelector('#pay-panel-card input[placeholder="123"]');
    if (cardCvvInput) {
      cardCvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
      });
    }
  }

  openCheckoutModal() {
    const items = store.cart;
    if (items.length === 0) {
      this.showToast('Sua sacola ártica está vazia.');
      return;
    }

    this.isOrderConfirmed = false;
    this.currentCheckoutStep = 1;

    const backdrop = document.getElementById('checkout-modal');
    const container = document.getElementById('checkout-summary-items');
    const subtotalEl = document.getElementById('chk-subtotal-val');
    const totalEl = document.getElementById('chk-total-val');

    if (container) {
      container.innerHTML = items.map(item => `
        <div style="display: flex; gap: 12px; align-items: center; padding: 10px 0; border-bottom: var(--border-subtle);">
          <img src="${item.img}" style="width: 48px; height: 60px; object-fit: cover; border-radius: 3px;" alt="${item.name}">
          <div style="flex: 1;">
            <h5 style="margin: 0; font-family: var(--font-heading); font-size: 0.85rem; color: var(--color-ice-white);">${item.name}</h5>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-subtle-white);">Tam: ${item.size} | Qtd: ${item.quantity}</span>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: var(--color-ice-white);">
            R$ ${(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      `).join('');
    }

    const subtotalStr = store.getFormattedSubtotal();
    if (subtotalEl) subtotalEl.textContent = subtotalStr;
    if (totalEl) totalEl.textContent = subtotalStr;

    // Garante que o passo 1 esteja visível
    [1, 2, 3].forEach(step => {
      const panel = document.getElementById(`checkout-step-${step}`);
      const pill = document.getElementById(`step-pill-${step}`);
      if (panel) {
        panel.style.display = step === 1 ? 'block' : 'none';
        panel.style.opacity = step === 1 ? '1' : '0';
        panel.style.transform = 'none';
        panel.classList.toggle('active', step === 1);
      }
      if (pill) {
        pill.classList.toggle('active', step === 1);
      }
    });

    this.closeCart();

    if (backdrop) {
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCheckoutModal() {
    const backdrop = document.getElementById('checkout-modal');
    if (backdrop) {
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
      this.isOrderConfirmed = false;
    }
  }

  goToCheckoutStep(targetStep) {
    if (targetStep === 2) {
      const form = document.getElementById('form-shipping');
      if (form && !form.checkValidity()) {
        form.reportValidity();
        this.showToast('Preencha todos os campos obrigatórios de envio.');
        return;
      }

      const cpfVal = document.getElementById('chk-cpf')?.value.replace(/\D/g, '') || '';
      if (cpfVal.length < 11) {
        this.showToast('Insira um CPF ou CNPJ válido para prosseguir.');
        document.getElementById('chk-cpf')?.focus();
        return;
      }

      const cepVal = document.getElementById('chk-cep')?.value.replace(/\D/g, '') || '';
      if (cepVal.length < 8) {
        this.showToast('Insira um CEP válido de 8 dígitos.');
        document.getElementById('chk-cep')?.focus();
        return;
      }

      const phoneVal = document.getElementById('chk-phone')?.value.replace(/\D/g, '') || '';
      if (phoneVal.length < 10) {
        this.showToast('Insira um telefone válido com DDD.');
        document.getElementById('chk-phone')?.focus();
        return;
      }
    }

    const currentPanel = document.querySelector('.checkout-step-panel.active');
    const nextPanel = document.getElementById(`checkout-step-${targetStep}`);
    if (!nextPanel) return;

    const goingForward = (this.currentCheckoutStep || 1) < targetStep;
    this.currentCheckoutStep = targetStep;

    // Atualiza pills dos passos
    [1, 2, 3].forEach(step => {
      const pill = document.getElementById(`step-pill-${step}`);
      if (pill) {
        pill.classList.toggle('active', step === targetStep);
      }
    });

    // Animação GSAP de transição horizontal fluida entre etapas
    if (window.gsap && currentPanel && currentPanel !== nextPanel) {
      const outX = goingForward ? -35 : 35;
      const inX = goingForward ? 35 : -35;

      window.gsap.to(currentPanel, {
        opacity: 0,
        x: outX,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          currentPanel.classList.remove('active');
          currentPanel.style.display = 'none';

          nextPanel.style.display = 'block';
          nextPanel.classList.add('active');
          window.gsap.fromTo(nextPanel,
            { opacity: 0, x: inX },
            { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
          );
        }
      });
    } else {
      [1, 2, 3].forEach(step => {
        const p = document.getElementById(`checkout-step-${step}`);
        if (p) {
          p.style.display = step === targetStep ? 'block' : 'none';
          p.classList.toggle('active', step === targetStep);
          p.style.opacity = '1';
          p.style.transform = 'none';
        }
      });
    }
  }

  selectPaymentMethod(method) {
    const tabs = ['pix', 'card', 'boleto'];
    tabs.forEach(t => {
      const btn = document.getElementById(`pay-tab-${t}`);
      const panel = document.getElementById(`pay-panel-${t}`);
      if (btn) {
        btn.classList.toggle('active', t === method);
      }
      if (panel) {
        panel.classList.toggle('active', t === method);
      }
    });
  }

  copyPixCode() {
    const input = document.getElementById('pix-code-input');
    if (input) {
      input.select();
      navigator.clipboard?.writeText(input.value);
      this.showToast('Chave Pix copiada com sucesso!');
    }
  }

  confirmOrder(paymentMethod) {
    if (store.getCartCount() === 0 && !this.isOrderConfirmed) {
      this.showToast('Sua sacola ártica está vazia.');
      return;
    }

    // Captura com segurança o Total e os dados ANTES de esvaziar a sacola
    const finalSubtotal = store.getFormattedSubtotal();
    const finalItemsCount = store.getCartCount();
    const orderCode = `FRZN-${Math.floor(1000 + Math.random() * 9000)}-BR`;

    this.isOrderConfirmed = true;

    const codeEl = document.getElementById('success-order-code');
    if (codeEl) {
      codeEl.textContent = `CÓDIGO DE RASTREIO: ${orderCode}`;
    }

    // Injeta comprovante com o TOTAL REAL preservado
    const receiptEl = document.getElementById('confirmed-order-receipt');
    if (receiptEl) {
      receiptEl.innerHTML = `
        <div class="receipt-box" style="background: rgba(122, 155, 181, 0.08); border: 1px solid rgba(122, 155, 181, 0.3); border-radius: 4px; padding: 20px; margin: 20px auto; max-width: 520px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-ice-blue); letter-spacing: 0.1em; text-transform: uppercase;">MÉTODO SELECIONADO:</span>
            <span style="font-family: var(--font-mono); font-size: 0.82rem; font-weight: 700; color: #FFFFFF;">${paymentMethod}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-ice-blue); letter-spacing: 0.1em; text-transform: uppercase;">EQUIPAMENTOS:</span>
            <span style="font-family: var(--font-mono); font-size: 0.82rem; font-weight: 700; color: #FFFFFF;">${finalItemsCount} ${finalItemsCount === 1 ? 'item' : 'itens'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-ice-blue); letter-spacing: 0.1em; text-transform: uppercase;">FRETE EXPRESSO:</span>
            <span style="font-family: var(--font-mono); font-size: 0.82rem; font-weight: 700; color: var(--color-ice-blue);">GRÁTIS (EXPEDIÇÃO POLAR)</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px dashed rgba(122, 155, 181, 0.35);">
            <span style="font-family: var(--font-display); font-size: 1rem; font-weight: 800; color: #FFFFFF; letter-spacing: 0.05em; text-transform: uppercase;">TOTAL PAGO:</span>
            <span style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: var(--color-ice-blue);">${finalSubtotal}</span>
          </div>
        </div>
      `;
    }

    // Congela os números da coluna lateral direita com o Total real pago
    const chkTotal = document.getElementById('chk-total-val');
    const chkSubtotal = document.getElementById('chk-subtotal-val');
    if (chkTotal) chkTotal.textContent = finalSubtotal;
    if (chkSubtotal) chkSubtotal.textContent = finalSubtotal;

    this.goToCheckoutStep(3);
    store.clearCart();
    this.showToast(`Pedido confirmado com sucesso via ${paymentMethod}!`);
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
