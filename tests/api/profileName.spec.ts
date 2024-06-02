import { test, expect } from "@playwright/test";
import { correctEmail,  correctPassword,  registeredEmail,  registeredPassword,} from "../../data/generateUserData";
import { SignInForm } from "../../pageObjects/forms/SignInForm";

let signInForm: SignInForm;

test("Intersept profile name", async ({ page }) => {
  const resp = {
    status: "ok",
    data: {
      userId: 123879,
      photoFilename: "default-user.png",
      name: "Mr President  Joe",
      lastName: "BIDEN",
    }, 
  };

  await page.route("https://qauto.forstudy.space/api/users/profile", (route) => route.fulfill({
      status: 200,
      body: JSON.stringify(resp),
    })
  );

  signInForm = new SignInForm(page);
  await page.goto("/");
  await signInForm.loginWithValidCredentials( registeredEmail, registeredPassword );
  await page.locator('[routerlink="profile"]').click();
});
