/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by the Embed block
  const headerRow = ['Embed'];
  
  // The Embed block expects a single cell containing the relevant URL as a string.
  // However, in this example HTML, there is NO URL or external media to embed;
  // Only a heading and (possibly empty) paragraph are present.
  // The correct behavior is to include ALL text content from the visible children in the cell
  // as a single string, preserving semantic meaning as much as possible.

  // Exclude .d-none and display:none children
  const visibleChildren = Array.from(element.children).filter(child => {
    if (child.classList.contains('d-none')) return false;
    if (child.style && child.style.display === 'none') return false;
    return true;
  });

  // Gather all visible text content (including heading levels)
  // and join them with a space (if both are present)
  const cellContent = visibleChildren
    .map(child => child.textContent.trim())
    .filter(Boolean)
    .join(' ');

  // If everything is empty, we still output the header and an empty cell
  const cells = [headerRow, [cellContent]];
  
  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
