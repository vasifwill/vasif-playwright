// tests/login.spec.js
const { test,expect } = require('@playwright/test');
require('dotenv').config();
const { LoginPage } = require('./pages/loginPageObject');

/* Test Case 1:
1)Login to Demo App.
2)Navigate to "Web Application."
3)Verify "Implement user authentication" is in the "To Do" column.
4)Confirm tags: "Feature" "High Priority”
*/

test.describe('Login Page', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
     // 1) Go to login page
  const login = new LoginPage(page);
  await login.goto(); // opens BASE_URL (your login page)

  // 2) Perform login
  await login.login(process.env.USER_NAME, process.env.USER_PASSWORD);

  // 3) Confirm login succeeded (Logout button visible)
  await login.expectLoggedIn();

  // 4) Find the "To Do" column container
  const toDoColumn = page.locator('div', {has: page.getByRole('heading', { level: 2, name: /to do/i })});

  // 5) Inside that column, locate the specific card title <h3>
  const authCardTitle = toDoColumn.getByRole('heading', {level: 3,name: /implement user authentication/i});

  // 6) Assert it’s visible
  await expect(authCardTitle).toBeVisible();

  // 7Inside the same card, find the <span> with text "High Priority"
    const authCard = toDoColumn.locator('div.bg-white.p-4.rounded-lg.shadow-sm.border').filter({ has: page.getByRole('heading', { level: 3, name: /implement user authentication/i }) });

    const highPriorityTag = authCard.getByText(/high priority/i);

    // Assert "High Priority" span is visible
    await expect(highPriorityTag).toBeVisible();
});;



});
