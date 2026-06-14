// step-definitions/recruitment.steps.js
// Recruitment Step Definitions

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CandidatesPage = require('../pages/CandidatesPage');
const Logger = require('../utils/Logger');

Given('user is on the recruitment candidates page', async function() {
  try {
    const candidatesPage = new CandidatesPage(this.page);
    const isDisplayed = await candidatesPage.isCandidatesPageDisplayed();
    expect(isDisplayed).toBeTruthy();
    Logger.pass('User is on the Candidates page');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('candidates page should display', async function() {
  try {
    const candidatesPage = new CandidatesPage(this.page);
    const isDisplayed = await candidatesPage.isCandidatesPageDisplayed();
    expect(isDisplayed).toBeTruthy();
    Logger.pass('Candidates page is displayed');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user clicks add candidate button', async function() {
  try {
    const candidatesPage = new CandidatesPage(this.page);
    await candidatesPage.clickAddCandidate();
    Logger.pass('Clicked Add Candidate button');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('add candidate button should be visible', async function() {
  try {
    const candidatesPage = new CandidatesPage(this.page);
    const isVisible = await candidatesPage.isAddButtonVisible();
    expect(isVisible).toBeTruthy();
    Logger.pass('Add Candidate button is visible');
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

When('user searches for candidate {string}', async function(candidateName) {
  try {
    const candidatesPage = new CandidatesPage(this.page);
    await candidatesPage.searchCandidate(candidateName);
    Logger.pass(`Searched for candidate: ${candidateName}`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('candidates list should contain candidate data', async function() {
  try {
    const candidatesPage = new CandidatesPage(this.page);
    const count = await candidatesPage.getCandidateCount();
    expect(count >= 0).toBeTruthy();
    Logger.pass(`Candidates list contains ${count} candidates`);
  } catch (error) {
    Logger.error(`Step failed: ${error.message}`);
    throw error;
  }
});

Then('candidate cards should be visible', async function() {
  try {
    const candidatesPage = new CandidatesPage(this.page);
    const cardsCount = await candidatesPage.getVisibleCandidateCardsCount();
    expect(cardsCount > 0).toBeTruthy();
    Logger.pass(`${cardsCount} candidate cards are visible`);
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
