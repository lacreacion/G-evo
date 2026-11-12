namespace Gevo.Domain.Entities;

public class Tenant
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Slug { get; set; } = string.Empty;
    public string BusinessName { get; set; } = string.Empty;
    public string? Slogan { get; set; }
    public string? Description { get; set; }
    public string? LogoUrl { get; set; }
    public string? CoverUrl { get; set; }
    public string PrimaryColor { get; set; } = "#10B981"; // G-evo Vibrant Green
    public string SecondaryColor { get; set; } = "#D4AF37"; // G-evo Metallic Gold
    public string? PhoneWhatsapp { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string Country { get; set; } = "Colombia";
    public string? InstagramHandle { get; set; }
    public string? FacebookPage { get; set; }
    public string? TikTokHandle { get; set; }
    public string? WebsiteUrl { get; set; }
    public bool TermsAccepted { get; set; } = false;
    public DateTime? TermsAcceptedAt { get; set; }
    public string TermsVersion { get; set; } = "1.1";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<User> Users { get; set; } = new List<User>();
    public ICollection<Catalog> Catalogs { get; set; } = new List<Catalog>();
    public ICollection<License> Licenses { get; set; } = new List<License>();
    public ICollection<DigitalCard> DigitalCards { get; set; } = new List<DigitalCard>();
    public ICollection<TenantLegalConsent> LegalConsents { get; set; } = new List<TenantLegalConsent>();
}

public class TenantLegalConsent
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public string ServiceType { get; set; } = "tarjeta"; // tarjeta | catalogo | web | ecommerce | ia
    public bool TermsAccepted { get; set; } = true;
    public bool PrivacyAccepted { get; set; } = true;
    public bool CookiesAccepted { get; set; } = true;
    public string TermsVersion { get; set; } = "2.0";
    public string DocumentSlug { get; set; } = "terminos-tarjeta-digital.pdf";
    public string IpAddress { get; set; } = "127.0.0.1";
    public string? UserAgent { get; set; }
    public DateTime AcceptedAt { get; set; } = DateTime.UtcNow;

    public Tenant? Tenant { get; set; }
}

public class DigitalCard
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? JobTitle { get; set; }
    public string? Organization { get; set; }
    public string? Location { get; set; }
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public string? CoverBgUrl { get; set; }
    public string? PhoneWhatsapp { get; set; }
    public string? Email { get; set; }
    public string Theme { get; set; } = "gold_metallic";
    public string OwnerPin { get; set; } = "1234";
    public string? InstagramUrl { get; set; }
    public string? FacebookUrl { get; set; }
    public string? LinkedinUrl { get; set; }
    public string? PortfolioUrl { get; set; }
    public bool TermsAccepted { get; set; } = false;
    public DateTime? TermsAcceptedAt { get; set; }
    public string TermsVersion { get; set; } = "1.1";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Tenant? Tenant { get; set; }
}

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid? TenantId { get; set; } // Null for SuperAdmin
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "BusinessOwner"; // SuperAdmin, BusinessOwner, Staff
    public string? Phone { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? LastLoginAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Tenant? Tenant { get; set; }
}

public class License
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public string ModuleCode { get; set; } = "AI_SUPPORT_BOT_247";
    public string LicenseKey { get; set; } = string.Empty;
    public string KeyHash { get; set; } = string.Empty;
    public string Status { get; set; } = "Active"; // Pending, Active, Revoked, Expired
    public bool IsTrial { get; set; } = false;
    public Guid? IssuedByUserId { get; set; }
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ActivatedAt { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public string? Notes { get; set; }

    public Tenant? Tenant { get; set; }
}

public class Catalog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Currency { get; set; } = "COP";
    public string? WhatsappCheckoutPhone { get; set; }
    public bool IsPublic { get; set; } = true;
    public bool EnableAiSupport { get; set; } = false;
    public long ViewsCount { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Tenant? Tenant { get; set; }
    public ICollection<Category> Categories { get; set; } = new List<Category>();
    public ICollection<Product> Products { get; set; } = new List<Product>();
}

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid CatalogId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;

    public Catalog? Catalog { get; set; }
    public ICollection<Product> Products { get; set; } = new List<Product>();
}

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid CatalogId { get; set; }
    public Guid? CategoryId { get; set; }
    public string? Sku { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string? FullDescription { get; set; }
    public string? AiGeneratedDescription { get; set; }
    public decimal Price { get; set; } = 0;
    public decimal? CompareAtPrice { get; set; }
    public int StockQuantity { get; set; } = 0;
    public bool TrackStock { get; set; } = false;
    public bool IsFeatured { get; set; } = false;
    public bool IsAvailable { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Catalog? Catalog { get; set; }
    public Category? Category { get; set; }
    public ICollection<ProductMedia> Media { get; set; } = new List<ProductMedia>();
}

public class ProductMedia
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public Guid ProductId { get; set; }
    public string MediaUrl { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string MediaType { get; set; } = "image";
    public string? AltText { get; set; }
    public int DisplayOrder { get; set; } = 0;
    public bool IsPrimary { get; set; } = false;

    public Product? Product { get; set; }
}

public class SocialStory
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Platform { get; set; } = "Instagram"; // Instagram, Facebook
    public string? ExternalStoryId { get; set; }
    public string MediaUrl { get; set; } = string.Empty;
    public string MediaType { get; set; } = "image";
    public string? Caption { get; set; }
    public string? Permalink { get; set; }
    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public DateTime? ExpiresAt { get; set; }
    public DateTime SyncedAt { get; set; } = DateTime.UtcNow;
}

