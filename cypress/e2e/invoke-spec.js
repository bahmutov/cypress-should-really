/// <reference types="cypress" />

import { invoke, map, its, pipe } from '../..'

describe('invoke', () => {
  it('works on arrays', () => {
    const strings = ['a', 'bb', 'ccc']
    const results = invoke('toUpperCase')(strings)
    expect(results).to.deep.equal(['A', 'BB', 'CCC'])
  })

  it('works on jQuery', () => {
    const $ = Cypress.$(`
      <ul>
        <li>a</li>
        <li>bb</li>
        <li>ccc</li>
      </ul>
    `)
    const li = invoke('find', 'li')($)
    const strings = map('innerText')(li)
    expect(strings).to.deep.equal(['a', 'bb', 'ccc'])

    // note that calling "text()" on jQuery element
    // returns a single string
    cy.wrap($)
      .then(invoke('find', 'li'))
      .then(invoke('text'))
      .should('deep.equal', 'abbccc')
  })

  it('passes arguments', () => {
    const calc = {
      add(a, b) {
        return a + b
      },
    }
    const sum = invoke('add', 1, 2)(calc)
    expect(sum).to.equal(3)
  })

  it('throws an error if final call is not unary', () => {
    // command mistake - passing arguments to the final call
    // instead of preparing it with the name of the method
    expect(() => {
      invoke('something')({}, 1, 2)
    }).to.throw('Call to "something" must have a single argument')
  })

  it('can be combined with map', () => {
    const $ = Cypress.$(`
      <ul>
        <li>a</li>
        <li>bb</li>
        <li>ccc</li>
      </ul>
    `)
    const li = invoke('find', 'li')($)
    // when we map, we get the regular DOM elements
    const strings = map(its('innerText'))(li)
    const upper = map(invoke('toUpperCase'))(strings)
    expect(upper).to.deep.equal(['A', 'BB', 'CCC'])
  })

  it('can be combined with pipe', () => {
    const $ = Cypress.$(`
      <ul>
        <li>a</li>
        <li>bb</li>
        <li>ccc</li>
      </ul>
    `)

    const toStrings = pipe(invoke('find', 'li'), map('innerText'))
    const strings = toStrings($)
    expect(strings).to.deep.equal(['a', 'bb', 'ccc'])
  })
})
