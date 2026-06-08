import { expect, test } from '@playwright/test';

test('home page renders editor and preview', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'md2img' })).toBeVisible();
  await expect(page.getByText('主题样式')).toBeVisible();
  await expect(page.locator('.monaco-editor')).toBeVisible();
  await expect(page.locator('.page-content')).toHaveCount(1);
  await expect(page.getByText('AI Morning News')).toBeVisible();
});

test('language switch changes toolbar labels', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button').last().click();

  await expect(page.getByText('Theme')).toBeVisible();
  await expect(page.getByText('Render Mode')).toBeVisible();
});

test('docs page is reachable from navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Docs' }).click();

  await expect(page).toHaveURL('/docs');
  await expect(page.getByRole('heading', { name: 'md2img usage guide' })).toBeVisible();
  await expect(page.getByText('Remote images must allow cross-origin access')).toBeVisible();
});

test('mobile layout keeps editor and preview accessible', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only layout assertion');

  await page.goto('/');

  await expect(page.locator('.monaco-editor')).toBeVisible();
  await expect(page.locator('.page-content')).toBeVisible();
  await expect(page.getByText('提示：长图模式下将生成并下载单张完整图片')).toBeVisible();
});
