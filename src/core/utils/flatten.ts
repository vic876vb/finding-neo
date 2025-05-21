type InnerKeys<T, K extends keyof T> = K extends any ? keyof T[K] : never
type InnerProps<T, K extends keyof T, P extends PropertyKey> = K extends any ? (P extends keyof T[K] ? T[K][P] : never) : never
type FlattenedProps<T, K extends keyof T> = { [P in InnerKeys<T, K>]: InnerProps<T, K, P> }
export type Flatten<T, K extends keyof T> = Omit<T, K> & FlattenedProps<T, K>

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

export function deepFlatten<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Flatten<T, K> {
  const copy = structuredClone(obj)
  const flattened: T[K][] = []

  for (const key of keys) {
    if (copy[key] && typeof copy[key] === "object") {
      flattened.push(structuredClone(copy[key]))
    }
    delete copy[key]
  }

  return Object.assign({}, copy, ...flattened)
}
