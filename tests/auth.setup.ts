import { test as setup, expect } from "@playwright/test"; 
import fs from "fs";

// This setup script logs in a user and saves the authenticated state for later tests
setup("Create customer 01 auth", async ({ page, context }) => {
  
  // Email and password for the test customer account
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";

  // File where the authenticated session will be stored
  const authFile = "storageState.json"; 

  // Ensure the target folder exists 
  fs.mkdirSync('.', { recursive: true });

  // Navigate to the login page of the application
  await page.goto("https://practicesoftwaretesting.com/auth/login");

  // Fill the email input field with the customer email
  await page.locator('[data-test="email"]').fill(email);

  // Fill the password input field with the customer password
  await page.locator('[data-test="password"]').fill(password);

  // Click the login button to submit the form
  await page.locator('[data-test="login-submit"]').click();

  // Select the navigation menu that appears only after successful login
  const nav = page.locator('[data-test="nav-menu"]');

  // Wait until the navigation menu becomes visible (helps avoid CI timing issues)
  await nav.waitFor({ state: "visible", timeout: 8000 });

  // Validate that the logged-in user's name is displayed in the navigation bar
  await expect(nav).toContainText('Jane Doe');

  // Save the authenticated browser storage to a file for reuse in other test projects
  await context.storageState({ path: authFile });
});
