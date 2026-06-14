// step-definitions/auth.steps.js
// Authentication Step Definitions

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const ConfigManager = require('../config/config');
const Logger = require('../utils/Logger');

Given('user is on the login page', async function() {
  try {
    const loginPage = new LoginPage(this.page);
    const isDisplayed = await loginPage.isLoginPageDisplayed();
    expect(isDisplayed).toBeTruthy();
    Logger.pass('User is on the login page');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user enters username {string} and password {string}', async function(username, password) {
  try {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(username, password);
    Logger.pass(`Logged in with username: ${username}`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user enters valid credentials', async function() {
  try {
    const credentials = ConfigManager.getCredentials();
    const loginPage = new LoginPage(this.page);
    await loginPage.login(credentials.username, credentials.password);
    Logger.pass('Logged in with valid credentials');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user clicks the login button', async function() {
  try {
    const loginPage = new LoginPage(this.page);
    await loginPage.click(loginPage.loginButton);
    await this.page.waitForLoadState('networkidle');
    Logger.pass('Clicked login button');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('user should be redirected to dashboard', async function() {
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

Then('user should see the dashboard title', async function() {
  try {
    const dashboardPage = new DashboardPage(this.page);
    const isDisplayed = await dashboardPage.isDashboardDisplayed();
    expect(isDisplayed).toBeTruthy();
    Logger.pass('Dashboard title is visible');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('user should see time at work widget', async function() {
  try {
    const dashboardPage = new DashboardPage(this.page);
    const isVisible = await dashboardPage.isTimeAtWorkWidgetVisible();
    expect(isVisible).toBeTruthy();
    Logger.pass('Time at work widget is visible');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('an error message should be displayed', async function() {
  try {
    const loginPage = new LoginPage(this.page);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length > 0).toBeTruthy();
    Logger.pass(`Error message displayed: ${errorMessage}`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user clicks forgot password link', async function() {
  try {
    const loginPage = new LoginPage(this.page);
    await loginPage.clickForgotPassword();
    Logger.pass('Clicked forgot password link');
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
