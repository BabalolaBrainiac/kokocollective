import { test, expect } from '@playwright/test';

test.describe('Authentication and User Management', () => {
    // Use a predictable test account if available, or just verify the protection works.
    // For safety, we just verify the login page and protection logic here.

    test('redirects unauthenticated users to login', async ({ page }) => {
        await page.goto('/admin');
        // Should be redirected to the login form
        await expect(page.getByRole('heading', { name: 'Admin Access' })).toBeVisible();
        await expect(page.getByLabel('Email Address')).toBeVisible();
        await expect(page.getByLabel('Password')).toBeVisible();
    });

    test('prevents access to protected sub-routes', async ({ page }) => {
        await page.goto('/admin/users');
        // Should be redirected to the login form
        await expect(page.getByRole('heading', { name: 'Admin Access' })).toBeVisible();
    });

    // Example of a login test (requires valid credentials in environment).
    // test('logs in successfully with valid credentials', async ({ page }) => {
    //   await page.goto('/admin');
    //   await page.fill('input[type="email"]', process.env.TEST_EMAIL || 'test@example.com');
    //   await page.fill('input[type="password"]', process.env.TEST_PASSWORD || 'password');
    //   await page.click('button[type="submit"]');
    //   await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
    // });
});
