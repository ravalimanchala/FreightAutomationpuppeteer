async function schemaSettings(page) {
    try {
        // Wait for page load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Wait for and click schema settings icon
        const schemaSettingsButton = await page.waitForSelector('button.css-1iua5li-borderSettings');
        if (schemaSettingsButton) {
            await schemaSettingsButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Test Passed: Schema Settings Click');
        } else {
            throw new Error('Schema settings button not found');
        }

    } catch (error) {
        console.error('Test Failed: Schema Settings Click -', error.message);
        throw error;
    }
}

export default schemaSettings;