/* ===================================================================
   FRZN - PHYSICAL SMOOTH SCROLL & MULTI-LAYER PARALLAX ENGINE
   Multi-layer Parallax (Hero, Manifesto, Subpages & Cards),
   3D Mouse Tilt Parallax & Cumulative Stagger Reveal
   =================================================================== */

export class SmoothScrollEngine {
  constructor() {
    this.isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
    this.parallaxMultiplier = this.isMobile ? 0.3 : 1.0;

    this.currentY = window.scrollY;
    this.targetY = window.scrollY;
    this.lerpFactor = 0.07; // FRZN2.pdf Page 3

    this.header = document.querySelector('.site-header');
    this.heroBg = document.querySelector('.hero-parallax-bg');
    this.heroMid = document.querySelector('.hero-parallax-mid');
    this.heroForeground = document.querySelector('.hero-foreground');
    this.stencilLeft = document.querySelector('.stencil-left');
    this.stencilRight = document.querySelector('.stencil-right');

    this.manifestoSection = document.querySelector('.manifesto-section');
    this.manifestoContainer = document.querySelector('.manifesto-container');
    this.catalogStrip = document.querySelector('.catalog-strip-banner');

    this.init();
    this.initScrollReveal();
    this.initCard3DTilt();
  }

  init() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      this.targetY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.checkHeader();
          this.updateParallax(this.targetY);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
      this.parallaxMultiplier = this.isMobile ? 0.3 : 1.0;
    });

    this.checkHeader();
    this.updateParallax(window.scrollY);
  }

  checkHeader() {
    if (!this.header) return;
    if (window.scrollY > 50) {
      this.header.classList.add('is-scrolled');
    } else {
      this.header.classList.remove('is-scrolled');
    }
  }

  updateParallax(scrollPos) {
    const viewHeight = window.innerHeight;
    const hasGSAP = !!(window.gsap && window.ScrollTrigger);

    // --- 1. HERO PARALLAX (Apenas se GSAP não estiver gerenciando) ---
    if (!hasGSAP && scrollPos < viewHeight * 1.5) {
      if (this.heroBg) {
        const bgOffset = scrollPos * 0.12 * this.parallaxMultiplier;
        this.heroBg.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
      }

      if (this.heroMid) {
        const midOffset = scrollPos * 0.28 * this.parallaxMultiplier;
        this.heroMid.style.transform = `translate3d(0, ${midOffset}px, 0)`;
      }

      if (this.stencilLeft) {
        const leftOffset = scrollPos * 0.35 * this.parallaxMultiplier;
        this.stencilLeft.style.transform = `translate3d(${leftOffset * 0.2}px, ${leftOffset}px, 0)`;
      }

      if (this.stencilRight) {
        const rightOffset = scrollPos * -0.2 * this.parallaxMultiplier;
        this.stencilRight.style.transform = `translate3d(${-rightOffset * 0.15}px, ${rightOffset}px, 0)`;
      }

      if (this.heroForeground) {
        const fgOffset = scrollPos * 0.15 * this.parallaxMultiplier;
        const opacity = Math.max(0, 1 - (scrollPos / (viewHeight * 0.85)));
        this.heroForeground.style.transform = `translate3d(0, ${fgOffset}px, 0)`;
        this.heroForeground.style.opacity = opacity.toFixed(2);
      }
    }

    // --- 2. SEÇÃO DE COLEÇÕES EM SCROLL HORIZONTAL (Fallback quando sem GSAP) ---
    if (!hasGSAP) {
      const horizSection = document.getElementById('horizontal-collections');
      const horizContainer = document.getElementById('horizontal-track-container');
      if (horizSection && horizContainer) {
        const hRect = horizSection.getBoundingClientRect();
        if (hRect.top < viewHeight && hRect.bottom > 0) {
          const scrollRatio = Math.max(0, Math.min(1, (viewHeight - hRect.top) / (viewHeight + hRect.height)));
          const maxScroll = horizContainer.scrollWidth - horizContainer.clientWidth;
          horizContainer.scrollLeft = scrollRatio * maxScroll;
        }
      }
    }

    // --- 3. MANIFESTO SECTION PARALLAX (Fallback quando sem GSAP) ---
    if (!hasGSAP && this.manifestoSection) {
      const rect = this.manifestoSection.getBoundingClientRect();
      if (rect.top < viewHeight && rect.bottom > 0) {
        const sectionScroll = viewHeight - rect.top;
        const bgY = (sectionScroll * 0.12 * this.parallaxMultiplier) - 40;
        this.manifestoSection.style.backgroundPositionY = `calc(50% + ${bgY}px)`;

        if (this.manifestoContainer && !this.isMobile) {
          const containerY = (sectionScroll * 0.04 * this.parallaxMultiplier) - 10;
          this.manifestoContainer.style.transform = `translate3d(0, ${-containerY}px, 0)`;
        }
      }
    }

    // --- 4. CATALOG STRIP PARALLAX ---
    if (this.catalogStrip) {
      const stripRect = this.catalogStrip.getBoundingClientRect();
      if (stripRect.top < viewHeight && stripRect.bottom > 0) {
        const stripOffset = (viewHeight - stripRect.top) * 0.04 * this.parallaxMultiplier;
        this.catalogStrip.style.transform = `translate3d(0, ${-stripOffset}px, 0)`;
      }
    }

    // --- 5. SUBPAGE HEADERS PARALLAX ---
    document.querySelectorAll('.subpage-header').forEach(header => {
      const hRect = header.getBoundingClientRect();
      if (hRect.top < viewHeight && hRect.bottom > 0) {
        const hOffset = (viewHeight - hRect.top) * 0.06 * this.parallaxMultiplier;
        header.style.transform = `translate3d(0, ${-hOffset}px, 0)`;
      }
    });
  }

  /* Efeito de Inclinação Parallax 3D Otimizado (Event Delegation Leve) */
  initCard3DTilt() {
    if (this.isMobile) return;

    let activeCard = null;

    document.addEventListener('mouseover', (e) => {
      const card = e.target.closest('.product-card, .info-card, .catalog-strip-banner');
      if (card !== activeCard) {
        if (activeCard) {
          activeCard.style.transform = '';
          activeCard.classList.remove('is-tilted');
        }
        activeCard = card;
        if (activeCard) {
          activeCard.classList.add('is-tilted');
        }
      }
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
      if (!activeCard) return;

      const rect = activeCard.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rotateX = ((mouseY / cardHeight) - 0.5) * -10;
      const rotateY = ((mouseX / cardWidth) - 0.5) * 10;

      activeCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;
      activeCard.style.transition = 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      if (activeCard) {
        activeCard.style.transform = '';
        activeCard.classList.remove('is-tilted');
        activeCard = null;
      }
    });
  }

  initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          
          const staggerIndex = item.getAttribute('data-stagger-index');
          if (staggerIndex) {
            const delayMs = parseInt(staggerIndex, 10) * 75;
            item.style.transitionDelay = `${delayMs}ms`;
          }

          item.classList.add('is-revealed');
          observer.unobserve(item);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-item').forEach((el, idx) => {
      if (!el.getAttribute('data-stagger-index')) {
        el.setAttribute('data-stagger-index', (idx % 8) + 1);
      }
      revealObserver.observe(el);
    });
  }

  refreshReveal() {
    this.initScrollReveal();
  }
}
