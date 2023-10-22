// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@cypress-audit/lighthouse/commands';
import 'cypress-axe';
import "@cypress-audit/pa11y/commands";
import './commands'
import 'cypress-mochawesome-reporter/register';
import "cypress-audit/commands";


//import ‘cypress-audit/commands’;

// Alternatively you can use CommonJS syntax:
// require('./commands')
import addContext from 'mochawesome/addContext'

Cypress.on("test:after:run", (test, runnable) => {
    
    let videoName = Cypress.spec.name
    videoName = videoName.replace('/.js.*', '.js')
    const videoUrl = 'videos/' + videoName + '.mp4'

    addContext({ test }, videoUrl)
});


Cypress.on('uncaught:exception', (err, runnable) => {
    // prevents Cypress from failing the test whenever an page-owned error or dependency fails to load (like the JQuery error)
    return false
})

//import 'cypress-audit/commands';