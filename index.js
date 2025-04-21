import dotenv from 'dotenv';
dotenv.config();

import signin from './login.js';
import clickSettingsIcon from './settingicon.js';
import selectWorkspaceModule from './navigateWorkspace.js';
import clickCreateWorkspace from './workspaceCreation.js';
import navigateToHome from './homeNavigation.js';
import workspaceSetting from './workspaceSetting.js';
import navigateToSchema from './navigateSchema.js';
import schemaSet from './schemaSet.js';
import schema from './schema.js';
import selectWorkspace from './workspaceSelection.js';
import schemaSettings from './schemaSettings.js';
import clickSolutionsList from './clickSolutionsList.js';
import clickAddSolutions from './clickAddSolutions.js';
import createSolution from './createSolution.js';

async function main() {
  try {
    const { browser, page } = await signin();
    
    // Step 1: Create Workspace
    await clickSettingsIcon(page);
    console.log('Test Passed: Settings Icon Click');
    
    await selectWorkspaceModule(page);
    console.log('Test Passed: Workspace Module Navigation');
    
    const workspaceName = await clickCreateWorkspace(page);
    console.log(`Test Passed: Workspace Creation - ${workspaceName}`);
    
    // Step 2: Verify workspace creation and click settings
    await navigateToHome(page);
    const workspaceExists = await page.evaluate((name) => {
      const workspaces = Array.from(document.querySelectorAll('.css-1hfz00f-treeMenuName'));
      return workspaces.some(ws => ws.textContent.includes(name));
    }, workspaceName);
    console.log(`Test ${workspaceExists ? 'Passed' : 'Failed'}: Workspace Verification`);

    // Click settings icon of recent workspace
    await page.evaluate(() => {
      const workspaceCards = Array.from(document.querySelectorAll('.cardInfo'));
      if (workspaceCards.length > 0) {
        const recentCard = workspaceCards[0];
        const settingsButton = recentCard.querySelector('.css-1iua5li-borderSettings');
        if (settingsButton) {
          settingsButton.click();
        }
      }
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Test Passed: Workspace Settings Navigation');

    // Step 4: Navigate to Schema section
    await navigateToSchema(page);

    // Step 5: Navigate to Schema section
    await navigateToSchema(page);

    // Step 6: Create Schema Set
    const schemaSetName = await schemaSet(page);
    
    // Step 7: Verify schema set creation
    const schemaSetExists = await page.evaluate((name) => {
      const schemaSets = Array.from(document.querySelectorAll('#schemaSetDropdown option'));
      return schemaSets.some(set => set.textContent.includes(name));
    }, schemaSetName);
    console.log(`Test ${schemaSetExists ? 'Passed' : 'Failed'}: Schema Set Verification`);

    // Step 8: Create Schema
    const schemaName = await schema(page);
    
    // Step 9: Verify schema creation
    await page.goBack();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const schemaExists = await page.evaluate((name) => {
      const schemas = Array.from(document.querySelectorAll('.schema-list-item'));
      return schemas.some(schema => schema.textContent.includes(name));
    }, schemaName);
    console.log(`Test ${schemaExists ? 'Passed' : 'Failed'}: Schema Verification`);

    // Step 10: Navigate back to home
    await page.goBack();
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Step 11: Select the workspace
    await selectWorkspace(page);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 12: Click schema settings
    await schemaSettings(page);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 13: Click Solutions List app
    await clickSolutionsList(page);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 14: Click +Solutions button
    await clickAddSolutions(page);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 15: Create Solution
    const solutionName = await createSolution(page);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update testResults object
    const testResults = {
        settingsIconClick: true,
        workspaceModuleNav: true,
        workspaceCreation: true,
        workspaceVerification: workspaceExists,
        workspaceSettingsNav: true,
        schemaNavigation: true,
        schemaSetCreation: true,
        schemaSetVerification: schemaSetExists,
        schemaCreation: true,
        schemaVerification: schemaExists,
        schemaSettingsClick: true,
        solutionsListClick: true,
        addSolutionsClick: true,
        solutionCreation: true
    };

    const totalTests = Object.keys(testResults).length;
    const passedTests = Object.values(testResults).filter(Boolean).length;
    const failedTests = totalTests - passedTests;

    console.log('\n=== Test Summary ===');
    console.log(`Total Test Cases: ${totalTests}`);
    console.log(`Tests Passed: ${passedTests}`);
    console.log(`Tests Failed: ${failedTests}`);
    console.log(`\nOverall Test Result: ${failedTests === 0 ? 'PASSED ✅' : 'FAILED ❌'}`);

  } catch (error) {
    console.error('Test Failed:', error.message);
  }
}

main();
