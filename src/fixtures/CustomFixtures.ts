import {test as base } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { Page, Locator, expect} from '@playwright/test';
import { BasePage } from '../Pages/BasePage';
import {HomePage} from '../Pages/HomePage';
import { InvoicePage } from '../Pages/InvoicePage';

type CustomFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    invoicePage: InvoicePage;

};

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    invoicePage: async ({ page }, use) => {
        await use(new InvoicePage(page));
    }
   
   
});

export { expect } from '@playwright/test';