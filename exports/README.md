# 🏭 G-evo Digital Hub — Fábrica de Proyectos Exportables (`Standalone Export` — ADR-006)

Esta carpeta aloja todas las **Páginas Web** y **Tiendas en Línea (E-commerce)** construidas para clientes de **G-evo** bajo el modelo **100% Independiente y Autónomo (`Standalone Export`)**.

---

## 1. Separación Estricta de Modelos (Interno vs. Exportable)

| Tipo de Solución | Modelo de Operación | Ubicación en el Repositorio |
| :--- | :--- | :--- |
| **Tarjetas Digitales (`/t/[slug]`) y Catálogos Digitales** | **Interno (Multi-Tenant G-evo)** | `frontend/src/app/t/[slug]` + Control desde `/admin` y `/portal` |
| **Páginas Web y Tiendas en Línea (E-commerce)** | **Exportable Independiente (Standalone)** | `exports/[nombre-del-cliente]/` |

---

## 2. Estructura Estándar de Cada Proyecto Exportable

Cada carpeta `exports/[nombre-del-cliente]/` es un proyecto completo que puede comprimirse en `.zip` o subirse a un hosting/dominio externo sin depender del servidor central de G-evo:

```plaintext
exports/
└── [nombre-del-cliente]/
    ├── package.json              # Dependencias y scripts propios (dev, build, start)
    ├── next.config.mjs           # Configurado con output: 'export' o build autónomo
    ├── tsconfig.json             # Tipado TypeScript independiente
    ├── public/                   # Imágenes, íconos y activos propios del cliente
    ├── src/
    │   ├── app/                  # Páginas, estilos y rutas del cliente
    │   └── components/
    │       ├── GevoOfficialSeal.tsx     # Sello oficial de respaldo G-evo en el Footer
    │       └── CookieConsentBanner.tsx  # Banner flotante de Aviso de Cookies y Habeas Data
    └── README_DEPLOY.md          # Guía paso a paso para subir a hosting/dominio externo
```

---

## 3. Sello de Respaldo Oficial Obligatorio en el Footer (`@02-frontend-nextjs.md`)

Toda Página Web o Tienda E-commerce exportada debe incluir en su Footer el sello oficial con los colores exactos de nuestra marca (`G-` dorado metálico `#D4AF37`/`#F5BE18` y `evo.` verde esmeralda `#10B981`/`#22C55E`):

```tsx
{/* Sello Oficial de Respaldo Obligatorio G-evo (ADR-006) */}
<div className="pt-4 border-t border-white/10 text-center text-xs text-gray-400">
  <a
    href="https://g-evo.com"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
  >
    <span>Página Web / Tienda E-commerce • Creada y respaldada por</span>
    <span className="font-extrabold tracking-tight">
      <span
        style={{
          background: 'linear-gradient(135deg, #FFF3B0 0%, #F5BE18 25%, #D4AF37 60%, #996515 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        G-
      </span>
      <span
        style={{
          background: 'linear-gradient(135deg, #A7F3D0 0%, #22C55E 30%, #10B981 70%, #059669 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        evo.
      </span>
    </span>
  </a>
</div>
```

---

## 4. Banner Flotante de Aviso de Cookies y Enlaces Legales en Exportables (`@15-agente-legal.md` y `@02-frontend-nextjs.md`)

Toda Página Web (`serviceType="web"`) o Tienda en Línea (`serviceType="ecommerce"`) exportada debe incluir el banner flotante inferior de **Aviso de Cookies** (`CookieConsentBanner.tsx`) y enlazar en su pie de página o flujo de compra a:
- **Términos específicos del caso:** `/docs/terminos-pagina-web.pdf` o `/docs/terminos-tienda-ecommerce.pdf`
- **Política de Privacidad y Habeas Data:** `/docs/politica-privacidad-habeas-data.pdf`
- **Política de Cookies:** `/docs/politica-de-cookies.pdf`
