import { expect, type Page, test } from '@playwright/test';

const firstProductLink = (page: Page) =>
  page.locator('a[href^="/product/"]').first();

test('Scenario A - guest favourites and cart controls', async ({ page }) => {
  await page.goto('/products');
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();

  test.skip(
    await page.getByText('Unable to load products.').isVisible(),
    'Medusa product data is unavailable in this environment.',
  );

  await firstProductLink(page).click();
  await expect(page).toHaveURL(/\/product\//);
  await expect(page.getByRole('button', { name: /add to cart/i }).first()).toBeVisible();
  await page.getByRole('button', { name: /add to favourites/i }).first().click();
  await expect(page.getByRole('button', { name: /remove from favourites/i })).toBeVisible();
  await page.goto('/favourite');
  await expect(page.getByText(/1 saved item/)).toBeVisible({ timeout: 30_000 });
  await page.getByRole('button', { name: /add to cart/i }).first().click();
  const cartDrawer = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Shopping Cart' }) });
  await expect(cartDrawer.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible({
    timeout: 45_000,
  });
  await cartDrawer.getByRole('button', { name: /increase quantity/i }).first().click();
  await cartDrawer.getByRole('button', { name: /^remove$/i }).first().click();
});

test('Scenario B - search URL, results, product open, add to cart', async ({ page }) => {
  await page.goto('/search');
  await page.getByRole('searchbox').fill('deodorant');
  await page.getByRole('button', { name: /^search$/i }).click();
  await expect(page).toHaveURL(/\/search\?q=deodorant/);

  test.skip(
    await page.getByText('Search is unavailable').isVisible(),
    'Medusa search is unavailable in this environment.',
  );

  test.skip(
    await page.getByText('No products matched your search.').isVisible(),
    'No Medusa products matched the test query.',
  );

  await firstProductLink(page).click();
  await expect(page).toHaveURL(/\/product\//);
  await page.getByRole('button', { name: /add to cart/i }).first().click();
  await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible({
    timeout: 45_000,
  });
});

test('Scenario C - account page protects unauthenticated users', async ({ page }) => {
  await page.goto('/account');
  await expect(page).toHaveURL(/\/login\?returnUrl=%2Faccount/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});

test('Scenario D - checkout guards empty carts and blocks fake payment success', async ({ page }) => {
  await page.goto('/payments');
  await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();

  await page.goto('/summary?success=true');
  await expect(
    page.getByRole('heading', { name: 'Invalid order reference' }),
  ).toBeVisible();
});
