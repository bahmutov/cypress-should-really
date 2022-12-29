# cypress-should-really [![ci](https://github.com/bahmutov/cypress-should-really/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/bahmutov/cypress-should-really/actions/workflows/ci.yml) ![cypress version](https://img.shields.io/badge/cypress-12.1.0-brightgreen) [![renovate-app badge][renovate-badge]][renovate-app]

Read the blog posts [Functional Helpers For Cypress Tests](https://glebbahmutov.com/blog/fp-cy-helpers/) and [Check Items For Duplicates](https://glebbahmutov.com/blog/check-for-duplicates/). 🎓 Covered in my course [Cypress Plugins](https://cypress.tips/courses/cypress-plugins).

## Example

Grab text from each list item, convert the strings into Dates, convert Dates into timestamps, then confirm they are sorted using [chai-sorted](https://www.chaijs.com/plugins/chai-sorted/) assertion.

```js
import { innerText, toDate, invoke } from 'cypress-should-really'
cy.get('.dates')
  .then(map('innerText'))
  .then(map(toDate))
  .then(invoke('getDate'))
  .should('be.sorted')
```

The above separates each operation using [cy.then](https://on.cypress.io/then) commands, which are not retried. Luckily, we can easily combine the individual steps into a single data transformation function using the `pipe` command.

```js
import { innerText, toDate, invoke, pipe } from 'cypress-should-really'
const transform = pipe(map('innerText'), map(toDate), invoke('getDate'))
cy.get('.dates').then(transform).should('be.sorted')
```

The above commands are still NOT retrying the first `cy.get` command, thus if the page changes, the assertion still fails since it never "sees" the changed elements. We need to remove the `.then(transform)` step and directly tie the `cy.get` command to the assertion. We can move the data transformation into the assertion callback that transforms the data AND runs the assertion using `really` function.

```js
import { innerText, toDate, invoke, pipe, really } from 'cypress-should-really'
const transform = pipe(map('innerText'), map(toDate), invoke('getDate'))
cy.get('.dates').should(really(transform, 'be.sorted'))
```

Finally, we can skip using the `pipe` function, since it is built into the `really` automatically. All functions before the assertion are applied and then the assertion runs.

```js
import { innerText, toDate, invoke, really } from 'cypress-should-really'
cy.get('.dates').should(
  really(map('innerText'), map(toDate), invoke('getDate'), 'be.sorted'),
)
```

## Installation

```text
$ npm i -D cypress-should-really
# or install using Yarn
$ yarn add -D cypress-should-really
```

## API

- `map`
- `invoke`
- `constructor`
- `toDate` (deprecated) use `constructor(Date)` instead
- `its`
- `greaterThan`
- `flipTwoArguments`
- `partial`
- `pipe`
- `tap`
- `filter`
- `isEqual`
- `really`

## invoke

`invoke(<method name>, ...arguments)` returns a function that waits for an object or an array, then calls the method and returns the results

```js
const calc = {
  add(a, b) {
    return a + b
  },
}
invoke('add', 1, 2)(calc)
// 3
```

See [invoke-spec.js](./cypress/e2e/invoke-spec.js)

## constructor

Takes a constructor function, returns a function that waits for a single argument and calls with the `new` keyword.

```js
import {constructor} from 'cypress-should-really'
// converts a string to Date object
.then(constructor(Date))
```

## tap

Passes the argument into the given function, but returns the original argument. Useful for debugging pipes of functions - insert it in every place of the pipeline to see the values.

```js
const o = {
  name: 'Joe',
}
cy.wrap(o).should(really(its('name'), tap(console.log), 'equal', 'Mary'))
// change the name to Mary after some time
setTimeout(() => {
  o.name = 'Mary'
}, 1000)
```

In the above example, the `console.log` the string "Joe" multiple times, before logging "Mary" once and passing the test.

See [tap-spec.js](./cypress/e2e/tap-spec.js)

## Videos

- [Filter Input Elements By Value Using cypress-should-really Plugin](https://youtu.be/Gxoo6uZMo9I)

## See also

- [cypress-recurse](https://github.com/bahmutov/cypress-recurse)
- [cypress-map](https://github.com/bahmutov/cypress-map) for Cypress v12+

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2021

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-should-really/issues) on Github

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
