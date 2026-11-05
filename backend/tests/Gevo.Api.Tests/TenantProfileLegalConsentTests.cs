using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Gevo.Api.Controllers;
using Gevo.Application.DTOs;
using Gevo.Infrastructure.Middleware;
using Gevo.Infrastructure.Persistence;

namespace Gevo.Api.Tests;

public class TenantProfileLegalConsentTests
{
    private static (GevoDbContext DbContext, ITenantContext TenantContext, TenantProfileController Controller) CreateSut(
        string dbName,
        Guid tenantId,
        bool isSuperAdmin = false)
    {
        var tenantContext = new TenantContext
        {
            TenantId = tenantId,
            TenantSlug = "laura-restrepo",
            IsSuperAdmin = isSuperAdmin
        };

        var options = new DbContextOptionsBuilder<GevoDbContext>()
            .UseInMemoryDatabase(databaseName: dbName)
            .Options;

        var dbContext = new GevoDbContext(options, tenantContext);
        var controller = new TenantProfileController(dbContext, tenantContext);

        return (dbContext, tenantContext, controller);
    }

    [Fact]
    public async Task Caso1_PostProfile_WhenTermsAcceptedIsFalse_Returns400BadRequest_AndDoesNotPersist()
    {
        // Arrange
        var tenantId = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var (db, _, controller) = CreateSut(nameof(Caso1_PostProfile_WhenTermsAcceptedIsFalse_Returns400BadRequest_AndDoesNotPersist), tenantId);

        var request = new UpsertTenantProfileRequest(
            Slug: "laura-restrepo",
            FullName: "Laura Restrepo",
            JobTitle: "Directora de Branding",
            Organization: "Laura Restrepo Studio",
            Location: "Medellín",
            Bio: "Consultoría estratégica B2B",
            PhoneWhatsapp: "+573124567890",
            Email: "hola@laurarestrepo.com",
            Theme: "gold_metallic",
            TermsAccepted: false,
            TermsAcceptedSnake: false
        );

        // Act
        var result = await controller.CreateProfile(request);

        // Assert
        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(StatusCodes.Status400BadRequest, badRequest.StatusCode ?? StatusCodes.Status400BadRequest);
        Assert.Equal(0, await db.DigitalCards.IgnoreQueryFilters().CountAsync());
    }

    [Fact]
    public async Task Caso1_PutProfile_WhenTermsAcceptedIsFalse_Returns400BadRequest_AndDoesNotPersistChanges()
    {
        // Arrange
        var tenantId = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var (db, _, controller) = CreateSut(nameof(Caso1_PutProfile_WhenTermsAcceptedIsFalse_Returns400BadRequest_AndDoesNotPersistChanges), tenantId);

        var request = new UpsertTenantProfileRequest(
            Slug: "laura-restrepo",
            FullName: "Intento Sin Consentimiento",
            JobTitle: "CEO",
            Organization: "Studio",
            Location: "Bogotá",
            Bio: "Bio sin autorización",
            PhoneWhatsapp: "+573000000000",
            Email: "test@studio.com",
            Theme: "emerald",
            TermsAccepted: false,
            TermsAcceptedSnake: false
        );

        // Act
        var result = await controller.UpdateProfile(request);

        // Assert
        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(StatusCodes.Status400BadRequest, badRequest.StatusCode ?? StatusCodes.Status400BadRequest);
        Assert.Equal(0, await db.DigitalCards.IgnoreQueryFilters().CountAsync());
    }

    [Fact]
    public async Task Caso2_PostAndPutProfile_WhenTermsAcceptedIsTrue_Returns200Ok_PersistsUtcTimestampAndVersion1_1_WithTenantIsolation()
    {
        // Arrange
        var dbName = nameof(Caso2_PostAndPutProfile_WhenTermsAcceptedIsTrue_Returns200Ok_PersistsUtcTimestampAndVersion1_1_WithTenantIsolation);
        var tenantA = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var tenantB = Guid.Parse("22222222-2222-2222-2222-222222222222");

        var (dbA, _, controllerA) = CreateSut(dbName, tenantA);
        var beforeUtc = DateTime.UtcNow.AddSeconds(-2);

        var createReq = new UpsertTenantProfileRequest(
            Slug: "laura-restrepo",
            FullName: "Laura Restrepo",
            JobTitle: "Directora de Branding & Estrategia",
            Organization: "Laura Restrepo Studio",
            Location: "Medellín, Colombia",
            Bio: "Consultoría estratégica de marca.",
            PhoneWhatsapp: "+573124567890",
            Email: "hola@laurarestrepo.com",
            Theme: "gold_metallic",
            TermsAccepted: true,
            TermsAcceptedSnake: true
        );

        // Act 1: POST con terms_accepted = true
        var postResult = await controllerA.CreateProfile(createReq);

        // Assert 1: 200 OK y trazabilidad legal v1.1
        var okPost = Assert.IsType<OkObjectResult>(postResult);
        var payload = Assert.IsType<DigitalCardProfileResponse>(okPost.Value);
        Assert.True(payload.TermsAccepted);
        Assert.Equal("1.1", payload.TermsVersion);
        Assert.Equal(tenantA, payload.TenantId);
        Assert.Equal(DateTimeKind.Utc, payload.TermsAcceptedAt.Kind);
        Assert.InRange(payload.TermsAcceptedAt, beforeUtc, DateTime.UtcNow.AddSeconds(2));

        // Act 2: PUT con terms_accepted = true actualizando datos
        var updateReq = createReq with { JobTitle = "CEO & Founder", Theme = "rose_gold" };
        var putResult = await controllerA.UpdateProfile(updateReq);
        var okPut = Assert.IsType<OkObjectResult>(putResult);
        var updatedPayload = Assert.IsType<DigitalCardProfileResponse>(okPut.Value);
        Assert.Equal("CEO & Founder", updatedPayload.JobTitle);
        Assert.Equal("1.1", updatedPayload.TermsVersion);
        Assert.True(updatedPayload.TermsAccepted);

        // Act & Assert 3: Verificar aislamiento estricto por tenant_id (Tenant B no puede ver ni sobrescribir la tarjeta de Tenant A)
        var (dbB, _, controllerB) = CreateSut(dbName, tenantB);
        Assert.Equal(0, await dbB.DigitalCards.CountAsync()); // Global Query Filter oculta los registros de Tenant A

        var crossTenantAttempt = await controllerB.UpdateProfile(updateReq with { FullName = "Intruso Tenant B" });
        var forbiddenResult = Assert.IsType<ObjectResult>(crossTenantAttempt);
        Assert.Equal(StatusCodes.Status403Forbidden, forbiddenResult.StatusCode);
    }
}
