import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {

    get verifyAdminPageHeading(): Locator {
        return this.page.getByRole('heading', { name: /Admin\s*Dashboard/i }); //regex  for case insensitive match and to ignore any whitespace between "Admin" and "Dashboard"
    }

    async verifyAdminPageIsDisplayed() {
        await this.basePageVerifyElementIsVisible(this.verifyAdminPageHeading);
    }

    async navigateToInvoices() {

        await this.basePageClickElement(this.page.getByRole('button', { name: 'Invoices' }));
        await expect.soft(this.page.locator('.admin-invoices')).toBeVisible();

    }

    async createInvoice() {

        //Click on the New Invoice Button
        await this.basePageClickElement(this.page.getByRole('button', { name: /New Invoice/i }));

        //Verify that that the Create New Invoice heading is displayed
        await expect.soft(this.page.getByRole('heading', { name: '➕ Create New Invoice' })).toBeVisible();

        //Enter Client
        await this.basePageEnterText(this.page.getByRole('textbox', { name: 'Type client name or email...' }), ("KatlegoPty Ltd."));

        //Enter Client Address
        await this.basePageEnterText(this.page.getByRole('textbox', { name: 'Enter client address...' }), ("Johannesburg, Gauteng, 2197"));

        //Add Course
        //await this.basePageClickElement(this.page.getByRole('button', { name: '➕ Add Course' }));

        //Add Due Date
        await this.page.locator('input[type="date"]').fill('2026-06-30');

        //Select Payment Status
        await this.page.getByRole('combobox').selectOption('paid'); //Paid
        //await this.page.getByRole('combobox').selectOption('pending'); //Pending



        //Add notes
        await this.basePageEnterText(this.page.getByRole('textbox', { name: 'Additional notes...' }), ("Added 4 courses for KatlegoPty Ltd due 2026-06-30. Total amoundue R2800,00."));

        //Verify Amount
        await expect(this.page.getByText('R 0,00').nth(1)).toContainText('R 2 800,00');

        //Click on the Create Invoice Amount
        //await this.basePageClickElement(getByRole('button', { name: '✅ Create Invoice' }));





    }


}