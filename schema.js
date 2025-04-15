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
    
    // Generate meaningful schema name in lowercase without special chars
    const schemaName = 'customerdataschema';
    await page.type('#SchemaName', schemaName, { delay: 100 });
    
    // Short and meaningful description
    const schemaDesc = 'Schema for managing customer information';
    await page.type('#schemaDescription', schemaDesc, { delay: 100 });

    // Select Schema Type as Testing (value "0")
    await page.waitForSelector('select[aria-label="Schema Type"]');
    await page.select('select[aria-label="Schema Type"]', '0');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Select first/latest Schema Set
    await page.waitForSelector('#schemaSetDropdown');
    await page.evaluate(() => {
      const dropdown = document.querySelector('#schemaSetDropdown');
      const options = Array.from(dropdown.options).slice(1);
      if (options.length > 0) {
        dropdown.value = options[0].value;
        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
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

    await page.click('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('✅ Schema created successfully');
  } catch (error) {
    console.error('Schema creation failed:', error.message);
    throw error;
  }
}

export default schema;