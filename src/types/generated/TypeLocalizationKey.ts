import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeLocalizationKey'
 * @name TypeLocalizationKeyFields
 * @type {TypeLocalizationKeyFields}
 * @memberof TypeLocalizationKey
 */
export interface TypeLocalizationKeyFields {
    /**
     * Field type definition for field 'key' (Key)
     * @name Key
     * @localized false
     */
    key?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'value' (Value)
     * @name Value
     * @localized true
     */
    value?: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'localizationKey' (Key-value pair)
 * @name TypeLocalizationKeySkeleton
 * @type {TypeLocalizationKeySkeleton}
 * @author 4KVUOTVgWv2VmF9ZvYZ3iZ
 * @since 2024-10-26T23:34:19.203Z
 * @version 5
 */
export type TypeLocalizationKeySkeleton = EntrySkeletonType<TypeLocalizationKeyFields, "localizationKey">;
/**
 * Entry type definition for content type 'localizationKey' (Key-value pair)
 * @name TypeLocalizationKey
 * @type {TypeLocalizationKey}
 * @author 4KVUOTVgWv2VmF9ZvYZ3iZ
 * @since 2024-10-26T23:34:19.203Z
 * @version 5
 */
export type TypeLocalizationKey<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLocalizationKeySkeleton, Modifiers, Locales>;

export function isTypeLocalizationKey<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLocalizationKey<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'localizationKey'
}

export type TypeLocalizationKeyWithoutLinkResolutionResponse = TypeLocalizationKey<"WITHOUT_LINK_RESOLUTION">;
export type TypeLocalizationKeyWithoutUnresolvableLinksResponse = TypeLocalizationKey<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeLocalizationKeyWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeLocalizationKey<"WITH_ALL_LOCALES", Locales>;
export type TypeLocalizationKeyWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeLocalizationKey<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeLocalizationKeyWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeLocalizationKey<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
