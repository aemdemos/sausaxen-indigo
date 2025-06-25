/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns6)'];

  // Find the container with all cards/columns
  const row = element.querySelector('.row.commonAdOnsWrap');
  if (!row) return;
  const cards = Array.from(row.children).filter(col => col.classList.contains('commonBottomAdon'));

  // Group cards into rows of 6 for columns6 layout
  const rows = [];
  const numColumns = 6;
  for (let i = 0; i < cards.length; i += numColumns) {
    const rowCards = cards.slice(i, i + numColumns).map(card => {
      const anchor = card.querySelector('a');
      return anchor ? anchor : document.createTextNode('');
    });
    // Pad last row if it's less than numColumns wide
    while (rowCards.length < numColumns) {
      rowCards.push(document.createTextNode(''));
    }
    rows.push(rowCards);
  }

  // Combine header and rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
