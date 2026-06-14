// pages/LoginPage.js
// Login Page Object Model

const BasePage = require('./BasePage');
const Logger = require('../utils/Logger');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators (Private)
  get usernameInput() {
    return 'input[name="username"]';
  }

  get passwordInput() {
    return 'input[name="password"]';
  }

  get loginButton() {
    return 'button[type="submit"]';
  }

  get forgotPasswordLink() {
    return 'text=Forgot your password?';
  }

  get errorMessage() {
    return 'div.oxd-alert-content--error >> text';
  }

  get pageTitle() {
    return 'h5:has-text("Login")';
  }

  // Business Actions

  /**
   * Login with username and password
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    try {
      Logger.log(`Attempting login with username: ${username}`);
      
      // Fill username
      await this.fill(this.usernameInput, username);
      
      // Fill password
      await this.fill(this.passwordInput, password);
      
      // Click login button
      await this.click(this.loginButton);
      
      // Wait for navigation to dashboard
      await this.page.waitForLoadState('networkidle');
      
      Logger.pass(`Successfully logged in with username: ${username}`);
    } catch (error) {
      Logger.error(`Login failed: ${error.message}`);
      await this.takeScreenshot('login_failure');
      throw error;
    }
  }

  /**
   * Verify login page is displayed
   * @returns {boolean} True if login page is visible
   */
  async isLoginPageDisplayed() {
    try {
      const visible = await this.isVisible(this.pageTitle);
      if (visible) {
        Logger.pass('Login page is displayed');
      } else {
        Logger.warn('Login page is not displayed');
      }
      return visible;
    } catch (error) {
      Logger.error(`Failed to verify login page: ${error.message}`);
      return false;
    }
  }

  /**
   * Get error message if login fails
   * @returns {string} Error message
   */
  async getErrorMessage() {
    try {
      const message = await this.getText(this.errorMessage);
      Logger.log(`Error message: ${message}`);
      return message;
    } catch (error) {
      Logger.warn(`No error message found: ${error.message}`);
      return '';
    }
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword() {
    try {
      await this.click(this.forgotPasswordLink);
      Logger.log('Clicked forgot password link');
    } catch (error) {
      Logger.error(`Failed to click forgot password: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify login button is enabled
   * @returns {boolean} True if button is enabled
   */
  async isLoginButtonEnabled() {
    try {
      const enabled = await this.isEnabled(this.loginButton);
      Logger.log(`Login button enabled: ${enabled}`);
      return enabled;
    } catch (error) {
      Logger.error(`Failed to check login button state: ${error.message}`);
      return false;
    }
  }
}

module.exports = LoginPage;
