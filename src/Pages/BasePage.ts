import { Page, Locator, expect} from '@playwright/test';

export class BasePage {
    
    constructor(public page: Page) {
        this.page = page;
    }

    //create reusable methods for common actions on the page
    async basePageGoToUrl(url: string) {
        await this.page.goto(url);
    }

    async basePageClickElement(locator: Locator) {
        await locator.click();
    }

    async basePageEnterText(locator: Locator, text: string) {
        await locator.clear();
        await locator.fill(text);
    }

    async basePageGetTextValue(locator: Locator): Promise<string> {
        return await locator.inputValue();
    }
    
    async basePageVerifyElementIsVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    




}