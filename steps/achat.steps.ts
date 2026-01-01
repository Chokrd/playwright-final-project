import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

setDefaultTimeout(60000);

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let productsPage: ProductsPage;
let checkoutPage: CheckoutPage;

Before(async () => {
    browser = await chromium.launch({ headless: false, slowMo: 1000 });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    checkoutPage = new CheckoutPage(page);
});

Given('Je suis sur la page de connexion SauceDemo', async () => {
    await page.goto('https://www.saucedemo.com/');
});

When('Je me connecte avec {string} et {string}', async (user, pass) => {
    await loginPage.login(user, pass);
});

When('J\'effectue un premier achat de sac et de lampe', async () => {
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.addToCart('sauce-labs-bike-light');
    await productsPage.goToCart();
    await page.locator('[data-test="checkout"]').click();
    await checkoutPage.fillInformation('Miaou', 'TheCat', '75000');
    await checkoutPage.finishOrder();
});

When('Je retourne au catalogue pour ajouter un {string}', async (item) => {
    await page.locator('[data-test="back-to-products"]').click();
    await productsPage.addToCart(item);
});

When('Je supprime le {string} depuis le panier', async (item) => {
    await productsPage.goToCart();
    await productsPage.removeItem(item);
});

When('Je simule une maintenance serveur', async () => {
    await page.route('**/inventory.html', route => {
        route.fulfill({
            status: 503,
            contentType: 'text/plain',
            body: 'CODE 503 Service Unavailable' 
        });
    });
});

When('Je force le retour au catalogue', async () => {
    await page.goto('https://www.saucedemo.com/inventory.html');
});

Then('Je devrais voir le message {string}', async (msg) => {
    await expect(page.locator('body')).toContainText(msg);
});

After(async () => {
    await browser.close();
});