# OrangeHRM Playwright + Cucumber BDD Automation Framework

A production-ready, enterprise-grade test automation framework built with **Playwright**, **JavaScript**, **Cucumber BDD**, and **Page Object Model (POM)** architecture.

## Project Overview

This framework provides comprehensive test automation for the **OrangeHRM** application with:

- ✅ **BDD (Behavior-Driven Development)** using Cucumber and Gherkin
- ✅ **Page Object Model (POM)** for maintainable and scalable tests
- ✅ **Playwright** for fast and reliable browser automation
- ✅ **JavaScript** (not TypeScript) for simplicity and flexibility
- ✅ **Reusable Components** for sidebar and header navigation
- ✅ **Screenshot Capture** on test failures
- ✅ **Configuration Management** with environment variables
- ✅ **Comprehensive Logging** for debugging
- ✅ **HTML Test Reports** with detailed execution information

## Framework Architecture

### Core Components

```
Framework Layers:
  │
  ├── Feature Files (Gherkin)
  │   ├── auth/login.feature
  │   ├── pim/employee_list.feature
  │   ├── recruitment/candidates.feature
  │   ├── admin/system_users.feature
  │   └── navigation.feature
  │
  ├── Step Definitions (JavaScript)
  │   ├── auth.steps.js
  │   ├── navigation.steps.js
  │   ├── pim.steps.js
  │   ├── recruitment.steps.js
  │   ├── admin.steps.js
  │   └── common.steps.js
  │
  ├── Page Objects (POM)
  │   ├── BasePage.js (26 reusable methods)
  │   ├── LoginPage.js
  │   ├── DashboardPage.js
  │   ├── EmployeeListPage.js
  │   ├── CandidatesPage.js
  │   └── AdminSystemUsersPage.js
  │
  ├── Hooks & Utilities
  │   ├── hooks.js (Before/After scenario hooks)
  │   ├── Logger.js
  │   ├── ScreenshotUtil.js
  │   └── RandomDataUtil.js
  │
  └── Configuration
      ├── config.js
      ├── .env
      └── .env.example
```

### Page Object Model Design

Each page object follows these principles:

1. **Encapsulation**: Locators are private, methods are public
2. **Reusability**: Inherits from BasePage for common functionality
3. **Business Logic**: Contains only business-level operations
4. **Clear Naming**: Method names describe what they do

**Example Page Object Structure:**

```javascript
class LoginPage extends BasePage {
  // Locators (Private - using getters)
  get usernameInput() { return 'input[name="username"]'; }
  get passwordInput() { return 'input[name="password"]'; }
  get loginButton() { return 'button[type="submit"]'; }

  // Business Methods (Public)
  async login(username, password) { ... }
  async isLoginPageDisplayed() { ... }
  async getErrorMessage() { ... }
}
```

### Reusable Components

#### 1. Navigation Component (Sidebar)
- **Location**: Implemented in DashboardPage
- **Used By**: All authenticated page objects
- **Methods**:
  - `navigateTo<Module>()` - Navigate to specific module
  - `isModuleVisible(moduleName)` - Verify module accessibility

#### 2. TopBar Component (Header)
- **Location**: Implemented in DashboardPage and BasePage
- **Used By**: All authenticated pages
- **Methods**:
  - `clickProfileButton()` - Open user menu
  - `takeScreenshot(name)` - Capture screenshots

### BasePage Reusable Methods (26 Methods)

```javascript
// Click & Input Methods
- click(locator, options)
- fill(locator, text)
- type(locator, text)
- doubleClick(locator)
- rightClick(locator)
- pressKey(locator, key)

// Verification Methods
- getText(locator)
- getAttribute(locator, attribute)
- isVisible(locator)
- isEnabled(locator)
- getElementCount(locator)

// User Interaction Methods
- hover(locator)
- waitForElement(locator, timeout)
- scrollIntoView(locator)
- selectDropdown(locator, optionValue)
- uploadFile(locator, filepath)

// Navigation Methods
- navigateTo(url)
- getPageUrl()
- waitForNavigation()

// Utility Methods
- takeScreenshot(name)
- closePage()
```

