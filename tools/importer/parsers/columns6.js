/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with the columns/cards
  let gridWrap = element.querySelector('.commonAdOnsWrap');
  if (!gridWrap) {
    // fallback: find first .row inside .container
    const container = element.querySelector('.container');
    if (container) {
      gridWrap = container.querySelector('.row');
    } else {
      gridWrap = element;
    }
  }
  // Each direct child .commonBottomAdon is a card/column
  const cards = Array.from(gridWrap.querySelectorAll(':scope > .commonBottomAdon'));

  // Define number of columns per row (from screenshot it is 3)
  const columnsPerRow = 3;
  const rows = [];
  for (let i = 0; i < cards.length; i += columnsPerRow) {
    rows.push(cards.slice(i, i + columnsPerRow));
  }

  // Table header: block name as in the spec
  const table = [['Columns (columns6)']];
  // Build table content rows
  rows.forEach(row => {
    const cells = row.map(card => {
      // Reference image
      const link = card.querySelector('a');
      if (!link) return '';
      const img = link.querySelector('img');
      // Title
      const titleEl = link.querySelector('.ig-common-title');
      // Compose cell elements
      const cellEls = [];
      if (img) cellEls.push(img);
      if (titleEl && titleEl.textContent.trim()) {
        // Render title as a heading (match semantic meaning), inside a link
        const a = document.createElement('a');
        a.href = link.getAttribute('href');
        a.textContent = titleEl.textContent.trim();
        // Use an h6 for semantic parity (since source uses h6)
        const h6 = document.createElement('h6');
        h6.appendChild(a);
        cellEls.push(h6);
      }
      return cellEls.length > 0 ? cellEls : '';
    });
    // If the row doesn't have enough columns, pad the rest with '' to maintain the table shape
    while (cells.length < columnsPerRow) {
      cells.push('');
    }
    table.push(cells);
  });
  // Build table block
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
