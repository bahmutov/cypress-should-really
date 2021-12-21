/// <reference types="cypress" />

import { construct, invoke, really } from '../../src'

it(
  'parses the URL search part',
  { baseUrl: 'https://example.cypress.io/' },
  () => {
    // we assume the page does not redirect and does not lose the search part
    cy.visit('/commands/location.html?foo=bar&baz=qux')
    cy.location('search')
      .should('equal', '?foo=bar&baz=qux')
      .and(
        really(
          construct(URLSearchParams),
          invoke('entries'),
          Array.from,
          Cypress._.fromPairs,
          'deep.equal',
          {
            foo: 'bar',
            baz: 'qux',
          },
        ),
      )
  },
)
