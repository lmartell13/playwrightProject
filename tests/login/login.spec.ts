import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/loginPage';

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
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
});

test("Login with page object", async ({page}) => {
  //Creating and instance of the class
  const loginPage = new LoginPage(page);
  //Calling the method to open the website
  await loginPage.goto();
  //Sending the credentials
  await loginPage.emailInput.fill('customer@practicesoftwaretesting.com');
  await loginPage.passwordInput.fill('welcome01');
  await loginPage.loginButton.click();

  /* Another way of doing it
  await loginPage.login("customer@practicesoftwaretesting.com","welcome01"); 
  */
  //Validate login was successful by locating two elements only logged in users are able to see
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
});