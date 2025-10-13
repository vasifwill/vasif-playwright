const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Clicks on the given project name in the sidebar and verifies
   * that the main header <h1> of that project becomes visible.
   * 
   * @param {string} projectName 'Web Application', 'Mobile Application', 'Marketing Campaign'
   */
  async clickProject(projectName) {
    // Step 1️: Locate and click the project button in the sidebar (h2 text inside button)
    const projectButton = this.page.getByRole('button', { name: new RegExp(projectName, 'i') });
    await projectButton.click();

    // Step 2️: Verify that the <h1> header of the main section matches the clicked project
    const header = this.page.getByRole('heading', { level: 1, name: new RegExp(projectName, 'i') });
    await expect(header).toBeVisible();
  }
}

module.exports = { DashboardPage };
