import { test, expect } from '../src/fixtures/customFixtures';
import { validUsers } from '../src/data/testData';

test('log in as admin', async ({ loginPage, homePage, adminPage, page }) => {

    //launch URL and log in
    await loginPage.performFullLogin("admin@gmail.com", "@12345678");

    //verify that dasboard URL has words'dashboard'
    await expect.soft(page).toHaveURL(/dashboard/);

    //verify that the homepage is displayed
    await homePage.verifyHomePageIsDisplayed();

   // await homePage.navigateToAdminPage();

    //await adminPage.verifyAdminPageIsDisplayed();

   // await adminPage.navigateToInvoices();
   // await adminPage.createInvoice();

    await page.waitForTimeout(5000);



}); 