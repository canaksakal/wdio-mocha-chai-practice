const chai = require("chai");
const { browser, expect: expectWdio } = require("@wdio/globals");
chai.should();
// const { assert, expect } = chai;
const LoginPage = require("../pageobjects/login.page");
const AccountPage = require("../pageobjects/account.page");
const { validCredentials, invalidCredentials } = require("../data/user.data");

describe("Feature: User authentication", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await expectWdio(LoginPage.inputEmail).toBeDisplayed();
    await browser.execute(() => {
      window.sessionStorage.clear();
      window.localStorage.clear();
    });
  });

  validCredentials.forEach(({ email, password, directedPage }) => {
    it(`Successful sign-in with valid credentials`, async () => {
      await LoginPage.enterEmail(email);
      await LoginPage.enterPassword(password);
      await LoginPage.submit();

      await expectWdio(AccountPage.pageTitle).toHaveText(directedPage.title);
      await expectWdio(browser).toHaveUrl(
        expectWdio.stringContaining(directedPage.path),
      );

      /* 
      const url = new URL(await browser.getUrl());
      assert.strictEqual(
        url.pathname,
        directedPage.path,
        `user should land on the ${directedPage.name}`,
      ); 
      */

      //expect(await AccountPage.navMenu.waitForDisplayed()).to.be.true;
      //(await AccountPage.navSignIn.isExisting()).should.equal(false);
    });
  });

  invalidCredentials.forEach(({ email, password, errorMessage }) => {
    it(`Failed sign-in with invalid credentials`, async () => {
      await LoginPage.enterEmail(email);
      await LoginPage.enterPassword(password);
      await LoginPage.submit();

      await expectWdio(LoginPage.loginError).toBeDisplayed();
      await expectWdio(LoginPage.loginError).toHaveText(errorMessage);
      const error = await LoginPage.loginError.getText();
      error.should.equal(errorMessage);

      /* 
        assert.include(
        await browser.getUrl(),
        "/auth/login",
        "user should stay on the sign-in page",
      ); 
      */

      // expect(await LoginPage.navMenu.isExisting()).to.equal(false);
    });
  });
});
