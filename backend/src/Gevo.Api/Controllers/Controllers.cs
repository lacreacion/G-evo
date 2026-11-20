using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Gevo.Application.DTOs;
using Gevo.Application.Services;
using Gevo.Domain.Entities;
using Gevo.Infrastructure.Middleware;
using Gevo.Infrastructure.Persistence;

namespace Gevo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest req)
    {
        // Demonstration authentication validation
        if (req.Role == "SuperAdmin" && (req.Email == "admin@g-evo.com" || req.Email.Contains("admin")))
        {
            var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo_superadmin_token";
            return Ok(new LoginResponse(token, "refresh_superadmin", "SuperAdmin", null, "Administrador Maestro G-evo", req.Email));
        }

        if (req.Email == "cliente@laurarestrepo.com" || req.Email.Contains("cliente"))
        {
            var tenantId = Guid.Parse("11111111-1111-1111-1111-111111111111");
            var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo_client_token";
            return Ok(new LoginResponse(token, "refresh_client", "BusinessOwner", tenantId, "Laura Restrepo", req.Email));
        }

        return Unauthorized(new { error = "Credenciales incorrectas o usuario inactivo." });
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "SuperAdmin")]
public class TenantsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAllTenants()
    {
        return Ok(new[]
        {
            new TenantResponse(Guid.Parse("11111111-1111-1111-1111-111111111111"), "laura-restrepo", "Laura Restrepo | Branding", "Estrategia boutique", "#10B981", "#D4AF37", "+573124567890", "cliente@laurarestrepo.com", true, true, "GEVO-LAUR-AI24-8F92A1"),
            new TenantResponse(Guid.Parse("22222222-2222-2222-2222-222222222222"), "aurea-velas", "AUREA Velas Artesanales", "Colección Navideña 2026", "#D4AF37", "#10B981", "+573004567890", "pedidos@aureavelas.com", true, true, "GEVO-AURE-AI24-9C41E2")
        });
    }

    [HttpPost]
    public IActionResult CreateTenant([FromBody] CreateTenantRequest req)
    {
        if (req == null || !req.IsTermsAccepted)
        {
            return BadRequest(new
            {
                error = "Debe aceptar obligatoriamente los Términos y Condiciones del servicio, la Política de Privacidad y la Política de Cookies.",
                code = "LEGAL_CONSENT_REQUIRED"
            });
        }

        var tempPassword = $"Gevo{Random.Shared.Next(1000, 9999)}!";
        var newId = Guid.NewGuid();

        return CreatedAtAction(nameof(GetAllTenants), new
        {
            TenantId = newId,
            req.Slug,
            req.BusinessName,
            ServiceType = req.ServiceType,
            Credentials = new
            {
                Email = req.ClientEmail,
                TemporaryPassword = tempPassword,
                PortalUrl = "https://g-evo.com/login"
            }
        });
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "BusinessOwner,SuperAdmin")]
public class ProductsController : ControllerBase
{
    private readonly ITenantContext _tenantContext;

    public ProductsController(ITenantContext tenantContext)
    {
        _tenantContext = tenantContext;
    }

    [HttpGet]
    public IActionResult GetProducts()
    {
        // Filtered automatically by current TenantId
        return Ok(new[]
        {
            new ProductResponse(Guid.NewGuid(), "LR-CONS-01", "Auditoría y Diagnóstico de Marca 360°", "auditoria-diagnostico", "Consultoría", 850000m, null, 5, "Evaluación 360", "Sesión intensiva 1 a 1", "https://images.unsplash.com/photo-1434030216411-0b793f4b4173", true, true)
        });
    }

    [HttpPost]
    public IActionResult CreateProduct([FromBody] CreateProductRequest req)
    {
        return Ok(new { success = true, message = "Producto creado bajo el inquilino aislado.", sku = req.Sku });
    }
}

[ApiController]
[Route("api/[controller]")]
public class LicensesController : ControllerBase
{
    private readonly ILicenseService _licenseService;
    private readonly ITenantContext _tenantContext;

    public LicensesController(ILicenseService licenseService, ITenantContext tenantContext)
    {
        _licenseService = licenseService;
        _tenantContext = tenantContext;
    }

    [HttpPost("generate")]
    [Authorize(Roles = "SuperAdmin")]
    public IActionResult GenerateLicense([FromBody] GenerateLicenseRequest req)
    {
        if (req == null || !req.TermsAccepted || !req.PrivacyAccepted || !req.CookiesAccepted)
        {
            return BadRequest(new
            {
                error = "Debe aceptar los Términos y Condiciones del Agente IA, la Política de Privacidad y la Política de Cookies antes de emitir la licencia.",
                code = "AI_LEGAL_CONSENT_REQUIRED"
            });
        }

        var key = _licenseService.GenerateLicenseKey("LAUR", req.ModuleCode);
        return Ok(new GenerateLicenseResponse(key, "Active", DateTime.UtcNow.AddDays(req.DurationDays)));
    }

