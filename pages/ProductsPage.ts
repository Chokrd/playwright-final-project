import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(itemName: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
  }

  async removeItem(itemName: string) {
    await this.page.locator(`[data-test="remove-${itemName}"]`).click();
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async continueShopping() {
    await this.page.locator('[data-test="continue-shopping"]').click();
  }
}