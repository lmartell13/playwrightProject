import { type Locator, type Page, expect} from "@playwright/test";

//Class to store the form fields 
export class checkoutPage {

    //List of locators 
    readonly page: Page;
    // Product locators
    readonly product: Locator;
    readonly addcart: Locator;
    readonly cartQuantity: Locator;
    readonly navCart: Locator;
    readonly proceed1: Locator;
    readonly proceed2: Locator;
    // Locator used to make an assertion
    readonly stepIndicator: Locator;
    //Locators used for the address form
    readonly street: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly country: Locator;
    readonly zipCode: Locator;
    readonly proceed3: Locator;
    //Locators used on the payment step
    readonly finish1: Locator;
    readonly payment: Locator;
    readonly installments: Locator;
    readonly notification: Locator;

    constructor(page: Page) {
        this.page = page;
        // Product locators
        this.product = page.getByText("Claw Hammer with Shock Reduction Grip");
        this.addcart = page.locator('[data-test="add-to-cart"]');
        this.cartQuantity = page.locator('[data-test="cart-quantity"]');
        this.navCart = page.locator('[data-test="nav-cart"]');
        this.proceed1 = page.locator('[data-test="proceed-1"]');
        this.proceed2 = page.locator('[data-test="proceed-2"]');
        // Locator used to make an assertion
        this.stepIndicator = page.locator(".step-indicator");
        //Locators used for the address form
        this.street = page.locator('[data-test="street"]');
        this.city = page.locator('[data-test="city"]');
        this.state = page.locator('[data-test="state"]');
        this.country = page.locator('[data-test="country"]');
        this.zipCode = page.locator('[data-test="postal_code"]');
        this.proceed3 = page.locator('[data-test="proceed-3"]');
        //Locators used on the payment step
        this.finish1 = page.locator('[data-test="finish"]');
        this.payment = page.locator('[data-test="payment-method"]');
        this.installments = page.locator('[data-test="monthly_installments"]');
        this.notification = page.locator('.help-block');
        
    }

    //Opening the login page of the website
    async goto(){
        await this.page.goto(process.env.URL + "/");
    }

    // ACTIONS
    //Select the product
    async selectProduct(){
        await this.product.click()
        //await page.waitForTimeout(3000);
        await this.addcart.click()
        await expect(this.cartQuantity).toHaveText("1")
        await this.navCart.click()
    }

    //Next steps
    async nextSteps(){
        await this.proceed1.click()
        await this.proceed2.click()
    }
    //Fill the fields with the values received as parameters
    async fillAddress(data:{
        //productInput: string,
        //cartQuantityInput: string ,
        streetInput: string ,
        cityInput: string,
        stateInput: string,
        countryInput: string,
        zipCodeInput: string
        
    }){
        await this.street.fill(data.streetInput);
        await this.city.fill(data.cityInput);
        await this.state.fill(data.stateInput);
        await this.country.fill(data.countryInput);
        await this.zipCode.fill(data.zipCodeInput);

        await this.proceed3.click();
    }

    //Select payment method

    async paymentMethod(method:string, installments:string){
        await expect(this.finish1).toBeDisabled();
        //Payment option
        await this.payment.selectOption("Buy Now Pay Later");
        
        await this.installments.selectOption('6 Monthly Installments');
        //Finish the checkout process
        await this.finish1.click();
    }

    //Confirm checkout

    async validateCheckout(){
        //Assertion to know if the process was successful
        await expect(this.notification).toHaveText('Payment was successful');
    }

}