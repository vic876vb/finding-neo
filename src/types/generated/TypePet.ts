import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeHumanSkeleton } from "./TypeHuman";

/**
 * Fields type definition for content type 'TypePet'
 * @name TypePetFields
 * @type {TypePetFields}
 * @memberof TypePet
 */
export interface TypePetFields {
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
     * Field type definition for field 'description' (Description)
     * @name Description
     * @localized false
     */
    description?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'type' (Type)
     * @name Type
     * @localized false
     */
    type: EntryFieldTypes.Symbol<"Cat" | "Dog">;
    /**
     * Field type definition for field 'breed' (Breed)
     * @name Breed
     * @localized false
     */
    breed?: EntryFieldTypes.Symbol<"Dobermann" | "Weimaraner">;
    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'birthDate' (Birth date)
     * @name Birth date
     * @localized false
     */
    birthDate?: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'height' (Height)
     * @name Height
     * @localized false
     */
    height?: EntryFieldTypes.Number;
    /**
     * Field type definition for field 'heightUnit' (Height unit)
     * @name Height unit
     * @localized false
     */
    heightUnit?: EntryFieldTypes.Symbol<"cm" | "in">;
    /**
     * Field type definition for field 'length' (Length)
     * @name Length
     * @localized false
     */
    length?: EntryFieldTypes.Number;
    /**
     * Field type definition for field 'lengthUnit' (Length unit)
     * @name Length unit
     * @localized false
     */
    lengthUnit?: EntryFieldTypes.Symbol<"cm" | "in">;
    /**
     * Field type definition for field 'weight' (Weight)
     * @name Weight
     * @localized false
     */
    weight?: EntryFieldTypes.Number;
    /**
     * Field type definition for field 'weightUnit' (Weight unit)
     * @name Weight unit
     * @localized false
     */
    weightUnit?: EntryFieldTypes.Symbol<"kg" | "lbs">;
    /**
     * Field type definition for field 'companion' (Companion)
     * @name Companion
     * @localized false
     */
    companion: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeHumanSkeleton>>;
}

/**
 * Entry skeleton type definition for content type 'pet' (Pet)
 * @name TypePetSkeleton
 * @type {TypePetSkeleton}
 * @author 4KVUOTVgWv2VmF9ZvYZ3iZ
 * @since 2024-10-26T23:15:18.720Z
 * @version 13
 */
export type TypePetSkeleton = EntrySkeletonType<TypePetFields, "pet">;
/**
 * Entry type definition for content type 'pet' (Pet)
 * @name TypePet
 * @type {TypePet}
 * @author 4KVUOTVgWv2VmF9ZvYZ3iZ
 * @since 2024-10-26T23:15:18.720Z
 * @version 13
 */
export type TypePet<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePetSkeleton, Modifiers, Locales>;

export function isTypePet<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePet<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'pet'
}

export type TypePetWithoutLinkResolutionResponse = TypePet<"WITHOUT_LINK_RESOLUTION">;
export type TypePetWithoutUnresolvableLinksResponse = TypePet<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypePetWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypePet<"WITH_ALL_LOCALES", Locales>;
export type TypePetWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypePet<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypePetWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypePet<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