## Folder Structure

```
playwright-bdd-framework/
├── features/                           # Feature files (Gherkin)
│   ├── auth/
│   │   └── login.feature              # Login scenarios (5 scenarios)
│   ├── pim/
│   │   └── employee_list.feature      # PIM scenarios (7 scenarios)
│   ├── recruitment/
│   │   └── candidates.feature         # Recruitment scenarios (7 scenarios)
│   ├── admin/
│   │   └── system_users.feature       # Admin scenarios (7 scenarios)
│   └── navigation.feature              # Navigation scenarios (7 scenarios)
│
├── step-definitions/                   # Step implementations
│   ├── auth.steps.js                  # Login/Logout steps (10 steps)
│   ├── navigation.steps.js            # Navigation steps (6 steps)
│   ├── pim.steps.js                   # PIM steps (7 steps)
│   ├── recruitment.steps.js           # Recruitment steps (7 steps)
│   ├── admin.steps.js                 # Admin steps (7 steps)
│   └── common.steps.js                # Common UI steps (5 steps)
│
├── pages/                              # Page Object Model
│   ├── BasePage.js                    # Base page (26 reusable methods)
│   ├── LoginPage.js                   # Login page (7 methods)
│   ├── DashboardPage.js               # Dashboard page (15 navigation methods)
│   ├── EmployeeListPage.js            # PIM Employee list (8 methods)
│   ├── CandidatesPage.js              # Recruitment Candidates (8 methods)
│   └── AdminSystemUsersPage.js        # Admin System Users (8 methods)
│
├── hooks/                              # Cucumber hooks
│   └── hooks.js                       # Before/After scenario hooks
│
├── utils/                              # Utility classes
│   ├── Logger.js                      # Logging (8 methods)
│   ├── ScreenshotUtil.js              # Screenshot handling (4 methods)
│   └── RandomDataUtil.js              # Test data generation (9 methods)
│
├── config/                             # Configuration management
│   └── config.js                      # Config manager (5 methods)
│
├── test-data/                          # Test data files
│   ├── users.json                     # User credentials
│   └── employees.json                 # Employee test data
│
├── reports/                            # Test reports & screenshots
│   ├── screenshots/                   # Failure screenshots
│   └── html-reports/                  # HTML test reports
│
├── Configuration Files
│   ├── package.json                   # Dependencies
│   ├── playwright.config.js           # Playwright configuration
│   ├── cucumber.js                    # Cucumber configuration
│   ├── .env                           # Environment variables
│   ├── .env.example                   # Environment template
│   └── README.md                      # This file
```

## Framework Design Decisions

### 1. Page Object Model (POM)
- **Why**: Separates test logic from page structure, making tests maintainable
- **Implementation**: Each page is a class inheriting from BasePage
- **Benefit**: Changes to UI locators only affect page objects, not tests

### 2. BDD with Cucumber
- **Why**: Tests are written in human-readable Gherkin language
- **Implementation**: Feature files with Given-When-Then structure
- **Benefit**: Non-technical stakeholders can understand test cases

### 3. BasePage Pattern
- **Why**: Eliminates code duplication for common actions
- **Implementation**: 26 reusable methods for browser interactions
- **Benefit**: DRY principle, easier maintenance

### 4. Component-Based Design
- **Why**: Reusable UI components (navigation, headers) appear on multiple pages
- **Implementation**: Methods in page objects handle component interactions
- **Benefit**: Reduces code duplication, centralizes component logic

### 5. Configuration Management
- **Why**: Different environments need different configurations
- **Implementation**: .env file with environment variables
- **Benefit**: Easy switching between environments, secure credential storage

