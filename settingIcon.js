async function clickSettingsIcon(page) {
    try {
        // Wait for page load after login
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Wait for and click settings icon using specific selectors
        const settingsIconSelector = 'button.css-umemfu-buttonOutlineNone';
        await page.waitForSelector(settingsIconSelector);
        await page.click(settingsIconSelector);
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Test Passed: Settings Icon Click');

    } catch (error) {
        console.error('Test Failed: Settings Icon Click -', error.message);
        throw error;
    }
}

export default clickSettingsIcon;