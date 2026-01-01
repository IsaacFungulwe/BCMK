// smokecheck.js - simple Puppeteer script to load the page and capture console errors
const puppeteer = require('puppeteer');

(async function(){
  const url = process.env.URL || 'http://localhost:8000/bsmk.html';
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  const messages = [];
  page.on('console', msg => {
    try{ messages.push({ type: msg.type(), text: msg.text() }); }catch(e){}
  });
  page.on('pageerror', err => { messages.push({ type: 'error', text: err.message }); });

  try{
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    // give some time for deferred scripts/components
    await new Promise(function(r){ setTimeout(r, 1200); });
  }catch(e){
    console.error('Page navigation failed:', e.message);
    await browser.close();
    process.exit(2);
  }

  await browser.close();

  const errors = messages.filter(m => m.type === 'error' || m.type === 'assert' || m.type === 'warning');
  if(errors.length){
    console.error('Found console errors/warnings:');
    errors.forEach(function(m){ console.error(m.type + ': ' + m.text); });
    process.exit(1);
  }

  console.log('No console errors/warnings detected.');
  process.exit(0);
})();
