import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {}

    /**
     * Navigate to a URL
     * @param url - The URL to navigate to
     */
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Wait for element to be visible
     * @param selector - Element selector
     * @param timeout - Maximum time to wait in milliseconds
     */
    async waitForElement(selector: string, timeout?: number): Promise<void> {
        await this.page.waitForSelector(selector, { timeout });
    }

    /**
     * Click on an element
     * @param selector - Element selector
     */
    async click(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    /**
     * Type text into an input field
     * @param selector - Element selector
     * @param text - Text to type
     */
    async type(selector: string, text: string): Promise<void> {
        await this.page.fill(selector, text);
    }

    /**
     * Get text content of an element
     * @param selector - Element selector
     * @returns Promise<string>
     */
    async getText(selector: string): Promise<string> {
        return await this.page.textContent(selector) || '';
    }
}