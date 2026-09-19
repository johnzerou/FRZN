/* ===================================================================
   FRZN - GSAP + SCROLLTRIGGER + DRAGGABLE + LENIS ANIMATION ENGINE
   Editorial Premium Micro-Interactions, 3-Layer Scrub Parallax,
   Pinned Ken Burns (Svalbard), Infinite Marquee, Preloader Curtain,
   Reactive Navbar, Draggable Inertia Gallery & Technical Badges Glow
   =================================================================== */

export class GSAPAnimationEngine {
  constructor() {
    this.gsap = window.gsap;
    this.ScrollTrigger = window.ScrollTrigger;
    this.Draggable = window.Draggable;
    this.Lenis = window.Lenis;
    this.ctx = null;
    this.lenis = null;

    if (!this.gsap || !this.ScrollTrigger) {
      console.warn('FRZN: GSAP ou ScrollTrigger não encontrados no escopo global.');
      return;
    }

    if (this.Draggable) {
      this.gsap.registerPlugin(this.ScrollTrigger, this.Draggable);
    } else {
      this.gsap.registerPlugin(this.ScrollTrigger);
    }

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

  /* Animações completas escopadas via gsap.context() para perfeita gestão de memória */
  initAnimations() {
    if (this.ctx) this.ctx.revert();

    this.ctx = this.gsap.context(() => {
      // 1. Preloader com Logo Mask & Curtain Wipe
      this.initPreloader();

      // 2. Navbar Reativa com ScrollTrigger.toggleClass
      this.initReactiveNavbar();

      // 3. Marquee Infinito com Pausa em Hover
      this.initMarquee();

      const mm = this.gsap.matchMedia();

      /* -------------------------------------------------------------
         DESKTOP & TABLET ANIMATIONS (min-width: 769px)
         ------------------------------------------------------------- */
      mm.add("(min-width: 769px)", () => {
        
        /* Hero (Seção Home) — Parallax Scrub 3 Camadas & Opacidade */
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

          const heroBg = document.querySelector('.hero-parallax-bg');
          if (heroBg) heroTl.to(heroBg, { yPercent: 20, ease: 'none' }, 0);

          const heroFg = document.querySelector('.hero-foreground');
          if (heroFg) heroTl.to(heroFg, { yPercent: 35, opacity: 0.1, ease: 'none' }, 0);

          const stencilLeft = document.querySelector('.stencil-left');
          const stencilRight = document.querySelector('.stencil-right');
          if (stencilLeft) heroTl.to(stencilLeft, { x: -60, y: 50, ease: 'none' }, 0);
          if (stencilRight) heroTl.to(stencilRight, { x: 60, y: -40, ease: 'none' }, 0);

          const heroOverlay = document.querySelector('.hero-gradient-overlay');
          if (heroOverlay) heroTl.to(heroOverlay, { opacity: 0.75, ease: 'none' }, 0);
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

        /* Peça Destaque (Puffer Arctic 01) — Scale Fade */
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

        /* Seção Filosofia / Manifesto Parallax & Count-Up Estatístico */
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

        /* Seção Coleções (Scroll Horizontal Pinado + Draggable com Inércia) */
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

          // Física de inércia via Draggable
          if (this.Draggable) {
            this.Draggable.create(horizInner, {
              type: 'x',
              bounds: horizTrack,
              edgeResistance: 0.8,
              inertia: true,
              cursor: 'grab',
              activeCursor: 'grabbing',
              dragClickables: false
            });
          }
        }

        /* Seção Cinematográfica: Ken Burns Pinado (scale 1.0 -> 1.15) */
        const cinematicSec = document.getElementById('cinematic-expand');
        const cinematicFrame = document.getElementById('cinematic-frame');
        const cinematicMedia = document.getElementById('cinematic-expand-media') || document.getElementById('cinematic-expand-img');
        const cinematicCaption = document.getElementById('cinematic-caption');
        const cinematicOverlay = document.getElementById('cinematic-overlay');

        if (cinematicSec && cinematicFrame && cinematicMedia) {
          const expandTl = this.gsap.timeline({
            scrollTrigger: {
              trigger: cinematicSec,
              start: 'top top',
              end: '+=150%',
              pin: true,
              scrub: 0.8,
              anticipatePin: 1
            }
          });

          expandTl
            .to(cinematicFrame, {
              width: '100vw',
              maxWidth: '100vw',
              height: '100vh',
              borderRadius: 0,
              borderWidth: 0,
              ease: 'none'
            }, 0)
            .fromTo(cinematicMedia,
              { scale: 1.0 },
              { scale: 1.15, ease: 'none' }, // Zoom progressivo contínuo Ken Burns
              0
            )
            .to(cinematicOverlay, {
              opacity: 0.65,
              ease: 'none'
            }, 0.2)
            .to(cinematicCaption, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out'
            }, 0.45);
        }

      });

      /* -------------------------------------------------------------
         RESPONSIVIDADE MOBILE (max-width: 768px)
         ------------------------------------------------------------- */
      mm.add("(max-width: 768px)", () => {
        const cinematicSec = document.getElementById('cinematic-expand');
        const cinematicFrame = document.getElementById('cinematic-frame');
        const cinematicMedia = document.getElementById('cinematic-expand-media') || document.getElementById('cinematic-expand-img');
        const cinematicCaption = document.getElementById('cinematic-caption');

        if (cinematicSec && cinematicFrame && cinematicMedia) {
          const mobileTl = this.gsap.timeline({
            scrollTrigger: {
              trigger: cinematicSec,
              start: 'top top',
              end: '+=100%',
              pin: true,
              scrub: 0.5
            }
          });

          mobileTl
            .to(cinematicFrame, {
              width: '100vw',
              maxWidth: '100vw',
              height: '100vh',
              borderRadius: 0,
              ease: 'none'
            }, 0)
            .fromTo(cinematicMedia,
              { scale: 1.0 },
              { scale: 1.1, ease: 'none' },
              0
            )
            .to(cinematicCaption, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out'
            }, 0.3);
        }
      });

      /* -------------------------------------------------------------
         REVEAL COM CLIP-PATH & BATCH REVEAL (TODAS AS TELAS)
         ------------------------------------------------------------- */
      const clipElements = document.querySelectorAll('.product-media-wrapper, .photo-stack-wrapper, .campaign-card-bg');
      clipElements.forEach(el => {
        this.gsap.fromTo(el,
          { clipPath: 'polygon(0% 12%, 100% 12%, 100% 88%, 0% 88%)', opacity: 0.8 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

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

      /* Badges Técnicos com Micro-interações de Glow / Pulse no Hover */
      const techBadges = document.querySelectorAll('.card-category, .pulse-badge, .spec-item, .cinematic-badge, .subpage-tag, .section-eyebrow');
      techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
          this.gsap.to(badge, {
            scale: 1.04,
            duration: 0.25,
            ease: 'power2.out'
          });
        });
        badge.addEventListener('mouseleave', () => {
          this.gsap.to(badge, {
            scale: 1.0,
            duration: 0.25,
            ease: 'power2.out'
          });
        });
      });

      /* Transições Suaves de Entrada por Seção */
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

  /* Preloader com Reveal do Logo via Clip-path, Barra de Progresso e Curtain Wipe */
  initPreloader() {
    const preloader = document.getElementById('frzn-preloader');
    const curtain = document.getElementById('preloader-curtain');
    const logoSvg = document.getElementById('preloader-logo-svg');
    const counter = document.getElementById('preloader-counter');
    const barFill = document.getElementById('preloader-bar-fill');

    if (!preloader || !curtain) return;

    const pTl = this.gsap.timeline({
      onComplete: () => {
        preloader.style.display = 'none';
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroTitle && heroSubtitle) {
          this.gsap.fromTo([heroTitle, heroSubtitle],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
          );
        }
      }
    });

    const progressObj = { val: 0 };

    pTl
      .fromTo(logoSvg,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0 },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', opacity: 1, duration: 0.85, ease: 'power3.out' }
      )
      .to(progressObj, {
        val: 100,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          const rounded = Math.round(progressObj.val);
          if (counter) counter.textContent = `${rounded}%`;
          if (barFill) barFill.style.width = `${rounded}%`;
        }
      }, '-=0.3')
      .to({}, { duration: 0.12 })
      .to(curtain, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut'
      });
  }

  /* Navbar reativa: ScrollTrigger.toggleClass para encolher altura e escurecer fundo */
  initReactiveNavbar() {
    const header = document.getElementById('site-header');
    if (header) {
      this.ScrollTrigger.create({
        trigger: 'body',
        start: '60px top',
        end: 'max',
        toggleClass: { targets: header, className: 'scrolled' }
      });
    }
  }

  /* Marquee Infinito com Pausa no Hover */
  initMarquee() {
    const marqueeTrack = document.getElementById('marquee-track');
    const marqueeWrap = document.getElementById('frzn-marquee-strip');
    if (marqueeTrack && marqueeWrap) {
      const marqueeTween = this.gsap.to(marqueeTrack, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: 'none'
      });

      marqueeWrap.addEventListener('mouseenter', () => marqueeTween.pause());
      marqueeWrap.addEventListener('mouseleave', () => marqueeTween.play());
    }
  }

  /* Recarrega os gatilhos e escopo nas trocas de rotas SPA */
  refresh() {
    if (this.ScrollTrigger) {
      setTimeout(() => {
        this.ScrollTrigger.refresh();
      }, 150);
    }
  }

  /* Limpeza rigorosa de memória no desmonte */
  destroy() {
    if (this.ctx) this.ctx.revert();
    if (this.lenis) this.lenis.destroy();
  }
}
