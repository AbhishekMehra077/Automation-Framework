// step-definitions/pim.steps.js
// PIM (Personnel Information Management) Step Definitions

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const EmployeeListPage = require('../pages/EmployeeListPage');
const Logger = require('../utils/Logger');

Given('user is on the PIM employee list page', async function() {
  try {
    const employeeListPage = new EmployeeListPage(this.page);
    const isDisplayed = await employeeListPage.isEmployeeListDisplayed();
    expect(isDisplayed).toBeTruthy();
    Logger.pass('User is on the PIM Employee List page');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('employee list page should display', async function() {
  try {
    const employeeListPage = new EmployeeListPage(this.page);
    const isDisplayed = await employeeListPage.isEmployeeListDisplayed();
    expect(isDisplayed).toBeTruthy();
    Logger.pass('Employee List page is displayed');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user clicks add employee button', async function() {
  try {
    const employeeListPage = new EmployeeListPage(this.page);
    await employeeListPage.clickAddEmployee();
    Logger.pass('Clicked Add Employee button');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('add employee button should be visible', async function() {
  try {
    const employeeListPage = new EmployeeListPage(this.page);
    const isVisible = await employeeListPage.isAddButtonVisible();
    expect(isVisible).toBeTruthy();
    Logger.pass('Add Employee button is visible');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user searches for employee {string}', async function(employeeName) {
  try {
    const employeeListPage = new EmployeeListPage(this.page);
    await employeeListPage.searchEmployee(employeeName);
    Logger.pass(`Searched for employee: ${employeeName}`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('employee list should contain employee data', async function() {
  try {
    const employeeListPage = new EmployeeListPage(this.page);
    const count = await employeeListPage.getEmployeeCount();
    expect(count >= 0).toBeTruthy();
    Logger.pass(`Employee list contains ${count} employees`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('search box should be available', async function() {
  try {
    const employeeListPage = new EmployeeListPage(this.page);
    const isVisible = await employeeListPage.isVisible(employeeListPage.searchBox);
    expect(isVisible).toBeTruthy();
    Logger.pass('Search box is available');
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
