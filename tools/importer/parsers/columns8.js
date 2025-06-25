/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main row of stats columns
  const container = element.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.stats-wrapper .row');
  if (!row) return;

  // Get all immediate .innerwrap-stats children for columns
  const columns = Array.from(row.querySelectorAll(':scope > .innerwrap-stats'));
  if (columns.length === 0) return;

  // For each column, include all children (icon and text content)
  const cellContents = columns.map((col) => {
    return Array.from(col.childNodes).filter((node) => {
      return node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    });
  });

  // Correct header row: one column only!
  const headerRow = ['Columns (columns8)'];
  // Second row: columns for each stat
  const bodyRow = cellContents;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow
  ], document);
  element.replaceWith(table);
}
