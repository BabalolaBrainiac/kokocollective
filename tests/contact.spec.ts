import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
    test('submits a contact message successfully', async ({ page }) => {
        await page.goto('/contact');

        // Fill out the form
        await page.fill('input[name="name"]', 'Playwright Tester');
        await page.fill('input[name="email"]', 'tester@playwright.dev');
        await page.fill('input[name="subject"]', 'Automated Test Message');
        await page.fill('textarea[name="message"]', 'This is a test message from Playwright E2E testing.');

        // Submit
        await page.click('button[type="submit"]');

        // Should show success state
        await expect(page.getByText('Message Sent Successfully')).toBeVisible({ timeout: 10000 });
    });

    test('validates required fields', async ({ page }) => {
        await page.goto('/contact');

        // Submit without filling
        await page.click('button[type="submit"]');

        // Should still be on the form (HTML5 validation will prevent submission, 
        // but we can check the form is still visible and not the success message)
        await expect(page.getByText('Send Message')).toBeVisible();
        await expect(page.getByText('Message Sent Successfully')).not.toBeVisible();
    });
});
