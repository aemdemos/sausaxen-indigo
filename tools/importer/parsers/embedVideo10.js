/* global WebImporter */
export default function parse(element, { document }) {
  // Purpose: Collect all content (including text, headings, buttons, etc.) in the provided block for the Embed cell
  // Step 1: Create a fragment to hold all first-level children (preserves structure and semantics)
  const fragment = document.createDocumentFragment();
  // Move all children to the fragment (preserves elements and avoids duplicates)
  while (element.firstChild) {
    fragment.appendChild(element.firstChild);
  }

  // Step 2: Create the table with header and content row (fragment as the cell content)
  const cells = [
    ['Embed'],
    [fragment]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
