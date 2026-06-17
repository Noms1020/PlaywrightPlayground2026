import {expect, test} from '../src/fixtures/CustomFixtures';
import { AdminUser, InvoiceData } from '../src/data/Testdata';

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