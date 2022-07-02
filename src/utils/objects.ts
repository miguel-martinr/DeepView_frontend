export function mergeArrayOfObjects<T>(arr: any): Object {
  return Object.keys(arr).map(key => arr[key]).reduce((old, item) => (
    { ...old, ...item }
  ), {})
}