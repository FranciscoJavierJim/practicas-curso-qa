const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'http://localhost:3000',
    video: true,  // asegura que se grabe video
    screenshotsFolder: 'cypress/screenshots', // carpeta de screenshots
    videosFolder: 'cypress/videos',           // carpeta de videos
    
    setupNodeEvents(on, config) {
      
      return config
    },
  },
})
