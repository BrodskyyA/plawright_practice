import { expect, type Locator, type Page } from '@playwright/test';

    export class GaragePage {
        readonly page: Page;
        readonly addCarButton: Locator;
        readonly brandDropdown: Locator;
        readonly modelDropdown: Locator;
        readonly mileageField: Locator;
        readonly addButton: Locator;
        readonly firstCarName: Locator;
        readonly editCarIcon: Locator;
        readonly removeCarButton: Locator;
        readonly acceptCarRemovingButton: Locator;
        readonly mileageInput: Locator
        readonly updateButton: Locator
        readonly addFuelButton : Locator
        readonly garageLink : Locator
        
        constructor(page: Page) {
            this.page = page;
            this.addCarButton = page.getByText('Add car');
            this.brandDropdown = page.locator('#addCarBrand');
            this.modelDropdown = page.locator('#addCarModel');
            this.mileageField = page.locator('#addCarMileage');
            this.addButton = page.getByText('Add', { exact: true });
            this.firstCarName = page.locator('.car_name').first();
            this.editCarIcon = page.locator('.icon-edit').first();
            this.removeCarButton = page.locator('.btn-outline-danger');
            this.acceptCarRemovingButton = page.locator('.btn-danger');
            this.mileageInput = page.locator('[formcontrolname="miles"]')
            this.updateButton = page.locator('button[type="submit"]')
            this.addFuelButton = page.getByText('Add fuel expense', {exact: true})
            this.garageLink = page.locator('[routerlink="garage"]')
        }

        async clickAddCarButton() {
            await this.addCarButton.click();
        }
        async clickaddFuelButton() {
            await this.addFuelButton.click();
        }
    
        async selectBrand(brand: string) {
            await this.brandDropdown.selectOption({ label: brand });
        }
    
        async selectModel(model: string) {
            await this.page.waitForTimeout(1000);
            await this.modelDropdown.selectOption({ label: model });
        }
    
        async enterMileage(mileage: string) {
            await this.mileageField.fill(mileage);
        }
    
        async clickAddButton() {
            await this.addButton.click();
        }
    
        async getFirstCarName() {
            return this.firstCarName;
        }

        async removeLastCar() {
            const carsNumberBefore = await this.page.locator('.icon-edit').count();
            await this.editCarIcon. click();
            await this.removeCarButton.click();
            await this.acceptCarRemovingButton.click();
    
        }
    }