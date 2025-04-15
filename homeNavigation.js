async function navigateToHome(page) {
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Navigate back to previous page
        await page.goBack();
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Wait for home page to load
        await page.waitForSelector('.motion-card', { timeout: 30000 });
        console.log('✅ Navigated back to home page');
        
        // Additional wait to ensure page is fully loaded
        await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
        // If goBack fails, try direct navigation
        try {
            await page.goto('https://april.voltuswave.com/home', {
                waitUntil: 'networkidle0',
                timeout: 60000
            });
            console.log('✅ Navigated to home using URL');
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (fallbackError) {
            console.error('Failed to navigate to home:', fallbackError.message);
            throw fallbackError;
        }
    }
}

export default navigateToHome;