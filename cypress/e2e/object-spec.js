/// <reference types="cypress" />

import { really, its } from '../../src'

describe('Assertion helpers', () => {
  it('works with object props', () => {
    const p = {
      person: {
        name: 'Joe',
        age: 42,
      },
    }
    setTimeout(() => {
      p.person.age = 90
    }, 1000)
    cy.wrap(p).should(really(its('person.age'), 'equal', 90))
    // using custom ".map" child command
    // cy.wrap(p).map('person.age').should('eq', 90)
  })
})
