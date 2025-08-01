/**
 * ShoppingPage Class
 * 
 * Handles actions related to the shopping page, including verifying page load
 * and purchasing toys by name and quantity.
 * 
 * Author: Barry Singh  
 * Version: 1.0  
 * Created: 01 August 2025
 */

import { Page, expect } from '@playwright/test';

export class ShoppingPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isPageLoaded(): Promise<void> {
        console.log('Checking if Shop page is loaded...');
        await expect(this.page).toHaveURL(/.*#\/shop/);
        console.log('Shop page URL verified.');
    }

    async buyToys(name: string, quantity: number): Promise<void> {
        console.log(`Attempting to buy ${quantity} of "${name}"`);

        // Wait for the list to appear
        await this.page.waitForSelector('li.product');

        const productCards = this.page.locator('li.product');
        const count = await productCards.count();
        console.log(`Total product cards found: ${count}`);

        // Get all product titles text to debug
        const titles = await productCards.locator('h4.product-title').allTextContents();
        console.log('All product titles found on page:', titles);

        for (let i = 0; i < count; i++) {
            const titleLocator = productCards.nth(i).locator('h4.product-title');
            const title = await titleLocator.textContent();
            console.log(`Product ${i + 1} title: "${title?.trim()}"`);
            if (title?.trim() === name) {
                const buyButton = productCards.nth(i).locator('a.btn.btn-success');
                for (let j = 0; j < quantity; j++) {
                    await buyButton.click();
                    console.log(`Clicked Buy for "${name}" (${j + 1}/${quantity})`);
                    await this.page.waitForTimeout(200);
                }
                console.log(`Finished buying ${quantity} of "${name}"`);
                return;
            }
        }

        throw new Error(`Product "${name}" not found in product cards`);
    }
}




