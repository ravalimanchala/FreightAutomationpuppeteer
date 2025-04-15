async function selectWorkspaceModule(page) {
    try {
        // Wait for the workspace menu option to be visible
        await page.waitForSelector('.css-15dbdkh-eachMenuOption');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Find and click the workspace option with specific text
        const workspaceSelector = '.css-15dbdkh-eachMenuOption span.css-7u2752-eachMenuText';
        await page.waitForFunction(
            (selector) => {
                const elements = document.querySelectorAll(selector);
                return Array.from(elements).some(el => el.textContent === 'Workspaces');
            },
            {},
            workspaceSelector
        );

        await page.evaluate(() => {
            const elements = document.querySelectorAll('.css-15dbdkh-eachMenuOption span.css-7u2752-eachMenuText');
            const workspaceElement = Array.from(elements).find(el => el.textContent === 'Workspaces');
            if (workspaceElement) {
                workspaceElement.closest('.css-15dbdkh-eachMenuOption').click();
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ Workspace module selected successfully');

    } catch (error) {
        console.error('Failed to select workspace module:', error.message);
        throw error;
    }
}

export default selectWorkspaceModule;