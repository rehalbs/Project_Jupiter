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

        //assert correct errors are dispalyed
        const forenameErr = await contactpage.getForenamerrors();
        const emailErr = await contactpage.getEmailErr();
        const messageErr = await contactpage.getMsgErr();
        expect.soft(forenameErr).toContain('Forename is required');
        expect.soft(emailErr).toContain('Email is required');
        expect.soft(messageErr).toContain('Message is required');
    });

    test('Testcase 2 submit the form 5 times with 100% pass rate', async ({ page }) => {
        const homepage = new HomePage(page);
        const contactpage = new ContactPage(page);
        const url = process.env.TEST_URL!;

        await homepage.isSiteWorking(url);
        await homepage.navigateToContactPage();

        for (let i = 0; i < 5; i++) {
            console.log(`🔄 Iteration ${i + 1} starting`);
            try {
                await contactpage.submitFeedback();
                console.log(`Test pass no ${i + 1}`);
            } catch (error) {
                console.error(`Test failed at iteration ${i + 1}:`, error);
                throw error; // or continue if you want to run remaining iterations
            }
        }

    })

});