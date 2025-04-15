import { faker } from '@faker-js/faker';

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

async function clickCreateWorkspace(page) {
    try {
        // Wait for the +Workspace button to be visible
        const createWorkspaceButtonSelector = 'button[style*="background-color: rgb(51, 119, 255)"] span';
        await page.waitForFunction(
            (selector) => {
                const elements = document.querySelectorAll(selector);
                return Array.from(elements).some(el => el.textContent === 'Workspace');
            },
            {},
            createWorkspaceButtonSelector
        );

        // Click the +Workspace button
        await page.evaluate(() => {
            const buttons = document.querySelectorAll('button[style*="background-color: rgb(51, 119, 255)"] span');
            const workspaceButton = Array.from(buttons).find(el => el.textContent === 'Workspace');
            if (workspaceButton) {
                workspaceButton.closest('button').click();
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ Create Workspace button clicked successfully');

        // Fill the workspace creation form
        await page.waitForSelector('#WorkspaceName');
        const workspaceName = indianStates[Math.floor(Math.random() * indianStates.length)];
        await page.type('#WorkspaceName', workspaceName);
        console.log('✅ Workspace name entered:', workspaceName);
        await new Promise(resolve => setTimeout(resolve, 2000));

        const description = `This is the ${workspaceName} state workspace for testing purposes`;
        await page.type('#WorkspaceDescription', description);
        console.log('✅ Description entered:', description);
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Select Testing workspace type
        await page.select('select.css-104g1mu-selectStyle', '0');
        console.log('✅ Workspace type selected: Testing');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Click Create button
        await page.evaluate(() => {
            const createButton = Array.from(document.querySelectorAll('button'))
                .find(button => button.textContent === 'Create');
            if (createButton) createButton.click();
        });
        console.log('✅ Create button clicked');
        await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
        console.error('Failed to create workspace:', error.message);
        throw error;
    }
}

export default clickCreateWorkspace;