import en_US from "./en-US.json"

export type Locale = "en-US"
export type LocalizationKeys = Record<string, string>
export const defaultLocale: Locale = "en-US"

export function getLocalizationKeys(locale: Locale = defaultLocale): LocalizationKeys {
  switch (locale) {
    case "en-US":
      return en_US as LocalizationKeys
    default:
      console.warn(`Locale "${locale}" is not supported, falling back to "en-US".`)
      return {}
  }
}
