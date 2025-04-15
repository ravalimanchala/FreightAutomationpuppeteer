async function clickSettingsIcon(page) {
    try {
        // Wait for page load after login
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Wait for and click settings icon using specific selectors
        const settingsButtonSelector = 'button.css-umemfu-buttonOutlineNone';
        await page.waitForSelector(settingsButtonSelector);
        await page.click(settingsButtonSelector);
        
        // Wait for click action to complete
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('✅ Settings icon clicked successfully');
    } catch (error) {
        console.error('Failed to click settings icon:', error.message);
        throw error;
    }
}

export default clickSettingsIcon;