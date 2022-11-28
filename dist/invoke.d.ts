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
export declare function invoke(methodName: string, ...args: unknown[]): (list: unknown | unknown[]) => any;
//# sourceMappingURL=invoke.d.ts.map