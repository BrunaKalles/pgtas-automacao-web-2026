 const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  retries: 1, // retries é utilizado para retestar um teste quando ele falha
  // retries: {
  //   openMode: 0,//iterativo, abre o navegdaor3
  //   runMode: 1, //headless 
  // },
  e2e: {
    baseUrl: `https://automationexercise.com`,
    //watchForFileChanges: false //monitora por mudanças e assim que tiver mudanças ele reexecuta os testes
   // viewportWidth: 375,
   // viewportHeight: 750,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