    [HttpPost("redeem")]
    [Authorize(Roles = "BusinessOwner")]
    public IActionResult RedeemLicense([FromBody] RedeemLicenseRequest req)
    {
        if (req == null || !req.TermsAccepted || !req.PrivacyAccepted || !req.CookiesAccepted)
        {
            return BadRequest(new
            {
                error = "Debe aceptar los Términos y Condiciones del Agente IA, la Política de Privacidad y la Política de Cookies antes de activar el servicio.",
                code = "AI_LEGAL_CONSENT_REQUIRED"
            });
        }

        var isValid = _licenseService.ValidateLicenseKey(req.LicenseKey, "laura-restrepo", out var reason);
        if (!isValid)
        {
            return BadRequest(new { success = false, message = reason });
        }

        return Ok(new RedeemLicenseResponse(true, "Módulo de Agente IA 24/7 activado permanentemente en tu catálogo.", "AI_SUPPORT_BOT_247", DateTime.UtcNow.AddYears(1)));
    }
}

[ApiController]
[Route("api/[controller]")]
public class StoriesController : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public IActionResult GetSynchronizedStories()
    {
        return Ok(new[]
        {
            new { Platform = "Instagram", StoryId = "ig_1", MediaUrl = "https://images.unsplash.com/photo-1556742049-0a67c5574f73", Caption = "Tarjetas Inteligentes NFC G-evo con relieve dorado metálico." },
            new { Platform = "Instagram", StoryId = "ig_2", MediaUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f", Caption = "Tu catálogo ahora vende 24/7 con Agente IA." }
        });
    }
}

[ApiController]
[Route("api/[controller]")]
public class AiSupportController : ControllerBase
{
    [HttpPost("chat")]
    [AllowAnonymous]
    public IActionResult AskCatalogBot([FromBody] AiChatRequest req, [FromHeader(Name = "X-Tenant-Slug")] string? tenantSlug)
    {
        var query = req.Query.ToLowerInvariant();
        string reply;

        if (query.Contains("precio") || query.Contains("cuesta") || query.Contains("auditor"))
        {
            reply = "La Auditoría y Diagnóstico de Marca 360° tiene un valor de $850.000 COP. Incluye sesión 1 a 1 de 3 horas y reporte con plan de 30 días.";
        }
        else if (query.Contains("horario") || query.Contains("disponib"))
        {
            reply = "Las asesorías se imparten de lunes a viernes entre 8:00 AM y 6:00 PM (COT). Tenemos 5 cupos disponibles esta semana.";
        }
        else
        {
            reply = $"Con gusto te informo sobre {req.Query}. Puedes ordenar este servicio directamente a nuestro WhatsApp oficial.";
        }

        return Ok(new AiChatResponse(reply, true, new List<string> { "LR-CONS-01" }));
    }
}

[ApiController]
[Route("api/tenant/profile")]
[Authorize(Roles = "BusinessOwner,SuperAdmin")]
public class TenantProfileController : ControllerBase
{
    private readonly GevoDbContext _dbContext;
    private readonly ITenantContext _tenantContext;

    public TenantProfileController(GevoDbContext dbContext, ITenantContext tenantContext)
    {
        _dbContext = dbContext;
        _tenantContext = tenantContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetProfile([FromQuery] string? slug = null)
    {
        var query = _dbContext.DigitalCards.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(slug))
        {
            query = query.Where(c => c.Slug == slug);
        }

        var card = await query.FirstOrDefaultAsync();
        if (card == null)
        {
            return NotFound(new { error = "Perfil de Tarjeta Digital no encontrado para el inquilino actual." });
        }

        return Ok(new DigitalCardProfileResponse(
            card.Id,
            card.TenantId,
            card.Slug,
            card.FullName,
            card.JobTitle,
            card.Organization,
            card.Location,
            card.Bio,
            card.PhoneWhatsapp,
            card.Email,
            card.Theme,
            card.TermsAccepted,
            card.TermsAcceptedAt ?? card.UpdatedAt,
            card.TermsVersion
        ));
    }

