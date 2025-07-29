//Contact Page
import { Page, expect } from '@playwright/test';
import { error } from 'console';

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
    // Capture the Form errors.
    async getFormErrors(): Promise<string[]> {
        const formErrorLocator = this.page.locator('.help-inline.ng-scope');
        //count the number of errors
        const errorCount = await formErrorLocator.count();
        console.log("Number of error in this page are " + errorCount);
        // capture the errors in the array 
        const errorsArray: string[] = [];
        for (let i = 0; i < errorCount; i++) {
            const errorElement = formErrorLocator.nth(i);
            //check the error is visible
            if (await errorElement.isVisible()) {
                const formError = await errorElement.innerText();
                //add the error to the array
                errorsArray.push(formError.trim());
            }
        }
        return errorsArray;
    }



}