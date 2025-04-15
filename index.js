import dotenv from 'dotenv';
dotenv.config();

import signin from './login.js';
// import clickSettingsIcon from './settingIcon.js';
// import selectWorkspaceModule from './navigateWorkspace.js';
// import clickCreateWorkspace from './workspaceCreation.js';
//import navigateToHome from './homeNavigation.js';
import workspaceSetting from './workspaceSetting.js';
import navigateToSchema from './navigateSchema.js';
//import schemaSet from './schemaSet.js';
import schema from './schema.js';

async function main() {
  try {
    
    const { browser, page } = await signin();
    // await clickSettingsIcon(page);
    // await selectWorkspaceModule(page);
    // await clickCreateWorkspace(page);
    // await navigateToHome(page);
    await workspaceSetting(page);
    await navigateToSchema(page);
    //await schemaSet(page);
    await schema(page);
  } catch (error) {
    console.error('Automation failed:', error);
  }
}

main();
