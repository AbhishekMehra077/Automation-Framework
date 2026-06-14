# Quick Start Guide - OrangeHRM Playwright BDD Framework

## 📋 Pre-requisites

- Node.js v16 or higher
- npm v8 or higher
- Internet connection
- OrangeHRM application access

## ⚡ Quick Setup (5 minutes)

### 1. Navigate to Project
```bash
cd d:\Abhishek\test
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Setup
```bash
node verify-framework.js
```

Expected Output:
```
✓ Framework is properly set up!

Next steps:
1. Run: npm install
2. Run: npm test
```

## 🚀 Run Your First Test

### Option 1: Run All Tests
```bash
npm test
```

### Option 2: Run Login Tests (Recommended First)
```bash
npm run test:auth
```

### Option 3: Run Specific Module Tests
```bash
npm run test:pim          # PIM Employee Management
npm run test:recruitment # Recruitment Module
npm run test:admin        # Admin Module
```

### Option 4: Run Smoke Tests Only
```bash
npx cucumber-js --tags "@smoke"
```

## 📊 View Test Results

After running tests, open the HTML report:

```
reports/html-reports/cucumber-report.html
```

### Screenshots on Failure
```
reports/screenshots/
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `pages/BasePage.js` | Reusable browser methods (26 methods) |
| `pages/LoginPage.js` | Login page object |
| `pages/DashboardPage.js` | Dashboard and navigation |
| `features/auth/login.feature` | Login BDD scenarios |
| `step-definitions/auth.steps.js` | Step implementations |
| `hooks/hooks.js` | Test setup/teardown |
| `config/config.js` | Configuration management |
| `.env` | Environment variables |
| `README.md` | Full documentation |

## 🔧 Configuration

### Modify Test Settings

Edit `.env` file:

```env
# Application URL
BASE_URL=https://opensource-demo.orangehrm.com

# Credentials
DEFAULT_USERNAME=Admin
DEFAULT_PASSWORD=admin123

# Browser Settings
HEADLESS=false        # Set to true for headless mode
BROWSER_TYPE=chromium
TIMEOUT=10000         # Milliseconds
```

## 📝 Writing New Tests

### 1. Create Feature File
```
features/my-module/my-feature.feature
```

### 2. Write BDD Scenario
```gherkin
Feature: My Feature
  Scenario: My Scenario
    Given user is on the login page
    When user enters valid credentials
    Then user should be redirected to dashboard
```

### 3. Implement Steps
```javascript
// step-definitions/my-feature.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');

Given('user is on the login page', async function() {
  // Implementation
});
```

### 4. Create Page Object (if needed)
```javascript
// pages/MyPage.js
const BasePage = require('./BasePage');

class MyPage extends BasePage {
  get myLocator() {
    return 'selector-here';
  }

  async myMethod() {
    // Implementation using BasePage methods
  }
}

module.exports = MyPage;
```

### 5. Run Tests
```bash
npx cucumber-js features/my-module/
```

## 🏷️ Available Test Tags

Run tests by tag:

```bash
# Smoke tests (fast, basic verification)
npx cucumber-js --tags "@smoke"

# Regression tests (comprehensive)
npx cucumber-js --tags "@regression"

# Specific feature
npx cucumber-js --tags "@pim"
npx cucumber-js --tags "@recruitment"

# Exclude tests
npx cucumber-js --tags "not @negative"
```

## 🐛 Debugging

### View Detailed Logs
```bash
npm run test:debug
```

### Take Screenshots Manually
```javascript
// In step definitions
await page.screenshot({ path: 'debug.png' });
```

### Use Browser Developer Tools
```javascript
// Pause execution for debugging
await page.pause();
```

## 📚 Available Methods (BasePage)

```javascript
// Click & Input
await page.click(locator);
await page.fill(locator, text);
await page.type(locator, text);

// Verification
await page.getText(locator);
await page.getAttribute(locator, attr);
await page.isVisible(locator);
await page.isEnabled(locator);

// Interaction
await page.hover(locator);
await page.doubleClick(locator);
await page.rightClick(locator);

// Navigation
await page.navigateTo(url);
await page.waitForNavigation();

// Utility
await page.waitForElement(locator);
await page.takeScreenshot(name);
await page.scrollIntoView(locator);
```

## ⚠️ Troubleshooting

### Tests Timeout
```
Solution: Increase TIMEOUT in .env
          Default: 10000ms (10 seconds)
          Change to: TIMEOUT=15000 (15 seconds)
```

### Element Not Found
```
Solution: Verify locator using browser DevTools
          Check if element is in viewport
          Add wait time if element loads dynamically
```

### Browser Crashes
```
Solution: Run: npx playwright install
          Close other browser instances
          Increase system RAM
```

### Screenshots Not Working
```
Solution: Verify folder exists: reports/screenshots/
          Check write permissions
          Set TAKE_SCREENSHOTS=true in .env
```

## 📞 Help Commands

```bash
# Verify framework setup
node verify-framework.js

# List all tests
npx cucumber-js --dry-run

# Run tests with detailed output
npx cucumber-js --format summary

# Generate report
npm test
```

## 🎓 Learning Resources

- **Framework Docs**: See `README.md`
- **Features Directory**: `features/` - See example scenarios
- **Page Objects**: `pages/` - See implementation patterns
- **Step Definitions**: `step-definitions/` - See step patterns

## ✅ Success Indicators

After `npm test`, you should see:

```
✓ 33 scenarios (33 passed)
✓ 42+ steps (all passed)
✓ Reports generated: reports/html-reports/
✓ No syntax errors
```

## 🎯 Common Workflows

### Run All Tests Once
```bash
npm test
```

### Develop & Test (Watch Mode Recommended)
```bash
# Install nodemon globally (optional)
npm install -g nodemon

# Run tests with auto-reload on file changes
nodemon --exec "npm test" --watch pages --watch features --watch step-definitions
```

### Run Before Committing
```bash
npm test && npm run clean:reports
```

### Run Specific Regression Suite
```bash
npx cucumber-js --tags "@regression"
```

---

**✨ Framework Ready to Use! Happy Testing! 🚀**

For complete documentation: `README.md`
For detailed verification: `FRAMEWORK_GENERATION_REPORT.md`
