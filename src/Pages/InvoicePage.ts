import { Locator} from '@playwright/test';
import { BasePage } from './BasePage';
import { NewInvoiceInput } from '../data/Testdata';

export class InvoicePage extends BasePage {
    get verifyAdminDashboardHeading(): Locator {
        return this.page.getByRole('heading', { name: /Admin\s*Dashboard/i }); //regex  for case insensitive match and to ignore any whitespace between "Admin" and "Dashboard"
    }

   async verifyAdminDashboardIsDisplayed() {
      await this.basePageVerifyElementIsVisible(this.verifyAdminDashboardHeading);    
   }

    async navigateToInvoicePage() {

        await this.basePageClickElement(this.page.getByRole('button', { name: /Invoices/i }));
        await this.basePageVerifyElementIsVisible(this.page.getByRole('heading', { name: /Invoices/i }));
    }

    async createNewInvoice(invoiceData: NewInvoiceInput) {
        await this.basePageClickElement(this.page.getByRole('button', { name: /New\s*Invoice/i }));
        await this.basePageVerifyElementIsVisible(this.page.getByRole('heading', { name: /(Create|New)\s*Invoice/i }));
        const clientNameOrEmailInput = this.page.getByRole('textbox', { name: 'Type client name or email...' });
        await clientNameOrEmailInput.click();
        if (invoiceData.clientNameOrEmail) {
            await clientNameOrEmailInput.fill(invoiceData.clientNameOrEmail);
        }
        await this.page.keyboard.press('Escape');

        await this.page.getByRole('textbox', { name: 'Enter client address...' }).fill(invoiceData.clientAddress);

        const requiredCourseRows = invoiceData.selectedCourses.length;
        const coursesToAdd = Math.max(invoiceData.coursesToAdd, requiredCourseRows -1);

        for (let index = 0; index < coursesToAdd; index++) {
            await this.page.getByRole('button', { name: '➕ Add Course' }).click({ force: true });
        }

        for (let index = 0; index <invoiceData.selectedCourses.length; index++) {
           
            await this.page.getByRole('combobox').nth(index).selectOption(invoiceData.selectedCourses[index]);
            //await this.page.getByRole('combobox').locator(`option[value="${invoiceData.selectedCourses[index]}"]`).waitFor({ timeout: 5000 });
        }

         await this. page.locator('input[type="date"]').fill(invoiceData.DueDate);
        await this.page.locator('select').filter({ has: this.page.locator('option[value="paid"], option[value="pending"]') }).nth(1).selectOption(invoiceData.paymentStatus);
        await this.page.getByRole('textbox', { name: 'Additional notes...' }).click();
        await this.page.getByRole('textbox', { name: 'Additional notes...' }).fill(invoiceData.additionalNotes);
        this. page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await this.page.getByRole('button', { name: '✅ Create Invoice' }).click();
};





}