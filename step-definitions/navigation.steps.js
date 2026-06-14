// step-definitions/navigation.steps.js
// Navigation Step Definitions

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DashboardPage = require('../pages/DashboardPage');
const Logger = require('../utils/Logger');

When('user navigates to {string} module', async function(moduleName) {
  try {
    const dashboardPage = new DashboardPage(this.page);
    
    const navigationMap = {
      'Admin': dashboardPage.navigateToAdmin,
      'PIM': dashboardPage.navigateToPIM,
      'Leave': dashboardPage.navigateToLeave,
      'Recruitment': dashboardPage.navigateToRecruitment,
      'Time': dashboardPage.navigateToTime,
      'My Info': dashboardPage.navigateToMyInfo,
      'Performance': dashboardPage.navigateToPerformance,
      'Directory': dashboardPage.navigateToDirectory,
      'Maintenance': dashboardPage.navigateToMaintenance,
      'Claim': dashboardPage.navigateToClaim,
      'Buzz': dashboardPage.navigateToBuzz
    };
    
    const navigationMethod = navigationMap[moduleName];
    if (navigationMethod) {
      await navigationMethod.call(dashboardPage);
      Logger.pass(`Navigated to ${moduleName} module`);
    } else {
      throw new Error(`Module "${moduleName}" not found`);
    }
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('user should see the {string} module', async function(moduleName) {
  try {
    const dashboardPage = new DashboardPage(this.page);
    const isVisible = await dashboardPage.isModuleVisible(moduleName);
    expect(isVisible).toBeTruthy();
    Logger.pass(`${moduleName} module is visible`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user is on the dashboard', async function() {
  try {
    const dashboardPage = new DashboardPage(this.page);
    const isDisplayed = await dashboardPage.isDashboardDisplayed();
    expect(isDisplayed).toBeTruthy();
    Logger.pass('User is on the dashboard');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('sidebar should display all available modules', async function() {
  try {
    const dashboardPage = new DashboardPage(this.page);
    
    const modules = [
      'Admin', 'PIM', 'Leave', 'Time', 'Recruitment',
      'My Info', 'Performance', 'Directory', 'Maintenance', 'Claim', 'Buzz'
    ];
    
    for (const module of modules) {
      const isVisible = await dashboardPage.isModuleVisible(module);
      if (!isVisible) {
        throw new Error(`Module "${module}" is not visible`);
      }
    }
    
    Logger.pass('All modules are visible in sidebar');
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
