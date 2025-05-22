import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeHuman'
 * @name TypeHumanFields
 * @type {TypeHumanFields}
 * @memberof TypeHuman
 */
export interface TypeHumanFields {
    /**
     * Field type definition for field 'id' (ID)
     * @name ID
     * @localized false
     */
    id: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'firstName' (First name)
     * @name First name
     * @localized false
     */
    firstName?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'lastName' (Last name)
     * @name Last name
     * @localized false
     */
    lastName?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'birthDate' (Birth date)
     * @name Birth date
     * @localized false
     */
    birthDate?: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'gender' (Gender)
     * @name Gender
     * @localized false
     */
    gender?: EntryFieldTypes.Symbol<"doubled-female" | "doubled-male" | "female" | "interlocked-female-male" | "male" | "male-female">;
    /**
     * Field type definition for field 'phone' (Phone)
     * @name Phone
     * @localized false
     */
    phone?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'email' (Email)
     * @name Email
     * @localized false
     */
    email?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'message' (Message)
     * @name Message
     * @localized false
     */
    message?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'gallery' (Gallery)
     * @name Gallery
     * @localized false
     */
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

/**
 * Entry skeleton type definition for content type 'human' (Human)
 * @name TypeHumanSkeleton
 * @type {TypeHumanSkeleton}
 * @author 4KVUOTVgWv2VmF9ZvYZ3iZ
 * @since 2024-10-26T23:25:46.659Z
 * @version 7
 */
export type TypeHumanSkeleton = EntrySkeletonType<TypeHumanFields, "human">;
/**
 * Entry type definition for content type 'human' (Human)
 * @name TypeHuman
 * @type {TypeHuman}
 * @author 4KVUOTVgWv2VmF9ZvYZ3iZ
 * @since 2024-10-26T23:25:46.659Z
 * @version 7
 */
export type TypeHuman<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHumanSkeleton, Modifiers, Locales>;

export function isTypeHuman<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHuman<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'human'
}

export type TypeHumanWithoutLinkResolutionResponse = TypeHuman<"WITHOUT_LINK_RESOLUTION">;
export type TypeHumanWithoutUnresolvableLinksResponse = TypeHuman<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeHumanWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeHuman<"WITH_ALL_LOCALES", Locales>;
export type TypeHumanWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeHuman<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeHumanWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeHuman<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
