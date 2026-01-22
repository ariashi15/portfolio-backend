// Simple test to verify API endpoints exist and export functions
const fs = require('fs');
const path = require('path');

console.log('Running basic API structure tests...\n');

const apiDir = path.join(__dirname, 'api');
const endpoints = ['index.js', 'pages.js', 'page.js'];

let passed = 0;
let failed = 0;

endpoints.forEach((endpoint) => {
  const filePath = path.join(apiDir, endpoint);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ FAIL: ${endpoint} does not exist`);
    failed++;
    return;
  }
  
  try {
    const handler = require(filePath);
    
    if (typeof handler !== 'function') {
      console.log(`❌ FAIL: ${endpoint} does not export a function`);
      failed++;
      return;
    }
    
    console.log(`✅ PASS: ${endpoint} exists and exports a function`);
    passed++;
  } catch (error) {
    console.log(`❌ FAIL: ${endpoint} - ${error.message}`);
    failed++;
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Tests passed: ${passed}/${endpoints.length}`);
console.log(`Tests failed: ${failed}/${endpoints.length}`);
console.log('='.repeat(50));

if (failed > 0) {
  process.exit(1);
}
