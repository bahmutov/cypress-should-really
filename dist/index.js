"use strict";
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.construct = exports.partial = exports.tap = exports.toDate = exports.flipTwoArguments = exports.isEqual = exports.greaterThan = exports.its = exports.invoke = exports.filter = exports.map = exports.pipe = exports.really = void 0;
/**
 * Constructs a "should(callback)" function on the fly from a pipeline
 * of individual functions to be called
 * @example cy.get(...).should(really(...))
 * @see https://github.com/bahmutov/cypress-should-really
 * @returns Function
 */
function really() {
    if (!arguments.length) {
        throw new Error('really() needs arguments really badly');
    }
    const fns = Cypress._.takeWhile(arguments, (arg) => typeof arg === 'function');
    const chainerIndex = Cypress._.findIndex(arguments, (arg) => typeof arg === 'string');
    if (chainerIndex === -1) {
        throw new Error('sh: no chainer found');
    }
    const chainer = arguments[chainerIndex];
    const chainerArguments = Cypress._.slice(arguments, chainerIndex + 1);
    const chainers = chainer.split('.');
    const fn = pipe(...fns);
    return function (value) {
        // console.log('value', value)
        const transformed = fn(value);
        // console.log('transformed', transformed)
        return chainers.reduce((acc, chainer) => {
            const currentChainer = acc[chainer];
            if (typeof currentChainer === 'function') {
                return acc[chainer](...chainerArguments);
            }
            else {
                return acc[chainer];
            }
        }, expect(transformed).to);
    };
}
exports.really = really;
function pipe(...fns) {
    return function (value) {
        return fns.reduce((acc, fn) => fn(acc), value);
    };
}
exports.pipe = pipe;
/**
 * Transforms an object or a list of objects using the supplied function or name of the property.
 * @param {Function} fn Function to apply to each object
 * @returns {Object|Array} Transformed value
 * @example cy.get('.todo').then(map('innerText'))
 */
function map(fn) {
    return function (list) {
        if (Cypress._.isArrayLike(list)) {
            const callbackFn = typeof fn === 'function' ? (x) => fn(x) : fn;
            return Cypress._.map(list, callbackFn);
        }
        else {
            return fn(list);
        }
    };
}
exports.map = map;
/**
 * Filter the values by the given predicate function.
 * @param {Function} predicate
 */
function filter(predicate) {
    return function (list) {
        if (Cypress._.isArrayLike(list)) {
            const callbackFn = typeof predicate === 'function'
                ? (x) => predicate(x)
                : predicate;
            return Cypress._.filter(list, callbackFn);
        }
        else {
            return predicate(list);
        }
    };
}
exports.filter = filter;
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
            throw new Error(`Call to "${methodName}" must have a single argument`);
        }
        // @ts-ignore
        if (typeof list[methodName] === 'function') {
            // @ts-ignore
            return list[methodName](...args);
        }
        if (Cypress._.isArrayLike(list)) {
            return Cypress._.invokeMap(list, methodName, ...args);
        }
        else {
            return Cypress._.invoke(list, methodName, ...args);
        }
    };
}
exports.invoke = invoke;
/**
 * Grabs a property or a nested path from the given object.
 * @param {String} path
 * @returns Value of the property
 * @example
 *  cy.wrap({ foo: 'bar' }).then(its('foo'))
 */
function its(path) {
    return function (o) {
        return Cypress._.property(path)(o);
    };
}
exports.its = its;
/**
 * Curried > N function
 * @param {number} n
 * @returns Boolean
 * @example
 *  expect(greaterThan(10)(5)).to.be.false
 */
function greaterThan(n) {
    return function (x) {
        return x > n;
    };
}
exports.greaterThan = greaterThan;
/**
 * Curried deep comparison
 * @param {any} isEqual
 */
function isEqual(expectedValue) {
    return function (actualValue) {
        return Cypress._.isEqual(actualValue, expectedValue);
    };
}
exports.isEqual = isEqual;
/**
 * Takes a function and returns a function that expects the first two
 * arguments in the reverse order.
 * @param {Function} fn Function to call
 * @returns Function
 * @example
 *  flipTwoArguments(Cypress._.map)(x => x * 2, [1, 2, 3])
 */
function flipTwoArguments(fn) {
    return function (a, b) {
        return fn(b, a);
    };
}
exports.flipTwoArguments = flipTwoArguments;
/**
 * Converts the given string into a JavaScript Date object
 * @param {String} s dateString
 * @returns {Date} Date instance
 * @deprecated Use "constructor(Date)" instead
 */
function toDate(s) {
    return new Date(s);
}
exports.toDate = toDate;
/**
 * Returns a function that waits for the argument, passes that argument
 * to the given callback, but returns the original value. Useful
 * for debugging data transformations.
 * @param {Function} fn
 * @example cyw.wrap(1).then(tap(console.log)).should('equal', 1)
 */
function tap(fn) {
    return function (x) {
        fn(x);
        return x;
    };
}
exports.tap = tap;
/**
 * Returns a function with the first argument bound.
 * @param {Function} fn Function to partially apply
 * @param {any} a First argument to apply
 * @example
 *  const add = (a, b) => a + b
 *  const addOne = partial(add, 1)
 *  addOne(2) // 3
 */
function partial(fn, a) {
    return fn.bind(null, a);
}
exports.partial = partial;
/**
 * Given a constructor function, returns a function
 * that waits for a single argument before calling "new constructor(arg)"
 * @example constructor(Date)
 * @see https://glebbahmutov.com/blog/work-around-the-keyword-new-in-javascript/
 */
function construct(constructor) {
    return function (arg) {
        // @ts-ignore
        return new constructor(arg);
    };
}
exports.construct = construct;
