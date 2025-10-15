const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { loginWithEnv } = require('../helpers/login');
const { DashboardPage } = require('../pages/dashboardPageObject');
const { getColumn } = require('../helpers/getColumn');

// Test Case 6: Verify "App icon design" is in the "Done" column.
// Confirm tag: "Design".
test.describe('Test Case 6 – Done column verification in Mobile App Dashboard', () => {
  test('Login and verify "App icon design" card and tags', async ({ page }) => {

    //1 Login
    await loginWithEnv(page);
    
    //2 Navigate to "Mobile Application" project
    const dashboard = new DashboardPage(page);
    await test.step('Navigate to "Mobile Application" board', async () => {
      await dashboard.clickProject('Mobile Application');
    });

    // 3 Locate "Done" column
    const doneColumn = getColumn(page, /Done/i);

    // 4 Verify card title App icon design is visible
    await test.step('Verify "App icon design" card is visible', async () => {
      const authCardTitle = doneColumn.getByRole('heading', {level: 3,name: /App icon design/i});
      await expect(authCardTitle).toBeVisible();
    });

    // 5 Locate the specific card (Push notification system)  inside "To Do"
    const authCard = doneColumn.locator('div.bg-white.p-4.rounded-lg.shadow-sm.border').filter({has: page.getByRole('heading', { level: 3, name: /App icon design/i })});

    // 6 Verify "Design" tag inside the card
    await test.step('Verify "Feature" tag is visible', async () => {
      await expect(authCard.locator('span:has-text("Design")')).toBeVisible();
    });

  });
});
