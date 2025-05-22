import { deleteNestedProperty } from "./nested"

export function shallowOmit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const copy = { ...obj }
  for (const key of keys) {
    delete copy[key]
  }
  return copy
}

export function deepOmit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const clone = structuredClone(obj)
  for (const key of keys) {
    // delete clone[key]

    deleteNestedProperty(clone, String(key).split("."))
  }
  return clone
}
