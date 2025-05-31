import { type TypeLocalizationKey, type TypeLocalizationKeyFields } from "@/types/generated"

export type LocalizationEntry = Record<string, string>

export function transformAll(entries: TypeLocalizationKey<undefined, string>[]): LocalizationEntry {
  // if (!isValid(entry)) {
  //   console.warn("Invalid localization entry:", entry)
  //   return {}
  // }

  return entries
    .map((entry) => entry.fields as TypeLocalizationKeyFields)
    .reduce(
      (acc, entry) => {
        const obj = transform(entry)
        return { ...acc, ...obj }
      },
      <LocalizationEntry>{}
    )
}

export function transform(entry: TypeLocalizationKeyFields): LocalizationEntry {
  if (!isValid(entry)) {
    console.warn("Invalid localization entry:", entry)
    return {}
  }

  return {
    [String(entry.key)]: String(entry.value)
  }
}

export function isValid(entry: any): entry is TypeLocalizationKeyFields {
  return (entry as TypeLocalizationKeyFields).key !== undefined && typeof (entry as TypeLocalizationKeyFields).key === "string"
}