    [HttpPost]
    public async Task<IActionResult> CreateProfile([FromBody] UpsertTenantProfileRequest req)
    {
        return await UpsertInternalAsync(req);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] UpsertTenantProfileRequest req)
    {
        return await UpsertInternalAsync(req);
    }

    private async Task<IActionResult> UpsertInternalAsync(UpsertTenantProfileRequest req)
    {
        // Validación estricta de consentimiento legal (Habeas Data / GDPR - Versión 1.1)
        if (req == null || !req.IsTermsAccepted)
        {
            return BadRequest(new
            {
                error = "Debe aceptar obligatoriamente la Autorización de Tratamiento de Datos Personales y Términos de Uso de la Tarjeta Digital (Sí autorizo) antes de guardar o actualizar su perfil.",
                code = "TERMS_ACCEPTANCE_REQUIRED",
                requiredVersion = "1.1"
            });
        }

        var resolvedTenantId = _tenantContext.TenantId ?? Guid.Parse("11111111-1111-1111-1111-111111111111");
        var nowUtc = DateTime.UtcNow;

        // Buscar tarjeta únicamente dentro del aislamiento del tenant actual (Global Query Filter activo)
        var existingCard = await _dbContext.DigitalCards
            .FirstOrDefaultAsync(c => c.Slug == req.Slug && c.TenantId == resolvedTenantId);

        // Verificar si el slug pertenece a otro tenant distinto para impedir colisión/modificación cruzada
        var crossTenantCollision = await _dbContext.DigitalCards
            .IgnoreQueryFilters()
            .AnyAsync(c => c.Slug == req.Slug && c.TenantId != resolvedTenantId);

        if (crossTenantCollision && !_tenantContext.IsSuperAdmin)
        {
            return StatusCode(StatusCodes.Status403Forbidden, new
            {
                error = "Violación de aislamiento multi-tenant: No tiene permisos para modificar la tarjeta digital de otro cliente."
            });
        }

        if (existingCard == null)
        {
            existingCard = new DigitalCard
            {
                Id = Guid.NewGuid(),
                TenantId = resolvedTenantId,
                Slug = req.Slug,
                FullName = req.FullName,
                JobTitle = req.JobTitle,
                Organization = req.Organization,
                Location = req.Location,
                Bio = req.Bio,
                PhoneWhatsapp = req.PhoneWhatsapp,
                Email = req.Email,
                Theme = string.IsNullOrWhiteSpace(req.Theme) ? "gold_metallic" : req.Theme!,
                InstagramUrl = req.InstagramUrl,
                FacebookUrl = req.FacebookUrl,
                LinkedinUrl = req.LinkedinUrl,
                PortfolioUrl = req.PortfolioUrl,
                TermsAccepted = true,
                TermsAcceptedAt = nowUtc,
                TermsVersion = "1.1",
                CreatedAt = nowUtc,
                UpdatedAt = nowUtc
            };
            _dbContext.DigitalCards.Add(existingCard);
        }
        else
        {
            existingCard.FullName = req.FullName;
            existingCard.JobTitle = req.JobTitle;
            existingCard.Organization = req.Organization;
            existingCard.Location = req.Location;
            existingCard.Bio = req.Bio;
            existingCard.PhoneWhatsapp = req.PhoneWhatsapp;
            existingCard.Email = req.Email;
            if (!string.IsNullOrWhiteSpace(req.Theme))
            {
                existingCard.Theme = req.Theme!;
            }
            existingCard.InstagramUrl = req.InstagramUrl;
            existingCard.FacebookUrl = req.FacebookUrl;
            existingCard.LinkedinUrl = req.LinkedinUrl;
            existingCard.PortfolioUrl = req.PortfolioUrl;
            existingCard.TermsAccepted = true;
            existingCard.TermsAcceptedAt = nowUtc;
            existingCard.TermsVersion = "1.1";
            existingCard.UpdatedAt = nowUtc;
        }

        var normalizedService = string.IsNullOrWhiteSpace(req.ServiceType) ? "tarjeta" : req.ServiceType.Trim().ToLowerInvariant();
        var clientIp = HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? "127.0.0.1";
        var userAgent = HttpContext?.Request?.Headers["User-Agent"].ToString();

        _dbContext.LegalConsents.Add(new TenantLegalConsent
        {
            Id = Guid.NewGuid(),
            TenantId = resolvedTenantId,
            ServiceType = normalizedService,
            TermsAccepted = true,
            PrivacyAccepted = req.PrivacyAccepted,
            CookiesAccepted = req.CookiesAccepted,
            TermsVersion = string.IsNullOrWhiteSpace(req.TermsVersion) ? "1.1" : req.TermsVersion!,
            DocumentSlug = $"terminos-{normalizedService}.pdf",
            IpAddress = clientIp,
            UserAgent = userAgent,
            AcceptedAt = nowUtc
        });

        await _dbContext.SaveChangesAsync();

        return Ok(new DigitalCardProfileResponse(
            existingCard.Id,
            existingCard.TenantId,
            existingCard.Slug,
            existingCard.FullName,
            existingCard.JobTitle,
            existingCard.Organization,
            existingCard.Location,
            existingCard.Bio,
            existingCard.PhoneWhatsapp,
            existingCard.Email,
            existingCard.Theme,
            existingCard.TermsAccepted,
            existingCard.TermsAcceptedAt!.Value,
            existingCard.TermsVersion
        ));
    }
}

