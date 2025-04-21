import { faker } from '@faker-js/faker';

async function createSolution(page) {
    try {
        // Wait for form to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate fake data
        const solutionName = faker.company.name();
        const solutionDescription = faker.company.catchPhrase();

        // Fill solution name
        await page.waitForSelector('#SolutionName');
        await page.type('#SolutionName', solutionName);

        // Fill solution description
        await page.waitForSelector('#solutionDescription');
        await page.type('#solutionDescription', solutionDescription);

        // Select Testing as solution type
        await page.waitForSelector('select.css-qmwc0h-selectStyle');
        await page.select('select.css-qmwc0h-selectStyle', '0');

        // Click Create Solution button with updated selector
        const createButton = await page.waitForSelector('button[style*="background-color: rgb(51, 119, 255)"][style*="width: 110px"]');
        if (createButton) {
            await createButton.click();
        } else {
            throw new Error('Create Solution button not found');
        }
        
        // Wait for success message and go back
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.goBack();
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Test Passed: Solution Creation');

        return solutionName; // Return for verification if needed

    } catch (error) {
        console.error('Test Failed: Solution Creation -', error.message);
        throw error;
    }
}

export default createSolution;