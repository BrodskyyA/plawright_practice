import { test, expect } from '@playwright/test';
import { GaragePage } from '../../pageObjects/GaragePage';
import { SignInForm } from '../../pageObjects/forms/SignInForm';
import { correctEmail, correctPassword, registeredEmail, registeredPassword } from '../../data/generateUserData';


test.describe('Garage tests with POM', () => {
    let garagePage: GaragePage;
    let signInForm: SignInForm;

    test('Login with valid credentials', async ({ page }) => {
        garagePage = new GaragePage(page);
        signInForm = new SignInForm(page);
        await page.goto('/');
        await signInForm.loginWithValidCredentials(registeredEmail, registeredPassword);
        await garagePage.clickAddCarButton();
        await page.context().storageState({
            path: 'userData.json'
        })
    })
})
