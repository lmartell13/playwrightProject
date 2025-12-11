import { test, expect } from '@playwright/test';
import { checkoutPage } from '../../pages/checkout/checkoutPage';

test.describe("Checkout challenge", async () => {
    //Calling the user session
    test.use({ storageState: "storageState.json"});
 
    /**test.beforeEach(async ({page}) => {
        //First action performed before each test - Open the website
        await page.goto("https://practicesoftwaretesting.com/");
    });**/

    test("POM Checkout", async ({page}) => {
        const checkPage = new checkoutPage(page)
        //Opening the page
        await checkPage.goto()

        //Select the product
        await checkPage.selectProduct();

        //Next steps
        await checkPage.nextSteps();

        //Form
        const direccion = {
            streetInput: "123 Testing Way",
            cityInput: "Sacramento",
            stateInput: "California",
            countryInput: "USA",
            zipCodeInput: "98765"
        };
        
        await checkPage.fillAddress(direccion);

        await expect(
            checkPage.stepIndicator.filter({ hasText: "3"})
        ).toHaveCSS("background-color", "rgb(51, 153, 51)");
        
        //Going to the payment process
        await checkPage.paymentMethod("Buy Now Pay Later", "6 Monthly Installments");
        
        //Final assertion
        await checkPage.validateCheckout();
        
        

        
    })

});


