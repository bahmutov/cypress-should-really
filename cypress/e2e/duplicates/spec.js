/// <reference types="cypress" />

import {
  really,
  invoke,
  map,
  tap,
  greaterThan,
  partial,
  pipe,
  flipTwoArguments,
} from '../../..'
const { countBy, pickBy } = Cypress._

describe(
  'finding duplicates',
  { viewportHeight: 100, viewportWidth: 200 },
  () => {
    it('checks if an object is empty', () => {
      const p = pipe(countBy, (counts) => pickBy(counts, (n) => n > 1))
      const output = p(['a', 'b', 'c', 'a'])
      expect(output).to.be.deep.equal({ a: 2 })
    })

    it('by attribute (explicit)', () => {
      cy.visit('cypress/integration/duplicates/index.html')

      cy.get('li').should(
        really(
          map(invoke('getAttribute', 'data-product-id')),
          countBy,
          (counts) => pickBy(counts, (n) => n > 1),
          // if you want to debug this pipeline of functions
          // use tap(console.log) function
          tap(console.log),
          'be.empty',
        ),
      )
    })

    it('by attribute (greaterThan)', () => {
      cy.visit('cypress/integration/duplicates/index.html')

      // using a few more shortcuts
      cy.get('li').should(
        really(
          map(invoke('getAttribute', 'data-product-id')),
          countBy,
          (counts) => pickBy(counts, greaterThan(1)),
          'be.empty',
        ),
      )
    })

    it('by attribute (flip arguments and partial apply)', () => {
      cy.visit('cypress/integration/duplicates/index.html')
      // modify the _.pickBy to take arguments in
      // the flipped order: (fn, array)
      // then we know the first argument - greaterThan(1) function
      // so we apply it right away. The returned function
      // is waiting for the object
      const pickLargerThanOne = partial(
        flipTwoArguments(pickBy),
        greaterThan(1),
      )
      cy.get('li').should(
        really(
          map(invoke('getAttribute', 'data-product-id')),
          countBy,
          pickLargerThanOne,
          'be.empty',
        ),
      )
    })
  },
)
