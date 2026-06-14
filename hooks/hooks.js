// hooks/hooks.js
// Cucumber Hooks for Test Setup and Teardown

const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const Logger = require('../utils/Logger');
const ScreenshotUtil = require('../utils/ScreenshotUtil');
const ConfigManager = require('../config/config');

// Set default timeout to 60 seconds for all steps and hooks
setDefaultTimeout(60 * 1000);

let browser;

BeforeAll(async function() {
  Logger.section('Starting Test Execution');
});

/**
 * Before Hook - Runs before each scenario
 * Launches browser, creates context and page
 */
Before(async function(scenario) {
  try {
    Logger.log(`Starting scenario: ${scenario.pickle.name}`);
    
    const config = ConfigManager.getConfig();
    
    // Launch browser
    browser = await chromium.launch({
      headless: config.headless
    });
    
    // Create browser context
    const context = await browser.newContext();
    
    // Create new page and attach to World context
    const page = await context.newPage();
    this.page = page;
    this.context = context;
    this.browser = browser;
    
    // Set viewport
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to base URL
    await this.page.goto(config.baseUrl, { waitUntil: 'networkidle' });
    
    Logger.pass(`Browser launched and page created for scenario: ${scenario.pickle.name}`);
    
  } catch (error) {
    Logger.error(`Failed to setup test environment: ${error.message}`);
    throw error;
  }
});

/**
 * After Hook - Runs after each scenario
 * Captures screenshot on failure and closes browser
 */
After(async function(scenario) {
  try {
    if (this.page) {
      // Capture screenshot based on scenario status
      if (scenario.result.status === 'FAILED') {
        Logger.fail(`Scenario failed: ${scenario.pickle.name}`);
        
        // Capture screenshot on failure
        if (this.page && !this.page.isClosed()) {
          await ScreenshotUtil.captureScreenshotOnFailure(this.page, scenario);
        }
      } else if (scenario.result.status === 'PASSED') {
        Logger.pass(`Scenario passed: ${scenario.pickle.name}`);
      }
      
      // Close page
      if (this.page && !this.page.isClosed()) {
        await this.page.close();
      }
    }
    
    // Close browser context
    if (this.context) {
      await this.context.close();
    }
    
    // Close browser
    if (browser) {
      await browser.close();
      Logger.log('Browser closed');
    }
    
  } catch (error) {
    Logger.error(`Error in After hook: ${error.message}`);
  }
  
  Logger.log(`Finished scenario: ${scenario.pickle.name}\n`);
});

AfterAll(async function() {
  Logger.section('Test Execution Completed');
});

module.exports = {
  Before,
  After,
  BeforeAll,
  AfterAll
};
