import {expect, test} from '../src/fixtures/CustomFixtures';
import { AdminUser, InvoiceData } from '../src/data/Testdata';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'passed') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = testInfo.outputPath(`passed-screenshot-${timestamp}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach('passed-screenshot', {
      path: screenshotPath,
      contentType: 'image/png'
    });
  }
});

  test.only('Create a new invoice', async ({ loginPage, homePage, invoicePage }) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(AdminUser.admin.username, AdminUser.admin.password);
        await homePage.verifyHomePageIsDisplayed();
        await homePage.navigateToAdminPage();
        await invoicePage.verifyAdminDashboardIsDisplayed();
        await invoicePage.navigateToInvoicePage();
        await invoicePage.createNewInvoice(InvoiceData.newInvoice);
        //await loginPage.logout();
    });