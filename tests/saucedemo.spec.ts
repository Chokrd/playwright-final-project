import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Parcours complet : Achat, suppression et test d erreur serveur', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.addToCart('sauce-labs-backpack');
  
  await productsPage.goToCart(); 
  await page.locator('[data-test="continue-shopping"]').click();

  await productsPage.addToCart('sauce-labs-bike-light');

  await productsPage.goToCart();
  await productsPage.removeItem('sauce-labs-backpack'); 
  
  await expect(page.getByText('Sauce Labs Backpack')).toHaveCount(0);

  await page.route('**/inventory.html*', async (route) => {
    await route.fulfill({
      status: 503,
      contentType: 'text/plain',
      body: 'Service Unavailable'
    });
  });

  await page.goto('https://www.saucedemo.com/inventory.html');

  await expect(page.locator('body')).toContainText('Service Unavailable');
});