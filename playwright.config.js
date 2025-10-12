// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',          // folder for your test files
  fullyParallel: true,         // run tests in parallel locally
  retries: 0,                  // no retries
  reporter: [['html', { open: 'never' }], ['list']], // HTML + console report

  use: {
    // ✅ Use your hosted site URL from .env
    baseURL: process.env.BASE_URL || 'https://example.com',

    // ✅ Debugging & reporting options
    trace: 'on-first-retry',         // record trace on first failure
    screenshot: 'only-on-failure',   // take screenshots for failed tests
    video: 'retain-on-failure',      // record video if test fails
  },

  // ✅ Run on Chrome only (faster for local use)
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
