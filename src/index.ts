/// <reference types="cypress" />

/**
 * Grabs a property or a nested path from the given object.
 * @param {String} path
 * @returns Value of the property
 * @example
 *  cy.wrap({ foo: 'bar' }).then(its('foo'))
 */
export function its(path: string) {
  return function (o: object) {
    return Cypress._.property(path)(o)
  }
}

/**
 * Curried > N function
 * @param {number} n
 * @returns Boolean
 * @example
 *  expect(greaterThan(10)(5)).to.be.false
 */
export function greaterThan(n: number) {
  return function (x: number) {
    return x > n
  }
}

/**
 * Curried deep comparison
 * @param {any} isEqual
 */
export function isEqual(expectedValue: any) {
  return function (actualValue: any) {
    return Cypress._.isEqual(actualValue, expectedValue)
  }
}

/**
 * Takes a function and returns a function that expects the first two
 * arguments in the reverse order.
 * @param {Function} fn Function to call
 * @returns Function
 * @example
 *  flipTwoArguments(Cypress._.map)(x => x * 2, [1, 2, 3])
 */
export function flipTwoArguments(fn: Function) {
  return function (a: unknown, b: unknown) {
    return fn(b, a)
  }
}

/**
 * Converts the given string into a JavaScript Date object
 * @param {String} s dateString
 * @returns {Date} Date instance
 * @deprecated Use "constructor(Date)" instead
 */
export function toDate(s: string) {
  return new Date(s)
}

/**
 * Returns a function that waits for the argument, passes that argument
 * to the given callback, but returns the original value. Useful
 * for debugging data transformations.
 * @param {Function} fn
 * @example cyw.wrap(1).then(tap(console.log)).should('equal', 1)
 */
export function tap(fn: Function) {
  return function (x: unknown) {
    fn(x)
    return x
  }
}

/**
 * Returns a function with the first argument bound.
 * @param {Function} fn Function to partially apply
 * @param {any} a First argument to apply
 * @example
 *  const add = (a, b) => a + b
 *  const addOne = partial(add, 1)
 *  addOne(2) // 3
 */
export function partial(fn: Function, a: unknown) {
  return fn.bind(null, a)
}

/**
 * Given a constructor function, returns a function
 * that waits for a single argument before calling "new constructor(arg)"
 * @example constructor(Date)
 * @see https://glebbahmutov.com/blog/work-around-the-keyword-new-in-javascript/
 */
export function construct(constructor: Function) {
  return function (arg: unknown) {
    // @ts-ignore
    return new constructor(arg)
  }
}

export * from './pipe'
export * from './really'
export * from './map'
export * from './filter'
export * from './invoke'
