import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { ContactPage } from '../Pages/ContactPage';
import { ShoppingPage } from '../Pages/ShopPage';
import { CartPage } from '../Pages/CartPage';
import ShoppingListData from '../ShoppingList.json';
//create the interface to insure no issue with JSON if updated for future tests
interface ShoppingItem {
    name: string;
    quantity: number;
    price: number;
}
// Ensure the imported shopping list data is an array before assigning
// If the data is not an array (e.g., malformed JSON), fallback to an empty array to prevent runtime errors.
const ShoppingList: ShoppingItem[] = Array.isArray(ShoppingListData) ? ShoppingListData : [];

test.describe('Jupiter Toys Test Case 3: Buy toys and verify cart details', () => {
    test('Testcase 3 Buy toys and verify cart details', async ({ page, context }) => {
        const homepage = new HomePage(page);
        const shopPage = new ShoppingPage(page);
        const cartPage = new CartPage(page);
        const url = process.env.TEST_URL!;
        // navigate to the Shop page 
        console.log('Navigating to Jupiter Toys Shop page...');
        await homepage.isSiteWorking(url);

        console.log('Clicking Shop page link...');
        await page.click('a[href="#/shop"]');
        await shopPage.isPageLoaded();
        //Display the shoping List
        console.log('Shopping List:', ShoppingList);
        if (ShoppingList.length === 0) {
            console.warn('Warning: Shopping list is empty. No items will be purchased.');
            await context.close();
            return;
        }
        // Start buying the items
        for (const item of ShoppingList) {
            console.log(`Buying item: "${item.name}" Quantity: ${item.quantity}`);
            try {
                await shopPage.buyToys(item.name, item.quantity);
                console.log(`Successfully bought ${item.quantity} x "${item.name}"`);
            } catch (error) {
                console.error(`Failed to buy ${item.name}:`, error);
                await context.close();
                throw error;
            }
        }
        //Check the cart for verification of shoping
        console.log('Navigating to Cart page...');
        await page.click('a[href="#/cart"]');
        console.log('Verifying Cart page is loaded...');
        await cartPage.isPageLoaded();
        for (const item of ShoppingList) {
            console.log(`Verifying cart item: "${item.name}"`);
            try {
                await cartPage.verifyProductInCart(item);
                console.log(`Verified "${item.name}" in cart successfully.`);
            } catch (error) {
                console.error(`Cart verification failed for ${item.name}:`, error);
                await context.close();
                throw error;
            }
        }
        console.log('Verifying total amount in cart...');
        try {
            await cartPage.verifyCartTotal(ShoppingList);
            console.log('Cart total verified successfully.');
        } catch (error) {
            console.error('Cart total verification failed:', error);
            await context.close();
            throw error;
        }
        console.log('Test completed. Closing browser');
        await context.close();
    });
});
