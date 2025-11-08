import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/loginPage';

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
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
});