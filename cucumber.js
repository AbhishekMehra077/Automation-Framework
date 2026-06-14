// cucumber.js
// Cucumber Configuration for BDD Framework

module.exports = {
  default: {
    require: ['hooks/**/*.js', 'step-definitions/**/*.js'],
    requireModule: [],
    format: [
      'progress-bar',
      'html:reports/html-reports/cucumber-report.html',
      'json:reports/html-reports/report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: 1,
    dryRun: false,
    failFast: false,
    strict: true,
    timeout: 60000,
    tags: process.env.TAGS || ''
  },

  auth: {
    require: ['hooks/**/*.js', 'step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/html-reports/auth-report.html'
    ],
    parallel: 1,
    paths: ['features/auth/**/*.feature']
  },

  pim: {
    require: ['hooks/**/*.js', 'step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/html-reports/pim-report.html'
    ],
    parallel: 1,
    paths: ['features/pim/**/*.feature']
  },

  recruitment: {
    require: ['hooks/**/*.js', 'step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/html-reports/recruitment-report.html'
    ],
    parallel: 1,
    paths: ['features/recruitment/**/*.feature']
  },

  admin: {
    require: ['hooks/**/*.js', 'step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/html-reports/admin-report.html'
    ],
    parallel: 1,
    paths: ['features/admin/**/*.feature']
  }
};
