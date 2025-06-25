/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have exactly one cell with the block name
  const headerRow = ['Columns (columns7)'];

  // Find all direct column wrappers from the element (col-6 col-sm-3)
  // There may be non-column divs at this level (eg visible-xs clearfix), so filter
  const row = element.querySelector('.row.sitemap');
  const colDivs = row ? Array.from(row.querySelectorAll(':scope > .col-6.col-sm-3')) : [];

  // For each column, find the ul.sitemap within it, and use it as content
  // If not found, cell will be empty
  const contentRow = colDivs.map((col) => {
    const ul = col.querySelector('ul.sitemap');
    return ul ? ul : '';
  });

  // Create the table: header row (single cell), then content row (one cell per column)
  const tableRows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // After creating table, ensure the header row spans all columns
  // This is needed as createTable does not set colspan
  // Thead is not used, so we manually set colspan
  const th = table.querySelector('tr:first-child > th');
  if (th && contentRow.length > 1) {
    th.setAttribute('colspan', String(contentRow.length));
  }

  element.replaceWith(table);
}
