// pages/AdminSystemUsersPage.js
// Admin System Users Page Object Model

const BasePage = require('./BasePage');
const Logger = require('../utils/Logger');

class AdminSystemUsersPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators (Private)
  get pageTitle() {
    return 'h6:has-text("Admin")';
  }

  get systemUsersHeading() {
    return 'h5:has-text("System Users")';
  }

  get addButton() {
    return 'button:has-text("Add")';
  }

  get searchBox() {
    return 'input[placeholder*="Search"]';
  }

  get usersTable() {
    return 'table';
  }

  get tableRows() {
    return 'tbody tr';
  }

  get recordsCountText() {
    return 'text=/\\(\\d+\\) Records Found/';
  }

  get noRecordsMessage() {
    return 'text=No Records Found';
  }

  // Business Actions

  /**
   * Verify admin system users page is displayed
   * @returns {boolean} True if page is visible
   */
  async isAdminPageDisplayed() {
    try {
      const visible = await this.isVisible(this.pageTitle);
      if (visible) {
        Logger.pass('Admin System Users page is displayed');
      }
      return visible;
    } catch (error) {
      Logger.error(`Failed to verify admin page: ${error.message}`);
      return false;
    }
  }

  /**
   * Click add system user button
   */
  async clickAddUser() {
    try {
      await this.click(this.addButton);
      await this.waitForNavigation();
      Logger.pass('Clicked Add System User button');
    } catch (error) {
      Logger.error(`Failed to click Add System User button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Search for system user
   * @param {string} searchTerm - Username to search
   */
  async searchUser(searchTerm) {
    try {
      await this.fill(this.searchBox, searchTerm);
      await this.page.waitForTimeout(1500); // Wait for search results
      Logger.log(`Searched for user: ${searchTerm}`);
    } catch (error) {
      Logger.error(`Failed to search for user: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify add button is visible
   * @returns {boolean} True if add button is visible
   */
  async isAddButtonVisible() {
    try {
      const visible = await this.isVisible(this.addButton);
      Logger.log(`Add button visible: ${visible}`);
      return visible;
    } catch (error) {
      Logger.error(`Failed to check add button visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get system users count from records text
   * @returns {number} Number of system users
   */
  async getUserCount() {
    try {
      const countText = await this.getText(this.recordsCountText);
      const match = countText.match(/\((\d+)\)/);
      const count = match ? parseInt(match[1]) : 0;
      Logger.log(`System users count: ${count}`);
      return count;
    } catch (error) {
      Logger.warn(`Could not extract user count: ${error.message}`);
      return 0;
    }
  }

  /**
   * Get table row count
   * @returns {number} Number of visible rows
   */
  async getTableRowCount() {
    try {
      const count = await this.getElementCount(this.tableRows);
      Logger.log(`Table row count: ${count}`);
      return count;
    } catch (error) {
      Logger.error(`Failed to get table row count: ${error.message}`);
      return 0;
    }
  }

  /**
   * Verify no records message
   * @returns {boolean} True if no records found message is visible
   */
  async isNoRecordsMessageVisible() {
    try {
      const visible = await this.isVisible(this.noRecordsMessage);
      Logger.log(`No records message visible: ${visible}`);
      return visible;
    } catch (error) {
      Logger.error(`Failed to check no records message: ${error.message}`);
      return false;
    }
  }

  /**
   * Clear search box
   */
  async clearSearch() {
    try {
      await this.page.locator(this.searchBox).clear();
      Logger.log('Cleared search box');
    } catch (error) {
      Logger.error(`Failed to clear search: ${error.message}`);
      throw error;
    }
  }
}

module.exports = AdminSystemUsersPage;
