import { test, expect } from '@playwright/test';
import { MainPage } from '../pageObjects/MainPage.ts'; 
import { GaragePage } from '../pageObjects/GaragePage.ts';
import { nameExist, nameLengthMsgText, nameInvalid, lastNameExist,lasNameInvalid, emailIncorrect, passwordReq, rePassMismatch} from '../data/validationMsg.ts';
import {correctEmail,correctPassword,incorrectPassword} from '../data/generateUserData.js'

let mainPage: MainPage;
let garagePage : GaragePage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page)
  await page.goto('/')
  await mainPage.clickSignUpButton()
});

test.describe('Verify registration with valid credentials', () => {
  test('Verify successfull registration with valid data', async ({ page }) => {
    await mainPage.nameField.fill('Andriy')
    await mainPage.lastNameField.fill('Brodskyy')
    await mainPage.emailField.fill(correctEmail)
    await mainPage.passwordField.fill(correctPassword)
    await mainPage.repasswordField.fill(correctPassword)
    await mainPage.clickRegisterButton()
    await expect(page).toHaveURL(new RegExp('/panel/garage$')) 
  });
  test('Verify new registration for already registered user', async ({ page }) => {
    await mainPage.nameField.fill('Andriy')
    await mainPage.lastNameField.fill('Brodskyy')
    await mainPage.emailField.fill('a.brodskyy@gmail.com')
    await mainPage.passwordField.fill('Lemberg159')
    await mainPage.repasswordField.fill('Lemberg159')
    await mainPage.clickRegisterButton()
    await expect(mainPage.alertMessage).toHaveText(nameExist)
  });
});

test.describe('Verify mandatory fields', () => {
  test('Verify all fields are mandatory and informing is displayed', async ({ page }) => {
    await mainPage.nameField.press('Tab')
    await expect(mainPage.nameIsRequired).toBeVisible; 
    await mainPage.lastNameField.press('Tab')
    await expect(mainPage.lastNameIsRequiredpage).toBeVisible; 
    await mainPage.emailField.press('Tab')
    await expect(mainPage.EmailIsRequired).toBeVisible; 
    await mainPage.passwordField.press('Tab')
    await expect(mainPage.PassportIsRequired).toBeVisible; 
    await mainPage.repasswordField.press('Tab')
    await expect(mainPage.rePasswordIsRequired).toBeVisible; 
    await expect(mainPage.registerButton).toHaveAttribute("disabled", ""); 
  });
});

test.describe('Verify the "Name" field validation', () => {
    test(' Verify the "Name" field min lenth validation', async ({ page }) => {
      await mainPage.nameField.fill('A')
      await mainPage.nameField.press('Tab')
      await expect(mainPage.nameField).toHaveAttribute('class', /is-invalid/);
      await expect(mainPage.nameLengthMsg).toHaveText(nameLengthMsgText)
    });
    test('Verify the "Name" max field lenth validation', async ({ page }) => {
      await mainPage.nameField.fill('Abcdefghdwfgbvsdfghjd')
      await mainPage.nameField.press('Tab') 
      await expect(mainPage.nameField).toHaveAttribute('class', /is-invalid/);
      await expect(mainPage.nameLengthMsg).toHaveText(nameLengthMsgText)
    });
    test('Verify the "Name" field Cyrylic input validation', async ({ page }) => {
      await mainPage.nameField.fill('Аолаволавоа')  
      await mainPage.nameField.press('Tab')
      await expect(mainPage.nameField).toHaveAttribute('class', /is-invalid/);
      await expect(mainPage.nameLengthMsg).toHaveText(nameInvalid)
    });
    test('Verify tip function applied for the "Name" field', async ({ page }) => {
      await mainPage.nameField.fill('Andriy ')  
      await mainPage.nameField.press('Tab')
      await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveCount(0)
    });
});

