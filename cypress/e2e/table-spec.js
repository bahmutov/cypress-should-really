/// <reference types="cypress" />

// @ts-ignore
import { really, map, invoke, toDate } from '../..'
chai.use(require('chai-sorted'))

describe('Assertion helpers', () => {
  beforeEach(() => {
    cy.visit('/cypress/e2e/table')
    cy.get('#numrows').select('100')
    // check if the table fits into one page
    cy.get('.pagecontroller-num').should('have.length', 1)
  })

  it('map elements', () => {
    // sort by clicking the header column
    cy.contains('.sorterHeader', 'Points').click()
    cy.get('tbody td + td + td + td + td').should(
      really(map('innerText'), map(parseFloat), 'be.ascending'),
    )
  })

  it('map by date', () => {
    cy.contains('.sorterHeader', 'Date').click()

    // just to see what the steps produce
    // cy.get('tbody td:nth-child(4)')
    //   .then(map('innerText'))
    //   .then(map(toDate))
    //   .then(invoke('getTime'))
    //   .then(cy.log)

    cy.get('tbody td:nth-child(4)').should(
      really(map('innerText'), map(toDate), invoke('getTime'), 'be.ascending'),
    )
  })
})
