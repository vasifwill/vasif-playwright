const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPageObject');

async function loginWithEnv(page) {
  const login = new LoginPage(page);

  await test.step('Go to login page', async () => {
    await login.goto();
  });

  await test.step('Login with valid credentials', async () => {
    await login.login(process.env.USER_NAME, process.env.USER_PASSWORD);
  });

  await test.step('Verify login successful (Logout visible)', async () => {
    await login.expectLoggedIn();
  });
}

module.exports = { loginWithEnv };
