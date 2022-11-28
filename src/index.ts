/// <reference types="cypress" />

function really() {
  if (!arguments.length) {
    throw new Error('really() needs arguments really badly')
  }

  const fns = Cypress._.takeWhile(arguments, (arg) => typeof arg === 'function')
  const chainerIndex = Cypress._.findIndex(
    arguments,
    (arg) => typeof arg === 'string',
  )
  if (chainerIndex === -1) {
    throw new Error('sh: no chainer found')
  }
  const chainer = arguments[chainerIndex]
  const chainerArguments = Cypress._.slice(arguments, chainerIndex + 1)
  const chainers = chainer.split('.')
  const fn = pipe(...fns)

  return function (value: unknown) {
    // console.log('value', value)
    const transformed = fn(value)
    // console.log('transformed', transformed)
    return chainers.reduce((acc: any, chainer: string) => {
      const currentChainer = acc[chainer]
      if (typeof currentChainer === 'function') {
        return acc[chainer](...chainerArguments)
      } else {
        return acc[chainer]
      }
    }, expect(transformed).to)
  }
}

function pipe(...fns: Function[]) {
  return function (value: unknown) {
    return fns.reduce((acc, fn) => fn(acc), value)
  }
}

/**
 * Transforms an object or a list of objects using the supplied function or name of the property.
 * @param {Function} fn Function to apply to each object
 * @returns {Object|Array} Transformed value
 * @example cy.get('.todo').then(map('innerText'))
 */
function map(fn: Function) {
  return function (list: unknown) {
    if (Cypress._.isArrayLike(list)) {
      const callbackFn = typeof fn === 'function' ? (x: unknown) => fn(x) : fn
      return Cypress._.map(list, callbackFn)
    } else {
      return fn(list)
    }
  }
}

/**
 * Filter the values by the given predicate function.
 * @param {Function} predicate
 */
function filter(predicate: Function) {
  return function (list: unknown) {
    if (Cypress._.isArrayLike(list)) {
      const callbackFn =
        typeof predicate === 'function'
          ? (x: unknown) => predicate(x)
          : predicate
      return Cypress._.filter(list, callbackFn)
    } else {
      return predicate(list)
    }
  }
}

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
function invoke(methodName: string, ...args: unknown[]) {
  return function (list: unknown | unknown[]) {
    if (arguments.length > 1) {
      // the user tried to pass extra arguments with the list/object
      // that is a mistake!
      throw new Error(`Call to "${methodName}" must have a single argument`)
    }

    // @ts-ignore
    if (typeof list[methodName] === 'function') {
      // @ts-ignore
      return list[methodName](...args)
    }

    if (Cypress._.isArrayLike(list)) {
      return Cypress._.invokeMap(list, methodName, ...args)
    } else {
      return Cypress._.invoke(list, methodName, ...args)
    }
  }
}

/**
 * Grabs a property or a nested path from the given object.
 * @param {String} path
 * @returns Value of the property
 * @example
 *  cy.wrap({ foo: 'bar' }).then(its('foo'))
 */
function its(path: string) {
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
function greaterThan(n: number) {
  return function (x: number) {
    return x > n
  }
}

/**
 * Curried deep comparison
 * @param {any} isEqual
 */
function isEqual(expectedValue: any) {
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
function flipTwoArguments(fn: Function) {
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
function toDate(s: string) {
  return new Date(s)
}

/**
 * Returns a function that waits for the argument, passes that argument
 * to the given callback, but returns the original value. Useful
 * for debugging data transformations.
 * @param {Function} fn
 * @example cyw.wrap(1).then(tap(console.log)).should('equal', 1)
 */
function tap(fn: Function) {
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
function partial(fn: Function, a: unknown) {
  return fn.bind(null, a)
}

/**
 * Given a constructor function, returns a function
 * that waits for a single argument before calling "new constructor(arg)"
 * @example constructor(Date)
 * @see https://glebbahmutov.com/blog/work-around-the-keyword-new-in-javascript/
 */
function construct(constructor: Function) {
  return function (arg: unknown) {
    // @ts-ignore
    return new constructor(arg)
  }
}

module.exports = {
  really,
  // utility functions
  map,
  construct,
  invoke,
  filter,
  its,
  pipe,
  toDate,
  tap,
  partial,
  isEqual,
  greaterThan,
  flipTwoArguments,
}
