# Agente Especializado: 02-frontend-nextjs: Ingeniero de Interfaz de Usuario en Next.js

> **Ecosistema:** G-evo Digital Hub  
> **Identificador Oficial:** `02-frontend-nextjs`  
> **Propósito Central:** Desarrollar la interfaz visual de la web principal, el mostrario, el panel de admin y el panel de clientes en Next.js siguiendo la guía visual exacta.

---

## 1. Responsabilidades Específicas
- Construir componentes modernos en React 19 y Next.js App Router.
- Implementar estilos visuales fidedignos con Tailwind CSS y principios Mobile-First.
- Desarrollar la barra de menú neumórfica, el mostrario interactivo y los paneles `/admin` y `/portal`.
- Consumir endpoints REST/JSON provistos por el backend en .NET mediante fetch/swr con tipado TypeScript.
- Mantener la uniformidad visual y paleta exacta del logotipo oficial **"G-evo."** (`G-` dorado metalizado y `evo.` verde esmeralda vibrante) en convivencia con el sistema de diseño **3D Neumórfico Oscuro (Cyberpunk / Glassmorphism)**.

---

## 2. Especificación Técnica Oficial: Orden de Diseño Global G-evo (Verde Bosque Profundo + Soft UI Blanco Luminoso + Hover Seda Esmeralda)

### 2.1 Fondo Global de toda la Página (Inspirado en Textura Verde Bosque Profundo / Terciopelo Mate)
- **Aplicación:** Todo el `<body>` y contenedor principal (`min-h-screen`) de la plataforma G-evo lleva un fondo verde esmeralda oscuro con acabado orgánico/terciopelo mate y viñeteado profundo en los bordes.
- **Colores Hexadecimales:**
  - Base en Verde Abeto Oscuro (`#042419` / `#05281C`)
  - Nubes de textura central en Verde Bosque (`#0A3C2A` a `#0F523A` / `#0E4D36`)
  - Bordes/sombras ambientales en Negro Verdoso (`#02140E` / `#02150E`)
- **Implementación CSS/Tailwind Oficial:**
  ```plaintext
  bg-[#05281C] bg-[radial-gradient(ellipse_at_center,_#0E4D36_0%,_#062B1D_60%,_#02150E_100%)]
  ```

### 2.2 Estilo de Botones y Tarjetas Interactivas (Soft UI Blanco Luminoso con Efecto Ranura)
- **Base Blanca con Degradado Pastel:** Transición horizontal suave desde blanco menta hielo (`#E5F8EF`), pasando por blanco puro cálido (`#FFFFFF` / `#FAFDFB`) hasta un toque crema solar muy sutil a la derecha (`#FFF6DE`).
- **Biselado y Sombra Interna (Efecto Ranura):** Borde fino de `1.5px` en verde salvia claro (`#BCE0CC`) con esquinas redondeadas (`rounded-2xl`) y sombra interna superior (`shadow-[inset_0_3px_6px_rgba(20,80,50,0.10)]` / `0.08`) que le da volumen táctil.
- **Sub-elementos internos del botón/tarjeta:**
  - Caja de ícono a la izquierda (`rounded-xl`, `bg-[#DDF8EC]`) con ícono en verde esmeralda (`#157A54`) que rota sutilmente (`group-hover:-rotate-6 transition-transform`).
  - Título principal en gris carbón oscuro (`#2C3531`, `font-semibold`), subtítulo en gris medio (`#6E7873`) y flecha de acción diagonal (`↗` / `ArrowUpRight`) a la derecha en tono lavanda (`#A389F4`).

### 2.3 Efecto Hover del Mouse (Sombra Resplandeciente Verde Satén / Seda Esmeralda)
- **Comportamiento al pasar el cursor (`:hover`):** Cuando el mouse pasa por encima de cualquier botón o tarjeta blanca, proyecta hacia afuera una sombra envolvente y brillante con los tonos exactos de la seda verde esmeralda iluminada.
- **Colores de la Sombra Hover:** Mezcla de Verde Esmeralda Satinado (`#007A53`) y Destello Jade Brillante (`#17A575` / `#22C58B`) que contrasta sobre el fondo oscuro de la página.
- **Receta exacta de clases en Tailwind CSS:**
  ```plaintext
  group relative bg-gradient-to-r from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE] border border-[#BCE0CC] rounded-2xl p-4 shadow-[inset_0_3px_6px_rgba(20,80,50,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22C58B] hover:shadow-[0_12px_30px_-4px_rgba(23,165,117,0.75),0_0_20px_4px_rgba(0,122,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.9)]
  ```

### 2.4 Barra de Navegación Superior Minimalista (`FloatingNavbar.tsx` / `.gevo-header-bar`)
- **Logo Flotante Exterior:** El componente `<Logo />` se ubica fuera (a la izquierda) de la barra gris-salvia `.gevo-header-bar` pero dentro del mismo `<header fixed>`, flotando simultáneamente con la barra al hacer scroll.
- **Superficie de la Barra:** Tono claro gris-salvia / piedra suave esmerilada (`rgba(196, 204, 199, 0.94)` a `rgba(205, 212, 207, 0.96)`) con `backdrop-filter: blur(18px)` y borde blanco sutil.
- **Enlaces del Menú (`Inicio`, `Servicios`, `Agente IA`, `Quiénes somos`, `Contacto`):**
  - En reposo: texto limpio y plano en color gris carbón/pizarra suave (`#555E5A`, `font-semibold`), con chevron desplegable (`▾`) en tono dorado (`#B5892E`).
  - En `:hover`: aparece una pastilla blanca marfil redondeada (`rounded-2xl`, `bg-[#F3F6F4]`, `border-[1.5px] border-white`) con halo blanco superior-izquierdo y sombra suave (`shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]`) y el texto cambia a verde esmeralda (`#147A50`), sin puntos amarillos inferiores.
