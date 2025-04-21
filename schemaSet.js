import { faker } from '@faker-js/faker';

async function schemaSet(page) {
  try {
    // Generate initial faker name (not used)
    const fakerName = faker.word.adjective().toLowerCase() + 
                     faker.word.noun().toLowerCase() + 
                     'set';
    
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
    
    // Generate schema set name using faker
    const schemaSetName = faker.word.adjective().toLowerCase() + 
                         faker.word.noun().toLowerCase() + 
                         'set';
    
    await page.type('#schemaSetName', schemaSetName, { delay: 100 });
    await page.type('#schemaSetDescription', faker.lorem.sentence(), { delay: 100 });

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
    console.log('Test Passed: Schema Set Creation');
    
    // Return the created schema set name for use in schema creation
    return schemaSetName;
  } catch (error) {
    console.error('Test Failed: Schema Set Creation -', error.message);
    throw error;
  }
}

export default schemaSet;