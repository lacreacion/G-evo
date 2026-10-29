using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Gevo.Application.Services;
using Gevo.Infrastructure.Middleware;
using Gevo.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// 1. Dependency Injection: Services & Middleware
builder.Services.AddScoped<ITenantContext, TenantContext>();
builder.Services.AddScoped<ILicenseService, LicenseService>();

// 2. DbContext Configuration (PostgreSQL)
builder.Services.AddDbContext<GevoDbContext>((sp, options) =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
        ?? "Host=localhost;Database=gevo_db;Username=postgres;Password=postgres";
    options.UseNpgsql(connectionString);
});

// 3. JWT Authentication Configuration
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? "G_EVO_SUPER_SECRET_KEY_FOR_SIGNING_TOKENS_2026_JWT!";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://g-evo.com",
            ValidAudience = "https://g-evo.com",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// 4. OpenAPI / Swagger Documentation
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "G-evo Multi-Tenant API",
        Version = "v1",
        Description = "API RESTful centralizada para el ecosistema G-evo: Tarjetas Digitales, Catálogos Autónomos y Monetización de Agentes IA."
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// 5. CORS for Next.js Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("GevoFrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://g-evo.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// 6. Pipeline Configuration
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "G-evo API v1"));
}

app.UseCors("GevoFrontendPolicy");
app.UseAuthentication();
app.UseMiddleware<TenantResolutionMiddleware>();
app.UseAuthorization();

app.MapControllers();

app.Run();

