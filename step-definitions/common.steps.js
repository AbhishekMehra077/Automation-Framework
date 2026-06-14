// step-definitions/common.steps.js
// Common UI Interaction Step Definitions

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const Logger = require('../utils/Logger');

When('user takes a screenshot', async function() {
  try {
    const screenshot = await this.page.screenshot();
    Logger.log('Screenshot captured');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user waits for {int} seconds', async function(seconds) {
  try {
    await this.page.waitForTimeout(seconds * 1000);
    Logger.log(`Waited for ${seconds} seconds`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('page should contain {string}', async function(text) {
  try {
    const pageContent = await this.page.content();
    expect(pageContent.includes(text)).toBeTruthy();
    Logger.pass(`Page contains text: ${text}`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('page title should contain {string}', async function(titleText) {
  try {
    const title = await this.page.title();
    expect(title.includes(titleText)).toBeTruthy();
    Logger.pass(`Page title contains: ${titleText}`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('current URL should contain {string}', async function(urlPart) {
  try {
    const url = this.page.url();
    expect(url.includes(urlPart)).toBeTruthy();
    Logger.pass(`Current URL contains: ${urlPart}`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

module.exports = {
  Given,
  When,
  Then
};
