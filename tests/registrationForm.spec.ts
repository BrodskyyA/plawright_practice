import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign up' }).click(),
  await expect(page.locator('h4[class ="modal-title"]')).toBeVisible()
});

test.describe('Verify registration with valid credentials', () => {
  test('Verify successfull registration with valid data', async ({ page }) => {
    const signupName = await page.locator('#signupName')
    await signupName.fill('Andriy')
    const signupLastName = await page.locator('#signupLastName')
    await signupLastName.fill('Brodskyi')
    const signupEmail = await page.locator('#signupEmail')
    await signupEmail.fill('a.brodskyy+aqa09@gmail.com')
    const signupPassword = await page.locator('#signupPassword')
    await signupPassword.fill('Lemberg159')
    const signupRepeatPassword = await page.locator('#signupRepeatPassword')
    await signupRepeatPassword.fill('Lemberg159')
    await page.locator('button[class="btn btn-primary"]').click()
    await expect(page.locator('h1')).toHaveText('Garage')
    await expect(page). toHaveURL(new RegExp('/panel/garage$'))
    await page.locator('a[routerlink="settings"]').click()
    await page.getByText('Remove my account', {exact: true}).click()
    await page.locator('button.btn.btn-danger').click()
  });
  test('Verify new registration for already registered user', async ({ page }) => {
    await page.locator('#signupName').fill('Andriy')
    await page.locator('#signupLastName').fill('Brodskyi')
    await page.locator('#signupEmail').fill('a.brodskyy+aqa08@gmail.com')
    await page.locator('#signupPassword').fill('Lemberg159')
    await page.locator('#signupRepeatPassword').fill('Lemberg159')
    await page.locator('button[class="btn btn-primary"]').click()
    await expect(page.locator('p.alert.alert-danger')).toHaveText('User already exists')
  });
});

test.describe('Verify mandatory fields', () => {
  test('Verify all fields are mandatory and informing is displayed', async ({ page }) => {
    await page.locator('#signupName').press('Tab')
    await page.getByText('Name required')
    await expect(page.locator('#signupName')).toHaveClass('form-control ng-pristine ng-invalid is-invalid ng-touched')
    await page.locator('#signupLastName').press('Tab')
    await page.getByText('Last name required')
    await expect(page.locator('#signupLastName')).toHaveClass('form-control ng-pristine ng-invalid is-invalid ng-touched')
    await page.locator('#signupEmail').press('Tab')
    await expect(page.locator('#signupEmail')).toHaveClass('form-control ng-pristine ng-invalid is-invalid ng-touched')
    await page.getByText('Email required')
    await page.locator('#signupPassword').press('Tab')
    await expect(page.locator('#signupPassword')).toHaveClass('form-control ng-pristine ng-invalid is-invalid ng-touched')
    await page.getByText('Password required')
    await page.locator('#signupRepeatPassword').press('Tab')
    await expect(page.locator('#signupRepeatPassword')).toHaveClass('form-control ng-pristine ng-invalid is-invalid ng-touched')
    await page.getByText('Re-enter password required')
    await expect(page.locator('//button[@disabled]')).toBeVisible()
  });
});

