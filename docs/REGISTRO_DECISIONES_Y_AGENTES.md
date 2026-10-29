# Registro de Decisiones de Arquitectura y Asignación Rigurosa de Agentes (Sin Solapamientos)

> **Ecosistema:** G-evo Digital Hub  
> **Propósito:** Garantizar la estabilidad del proyecto, la integridad de los datos multi-tenant y evitar errores de asignación o solapamiento entre áreas técnicas.

---

## 1. Estructura Organizada de Agentes en el Repositorio

Para mantener el orden, evitar conflictos y permitir que la IA trabaje de forma modular, todos los agentes operan desde archivos independientes dentro de la carpeta `.agents/` bajo la siguiente estructura jerárquica:

```plaintext
G-evo/
└── .agents/
    ├── 00-orchestrator.md
    ├── 01-architect.md
    ├── 02-frontend-nextjs.md
    ├── 03-backend-dotnet.md
    ├── 04-db-sql.md
    ├── 05-secops-agent.md
    ├── 06-seo-performance.md
    ├── 07-ux-ui-audit.md
    ├── 08-growth-marketing.md
    ├── 09-release-manager.md
    ├── 10-test-writer.md
    ├── 11-esharp-cleaner.md
    ├── 12-doc-generator.md
    ├── 13-infra-terraform.md
    ├── 14-user-docs.md
    └── 15-agente-legal.md
```

---

## 2. Matriz de Responsabilidades y Límites Estrictos

Para garantizar que ningún agente interfiera en el dominio técnico de otro, las responsabilidades y restricciones de cada archivo quedan formalmente fijadas:

| Rol / Archivo de Agente | Responsabilidades Específicas | Limitaciones Estrictas (Qué NO debe hacer para evitar errores) |
| :--- | :--- | :--- |
| **`00-orchestrator.md`** | Coordinar el flujo operativo, recibir requerimientos y asignar tareas en orden secuencial a los demás agentes. | **NO** escribe código de desarrollo directo ni toma decisiones de diseño arquitectónico por sí solo. |
| **`01-architect.md`** | Diseñar la estructura general, flujos de datos multi-tenant y la comunicación global del sistema. | **NO** escribe código de producción ni configura servidores directamente. |
| **`02-frontend-nextjs.md`** | Desarrollar la interfaz visual de la web principal, el mostrario, el panel de admin y el panel de clientes en Next.js siguiendo la guía visual exacta. | **NO** manipula la lógica de bases de datos ni diseña esquemas SQL. |
| **`03-backend-dotnet.md`** | Construir la API central en .NET, la lógica de autenticación (login), los permisos por roles y la gestión de endpoints. | **NO** interviene en el diseño visual ni en las hojas de estilo del frontend. |
| **`04-db-sql.md`** | Diseñar, optimizar y asegurar el esquema de la base de datos relacional garantizando el aislamiento de datos por cliente. | **NO** escribe lógica de negocio ni controladores de API. |
| **`05-secops-agent.md`** | Auditar de forma preventiva la seguridad del código, tokens JWT y protección de datos sensibles. | **NO** modifica directamente la lógica de interfaz de usuario ni componentes gráficos. |
| **`06-seo-performance.md`** | Optimizar tiempos de carga en Next.js, compresión de imágenes y metadatos para buscadores. | **NO** altera reglas de negocio de los endpoints de backend ni la base de datos. |
| **`07-ux-ui-audit.md`** | Evaluar la accesibilidad, contraste y fluidez responsiva (Mobile-First) en todas las pantallas. | **NO** escribe código de programación de APIs ni consultas SQL. |
| **`08-growth-marketing.md`** | Optimizar copys persuasivos, llamadas a la acción (CTA) y estructura de conversión en la web principal. | **NO** modifica configuraciones de infraestructura ni despliegues en servidores. |
| **`09-release-manager.md`** | Controlar el versionado (Git), registros de cambios y flujos de actualización a producción sin romper tiendas activas. | **NO** altera código fuente de componentes ni escribe lógica de controladores. |
| **`10-test-writer.md`** | Escribir y ejecutar pruebas unitarias (backend) y pruebas de extremo a extremo (E2E para flujos de login y catálogos). | **NO** modifica código fuente de producción directamente; solo reporta y valida fallos. |
| **`11-esharp-cleaner.md`** | Revisar la calidad estática del código, refactorizar malas prácticas y aplicar estándares limpios en .NET y Frontend. | **NO** añade nuevas funcionalidades de negocio, solo optimiza lo existente. |
| **`12-doc-generator.md`** | Mantener documentados los endpoints de la API y las guías técnicas del código mediante Swagger/OpenAPI. | **NO** documenta manuales comerciales para usuarios finales. |
| **`13-infra-terraform.md`** | Automatizar el despliegue de infraestructura en la nube (IaC), contenedores Docker y certificados SSL. | **NO** modifica el código fuente de la aplicación ni interviene en el diseño visual. |
| **`14-user-docs.md`** | Redactar exclusivamente los manuales paso a paso para los clientes finales sobre cómo usar su panel de administración. | **NO** redacta documentación interna de arquitectura técnica ni código. |
| **`15-agente-legal.md`** | Velar por el cumplimiento normativo en protección de datos (Habeas Data/GDPR), pasarelas de pago y términos legales de los e-commerce. | **NO** toma decisiones de diseño técnico ni de infraestructura de servidores. |

