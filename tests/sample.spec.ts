import { test } from '../src/lib/BaseTest';
import { Logger } from '../src/utils/Logger';
import { TestDataManager } from '../src/utils/TestDataManager';
import { expect } from '@playwright/test';

test.describe('Sample Test Suite', () => {
    test.beforeEach(async ({ page }) => {
        Logger.info('Starting test...');
    });

    test('should demonstrate framework capabilities', async ({ page,basePage }) => {
        // Load test data
       // const testData = await TestDataManager.loadTestData<any>('testData');
      //  Logger.info('Test data loaded successfully');
    
          await basePage.navigate('/');
        
          // Click the get started link.
          await page.getByRole('link', { name: 'Get started' }).click();
        
          // Expects page to have a heading with the name of Installation.
          await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
     

        // Navigate to the application
        //await basePage.navigate('/');
        Logger.info('Navigated to application');

        // Perform test actions
       // await basePage.type('#username', testData.testUser.username);
       // await basePage.type('#password', testData.testUser.password);
        //await basePage.click('#login-button');

        // Verify results
        //const welcomeMessage = await basePage.getText('#welcome-message');
       // expect(welcomeMessage).toContain('Welcome');
        Logger.info('Login successful');
    });

    test.afterEach(async ({ page }) => {
        Logger.info('Test completed');
    });
});