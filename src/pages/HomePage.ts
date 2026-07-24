import { Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {


    async verifyHomePageIsDisplayed() {
        await expect(this.page).toHaveTitle(/Ndosi Test Automation/);   
    }

    async navigateToInstructorPage() {
        await this.basePageClickElement(this.page.locator('xpath=//button//span[text() = "Menu"]'));
        await this.basePageClickElement(this.page.locator('xpath=//span[contains(.,"Instructor Panel")]').first());   

    }

      async navigateToUserProfilePage() {
        await this.basePageClickElement(this.page.locator('xpath=//button//span[text() = "Menu"]'));
        await this.basePageClickElement(this.page.locator('xpath=//span[contains(.,"My Profile")]').first());   

    }

    async navigateToAdminPage() {
        await this.basePageClickElement(this.page.locator('xpath=//button//span[text() = "Menu"]'));
        await this.basePageClickElement(this.page.locator('xpath=//span[contains(.,"Admin Panel")]').first());

    }

    

}
