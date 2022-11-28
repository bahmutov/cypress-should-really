/// <reference types="cypress" />

// normally you would import from "cypress-should-really"
import { really, map, its, filter, isEqual } from '../../..'

// find the explanation in the video
// "Filter Input Elements By Value Using cypress-should-really Plugin"
// https://youtu.be/Gxoo6uZMo9I

it(
  'finds input elements with the current value "fox"',
  { viewportHeight: 200, viewportWidth: 200 },
  () => {
    cy.visit('cypress/e2e/filter-by-value/index.html')
    // change one of the inputs by typing "fox" into it
    cy.get('#i2').type('fox')
    // NOTE: only the elements with the markup attribute "value" are returned
    cy.get('#inputs input[value=fox]').should('have.length', 1)

    // instead filter the elements by their current value
    // first approach: use separate commands
    // not ideal, since only the cy.filter is retried
    // which loses the Cypress retry-ability
    // https://on.cypress.io/retry-ability
    cy.get('#inputs input')
      .filter((k, el) => {
        return el.value === 'fox'
      })
      // finds both input elements with the value "fox"
      .should('have.length', 2)

    // second approach: build up and use
    // a single custom "should(callback)"
    cy.get('#inputs input').should(
      // [jqueryElement]
      really(
        map(its('value')), // [string]
        filter(isEqual('fox')),
        'have.length',
        2,
      ),
    )
  },
)
