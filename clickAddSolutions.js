async function clickAddSolutions(page) {
    try {
        // Wait for page load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Wait for and click +Solutions button using the updated selector
        const addSolutionsButton = await page.waitForSelector('div.flex.gap-2 > button[style*="background-color: rgb(51, 119, 255)"]');
        if (addSolutionsButton) {
            await addSolutionsButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Test Passed: Add Solutions Button Click');
        } else {
            throw new Error('Add Solutions button not found');
        }

    } catch (error) {
        console.error('Test Failed: Add Solutions Button Click -', error.message);
        throw error;
    }
}

export default clickAddSolutions;