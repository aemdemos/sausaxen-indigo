/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .stats-wrapper .row containing the stats columns
  const statsRow = element.querySelector('.stats-wrapper .row');
  if (!statsRow) return;

  // Get all .innerwrap-stats direct children (each column)
  const statCols = Array.from(statsRow.children).filter(el => el.classList.contains('innerwrap-stats'));

  // The header row must be a single column in a single array
  // The content row is an array of each column
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns8)'],
    statCols
  ], document);

  element.replaceWith(table);
}
