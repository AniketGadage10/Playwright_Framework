import fs from 'fs';
import path from 'path';
import { TestInfo } from '@playwright/test';

/**
 * Logger utility for test automation framework
 * - Writes logs to console and to a per-test .txt file under test-results/logs
 * - Call Logger.startTest(testInfo) in test.beforeEach and Logger.endTest() in test.afterEach
 */
export class Logger {
    private static fileHandle: fs.promises.FileHandle | null = null;
    private static filePath: string | null = null;

    private static getTimestamp(): string {
        return new Date().toISOString();
    }

    /**
     * Start a per-test log file. Call from a test's beforeEach with the TestInfo.
     * @param testInfo Playwright TestInfo object
     */
    static async startTest(testInfo: TestInfo): Promise<void> {
        try {
            const baseDir = path.resolve(process.cwd(), 'test-results', 'logs');
            await fs.promises.mkdir(baseDir, { recursive: true });
            // Use sanitized test title + worker id to avoid collisions
            const safeTitle = testInfo.title.replace(/[^a-z0-9\-_\. ]/gi, '_').slice(0, 120);
            const fileName = `${safeTitle.replace(/ /g, '_')}_${Date.now()}.txt`;
            this.filePath = path.join(baseDir, fileName);
            this.fileHandle = await fs.promises.open(this.filePath, 'a');
            await this.writeLine(`[${this.getTimestamp()}] [INFO] Log started for test: ${testInfo.title}`);
        } catch (err) {
            // If file creation fails, at least log to console
            console.error(`[${this.getTimestamp()}] [ERROR] Failed to start log file: ${err}`);
            this.fileHandle = null;
            this.filePath = null;
        }
    }

    /**
     * End the per-test log file. Call from test.afterEach.
     */
    static async endTest(): Promise<void> {
        try {
            if (this.fileHandle) {
                await this.writeLine(`[${this.getTimestamp()}] [INFO] Log closed`);
                await this.fileHandle.close();
            }
        } catch (err) {
            console.error(`[${this.getTimestamp()}] [ERROR] Failed to close log file: ${err}`);
        } finally {
            this.fileHandle = null;
            this.filePath = null;
        }
    }

    private static async writeLine(line: string): Promise<void> {
        if (this.fileHandle) {
            try {
                await this.fileHandle.appendFile(line + '\n');
            } catch (err) {
                console.error(`[${this.getTimestamp()}] [ERROR] Failed to write to log file: ${err}`);
            }
        }
    }

    /**
     * Log information message
     * @param message - Message to log
     */
    static info(message: string): void {
        const line = `[${this.getTimestamp()}] [INFO] ${message}`;
        // print to console for immediate visibility
       // console.log(line);
        // fire-and-forget write to file
        void this.writeLine(line);
    }

    /**
     * Log error message
     * @param message - Error message to log
     * @param error - Error object (optional)
     */
    static error(message: string, error?: Error): void {
        const line = `[${this.getTimestamp()}] [ERROR] ${message}${error ? ' - ' + (error.stack || error.message) : ''}`;
        // always print to console
       // console.error(line);
        if (error) console.error(error.stack);
        void this.writeLine(line);
    }

    /**
     * Log debug message
     * @param message - Debug message to log
     */
    static debug(message: string): void {
        if (process.env.DEBUG) {
            const line = `[${this.getTimestamp()}] [DEBUG] ${message}`;
           // console.debug(line);
            void this.writeLine(line);
        }
    }
}