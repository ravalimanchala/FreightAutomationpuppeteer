import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.TEST_EMAIL;
const PASSWORD = process.env.TEST_PASSWORD;

async function signin() {
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
      timeout: 60000
    });

    const pages = await browser.pages();
    if (pages.length > 0) {
      page = pages[0];
    } else {
      page = await browser.newPage();
    }

    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);

    // First login - cloud.voltuswave.com
    await page.goto('https://cloud.voltuswave.com/', {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.type('#loginEmail', EMAIL);
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.type('#loginPassword', PASSWORD);
    await new Promise(resolve => setTimeout(resolve, 2000));

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('button[type="submit"]')
    ]);
    
    console.log('✅ Cloud login successful');

    // Second login - april.voltuswave.com
    await page.goto('https://april.voltuswave.com/', {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.type('#loginEmail', EMAIL);
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.type('#loginPassword', PASSWORD);
    await new Promise(resolve => setTimeout(resolve, 2000));

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('button[type="submit"]')
    ]);
    
    console.log('✅ April login successful');
    return { browser, page };
  } catch (error) {
    console.error('Login failed:', error.message);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

export default signin;
