// utils/ScreenshotUtil.js
// Screenshot Utility for Failure Capture

const fs = require('fs');
const path = require('path');

class ScreenshotUtil {
  static async captureScreenshot(page, screenshotName) {
    try {
      const screenshotDir = 'reports/screenshots';
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${screenshotName}_${timestamp}.png`;
      const filepath = path.join(screenshotDir, filename);

      await page.screenshot({ path: filepath, fullPage: true });
      
      console.log(`[SCREENSHOT] Saved: ${filepath}`);
      return filepath;
    } catch (error) {
      console.error(`[SCREENSHOT ERROR] Failed to capture screenshot: ${error.message}`);
      return null;
    }
  }

  static async captureScreenshotOnFailure(page, scenario) {
    try {
      const scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
      await this.captureScreenshot(page, `failure_${scenarioName}`);
    } catch (error) {
      console.error(`[SCREENSHOT ERROR] ${error.message}`);
    }
  }

  static async captureScreenshotOnSuccess(page, scenario) {
    try {
      const scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
      await this.captureScreenshot(page, `success_${scenarioName}`);
    } catch (error) {
      console.error(`[SCREENSHOT ERROR] ${error.message}`);
    }
  }

  static cleanupOldScreenshots(daysOld = 7) {
    const screenshotDir = 'reports/screenshots';
    const now = Date.now();
    const maxAge = daysOld * 24 * 60 * 60 * 1000;

    if (!fs.existsSync(screenshotDir)) return;

    fs.readdirSync(screenshotDir).forEach(file => {
      const filepath = path.join(screenshotDir, file);
      const stats = fs.statSync(filepath);
      
      if (now - stats.mtime.getTime() > maxAge) {
        fs.unlinkSync(filepath);
        console.log(`[CLEANUP] Deleted old screenshot: ${filepath}`);
      }
    });
  }
}

module.exports = ScreenshotUtil;
