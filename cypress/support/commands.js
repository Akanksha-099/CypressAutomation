// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('handleCookieBanner', (cookie = 'OptanonAlertBoxClosed') => {
    // cy.getCookie(cookie).then(cook => {
    //   if (!cook) {
    //     cy.log('Cookie does not exists, accepting all')
    //     cy.get('#onetrust-accept-btn-handler').click()
    //   }
    // })
    // cy.wait(2000)
    /** This is a temporary fix */
    cy.setCookie('OptanonAlertBoxClosed', '2030-03-31T10:33:16.279Z')
    cy.get('button#onetrust-accept-btn-handler').click()
  })
  
  /** isLeftOf and isRightOf can be used to check relative horizontal position of 
   * left most position of elements
  */
  
  Cypress.Commands.add('isLeftOf',{prevSubject: true}, (subject, element2)=>{
    cy.get(subject)
    .then($el => $el.offset().left)  // get 1st left value
    .then(left1 => {
      cy.get(element2)
        .then($el => $el.offset().left)  // get 2nd left value
        .then(left2 => {
          expect(left1).to.be.lt(left2)
        })
    })
  })
  
  Cypress.Commands.add('isRightOf',{prevSubject: true}, (subject, element2)=>{
    cy.get(subject)
    .then($el => $el.offset().left)  // get 1st left value
    .then(left1 => {
      cy.get(element2)
        .then($el => $el.offset().left)  // get 2nd left value
        .then(left2 => {
          expect(left1).to.be.gt(left2)
        })
    })
  })
  
  /** isAbove and isBelow can be used to check relative vertical position of 
   * top most position of elements
  */
  
  Cypress.Commands.add('isAbove',{prevSubject: true}, (subject, element2)=>{
    cy.get(subject)
    .then($el => $el.offset().top)  // get 1st top value
    .then(top1 => {
      cy.get(element2)
        .then($el => $el.offset().top)  // get 2nd top value
        .then(top2 => {
          expect(top1).to.be.lte(top2)
        })
    })
  })
  
  Cypress.Commands.add('isBelow',{prevSubject: true}, (subject, element2)=>{
    cy.get(subject)
    .then($el => $el.offset().top)  // get 1st top value
    .then(top1 => {
      cy.get(element2)
        .then($el => $el.offset().top)  // get 2nd top value
        .then(top2 => {
          expect(top1).to.be.gt(top2)
        })
    })
  })
  
  Cypress.Commands.add('isWithin',{prevSubject: true}, (subject, element2)=>{
    cy.get(subject)
    .then($el1 => {
      cy.get(element2)
      .then($el2 => {
        expect($el1.offset().top).to.be.gte($el2.offset().top)
        expect($el1.offset().left).to.be.gte($el2.offset().left)
        expect($el1.offset().top + $el1.innerHeight()).to.be.lte($el2.offset().top + $el2.innerHeight())
        expect($el1.offset().left + $el1.innerWidth()).to.be.lte($el2.offset().left + $el2.innerWidth())
      })
    })  
  })
  
  Cypress.Commands.add('isEdgeToEdge',{prevSubject: true}, (subject)=>{
    cy.get(subject)
    .then($el1 => {
        expect($el1.offset().left + $el1.innerWidth()).to.be.approximately(Cypress.config("viewportWidth"), (0.1*Cypress.config("viewportWidth")))
    })  
  })
  
  Cypress.Commands.add('isCentrallyAlignedOnScreen',{prevSubject: true}, (subject)=>{
    cy.get(subject)
    .then($el1 => {
        expect($el1.offset().left).to.be.approximately(Cypress.config("viewportWidth")-($el1.offset().left+$el1.innerWidth()),(0.05*Cypress.config("viewportWidth")))
    })  
  })
  
  Cypress.Commands.add('isLeftAlignedOnScreen',{prevSubject: true}, (subject)=>{
    cy.get(subject)
    .then($el1 => {
        expect($el1.offset().left).to.be.lt(Cypress.config("viewportWidth")-($el1.offset().left+$el1.innerWidth()))
    })  
  })
  
  
  Cypress.Commands.add('isRightAlignedOnScreen',{prevSubject: true}, (subject)=>{
    cy.get(subject)
    .then($el1 => {
        expect($el1.offset().left).to.be.gt(Cypress.config("viewportWidth")-($el1.offset().left+$el1.innerWidth()))
    })  
  })
  
  Cypress.Commands.add('isHorizontallyAlignedTo',{prevSubject: true}, (subject, element2)=>{
    cy.get(subject)
    .then($el1 => {
      cy.get(element2)
      .then($el2 => {
        expect($el1.offset().left).to.be.eq($el2.offset().left)
      })
    })  
  })
  
  Cypress.Commands.add('isVerticallyAlignedTo',{prevSubject: true}, (subject, element2)=>{
    cy.get(subject)
    .then($el1 => {
      cy.get(element2)
      .then($el2 => {
        expect($el1.offset().top).to.be.eq($el2.offset().top)
      })
    })  
  })
  
  
  
  Cypress.Commands.add('actionCookieBanner', (cookie = 'OptanonAlertBoxClosed') => {
    cy.getCookie(cookie).then(cook => {
      if (!cook) {
        cy.log('Cookie does not exists, accepting all')
        cy.get('#onetrust-accept-btn-handler').click()
      }
    })
    cy.wait(2000)
    // cy.setCookie('OptanonAlertBoxClosed', '2022-03-31T10:33:16.279Z')
  })

  const severityIndicators = {
    minor:    '⚪️',
    moderate: '🟡',
    serious:  '🟠',
    critical: '🔴',
  }
  
  function callback(violations) {
    violations.forEach(violation => {
      const nodes = Cypress.$(violation.nodes.map(node => node.target).join(','))
  
      Cypress.log({
        name: `${severityIndicators[violation.impact]} A11Y`,
        consoleProps: () => violation,
        $el: nodes,
        message: `[${violation.help}](${violation.helpUrl})`
      })
  
      violation.nodes.forEach(({ target }) => {
        Cypress.log({
          name: '🔧',
          consoleProps: () => violation,
          $el: Cypress.$(target.join(',')),
          message: target
        })
      })
    });
  }
  
  Cypress.Commands.add("checkPageA11y", (path) => {
    cy.visit(path);
    cy.injectAxe();
    cy.checkA11y(null, null, callback);
  })
  const indicators = {
    critical: '🟥',
    serious:  '🟧', 
    moderate: '🟨',
    minor:    '🟩', 
}

