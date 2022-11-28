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
export function invoke(methodName: string, ...args: unknown[]) {
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
