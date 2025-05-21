import type { EntryFields } from "contentful"
import { INLINES, type Document } from "@contentful/rich-text-types"
import { documentToHtmlString, type Options } from "@contentful/rich-text-html-renderer"
import { isInternal } from "@/core/utils/link"

export function isRichText(value: any): boolean {
  return (
    (value as EntryFields.RichText).nodeType !== undefined &&
    (value as EntryFields.RichText).content !== undefined &&
    (value as EntryFields.RichText).data !== undefined
  )
}

export function transform(richText: Document) {
  /**
   * Reference: https://www.contentful.com/developers/docs/javascript/tutorials/rendering-contentful-rich-text-with-javascript/
   */
  const options: Options = {
    preserveWhitespace: true,
    // renderMark: {
    // 	[MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    // },
    // renderNode: {
    // 	[BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    // },

    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const attrs = isInternal(node.data.uri) ? `target="_blank" rel="noopener noreferrer"` : ""
        return `<a href="${node.data.uri}" ${attrs}>${children}</a>`
      }
    }
  }
  return documentToHtmlString(richText, options)
}
