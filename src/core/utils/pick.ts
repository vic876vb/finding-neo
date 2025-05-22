import { deepMerge } from "./merge"
import { getDeepProperty, isDeepKey, type DeepKey } from "./nested"
import type { IfNever } from "./type-guards"

export type ConditionalKeys<Base, Condition> = {
  [Key in keyof Base]-?: Base[Key] extends Condition ? IfNever<Base[Key], IfNever<Condition, Key, never>, Key> : never
}[keyof Base]
export type ConditionalPick<Base, Condition> = Pick<Base, ConditionalKeys<Base, Condition>>

export function shallowPick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const copy = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      copy[key] = obj[key]
    }
  }
  return copy
}

export function deepPick<T extends object>(obj: T, ...keys: DeepKey<T>[]): Pick<T, keyof T & string> {
  const clone = structuredClone(obj)
  const picked = {} as Pick<T, keyof T>
  for (const key of keys) {
    if (isDeepKey(clone, key)) {
      const path = String(key).split(".")
      const outerKey = path[0]
      const innerValue = (getDeepProperty(clone, path) as Record<string, unknown>)[outerKey]
      deepMerge(picked, { [outerKey]: innerValue })
    }
  }
  return picked
}
