using Microsoft.EntityFrameworkCore;
using Gevo.Domain.Entities;
using Gevo.Infrastructure.Middleware;

namespace Gevo.Infrastructure.Persistence;

public class GevoDbContext : DbContext
{
    private readonly ITenantContext _tenantContext;

    public GevoDbContext(DbContextOptions<GevoDbContext> options, ITenantContext tenantContext)
        : base(options)
    {
        _tenantContext = tenantContext;
    }

    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<User> Users => Set<User>();
    public DbSet<License> Licenses => Set<License>();
    public DbSet<Catalog> Catalogs => Set<Catalog>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductMedia> ProductMedia => Set<ProductMedia>();
    public DbSet<SocialStory> SocialStories => Set<SocialStory>();
    public DbSet<DigitalCard> DigitalCards => Set<DigitalCard>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Global Query Filters for strict multi-tenant data isolation
        // If user is SuperAdmin or TenantId is null, skip filter; otherwise, restrict to current tenant.
        modelBuilder.Entity<Catalog>()
            .HasQueryFilter(c => _tenantContext.IsSuperAdmin || c.TenantId == _tenantContext.TenantId);

        modelBuilder.Entity<Category>()
            .HasQueryFilter(c => _tenantContext.IsSuperAdmin || c.TenantId == _tenantContext.TenantId);

        modelBuilder.Entity<Product>()
            .HasQueryFilter(p => _tenantContext.IsSuperAdmin || p.TenantId == _tenantContext.TenantId);

        modelBuilder.Entity<ProductMedia>()
            .HasQueryFilter(m => _tenantContext.IsSuperAdmin || m.TenantId == _tenantContext.TenantId);

        modelBuilder.Entity<License>()
            .HasQueryFilter(l => _tenantContext.IsSuperAdmin || l.TenantId == _tenantContext.TenantId);

        modelBuilder.Entity<DigitalCard>()
            .HasQueryFilter(d => _tenantContext.IsSuperAdmin || d.TenantId == _tenantContext.TenantId);

        // Index configurations
        modelBuilder.Entity<Tenant>().HasIndex(t => t.Slug).IsUnique();
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<License>().HasIndex(l => l.LicenseKey).IsUnique();
        modelBuilder.Entity<Product>().HasIndex(p => new { p.TenantId, p.Sku });
        modelBuilder.Entity<DigitalCard>().HasIndex(d => d.Slug).IsUnique();
        modelBuilder.Entity<DigitalCard>().HasIndex(d => d.TenantId);
    }
}

