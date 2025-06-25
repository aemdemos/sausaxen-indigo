/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per the Embed block
  const cells = [['Embed']];

  // Collect all content (including text) inside the element, preserving structure
  // We want to preserve the semantic meaning and include all text and elements
  const contentFragments = [];
  element.childNodes.forEach((node) => {
    // Include all element nodes except script/style
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName.toLowerCase() !== 'script' && node.tagName.toLowerCase() !== 'style') {
        contentFragments.push(node);
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      // Preserve significant text nodes
      const txt = node.textContent.replace(/\s+/g, ' ').trim();
      if (txt.length > 0) {
        contentFragments.push(document.createTextNode(txt+' '));
      }
    }
  });

  // If the cell would otherwise be empty, insert an empty string to avoid an empty row
  cells.push([contentFragments.length ? contentFragments : '']);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
