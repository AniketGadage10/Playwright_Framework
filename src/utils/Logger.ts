import { test } from '@playwright/test';

/**
 * Logger utility for test automation framework
 */
export class Logger {
    private static getTimestamp(): string {
        return new Date().toISOString();
    }

    /**
     * Log information message
     * @param message - Message to log
     */
    static info(message: string): void {
        console.log(`[${this.getTimestamp()}] [INFO] ${message}`);
        test.info().annotations.push({ type: 'info', description: message });
    }

    /**
     * Log error message
     * @param message - Error message to log
     * @param error - Error object (optional)
     */
    static error(message: string, error?: Error): void {
        console.error(`[${this.getTimestamp()}] [ERROR] ${message}`);
        if (error) {
            console.error(error.stack);
        }
        test.info().annotations.push({ type: 'error', description: message });
    }

    /**
     * Log debug message
     * @param message - Debug message to log
     */
    static debug(message: string): void {
        if (process.env.DEBUG) {
            console.debug(`[${this.getTimestamp()}] [DEBUG] ${message}`);
            test.info().annotations.push({ type: 'debug', description: message });
        }
    }
}