import { test, expect } from '../src/fixtures/customFixtures';
//import { validUsers } from '../src/data/testData';

test.only('create invoice', async ({ loginPage, homePage, adminPage, page }) => {

    await loginPage.performFullLogin("testkat@gmail.co.za", "Test123."); //("admin@gmail.com","@12345678");
    await expect.soft(page).toHaveURL(/dashboard/);

    await homePage.verifyHomePageIsDisplayed();
    await homePage.navigateToAdminPage();

    await adminPage.verifyAdminPageIsDisplayed();

    await adminPage.navigateToInvoices();
    await adminPage.createInvoice();
    await adminPage.viewInvoice();

    await page.waitForTimeout(3000);



}); 