/**
 * Transforms an object or a list of objects using the supplied function or name of the property.
 * @param {Function} fn Function to apply to each object
 * @returns {Object|Array} Transformed value
 * @example cy.get('.todo').then(map('innerText'))
 */
export declare function map(fn: Function): (list: unknown) => any;
//# sourceMappingURL=map.d.ts.map