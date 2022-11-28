const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  viewportHeight: 1100,
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
    specPattern: 'cypress/e2e/**/*spec.js',
  },
})
