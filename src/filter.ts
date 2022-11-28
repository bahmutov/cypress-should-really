/**
 * Filter the values by the given predicate function.
 * @param {Function} predicate
 */
export function filter(predicate: Function) {
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
