const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30000);

    console.log('Navigating to http://localhost:8001/bsmk.html');
    await page.goto('http://localhost:8001/bsmk.html', { waitUntil: 'networkidle2' });

    console.log('Waiting for mount element #react-controls');
    await page.waitForSelector('#react-controls', { timeout: 5000 });

    console.log('Waiting for contact card to be inserted by app.js');
    await page.waitForFunction(() => {
      const mount = document.getElementById('react-controls');
      return mount && mount.querySelector('.contact-card');
    }, { timeout: 8000 });

    const title = await page.$eval('#react-controls .contact-title', el => el.textContent.trim());
    console.log('Found contact card title:', title);

    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'light');
    console.log('Initial data-theme:', initialTheme);

    // click the theme toggle button inside the mount
    const toggle = await page.$('#react-controls .theme-toggle');
    if (!toggle) {
      throw new Error('Theme toggle not found');
    }
    await toggle.click();
    // give it a moment to apply
    if (typeof page.waitForTimeout === 'function') {
      await page.waitForTimeout(300);
    } else {
      await new Promise(r => setTimeout(r, 300));
    }
    const afterTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'light');
    console.log('After click data-theme:', afterTheme);

    await browser.close();
    console.log('Headless check completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Headless check failed:', err);
    process.exit(1);
  }
})();
