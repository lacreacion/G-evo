# G-evo: Especificación Técnica de APIs (OpenAPI / Swagger)

> **Versión:** 1.0.0  
> **Host Base:** `https://api.g-evo.com` o `http://localhost:5000/api`  
> **Autenticación:** Bearer JWT Token (`Authorization: Bearer <token>`)

---

## 1. Headers Globales de Aislamiento Multi-Tenant

| Header | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `Authorization` | String | Sí (en endpoints protegidos) | Formato: `Bearer <jwt_token>`. Contiene claims: `sub`, `role` (`SuperAdmin` o `BusinessOwner`), `tenant_id`. |
| `X-Tenant-ID` | UUID | Opcional | Identificador explícito del inquilino. Solo el Super Administrador puede especificarlo para consultar inquilinos de terceros. |
| `Content-Type` | String | Sí | `application/json` |

---

## 2. Endpoints de Autenticación (`/api/auth`)

### `POST /api/auth/login`
Autentica tanto al Administrador Maestro como a los Clientes de Negocio.

#### Request Body:
```json
{
  "email": "cliente@laurarestrepo.com",
  "password": "PasswordSeguro2026!",
  "role": "BusinessOwner"
}
```

#### Response (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_string",
  "role": "BusinessOwner",
  "tenantId": "11111111-1111-1111-1111-111111111111",
  "fullName": "Laura Restrepo",
  "email": "cliente@laurarestrepo.com"
}
```

---

## 3. Endpoints del Administrador Principal (`/api/tenants`)
> **Permisos:** Requiere rol `SuperAdmin`.

### `POST /api/tenants`
Crea una nueva tienda/tarjeta digital y genera automáticamente las credenciales temporales del cliente.

#### Request Body:
```json
{
  "slug": "laura-restrepo",
  "businessName": "Laura Restrepo | Branding & Estrategia",
  "slogan": "Diseño y posicionamiento de marcas de alto impacto",
  "clientName": "Laura Restrepo",
  "clientEmail": "cliente@laurarestrepo.com",
  "phoneWhatsapp": "+573124567890",
  "primaryColor": "#10B981",
  "secondaryColor": "#D4AF37",
  "category": "Consultoría y Marca Personal"
}
```

#### Response (201 Created):
```json
{
  "tenantId": "11111111-1111-1111-1111-111111111111",
  "slug": "laura-restrepo",
  "businessName": "Laura Restrepo | Branding & Estrategia",
  "credentials": {
    "email": "cliente@laurarestrepo.com",
    "temporaryPassword": "Gevo7291!",
    "portalUrl": "https://g-evo.com/login"
  }
}
```

---

## 4. Endpoints de Licenciamiento IA (`/api/licenses`)

### `POST /api/licenses/generate`
> **Permisos:** Requiere rol `SuperAdmin`. Genera un código criptográfico tras el pago del cliente.

#### Request Body:
```json
{
  "tenantId": "11111111-1111-1111-1111-111111111111",
  "moduleCode": "AI_SUPPORT_BOT_247",
  "durationDays": 365,
  "notes": "Pago de licencia anual verificado vía transferencia"
}
```

#### Response (200 OK):
```json
{
  "licenseKey": "GEVO-LAUR-AI24-8F92A1",
  "status": "Active",
  "expiresAt": "2027-10-28T23:59:59Z"
}
```

### `POST /api/licenses/redeem`
> **Permisos:** Requiere rol `BusinessOwner`. El cliente final canjea el código en su portal.

#### Request Body:
```json
{
  "licenseKey": "GEVO-LAUR-AI24-8F92A1"
}
```

#### Response (200 OK):
```json
{
  "success": true,
  "message": "Módulo de Agente IA 24/7 activado permanentemente en tu catálogo.",
  "moduleCode": "AI_SUPPORT_BOT_247",
  "expiresAt": "2027-10-28T23:59:59Z"
}
```

---

## 5. Endpoints de Productos e Inventario (`/api/products`)
> **Permisos:** `BusinessOwner` (filtrado automático a su propio `TenantId`) o `SuperAdmin`.

- `GET /api/products`: Lista todos los productos del inquilino autenticado.
- `POST /api/products`: Crea un nuevo producto/servicio.
- `PUT /api/products/{id}`: Modifica precios, fotos o stock de una referencia existente.
- `DELETE /api/products/{id}`: Elimina un producto.

