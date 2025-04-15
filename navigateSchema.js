async function navigateSchema(page) {
  try {
    // Wait for the Schema menu option to be visible
    await page.waitForSelector('.css-15dbdkh-eachMenuOption', { timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Find and click the Schema option
    await page.evaluate(() => {
      const elements = document.querySelectorAll('.css-15dbdkh-eachMenuOption span.css-7u2752-eachMenuText');
      const schemaElement = Array.from(elements).find(el => el.textContent === 'Schema');
      if (schemaElement) {
        schemaElement.closest('.css-15dbdkh-eachMenuOption').click();
      }
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ Schema menu selected successfully');

  } catch (error) {
    console.error('Failed to select Schema menu:', error.message);
    throw error;
  }
}

export default navigateSchema;