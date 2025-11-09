import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { TestDataManager } from '../src/utils/TestDataManager';
import { Logger } from '../src/utils/Logger';
import type { TestInfo } from '@playwright/test';

let loginPage: LoginPage;
let testData: any;

test.describe('Login Functionality Tests', () => {
    test.beforeAll(async () => {
        testData = await TestDataManager.loadTestData('LoginTestData');
        Logger.info('Test data loaded successfully');
    });

    test.beforeEach(async ({ page }, testInfo: TestInfo) => {
        // initialize per-test log file
        await Logger.startTest(testInfo);
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        Logger.info('Navigated to login page before test');
    });

    test('should login successfully with valid credentials', async () => {
        const { username, password } = testData.loginCredentials.standardUser;
        
        await loginPage.login(username, password);
        const isLoggedIn = await loginPage.isLoggedIn();
        
        expect(isLoggedIn).toBeTruthy();

        Logger.info('Successfully verified login with valid credentials');
    });

    test('should show error message with invalid credentials', async () => {
        await loginPage.login('invalid_user', 'invalid_password');
        const errorMessage = await loginPage.getErrorMessage();
        
        expect(errorMessage).toBe(testData.expectedMessages.loginError);
        Logger.info('Successfully verified error message with invalid credentials');
    });

    test('should show error message for locked out user', async () => {
        const { username, password } = testData.loginCredentials.lockedOutUser;
        
        await loginPage.login(username, password);
        const errorMessage = await loginPage.getErrorMessage();
        
        expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out');
        Logger.info('Successfully verified locked out user message');
    });

    test.afterEach(async ({}, testInfo: TestInfo) => {
        // close per-test log file
        await Logger.endTest();
    });
});