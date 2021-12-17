/// <reference types="cypress" />

import { really, invoke, map, tap, greaterThan, pipe } from '../../..'
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

    it('by attribute', () => {
      cy.visit('cypress/integration/duplicates/index.html')

      cy.get('li').should(
        really(
          map(invoke('getAttribute', 'data-product-id')),
          countBy,
          (counts) => pickBy(counts, (n) => n > 1),
          tap(console.log),
          'be.empty',
        ),
      )

      // using a few more shortcuts
      cy.get('li').should(
        really(
          map(invoke('getAttribute', 'data-product-id')),
          countBy,
          (counts) => pickBy(counts, greaterThan(1)),
          tap(console.log),
          'be.empty',
        ),
      )
    })
  },
)
