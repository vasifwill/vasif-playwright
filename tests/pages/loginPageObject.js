// tests/pages/login.page.js
const { expect } = require('@playwright/test');

class LoginPage {
  
  constructor(page) {
    this.page = page;

    
    this.usernameInput = page.locator('#username'); 
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.getByRole('button', { name: /sign in/i });
    this.userMenu      = page.getByRole('button', { name: /logout/i }); 
    this.errorMessage  = page.getByText(/invalid|incorrect/i);

  }

  async goto() {
    await this.page.goto('/'); // baseURL is used from config
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn() {
    await expect(this.userMenu).toBeVisible();
  }

  async expectLoginFailed() {
    await expect(this.errorMessage).toBeVisible();
  }
    
}

module.exports = { LoginPage };
