Feature: OrangeHRM PIM (Personnel Information Management) Module
  As a user
  I want to manage employee information
  So that I can view and search employee records

  Background:
    Given user is on the login page
    When user enters valid credentials
    Then user should be redirected to dashboard
    When user navigates to "PIM" module

  @smoke @pim
  Scenario: Verify employee list page displays
    Then employee list page should display

  @pim
  Scenario: Verify add employee button is visible
    Then add employee button should be visible

  @pim
  Scenario: Verify search functionality is available
    Then search box should be available

  @pim
  Scenario: Verify employee list contains data
    Then employee list should contain employee data

  @pim @regression
  Scenario: Click add employee button
    When user clicks add employee button
    Then page title should contain "Add"

  @pim @search
  Scenario: Search for specific employee
    When user searches for employee "Chris"
    Then page should contain "Chris"

  @pim
  Scenario: Verify employee list page title
    Then page should contain "Employee Information"
