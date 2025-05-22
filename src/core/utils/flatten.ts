type InnerKeys<T, K extends keyof T> = K extends any ? keyof T[K] : never
type InnerProps<T, K extends keyof T, P extends PropertyKey> = K extends any ? (P extends keyof T[K] ? T[K][P] : never) : never
type FlattenedProps<T, K extends keyof T> = { [P in InnerKeys<T, K>]: InnerProps<T, K, P> }
export type Flatten<T, K extends keyof T> = Omit<T, K> & FlattenedProps<T, K>
type DeepOmitKey<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]: T[P] extends object
    ? T[P] extends Array<infer U>
      ? Array<DeepOmitKey<U, K>>
      : DeepOmitKey<T[P], K>
    : T[P]
}
export function shallowFlatten<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Flatten<T, K> {
  const copy = { ...obj }
  const flattened: T[K][] = []

  for (const key of keys) {
    if (copy[key] && typeof copy[key] === "object") {
      flattened.push(copy[key])
    }
    delete copy[key]
  }

  return Object.assign({}, copy, ...flattened)
}

// export function deepFlatten<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Flatten<T, K> {
//   const copy = structuredClone(obj)
//   const flattened: T[K][] = []

//   for (const key of keys) {
//     if (copy[key] && typeof copy[key] === "object") {
//       flattened.push(structuredClone(copy[key]))
//     }
//     delete copy[key]
//   }

//   return Object.assign({}, copy, ...flattened)
// }

// TODO: fix deepFlatten types
export function deepFlatten<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Flatten<T, K> {
  if (typeof obj !== "object" || obj === null) return obj

  // If this object has any of the keys to flatten, flatten them
  let result: any = Array.isArray(obj) ? [] : {}

  for (const [k, v] of Object.entries(obj)) {
    if (keys.includes(k as K) && typeof v === "object" && v !== null) {
      // Recursively flatten the value, then merge its properties into result
      const flattened = deepFlatten(v, ...keys)
      result = { ...result, ...flattened }
    } else if (typeof v === "object" && v !== null) {
      // Recurse into nested objects/arrays
      result[k] = deepFlatten(v, ...keys)
    } else {
      result[k] = v
    }
  }

  return result
}
