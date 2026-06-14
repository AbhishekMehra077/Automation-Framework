// utils/Logger.js
// Logging Utility for Framework

class Logger {
  static log(message) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  static info(message) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  static error(message) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  }

  static warn(message) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  }

  static debug(message) {
    console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
  }

  static pass(message) {
    console.log(`[PASS] ${new Date().toISOString()} - ✓ ${message}`);
  }

  static fail(message) {
    console.error(`[FAIL] ${new Date().toISOString()} - ✗ ${message}`);
  }

  static section(title) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`[${new Date().toISOString()}] ${title}`);
    console.log(`${'='.repeat(80)}\n`);
  }
}

module.exports = Logger;
