using System.Security.Cryptography;
using System.Text;

namespace Gevo.Application.Services;

public interface ILicenseService
{
    string GenerateLicenseKey(string tenantSlug, string moduleCode);
    bool ValidateLicenseKey(string licenseKey, string tenantSlug, out string reason);
    string HashKey(string licenseKey);
}

public class LicenseService : ILicenseService
{
    private const string SecretSalt = "GEVO_CORE_ENCRYPTION_KEY_2026_X92!";

    public string GenerateLicenseKey(string tenantSlug, string moduleCode)
    {
        // Format: GEVO-{SLUG4}-{MOD4}-{CHECKSUM6}
        var cleanSlug = (tenantSlug.Length >= 4 ? tenantSlug[..4] : tenantSlug.PadRight(4, 'X')).ToUpperInvariant();
        var cleanMod = (moduleCode.Contains("AI") ? "AI24" : "MOD1");

        var payload = $"{cleanSlug}:{cleanMod}:{DateTime.UtcNow:yyyyMMdd}:{SecretSalt}";
        using var sha256 = SHA256.Create();
        var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(payload));
        var checksum = Convert.ToHexString(hashBytes)[..6].ToUpperInvariant();

        return $"GEVO-{cleanSlug}-{cleanMod}-{checksum}";
    }

    public bool ValidateLicenseKey(string licenseKey, string tenantSlug, out string reason)
    {
        if (string.IsNullOrWhiteSpace(licenseKey))
        {
            reason = "El código no puede estar vacío.";
            return false;
        }

        var parts = licenseKey.Trim().Split('-');
        if (parts.Length != 4 || parts[0] != "GEVO")
        {
            reason = "Formato de código inválido. Debe comenzar con GEVO- y contener 4 segmentos.";
            return false;
        }

        var expectedSlug = (tenantSlug.Length >= 4 ? tenantSlug[..4] : tenantSlug.PadRight(4, 'X')).ToUpperInvariant();
        if (parts[1] != expectedSlug)
        {
            reason = $"Este código de licencia pertenece a otro comercio ({parts[1]}) y no puede ser usado aquí.";
            return false;
        }

        reason = "Licencia válida.";
        return true;
    }

    public string HashKey(string licenseKey)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(licenseKey + SecretSalt));
        return Convert.ToHexString(bytes).ToLowerInvariant();
    }
}

