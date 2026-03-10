import { expect, test } from '@playwright/test';
import { SetupSettingsPage } from './page-objects/setup-settings.page';

test.describe('Setup page and settings flow', () => {
  test('Test Case 1 — page loads and required fields exist', async ({ page }) => {
    const setupPage = new SetupSettingsPage(page);

    await setupPage.gotoSetupGuide();
    await setupPage.openAppFromSetupGuide();
    await setupPage.expectSetupFormFieldsVisible();
  });

  test('Test Case 2 — save settings', async ({ page }) => {
    const setupPage = new SetupSettingsPage(page);

    await page.goto('/');
    await setupPage.expectSetupFormFieldsVisible();

    await setupPage.saveSettings({
      userName: 'QA Automation',
      openAiApiKey: 'sk-test-1234567890',
      emailJsServiceId: 'service_abc123',
      emailJsTemplateId: 'template_def456',
      emailJsPublicKey: 'public_xyz789'
    });

    await expect(page.getByText('Configured')).toBeVisible();
    await expect(page.getByText('Settings saved')).toBeVisible();

    await page.reload();

    await expect(page.getByLabel('Your Name')).toHaveValue('QA Automation');
    await expect(setupPage.openAiApiKeyInput).toHaveValue('sk-test-1234567890');
    await expect(setupPage.emailJsServiceIdInput).toHaveValue('service_abc123');
    await expect(setupPage.emailJsTemplateIdInput).toHaveValue('template_def456');
    await expect(setupPage.emailJsPublicKeyInput).toHaveValue('public_xyz789');
  });
});
