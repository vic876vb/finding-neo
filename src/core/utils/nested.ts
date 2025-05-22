export function deleteNestedProperty(obj: any, path: string[]) {
  if (path.length === 0) return

  const [head, ...rest] = path
  if (rest.length === 0) {
    delete obj[head]
  } else if (obj[head] && typeof obj[head] === "object") {
    deleteNestedProperty(obj[head], rest)
  }
}

export function getNestedProperty(source: any, path: string[]): any {
  const [head, ...rest] = path
  if (!(head in source)) return undefined

  if (rest.length === 0) {
    return source[head]
  }

  const nested = getNestedProperty(source[head], rest)
  if (nested === undefined) return undefined

  return { [head]: nested }
}
