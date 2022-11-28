/// <reference types="cypress" />
import { really, map, invoke, toDate } from '../../..'

describe(
  'count children elements',
  { viewportHeight: 300, viewportWidth: 300 },
  () => {
    // fails because the entire parent element is replaced
    it.skip('finds the children elements even if the entire element is replaced', () => {
      cy.visit('cypress/e2e/children/index.html')
      cy.get('[data-cy=parent]')
        .should('be.visible')
        .contains('[data-cy=first]', 'First')
        .should('be.visible')
    })

    it('retries until the parent element has two children', () => {
      cy.visit('cypress/e2e/children/index.html')
      // once we confirm the parent element has two children with data-cy attribute
      // we can continue
      cy.get('[data-cy=parent] [data-cy]').should('have.length', 2)
      cy.get('[data-cy=parent]')
        .contains('[data-cy=first]', 'First')
        .should('be.visible')
    })

    it('finds the children after wait', () => {
      cy.visit('cypress/e2e/children/index.html')
        // let the page update itself including the parent element
        .wait(2000)
      cy.get('[data-cy=parent]')
        .invoke('find', '[data-cy]')
        .should('have.length', 2)
    })

    it('really retries until the parent element has two children', () => {
      cy.visit('cypress/e2e/children/index.html')
      cy.get('[data-cy=parent]')
        .should(really(invoke('find', '[data-cy]'), 'have.length', 2))
        .contains('[data-cy=first]', 'First')
    })

    it('really finds a child element with text', () => {
      cy.visit('cypress/e2e/children/index.html')
      cy.get('[data-cy=parent]')
        // find the element with text "Second"
        // should exist
        .should(really(invoke('find', ':contains(Second)'), 'exist'))
        .contains('[data-cy=second]', 'Second')
    })

    it('really finds text inside', () => {
      cy.visit('cypress/e2e/children/index.html')
      cy.get('[data-cy=parent]')
        // take the text inside the element
        // find the word "Second"
        // should be true
        .should(really(invoke('text'), invoke('includes', 'Second'), 'be.true'))
        .contains('[data-cy=second]', 'Second')
    })
  },
)
