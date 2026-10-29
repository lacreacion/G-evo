using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Gevo.Infrastructure.Middleware;

public interface ITenantContext
{
    Guid? TenantId { get; set; }
    string? TenantSlug { get; set; }
    bool IsSuperAdmin { get; set; }
}

public class TenantContext : ITenantContext
{
    public Guid? TenantId { get; set; }
    public string? TenantSlug { get; set; }
    public bool IsSuperAdmin { get; set; }
}

public class TenantResolutionMiddleware
{
    private readonly RequestDelegate _next;

    public TenantResolutionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, ITenantContext tenantContext)
    {
        // 1. Check User Claims from JWT
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var roleClaim = context.User.FindFirst(ClaimTypes.Role)?.Value;
            var tenantClaim = context.User.FindFirst("tenant_id")?.Value;

            if (roleClaim == "SuperAdmin")
            {
                tenantContext.IsSuperAdmin = true;
            }

            if (!string.IsNullOrEmpty(tenantClaim) && Guid.TryParse(tenantClaim, out var tid))
            {
                tenantContext.TenantId = tid;
            }
        }

        // 2. Check Custom Header for multi-tenant routing (if SuperAdmin wants to query a specific tenant)
        if (context.Request.Headers.TryGetValue("X-Tenant-ID", out var headerTenant) &&
            Guid.TryParse(headerTenant, out var requestedTenantId))
        {
            // If user is a Business Client, enforce that they cannot spoof another tenant
            if (!tenantContext.IsSuperAdmin && tenantContext.TenantId.HasValue && tenantContext.TenantId != requestedTenantId)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsJsonAsync(new { error = "Violación de aislamiento multi-tenant: Acceso no autorizado al inquilino solicitado." });
                return;
            }

            if (tenantContext.IsSuperAdmin)
            {
                tenantContext.TenantId = requestedTenantId;
            }
        }

        await _next(context);
    }
}

