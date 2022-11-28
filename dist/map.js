"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
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
