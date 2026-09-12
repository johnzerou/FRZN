/* ===================================================================
   FRZN - GSAP + SCROLLTRIGGER + LENIS ANIMATION ENGINE
   Editorial Premium Micro-Interactions, 3-Layer Scrub Parallax,
   Pinned Horizontal Scroll, Magnetic Buttons & Stat Count-Up
   =================================================================== */

export class GSAPAnimationEngine {
  constructor() {
    this.gsap = window.gsap;
    this.ScrollTrigger = window.ScrollTrigger;
    this.Lenis = window.Lenis;
    this.ctx = null;
    this.lenis = null;

    if (!this.gsap || !this.ScrollTrigger) {
      console.warn('FRZN: GSAP ou ScrollTrigger não encontrados no escopo global.');
      return;
    }

    this.gsap.registerPlugin(this.ScrollTrigger);
    this.initLenis();
    this.initAnimations();
  }

  /* 1. Smooth scroll de base (Lenis) */
  initLenis() {
    if (!this.Lenis) return;

    try {
      this.lenis = new this.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5
      });

      this.lenis.on('scroll', this.ScrollTrigger.update);

      this.gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });

      this.gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn('FRZN: Inicialização do Lenis ignorada.', e);
    }
  }

  /* Animações completas escopadas via gsap.context() */
  initAnimations() {
    if (this.ctx) this.ctx.revert();

    this.ctx = this.gsap.context(() => {
      const mm = this.gsap.matchMedia();

      /* -------------------------------------------------------------
         DESKTOP & TABLET ANIMATIONS
         ------------------------------------------------------------- */
      mm.add("(min-width: 769px)", () => {
        
        /* 2. Hero (Seção Home) — Parallax Scrub 3 Camadas & Opacidade */
        const heroSection = document.getElementById('hero-entry');
        if (heroSection) {
          const heroTl = this.gsap.timeline({
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8
            }
          });

          // Fundo montanha (camada 1 - lenta)
          const heroBg = document.querySelector('.hero-parallax-bg');
          if (heroBg) {
            heroTl.to(heroBg, { yPercent: 20, ease: 'none' }, 0);
          }

          // Texto foreground (camada 2 - média)
          const heroFg = document.querySelector('.hero-foreground');
          if (heroFg) {
            heroTl.to(heroFg, { yPercent: 35, opacity: 0.1, ease: 'none' }, 0);
          }

          // Stencils gráficos (camada 3 - lateral)
          const stencilLeft = document.querySelector('.stencil-left');
          const stencilRight = document.querySelector('.stencil-right');
          if (stencilLeft) heroTl.to(stencilLeft, { x: -60, y: 50, ease: 'none' }, 0);
          if (stencilRight) heroTl.to(stencilRight, { x: 60, y: -40, ease: 'none' }, 0);

          // Overlay escuro com opacidade animada de 20% a 75%
          const heroOverlay = document.querySelector('.hero-gradient-overlay');
          if (heroOverlay) {
            heroTl.to(heroOverlay, { opacity: 0.75, ease: 'none' }, 0);
          }
        }

        /* Hero Title Line Reveal (Split Text Stagger) */
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroTitle) {
          this.gsap.fromTo(heroTitle, 
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
          );
        }
        if (heroSubtitle) {
          this.gsap.fromTo(heroSubtitle,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.4 }
          );
        }

        /* Botão "Explorar Coleção" com Efeito Magnético sutil (gsap.quickTo) */
        const magneticBtns = document.querySelectorAll('.cta-pill-btn, .catalog-strip-btn');
        magneticBtns.forEach(btn => {
          const xTo = this.gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
          const yTo = this.gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });

          btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);
            xTo(relX * 0.35);
            yTo(relY * 0.35);
          });

          btn.addEventListener('mouseleave', () => {
            xTo(0);
            yTo(0);
          });
        });

        /* 3. Peça Destaque (Puffer Arctic 01) — Scale Fade + Mouse 3D Tilt */
        const productHeroStage = document.querySelector('.main-stage-wrapper');
        if (productHeroStage) {
          this.gsap.fromTo(productHeroStage,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: productHeroStage,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        /* Tech Specs Stagger Reveal */
        const techSpecs = document.querySelectorAll('.tech-spec-grid .spec-item');
        if (techSpecs.length > 0) {
          this.gsap.fromTo(techSpecs,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.tech-spec-grid',
                start: 'top 88%'
              }
            }
          );
        }

        /* 5. Seção Filosofia / Manifesto Parallax & Count-Up Estatístico */
        const manifestoSec = document.querySelector('.manifesto-section');
        if (manifestoSec) {
          this.gsap.to(manifestoSec, {
            backgroundPositionY: '60%',
            ease: 'none',
            scrollTrigger: {
              trigger: manifestoSec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5
            }
          });
        }

        /* Count-up dos Números Estatísticos (-45°C, 28k, 100%) */
        const statItems = document.querySelectorAll('.manifesto-stats .stat-item');
        if (statItems.length >= 3) {
          const stat1 = statItems[0].querySelector('.stat-num');
          const stat2 = statItems[1].querySelector('.stat-num');
          const stat3 = statItems[2].querySelector('.stat-num');

          const counterObj = { val1: 0, val2: 0, val3: 0 };

          this.ScrollTrigger.create({
            trigger: '.manifesto-stats',
            start: 'top 85%',
            onEnter: () => {
              this.gsap.to(counterObj, {
                val1: 45,
                val2: 28,
                val3: 100,
                duration: 2.0,
                ease: 'power2.out',
                onUpdate: () => {
                  if (stat1) stat1.textContent = `-${Math.round(counterObj.val1)}°C`;
                  if (stat2) stat2.textContent = `${Math.round(counterObj.val2)}k`;
                  if (stat3) stat3.textContent = `${Math.round(counterObj.val3)}%`;
                }
              });
            }
          });
        }

        /* 6. Seção Coleções (Scroll Horizontal Pinado) */
        const horizSection = document.getElementById('horizontal-collections');
        const horizTrack = document.getElementById('horizontal-track-container');
        const horizInner = document.querySelector('.horizontal-track');

        if (horizSection && horizTrack && horizInner) {
          const getScrollWidth = () => -(horizInner.scrollWidth - horizTrack.clientWidth);

          this.gsap.to(horizInner, {
            x: getScrollWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: horizSection,
              start: 'top top',
              end: () => `+=${horizInner.scrollWidth - horizTrack.clientWidth + 200}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true
            }
          });
        }

      });

      /* -------------------------------------------------------------
         4. GRID DE PRODUTOS BATCH REVEAL & GSAP HOVER (ALL SCREENS)
         ------------------------------------------------------------- */
      this.ScrollTrigger.batch('.product-card', {
        interval: 0.1,
        batchMax: 6,
        onEnter: batch => {
          this.gsap.fromTo(batch,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power2.out',
              overwrite: 'auto'
            }
          );
        }
      });

      /* GSAP Hover nas Imagens dos Cards (Crossfade Estúdio -> Lifestyle) */
      document.querySelectorAll('.product-card').forEach(card => {
        const studioImg = card.querySelector('.product-img-studio');
        const lifestyleImg = card.querySelector('.product-img-lifestyle');

        if (studioImg && lifestyleImg) {
          card.addEventListener('mouseenter', () => {
            this.gsap.to(studioImg, { opacity: 0, scale: 1.06, duration: 0.45, ease: 'power2.out' });
            this.gsap.to(lifestyleImg, { opacity: 1, scale: 1.06, duration: 0.45, ease: 'power2.out' });
          });

          card.addEventListener('mouseleave', () => {
            this.gsap.to(studioImg, { opacity: 1, scale: 1.0, duration: 0.45, ease: 'power2.out' });
            this.gsap.to(lifestyleImg, { opacity: 0, scale: 1.0, duration: 0.45, ease: 'power2.out' });
          });
        }
      });

      /* 7. Transições Suaves de Entrada por Seção */
      const sections = document.querySelectorAll('.info-card, .drop2-showcase-section, .subpage-header');
      sections.forEach(sec => {
        this.gsap.fromTo(sec,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    });
  }

  /* Recarrega os gatilhos e escopo nas trocas de rotas SPA */
  refresh() {
    if (this.ScrollTrigger) {
      setTimeout(() => {
        this.ScrollTrigger.refresh();
      }, 150);
    }
  }

  /* Limpeza de memória */
  destroy() {
    if (this.ctx) this.ctx.revert();
    if (this.lenis) this.lenis.destroy();
  }
}
