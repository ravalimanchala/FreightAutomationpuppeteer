async function clickSolutionsList(page) {
    try {
        // Wait for page load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Wait for and click Solutions List app
        const solutionsListCard = await page.waitForSelector('img[alt="Solutions List"]');
        if (solutionsListCard) {
            await solutionsListCard.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Test Passed: Solutions List App Click');
        } else {
            throw new Error('Solutions List app not found');
        }

    } catch (error) {
        console.error('Test Failed: Solutions List App Click -', error.message);
        throw error;
    }
}

export default clickSolutionsList;