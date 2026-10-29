# Registro de Decisiones de Arquitectura y Asignación Rigurosa de Agentes (Sin Solapamientos)

> **Ecosistema:** G-evo Digital Hub  
> **Ubicación Principal en el Repositorio:** [`AGENTS.md`](file:///c:/Users/carlo/G-evo/AGENTS.md)

---

## Matriz Oficial de Responsabilidades y Límites

| Rol / Agente | Responsabilidades Específicas | Limitaciones Estrictas (Qué NO debe hacer para evitar errores) |
| :--- | :--- | :--- |
| **`arquitecto`** | Diseñar la estructura general, flujos de datos multi-tenant y la comunicación global del sistema. | **NO** escribe código de producción ni configura servidores directamente. |
| **`frontend-nextjs`** | Desarrollar la interfaz visual de la web principal, el mostrario, el panel de admin y el panel de clientes en Next.js siguiendo la guía visual exacta. | **NO** manipula la lógica de bases de datos ni diseña esquemas SQL. |
| **`backend-dotnet`** | Construir la API central en .NET, la lógica de autenticación (login), los permisos por roles y la gestión de endpoints. | **NO** interviene en el diseño visual ni en las hojas de estilo del frontend. |
| **`db-sql`** | Diseñar, optimizar y asegurar el esquema de la base de datos relacional garantizando el aislamiento de datos por cliente. | **NO** escribe lógica de negocio ni controladores de API. |
| **`test-writer`** | Escribir y ejecutar pruebas unitarias (backend) y pruebas de extremo a extremo (E2E para flujos de login y catálogos). | **NO** modifica código fuente de producción directamente; solo reporta y valida fallos. |
| **`esharp-cleaner`** | Revisar la calidad estática del código, refactorizar malas prácticas y aplicar estándares limpios en .NET y Frontend. | **NO** añade nuevas funcionalidades de negocio, solo optimiza lo existente. |
| **`doc-generator`** | Mantener documentados los endpoints de la API y las guías técnicas del código. | **NO** documenta manuales comerciales para usuarios finales. |
| **`infra-terraform`** | Automatizar el despliegue de infraestructura en la nube (IaC), contenedores Docker y certificados SSL. | **NO** modifica el código de la aplicación ni interviene en la interfaz de usuario. |
| **`user-docs`** | Redactar exclusivamente los manuales paso a paso para los clientes finales sobre cómo usar su panel de administración. | **NO** redacta documentación interna de arquitectura técnica. |
| **`agente-legal`** | Velar por el cumplimiento normativo en protección de datos (Habeas Data/GDPR), pasarelas de pago y términos legales de los e-commerce. | **NO** toma decisiones de diseño técnico ni de infraestructura de servidores. |

