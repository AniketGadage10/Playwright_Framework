export const testConfig = {
    baseUrl: 'https://playwright.dev/',    // Base URL for tests
    timeout: 30000,                                 // Global timeout in milliseconds
    retries: 2,                                    // Number of test retries on failure
    browserOptions: {
        headless: true,                            // Run browsers in headless mode
        slowMo: 0,                                 // Slow down test execution (in ms)
        viewport: { width: 1920, height: 1080 }    // Browser window size
    },
    // envUrls: {                                     // Environment-specific URLs
    //     qa: 'https://playwright.dev/',
    //     staging: 'https://playwright.dev/',
    //     prod: 'https://playwright.dev/'
    // }
};