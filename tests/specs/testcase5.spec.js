const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { loginWithEnv } = require('../helpers/login');
const { DashboardPage } = require('../pages/dashboardPageObject');
const { getColumn } = require('../helpers/getColumn');

// Test Case 5: Verify "Design system updates" is in the "In Progress" column.
// Confirm tag: "Design".
test.describe('Test Case 5 – In Progress Board Verification in Mobile Application', () => {

  test('Login and verify "Offline mode" card and tags', async ({ page }) => {

    //1 Login
    await loginWithEnv(page);
    
    //2 Navigate to "Web Application" project
    const dashboard = new DashboardPage(page);
    await test.step('Navigate to "Mobile Application" board', async () => {
      await dashboard.clickProject('Mobile Application');
    });


    // 3 Locate "In Progress" column
    const inProgressColumn = getColumn(page, /In Progress/i);

    // 4 Verify card title is visible
    await test.step('Verify "Offline mode" card is visible', async () => {
      const authCardTitle = inProgressColumn.getByRole('heading', {level: 3,name: /Offline mode/i});
      await expect(authCardTitle).toBeVisible();
    });

    // 5 Locate the specific "Offline mode" card inside" In Progress"
    const authCard = inProgressColumn.locator('div.bg-white.p-4.rounded-lg.shadow-sm.border')
      .filter({has: page.getByRole('heading', { level: 3, name: /Offline mode/i })});
    

    //verify tag "Feature"
   await test.step('Verify "Feature" tag is visible', async () => {
      await expect(authCard.locator('span:has-text("feature")')).toBeVisible();
    });
    //verify tag "High Priority"
    await test.step('Verify "High Priority" tag is visible', async () => {
      await expect(authCard.locator('span:has-text("high priority")')).toBeVisible();
    });
  });
});
