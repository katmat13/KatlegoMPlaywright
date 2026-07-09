import { Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    get verifyHomePageHeading(): Locator {
        // return this.page.getByRole('heading', { name: /Welcome\s*back123/i }); //regex  for case insensitive match and to ignore any whitespace between "Welcome" and "back"
        return this.page.getByRole('heading', { name: /Welcome\s*back/i }); //Restore working regex
    }

    async verifyHomePageIsDisplayed() {
        await this.basePageVerifyElementIsVisible(this.verifyHomePageHeading);    
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
