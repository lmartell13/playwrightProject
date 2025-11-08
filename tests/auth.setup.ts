import { test as setup, expect } from '@playwright/test';

/* This is added in order to save some lines of code by saving a user session in a cookie, meaning for eavery test we execute we don't have to take into consideration
the login flow*/

setup("Create customer 01 auth", async ({ page, context}) => {
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01"
    const customer01authFile = ".auth/customer01.json"
    //Open website
    await page.goto("https://practicesoftwaretesting.com/auth/login")
    //fill email
    await page.waitForSelector('[data-test="email"]', { state: 'visible' });
    await page.locator('[data-test="email"]').fill(email);
    // fill password
    await page.locator('[data-test="password"]').fill(password);
    //click submit
    await page.locator('[data-test="login-submit"]').click();
    //Validate login
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
    //Store the session
    await context.storageState({path: customer01authFile});
    

})