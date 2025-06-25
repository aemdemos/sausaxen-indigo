/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (matches example exactly)
  const headerRow = ['Columns (columns7)'];

  // Find the row that contains all the columns
  const row = element.querySelector('.row.sitemap');
  if (!row) {
    // Fallback: no content, replace with empty Columns block
    const emptyTable = WebImporter.DOMUtils.createTable([
      headerRow,
      ['']
    ], document);
    element.replaceWith(emptyTable);
    return;
  }

  // Get all immediate child columns
  const columns = Array.from(row.querySelectorAll(':scope > .col-6.col-sm-3'));

  // For each column, find the innermost <ul class="sitemap"> or fallback to empty string
  const cells = columns.map((col) => {
    const ul = col.querySelector('ul.sitemap');
    return ul ? ul : '';
  });

  // If there are no columns, fallback to empty columns block
  if (cells.length === 0) {
    const emptyTable = WebImporter.DOMUtils.createTable([
      headerRow,
      ['']
    ], document);
    element.replaceWith(emptyTable);
    return;
  }

  // Compose the block table
  const tableData = [headerRow, cells];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
