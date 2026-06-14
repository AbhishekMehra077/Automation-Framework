Feature: OrangeHRM Admin Module
  As an administrator
  I want to manage system users
  So that I can control user access to the application

  Background:
    Given user is on the login page
    When user enters valid credentials
    Then user should be redirected to dashboard
    When user navigates to "Admin" module

  @smoke @admin
  Scenario: Verify admin system users page displays
    Then admin system users page should display

  @admin
  Scenario: Verify add system user button is visible
    Then add system user button should be visible

  @admin
  Scenario: Verify system users table is visible
    Then system users table should be visible

  @admin
  Scenario: Verify system users list contains data
    Then system users list should contain user data

  @admin @regression
  Scenario: Click add system user button
    When user clicks add system user button
    Then page title should contain "Add"

  @admin @search
  Scenario: Search for specific system user
    When user searches for system user "Admin"
    Then page should contain "Admin"

  @admin
  Scenario: Verify admin page has correct URL
    Then current URL should contain "admin"
