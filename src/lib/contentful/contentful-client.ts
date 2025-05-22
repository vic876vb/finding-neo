import { strict as assert } from "assert"
import {
  createClient,
  type EntryContentTypeQuery,
  type EntryFieldsExistenceFilter,
  type EntryFieldTypes,
  type EntrySkeletonType,
  type EntrySelectFilterWithFields,
  type EntryFieldsSubsetFilters
} from "contentful"
import { transform as transformEntry, type TransformedEntry } from "./converters/entry.converter"

type FetchResult<T> = {
  data?: T | undefined
  error?: any
}
type EntryIdFieldFilter = EntryFieldsExistenceFilter<{ id: EntryFieldTypes.Symbol }, "fields"> &
  EntryFieldsSubsetFilters<{ id: EntryFieldTypes.Symbol }, "fields">

type QueryParams<T extends EntrySkeletonType> = EntryContentTypeQuery<T["contentTypeId"]> &
  EntryIdFieldFilter &
  EntrySelectFilterWithFields<T["fields"]>

const { CONTENTFUL_DELIVERY_API_URL, CONTENTFUL_DELIVERY_TOKEN, CONTENTFUL_SPACE_ID, CONTENTFUL_ENV } = import.meta.env

assert(CONTENTFUL_DELIVERY_API_URL, "CONTENTFUL_DELIVERY_API_URL is not defined")
assert(CONTENTFUL_DELIVERY_TOKEN, "CONTENTFUL_DELIVERY_TOKEN is not defined")
assert(CONTENTFUL_SPACE_ID, "CONTENTFUL_SPACE_ID is not defined")

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  environment: import.meta.env.DEV ? CONTENTFUL_ENV : "master",
  accessToken: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.CONTENTFUL_DELIVERY_API_URL
})

export async function getEntry<T extends EntrySkeletonType>(
  slug: string,
  contentTypeId: T["contentTypeId"]
): Promise<FetchResult<TransformedEntry<T>>> {
  try {
    const query: QueryParams<T> = {
      content_type: contentTypeId,
      "fields.id[exists]": true,
      "fields.id[in]": [slug],
      select: ["sys.id", "sys.type", "sys.contentType", "fields"]
    }
    const entries = await client.getEntries<T>(query)

    const entry = entries.items[0]
    if (!entry) return { error: `Entry with id: "${slug}" and contentType: "${contentTypeId}" not found.` }

    const { value, success } = transformEntry(entry)
    if (!success) return { error: `Could not transform entry with id: "${slug}"` }
    return { data: value }
  } catch (error: any) {
    return { error }
  }
}
