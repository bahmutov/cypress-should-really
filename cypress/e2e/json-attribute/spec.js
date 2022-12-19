/// <reference types="cypress" />

import { really, invoke, its } from '../../..'

// implementation similar to "Json data attribute" recipe
// from https://glebbahmutov.com/cypress-examples

it('by attribute (explicit)', () => {
  cy.visit('cypress/e2e/json-attribute/index.html')
  // grab the element's attribute "data-field"
  // convert it into a JSON object
  // and grab its "age" property -> should be equal 10
  cy.get('#person').should(
    really(invoke('attr', 'data-field'), JSON.parse, its('age'), 'equal', 10),
  )
})
