import { faker } from '@faker-js/faker';
 
async function schema(page) {
  try {
    // Navigate to Schemas List and click +Schema button
    const schemaListXPath = "//span[contains(@class, 'css-1hfz00f-treeMenuName') and text()='Schemas List']";
    const [schemaListElement] = await page.$x(schemaListXPath);
    await schemaListElement.click();
    await page.waitForTimeout(2000);
 
    // Click +Schema button
    const addSchemaXPath = "//button[.//span[text()='Schema'] and contains(@style, 'rgb(51, 119, 255)')]";
    const [addSchemaBtn] = await page.$x(addSchemaXPath);
    await addSchemaBtn.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
 
    // Fill schema form
    await page.waitForSelector('#SchemaName', { timeout: 10000 });
   
    // Generate unique schema name
    const schemaName = faker.word.adjective().toLowerCase() + 
                      faker.word.noun().toLowerCase();
    await page.type('#SchemaName', schemaName, { delay: 100 });
    
    // Generate and fill schema description
    const schemaDesc = faker.lorem.sentence();
    await page.type('#schemaDescription', schemaDesc, { delay: 100 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Select Schema Type as Testing (default)
    await page.waitForSelector('select[aria-label="Schema Type"]');
    await page.select('select[aria-label="Schema Type"]', '0'); // 0 represents Testing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Select the newly created Schema Set
    await page.waitForSelector('#schemaSetDropdown');
    await page.evaluate(() => {
      const dropdown = document.querySelector('#schemaSetDropdown');
      const options = Array.from(dropdown.options).slice(1);
      if (options.length > 0) {
        dropdown.value = options[0].value; // Select most recent schema set
        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
 
    // Wait for environments to load and select all available environments
    // Select specific environments
    await page.waitForSelector('.mt-3.flex.gap-3.justify-around.flex-wrap');
    await page.evaluate(() => {
      const envContainer = document.querySelector('.mt-3.flex.gap-3.justify-around.flex-wrap');
      if (envContainer) {
        // Get all enabled checkboxes
        const checkboxes = Array.from(envContainer.querySelectorAll('input[type="checkbox"]:not(:disabled)'));
        // Select only the first environment (DEV_1)
        if (checkboxes.length > 0) {
          checkboxes[0].checked = true;
          checkboxes[0].dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Remove the "Select All" click since we're selecting specific environments
    
    // Click Select All for environments
    await page.evaluate(() => {
      const selectAllCheckbox = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .find(checkbox => checkbox.parentElement.textContent.includes('Select All'));
      if (selectAllCheckbox) {
        selectAllCheckbox.click();
      }
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
 
    // Click Create button when enabled
    await page.waitForFunction(() => {
      const createBtn = document.querySelector('button[type="submit"]');
      return !createBtn.disabled;
    }, { timeout: 10000 });
 
    // Click Create button and wait
    await page.click('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Wait for success toast message
    await page.waitForSelector('.Toastify__toast-body', { timeout: 10000 });
    console.log('Test Passed: Schema Creation');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return schema name for verification
    return schemaName;
  } catch (error) {
    console.error('Test Failed: Schema Creation -', error.message);
    throw error;
  }
}
 
export default schema;