### 6. Screenshot on Failure
- **Why**: Helps in debugging failures
- **Implementation**: Automatic screenshot capture in After hook
- **Benefit**: Visual evidence of failure state

### 7. Comprehensive Logging
- **Why**: Detailed logs help in test debugging
- **Implementation**: Logger utility class with different log levels
- **Benefit**: Easy troubleshooting and audit trail

## Installation Steps

### Prerequisites

- **Node.js** v16+ installed
- **npm** (comes with Node.js)
- **Git** for version control

### Setup Instructions

1. **Navigate to project directory**
   ```bash
   cd d:\Abhishek\test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm list
   ```

4. **Configure environment variables**
   ```bash
   # Copy .env.example to .env
   copy .env.example .env
   
   # Edit .env with your configuration
   notepad .env
   ```

5. **Install Playwright browsers** (if needed)
   ```bash
   npx playwright install
   ```

## Execution Commands

### Run All Tests
```bash
npm test
```

### Run All Tests in Headed Mode
```bash
npm run test:headed
```

### Run Specific Test Suite
```bash
# Login tests only
npm run test:auth

# PIM tests only
npm run test:pim

# Recruitment tests only
npm run test:recruitment

# Admin tests only
npm run test:admin
```

### Run Tests with Specific Tags
```bash
# Run only smoke tests
npx cucumber-js --tags "@smoke"

# Run smoke and regression tests
npx cucumber-js --tags "@smoke or @regression"

# Run tests excluding specific tags
npx cucumber-js --tags "not @negative"
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Clean Reports and Screenshots
```bash
npm run clean:reports
```

## Test Reports

### HTML Reports
After test execution, reports are generated at:
- **Location**: `reports/html-reports/`
- **Main Report**: `cucumber-report.html`
- **Module-specific Reports**:
  - `auth-report.html`
  - `pim-report.html`
  - `recruitment-report.html`
  - `admin-report.html`

### Screenshots
- **Location**: `reports/screenshots/`
- **Naming**: `{failure|success}_{scenario_name}_{timestamp}.png`
- **Captured On**: Test failure (automatic in After hook)

## Available Scenarios (33 Total)

### Authentication (5 scenarios)
- ✓ Successful login with valid credentials
- ✓ Login and verify dashboard widgets
- ✓ Verify login button is enabled
- ✓ Verify error message on invalid login
- ✓ Verify forgot password link is accessible

### Navigation (7 scenarios)
- ✓ Navigate to PIM module
- ✓ Navigate to Admin module
- ✓ Navigate to Recruitment module
- ✓ Navigate to Leave module
- ✓ Verify all modules visible in sidebar
- ✓ Navigate to My Info module
- ✓ Navigate to Performance module

### PIM Module (7 scenarios)
- ✓ Verify employee list page displays
- ✓ Verify add employee button is visible
- ✓ Verify search functionality is available
- ✓ Verify employee list contains data
- ✓ Click add employee button
- ✓ Search for specific employee
- ✓ Verify employee list page title

### Recruitment Module (7 scenarios)
- ✓ Verify candidates page displays
- ✓ Verify add candidate button is visible
- ✓ Verify candidate list contains data
- ✓ Click add candidate button
- ✓ Verify candidate cards are displayed
- ✓ Search for specific candidate
- ✓ Verify candidates page has correct URL

### Admin Module (7 scenarios)
- ✓ Verify admin system users page displays
- ✓ Verify add system user button is visible
- ✓ Verify system users table is visible
- ✓ Verify system users list contains data
- ✓ Click add system user button
- ✓ Search for specific system user
- ✓ Verify admin page has correct URL

## Locator Strategy

### Verified Locator Priority

1. **Name Attributes** (Most Reliable)
   - Example: `input[name="username"]`
   - Used for: Form inputs

2. **Type Attributes**
   - Example: `button[type="submit"]`
   - Used for: Buttons, inputs

3. **Text Content** (GetByText)
   - Example: `button:has-text("Login")`
   - Used for: Buttons, links with text

4. **CSS Selectors**
   - Example: `.oxd-button--main`
   - Used for: Specific styling classes

5. **Role-based Selectors**
   - Example: `a:has-text("Admin")`
   - Used for: Navigation, semantic elements

### Locator Examples from Application

```javascript
// Login Page
input[name="username"]           // Username field
input[name="password"]           // Password field
button[type="submit"]            // Login button