test.describe('Verify the "Name" field validation', () => {
    test(' Verify the "Name" field min lenth validation', async ({ page }) => {
      await page.locator('#signupName').fill('A')
      await page.locator('#signupName').press('Tab')
      await expect(page.locator('#signupName')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
      await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Name has to be from 2 to 20 characters long')
    });
    test('Verify the "Name" max field lenth validation', async ({ page }) => {
      const signupName = await page.locator('#signupName')  
      await signupName.fill('Abcdefghdwfgbvsdfghjd')
      await signupName.press('Tab')  
      await expect(page.locator('#signupName')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
      await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Name has to be from 2 to 20 characters long')
    });
    test('Verify the "Name" field Cyrylic input validation', async ({ page }) => {
      await page.locator('#signupName').fill('Аолаволавоа')  
      await page.locator('#signupName').press('Tab')
      await expect(page.locator('#signupName')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
      await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Name is invalid')
    });
    test('Verify tip function applied for the "Name" field', async ({ page }) => {
      await page.locator('#signupName').fill('Andriy ')  
      await page.locator('#signupName').press('Tab')
      await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveCount(0)
    });
});

test.describe('Verify the "Last name" field validation', () => {
  test(' Verify the "Last name" field min lenth validation', async ({ page }) => {
    await page.locator('#signupLastName').fill('A')
    await page.locator('#signupLastName').press('Tab')
    await expect(page.locator('#signupLastName')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Last name has to be from 2 to 20 characters long')
  });
  test('Verify the "Last name" max field lenth validation', async ({ page }) => {
    await page.locator('#signupLastName').fill('Abcdefghdwfgbvsdfghjd')  
    await page.locator('#signupLastName').press('Tab')
    await expect(page.locator('#signupLastName')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Last name has to be from 2 to 20 characters long')
  });
  test('Verify the "Last name" field Cyrylic input validation', async ({ page }) => {
    await page.locator('#signupLastName').fill('Аолаволавоа')  
    await page.locator('#signupLastName').press('Tab')
    await expect(page.locator('#signupLastName')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Last name is invalid')
  });
  test('Verify trim function applied for the "Last name" field', async ({ page }) => {
    await page.locator('#signupLastName').fill('Brodskyi ')  
    await page.locator('#signupLastName').press('Tab')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveCount(0)
  });
});

test.describe('Verify the "Email" field validation', () => {
  test(' Verify the "Email" no @ symbol validation', async ({ page }) => {
    await page.locator('#signupEmail').fill('a.brodskyygmail.com')
    await page.locator('#signupEmail').press('Tab')
    await expect(page.locator('#signupEmail')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Email is incorrect')
  });
  test('Verify the "Email" host name validation', async ({ page }) => {
    await page.locator('#signupEmail').fill('a.brodskyy@gmailcom')  
    await page.locator('#signupEmail').press('Tab')
    await expect(page.locator('#signupEmail')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Email is incorrect')
  });
  test('Verify the "Email" special characters validation', async ({ page }) => {
    await page.locator('#signupEmail').fill('$#@$@#@gmail.com')  
    await page.locator('#signupEmail').press('Tab')
    await expect(page.locator('#signupEmail')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Email is incorrect')
  });
});

test.describe('Verify the "Password" field validation', () => {
  test('Verify the "Password" min lenght validation', async ({ page }) => {
    await page.locator('#signupPassword').fill('Lemb127')
    await page.locator('#signupPassword').press('Tab')
    await expect(page.locator('#signupPassword')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  });
  test('Verify the "Password" max lenght validation', async ({ page }) => {
    await page.locator('#signupPassword').fill('Lemberg124scfdgh')  
    await page.locator('#signupPassword').press('Tab')  
    await expect(page.locator('#signupPassword')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  });
  test('Verify the "Password" Cyrylic input validation', async ({ page }) => {
    await page.locator('#signupPassword').fill('Абпрост1286аа')  
    await page.locator('#signupPassword').press('Tab')  
    await expect(page.locator('#signupPassword')).toHaveClass('form-control ng-invalid ng-dirty is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  });
});

test.describe('Verify the "Re-enter password" field validation', () => {
  test('Verify the "Re-enter password" maching validation', async ({ page }) => {
    await page.locator('#signupPassword').fill('Lemb127fjkd')
    await page.locator('#signupRepeatPassword').fill('Lemb127fjk6')
    await page.locator('#signupRepeatPassword').press('Tab')
    await expect(page.locator('#signupRepeatPassword')).toHaveClass('form-control ng-dirty ng-valid is-invalid ng-touched')
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Passwords do not match')
  });
});

test.describe('Verify the "Registraion" button validation', () => {
  test('Verify the "Registration" button is disabled by default', async ({ page }) => {
    await expect(page.locator('//button[@disabled]')).toBeVisible()
  });
});