import { strict as assert } from "assert"

// TODO: use URL interface
export function isInternalUrl(url: string): boolean {
  const { PUBLIC_URL } = import.meta.env
  assert(PUBLIC_URL, "PUBLIC_URL is not defined")

  if (PUBLIC_URL) return url.startsWith(PUBLIC_URL) || isRelativeUrl(url)

  console.info(`Could not determine whether ${url} is internal or not because PUBLIC_URL environment variable is ${PUBLIC_URL}.`)
  return false
}

export function isRelativeUrl(url: string): boolean {
  return url.startsWith("/") || url.startsWith("#")
}
