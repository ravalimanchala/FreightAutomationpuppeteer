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
                      faker.word.noun().toLowerCase() + 
                      'schema';
    await page.type('#SchemaName', schemaName, { delay: 100 });
    
    // Generate concise description using faker
    const schemaDesc = faker.word.words(3) + ' data schema';
    await page.type('#schemaDescription', schemaDesc, { delay: 100 });

    // Select Schema Type as Testing
    await page.waitForSelector('select[aria-label="Schema Type"]');
    await page.select('select[aria-label="Schema Type"]', '0'); // 0 for Testing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Select most recently created Schema Set
    await page.waitForSelector('#schemaSetDropdown');
    await page.evaluate(() => {
      const dropdown = document.querySelector('#schemaSetDropdown');
      const options = Array.from(dropdown.options).slice(1); // Skip "None" option
      if (options.length > 0) {
        // Select first option (most recent schema set)
        dropdown.value = options[0].value;
        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Wait for environments to load and select all available environments
    await page.waitForSelector('.mt-3.flex.gap-3.justify-around.flex-wrap');
    await page.evaluate(() => {
      const envContainer = document.querySelector('.mt-3.flex.gap-3.justify-around.flex-wrap');
      if (envContainer) {
        const checkboxes = envContainer.querySelectorAll('input[type="checkbox"]:not(:disabled)');
        checkboxes.forEach(checkbox => {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        });
      }
    });
    await new Promise(resolve => setTimeout(resolve, 2000));

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
    
    // Wait for success message and display it
    await page.waitForSelector('.Toastify__toast-body', { timeout: 5000 });
    console.log('✅ Schema created successfully');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Navigate to home page
    await page.click('.css-1hfz00f-treeMenuName'); // Click home/root element
    await new Promise(resolve => setTimeout(resolve, 2000));

  } catch (error) {
    console.error('Schema creation failed:', error.message);
    throw error;
  }
}

export default schema;