import type { Document } from "@contentful/rich-text-types"
import type { Asset, Entry, EntrySkeletonType, FieldsType, EntryFieldTypes } from "contentful"
import { isRichText, transform as transformRichText } from "./rich-text.converter"
import { transform as transformAssetInternal, type TransformedAsset } from "./asset.converter"

export type TransformedEntry<T extends EntrySkeletonType> = Pick<Entry<T>, "sys"> & {
  [K in keyof T["fields"]]: TransformedFieldType<T["fields"][K]>
}

type TransformedFieldType<Field> = Field extends undefined | null
  ? Field // Preserve undefined and null
  : NonNullable<Field> extends infer NonNullField
    ? // Case 1: Array of items
      NonNullField extends (infer Item)[]
      ? TransformedFieldType<Item>[] // Recursively transform each item's type and form an array
      : // Case 2: Array (object) of Entry Links
        NonNullField extends EntryFieldTypes.Array<EntryFieldTypes.EntryLink<infer LinkedSkeleton extends EntrySkeletonType>> // Case 2: Single Entry Link
        ? TransformedEntry<LinkedSkeleton>[]
        : // Case 3: Array (object) of Asset Links
          NonNullField extends EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
          ? TransformedAsset[]
          : // Case 4: Single Entry Link
            NonNullField extends EntryFieldTypes.EntryLink<infer LinkedSkeleton extends EntrySkeletonType>
            ? TransformedEntry<LinkedSkeleton> // Recursively transform to the flattened TransformedEntry
            : // Case 5: Single Asset Link
              NonNullField extends EntryFieldTypes.AssetLink
              ? TransformedAsset // Transform to the flattened TransformedAsset
              : // Case 6: Rich Text Document
                NonNullField extends Document
                ? string // Rich text becomes a string
                : // Case 7: Fallback for simple types (string, number, boolean, Date, etc.)
                  // or any other types that don't have specific transformations.
                  NonNullField
    : never // This path should ideally not be reached if Field is not undefined/null.

export type TransformResult<T extends EntrySkeletonType> = {
  value: TransformedEntry<T>
  success: boolean
}

export function transform<T extends EntrySkeletonType>(entry: Entry<T>): TransformResult<T> {
  if (!isValid(entry)) {
    console.warn(
      `Invalid entry object passed to transform function: ${(entry as any)?.sys?.id || JSON.stringify(entry)}. Entry was not transformed.`
    )

    return { value: entry as any, success: false }
  }

  const newFields: Record<string, any> = {}

  for (const key of Object.keys(entry.fields)) {
    const value = (entry.fields as FieldsType)[key] // Use FieldsType for generic field access

    if (value === undefined || value === null) {
      newFields[key] = value
      continue
    }

    if (Array.isArray(value)) {
      newFields[key] = value.map((item: any) => {
        if (item && typeof item === "object" && item.sys?.type) {
          if (item.sys.type === "Entry") {
            if (isValid(item as Entry<EntrySkeletonType>)) return transform(item as Entry<EntrySkeletonType>).value

            console.warn(`Kept original (due to failed isValid) Entry item in array field '${key}' (id: ${item.sys.id || "unknown"}).`)
            return item
          } else if (item.sys.type === "Asset") return transformAssetInternal(item as Asset)

          console.warn(
            `Kept original item in array field '${key}' due to unhandled sys.type '${item.sys.type}' (id: ${item.sys.id || "unknown"}).`
          )
          return item
        }
        return item
      })
    } else if (typeof value === "object" && value.sys?.type) {
      switch (value.sys.type) {
        case "Entry":
          if (isValid(value as Entry<EntrySkeletonType>)) {
            newFields[key] = transform(value as Entry<EntrySkeletonType>).value
          } else {
            console.warn(`Kept original (due to failed isValid) linked Entry for field '${key}' (id: ${value.sys.id || "unknown"}).`)
            newFields[key] = value // Return original if not valid
          }
          break
        case "Asset":
          newFields[key] = transformAssetInternal(value as Asset)
          break
        default:
          console.warn(
            `Kept original value for field '${key}' due to unhandled sys.type '${value.sys.type}' (id: ${value.sys.id || "unknown"}).`
          )
          newFields[key] = value // Unhandled sys.type
          break
      }
    } else if (isRichText(value)) {
      newFields[key] = transformRichText(value as Document)
    } else {
      newFields[key] = value
    }
  }

  // TODO: avoid type casting
  const transformedEntry = {
    sys: entry.sys,
    ...newFields
  } as TransformedEntry<T>

  return { value: transformedEntry, success: true }
}

export function isValid<T extends EntrySkeletonType>(entry: any): entry is Entry<T> {
  if (!entry || typeof entry !== "object") return false

  const sys = entry.sys
  if (!sys || typeof sys !== "object") return false

  if (typeof sys.type !== "string" || typeof sys.id !== "string" || sys.type !== "Entry") return false

  if (
    !sys.contentType ||
    typeof sys.contentType !== "object" ||
    !sys.contentType.sys ||
    typeof sys.contentType.sys !== "object" ||
    typeof sys.contentType.sys.id !== "string" ||
    sys.contentType.sys.type !== "Link" ||
    sys.contentType.sys.linkType !== "ContentType"
  )
    return false

  if (typeof entry.fields !== "object" || entry.fields === null) return false

  return true
}
