type ShallowMerge<T, S> = Omit<T, keyof S> & S
type DeepMerge<T, S> = {
  [K in keyof T | keyof S]: K extends keyof S
    ? K extends keyof T
      ? T[K] extends object
        ? S[K] extends object
          ? DeepMerge<T[K], S[K]>
          : S[K]
        : S[K]
      : S[K]
    : K extends keyof T
      ? T[K]
      : never
}
export function shallowMerge<T extends object, S extends object>(target: T, source: S): ShallowMerge<T, S> {
  return { ...target, ...source }
}

export function deepMerge<
  T extends Record<K, TVal> & object,
  S extends Record<K, SVal> & object,
  K extends PropertyKey & string,
  SVal = unknown,
  TVal = unknown
>(target: T, source: S): DeepMerge<T, S> {
  for (const key in source) {
    if (source[key] !== null && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!(target as any)[key] || typeof (target as any)[key] !== "object") {
        ;(target as any)[key] = {}
      }
      deepMerge((target as any)[key], (source as any)[key])
    } else {
      ;(target as any)[key] = source[key]
    }
  }
  return target as unknown as DeepMerge<T, S>
}
