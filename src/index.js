/// <reference types="cypress" />

function really() {
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

  return function (value) {
    // console.log('value', value)
    const transformed = fn(value)
    // console.log('transformed', transformed)
    return chainers.reduce((acc, chainer) => {
      const currentChainer = acc[chainer]
      if (typeof currentChainer === 'function') {
        return acc[chainer](...chainerArguments)
      } else {
        return acc[chainer]
      }
    }, expect(transformed).to)
  }
}

function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value)
  }
}

/**
 * Transforms an object or a list of objects using the supplied function or name of the property.
 * @param {Function} fn Function to apply to each object
 * @returns {Object|Array} Transformed value
 * @example cy.get('.todo').then(map('innerText'))
 */
function map(fn) {
  return function (list) {
    if (Cypress._.isArrayLike(list)) {
      const callbackFn = typeof fn === 'function' ? (x) => fn(x) : fn
      return Cypress._.map(list, callbackFn)
    } else {
      return fn(list)
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
function invoke(methodName, ...args) {
  return function (list) {
    if (arguments.length > 1) {
      // the user tried to pass extra arguments with the list/object
      // that is a mistake!
      throw new Error(`Call to "${methodName}" must have a single argument`)
    }

    if (typeof list[methodName] === 'function') {
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
function its(path) {
  return function (o) {
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
function greaterThan(n) {
  return function (x) {
    return x > n
  }
}

/**
 * Converts the given string into a JavaScript Date object
 * @param {String} s dateString
 * @returns {Date} Date instance
 */
function toDate(s) {
  return new Date(s)
}

/**
 * Returns a function that waits for the argument, passes that argument
 * to the given callback, but returns the original value. Useful
 * for debugging data transformations.
 * @param {Function} fn
 * @example cyw.wrap(1).then(tap(console.log)).should('equal', 1)
 */
function tap(fn) {
  return function (x) {
    fn(x)
    return x
  }
}

module.exports = {
  really,
  // utility functions
  map,
  invoke,
  its,
  pipe,
  toDate,
  tap,
  greaterThan,
}