test.describe('Verify the "Last name" field validation', () => {
  test(' Verify the "Last name" field min lenth validation', async ({ page }) => {
    await mainPage.lastNameField.fill('A')
    await mainPage.lastNameField.press('Tab')
    await expect(mainPage.lastNameField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.lastNameField).toHaveText(lastNameExist)
  });
  test('Verify the "Last name" max field lenth validation', async ({ page }) => {
    await mainPage.lastNameField.fill('Abcdefghdwfgbvsdfghjd')  
    await mainPage.lastNameField.press('Tab')
    await expect(mainPage.lastNameField).toHaveAttribute('class', /is-invalid/); 
    await expect(mainPage.lastNameField).toHaveText(lastNameExist)
  });
  test('Verify the "Last name" field Cyrylic input validation', async ({ page }) => {
    await mainPage.lastNameField.fill('Аолаволавоа')  
    await  mainPage.lastNameField.press('Tab')
    await expect(mainPage.lastNameField).toHaveAttribute('class', /is-invalid/); 
    await expect(mainPage.lastNameField).toHaveText(lasNameInvalid)
  });
  test('Verify trim function applied for the "Last name" field', async ({ page }) => {
    await mainPage.lastNameField.fill('Brodskyi ')  
    await mainPage.lastNameField.press('Tab')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveCount(0)
  });
});

test.describe('Verify the "Email" field validation', () => {
  test(' Verify the "Email" no @ symbol validation', async ({ page }) => {
    await mainPage.emailField.fill('a.brodskyygmail.com')
    await mainPage.emailField.press('Tab')
    await expect(mainPage.emailField).toHaveAttribute('class', /is-invalid/); 
    await expect(mainPage.emailField).toHaveText(emailIncorrect)
  });
  test('Verify the "Email" host name validation', async ({ page }) => {
    await mainPage.emailField.fill('a.brodskyy@gmailcom')  
    await mainPage.emailField.press('Tab')
    await expect(mainPage.emailField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.emailField).toHaveText(emailIncorrect)
  });
  test('Verify the "Email" special characters validation', async ({ page }) => {
    await mainPage.emailField.fill('$#@$@#@gmail.com')  
    await mainPage.emailField.press('Tab')
    await expect(mainPage.emailField).toHaveAttribute('class', /is-invalid/); 
    await expect(mainPage.emailField).toHaveText(emailIncorrect)
  });
});

test.describe('Verify the "Password" field validation', () => {
  test('Verify the "Password" min lenght validation', async ({ page }) => {
    await mainPage.passwordField.fill('Lemb127')
    await mainPage.passwordField.press('Tab')
    await expect(mainPage.passwordField).toHaveAttribute('class', /is-invalid/)
    await expect(mainPage.passwordField).toHaveText(passwordReq)
  });
  test('Verify the "Password" max lenght validation', async ({ page }) => {
    await mainPage.passwordField.fill('Lemberg124scfdgh')  
    await mainPage.passwordField.press('Tab')  
    await expect(mainPage.passwordField).toHaveAttribute('class', /is-invalid/)
    await expect(mainPage.passwordField).toHaveText(passwordReq)
  });
  test('Verify the "Password" Cyrylic input validation', async ({ page }) => {
    await mainPage.passwordField.fill('Абпрост1286аа')  
    await mainPage.passwordField.press('Tab')  
    await expect(mainPage.passwordField).toHaveAttribute('class', /is-invalid/)
    await expect(mainPage.passwordField).toHaveText(passwordReq)
  });
});

test.describe('Verify the "Re-enter password" field validation', () => {
  test('Verify the "Re-enter password" maching validation', async ({ page }) => {
    await mainPage.passwordField.fill('Lemb127fjkd')
    await mainPage.repasswordField.fill('Lemb127fjk6')
    await mainPage.repasswordField.press('Tab')
    await expect(mainPage.passwordField).toHaveAttribute('class', /is-invalid/)
    await expect(mainPage.repasswordField).toHaveText(rePassMismatch)
  });
});

test.describe('Verify the "Registraion" button validation', () => {
  test('Verify the "Registration" button is disabled by default', async ({ page }) => {
    await expect(mainPage.registerButton).toBeVisible()
  });
});