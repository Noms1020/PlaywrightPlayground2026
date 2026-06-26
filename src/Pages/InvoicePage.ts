import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { NewInvoiceInput } from '../data/Testdata';

export class InvoicePage extends BasePage {
    private normalizeDateForHtmlInput(dateValue: string): string {
        const normalizedValue = dateValue.trim().replace(/[/.]/g, '-');
        const htmlDatePattern = /^\d{4}-\d{2}-\d{2}$/;

        if (!htmlDatePattern.test(normalizedValue)) {
            throw new Error(`Invalid date format: "${dateValue}". Use YYYY-MM-DD.`);
        }

        return normalizedValue;
    }

    private async selectPaymentStatus(paymentStatus: string): Promise<void> {
        const normalizedStatus = paymentStatus.trim();
        const titleCaseStatus = normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1).toLowerCase();

        const paymentStatusSelect = this.page
            .locator('select')
            .filter({ has: this.page.locator('option').filter({ hasText: /paid|pending/i }) })
            .first();

        await expect(paymentStatusSelect).toBeVisible();

        const selectionAttempts: Array<{ value?: string; label?: string }> = [
            { value: normalizedStatus },
            { value: normalizedStatus.toLowerCase() },
            { value: normalizedStatus.toUpperCase() },
            { label: normalizedStatus },
            { label: titleCaseStatus }
        ];

        for (const option of selectionAttempts) {
            const selected = await paymentStatusSelect.selectOption(option);
            if (selected.length > 0) {
                return;
            }
        }

        throw new Error(`Unable to select payment status: "${paymentStatus}".`);
    }

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
        const coursesToAdd = Math.max(invoiceData.coursesToAdd, requiredCourseRows - 1);

        // for (let index = 0; index < requiredCourseRows; index++) {
        //     await this.page.getByRole('button', { name: '➕ Add Course' }).click({ force: true });
        // }

        // for (let index = 0; index <invoiceData.selectedCourses.length; index++) {

        //     await this.page.getByRole('combobox').nth(index).selectOption(invoiceData.selectedCourses[index]);
        //     await this.page.getByRole('combobox').locator(`option[value="${invoiceData.selectedCourses[index]}"]`).waitFor({ timeout: 5000 });
        //     await this. page.locator('select').selectOption({value: invoiceData.selectedCourses[index]});
        // }

        //         for (let index=0; index<invoiceData.selectedCourses.length; index++) {

        //         const row=this.page.locator('table.invoice-items-table tbody tr').nth(index);

        //         await row.locator('select').selectOption({

        //          value: invoiceData.selectedCourses[index]

        // });

        

        for (let index = 0; index < requiredCourseRows; index++) {
            await this.page.getByRole('button', { name: '➕ Add Course' }).click({ force: true });
        }
        await this.page.getByRole('button', { name: '➕ Add Course' }).click({ force: true });


        for (let index = 0; index < invoiceData.selectedCourses.length; index++) {

            const row = this.page.locator('table.invoice-items-table tbody tr').nth(index);

            await row.locator('select').selectOption({

                value: invoiceData.selectedCourses[index]

            });

        } 


            const dueDateInput = this.page.locator('input[type="date"]');
            const dueDateValue = this.normalizeDateForHtmlInput(invoiceData.DueDate);
            await dueDateInput.clear();
            await dueDateInput.fill(dueDateValue);
        await this.selectPaymentStatus(invoiceData.paymentStatus);
        await this.page.getByRole('textbox', { name: 'Additional notes...' }).click();
        await this.page.getByRole('textbox', { name: 'Additional notes...' }).fill(invoiceData.additionalNotes);
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await this.page.getByRole('button', { name: '✅ Create Invoice' }).click();

    };





}