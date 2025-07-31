//Contact Page
import { Page, expect } from '@playwright/test';
import { error } from 'console';
import { faker } from '@faker-js/faker';
import { HomePage } from './HomePage';

export class ContactPage {
    readonly page: Page;

    //Constructor 
    constructor(page: Page) {
        this.page = page;
    }
    // Click the submit button is visible and enabled
    async clickSubmit() {
        try {
            const submitButton = this.page.getByRole('link', { name: 'Submit' });
            //check the submit button is Enabled
            await submitButton.waitFor({ state: 'visible' })
            const isBtnEnabled = await submitButton.isEnabled();
            if (!isBtnEnabled) {
                console.log('Submit Button is disabled')
            }
            await submitButton.click();
        }
        catch (error) {
            throw new Error('Failed to click submit button');
        }
    }
    // capture the Haeder error message after clicking the submit button
    async getHeaderError() {
        const errorLocator = this.page.getByText('We welcome your feedback -');
        const errorText = await errorLocator.innerText();
        return errorText;
    }
    // Capture the Form forename errors.
    async getForenamerrors() {
        const forenameError = this.page.locator('#forename-err');
        await forenameError.waitFor({ state: 'visible' })
        return await forenameError.innerText();
    }
    // Capture the Form email errors.
    async getEmailErr() {
        const emailErr = this.page.locator('#email-err');
        await emailErr.waitFor({ state: 'visible' })
        return await emailErr.innerText();
    }

    // Capture the Form message errors.
    async getMsgErr() {
        const messageErr = this.page.locator('#message-err');
        await messageErr.waitFor({ state: 'visible' });
        return await messageErr.innerText();
    }

    //fill the form 
    async submitFeedback() {
        const homepage = new HomePage(this.page);
        const forenameInput = this.page.locator('#forename');
        const emailInput = this.page.locator('#email');
        const messageInput = this.page.locator('#message');
        const submitButton = this.page.getByRole('link', { name: 'Submit' });
        const successMessage = this.page.locator('.alert.alert-success strong');
        const backButton = this.page.locator('a.btn', { hasText: '« Back' });

        const forename = faker.person.firstName();
        const email = faker.internet.email();
        const message = faker.lorem.sentence();

        // Ensure form is visible before proceeding
        await expect(forenameInput).toBeVisible({ timeout: 5000 });
        await expect(emailInput).toBeVisible({ timeout: 5000 });

        await forenameInput.click();
        await forenameInput.fill(forename);

        await emailInput.click();
        await emailInput.fill(email);

        await messageInput.click();
        await messageInput.fill(message);

        await submitButton.click();

        // Wait for popup
        const sendingPopup = this.page.locator('div').filter({ hasText: 'Sending Feedback' }).nth(1);
        await expect(sendingPopup).toBeVisible({ timeout: 10000 });
        await expect(sendingPopup).toBeHidden({ timeout: 45000 });

        const popup = this.page.locator('div.popup.modal');

        //Optional: wait for it to appear (in case it’s not instant)
        // await popup.waitFor({ state: 'visible', timeout: 10000 });

        // Wait for it to become hidden (after feedback sent)
        //await popup.waitFor({ state: 'hidden', timeout: 45000 });

        await expect(successMessage).toHaveText(`Thanks ${forename}`, { timeout: 5000 });
        console.log(` Success message confirmed for: ${forename}`);
        // await this.page.waitForTimeout(3000);

        // Navigate back to form page
        await homepage.navgateToHome();
        await homepage.navigateToContactPage();
        await this.page.waitForLoadState('networkidle');

        // Confirm page is ready for next iteration
        //await expect(forenameInput).toBeVisible({ timeout: 5000 });
    }

}