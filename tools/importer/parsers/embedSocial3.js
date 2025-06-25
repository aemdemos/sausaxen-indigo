/* global WebImporter */
export default function parse(element, { document }) {
  // The Embed block expects a header row ['Embed'] and a content row with a URL only.
  // In this HTML, there is no embed/link to external content, just headings and text.
  // To match the structure and semantic content, all visible text content must be included in the content row as a string.

  // Step 1: Header row
  const headerRow = ['Embed'];

  // Step 2: Extract all visible text content from this section in document order, preserving line breaks for visual separation.
  // Collect all non-empty text nodes from descendant elements (in order):
  const lines = [];
  element.querySelectorAll('*').forEach(node => {
    if (node.childElementCount === 0 && node.textContent && node.textContent.trim()) {
      lines.push(node.textContent.trim());
    }
  });
  // If nothing was found (all empty), check element.textContent as a fallback
  let content = lines.length ? lines.join('\n') : (element.textContent ? element.textContent.trim() : '');

  // Guarantee at least one cell value
  if (!content) content = '';

  const cells = [headerRow, [content]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}