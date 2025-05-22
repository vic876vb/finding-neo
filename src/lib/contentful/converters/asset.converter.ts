import { deepFlatten, type Flatten } from "@utils/flatten"
import { deepOmit } from "@utils/omit"
import { shallowPick } from "@utils/pick"
import type { Asset, AssetFile, BaseSys } from "contentful"

type FlexiblePick<T, K extends keyof T> = {
  [P in K]: T[P] | AssetFile | undefined
}

export type TransformedAsset = { sys: BaseSys } & Omit<Flatten<Asset, "fields">, "file" | "sys"> &
  FlexiblePick<AssetFile, "fileName" | "url" | "details">

export function transform(asset: Asset): TransformedAsset {
  const flattened: Flatten<Asset, "fields"> = deepFlatten(asset, "fields")
  const sys: BaseSys = shallowPick(flattened.sys, "id", "type")
  const transformed = Object.assign({}, deepOmit(flattened, "file", "sys"), {
    fileName: flattened.file?.fileName,
    url: flattened.file?.url,
    details: flattened.file?.details
    // TODO: add support for mimeType
    // mimeType: flattened.file?.contentType,
  })

  return { ...transformed, sys }
}
