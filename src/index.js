/// <reference types="cypress" />

function really() {
  const fns = Cypress._.takeWhile(arguments, (arg) => typeof arg === 'function')
  const chainerIndex = Cypress._.findIndex(
    arguments,
    (arg) => typeof arg === 'string',
  )
  if (chainerIndex === -1) {
    throw new Error('sh: no chainer found')
  }
  const chainer = arguments[chainerIndex]
  const chainerArguments = Cypress._.slice(arguments, chainerIndex + 1)
  const chainers = chainer.split('.')
  const fn = pipe(...fns)

  return function (value) {
    // console.log('value', value)
    const transformed = fn(value)
    // console.log('transformed', transformed)
    return chainers.reduce((acc, chainer) => {
      const currentChainer = acc[chainer]
      if (typeof currentChainer === 'function') {
        return acc[chainer](...chainerArguments)
      } else {
        return acc[chainer]
      }
    }, expect(transformed).to)
  }
}

function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value)
  }
}

function map(fn) {
  return function (list) {
    // console.log('mapping list', list)
    debugger
    if (Cypress._.isArrayLike(list)) {
      return Cypress._.map(list, fn)
    } else {
      return fn(list)
    }
  }
}

function invoke(methodName, ...args) {
  return function (list) {
    if (Cypress._.isArrayLike(list)) {
      return Cypress._.invokeMap(list, methodName, args)
    } else {
      return Cypress._.invoke(list, methodName, args)
    }
  }
}

function its(path) {
  return function (o) {
    return Cypress._.property(path)(o)
  }
}

function toDate(s) {
  return new Date(s)
}

// function toDate() {
//   return function (list) {
//     if (Cypress._.isArrayLike(list)) {
//       return Cypress._.map(list, toDateObject)
//     } else {
//       return toDateObject(list)
//     }
//   }
// }

module.exports = {
  really,
  // utility functions
  map,
  invoke,
  its,
  pipe,
  toDate,
}
