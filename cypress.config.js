const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dev.salty-sails.etondigital.com',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    experimentalSessionAndOrigin: true,
    // experimentalStudio: true,

    setupNodeEvents(on , config){
      //implement node event lisener here
    },
  },
});