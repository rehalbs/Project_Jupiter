/* Home Page Object class for jupitor toys 
*/
import { Page, expect } from '@playwright/test'

export class HomePage {
	readonly page: Page;


	//Constructor 
	constructor(page: Page) {
		this.page = page;
	}

	// check the siteis upand running

	async isSiteWorking(url: string) {
		try {
			await this.page.goto(url)
			await this.page.waitForLoadState('networkidle')
			const link = this.page.getByRole('link', { name: 'Jupiter Toys' });
			await link.waitFor({ state: 'visible' })
		}
		catch (error) {
			throw new error('Site is down')
		}
	}

	//page locators with returns

	async getHeader() {
		//Headter locator Class then child element header

		const header = await this.page.getByRole('heading', { name: 'Jupiter Toys' }).innerText();
		return header
	}
	async getWelcomeText() {
		//welcome message locator paragraph and class lead
		const welcomeMessage = this.page.locator('p.lead')
		return await welcomeMessage.innerText();
	}
	// Check that the shopping button is enabled

	async isShoppingBtPresent() {
		// Shpiing button Locator
		const shoppingButton = this.page.getByRole('link', { name: 'Start Shopping »' })
		return await shoppingButton.isVisible();

	}

}