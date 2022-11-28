/// <reference types="cypress" />

import { tap, really, its } from '../../src'

describe('tap', () => {
  it('calls the given function', () => {
    const stub = cy.stub().returns(2)
    cy.wrap(1)
      .then(tap(stub))
      .should('equal', 1)
      .then(() => {
        expect(stub).to.be.calledOnceWith(1)
      })
  })

  it('helps during debugging', () => {
    const stub = cy.stub(console, 'log')
    const o = {
      name: 'Joe',
    }
    cy.wrap(o)
      .should(really(its('name'), tap(console.log), 'equal', 'Mary'))
      .then(() => {
        expect(stub).to.be.calledWith('Joe') // was called multiple times
        expect(stub).to.be.calledWith('Mary') // was called just once before the test passes
      })
    // change the name to Mary after some time
    setTimeout(() => {
      o.name = 'Mary'
    }, 1000)
  })
})
