const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { loginWithEnv } = require('../helpers/login');
const { DashboardPage } = require('../pages/dashboardPageObject');
const { getColumn } = require('../helpers/getColumn');

// Test Case 2: Verify "Fix navigation bug" is in the "To Do" column.
// Confirm tag: "Bug".
test.describe('Test Case 2 – To Do Board Verification in Web App Dashboard', () => {

  test('Login and verify "Fix navigation bug" card and tags', async ({ page }) => {

    //1 Login
    await loginWithEnv(page);
    
    //2 Navigate to "Web Application" project
    const dashboard = new DashboardPage(page);
    await test.step('Navigate to "Web Application" board', async () => {
      await dashboard.clickProject('Web Application');
    });

    // 3 Locate "To Do" column
    const toDoColumn = getColumn(page, /to do/i);

    // 4 Verify card title "Fix navigation bug" is visible
    await test.step('Verify "Fix navigation bug" card is visible', async () => {const authCardTitle = toDoColumn.getByRole('heading', {level: 3,name: /Fix navigation bug/i});
      await expect(authCardTitle).toBeVisible();
    });

    // 5 Locate the specific card "Fix navigation bug" inside "To Do"
    const authCard = toDoColumn.locator('div.bg-white.p-4.rounded-lg.shadow-sm.border')
      .filter({has: page.getByRole('heading', { level: 3, name: /Fix navigation bug/i })});

    // 6 Verify "Bug" tag inside the card
    await test.step('Verify "Bug" tag is visible', async () => {
      await expect(authCard.locator('span:has-text("Bug")')).toBeVisible();
    });

  });
});
