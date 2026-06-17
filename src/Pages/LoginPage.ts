import {Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    async openNdosiPage() {
        await this.basePageGoToUrl('/');

    }

    async navigateToLoginPage() {
        await this.basePageClickElement(this.page.getByRole('button', { name: 'Login' }));
        await expect(this.page.locator('#login-email')).toBeVisible();
    }

    async userLogin(username: string, password: string) {
        const loginSubmitButton = this.page.locator('main').getByRole('button', { name: /^Login$/, exact: true });
        await this.basePageEnterText(this.page.locator('#login-email'), username);
        await this.basePageEnterText(this.page.locator('#login-password'), password);
        await this.basePageClickElement(loginSubmitButton);
        await expect(this.page.locator('#login-email')).toBeHidden({ timeout: 10000 });

      
        
    }

    async logout() {
    await this.page.getByRole('button', { name: '👤 Menu' }).click();

    this.page.once('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
    });

    await this.page.getByRole('button', { name: '🚪 Logout' }).click();
}
}

    



