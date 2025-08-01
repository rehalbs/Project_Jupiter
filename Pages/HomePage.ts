/**
 * HomePage Class
 * 
 * Manages interactions with the homepage, including site availability checks,
 * header text retrieval, navigation to other pages, and welcome message validation.
 * 
 * Author: Barry Singh  
 * Version: 1.0  
 * Created: 01 August 2025
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
			throw new Error('Site is down')
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


	// Navigate to Contact Page wait for all the elements are render
	async navigateToContactPage() {
		await this.page.getByRole('link', { name: 'Contact' }).click();
		await this.page.waitForLoadState('networkidle');

	}
	//Navigate to Home Page 
	async navgateToHome() {
		await this.page.getByRole('link', { name: 'Home' }).click();
		await this.page.waitForLoadState('networkidle');
	}

	//Navigate to shop Page

	async navigateToShopPage() {

		await this.page.getByRole('link', { name: 'Shop' }).click();
		await this.page.waitForLoadState('networkidle');
	}

}