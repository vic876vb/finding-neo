import { strict as assert } from "assert"
import { createClient, type EntrySkeletonType } from "contentful"
import { transform as transformEntry, type TransformedEntry } from "./converters/entry.converter"

type FetchResult<T> = {
  data?: T | undefined
  error?: any
}

const { CONTENTFUL_DELIVERY_API_URL, CONTENTFUL_DELIVERY_TOKEN, CONTENTFUL_SPACE_ID, CONTENTFUL_ENV } = import.meta.env

assert(CONTENTFUL_DELIVERY_API_URL, "CONTENTFUL_DELIVERY_API_URL is not defined")
assert(CONTENTFUL_DELIVERY_TOKEN, "CONTENTFUL_DELIVERY_TOKEN is not defined")
assert(CONTENTFUL_SPACE_ID, "CONTENTFUL_SPACE_ID is not defined")

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  environment: import.meta.env.DEV ? import.meta.env.CONTENTFUL_ENV : "master",
  accessToken: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.CONTENTFUL_DELIVERY_API_URL
})

export async function getEntry<T extends EntrySkeletonType>(slug: string): Promise<FetchResult<TransformedEntry<T>>> {
  try {
    const entries = await client.getEntries({
      content_type: "pet",
      "fields.id[exists]": true,
      "fields.id[match]": slug
      // select: ["sys.id", "sys.contentType", "fields"]
    })
    const entry = entries.items[0]
    const { value, success } = transformEntry(entry)
    if (!success) return { error: `Could not transform entry with id: "${slug}"` }
    return { data: value }
  } catch (error: any) {
    return { error }
  }
}
