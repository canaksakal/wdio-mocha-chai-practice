const LoginPage = require("../pageobjects/login.page");
const ProfilePage = require("../pageobjects/profile.page");
const {
  validCredentials,
  phoneNumbers,
  messages,
} = require("../data/user.data");

const [validUser] = validCredentials;

describe("Feature: Profile settings", () => {
  beforeEach(async () => {
    await LoginPage.loginAs(validUser);
    await ProfilePage.open();
    await ProfilePage.fillRequiredFields(validUser.profileDefaults);
  });

  it("should update a valid phone number", async () => {
    await ProfilePage.updatePhone(phoneNumbers.valid);
    await ProfilePage.expectSuccess(messages.profileUpdated);
    await ProfilePage.expectPhoneNumber(phoneNumbers.valid);
  });

  it(`should reject an invalid phone number: ${phoneNumbers.invalidText}`, async () => {
    await ProfilePage.updatePhone(phoneNumbers.invalidText);
    await ProfilePage.expectPhoneInvalid();
  });
});
