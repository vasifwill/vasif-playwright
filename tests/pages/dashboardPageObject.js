const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
  }

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
