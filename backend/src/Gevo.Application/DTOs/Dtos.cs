using System.Text.Json.Serialization;

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
    string? Category,
    bool TermsAccepted = false,
    [property: JsonPropertyName("terms_accepted")] bool? TermsAcceptedSnake = null,
    [property: JsonPropertyName("service_type")] string ServiceType = "tarjeta",
    [property: JsonPropertyName("privacy_accepted")] bool PrivacyAccepted = true,
    [property: JsonPropertyName("cookies_accepted")] bool CookiesAccepted = true,
    [property: JsonPropertyName("terms_version")] string TermsVersion = "2.0"
)
{
    public bool IsTermsAccepted => (TermsAccepted || (TermsAcceptedSnake == true)) && PrivacyAccepted && CookiesAccepted;
}

// --- Digital Card & Tenant Profile Legal Audit DTOs ---
public record UpsertTenantProfileRequest(
    string Slug,
    string FullName,
    string? JobTitle,
    string? Organization,
    string? Location,
    string? Bio,
    string? PhoneWhatsapp,
    string? Email,
    string? Theme = "gold_metallic",
    string? InstagramUrl = null,
    string? FacebookUrl = null,
    string? LinkedinUrl = null,
    string? PortfolioUrl = null,
    bool TermsAccepted = false,
    [property: JsonPropertyName("terms_accepted")] bool? TermsAcceptedSnake = null,
    string? TermsVersion = "1.1",
    [property: JsonPropertyName("service_type")] string ServiceType = "tarjeta",
    [property: JsonPropertyName("privacy_accepted")] bool PrivacyAccepted = true,
    [property: JsonPropertyName("cookies_accepted")] bool CookiesAccepted = true
)
{
    public bool IsTermsAccepted => (TermsAccepted || (TermsAcceptedSnake == true)) && PrivacyAccepted && CookiesAccepted;
}

// --- Modular Service Legal Consent DTOs (5 Services + Privacy + Cookies) ---
public record ServiceLegalConsentRequest(
    [property: JsonPropertyName("service_type")] string ServiceType,
    [property: JsonPropertyName("terms_accepted")] bool TermsAccepted,
    [property: JsonPropertyName("privacy_accepted")] bool PrivacyAccepted,
    [property: JsonPropertyName("cookies_accepted")] bool CookiesAccepted,
    [property: JsonPropertyName("terms_version")] string TermsVersion = "2.0"
);

public record ServiceLegalConsentResponse(
    Guid Id,
    Guid TenantId,
    [property: JsonPropertyName("service_type")] string ServiceType,
    [property: JsonPropertyName("terms_accepted")] bool TermsAccepted,
    [property: JsonPropertyName("privacy_accepted")] bool PrivacyAccepted,
    [property: JsonPropertyName("cookies_accepted")] bool CookiesAccepted,
    [property: JsonPropertyName("terms_version")] string TermsVersion,
    [property: JsonPropertyName("document_slug")] string DocumentSlug,
    [property: JsonPropertyName("ip_address")] string IpAddress,
    [property: JsonPropertyName("accepted_at")] DateTime AcceptedAt
);

public record DigitalCardProfileResponse(
    Guid Id,
    Guid TenantId,
    string Slug,
    string FullName,
    string? JobTitle,
    string? Organization,
    string? Location,
    string? Bio,
    string? PhoneWhatsapp,
    string? Email,
    string Theme,
    [property: JsonPropertyName("terms_accepted")] bool TermsAccepted,
    [property: JsonPropertyName("terms_accepted_at")] DateTime TermsAcceptedAt,
    [property: JsonPropertyName("terms_version")] string TermsVersion
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
    bool IsFeatured,
    string? DimensionsCm = null,
    List<string>? AvailableColors = null,
    List<string>? AvailableAromas = null,
    bool IsCombo = false,
    bool AllowDedication = false
);

// --- Licensing & AI DTOs ---
public record GenerateLicenseRequest(
    Guid TenantId,
    string ModuleCode,
    int DurationDays = 365,
    string? Notes = null,
    bool TermsAccepted = true,
    bool PrivacyAccepted = true,
    bool CookiesAccepted = true
);
public record GenerateLicenseResponse(string LicenseKey, string Status, DateTime ExpiresAt);

public record RedeemLicenseRequest(
    string LicenseKey,
    bool TermsAccepted = true,
    bool PrivacyAccepted = true,
    bool CookiesAccepted = true
);
public record RedeemLicenseResponse(bool Success, string Message, string ModuleCode, DateTime? ExpiresAt);

public record AiChatRequest(string SessionId, string Query, string? CustomerPhone);
public record AiChatResponse(string Reply, bool ProductFound, List<string> RelatedSkus);

