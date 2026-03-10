import { expect, type Locator, type Page } from '@playwright/test';

export class SetupSettingsPage {
  readonly page: Page;
  readonly openAiApiKeyInput: Locator;
  readonly emailJsServiceIdInput: Locator;
  readonly emailJsTemplateIdInput: Locator;
  readonly emailJsPublicKeyInput: Locator;
  readonly saveSettingsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openAiApiKeyInput = page.getByLabel('OpenAI API Key');
    this.emailJsServiceIdInput = page.getByLabel('EmailJS Service ID');
    this.emailJsTemplateIdInput = page.getByLabel('EmailJS Template ID');
    this.emailJsPublicKeyInput = page.getByLabel('EmailJS Public Key');
    this.saveSettingsButton = page.getByRole('button', { name: 'Save Settings' });
  }

  async gotoSetupGuide(): Promise<void> {
    await this.page.goto('/setup');
    await expect(this.page.getByRole('heading', { name: 'Setup Guide' })).toBeVisible();
  }

  async openAppFromSetupGuide(): Promise<void> {
    await this.page.getByRole('link', { name: 'Open Chronics.ai' }).click();
    await expect(this.page.getByText('MEETING INTELLIGENCE')).toBeVisible();
  }

  async expectSetupFormFieldsVisible(): Promise<void> {
    await expect(this.openAiApiKeyInput).toBeVisible();
    await expect(this.emailJsServiceIdInput).toBeVisible();
    await expect(this.emailJsTemplateIdInput).toBeVisible();
    await expect(this.emailJsPublicKeyInput).toBeVisible();
    await expect(this.saveSettingsButton).toBeVisible();
  }

  async saveSettings(data: {
    userName: string;
    openAiApiKey: string;
    emailJsServiceId: string;
    emailJsTemplateId: string;
    emailJsPublicKey: string;
  }): Promise<void> {
    await this.page.getByLabel('Your Name').fill(data.userName);
    await this.openAiApiKeyInput.fill(data.openAiApiKey);
    await this.emailJsServiceIdInput.fill(data.emailJsServiceId);
    await this.emailJsTemplateIdInput.fill(data.emailJsTemplateId);
    await this.emailJsPublicKeyInput.fill(data.emailJsPublicKey);
    await this.saveSettingsButton.click();
  }
}
