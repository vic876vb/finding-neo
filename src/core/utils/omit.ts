import { deleteDeepProperty, type DeepKey } from "./nested"

export function shallowOmit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const copy = { ...obj }
  for (const key of keys) {
    delete copy[key]
  }
  return copy
}

export function deepOmit<T extends object>(obj: T, ...keys: DeepKey<T>[]): Omit<T, DeepKey<T>> {
  const clone = structuredClone(obj)
  for (const key of keys) {
    deleteDeepProperty(clone, key)
  }
  return clone
}
