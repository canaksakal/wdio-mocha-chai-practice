module.exports = {
  validCredentials: [
    {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01",
      directedPage: {
        path: "/account",
        title: "My account",
      },
      profileDefaults: {
        postalCode: "1010",
        state: "Vienna",
      },
    },
  ],
  phoneNumbers: {
    valid: "+12345678910",
    invalidText: "not-a-phone",
  },
  messages: {
    profileUpdated: "Your profile is successfully updated!",
  },
  invalidCredentials: [
    {
      email: "invalid@example.com",
      password: "wrongpassword",
      errorMessage: "Invalid email or password",
    },
  ],
};