---

## 3. Registro de Decisiones de Arquitectura (ADR)

### ADR-001: Aislamiento Estricto de Datos Multi-Tenant
* **Decisión:** Implementar aislamiento por columna `tenant_id` respaldado por Global Query Filters en Entity Framework Core y middleware de resolución en ASP.NET Core (`TenantResolutionMiddleware`).
* **Motivo:** Evitar que un cliente de catálogo pueda consultar, modificar o filtrar información de otro cliente, garantizando confidencialidad absoluta sin el costo de aprovisionar una base de datos física independiente por cada cliente pequeño.
* **Límite:** La responsabilidad de los índices y constraints es de `04-db-sql.md`; la inyección y validación del token JWT pertenece a `03-backend-dotnet.md`.

### ADR-002: Creación Centralizada vs. Autonomía de Gestión
* **Decisión:** La creación de tiendas, vinculación de dominios y emisión de tarjetas inteligentes queda restringida **únicamente al Administrador Maestro** de G-evo desde el panel maestro (`/admin`).
* **Motivo:** Asegura el control de calidad, preserva el modelo de negocio B2B y previene el spam o creación de tiendas no autorizadas.
* **Límite:** El cliente final sólo gestiona autónomamente su inventario (productos, precios, fotos, descripciones) una vez que el SuperAdmin le entrega credenciales de acceso.

### ADR-003: Monetización del Agente de Soporte IA mediante Códigos Criptográficos
* **Decisión:** El Agente de Soporte IA 24/7 opera en modo demostración gratuita al inicio. Su activación permanente se desbloquea mediante un código criptográfico único e intransferible emitido por el Administrador Maestro tras verificar el pago del cliente.
* **Estructura del Código:** `GEVO-{SLUG}-{MOD}-{CHECKSUM}` con hash seguro SHA-256 (`LicenseService`).
* **Límite:** La emisión pertenece al SuperAdmin; la activación pertenece al cliente en su panel; la validación pertenece a `03-backend-dotnet.md`.

### ADR-004: Frontend Desacoplado en Next.js con Tailwind CSS
* **Decisión:** Utilizar Next.js con App Router y Tailwind CSS bajo principios Mobile-First para lograr velocidad de carga ultra-rápida, animaciones fluidas, renderizado optimizado y modularidad total en componentes.
* **Límite:** `02-frontend-nextjs.md` solo consume endpoints REST/JSON definidos y no escribe queries directas a la base de datos.
