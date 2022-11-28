export function pipe(...fns: Function[]) {
  return function (value: unknown) {
    return fns.reduce((acc, fn) => fn(acc), value)
  }
}
