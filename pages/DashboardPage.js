// pages/DashboardPage.js
// Dashboard Page Object Model

const BasePage = require('./BasePage');
const Logger = require('../utils/Logger');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators (Private)
  get pageTitle() {
    return 'h6:has-text("Dashboard")';
  }

  get timeAtWorkWidget() {
    return 'text=Time at Work';
  }

  get punchOutStatus() {
    return 'text=Punched Out';
  }

  get upgradeButton() {
    return 'button:has-text("Upgrade")';
  }

  get profileButton() {
    return 'button:has(img[alt="profile picture"])';
  }

  // Sidebar Navigation Locators
  get adminModuleLink() {
    return 'a:has-text("Admin")';
  }

  get pimModuleLink() {
    return 'a:has-text("PIM")';
  }

  get leaveModuleLink() {
    return 'a:has-text("Leave")';
  }

  get timeModuleLink() {
    return 'a:has-text("Time")';
  }

  get recruitmentModuleLink() {
    return 'a:has-text("Recruitment")';
  }

  get myInfoLink() {
    return 'a:has-text("My Info")';
  }

  get performanceModuleLink() {
    return 'a:has-text("Performance")';
  }

  get directoryLink() {
    return 'a:has-text("Directory")';
  }

  get maintenanceLink() {
    return 'a:has-text("Maintenance")';
  }

  get claimModuleLink() {
    return 'a:has-text("Claim")';
  }

  get buzzLink() {
    return 'a:has-text("Buzz")';
  }

  // Business Actions

  /**
   * Verify dashboard is displayed
   * @returns {boolean} True if dashboard is visible
   */
  async isDashboardDisplayed() {
    try {
      const visible = await this.isVisible(this.pageTitle);
      if (visible) {
        Logger.pass('Dashboard is displayed');
      } else {
        Logger.warn('Dashboard is not displayed');
      }
      return visible;
    } catch (error) {
      Logger.error(`Failed to verify dashboard: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify time at work widget is visible
   * @returns {boolean} True if widget is visible
   */
  async isTimeAtWorkWidgetVisible() {
    try {
      const visible = await this.isVisible(this.timeAtWorkWidget);
      Logger.log(`Time at Work widget visible: ${visible}`);
      return visible;
    } catch (error) {
      Logger.error(`Failed to check time at work widget: ${error.message}`);
      return false;
    }
  }

  /**
   * Navigate to Admin module
   */
  async navigateToAdmin() {
    try {
      await this.click(this.adminModuleLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to Admin module');
    } catch (error) {
      Logger.error(`Failed to navigate to Admin: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to PIM module
   */
  async navigateToPIM() {
    try {
      await this.click(this.pimModuleLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to PIM module');
    } catch (error) {
      Logger.error(`Failed to navigate to PIM: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to Leave module
   */
  async navigateToLeave() {
    try {
      await this.click(this.leaveModuleLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to Leave module');
    } catch (error) {
      Logger.error(`Failed to navigate to Leave: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to Recruitment module
   */
  async navigateToRecruitment() {
    try {
      await this.click(this.recruitmentModuleLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to Recruitment module');
    } catch (error) {
      Logger.error(`Failed to navigate to Recruitment: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to Time module
   */
  async navigateToTime() {
    try {
      await this.click(this.timeModuleLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to Time module');
    } catch (error) {
      Logger.error(`Failed to navigate to Time: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to My Info
   */
  async navigateToMyInfo() {
    try {
      await this.click(this.myInfoLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to My Info');
    } catch (error) {
      Logger.error(`Failed to navigate to My Info: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to Performance module
   */
  async navigateToPerformance() {
    try {
      await this.click(this.performanceModuleLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to Performance module');
    } catch (error) {
      Logger.error(`Failed to navigate to Performance: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to Directory
   */
  async navigateToDirectory() {
    try {
      await this.click(this.directoryLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to Directory');
    } catch (error) {
      Logger.error(`Failed to navigate to Directory: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to Maintenance
   */
  async navigateToMaintenance() {
    try {
      await this.click(this.maintenanceLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to Maintenance');
    } catch (error) {
      Logger.error(`Failed to navigate to Maintenance: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to Claim module
   */
  async navigateToClaim() {
    try {
      await this.click(this.claimModuleLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to Claim module');
    } catch (error) {
      Logger.error(`Failed to navigate to Claim: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to Buzz
   */
  async navigateToBuzz() {
    try {
      await this.click(this.buzzLink);
      await this.waitForNavigation();
      Logger.pass('Navigated to Buzz');
    } catch (error) {
      Logger.error(`Failed to navigate to Buzz: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click profile button
   */
  async clickProfileButton() {
    try {
      await this.click(this.profileButton);
      Logger.log('Clicked profile button');
    } catch (error) {
      Logger.error(`Failed to click profile button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify module link is visible
   * @param {string} moduleName - Module name
   * @returns {boolean} True if module link is visible
   */
  async isModuleVisible(moduleName) {
    try {
      const locator = `a:has-text("${moduleName}")`;
      const visible = await this.isVisible(locator);
      Logger.log(`Module ${moduleName} visible: ${visible}`);
      return visible;
    } catch (error) {
      Logger.error(`Failed to check module visibility: ${error.message}`);
      return false;
    }
  }
}

module.exports = DashboardPage;
