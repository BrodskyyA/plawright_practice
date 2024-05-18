import { expect, type Locator, type Page } from '@playwright/test';
import { execArgv } from 'process';

export class MainPage {
    readonly page: Page;
    readonly signUpButton: Locator;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly repasswordField: Locator;
    readonly registerButton: Locator;
    readonly signUpForm : Locator;
    readonly alertMessage: Locator;
    readonly nameIsRequired: Locator;
    readonly lastNameIsRequiredpage: Locator
    readonly EmailIsRequired: Locator
    readonly PassportIsRequired: Locator
    readonly rePasswordIsRequired: Locator
    readonly nameLengthMsg : Locator

    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.getByText('Sign up' , { exact: true });
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword')
        this.repasswordField = page.locator('#signupRepeatPassword');
        this.registerButton = page.getByText('Register' , { exact: true })
        this.signUpForm = page.locator('div.modal-content');
        this.alertMessage = page.locator('p.alert.alert-danger');
        this.nameIsRequired = page.getByText('Name required');
        this.lastNameIsRequiredpage = page.getByText('Last name required');
        this.EmailIsRequired =  page.getByText('Email required');
        this.PassportIsRequired = page.getByText('Password required');
        this.rePasswordIsRequired = page.getByText('Re-enter password required');
        this.nameLengthMsg = page.locator('div[class="invalid-feedback"] >p')

    }   
    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

}