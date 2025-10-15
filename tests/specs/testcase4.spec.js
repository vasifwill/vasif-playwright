const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { loginWithEnv } = require('../helpers/login');
const { DashboardPage } = require('../pages/dashboardPageObject');
const { getColumn } = require('../helpers/getColumn');

// Test Case 3: Verify "Design system updates" is in the "In Progress" column.
// Confirm tag: "Design".
test.describe('Test Case 4 – To Do column verification in Mobile App Dashboard', () => {
  test('Login and verify "Push notification system" card and tags', async ({ page }) => {

    //1 Login
    await loginWithEnv(page);
    
    //2 Navigate to "Mobile Application" project
    const dashboard = new DashboardPage(page);
    await test.step('Navigate to "Mobile Application" board', async () => {
      await dashboard.clickProject('Mobile Application');
    });

    // 3 Locate "To Do" column
    const toDoColumn = getColumn(page, /to do/i);

    // 4 Verify card title Push notification system is visible
    await test.step('Verify "Push notification system" card is visible', async () => {
      const authCardTitle = toDoColumn.getByRole('heading', {level: 3,name: /Push notification system/i});
      await expect(authCardTitle).toBeVisible();
    });

    // 5 Locate the specific card (Push notification system)  inside "To Do"
    const authCard = toDoColumn
      .locator('div.bg-white.p-4.rounded-lg.shadow-sm.border')
      .filter({
        has: page.getByRole('heading', { level: 3, name: /Push notification system/i })
      });

    // 6 Verify "Feature" tag inside the card
    await test.step('Verify "Feature" tag is visible', async () => {
      await expect(authCard.locator('span:has-text("Feature")')).toBeVisible();
    });

  });
});
