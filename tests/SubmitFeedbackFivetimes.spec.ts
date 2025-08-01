import { test, expect } from '@playwright/test'
import { HomePage } from '../Pages/HomePage';
import { ContactPage } from '../Pages/ContactPage';

test.describe('Submit Feedback form with mandatory data', () => {
    test('Testcase 2: Submit the form 5 times with 100% pass rate', async ({ page, context }) => {
        const homepage = new HomePage(page);
        const contactpage = new ContactPage(page);
        const url = process.env.TEST_URL!;
        //Navigate to the Home page
        await homepage.isSiteWorking(url);
        await homepage.navigateToContactPage();
        // For loop to submit the form 5 times
        for (let i = 0; i < 5; i++) {
            console.log(`Iteration ${i + 1} starting`);
            try {
                await contactpage.submitFeedback();
                console.log(`Test pass no ${i + 1}`);
            } catch (error) {
                console.error(`Test failed at iteration ${i + 1}:`, error);
                throw error;
            }
        }
        // Navigate back to homepage and close context
        await homepage.navgateToHome();
        await context.close();
        console.log('Test completed and browser context closed.');
    });
});
