async function workspaceSetting(page) {
  try {
    // Wait for the workspace cards to be visible
    await page.waitForSelector('.motion-card', { timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get all workspace cards and find the most recent one
    const workspaceCards = await page.$$('.motion-card');
    const lastWorkspaceCard = workspaceCards[workspaceCards.length - 1];

    // Find and click the settings icon within the last workspace card
    const settingsButton = await lastWorkspaceCard.$('button.css-1iua5li-borderSettings');
    if (settingsButton) {
      await settingsButton.click();
      console.log('✅ Settings icon clicked for recent workspace');
    } else {
      throw new Error('Settings icon not found in the recent workspace');
    }
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Wait for menu options to appear
    await page.waitForSelector('.css-15dbdkh-eachMenuOption', { timeout: 30000 });
    console.log('✅ Workspace navigation successful');

  } catch (error) {
    console.error('Workspace navigation failed:', error.message);
    throw error;
  }
}

export default workspaceSetting;