import { test as setup, expect } from '@playwright/test';

setup("Create curstomer 01 auth", async ({ page, context}) => {
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01"
    const customer01authFile = ".auth/customer01.json"

    await page.goto("https://practicesoftwaretesting.com/auth/login")

    //fill email
    //await page.getByTestId("email").click();
    await page.locator('[data-test="email"]').fill(email);

    // fill password
    await page.locator('[data-test="password"]').fill(password);

    //click submit
    await page.locator('[data-test="login-submit"]').click();

    //Validate login
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');

    await context.storageState({path: customer01authFile});
    

})