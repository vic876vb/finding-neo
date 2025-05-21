import { deepFlatten, type Flatten } from "@utils/flatten"
import { deepOmit } from "@utils/omit"
import type { Asset, AssetFile } from "contentful"

type FlexiblePick<T, K extends keyof T> = {
  [P in K]: T[P] | AssetFile | undefined
}
export type TransformedAsset = Omit<Flatten<Asset, "fields">, "file"> & FlexiblePick<AssetFile, "fileName" | "url" | "details">

export function transform(asset: Asset): TransformedAsset {
  const flattened: Flatten<Asset, "fields"> = deepFlatten(asset, "fields")
  const transformed: TransformedAsset = Object.assign({}, deepOmit(flattened, "file"), {
    fileName: flattened.file?.fileName,
    url: flattened.file?.url,
    details: flattened.file?.details
  })

  return transformed
}
