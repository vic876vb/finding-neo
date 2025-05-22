import type { InnerKeys, InnerProps, ShallowKey } from "./nested"

export type FlattenedProps<T, K extends keyof T> = { [P in InnerKeys<T, K>]: InnerProps<T, K, P> }
export type Flatten<T, K extends keyof T> = Omit<T, K> & FlattenedProps<T, K>

export function shallowFlatten<T extends object>(obj: T, ...keys: ShallowKey<T>[]) {
  const copy = { ...obj }

  for (const key of keys) {
    const value = copy[key]
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(copy, value)
    }
    delete copy[key]
  }

  return copy
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