[ApiController]
[Route("api/legal/consents")]
[Authorize(Roles = "BusinessOwner,SuperAdmin")]
public class LegalConsentsController : ControllerBase
{
    private static readonly HashSet<string> AllowedServiceTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "tarjeta", "catalogo", "web", "ecommerce", "ia"
    };

    private static readonly Dictionary<string, string> ServiceDocumentMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["tarjeta"] = "terminos-tarjeta-digital.pdf",
        ["catalogo"] = "terminos-catalogo-digital.pdf",
        ["web"] = "terminos-pagina-web.pdf",
        ["ecommerce"] = "terminos-tienda-ecommerce.pdf",
        ["ia"] = "terminos-agente-ia.pdf"
    };

    private readonly GevoDbContext _dbContext;
    private readonly ITenantContext _tenantContext;

    public LegalConsentsController(GevoDbContext dbContext, ITenantContext tenantContext)
    {
        _dbContext = dbContext;
        _tenantContext = tenantContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetConsents([FromQuery] string? serviceType = null)
    {
        var query = _dbContext.LegalConsents.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(serviceType))
        {
            var normalized = serviceType.Trim().ToLowerInvariant();
            query = query.Where(c => c.ServiceType == normalized);
        }

        var items = await query
            .OrderByDescending(c => c.AcceptedAt)
            .Select(c => new ServiceLegalConsentResponse(
                c.Id,
                c.TenantId,
                c.ServiceType,
                c.TermsAccepted,
                c.PrivacyAccepted,
                c.CookiesAccepted,
                c.TermsVersion,
                c.DocumentSlug,
                c.IpAddress,
                c.AcceptedAt
            ))
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost]
    public async Task<IActionResult> RecordConsent([FromBody] ServiceLegalConsentRequest req)
    {
        if (req == null || string.IsNullOrWhiteSpace(req.ServiceType) || !AllowedServiceTypes.Contains(req.ServiceType))
        {
            return BadRequest(new
            {
                error = "El tipo de servicio (service_type) es inválido. Debe ser: tarjeta, catalogo, web, ecommerce o ia.",
                code = "INVALID_SERVICE_TYPE"
            });
        }

        if (!req.TermsAccepted || !req.PrivacyAccepted || !req.CookiesAccepted)
        {
            return BadRequest(new
            {
                error = $"No se puede crear ni activar el servicio '{req.ServiceType}' sin aceptar sus Términos y Condiciones específicos, la Política de Privacidad y la Política de Cookies.",
                code = "SERVICE_CONSENT_REQUIRED",
                serviceType = req.ServiceType.Trim().ToLowerInvariant()
            });
        }

        var normalizedService = req.ServiceType.Trim().ToLowerInvariant();
        var resolvedTenantId = _tenantContext.TenantId ?? Guid.Parse("11111111-1111-1111-1111-111111111111");
        var nowUtc = DateTime.UtcNow;
        var clientIp = HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? "127.0.0.1";
        var userAgent = HttpContext?.Request?.Headers["User-Agent"].ToString();
        var docSlug = ServiceDocumentMap[normalizedService];

        var entity = new TenantLegalConsent
        {
            Id = Guid.NewGuid(),
            TenantId = resolvedTenantId,
            ServiceType = normalizedService,
            TermsAccepted = true,
            PrivacyAccepted = true,
            CookiesAccepted = true,
            TermsVersion = string.IsNullOrWhiteSpace(req.TermsVersion) ? "2.0" : req.TermsVersion,
            DocumentSlug = docSlug,
            IpAddress = clientIp,
            UserAgent = userAgent,
            AcceptedAt = nowUtc
        };

        _dbContext.LegalConsents.Add(entity);
        await _dbContext.SaveChangesAsync();

        return Ok(new ServiceLegalConsentResponse(
            entity.Id,
            entity.TenantId,
            entity.ServiceType,
            entity.TermsAccepted,
            entity.PrivacyAccepted,
            entity.CookiesAccepted,
            entity.TermsVersion,
            entity.DocumentSlug,
            entity.IpAddress,
            entity.AcceptedAt
        ));
    }
}


