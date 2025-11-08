import { type Locator, type Page} from "@playwright/test";

//Class to store the form fields 
export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]')
    }

    //Opening the login page of the website
    async goto(){
        await this.page.goto(process.env.URL + "/auth/login");
    }
    //Fill the fields with the values received as parameters
    async login(email: string, password: string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}