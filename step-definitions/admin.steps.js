// step-definitions/admin.steps.js
// Admin Step Definitions

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AdminSystemUsersPage = require('../pages/AdminSystemUsersPage');
const Logger = require('../utils/Logger');

Given('user is on the admin system users page', async function() {
  try {
    const adminPage = new AdminSystemUsersPage(this.page);
    const isDisplayed = await adminPage.isAdminPageDisplayed();
    expect(isDisplayed).toBeTruthy();
    Logger.pass('User is on the Admin System Users page');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('admin system users page should display', async function() {
  try {
    const adminPage = new AdminSystemUsersPage(this.page);
    const isDisplayed = await adminPage.isAdminPageDisplayed();
    expect(isDisplayed).toBeTruthy();
    Logger.pass('Admin System Users page is displayed');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user clicks add system user button', async function() {
  try {
    const adminPage = new AdminSystemUsersPage(this.page);
    await adminPage.clickAddUser();
    Logger.pass('Clicked Add System User button');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('add system user button should be visible', async function() {
  try {
    const adminPage = new AdminSystemUsersPage(this.page);
    const isVisible = await adminPage.isAddButtonVisible();
    expect(isVisible).toBeTruthy();
    Logger.pass('Add System User button is visible');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user searches for system user {string}', async function(username) {
  try {
    const adminPage = new AdminSystemUsersPage(this.page);
    await adminPage.searchUser(username);
    Logger.pass(`Searched for system user: ${username}`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('system users list should contain user data', async function() {
  try {
    const adminPage = new AdminSystemUsersPage(this.page);
    const count = await adminPage.getUserCount();
    expect(count > 0).toBeTruthy();
    Logger.pass(`System users list contains ${count} users`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('system users table should be visible', async function() {
  try {
    const adminPage = new AdminSystemUsersPage(this.page);
    const rowCount = await adminPage.getTableRowCount();
    Logger.pass(`System users table has ${rowCount} visible rows`);
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
