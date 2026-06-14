// pages/EmployeeListPage.js
// PIM Employee List Page Object Model

const BasePage = require('./BasePage');
const Logger = require('../utils/Logger');

class EmployeeListPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators (Private)
  get pageTitle() {
    return 'h6:has-text("PIM")';
  }

  get employeeListHeading() {
    return 'h5:has-text("Employee Information")';
  }

  get addButton() {
    return 'button:has-text("Add")';
  }

  get searchBox() {
    return 'input[placeholder*="Search"]';
  }

  get employeeTable() {
    return 'table';
  }

  get tableRows() {
    return 'tbody tr';
  }

  get noRecordsMessage() {
    return 'text=No Records Found';
  }

  get recordsCountText() {
    return 'text=/\\(\\d+\\) Records Found/';
  }

  // Business Actions

  /**
   * Verify employee list page is displayed
   * @returns {boolean} True if page is visible
   */
  async isEmployeeListDisplayed() {
    try {
      const visible = await this.isVisible(this.pageTitle);
      if (visible) {
        Logger.pass('Employee List page is displayed');
      }
      return visible;
    } catch (error) {
      Logger.error(`Failed to verify employee list page: ${error.message}`);
      return false;
    }
  }

  /**
   * Click add employee button
   */
  async clickAddEmployee() {
    try {
      await this.click(this.addButton);
      await this.waitForNavigation();
      Logger.pass('Clicked Add Employee button');
    } catch (error) {
      Logger.error(`Failed to click Add Employee button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Search for employee
   * @param {string} searchTerm - Employee name to search
   */
  async searchEmployee(searchTerm) {
    try {
      await this.click(this.searchBox);
      await this.fill(this.searchBox, searchTerm);
      await this.page.waitForTimeout(1500); // Wait for search results
      Logger.log(`Searched for employee: ${searchTerm}`);
    } catch (error) {
      Logger.error(`Failed to search for employee: ${error.message}`);
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
   * Get employee count from records text
   * @returns {number} Number of employees
   */
  async getEmployeeCount() {
    try {
      const countText = await this.getText(this.recordsCountText);
      const match = countText.match(/\((\d+)\)/);
      const count = match ? parseInt(match[1]) : 0;
      Logger.log(`Employee count: ${count}`);
      return count;
    } catch (error) {
      Logger.warn(`Could not extract employee count: ${error.message}`);
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
}

module.exports = EmployeeListPage;
