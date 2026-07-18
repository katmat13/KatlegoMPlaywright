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

        //Add courses
        for (let i = 0; i < 4; i++) {
            await this.addCourseItem();
        }

        await this.page.waitForTimeout(3000);


        //Add Due Date
        await this.page.locator('input[type="date"]').fill('2026-06-30');

        //Select Payment Status
        const paymentDropdown = this.page.locator('select:has(option[value="pending"])');
        await paymentDropdown.selectOption('paid');

        //Verify Amount
        // await expect(this.page.getByText('R 2').nth(1).toContainText('R 2 800,00'));
        // await expect(this.page.getByText(/R\s*2\s*800\,00/)).toBeVisible();
        //await expect(this.page.getByText('R 2 800')).toBeVisible();
        // await expect(this.page.getByText('R 2').first()).toBeVisible();
        // const total = await this.basePageGetTextValue(this.page.getByText('R2').first());
        //console.(total);
        const totalRegex = /R\s*2\s*800[\.,]00/;
        const totalContainer = this.page.locator('.admin-invoices');
        //await expect(totalContainer.getByText(totalRegex)).toBeVisible();
        // await expect(this.page.locator('.total-amount')).toHaveText(totalRegex);
        await expect(this.page.getByText(/R\s*2\s*800[\.,]00/).last()).toBeVisible();




        //Add notes
        await this.basePageEnterText(this.page.getByRole('textbox', { name: 'Additional notes...' }), ("Added 4 courses for KatlegoPty Ltd due 2026-06-30. Total amount: "));





        //Click on the Create Invoice Button
        await this.page.waitForTimeout(300);
        //await this.basePageClickElement(this.page.getByRole('button', { name: '✅ Create Invoice' }));
        //await this.page.getByRole('button', { name: '✅ Create Invoice' }).click({ force: true });
        await this.page.getByRole('button', { name: '✅ Create Invoice' }).evaluate((el) => (el as HTMLElement).click());
        //await expect(this.page.getByRole('dialog')).toBeVisible();
        await this.page.waitForTimeout(3000);


        //Click OK on dialog box

        //Verify that invoice was created
        await expect(
            this.page.locator('.admin-invoices tbody tr').first().getByText('KatlegoPty Ltd.')
        ).toBeVisible();


    }

    async addCourseItem() {
        // Click Add Course (React-safe click)
        await this.page.locator('button:has-text("Add Course")').evaluate((el) => (el as HTMLElement).click());

        await this.page.waitForTimeout(300);
        const courseDropdowns = this.page.locator('select:has(option:has-text("Dot Net"))');
        await courseDropdowns.last().selectOption('31b1143b-aa19-4c20-bdf6-6700484b0dcb');

        // Add Description
        // await this.basePageEnterText(
        const descriptionBox = this.page.getByRole('textbox', { name: 'Description' }).last();
        await this.basePageEnterText(
            descriptionBox,
            'A practical starter course on API testing using Postman...'
        );
    }


    async viewInvoice() {

        //Verify that invoice was created
        //Latest invoice appears on top, view and verify that details are the same
        await this.page.locator('.admin-invoices').getByRole('button', { name: '📄 PDF' }).first().click();


    }


}