import { test, expect } from '@playwright/test'
import { HomePage } from '../Pages/HomePage';
import { ContactPage } from '..//Pages/ContactPage';

//Create the Test 
test.describe('Jupitor Toys Homepage', () => {
    //Navigate to the Homepage using TEST_URL and scheck assert that header message, shopping button and Header are present
    test('Check the Homepage Elements', async ({ page }) => {
        //New home page object
        const homepage = new HomePage(page);
        const contactpage = new ContactPage(page);

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
        //await page.screenshot(({ path: 'screenshots/HomepageElements.png' }))
        //navigate to the Conatct Page
        await homepage.navigateToContactPage();
        //click submit
        await contactpage.clickSubmit();
        // check msgs
        const headerError = await contactpage.getHeaderError();
        console.log('Header error is ' + headerError);
        //check the header error
        expect(headerError).toContain("We welcome your feedback - but we won't get it unless you complete the form correctly.");
        const formerror = await contactpage.getFormErrors();
        console.log('FORM Errors:  ' + formerror);
        //assert correct errors are dispalyed

        expect(formerror).toContain('Forename is required');
        expect(formerror).toContain('Email is required');
        expect(formerror).toContain('Message is required');
    });
});