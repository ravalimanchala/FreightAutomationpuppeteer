async function selectWorkspace(page) {
    try {
        // Wait for workspace cards to be visible
        await page.waitForSelector('.cardInfo', { timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Click on the workspace card (avoiding the settings icon)
        await page.evaluate(() => {
            const workspaceCards = Array.from(document.querySelectorAll('.cardInfo'));
            if (workspaceCards.length > 0) {
                // Get the first card (most recent)
                const recentCard = workspaceCards[0];
                // Click on the description area to avoid settings icon
                const cardDescription = recentCard.querySelector('.css-1utsge9-description');
                if (cardDescription) {
                    cardDescription.click();
                }
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Test Passed: Workspace Card Selection');

    } catch (error) {
        console.error('Test Failed: Workspace Card Selection -', error.message);
        throw error;
    }
}

export default selectWorkspace;