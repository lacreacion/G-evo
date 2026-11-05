import { test, expect } from '@playwright/test';

test.describe('Módulo de Tarjetas Digitales — Autorización Legal y Documento PDF (v1.1)', () => {
  test('Caso 1: Bloqueo visual en UI — Botón "Guardar / Actualizar Tarjeta" deshabilitado por defecto mientras "Sí autorizo" no esté marcado', async ({ page }) => {
    await page.goto('/portal');

    const checkbox = page.locator('#terms-accepted-checkbox');
    const saveButton = page.getByRole('button', { name: 'Guardar / Actualizar Tarjeta' });

    await expect(checkbox).not.toBeChecked();
    await expect(saveButton).toBeDisabled();
  });

  test('Caso 2: Verificación del PDF Legal — Enlace "Ver documento legal (PDF)" con href, target="_blank" y HTTP 200', async ({ page, request }) => {
    await page.goto('/portal');

    const pdfLink = page.getByRole('link', { name: 'Ver documento legal (PDF)' });
    await expect(pdfLink).toHaveAttribute('href', '/docs/terminos-y-autorizacion-tarjeta-digital.pdf');
    await expect(pdfLink).toHaveAttribute('target', '_blank');

    const pdfResponse = await request.get('/docs/terminos-y-autorizacion-tarjeta-digital.pdf');
    expect(pdfResponse.status()).toBe(200);
    expect(pdfResponse.headers()['content-type']).toContain('application/pdf');
  });

  test('Caso 3: Flujo completo de guardado — Marcar "Sí autorizo", habilitar botón, enviar formulario y confirmar notificación de éxito', async ({ page }) => {
    await page.goto('/portal');

    const checkbox = page.locator('#terms-accepted-checkbox');
    const saveButton = page.getByRole('button', { name: 'Guardar / Actualizar Tarjeta' });

    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    const successToast = page.getByTestId('card-save-success-toast');
    await expect(successToast).toBeVisible();
    await expect(successToast).toContainText('¡Tarjeta Digital actualizada con éxito!');
    await expect(successToast).toContainText('Auditoría legal v1.1 registrada:');
  });
});
