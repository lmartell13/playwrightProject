import { test, expect } from '@playwright/test';

test.describe("Checkout challenge", async () => {
    
    test.use({ storageState: ".auth/customer01.json"});
 
    test.beforeEach(async ({page}) => {
        
        await page.goto("https://practicesoftwaretesting.com/");
    });

    test("buy now pay later", async ({page, headless}) => {
        
        await page.getByText("Claw Hammer with Shock Reduction Grip").click();
        
        await page.locator('[data-test="add-to-cart"]').click();
        
        await expect(page.locator('[data-test="cart-quantity"]')).toHaveText("1");
        
        await page.locator('[data-test="nav-cart"]').click();
        
        await page.locator('[data-test="proceed-1"]').click();
        
        await page.locator('[data-test="proceed-2"]').click();
        
        await expect(
            page.locator(".step-indicator").filter({ hasText: "3"})
        ).toHaveCSS("background-color", "rgb(128, 128, 128)");
        
        await page.locator('[data-test="street"]').fill("123 Testing Way");
        await page.locator('[data-test="city"]').fill("Sacramento");
        await page.locator('[data-test="state"]').fill("California");
        await page.locator('[data-test="country"]').fill("USA");
        await page.locator('[data-test="postal_code"]').fill("98765");
        
        await page.locator('[data-test="proceed-3"]').click();
        
        await expect(page.locator('[data-test="finish"]')).toBeDisabled();
        
        await page.locator('[data-test="payment-method"]').selectOption("Buy Now Pay Later");
        
        await page.locator('[data-test="monthly_installments"]').selectOption('6 Monthly Installments');
        
        await page.locator('[data-test="finish"]').click();
        await expect(page.locator('.help-block')).toHaveText('Payment was successful');
        
       
    });
});


