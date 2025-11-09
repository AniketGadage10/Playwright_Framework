import { test as baseTest, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

// Declare the types of fixtures we're using
type MyFixtures = {
    basePage: BasePage;
};

// Extend base test with our fixtures
export const test = baseTest.extend<MyFixtures>({
    basePage: async ({ page }: { page: Page }, use: (r: BasePage) => Promise<void>) => {
        const basePage = new BasePage(page);
        await use(basePage);
    }
});

// Export the base test object
export { expect } from '@playwright/test';