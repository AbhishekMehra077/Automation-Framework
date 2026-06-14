Feature: OrangeHRM Navigation
  As a user
  I want to navigate between different modules
  So that I can access various features of the application

  Background:
    Given user is on the login page
    When user enters valid credentials
    Then user should be redirected to dashboard

  @smoke @navigation
  Scenario: Navigate to PIM module
    When user navigates to "PIM" module
    Then employee list page should display

  @navigation
  Scenario: Navigate to Admin module
    When user navigates to "Admin" module
    Then admin system users page should display

  @navigation
  Scenario: Navigate to Recruitment module
    When user navigates to "Recruitment" module
    Then candidates page should display

  @navigation
  Scenario: Navigate to Leave module
    When user navigates to "Leave" module
    Then page should contain "Leave"

  @navigation
  Scenario: Verify all modules are visible in sidebar
    When user is on the dashboard
    Then sidebar should display all available modules

  @navigation
  Scenario: Navigate to My Info module
    When user navigates to "My Info" module
    Then page should contain "Personal Details"

  @navigation
  Scenario: Navigate to Performance module
    When user navigates to "Performance" module
    Then page should contain "Performance"
