export type IsNever<T> = [T] extends [never] ? true : false
export type IfNever<T, TypeIfNever = true, TypeIfNotNever = false> = IsNever<T> extends true ? TypeIfNever : TypeIfNotNever

export type AssertEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
export type Assert<T> = T extends true ? true : never
export type AssertNot<T> = T extends false ? true : never
