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
          // string like "?foo=bar&baz=qux"
          construct(URLSearchParams), // URLSearchParams
          invoke('entries'), // Iterable<[string, string]>
          Array.from, // Array<[string, string]>
          Cypress._.fromPairs, // { [key: string]: string }
          'deep.equal',
          {
            foo: 'bar',
            baz: 'qux',
          },
        ),
      )
  },
)
