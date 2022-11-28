/**
 * Constructs a "should(callback)" function on the fly from a pipeline
 * of individual functions to be called
 * @example cy.get(...).should(really(...))
 * @see https://github.com/bahmutov/cypress-should-really
 * @returns Function
 */
export declare function really(...functionsAndAssertion: unknown[]): (value: unknown) => any;
//# sourceMappingURL=really.d.ts.map