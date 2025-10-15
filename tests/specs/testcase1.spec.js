const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { loginWithEnv } = require('../helpers/login');
const { DashboardPage } = require('../pages/dashboardPageObject');
const { getColumn } = require('../helpers/getColumn');


// Test Case 1: Verify "Implement user authentication" is in the "To Do" column.
// Confirm tags: "Feature" and "High Priority".
test.describe('Test Case 1 – To Do Board Verification in Web App Dashboard', () => {

  test('Login and verify "Implement user authentication" card and tags', async ({ page }) => {

    //1 Login
    await loginWithEnv(page);
    
    //2 Navigate to "Web Application" project
    const dashboard = new DashboardPage(page);
    await test.step('Navigate to "Web Application" board', async () => {
      await dashboard.clickProject('Web Application');
    });


    // 3 Locate "To Do" column
    const toDoColumn = getColumn(page, /to do/i);

    // 4 Locate the specific card inside "To Do"
    const authCard = toDoColumn
      .locator('div.bg-white.p-4.rounded-lg.shadow-sm.border')
      .filter({
        has: page.getByRole('heading', { level: 3, name: /implement user authentication/i })
      });

    // 4 Verify card title is visible
    await test.step('Verify "Implement user authentication" card is visible', async () => {
      const authCardTitle = toDoColumn.getByRole('heading', {
        level: 3,
        name: /implement user authentication/i
      });
      await expect(authCardTitle).toBeVisible();
    });

    // 6 Verify "feature" and "high priority" tags inside the card
    await test.step('Verify "Feature" tag is visible', async () => {
      await expect(authCard.locator('span:has-text("feature")')).toBeVisible();
    });

    await test.step('Verify "High Priority" tag is visible', async () => {
      await expect(authCard.locator('span:has-text("high priority")')).toBeVisible();
    });
  });
});
