import { deepOmit } from "@utils/omit"
import { deepFlatten, type Flatten } from "@utils/flatten"
import { shallowPick } from "@utils/pick"
import type { Asset, AssetFile, BaseSys } from "contentful"

export type TransformedAsset = Omit<Flatten<Asset, "fields">, "file" | "sys" | "metadata"> &
  Partial<Omit<AssetFile, "contentType">> & { sys: BaseSys }

export function transform(asset: Asset): TransformedAsset {
  const copy = structuredClone(asset)
  const flattened = deepFlatten(deepFlatten(copy, "fields"), "file")
  const transformed: TransformedAsset = {
    ...deepOmit(flattened, "metadata"),
    sys: shallowPick(copy.sys, "id", "type"),
    title: copy.fields.title,
    description: copy.fields.description
  }
  return transformed
}
