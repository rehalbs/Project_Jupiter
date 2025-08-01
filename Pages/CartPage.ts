/**
 * CartPage Class
 * 
 * Responsible for verifying the correct quantities, subtotals, and total amounts in the shopping cart.
 * 
 * Author: Barry Singh  
 * Version: 1.0  
 * Created: 01 August 2025
 */

import { Page, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/.*#\/cart/);
        await expect(this.page.locator('table.cart-items')).toBeVisible();
    }

    async verifyProductInCart(product: { name: string; price: number; quantity: number }): Promise<void> {
        const { name, price, quantity } = product;
        const expectedSubtotal = (price * quantity).toFixed(2);

        const productRow = this.page.locator('table.cart-items tbody tr.cart-item', {
            has: this.page.locator('td', { hasText: name }),
        });

        // Quantity
        const qtyInput = productRow.locator('td').nth(2).locator('input');
        const qtyValue = await qtyInput.inputValue();
        expect(qtyValue).toBe(quantity.toString());
        console.log(`Toy Name is ${name} and bought quantity: ${qtyValue}`);

        // Price
        const priceText = await productRow.locator('td').nth(1).innerText();
        const trimmedPrice = priceText.trim();
        expect(trimmedPrice).toBe(`$${price.toFixed(2)}`);
        console.log(`Toy Name is ${name} and price: ${trimmedPrice}`);

        // Subtotal
        const rawSubtotalText = await productRow.locator('td').nth(3).innerText();
        console.log(`Raw subtotal text for ${name}: "${rawSubtotalText}"`);

        const cleanedSubtotal = rawSubtotalText.replace(/[^0-9.]/g, '');
        console.log(`Cleaned subtotal text for ${name}: "${cleanedSubtotal}"`);

        const subtotal = parseFloat(cleanedSubtotal);
        console.log(`Parsed subtotal for ${name}: ${subtotal}`);

        expect(!isNaN(subtotal)).toBeTruthy();
        expect(subtotal.toFixed(2)).toBe(expectedSubtotal);

        console.log(`Toy Name is ${name} and subtotal: ${subtotal.toFixed(2)}`);
    }

    async verifyCartTotal(products: { name: string; price: number; quantity: number }[]): Promise<void> {
        const expectedTotal = products
            .reduce((sum, p) => sum + p.price * p.quantity, 0)
            .toFixed(2);

        const totalText = await this.page.locator('strong.total').innerText();
        console.log(`Raw total text: "${totalText.trim()}"`);

        const cleanedText = totalText.replace(/[^0-9.]/g, '');
        const displayedTotal = parseFloat(cleanedText).toFixed(2);

        console.log(`Expected total: $${expectedTotal}`);
        console.log(`Displayed total: $${displayedTotal}`);

        expect(displayedTotal).toBe(expectedTotal);
    }
}