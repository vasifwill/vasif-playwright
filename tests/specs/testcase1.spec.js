const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { LoginPage } = require('../pages/loginPageObject');
const { DashboardPage } = require('../pages/dashboardPageObject');

// 🧩 Test Case 1: Verify "Implement user authentication" is in the "To Do" column.
//                 Confirm tags: "Feature" and "High Priority".
test.describe('Test Case 1 – To Do Board Verification', () => {

  test('Login and verify "Implement user authentication" card and tags', async ({ page }) => {

    //1 Login
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    
    await test.step('Go to login page', async () => {
      await login.goto(); // opens BASE_URL (login page)
    });

    await test.step('Login with valid credentials', async () => {
      await login.login(process.env.USER_NAME, process.env.USER_PASSWORD);
    });

    await test.step('Verify login successful (Logout visible)', async () => {
      await login.expectLoggedIn();
    });

    //2 Navigate to "Web Application" project
    await test.step('Navigate to "Web Application" board', async () => {
      await dashboard.clickProject('Web Application');
    });


    // 3 Locate "To Do" column
    const toDoColumn = page.locator('div', {
      has: page.getByRole('heading', { level: 2, name: /to do/i })
    });

    // 4 Locate the specific card inside "To Do"
    const authCard = toDoColumn
      .locator('div.bg-white.p-4.rounded-lg.shadow-sm.border')
      .filter({
        has: page.getByRole('heading', { level: 3, name: /implement user authentication/i })
      });

    // 45 Verify card title is visible
    await test.step('Verify "Implement user authentication" card is visible', async () => {
      const authCardTitle = toDoColumn.getByRole('heading', {
        level: 3,
        name: /implement user authentication/i
      });
      await expect(authCardTitle).toBeVisible();
    });

    // 6 Verify tags inside the card
    await test.step('Verify "Feature" tag is visible', async () => {
      await expect(authCard.getByText(/feature/i)).toBeVisible();
    });

    await test.step('Verify "High Priority" tag is visible', async () => {
      await expect(authCard.getByText(/high priority/i)).toBeVisible();
    });
  });
});
