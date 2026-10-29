namespace Gevo.Application.DTOs;

// --- Auth DTOs ---
public record LoginRequest(string Email, string Password, string Role);
public record LoginResponse(string Token, string RefreshToken, string Role, Guid? TenantId, string FullName, string Email);

// --- Tenant DTOs ---
public record CreateTenantRequest(
    string Slug,
    string BusinessName,
    string? Slogan,
    string? Description,
    string ClientName,
    string ClientEmail,
    string PhoneWhatsapp,
    string? PrimaryColor,
    string? SecondaryColor,
    string? Category
);

public record TenantResponse(
    Guid Id,
    string Slug,
    string BusinessName,
    string? Slogan,
    string? PrimaryColor,
    string? SecondaryColor,
    string? PhoneWhatsapp,
    string? Email,
    bool IsActive,
    bool HasAiSupport,
    string? AiLicenseKey
);

// --- Product & Catalog DTOs ---
public record CreateProductRequest(
    string Name,
    string? CategoryName,
    decimal Price,
    decimal? CompareAtPrice,
    int StockQuantity,
    string? Sku,
    string? ShortDescription,
    string? FullDescription,
    string? ImageUrl
);

public record UpdateProductRequest(
    string Name,
    string? CategoryName,
    decimal Price,
    decimal? CompareAtPrice,
    int StockQuantity,
    string? Sku,
    string? ShortDescription,
    string? FullDescription,
    string? ImageUrl,
    bool IsAvailable
);

public record ProductResponse(
    Guid Id,
    string Sku,
    string Name,
    string Slug,
    string? CategoryName,
    decimal Price,
    decimal? CompareAtPrice,
    int StockQuantity,
    string? ShortDescription,
    string? FullDescription,
    string? ImageUrl,
    bool IsAvailable,
    bool IsFeatured
);

// --- Licensing & AI DTOs ---
public record GenerateLicenseRequest(Guid TenantId, string ModuleCode, int DurationDays = 365, string? Notes = null);
public record GenerateLicenseResponse(string LicenseKey, string Status, DateTime ExpiresAt);

public record RedeemLicenseRequest(string LicenseKey);
public record RedeemLicenseResponse(bool Success, string Message, string ModuleCode, DateTime? ExpiresAt);

public record AiChatRequest(string SessionId, string Query, string? CustomerPhone);
public record AiChatResponse(string Reply, bool ProductFound, List<string> RelatedSkus);

