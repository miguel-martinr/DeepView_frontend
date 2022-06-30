export function mergeArrayOfObjects<T>(arr: Array<T>): Object {
  return Object.keys(arr).map(key => arr[key]).reduce((old, item) => (
    { ...old, ...item }
  ), {})
}