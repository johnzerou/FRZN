/* ===================================================================
   FRZN - PHYSICAL SMOOTH SCROLL & PARALLAX ENGINE
   Lerp factor: 0.08, Multi-layer Parallax (0.15x, 0.35x, 1.0x),
   Mobile 50% parallax reduction & 75ms cumulative stagger reveal
   =================================================================== */

export class SmoothScrollEngine {
  constructor() {
    this.isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
    this.parallaxMultiplier = this.isMobile ? 0.5 : 1.0;

    this.currentY = window.scrollY;
    this.targetY = window.scrollY;
    this.lerpFactor = 0.08;
    this.isScrolling = false;

    this.header = document.querySelector('.site-header');
    // Apenas elementos absolutos internos de parallax para evitar deslocamento de seções
    this.heroBg = document.querySelector('.hero-parallax-bg');
    this.heroMid = document.querySelector('.hero-parallax-mid');

    this.init();
    this.initScrollReveal();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.targetY = window.scrollY;
      this.checkHeader();
      this.updateParallax(this.targetY);
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
      this.parallaxMultiplier = this.isMobile ? 0.5 : 1.0;
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
    // Parallax suave aplicado apenas ao fundo do Hero (não desloca o layout da página)
    if (this.heroBg && scrollPos < window.innerHeight * 1.5) {
      const bgOffset = scrollPos * 0.15 * this.parallaxMultiplier;
      this.heroBg.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
    }

    // Telemetria intermediária do Hero
    if (this.heroMid && scrollPos < window.innerHeight * 1.5) {
      const midOffset = scrollPos * 0.35 * this.parallaxMultiplier;
      this.heroMid.style.transform = `translate3d(0, ${midOffset}px, 0)`;
    }
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
