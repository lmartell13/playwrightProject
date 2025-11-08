import { test, expect } from '@playwright/test';


test('logintest without page object', async ({ page }) => {
  //Open the website
  await page.goto('https://practicesoftwaretesting.com/');
  //Locate the sign in label
  await page.locator('[data-test="nav-sign-in"]').click();
  
  // Locate and fill the form fields
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="password"]').fill('welcome01');
  //Log into the system
  await page.locator('[data-test="login-submit"]').click();
  
  //Validate login was successful by locating two elements only logged in users are able to see
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
});