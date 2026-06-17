import { Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    get verifyHomePageHeading(): Locator {
        return this.page.getByRole('heading', { name: /Welcome\s*back/i }); //regex  for case insensitive match and to ignore any whitespace between "Welcome" and "back"
    }

    async verifyHomePageIsDisplayed() {
        await this.basePageVerifyElementIsVisible(this.verifyHomePageHeading);    
    }

    async navigateToAdminPage() {
        
        await this.basePageClickElement(this.page.locator('xpath=//button//span[text() = "Menu"]'));
        await this.basePageClickElement(this.page.locator('xpath=//button[contains(@class,"nav-dropdown-item")]//span[normalize-space()="Admin Panel"]'));   

    }
}