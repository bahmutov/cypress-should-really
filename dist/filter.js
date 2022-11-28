"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
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
