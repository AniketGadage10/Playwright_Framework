import fs from 'fs';
import path from 'path';

/**
 * Simple Test Data Manager for reading/writing JSON files under src/data
 */
export class TestDataManager {
    // Resolve relative to project root to avoid __dirname path confusion
    private static dataDir = path.resolve(process.cwd(), 'src', 'data');

    /**
     * Load JSON test data from a file
     * @param filename - Name of the JSON file (without extension)
     */
    static async loadTestData(filename: string): Promise<any> {
        const filePath = path.join(this.dataDir, `${filename}.json`);
        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Error loading test data from ${filePath}: ${error}`);
        }
    }

    /**
     * Save test data to a JSON file
     * @param filename - Name of the JSON file (without extension)
     * @param data - Data to save
     */
    static async saveTestData(filename: string, data: any): Promise<void> {
        const filePath = path.join(this.dataDir, `${filename}.json`);
        try {
            await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error(`Error saving test data to ${filePath}: ${error}`);
        }
    }
}