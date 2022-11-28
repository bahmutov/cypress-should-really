"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoke = void 0;
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
