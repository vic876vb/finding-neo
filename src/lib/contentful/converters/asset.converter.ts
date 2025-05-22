import { deepOmit } from "@utils/omit"
import type { Flatten } from "@utils/flatten" // Assuming Flatten is { ...T, ...T[K] } & Omit<T, K>
import { shallowPick } from "@utils/pick"
import type { Asset, AssetFile, BaseSys, EntryFields } from "contentful"

// TransformedAsset should be a flat object with specific properties from Asset and AssetFile
// and a simplified sys object. It should not have a 'fields' or 'metadata' or 'file' property.
export type TransformedAsset = {
  sys: Pick<BaseSys, "id" | "type">
  title: EntryFields.Symbol // string
  description?: EntryFields.Symbol // string
  url?: EntryFields.Text // string
  fileName?: EntryFields.Text // string
  size?: EntryFields.Number // number
  details?: {
    size?: EntryFields.Number // number
    image?: {
      width: EntryFields.Number // number
      height: EntryFields.Number // number
    }
  }
  // contentType from AssetFile is intentionally omitted
}

// Helper to extract value from a potentially localized field
function extractLocaleValue(fieldValue: string | Record<string, string> | undefined, defaultLocale: string = "en-US"): string {
  if (typeof fieldValue === "string") {
    return fieldValue
  }
  if (typeof fieldValue === "object" && fieldValue !== null) {
    if (fieldValue[defaultLocale]) {
      return fieldValue[defaultLocale]
    }
    // Fallback to the first available locale if default is not found
    const locales = Object.keys(fieldValue)
    if (locales.length > 0) {
      return fieldValue[locales[0]]
    }
  }
  return "" // Default to empty string if no value can be extracted
}

export function transform(asset: Asset): TransformedAsset {
  const originalAssetFields = asset.fields
  const originalAssetFile = originalAssetFields.file as AssetFile | undefined

  const resolvedTitle = extractLocaleValue(originalAssetFields.title as string | Record<string, string>)
  const resolvedDescription = originalAssetFields.description
    ? extractLocaleValue(originalAssetFields.description as string | Record<string, string>)
    : undefined

  const transformed: TransformedAsset = {
    sys: shallowPick(asset.sys, "id", "type"),
    title: resolvedTitle,
    ...(resolvedDescription !== undefined ? { description: resolvedDescription } : {}),
    ...(originalAssetFile?.url && { url: originalAssetFile.url }),
    ...(originalAssetFile?.fileName && { fileName: originalAssetFile.fileName }),
    ...(originalAssetFile?.details?.size && { size: originalAssetFile.details.size }),
    ...(originalAssetFile?.details && { details: originalAssetFile.details })
  }

  Object.keys(transformed).forEach((keyStr) => {
    const key = keyStr as keyof TransformedAsset
    if (transformed[key] === undefined) {
      delete transformed[key]
    }
  })

  return transformed
}