function logViolations(violations) {
    terminalLog(violations)
    violations.forEach(violation => {
        const nodes = Cypress.$(violation.nodes.map(node => node.target).join(','))
        let log = {
            name: `[${indicators[violation.impact]} ${violation.impact.toUpperCase()}]`,
            consoleProps: () => violation,
            $el: nodes,
            message: `[${violation.help}](${violation.helpUrl})`

        }
        Cypress.log(log)
        violation.nodes.forEach(({ target }) => {
            Cypress.log({
                name: '-🩸FIXME',
                consoleProps: ()=> violation,
                $el: Cypress.$(target.join(',')),
                message: target
            })

        })
    });
}

const terminalLog = (violations) => {
    cy.task(
      'log',
      `\n${'TEST RESULTS'}
      \n${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected\n`
    )
    
    cy.log('log', violations)
    const violationData = violations.map(
      ({ id, impact, description, nodes, help, helpUrl}) => ({
        QUANTITY: nodes.length,
        IMPACT: `${indicators[impact]} ${impact.toUpperCase()}`,
        RULE_ID:id,
        DESCRIPTION: help,
      })
    )

    cy.task('table', violationData)
  }


Cypress.Commands.add('testAccessibility', (path) => {
   // cy.visit(path)
    cy.injectAxe()
    cy.checkA11y(
        null,
        {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa'],
          },
        },
        logViolations,
      );
})
  
Cypress.Commands.add('checkA11yCustom', (context, options, violationCallback, skipFailures) => {
  cy.window({ log: false }).then(win => {
    if (isEmptyObjectorNull(context)) context = undefined;
    if (isEmptyObjectorNull(options)) options = undefined;
    if (isEmptyObjectorNull(violationCallback)) violationCallback = undefined;
    if (isEmptyObjectorNull(skipFailures)) skipFailures = false;
    return win.axe.run(context ? context = context : context = win.document, options);
  }).then(({ violations }) => {
    // Log the violations
    if (!skipFailures) {
      Cypress.log({
        name: 'a11y violation summary',
        message: violations.length + " accessibility violation" + (violations.length === 1 ? '' : 's') + " " + (violations.length === 1 ? 'was' : 'were') + " detected",
      });
    }
    
    // Handle violations as needed
    if (violations.length) {
      // You can perform custom actions with the violations here
      if (violationCallback) violationCallback(violations);
    }
    
    // Continue processing violations as desired
    return cy.wrap(violations, { log: false });
  });
});

// Define the 'checkA11y' alias for the custom command
Cypress.Commands.add('checkA11y', (context, options, violationCallback, skipFailures) => {
  // Use the custom 'checkA11yCustom' command
  cy.checkA11yCustom(context, options, violationCallback, skipFailures);
});

// Rest of your Cypress commands
function isEmptyObjectorNull(value) {
  if (value == null) return true;
  return Object.entries(value).length === 0 && value.constructor === Object;
}
  export {}
  
  