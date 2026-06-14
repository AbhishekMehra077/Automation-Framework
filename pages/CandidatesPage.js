// pages/CandidatesPage.js
// Recruitment Candidates Page Object Model

const BasePage = require('./BasePage');
const Logger = require('../utils/Logger');

class CandidatesPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators (Private)
  get pageTitle() {
    return 'h6:has-text("Recruitment")';
  }

  get candidatesHeading() {
    return 'h5:has-text("Candidates")';
  }

  get addButton() {
    return 'button:has-text("Add")';
  }

  get candidateCards() {
    return 'div.orangehrm-candidate-card';
  }

  get candidateGridContainer() {
    return 'div[class*="grid"]';
  }

  get searchBox() {
    return 'input[placeholder*="Search"]';
  }

  get recordsCountText() {
    return 'text=/\\(\\d+\\) Records Found/';
  }

  get noRecordsMessage() {
    return 'text=No Records Found';
  }

  // Business Actions

  /**
   * Verify candidates page is displayed
   * @returns {boolean} True if page is visible
   */
  async isCandidatesPageDisplayed() {
    try {
      const visible = await this.isVisible(this.pageTitle);
      if (visible) {
        Logger.pass('Candidates page is displayed');
      }
      return visible;
    } catch (error) {
      Logger.error(`Failed to verify candidates page: ${error.message}`);
      return false;
    }
  }

  /**
   * Click add candidate button
   */
  async clickAddCandidate() {
    try {
      await this.click(this.addButton);
      await this.waitForNavigation();
      Logger.pass('Clicked Add Candidate button');
    } catch (error) {
      Logger.error(`Failed to click Add Candidate button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get candidate count from records text
   * @returns {number} Number of candidates
   */
  async getCandidateCount() {
    try {
      const countText = await this.getText(this.recordsCountText);
      const match = countText.match(/\((\d+)\)/);
      const count = match ? parseInt(match[1]) : 0;
      Logger.log(`Candidate count: ${count}`);
      return count;
    } catch (error) {
      Logger.warn(`Could not extract candidate count: ${error.message}`);
      return 0;
    }
  }

  /**
   * Verify add button is visible
   * @returns {boolean} True if add button is visible
   */
  async isAddButtonVisible() {
    try {
      const visible = await this.isVisible(this.addButton);
      Logger.log(`Add button visible: ${visible}`);
      return visible;
    } catch (error) {
      Logger.error(`Failed to check add button visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Search for candidate
   * @param {string} searchTerm - Candidate name to search
   */
  async searchCandidate(searchTerm) {
    try {
      await this.fill(this.searchBox, searchTerm);
      await this.page.waitForTimeout(1500); // Wait for search results
      Logger.log(`Searched for candidate: ${searchTerm}`);
    } catch (error) {
      Logger.error(`Failed to search for candidate: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get visible candidate cards count
   * @returns {number} Number of visible candidate cards
   */
  async getVisibleCandidateCardsCount() {
    try {
      const count = await this.getElementCount(this.candidateCards);
      Logger.log(`Visible candidate cards: ${count}`);
      return count;
    } catch (error) {
      Logger.error(`Failed to get candidate cards count: ${error.message}`);
      return 0;
    }
  }

  /**
   * Verify no records message
   * @returns {boolean} True if no records found message is visible
   */
  async isNoRecordsMessageVisible() {
    try {
      const visible = await this.isVisible(this.noRecordsMessage);
      Logger.log(`No records message visible: ${visible}`);
      return visible;
    } catch (error) {
      Logger.error(`Failed to check no records message: ${error.message}`);
      return false;
    }
  }

  /**
   * Click first candidate card
   */
  async clickFirstCandidate() {
    try {
      await this.click(this.candidateCards);
      await this.waitForNavigation();
      Logger.pass('Clicked first candidate');
    } catch (error) {
      Logger.error(`Failed to click first candidate: ${error.message}`);
      throw error;
    }
  }

  /**
   * Clear search box
   */
  async clearSearch() {
    try {
      await this.page.locator(this.searchBox).clear();
      Logger.log('Cleared search box');
    } catch (error) {
      Logger.error(`Failed to clear search: ${error.message}`);
      throw error;
    }
  }
}

module.exports = CandidatesPage;
