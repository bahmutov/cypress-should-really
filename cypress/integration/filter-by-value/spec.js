/// <reference types="cypress" />

import { really, map, filter, its, isEqual } from '../../..'

it(
  'finds input elements with the current value "fox"',
  { viewportHeight: 200, viewportWidth: 200 },
  () => {
    cy.visit('cypress/integration/filter-by-value/index.html')
    // change one of the inputs by typing "fox" into it
    cy.get('#i2').type('fox')
    // NOTE: only the elements with the markup attribute "value" are returned
    cy.get('#inputs input[value=fox]').should('have.length', 1)

    // instead filter the elements by their current value
    cy.get('#inputs input').should(
      really(
        // [jQueryElement]
        map(its('value')), // [string]
        filter(isEqual('fox')), // filtered [string]
        'have.length',
        2,
      ),
    )
  },
)
