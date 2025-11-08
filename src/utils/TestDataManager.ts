import fs from 'fs';
import path from 'path';

/**
 * Test Data Manager class for handling test data
 */
export class TestDataManager {
    private static dataDir = path.join(__dirname, '../../src/data');

    /**
     * Load JSON test data from a file
     * @param filename - Name of the JSON file (without extension)
     * @returns Promise<any>
     */
    static async loadTestData<T>(filename: string): Promise<T> {
        const filePath = path.join(this.dataDir, `${filename}.json`);
        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            return JSON.parse(data) as T;
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