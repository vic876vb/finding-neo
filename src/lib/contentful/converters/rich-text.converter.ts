import type { EntryFields } from "contentful"
import { INLINES, type Document, BLOCKS, MARKS } from "@contentful/rich-text-types" // Added BLOCKS for completeness if needed later
import { documentToHtmlString, type Options } from "@contentful/rich-text-html-renderer"
import { isInternalUrl } from "@/core/utils/link"

export function isRichText(value: any): value is Document {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as EntryFields.RichText).nodeType === "document" &&
    (value as EntryFields.RichText).data !== undefined &&
    typeof value.data === "object" &&
    (value as EntryFields.RichText).content !== undefined &&
    Array.isArray(value.content)
  )
}

export function transform(richText: Document): string {
  /**
   * Reference: https://www.contentful.com/developers/docs/javascript/tutorials/rendering-contentful-rich-text-with-javascript/
   */
  const options: Options = {
    preserveWhitespace: true,
    renderMark: {
      [MARKS.BOLD]: (text) => `<strong>${text}</strong>`
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const href = node.data.uri
        const attrs = !isInternalUrl(href) ? `target="_blank" rel="noopener noreferrer"` : ""
        return `<a href="${href}" ${attrs}>${children}</a>`
      }
      // Add more node renderers as needed, e.g. for embedded entries or assets
      // [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      //   // You would need to fetch/transform the linked asset here
      //   // For HTML string, you might render an <img> tag
      //   // const assetId = node.data.target.sys.id;
      //   // return `<img src="path_to_asset_${assetId}" alt="Embedded Asset" />";
      //   return '<!-- Embedded Asset Placeholder -->';
      // },
      // [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      //   // Similar for entries
      //   return '<!-- Embedded Entry Placeholder -->';
      // }
    }
  }

  try {
    return documentToHtmlString(richText, options)
  } catch (e) {
    console.error("Error transforming rich text to HTML:", e)
    return ""
  }
}
