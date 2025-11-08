import { test, expect } from '@playwright/test';

test.describe("Checkout challenge", async () => {
    //Calling the user session
    test.use({ storageState: ".auth/customer01.json"});
 
    test.beforeEach(async ({page}) => {
        //First action performed before each test - Open the website
        await page.goto("https://practicesoftwaretesting.com/");
    });

    test("buy now pay later", async ({page, headless}) => {
        //Choosing the product to purchase
        await page.getByText("Claw Hammer with Shock Reduction Grip").click();
        //Adding it to the cart
        await page.locator('[data-test="add-to-cart"]').click();
        //Checking the quantity box is not empty
        await expect(page.locator('[data-test="cart-quantity"]')).toHaveText("1");
        //Opening the cart
        await page.locator('[data-test="nav-cart"]').click();
        //Going to step #2 of the checkout process
        await page.locator('[data-test="proceed-1"]').click();
        //Going to step #3 of the checkout process
        await page.locator('[data-test="proceed-2"]').click();
        //Validating we are indeed on step #3
        await expect(
            page.locator(".step-indicator").filter({ hasText: "3"})
        ).toHaveCSS("background-color", "rgb(128, 128, 128)");
        //Filling the form
        await page.locator('[data-test="street"]').fill("123 Testing Way");
        await page.locator('[data-test="city"]').fill("Sacramento");
        await page.locator('[data-test="state"]').fill("California");
        await page.locator('[data-test="country"]').fill("USA");
        await page.locator('[data-test="postal_code"]').fill("98765");
        
        //Going to step #4 of the checkout process
        await page.locator('[data-test="proceed-3"]').click();
        //Validate a payment method needs to be selected before finishing
        await expect(page.locator('[data-test="finish"]')).toBeDisabled();
        //Payment option
        await page.locator('[data-test="payment-method"]').selectOption("Buy Now Pay Later");
        
        await page.locator('[data-test="monthly_installments"]').selectOption('6 Monthly Installments');
        //Finish the checkout process
        await page.locator('[data-test="finish"]').click();

        //Assertion to know if the process was successful
        await expect(page.locator('.help-block')).toHaveText('Payment was successful');
        
       
    });
});


