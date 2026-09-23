import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Content for homepageimage documents
 */
interface HomepageimageDocumentData {
	/**
	 * name field in *homepageimage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepageimage.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * image field in *homepageimage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepageimage.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * homepageimage document from Prismic
 *
 * - **API ID**: `homepageimage`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageimageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<HomepageimageDocumentData>, "homepageimage", Lang>;

/**
 * Content for infotext documents
 */
interface InfotextDocumentData {
	/**
	 * name field in *infotext*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: infotext
	 * - **API ID Path**: infotext.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * text field in *infotext*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: infotext.text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
}

/**
 * infotext document from Prismic
 *
 * - **API ID**: `infotext`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type InfotextDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<InfotextDocumentData>, "infotext", Lang>;

type PageDocumentDataSlicesSlice = never

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Page title
	 * - **API ID Path**: page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Content for Performance documents
 */
interface PerformanceDocumentData {
	/**
	 * Time field in *Performance*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. 14:00
	 * - **API ID Path**: performance.time
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	time: prismic.KeyTextField;
	
	/**
	 * Title field in *Performance*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. Dans á rósum
	 * - **API ID Path**: performance.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Artist field in *Performance*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Artist name
	 * - **API ID Path**: performance.artist
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	artist: prismic.KeyTextField;

	/**
	 * Icelandic text field in *Performance*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Text in Icelandic
	 * - **API ID Path**: performance.icelandic_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	icelandic_text: prismic.KeyTextField;

	/**
	 * Icelandic artist bio field in *Performance*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Artist bio in Icelandic
	 * - **API ID Path**: performance.icelandic_artist_bio
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	icelandic_artist_bio: prismic.KeyTextField;

	/**
	 * English text field in *Performance*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Text in English
	 * - **API ID Path**: performance.english_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	english_text: prismic.KeyTextField;

	/**
	 * English artist bio field in *Performance*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Artist bio in English
	 * - **API ID Path**: performance.english_artist_bio
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	english_artist_bio: prismic.KeyTextField;
	
	/**
	 * Image field in *Performance*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performance.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Performance document from Prismic
 *
 * - **API ID**: `performance`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PerformanceDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PerformanceDocumentData>, "performance", Lang>;

export type AllDocumentTypes = HomepageimageDocument | InfotextDocument | PageDocument | PerformanceDocument;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			HomepageimageDocument,
			HomepageimageDocumentData,
			InfotextDocument,
			InfotextDocumentData,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			PerformanceDocument,
			PerformanceDocumentData,
			AllDocumentTypes
		}
	}
}