import { faker } from '@faker-js/faker';

async function schemaSet(page) {
  try {
    // Schema Set button click
    await page.waitForFunction(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.some(button =>
        button.textContent.includes('Schema Set') &&
        window.getComputedStyle(button).backgroundColor === 'rgb(51, 119, 255)'
      );
    }, { timeout: 10000 });

    await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll('button'))
        .find(btn =>
          btn.textContent.includes('Schema Set') &&
          window.getComputedStyle(btn).backgroundColor === 'rgb(51, 119, 255)'
        );
      if (button) button.click();
    });

    // Fill Schema Set form
    await page.waitForSelector('.modal-focus-remove', { visible: true, timeout: 30000 });
    
    // Generate schema set name with workspace reference
    const workspaceName = await page.evaluate(() => {
      const workspaceTitle = document.querySelector('.css-1hfz00f-treeMenuName');
      return workspaceTitle ? workspaceTitle.textContent : '';
    });
    const schemaSetName = `${workspaceName}SchemaSet`;
    const schemaDescription = faker.lorem.sentence(); // Using faker to generate random description

    await page.type('#schemaSetName', schemaSetName, { delay: 100 });
    await page.type('#schemaSetDescription', schemaDescription, { delay: 100 });

    // Select only DEV environment
    await page.click('#env-0'); // DEV environment checkbox
    await page.waitForTimeout(500);
    // Save Schema Set
    await page.waitForFunction(() => {
      const saveBtn = Array.from(document.querySelectorAll('button'))
        .find(btn => btn.textContent.trim() === 'Save' && !btn.disabled);
      return saveBtn !== undefined;
    }, { timeout: 5000 });

    await page.evaluate(() => {
      const saveBtn = Array.from(document.querySelectorAll('button'))
        .find(btn => btn.textContent.trim() === 'Save' && !btn.disabled);
      if (saveBtn) saveBtn.click();
    });
    await page.waitForTimeout(3000);
    console.log('✅ Schema Set created successfully');
  } catch (error) {
    console.error('Schema Set creation failed:', error.message);
    throw error;
  }
}

export default schemaSet;