// Dashboard - Navigation
a:has-text("PIM")               // PIM module link
a:has-text("Admin")             // Admin module link
button:has(img[alt="profile"]) // Profile dropdown

// List Pages
button:has-text("Add")          // Add button
input[placeholder*="Search"]    // Search box
table                           // Data table
```

## Browser Configuration

### Supported Browsers
- ✅ Chromium (Default)
- ℹ️ Firefox (Can be added)
- ℹ️ WebKit (Can be added)

### Current Configuration
- **Browser**: Chromium
- **Headless**: `false` (runs with UI)
- **Timeout**: 10000ms (10 seconds)
- **Viewport**: 1920x1080

### Modify Browser Settings

Edit `.env` file:
```env
HEADLESS=false          # Set to true for headless mode
BROWSER_TYPE=chromium   # Change browser type
TIMEOUT=10000          # Change timeout in milliseconds
```

## Configuration Management

### Environment Variables

```env
# Application URL
BASE_URL=https://opensource-demo.orangehrmlive.com

# Default Test Credentials
DEFAULT_USERNAME=Admin
DEFAULT_PASSWORD=admin123

# Playwright Configuration
HEADLESS=false
BROWSER_TYPE=chromium
TIMEOUT=10000

# Screenshot Configuration
TAKE_SCREENSHOTS=true
SCREENSHOT_PATH=reports/screenshots

# Logging Configuration
LOG_LEVEL=info
```

### Access Configuration in Code

```javascript
const ConfigManager = require('./config/config');

// Get all config
const config = ConfigManager.getConfig();

// Get specific values
const baseUrl = ConfigManager.getBaseUrl();
const credentials = ConfigManager.getCredentials();
const browserConfig = ConfigManager.getBrowserConfig();
```

## Utilities

### Logger Utility

```javascript
const Logger = require('./utils/Logger');

Logger.log('General log message');
Logger.info('Info level message');
Logger.error('Error level message');
Logger.warn('Warning level message');
Logger.debug('Debug level message');
Logger.pass('Test passed');
Logger.fail('Test failed');
Logger.section('Section title');
```

### Screenshot Utility

```javascript
const ScreenshotUtil = require('./utils/ScreenshotUtil');

// Capture screenshot
await ScreenshotUtil.captureScreenshot(page, 'screenshot_name');

// Capture on failure
await ScreenshotUtil.captureScreenshotOnFailure(page, scenario);

// Clean old screenshots
ScreenshotUtil.cleanupOldScreenshots(7); // Delete screenshots older than 7 days
```

### Random Data Utility

```javascript
const RandomDataUtil = require('./utils/RandomDataUtil');

