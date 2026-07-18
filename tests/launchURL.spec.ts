//import {expect, test} from '@playwright/test';
import {test, expect} from '../src/fixtures/customFixtures';
import {validUsers} from '../src/data/testData';

test('launch Ndosi dev Website',async({loginPage, homePage, adminPage, page})=>{
    //await page.goto('*/');
    //await expect(page).toHaveTitle('Ndosi Test Automation');
    //await page.waitForTimeout(5000);

    //await loginPage.navigateToLoginPage();
    await loginPage.performFullLogin("admin@gmail.com","@12345678");
  //  await loginPage.performFullLogin(validUsers.admin.username, validUsers.admin.password);
    await expect.soft(page).toHaveURL(/dashboard/);

    await homePage.verifyHomePageIsDisplayed();
    await homePage.navigateToAdminPage();

   await adminPage.verifyAdminPageIsDisplayed();

    await adminPage.navigateToInvoices();
   await  adminPage.createInvoice();

   await page.waitForTimeout(10000);



}); 

test('Positive login - Admin', async ({ loginPage, homePage, adminPage, page }) => {
    await loginPage.basePageGoToUrl('*/');
    await loginPage.navigateToLoginPage();
   // await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await loginPage.performFullLogin(validUsers.admin.username, validUsers.admin.password);
   // await loginPage.userLogin("admin@gmail.com ","@12345678");
    //soft assertion
    //await expect.soft(page).toHaveURL(/dashboard123/); //failing the test on purpose so we can test soft assertions
   // await expect.soft(page).toHaveURL(/dashboard/); // Restore path to make test pass.

    await homePage.verifyHomePageIsDisplayed();

   await homePage.navigateToAdminPage();

   await adminPage.verifyAdminPageIsDisplayed();
   await  adminPage.navigateToInvoices();
   await  adminPage.createInvoice();

    
});


