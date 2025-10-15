const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { loginWithEnv } = require('../helpers/login');
const { DashboardPage } = require('../pages/dashboardPageObject');
const { getColumn } = require('../helpers/getColumn');


// Test Case 3: Verify "Design system updates" is in the "In Progress" column.
// Confirm tag: "Design".
test.describe('Test Case 3 – In Progress Board Verification in Web App Dashboard', () => {

  test('Login and verify "Design system updates" card and tags', async ({ page }) => {

    //1 Login
    await loginWithEnv(page);
    
    //2 Navigate to "Web Application" project
    const dashboard = new DashboardPage(page);
    await test.step('Navigate to "Web Application" board', async () => {
      await dashboard.clickProject('Web Application');
    });

    // 3 Locate "In Progress" column
    const inProgressColumn = getColumn(page, /In Progress/i);

    // 4 Verify card title is visible
    await test.step('Verify "Implement user authentication" card is visible', async () => {
      const authCardTitle = inProgressColumn.getByRole('heading', {level: 3,name: /Design system updates/i});
      await expect(authCardTitle).toBeVisible();
    });

    // 5 Locate the specific "Design system updates" card inside "In Progress"
    const authCard = inProgressColumn.locator('div.bg-white.p-4.rounded-lg.shadow-sm.border')
      .filter({has: page.getByRole('heading', { level: 3, name: /Design system updates/i })});

    // 6 Verify "Design" tag inside the card
     await test.step('Verify "Bug" tag is visible', async () => {
      await expect(authCard.locator('span:has-text("Design")')).toBeVisible();
    });
  });
});
