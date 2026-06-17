import {expect, test} from '../src/fixtures/CustomFixtures';
import { AdminUser } from '../src/data/Testdata';


    test('Navigate to Admin Panel', async ({ loginPage, homePage }) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(AdminUser.admin.username, AdminUser.admin.password);
        await homePage.verifyHomePageIsDisplayed();
        await homePage.navigateToAdminPage();
        await loginPage.logout();
        });