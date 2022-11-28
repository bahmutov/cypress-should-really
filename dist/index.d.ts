/**
 * Constructs a "should(callback)" function on the fly from a pipeline
 * of individual functions to be called
 * @example cy.get(...).should(really(...))
 * @see https://github.com/bahmutov/cypress-should-really
 * @returns Function
 */
export declare function really(): (value: unknown) => any;
export declare function pipe(...fns: Function[]): (value: unknown) => unknown;
/**
 * Transforms an object or a list of objects using the supplied function or name of the property.
 * @param {Function} fn Function to apply to each object
 * @returns {Object|Array} Transformed value
 * @example cy.get('.todo').then(map('innerText'))
 */
export declare function map(fn: Function): (list: unknown) => any;
/**
 * Filter the values by the given predicate function.
 * @param {Function} predicate
 */
export declare function filter(predicate: Function): (list: unknown) => any;
/**
 * Invokes the given name (with optional arguments) on the given object.
 * @param {String} methodName
 * @param  {...any} args
 * @returns Result of the method invocation
 * @example
 *  cy.get('dates')
 *    .then(map('innerText'))
 *    .then(toDate)
 *    .then(invoke('getTime'))
 */
export declare function invoke(methodName: string, ...args: unknown[]): (list: unknown | unknown[]) => any;
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
//# sourceMappingURL=index.d.ts.map