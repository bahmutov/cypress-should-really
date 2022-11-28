/**
 * Grabs a property or a nested path from the given object.
 * @param {String} path
 * @returns Value of the property
 * @example
 *  cy.wrap({ foo: 'bar' }).then(its('foo'))
 */
export declare function its(path: string): (o: object) => unknown;
/**
 * Curried > N function
 * @param {number} n
 * @returns Boolean
 * @example
 *  expect(greaterThan(10)(5)).to.be.false
 */
export declare function greaterThan(n: number): (x: number) => boolean;
/**
 * Curried deep comparison
 * @param {any} isEqual
 */
export declare function isEqual(expectedValue: any): (actualValue: any) => boolean;
/**
 * Takes a function and returns a function that expects the first two
 * arguments in the reverse order.
 * @param {Function} fn Function to call
 * @returns Function
 * @example
 *  flipTwoArguments(Cypress._.map)(x => x * 2, [1, 2, 3])
 */
export declare function flipTwoArguments(fn: Function): (a: unknown, b: unknown) => any;
/**
 * Converts the given string into a JavaScript Date object
 * @param {String} s dateString
 * @returns {Date} Date instance
 * @deprecated Use "constructor(Date)" instead
 */
export declare function toDate(s: string): Date;
/**
 * Returns a function that waits for the argument, passes that argument
 * to the given callback, but returns the original value. Useful
 * for debugging data transformations.
 * @param {Function} fn
 * @example cyw.wrap(1).then(tap(console.log)).should('equal', 1)
 */
export declare function tap(fn: Function): (x: unknown) => unknown;
/**
 * Returns a function with the first argument bound.
 * @param {Function} fn Function to partially apply
 * @param {any} a First argument to apply
 * @example
 *  const add = (a, b) => a + b
 *  const addOne = partial(add, 1)
 *  addOne(2) // 3
 */
export declare function partial(fn: Function, a: unknown): any;
/**
 * Given a constructor function, returns a function
 * that waits for a single argument before calling "new constructor(arg)"
 * @example constructor(Date)
 * @see https://glebbahmutov.com/blog/work-around-the-keyword-new-in-javascript/
 */
export declare function construct(constructor: Function): (arg: unknown) => any;
export * from './pipe';
export * from './really';
export * from './map';
export * from './filter';
export * from './invoke';
//# sourceMappingURL=index.d.ts.map