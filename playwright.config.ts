import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'; 
import path from 'path'; 
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',

  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,

  reporter: [['html'], ['line']],

  use: {
    baseURL: process.env.URL ?? 'https://practicesoftwaretesting.com',
    trace: 'on',
    headless: true
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.ts/,
      grepInvert: process.env.CI ? /./ : undefined   // disable in CI
    },

    {
      name: 'chromium-login',
      testMatch: /tests\/login\/.*\.ts/,
      grepInvert: process.env.CI ? /./ : undefined   // disable in CI
    },

    {
      name: 'chromium-checkout',
      testMatch: /tests\/checkout\/.*\.ts/,
      grepInvert: process.env.CI ? /./ : undefined   // disable in CI
    }
  ]
});
