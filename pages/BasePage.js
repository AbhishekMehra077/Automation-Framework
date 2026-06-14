// pages/BasePage.js
// Base Page Class with Reusable Methods

const Logger = require('../utils/Logger');
const ScreenshotUtil = require('../utils/ScreenshotUtil');

class BasePage {
  constructor(page) {
    this.page = page;
    this.timeout = 10000;
  }

  /**
   * Click on an element using locator
   * @param {string} locator - Playwright locator
   * @param {object} options - Click options
   */
  async click(locator, options = {}) {
    try {
      await this.page.locator(locator).click(options);
      Logger.log(`Clicked on element: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to click element ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Fill text in an input field
   * @param {string} locator - Playwright locator
   * @param {string} text - Text to fill
   */
  async fill(locator, text) {
    try {
      await this.page.locator(locator).fill(text);
      Logger.log(`Filled text "${text}" in element: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to fill text in ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Type text character by character
   * @param {string} locator - Playwright locator
   * @param {string} text - Text to type
   */
  async type(locator, text) {
    try {
      await this.page.locator(locator).type(text);
      Logger.log(`Typed text "${text}" in element: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to type text in ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get text content of an element
   * @param {string} locator - Playwright locator
   * @returns {string} Text content
   */
  async getText(locator) {
    try {
      const text = await this.page.locator(locator).textContent();
      Logger.log(`Retrieved text from element ${locator}: ${text}`);
      return text ? text.trim() : '';
    } catch (error) {
      Logger.error(`Failed to get text from ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get attribute value of an element
   * @param {string} locator - Playwright locator
   * @param {string} attribute - Attribute name
   * @returns {string} Attribute value
   */
  async getAttribute(locator, attribute) {
    try {
      const value = await this.page.locator(locator).getAttribute(attribute);
      Logger.log(`Retrieved attribute "${attribute}" from element ${locator}: ${value}`);
      return value || '';
    } catch (error) {
      Logger.error(`Failed to get attribute from ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if element is visible
   * @param {string} locator - Playwright locator
   * @returns {boolean} True if visible
   */
  async isVisible(locator) {
    try {
      const visible = await this.page.locator(locator).isVisible();
      Logger.log(`Element visibility check for ${locator}: ${visible}`);
      return visible;
    } catch (error) {
      Logger.error(`Failed to check visibility of ${locator}: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if element is enabled
   * @param {string} locator - Playwright locator
   * @returns {boolean} True if enabled
   */
  async isEnabled(locator) {
    try {
      const enabled = await this.page.locator(locator).isEnabled();
      Logger.log(`Element enabled check for ${locator}: ${enabled}`);
      return enabled;
    } catch (error) {
      Logger.error(`Failed to check if ${locator} is enabled: ${error.message}`);
      return false;
    }
  }

  /**
   * Hover over an element
   * @param {string} locator - Playwright locator
   */
  async hover(locator) {
    try {
      await this.page.locator(locator).hover();
      Logger.log(`Hovered over element: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to hover over ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Double click on an element
   * @param {string} locator - Playwright locator
   */
  async doubleClick(locator) {
    try {
      await this.page.locator(locator).dblclick();
      Logger.log(`Double clicked on element: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to double click on ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Right click on an element
   * @param {string} locator - Playwright locator
   */
  async rightClick(locator) {
    try {
      await this.page.locator(locator).click({ button: 'right' });
      Logger.log(`Right clicked on element: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to right click on ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Wait for element to be visible
   * @param {string} locator - Playwright locator
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(locator, timeout = this.timeout) {
    try {
      await this.page.locator(locator).waitFor({ timeout });
      Logger.log(`Element became visible: ${locator}`);
    } catch (error) {
      Logger.error(`Timeout waiting for element ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Scroll element into view
   * @param {string} locator - Playwright locator
   */
  async scrollIntoView(locator) {
    try {
      await this.page.locator(locator).scrollIntoViewIfNeeded();
      Logger.log(`Scrolled element into view: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to scroll element into view ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Select dropdown option
   * @param {string} locator - Dropdown locator
   * @param {string} optionValue - Option value to select
   */
  async selectDropdown(locator, optionValue) {
    try {
      await this.page.locator(locator).selectOption(optionValue);
      Logger.log(`Selected dropdown option "${optionValue}" in element: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to select dropdown option in ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Upload file
   * @param {string} locator - File input locator
   * @param {string} filepath - Path to file
   */
  async uploadFile(locator, filepath) {
    try {
      await this.page.locator(locator).setInputFiles(filepath);
      Logger.log(`Uploaded file "${filepath}" to element: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to upload file to ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Press key
   * @param {string} locator - Element locator
   * @param {string} key - Key to press (e.g., 'Enter', 'Escape')
   */
  async pressKey(locator, key) {
    try {
      await this.page.locator(locator).press(key);
      Logger.log(`Pressed key "${key}" on element: ${locator}`);
    } catch (error) {
      Logger.error(`Failed to press key on ${locator}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get count of elements matching locator
   * @param {string} locator - Playwright locator
   * @returns {number} Count of matching elements
   */
  async getElementCount(locator) {
    try {
      const count = await this.page.locator(locator).count();
      Logger.log(`Element count for ${locator}: ${count}`);
      return count;
    } catch (error) {
      Logger.error(`Failed to get element count for ${locator}: ${error.message}`);
      return 0;
    }
  }

  /**
   * Navigate to URL
   * @param {string} url - URL to navigate
   */
  async navigateTo(url) {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle' });
      Logger.log(`Navigated to: ${url}`);
    } catch (error) {
      Logger.error(`Failed to navigate to ${url}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get current page URL
   * @returns {string} Current URL
   */
  getPageUrl() {
    return this.page.url();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    try {
      await this.page.waitForLoadState('networkidle');
      Logger.log('Navigation completed');
    } catch (error) {
      Logger.error(`Failed to wait for navigation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   * @returns {string} Screenshot path
   */
  async takeScreenshot(name) {
    return await ScreenshotUtil.captureScreenshot(this.page, name);
  }

  /**
   * Close page
   */
  async closePage() {
    try {
      await this.page.close();
      Logger.log('Page closed');
    } catch (error) {
      Logger.error(`Failed to close page: ${error.message}`);
      throw error;
    }
  }
}

module.exports = BasePage;
