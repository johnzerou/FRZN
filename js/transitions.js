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

    if (!this.overlay) {
      this.executeRouteSwitch(route);
      this.isTransitioning = false;
      return;
    }

    // FASE 1: Fade-out / Dissolve da rota atual (0ms a 250ms cubic-bezier(0.25, 1, 0.5, 1))
    this.overlay.className = '';
    // Força reflow
    void this.overlay.offsetWidth;
    this.overlay.classList.add('glaze-freezing');

    // Ao atingir 250ms, altera a visão DOM e inicia o fade-in / mount
    setTimeout(() => {
      this.executeRouteSwitch(route);
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (pushState) {
        history.pushState({ route }, '', `#${route}`);
      }

      // FASE 2: Fade-in / Mount da nova rota (250ms a 550ms = 300ms de duração)
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
