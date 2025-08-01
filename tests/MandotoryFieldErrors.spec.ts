import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { ContactPage } from '../Pages/ContactPage';

test.describe('Test Case 1 - Feedback form validations', () => {

    test('Test Case 1.1 Validate error messages when submitting empty feedback form', async ({ page, context }) => {
        const homepage = new HomePage(page);
        const contactpage = new ContactPage(page);
        const url = process.env.TEST_URL!;
        // Navigate to Home Page
        await homepage.isSiteWorking(url);
        console.log('Homepage loaded successfully.');
        const header = await homepage.getHeader();
        expect(header).toBe('Jupiter Toys');
        const welcomeMsg = await homepage.getWelcomeText();
        console.log('Welcome message:', welcomeMsg);
        expect(welcomeMsg).toContain('Welcome to Jupiter Toys, a magical world for good girls and boys.');
        console.log('Navigating to Contact page...');
        await homepage.navigateToContactPage();
        console.log('Submitting empty feedback form...');
        await contactpage.clickSubmit();
        const headerError = await contactpage.getHeaderError();
        // Header error is displayed       
        console.log('Header error received:', headerError);
        expect(headerError).toContain("We welcome your feedback - but we won't get it unless you complete the form correctly.");
        console.log('Capturing screenshot of validation errors...');
        await page.screenshot({ path: 'screenshots/FeedbackErrors.png' });
        // Form  Errors Check
        const forenameErr = await contactpage.getForenamerrors();
        const emailErr = await contactpage.getEmailErr();
        const messageErr = await contactpage.getMsgErr();
        // Use the soft expect to continue the test and verify the correct errors displayed
        expect.soft(forenameErr).toContain('Forename is required');
        expect.soft(emailErr).toContain('Email is required');
        expect.soft(messageErr).toContain('Message is required');

        await context.close();
    });

    test('Test Case 1.2 Submit feedback form with valid mandatory data', async ({ page, context }) => {
        const homepage = new HomePage(page);
        const contactpage = new ContactPage(page);
        const url = process.env.TEST_URL!;
        // Navigate to site
        console.log('Navigating to homepage...');
        await homepage.isSiteWorking(url);
        await homepage.navigateToContactPage();
        //submit the Feedback Form with valid date
        try {
            console.log('Submitting form with valid data...');
            await contactpage.submitFeedback();
            console.log('Feedback form submitted successfully with no errors.');
            // Assert no error messages are visible
            await expect(page.locator('#forename-err')).toBeHidden();
            await expect(page.locator('#email-err')).toBeHidden();
            await expect(page.locator('#message-err')).toBeHidden();
            //Navigate to Home page
            await homepage.navgateToHome();
        } catch (error) {
            console.error('Test failed while submitting feedback form:', error);
            throw error;
        }
        //Close the Browser
        await context.close();
    });

});
