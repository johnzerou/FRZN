# FRZN™ — Arctic Urbano E-Commerce

> E-Commerce premium de vestuário técnico de inverno e streetwear de luxo. A convergência do minimalismo alpino com a cultura de rua subterrânea de Berlim e Tóquio.

---

## 🧊 Visão Geral

- **Conceito:** Arctic Urbano (Alpine Minimalism meets Underground Streetwear)
- **Paleta de Cores Estrita:** Ice Blue (`#7A9BB5`), Deep Navy (`#0F1620`), Ice White (`#F5F7FA`), Absolute White (`#FFFFFF`) e Slate Grey (`#3E4E5C`)
- **Tipografia:** Archivo Black, Space Grotesk, Inter e JetBrains Mono

---

## ⚡ Tecnologias & Arquitetura

- **Core:** HTML5 Semântico, CSS3 Moderno com Design Tokens e ES Modules JavaScript
- **Transição SPA ("Ice Glaze"):** Transições assíncronas de rota sem recarregamento com efeito visual de congelamento/descongelamento
- **Scroll & Parallax:** Motor de rolagem física suave com fator lerp 0.08 e camadas em profundidade
- **Microinterações:**
  - Zoom progressivo em cards de produtos (`scale(1.08)` em 750ms com curva cúbica)
  - Crossfade instantâneo de fotos de estúdio para lookbook urbano
  - Deslocamento de UI (*Quick Add* subindo da base do card)
  - Cursor magnético com física de lerp 0.28, blend-mode invertido e labels dinâmicos
- **Funcionalidades de E-Commerce:**
  - Modal de detalhes completos de produtos com galeria de imagens
  - Sacola lateral retrátil (*Cart Drawer*) com cálculo de subtotal em Reais (R$)
  - Filtro dinâmico com reflow coordenado
  - Busca instantânea no catálogo

---

## 🚀 Como Executar Localmente

Você pode rodar um servidor HTTP local simples:

```bash
# Com Python 3
python -m http.server 8080

# Ou com Node.js (npx serve)
npx serve . -p 8080
```

Abra no navegador em `http://localhost:8080`.

---

© 2026 FRZN ARCTIC URBANO AG.
