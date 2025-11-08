import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'; 
import path from 'path'; 
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  reporter: [['html'], ['list']],

  use: {
    baseURL: process.env.URL ?? 'https://practicesoftwaretesting.com',
    trace: 'on',
    headless: true
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.ts/,
      grepInvert: process.env.CI ? /./ : undefined
    },

    {
      name: 'chromium-login',
      testMatch: /tests\/login\/.*\.ts/,
      grepInvert: process.env.CI ? /./ : undefined,
      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'chromium-checkout',
      testMatch: /tests\/checkout\/.*\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json'
      },
      dependencies: process.env.CI ? [] : ['setup']
    }
  ]
});