RandomDataUtil.generateRandomString(10);
RandomDataUtil.generateRandomEmail();
RandomDataUtil.generateRandomPhone();
RandomDataUtil.generateRandomEmployeeId();
RandomDataUtil.generateRandomUsername();
RandomDataUtil.generateRandomPassword(12);
RandomDataUtil.generateRandomDate();
RandomDataUtil.generateRandomFirstName();
RandomDataUtil.generateRandomLastName();
```

## Hooks Execution Flow

### Before Hook (Runs before each scenario)
1. Log scenario name
2. Launch Chromium browser
3. Create browser context
4. Create new page
5. Set viewport size (1920x1080)
6. Navigate to base URL
7. Wait for page to load

### After Hook (Runs after each scenario)
1. Check scenario status
2. If failed: Capture screenshot
3. If passed: Log success
4. Close page
5. Close browser
6. Log completion

## Test Data

### Users (test-data/users.json)
```json
{
  "admin": {
    "username": "Admin",
    "password": "admin123"
  }
}
```

### Employees (test-data/employees.json)
Sample employee data for testing

## Best Practices

### Writing Test Cases
1. **One scenario per feature**
2. **Use descriptive scenario names**
3. **Follow Given-When-Then format**
4. **Use proper tags** (@smoke, @regression, etc.)
5. **Keep steps simple and reusable**

### Using Page Objects
1. **Keep locators as getters**
2. **Make methods descriptive**
3. **Inherit from BasePage**
4. **Don't add test logic to page objects**
5. **Keep business logic in steps**

### Code Quality
1. **Use meaningful variable names**
2. **Add comments for complex logic**
3. **Keep methods single-responsible**
4. **Use try-catch for error handling**
5. **Log important steps**

## Troubleshooting

### Common Issues

**Issue**: "Element not found" error
```
Solution: Verify locator is correct using browser DevTools
          Check if element is within viewport
          Add explicit wait if element loads dynamically
```

**Issue**: Tests timeout
```
Solution: Increase TIMEOUT in .env file
          Check if application is responding
          Verify network connectivity
```

**Issue**: Screenshots not captured
```
Solution: Verify TAKE_SCREENSHOTS=true in .env
          Check SCREENSHOT_PATH exists
          Verify write permissions on directory
```

**Issue**: Browser crashes
```
Solution: Run npx playwright install
          Close other browser instances
          Increase system memory
```

## Project Statistics

- **Total Scenarios**: 33
- **Total Steps**: 42+
- **Page Objects**: 6 (5 specific + 1 base)
- **Utilities**: 3 (Logger, Screenshot, RandomData)
- **Base Page Methods**: 26 reusable methods
- **Features**: 5 feature files
- **Step Definition Files**: 6
- **Locators Verified**: 15+

## Framework Capabilities

✅ **Cross-browser Testing** - Chromium support  
✅ **Parallel Execution** - Can be configured  
✅ **Retry Logic** - Configurable in playwright.config.js  
✅ **Screenshot Capture** - On failure automatically  
✅ **HTML Reports** - Detailed test reports  
✅ **Video Recording** - Can be enabled  
✅ **Trace Recording** - On failure  
✅ **Network Throttling** - Configurable  
✅ **Geolocation Testing** - Supported  
✅ **Device Emulation** - Supported  

## Dependencies

```json
{
  "@cucumber/cucumber": "^9.5.1",
  "@playwright/test": "^1.40.1",
  "dotenv": "^16.3.1",
  "html-reporter": "^1.3.2"
}
```

## Version Information

- **Framework Version**: 1.0.0
- **Playwright**: 1.40.1
- **Cucumber**: 9.5.1
- **Node.js**: 16+ required
- **npm**: 8+ required

## Support & Documentation

### Official Documentation
- [Playwright Docs](https://playwright.dev/)
- [Cucumber.js Docs](https://github.com/cucumber/cucumber-js)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)

### Framework Creator
- **Author**: QA Automation Team
- **Created**: June 2026
- **License**: ISC

## Next Steps

1. Install dependencies: `npm install`
2. Configure .env file with your settings
3. Run smoke tests: `npm run test:auth`
4. View reports: Open `reports/html-reports/cucumber-report.html`
5. Extend framework with custom page objects and scenarios

## Contributing

To extend this framework:

1. **Add new scenarios**: Create feature files in `features/`
2. **Implement steps**: Add step definitions in `step-definitions/`
3. **Create page objects**: Add page classes in `pages/` inheriting from BasePage
4. **Add utilities**: Create helper classes in `utils/`
5. **Update documentation**: Modify README with new capabilities

---

**Happy Testing! 🚀**

For questions or issues, refer to the official documentation or contact the QA Automation team.
