using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Gevo.Application.DTOs;
using Gevo.Application.Services;
using Gevo.Infrastructure.Middleware;

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
            new TenantResponse(Guid.Parse("11111111-1111-1111-1111-111111111111"), "laura-restrepo", "Laura Restrepo | Branding", "Estrategia boutique", "#10B981", "#D4AF37", "+573124567890", "cliente@laurarestrepo.com", true, true, "GEVO-LAUR-AI24-8F92A1")
        });
    }

    [HttpPost]
    public IActionResult CreateTenant([FromBody] CreateTenantRequest req)
    {
        var tempPassword = $"Gevo{Random.Shared.Next(1000, 9999)}!";
        var newId = Guid.NewGuid();

        return CreatedAtAction(nameof(GetAllTenants), new
        {
            TenantId = newId,
            req.Slug,
            req.BusinessName,
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
        var key = _licenseService.GenerateLicenseKey("LAUR", req.ModuleCode);
        return Ok(new GenerateLicenseResponse(key, "Active", DateTime.UtcNow.AddDays(req.DurationDays)));
    }

    [HttpPost("redeem")]
    [Authorize(Roles = "BusinessOwner")]
    public IActionResult RedeemLicense([FromBody] RedeemLicenseRequest req)
    {
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

