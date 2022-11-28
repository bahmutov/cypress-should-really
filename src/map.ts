/**
 * Transforms an object or a list of objects using the supplied function or name of the property.
 * @param {Function} fn Function to apply to each object
 * @returns {Object|Array} Transformed value
 * @example cy.get('.todo').then(map('innerText'))
 */
export function map(fn: Function) {
  return function (list: unknown) {
    if (Cypress._.isArrayLike(list)) {
      const callbackFn = typeof fn === 'function' ? (x: unknown) => fn(x) : fn
      return Cypress._.map(list, callbackFn)
    } else {
      return fn(list)
    }
  }
}
