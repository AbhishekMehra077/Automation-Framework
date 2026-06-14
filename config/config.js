// config/config.js
// Configuration Management

require('dotenv').config();

class ConfigManager {
  static getConfig() {
    return {
      baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
      username: process.env.DEFAULT_USERNAME || 'Admin',
      password: process.env.DEFAULT_PASSWORD || 'admin123',
      headless: process.env.HEADLESS === 'true',
      browserType: process.env.BROWSER_TYPE || 'chromium',
      timeout: parseInt(process.env.TIMEOUT || '10000'),
      takeScreenshots: process.env.TAKE_SCREENSHOTS === 'true',
      screenshotPath: process.env.SCREENSHOT_PATH || 'reports/screenshots',
      logLevel: process.env.LOG_LEVEL || 'info'
    };
  }

  static getBaseUrl() {
    return this.getConfig().baseUrl;
  }

  static getCredentials() {
    const config = this.getConfig();
    return {
      username: config.username,
      password: config.password
    };
  }

  static getBrowserConfig() {
    const config = this.getConfig();
    return {
      headless: config.headless,
      browserType: config.browserType,
      timeout: config.timeout
    };
  }
}

module.exports = ConfigManager;