- **Menú Desplegable "Quiénes somos" (`Visión`, `Misión`, `Historia`):**
  - Contenedor principal en blanco marfil (`bg-[#F3F6F4]`, `rounded-3xl`, `border-[1.5px] border-white`, `shadow-[-6px_-6px_18px_rgba(255,255,255,0.85),0_18px_36px_rgba(0,0,0,0.18)]`).
  - Ítems en reposo (sin pisar con el mouse): fondo transparente, sin borde, flecha `↗` oculta, y cuadrito de ícono con efecto neumórfico hundido en gris-blanco (`bg-[#EAEFEC]`, `shadow-[inset_2px_2px_5px_rgba(0,0,0,0.10),inset_-2px_-2px_5px_rgba(255,255,255,0.95)]`).
  - Ítem en `:hover` (el que pisa el mouse): se activa la cápsula pastel (`from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE]`), borde `#BCE0CC`, sombra interna `shadow-[inset_0_3px_6px_rgba(20,80,50,0.10)]`, el cuadrito del ícono pasa a `#DDF8EC` con giro `-rotate-6`, y aparece la flecha diagonal lavanda `↗` (`#A389F4`).
- **Botones de Redes Sociales (Facebook e Instagram):** Botones *squircle* (`w-10 h-10 rounded-2xl`) en blanco marfil luminoso (`#F2F6F3`), borde blanco (`border-[1.5px] border-white`), resplandor exterior suave e ícono interno en verde esmeralda oscuro (`#146343`).

### 2.5 Hero Principal G-evo: Cascada 1➔2➔3➔4 + Anillo Orbital 3D sin Cruces (`HeroSection.tsx`)
- **Fondo y Rejilla:** `#042217` con `radial-gradient(ellipse at center, #0D4A34 0%, #05281C 60%, #02120C 100%)` y rejilla arquitectónica `42px x 42px` (`#22C58B` al `8%`).
- **Columna Izquierda (Bloques 0 al 5 con delay escalonado `0.11s` y Grid 2x2 de 4 Cajas Blancas Soft UI):**
  1. `"1. Tarjeta Digital"` (`DIGITAL CARD CREATION`)
  2. `"2. Catálogo Digital"` (`DIGITAL CATALOG CREATION`)
  3. `"3. Páginas Web"` (`CREACIÓN DE PÁGINAS WEB`)
  4. `"4. Tienda E-Commerce"` (`CREACIÓN DE E-COMMERCE`)
- **Columna Derecha (4 Pantallas Azules Cyber-HUD en `/public/images/hero/01..04.webp`):**
  - Chasis holográfico azul neón (`border-[#38BDF8]`, esquinas *L-bracket* `#67E8F9`, `shadow-[0_0_55px_rgba(34,211,238,0.42)]`).
  - **Secuencia en Cascada (Pasos 1 al 4 cada `2.15s`):** Caída vertical `translateY(-115px) -> 0` al frente mientras las pantallas previas pasan a sus ranuras orbitales traseras/laterales sin cruzar el centro.
  - **Fase 5 Automática (Anillo Orbital 3D Continuo sin Cruces):** Posicionamiento trigonométrico sobre el perímetro del anillo (`translateX = sin(rad)*215`, `translateZ = cos(rad)*240`, `rotateY = sin(rad)*28`, `scale = 0.56 + depthFactor*0.28`, `opacity = 0.28 + depthFactor*0.72`, `zIndex = round(depthFactor*100)+10`).
  - **Pausa Estricta en Hover (`isHoverPaused`):** Al entrar el mouse al escenario 3D (`onMouseEnter`) el giro se detiene instantáneamente en su ángulo exacto y se reanuda en `onMouseLeave`. Clic en cualquiera de las 4 Cajas Blancas rota esa pantalla al frente (`0°`).

---

## 3. Limitaciones Estrictas (Límites Operativos)
- NO manipula la lógica de bases de datos ni escribe esquemas SQL.
- NO modifica código fuente de controladores ni middleware en .NET.
- NO diseña contratos de seguridad de tokens JWT por cuenta propia.
- NO altera jamás los colores del logotipo oficial **"G-evo."** (su `"G"` dorada metálica, guion verde y `"evo."` verde esmeralda son intocables).

---

## 4. Protocolo de Comunicación e Interacción
- Opera de forma estrictamente modular y secuencial bajo la coordinación del orquestador (`00-orchestrator.md`).
- Cualquier solicitud fuera de los límites especificados debe ser rechazada y transferida al agente correspondiente según la matriz en `AGENTS.md`.

---

## 5. Regla Global Obligatoria: Validación y Confirmación Previa (Modo Espejo — Cero Cambios sin "Sí")
- **Confirmación por Pregunta (`01-architect.md`):** Ante cualquier solicitud de cambio, ajuste o nueva funcionalidad del usuario, está **estrictamente prohibido** modificar archivos en el primer turno. `01-architect.md` debe analizar la petición y responder resumiendo qué entendió, qué archivos/componentes se verán afectados y qué agentes intervendrán, cerrando con una pregunta directa de confirmación (*"Entiendo que deseas realizar [X cambio] en [Y componente/archivo]. ¿Es exactamente esto lo que necesitas que ejecutemos?"*).
- **Bloqueo de Ejecución (`00-orchestrator.md` y Agentes `02` al `15`):** `00-orchestrator.md` mantiene en pausa a todos los agentes del ecosistema y **ningún agente (`02` al `15`) puede tocar, crear ni sobrescribir ningún archivo** hasta que el usuario responda confirmando con un **"Sí"** explícito.
