/* ===================================================================
   FRZN - MAGNETIC CURSOR REFINED (ALTA PRECISÃO & FLUIDEZ)
   Resposta instantânea, lag físico calibrado (lerp 0.28), clique tátil
   e labels dinâmicos em Português sem conflito com o cursor nativo
   =================================================================== */

export class MagneticCursor {
  constructor() {
    this.isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (this.isTouch) {
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    this.dot = document.getElementById('frzn-cursor-dot');
    this.ring = document.getElementById('frzn-cursor-ring');
    this.label = this.ring ? this.ring.querySelector('.cursor-label') : null;

    if (!this.dot || !this.ring) return;

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.lerpFactor = 0.28; // Mais ágil e responsivo, sem sensação de arrasto lento
    this.isActive = false;

    // Ativa classe para ocultar cursor nativo apenas em desktop
    document.body.classList.add('custom-cursor-enabled');

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      if (!this.isActive) {
        this.isActive = true;
        this.dot.style.opacity = '1';
        this.ring.style.opacity = '1';
      }

      // O ponto central segue o cursor com latência zero
      this.dot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    // Efeito tátil de clique (contração e expansão)
    window.addEventListener('mousedown', () => {
      this.ring.classList.add('cursor-clicking');
    });

    window.addEventListener('mouseup', () => {
      this.ring.classList.remove('cursor-clicking');
    });

    document.addEventListener('mouseleave', () => {
      this.dot.style.opacity = '0';
      this.ring.style.opacity = '0';
      this.isActive = false;
    });

    document.addEventListener('mouseenter', () => {
      if (this.isActive) {
        this.dot.style.opacity = '1';
        this.ring.style.opacity = '1';
      }
    });

    this.bindHoverListeners();
    this.render();
  }

  render() {
    // Interpolação suave e ágil
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * this.lerpFactor;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * this.lerpFactor;

    this.ring.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(() => this.render());
  }

  bindHoverListeners() {
    document.addEventListener('mouseover', (e) => {
      const interactiveEl = e.target.closest(
        'a, button, .product-card, .thumb-btn, [data-cursor-label], input'
      );

      if (interactiveEl) {
        let labelText = interactiveEl.getAttribute('data-cursor-label');

        if (!labelText) {
          if (interactiveEl.classList.contains('product-card') || interactiveEl.closest('.product-card')) {
            labelText = 'VER';
          } else if (interactiveEl.classList.contains('cta-pill-btn')) {
            labelText = 'EXPLORAR';
          } else if (interactiveEl.classList.contains('product-quick-add')) {
            labelText = '+ SACOLA';
          } else if (interactiveEl.classList.contains('btn-add-hero')) {
            labelText = 'COMPRAR';
          } else if (interactiveEl.classList.contains('close-btn')) {
            labelText = 'FECHAR';
          } else if (interactiveEl.tagName === 'A') {
            labelText = 'ABRIR';
          } else if (interactiveEl.tagName === 'BUTTON') {
            labelText = 'ESCOLHER';
          } else {
            labelText = '';
          }
        }

        this.expand(labelText);
      }
    });

    document.addEventListener('mouseout', (e) => {
      const interactiveEl = e.target.closest(
        'a, button, .product-card, .thumb-btn, [data-cursor-label], input'
      );
      if (interactiveEl) {
        this.collapse();
      }
    });
  }

  expand(labelText = '') {
    this.ring.classList.add('cursor-expanded');
    if (this.label) {
      this.label.textContent = labelText;
    }
  }

  collapse() {
    this.ring.classList.remove('cursor-expanded');
    if (this.label) {
      this.label.textContent = '';
    }
  }
}
