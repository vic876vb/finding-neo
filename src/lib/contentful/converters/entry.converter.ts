import type { Document } from "@contentful/rich-text-types"
import type { Asset, Entry, EntrySkeletonType } from "contentful"
import { isRichText, transform as transformRichText } from "./rich-text.converter"
import { transform as transformAsset } from "./asset.converter"
import { deepFlatten } from "@utils/flatten"

export type TransformedEntry<T extends EntrySkeletonType> = Omit<Entry<T>, "fields"> & T["fields"]
export type TransformResult<T extends EntrySkeletonType> = {
  value: TransformedEntry<T>
  success: boolean
}

export function transform<T extends EntrySkeletonType>(entry: Entry<T>): TransformResult<T> {
  let success = false
  if (!isValid(entry)) {
    console.warn(`Invalid entry ${JSON.stringify(entry)}. Entry was not transformed.`)
    return { value: entry, success }
  }

  const transformed: TransformedEntry<T> = deepFlatten(entry, "fields")
  Object.keys(entry.fields).forEach((key) => {
    const value = transformed[key]
    if (!value) return
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        Object.assign(transformed, { [key]: value.map((item) => (typeof item === "object" ? transform(item as Entry<T>).value : item)) })
      } else if (isRichText(value)) {
        Object.assign(transformed, { [key]: transformRichText(value as Document) })
      } else if ((value as any)?.sys.type) {
        switch ((value as any)?.sys.type) {
          case "Entry":
            Object.assign(transformed, { [key]: transform(value as Entry<any>).value })
            break
          case "Asset":
            Object.assign(transformed, { [key]: transformAsset(value as Asset) })
            break
          default:
            console.warn("TODO: unhandled case", key, value) // TODO: use ReferenceConverter
            break
        }
      }
    }
  })

  success = true

  return { value: transformed, success }
}

export function isValid<T extends EntrySkeletonType>(entry: Entry<T>): entry is Entry<T> {
  if (!entry) return false

  return entry.sys !== undefined && entry.fields !== undefined && entry.metadata !== undefined
}
