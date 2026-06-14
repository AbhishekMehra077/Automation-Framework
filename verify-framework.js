#!/usr/bin/env node

/**
 * Framework Verification Script
 * Verifies all required files and folders are in place
 */

const fs = require('fs');
const path = require('path');

const requiredFolders = [
  'features/auth',
  'features/pim',
  'features/recruitment',
  'features/admin',
  'step-definitions',
  'pages',
  'hooks',
  'utils',
  'config',
  'test-data',
  'reports/screenshots',
  'reports/html-reports'
];

const requiredFiles = [
  'package.json',
  'playwright.config.js',
  'cucumber.js',
  '.env',
  '.env.example',
  'README.md',
  '.gitignore',
  'config/config.js',
  'pages/BasePage.js',
  'pages/LoginPage.js',
  'pages/DashboardPage.js',
  'pages/EmployeeListPage.js',
  'pages/CandidatesPage.js',
  'pages/AdminSystemUsersPage.js',
  'hooks/hooks.js',
  'utils/Logger.js',
  'utils/ScreenshotUtil.js',
  'utils/RandomDataUtil.js',
  'step-definitions/auth.steps.js',
  'step-definitions/navigation.steps.js',
  'step-definitions/pim.steps.js',
  'step-definitions/recruitment.steps.js',
  'step-definitions/admin.steps.js',
  'step-definitions/common.steps.js',
  'features/auth/login.feature',
  'features/pim/employee_list.feature',
  'features/recruitment/candidates.feature',
  'features/admin/system_users.feature',
  'features/navigation.feature',
  'test-data/users.json',
  'test-data/employees.json'
];

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║  OrangeHRM Playwright BDD Framework - Verification Script    ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let folderCount = 0;
let fileCount = 0;
let errors = 0;

// Check folders
console.log('✓ Checking required folders...\n');
requiredFolders.forEach(folder => {
  const folderPath = path.join(process.cwd(), folder);
  if (fs.existsSync(folderPath)) {
    console.log(`  ✓ ${folder}`);
    folderCount++;
  } else {
    console.log(`  ✗ ${folder} - MISSING`);
    errors++;
  }
});

console.log('\n✓ Checking required files...\n');
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  ✓ ${file} (${sizeKB} KB)`);
    fileCount++;
  } else {
    console.log(`  ✗ ${file} - MISSING`);
    errors++;
  }
});

// Summary
console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║  Verification Summary                                        ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

console.log(`  Folders Found:  ${folderCount}/${requiredFolders.length}`);
console.log(`  Files Found:    ${fileCount}/${requiredFiles.length}`);
console.log(`  Errors:         ${errors}`);

if (errors === 0) {
  console.log('\n  ✓ Framework is properly set up!\n');
  console.log('  Next steps:');
  console.log('  1. Run: npm install');
  console.log('  2. Run: npm test\n');
  process.exit(0);
} else {
  console.log(`\n  ✗ Framework setup incomplete. ${errors} item(s) missing.\n`);
  process.exit(1);
}
