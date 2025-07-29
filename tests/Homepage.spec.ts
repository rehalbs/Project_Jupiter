import { test, expect } from '@playwright/test'
import { HomePage } from '../Pages/HomePage'; // Ensure HomePage.ts exists in the same folder, or update the path accordingly

//Create the Test 
test.describe('Jupitor Toys Homepage', () => {
    //Navigate to the Homepage using TEST_URL and scheck assert that header message, shopping button and Header are present
    test('Check the Homepage Elements', async ({ page }) => {
        //New home page object
        const homepage = new HomePage(page);
        const url = process.env.TEST_URL!;
        //navigate to the home page and chek if its up and running 
        console.log('Navigate to Site Jupitor Toys')
        await homepage.isSiteWorking(url);
        console.log('Site is Up and Running')
        //Check the header is prsent 
        const header = await homepage.getHeader();
        expect(header).toBe('Jupiter Toys');
        //check welcome message
        const welcomeMsg = await homepage.getWelcomeText();
        expect(welcomeMsg).toContain('Welcome to Jupiter Toys, a magical world for good girls and boys.');
        console.log('welcome message is displayd as : ' + welcomeMsg)
        //Shoping Button
        const isShopingButtonVisible = await homepage.isShoppingBtPresent()
        expect(isShopingButtonVisible).toBe(true);
        //take Screenshot
        await page.screenshot(({ path: 'screenshots/HomepageElements.png' }))

    });
});