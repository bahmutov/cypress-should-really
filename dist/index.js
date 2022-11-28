"use strict";
/// <reference types="cypress" />
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.construct = exports.partial = exports.tap = exports.toDate = exports.flipTwoArguments = exports.isEqual = exports.greaterThan = exports.its = void 0;
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
__exportStar(require("./pipe"), exports);
__exportStar(require("./really"), exports);
__exportStar(require("./map"), exports);
__exportStar(require("./filter"), exports);
__exportStar(require("./invoke"), exports);
