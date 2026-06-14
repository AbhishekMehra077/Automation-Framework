Feature: OrangeHRM Recruitment Module
  As a recruiter
  I want to manage job candidates
  So that I can view and search candidate records

  Background:
    Given user is on the login page
    When user enters valid credentials
    Then user should be redirected to dashboard
    When user navigates to "Recruitment" module

  @smoke @recruitment
  Scenario: Verify candidates page displays
    Then candidates page should display

  @recruitment
  Scenario: Verify add candidate button is visible
    Then add candidate button should be visible

  @recruitment
  Scenario: Verify candidate list contains data
    Then candidates list should contain candidate data

  @recruitment @regression
  Scenario: Click add candidate button
    When user clicks add candidate button
    Then page title should contain "Add"

  @recruitment @candidates
  Scenario: Verify candidate cards are displayed
    Then candidate cards should be visible

  @recruitment @search
  Scenario: Search for specific candidate
    When user searches for candidate "Ricky"
    Then page should contain "Ricky"

  @recruitment
  Scenario: Verify candidates page has correct URL
    Then current URL should contain "recruitment"
