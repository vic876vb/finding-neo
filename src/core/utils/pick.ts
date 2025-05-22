import { deleteNestedProperty, getNestedProperty } from "./nested"

export function shallowPick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const copy = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      copy[key] = obj[key]
    }
  }
  return copy
}

// export function deepPick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
//   const clone = structuredClone(obj)
//   const picked = {} as Pick<T, K>
//   for (const key of keys) {
//     if (key in clone) {
//       picked[key] = getNestedProperty(clone, String(key).split("."))
//     }
//   }
//   return picked
// }

// TODO: fix deepPick
export function deepPick<T extends object, K extends keyof T | string>(
  obj: T,
  ...keys: K[]
): Pick<T, Extract<K, keyof T>> & Record<string, any> {
  const result: any = {}
  for (const key of keys) {
    const path = String(key).split(".")
    const picked = getNestedProperty(obj, path)
    console.log(`picked`, picked)

    if (picked !== undefined) {
      // Deep merge the picked value into result
      let target = result
      for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]] ??= {}
      }
      target[path[path.length - 1]] = picked
    }
  }
  return result
}
