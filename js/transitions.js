/* ===================================================================
   FRZN - ICE GLAZE PAGE TRANSITION ENGINE
   SPA Routing without reload, Freezing & Thawing Curve:
   Freeze In: 0-300ms cubic-bezier(0.16, 1, 0.3, 1), blur(0) -> blur(20px)
   Thaw Out: 300-650ms, blur(20px) -> blur(0) with opacity fade-out
   =================================================================== */

export class PageTransitionEngine {
  constructor(onRouteChange) {
    this.overlay = document.getElementById('ice-glaze-overlay');
    this.currentRoute = 'home';
    this.isTransitioning = false;
    this.onRouteChange = onRouteChange;

    this.init();
  }

  init() {
    // Intercepta cliques de navegação interna
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        if (route && route !== this.currentRoute) {
          this.navigateTo(route);
        }
      }
    });

    // Suporte aos botões voltar/avançar do navegador
    window.addEventListener('popstate', (e) => {
      const route = e.state?.route || 'home';
      this.navigateTo(route, false);
    });

    // Registra o estado inicial no histórico
    history.replaceState({ route: 'home' }, '', window.location.pathname);
  }

  navigateTo(route, pushState = true) {
    if (this.isTransitioning || route === this.currentRoute) return;
    this.isTransitioning = true;

    const curtain = document.getElementById('frzn-page-curtain');

    // Transição de página tipo cortina sólida Navy via GSAP Timeline
    if (window.gsap && curtain) {
      const tl = window.gsap.timeline({
        onComplete: () => {
          this.isTransitioning = false;
        }
      });

      tl.set(curtain, { display: 'block', yPercent: 100 })
        .to(curtain, {
          yPercent: 0,
          duration: 0.45,
          ease: 'power3.inOut'
        })
        .call(() => {
          this.executeRouteSwitch(route);
          window.scrollTo({ top: 0, behavior: 'instant' });
          if (pushState) {
            history.pushState({ route }, '', `#${route}`);
          }
        })
        .to(curtain, {
          yPercent: -100,
          duration: 0.45,
          ease: 'power3.inOut'
        })
        .set(curtain, { display: 'none', yPercent: 100 });
      return;
    }

    if (!this.overlay) {
      this.executeRouteSwitch(route);
      this.isTransitioning = false;
      return;
    }

    // Fallback CSS Glaze
    this.overlay.className = '';
    void this.overlay.offsetWidth;
    this.overlay.classList.add('glaze-freezing');

    setTimeout(() => {
      this.executeRouteSwitch(route);
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (pushState) {
        history.pushState({ route }, '', `#${route}`);
      }

      this.overlay.classList.remove('glaze-freezing');
      this.overlay.classList.add('glaze-thawing');

      setTimeout(() => {
        this.overlay.classList.remove('glaze-thawing');
        this.isTransitioning = false;
      }, 300);
    }, 250);
  }

  executeRouteSwitch(route) {
    this.currentRoute = route;

    // Atualiza links de navegação ativos
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      if (link.getAttribute('data-route') === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Atualiza visualizações
    document.querySelectorAll('.spa-view').forEach(view => {
      if (view.getAttribute('data-view') === route) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    if (this.onRouteChange) {
      this.onRouteChange(route);
    }
  }
}
