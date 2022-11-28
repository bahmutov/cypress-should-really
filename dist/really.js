"use strict";
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.really = void 0;
const pipe_1 = require("./pipe");
/**
 * Constructs a "should(callback)" function on the fly from a pipeline
 * of individual functions to be called
 * @example cy.get(...).should(really(...))
 * @see https://github.com/bahmutov/cypress-should-really
 * @returns Function
 */
function really(...functionsAndAssertion) {
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
    const fn = (0, pipe_1.pipe)(...fns);
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
