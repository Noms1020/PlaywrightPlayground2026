import {expect, test} from '../src/fixtures/CustomFixtures';
import {AdminUser, invalidUsers} from '../src/data/Testdata';


test('Positive login - Admin', async ({ loginPage}) => {
    await loginPage.basePageGoToUrl('/');
    await loginPage.navigateToLoginPage();
    await loginPage.userLogin(AdminUser.admin.username, AdminUser.admin.password);
    await loginPage.logout();
});
