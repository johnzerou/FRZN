/* ===================================================================
   FRZN - APPLICATION ORCHESTRATOR
   Main entry point connecting state, cursor, transitions, physics & UI
   =================================================================== */

import { store } from './store.js';
import { MagneticCursor } from './cursor.js';
import { SmoothScrollEngine } from './smooth-scroll.js';
import { PageTransitionEngine } from './transitions.js';
import { UIManager } from './ui.js';

class FrznApplication {
  constructor() {
    this.store = store;
    this.init();
  }

  init() {
    // Inicializa UI
    this.ui = new UIManager();

    // Inicializa Motor de Rolagem Física & Parallax
    this.scroll = new SmoothScrollEngine();

    // Inicializa Cursor Magnético Interativo (Desktop)
    this.cursor = new MagneticCursor();

    // Inicializa Transições de Página "Ice Glaze" SPA
    this.transitions = new PageTransitionEngine((newRoute) => {
      this.handleRouteChange(newRoute);
    });

    // Removendo placeholders de carregamento
    this.handleImagesLoaded();

    console.log('%c FRZN™ %c ARCTIC URBANO // ONLINE ', 
      'background: #7A9BB5; color: #0F1620; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
      'background: #0F1620; color: #F5F7FA; border: 1px solid #7A9BB5; padding: 4px 8px; border-radius: 2px;'
    );
  }

  handleRouteChange(route) {
    if (route === 'shop') {
      this.ui.renderProductGrids();
    }
    // Atualiza Intersection Observer para a nova rota
    setTimeout(() => {
      this.scroll.refreshReveal();
    }, 100);
  }

  handleImagesLoaded() {
    // Assegura que o shimmer se desativa à medida que as imagens carregam
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
      }
    });
  }
}

// Inicialização segura após o carregamento da DOM
document.addEventListener('DOMContentLoaded', () => {
  window.frznApp = new FrznApplication();
});
