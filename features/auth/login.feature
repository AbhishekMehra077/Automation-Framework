Feature: OrangeHRM Login Functionality
  As a user
  I want to login to OrangeHRM application
  So that I can access the dashboard and other modules

  Background:
    Given user is on the login page

  @smoke @regression
  Scenario: Successful login with valid credentials
    When user enters valid credentials
    Then user should be redirected to dashboard
    And user should see the dashboard title

  @smoke
  Scenario: Login and verify dashboard widgets
    When user enters username "Admin" and password "admin123"
    Then user should be redirected to dashboard
    And user should see time at work widget

  @regression
  Scenario: Verify login button is enabled
    Then login button should be enabled

  @negative
  Scenario: Verify error message on invalid login
    When user enters username "InvalidUser" and password "WrongPassword"
    And user clicks the login button
    Then an error message should be displayed

  @login @forgot-password
  Scenario: Verify forgot password link is accessible
    When user clicks forgot password link
    Then page title should contain "Forgot"
