import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';
import { TestDataManager } from '../utils/TestDataManager';

export class LoginPage extends BasePage {
    // Selectors
    private readonly usernameInput = '#user-name';
    private readonly passwordInput = '#password';
    private readonly loginButton = '#login-button';
    private readonly errorMessage = '[data-test="error"]';

    constructor(page: Page) {
        super(page);
        Logger.info('Initializing LoginPage');
    }

    /**
     * Login to the application
     * @param username - Username to login with
     * @param password - Password to login with
     */
    async login(username: string, password: string): Promise<void> {
        Logger.info(`Attempting to login with username: ${username}`);
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
        Logger.info('Login attempt completed');
    }

    /**
     * Get the error message text if present
     * @returns Promise<string | null>
     */
    async getErrorMessage(): Promise<string | null> {
        try {
            const error = await this.page.textContent(this.errorMessage);
            if (error) {
                Logger.error(`Login error: ${error}`);
                return error;
            }
            return null;
        } catch (error) {
            Logger.error(`Error getting error message: ${error}`);
            return null;
        }
    }

    /**
     * Check if user is logged in by verifying the inventory page URL
     * @returns Promise<boolean>
     */
    async isLoggedIn(): Promise<boolean> {
        const currentUrl = this.page.url();
        const isLoggedIn = currentUrl.includes('/inventory.html');
        Logger.info(`Login status check - Is logged in: ${isLoggedIn}`);
        return isLoggedIn;
    }

    /**
     * Navigate to login page
     */
    async navigateToLoginPage(): Promise<void> {
        const testData: any = await TestDataManager.loadTestData('LoginTestData');
        await this.navigate(testData.urls.baseUrl);
        Logger.info('Navigated to login page');
    }
}