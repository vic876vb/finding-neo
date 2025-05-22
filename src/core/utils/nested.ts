export type InnerKey<T extends object> = { [K in keyof T]: T[K] extends object ? `${K & string}.${keyof T[K] & string}` : never }[keyof T]
export type InnerKeys<T, K extends keyof T> = K extends any ? keyof T[K] : never
export type InnerProp<T extends object> =
  InnerKey<T> extends `${infer P}.${infer Q}`
    ? P extends keyof T & string
      ? Q extends keyof T[P]
        ? { [Key in P]: { [SubKey in Q]: T[P][SubKey] } }
        : { [Key in P]: { [x: string]: T[P] } }
      : { [x: string]: any }
    : never
export type InnerProps<T, K extends keyof T, P extends PropertyKey> = K extends any ? (P extends keyof T[K] ? T[K][P] : never) : never

export type ShallowKey<T> = Extract<keyof T, string | number>
export type DeepKey<T extends object> = (keyof T & string) | InnerKey<T>

export function deleteDeepProperty<T extends object>(obj: T, key: DeepKey<T>): void {
  const path = String(key).split(".")
  if (path.length === 0) return
  if (!(path[0] in obj)) return

  const head = path[0] as keyof T & string
  const rest = path.slice(1)

  if (rest.length === 0) {
    delete obj[head]
  } else if (obj[head] && typeof obj[head] === "object") {
    deleteDeepProperty(obj[head], rest.join(".") as DeepKey<T[typeof head] & object>)
  }
}

export function getDeepProperty<T extends object>(obj: T, path: string[]): InnerProp<T> | undefined {
  if (path.length === 0) return

  if (!(path[0] in obj)) return undefined

  const head = path[0] as keyof T & string
  const rest = path.slice(1)

  if (rest.length === 0) return { [head]: obj[head] } as InnerProp<T>
  else if (obj[head] && typeof obj[head] === "object") {
    const deep = getDeepProperty(obj[head], rest as any)
    return { [head]: deep } as InnerProp<T>
  }
}

export function isDeepKey<T extends object>(obj: T, key: DeepKey<T>): boolean {
  if (typeof key !== "string" || typeof obj !== "object") return false

  const path = key.split(".")
  let currentObject = obj as Record<string, any>
  return path.every((k) => {
    const isIncluded = k in currentObject
    if (isIncluded) {
      currentObject = currentObject[k]
    }
    return isIncluded
  })
}
